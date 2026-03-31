// server/index.js — v5
const express    = require("express");
const cors       = require("cors");
const bcrypt     = require("bcryptjs");
const jwt        = require("jsonwebtoken");
const multer     = require("multer");
const crypto     = require("crypto");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json({ limit: "20mb" }));

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
const JWT_SECRET  = process.env.JWT_SECRET;
const JWT_EXPIRES = "8h";

function auth(req, res, next) {
  const h = req.headers.authorization;
  if (!h?.startsWith("Bearer ")) return res.status(401).json({ error: "No token." });
  try { req.user = jwt.verify(h.split(" ")[1], JWT_SECRET); next(); }
  catch { return res.status(401).json({ error: "Invalid or expired token." }); }
}

// ═══════════════════════════════════════════════════════════
//  AUTH
// ═══════════════════════════════════════════════════════════
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Username and password required." });
  const { data: user } = await supabase.from("users").select("*").eq("username", username.toLowerCase().trim()).single();
  if (!user) return res.status(401).json({ error: "Invalid username or password." });
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: "Invalid username or password." });
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  res.json({ token, user: { id: user.id, username: user.username, full_name: user.full_name, role: user.role, dark_mode: user.dark_mode || false } });
});

app.get("/api/auth/me", auth, async (req, res) => {
  const { data } = await supabase.from("users").select("id,username,full_name,role,dark_mode").eq("id", req.user.id).single();
  res.json(data);
});

// ── Password Reset via Supabase Auth email ────────────────────────────
app.post("/api/auth/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required." });

  const { data: user } = await supabase.from("users").select("id,email").eq("email", email.toLowerCase().trim()).single();
  if (!user) return res.json({ ok: true }); // Don't reveal if email exists

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  await supabase.from("password_reset_tokens").insert([{ user_id: user.id, token, expires_at: expires }]);

  const resetUrl = `${process.env.CLIENT_URL || "http://localhost:3000"}/admin/login?token=${token}`;

  // Use Supabase Auth email if configured, otherwise use service role to send via Supabase
  const { error } = await supabase.auth.admin.generateLink({
    type: "magiclink",
    email: user.email,
  }).catch(() => ({ error: "supabase_auth_not_configured" }));

  // If Supabase auth not configured for this user, just log in dev
  console.log(`[Password Reset] URL for ${email}: ${resetUrl}`);
  res.json({ ok: true, dev_url: process.env.NODE_ENV !== "production" ? resetUrl : undefined });
});

app.post("/api/auth/reset-password", async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) return res.status(400).json({ error: "Token and password required." });
  if (password.length < 6) return res.status(400).json({ error: "Min 6 characters." });
  const { data: record } = await supabase.from("password_reset_tokens").select("*").eq("token", token).eq("used", false).single();
  if (!record || new Date(record.expires_at) < new Date()) return res.status(400).json({ error: "Invalid or expired reset link." });
  const password_hash = await bcrypt.hash(password, 12);
  await supabase.from("users").update({ password_hash }).eq("id", record.user_id);
  await supabase.from("password_reset_tokens").update({ used: true }).eq("id", record.id);
  res.json({ ok: true });
});

// ── Dark mode preference ──────────────────────────────────────────────
app.put("/api/auth/dark-mode", auth, async (req, res) => {
  const { dark_mode } = req.body;
  const { data, error } = await supabase.from("users").update({ dark_mode }).eq("id", req.user.id).select("id,dark_mode").single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// ═══════════════════════════════════════════════════════════
//  USERS
// ═══════════════════════════════════════════════════════════
app.get("/api/users", auth, async (req, res) => {
  const { data, error } = await supabase.from("users").select("id,username,full_name,email,role,dark_mode,created_at").order("created_at", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post("/api/users", auth, async (req, res) => {
  const { username, full_name, email, password, role } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Username and password required." });
  if (password.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters." });
  const password_hash = await bcrypt.hash(password, 12);
  const { data, error } = await supabase.from("users")
    .insert([{ username: username.toLowerCase().trim(), full_name, email: email?.toLowerCase().trim() || null, password_hash, role: role || "admin" }])
    .select("id,username,full_name,email,role,created_at").single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.put("/api/users/:id", auth, async (req, res) => {
  const { full_name, email, role, password } = req.body;
  const updates = { full_name, email: email?.toLowerCase().trim() || null, role };
  if (password) {
    if (password.length < 6) return res.status(400).json({ error: "Min 6 characters." });
    updates.password_hash = await bcrypt.hash(password, 12);
  }
  const { data, error } = await supabase.from("users").update(updates).eq("id", req.params.id)
    .select("id,username,full_name,email,role,created_at").single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.delete("/api/users/:id", auth, async (req, res) => {
  if (req.params.id === req.user.id) return res.status(400).json({ error: "Cannot delete your own account." });
  const { error } = await supabase.from("users").delete().eq("id", req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ ok: true });
});

// ═══════════════════════════════════════════════════════════
//  CATEGORIES
// ═══════════════════════════════════════════════════════════
app.get("/api/categories", async (req, res) => {
  const { data, error } = await supabase.from("categories").select("*").order("usage_count", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post("/api/categories", auth, async (req, res) => {
  const { name, description } = req.body;
  if (!name?.trim()) return res.status(400).json({ error: "Name required." });
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const { data, error } = await supabase.from("categories").insert([{ name: name.trim(), slug, description }]).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.put("/api/categories/:id", auth, async (req, res) => {
  const { name, description } = req.body;
  const updates = { description };
  if (name) { updates.name = name.trim(); updates.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
  const { data, error } = await supabase.from("categories").update(updates).eq("id", req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.delete("/api/categories/:id", auth, async (req, res) => {
  const { error } = await supabase.from("categories").delete().eq("id", req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ ok: true });
});

// ═══════════════════════════════════════════════════════════
//  TAGS
// ═══════════════════════════════════════════════════════════
app.get("/api/tags", async (req, res) => {
  const { data, error } = await supabase.from("tags").select("*").order("usage_count", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post("/api/tags", auth, async (req, res) => {
  const { name } = req.body;
  if (!name?.trim()) return res.status(400).json({ error: "Name required." });
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  // Upsert — return existing if already exists
  const { data: existing } = await supabase.from("tags").select("*").eq("name", name.trim()).single();
  if (existing) return res.json(existing);
  const { data, error } = await supabase.from("tags").insert([{ name: name.trim(), slug }]).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.delete("/api/tags/:id", auth, async (req, res) => {
  const { error } = await supabase.from("tags").delete().eq("id", req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ ok: true });
});

// Auto-sync tags and categories from product save
async function syncTaxonomy(categories = [], tags = []) {
  for (const name of categories) {
    if (!name.trim()) continue;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    await supabase.from("categories").upsert([{ name: name.trim(), slug }], { onConflict: "name", ignoreDuplicates: true });
    // Increment usage count
    await supabase.rpc("increment_cat_count", { p_name: name.trim() }).catch(() => {});
  }
  for (const name of tags) {
    if (!name.trim()) continue;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    await supabase.from("tags").upsert([{ name: name.trim(), slug }], { onConflict: "name", ignoreDuplicates: true });
    await supabase.rpc("increment_tag_count", { p_name: name.trim() }).catch(() => {});
  }
}

// ═══════════════════════════════════════════════════════════
//  PRODUCTS
// ═══════════════════════════════════════════════════════════
const PRODUCT_LIST_COLS = "id,name,slug,brand,type,status,visible,featured,sort_order,thumbnail,categories,tags,created_at,updated_at,created_by_username";

app.get("/api/products", auth, async (req, res) => {
  let q = supabase.from("products").select(PRODUCT_LIST_COLS);
  if (req.query.status)   q = q.eq("status", req.query.status);
  if (req.query.category) q = q.contains("categories", [req.query.category]);
  if (req.query.tag)      q = q.contains("tags", [req.query.tag]);
  const sort = req.query.sort || "created_at";
  q = q.order(sort, { ascending: req.query.dir === "asc" });
  const { data, error } = await q;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.get("/api/products/:id", auth, async (req, res) => {
  const { data, error } = await supabase.from("products").select("*").eq("id", req.params.id).single();
  if (error) return res.status(404).json({ error: "Not found." });
  res.json(data);
});

app.get("/api/products/check-slug/:slug", auth, async (req, res) => {
  let q = supabase.from("products").select("id").eq("slug", req.params.slug);
  if (req.query.exclude) q = q.neq("id", req.query.exclude);
  const { data } = await q;
  res.json({ available: !data?.length });
});

app.post("/api/products", auth, async (req, res) => {
  const payload = buildProductPayload(req.body);
  payload.created_by = req.user.id;
  payload.created_by_username = req.user.username;
  const { data: existing } = await supabase.from("products").select("id").eq("slug", payload.slug);
  if (existing?.length) return res.status(400).json({ error: `Slug "${payload.slug}" already exists.` });
  const { data, error } = await supabase.from("products").insert([payload]).select().single();
  if (error) return res.status(400).json({ error: error.message });
  await syncTaxonomy(payload.categories, payload.tags);
  await rebuildSnapshot();
  res.json(data);
});

app.put("/api/products/:id", auth, async (req, res) => {
  const payload = buildProductPayload(req.body);
  payload.updated_at = new Date().toISOString();
  const { data: existing } = await supabase.from("products").select("id").eq("slug", payload.slug).neq("id", req.params.id);
  if (existing?.length) return res.status(400).json({ error: `Slug "${payload.slug}" already exists.` });
  const { data, error } = await supabase.from("products").update(payload).eq("id", req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  await syncTaxonomy(payload.categories, payload.tags);
  await rebuildSnapshot();
  res.json(data);
});

app.delete("/api/products/:id", auth, async (req, res) => {
  const { error } = await supabase.from("products").delete().eq("id", req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  await rebuildSnapshot();
  res.json({ ok: true });
});

app.post("/api/products/:id/duplicate", auth, async (req, res) => {
  const { data: src } = await supabase.from("products").select("*").eq("id", req.params.id).single();
  if (!src) return res.status(404).json({ error: "Not found." });
  const { id, created_at, updated_at, ...rest } = src;
  const payload = { ...rest, name: `${src.name} (Copy)`, slug: `${src.slug}-copy-${Date.now()}`, status: "draft", created_by: req.user.id, created_by_username: req.user.username };
  const { data, error } = await supabase.from("products").insert([payload]).select().single();
  if (error) return res.status(400).json({ error: error.message });
  await rebuildSnapshot();
  res.json(data);
});

app.post("/api/products/bulk", auth, async (req, res) => {
  const { ids, action } = req.body;
  if (!ids?.length || !action) return res.status(400).json({ error: "ids and action required." });
  const now = new Date().toISOString();
  let error;
  if (action === "delete")  ({ error } = await supabase.from("products").delete().in("id", ids));
  if (action === "publish") ({ error } = await supabase.from("products").update({ status: "published", updated_at: now }).in("id", ids));
  if (action === "draft")   ({ error } = await supabase.from("products").update({ status: "draft", updated_at: now }).in("id", ids));
  if (action === "show")    ({ error } = await supabase.from("products").update({ visible: true, updated_at: now }).in("id", ids));
  if (action === "hide")    ({ error } = await supabase.from("products").update({ visible: false, updated_at: now }).in("id", ids));
  if (error) return res.status(400).json({ error: error.message });
  await rebuildSnapshot();
  res.json({ ok: true, affected: ids.length });
});

// ═══════════════════════════════════════════════════════════
//  PUBLIC API
// ═══════════════════════════════════════════════════════════
app.get("/api/public/products", async (req, res) => {
  let q = supabase.from("products")
    .select("id,name,slug,short_description,thumbnail,images,spec_images,categories,tags,features,brand,type,sort_order,description")
    .eq("status", "published").eq("visible", true).order("sort_order", { ascending: true });
  if (req.query.category) q = q.contains("categories", [req.query.category]);
  if (req.query.tag)      q = q.contains("tags", [req.query.tag]);
  const { data, error } = await q;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.get("/api/public/products/:slug", async (req, res) => {
  const { data, error } = await supabase.from("products").select("*")
    .eq("slug", req.params.slug).eq("status", "published").eq("visible", true).single();
  if (error) return res.status(404).json({ error: "Not found." });
  res.json(data);
});

// ═══════════════════════════════════════════════════════════
//  PRODUCT LAYOUT (visual builder config)
// ═══════════════════════════════════════════════════════════
app.get("/api/product-layout", async (req, res) => {
  const { data } = await supabase.from("product_layout").select("*").eq("id", 1).single();
  res.json(data || { id: 1, blocks: [] });
});

app.put("/api/product-layout", auth, async (req, res) => {
  const { blocks } = req.body;
  const { data: existing } = await supabase.from("product_layout").select("id").eq("id", 1).single();
  const op = existing
    ? supabase.from("product_layout").update({ blocks, updated_at: new Date().toISOString() }).eq("id", 1)
    : supabase.from("product_layout").insert([{ id: 1, blocks }]);
  const { data, error } = await op.select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// ═══════════════════════════════════════════════════════════
//  SNAPSHOT (frontend cache)
// ═══════════════════════════════════════════════════════════
app.get("/api/snapshot", async (req, res) => {
  const { data } = await supabase.from("product_snapshots").select("data,updated_at").eq("id", 1).single();
  res.json(data || { data: [], updated_at: null });
});

app.post("/api/snapshot/rebuild", auth, async (req, res) => {
  await rebuildSnapshot();
  res.json({ ok: true });
});

async function rebuildSnapshot() {
  const { data } = await supabase.from("products")
    .select("*")
    .eq("status", "published").eq("visible", true)
    .order("sort_order", { ascending: true });
  await supabase.from("product_snapshots").upsert([{ id: 1, data: data || [], updated_at: new Date().toISOString() }]);
}

// ═══════════════════════════════════════════════════════════
//  IMAGE UPLOAD
// ═══════════════════════════════════════════════════════════
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

app.post("/api/upload", auth, upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file." });
  const ext = req.file.originalname.split(".").pop().toLowerCase();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("product-images").upload(fileName, req.file.buffer, { contentType: req.file.mimetype });
  if (error) return res.status(400).json({ error: error.message });
  const { data } = supabase.storage.from("product-images").getPublicUrl(fileName);
  res.json({ url: data.publicUrl, file_name: fileName });
});

app.post("/api/upload/multi", auth, upload.array("files", 20), async (req, res) => {
  if (!req.files?.length) return res.status(400).json({ error: "No files." });
  const results = [];
  for (const file of req.files) {
    const ext = file.originalname.split(".").pop().toLowerCase();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(fileName, file.buffer, { contentType: file.mimetype });
    if (error) continue;
    const { data } = supabase.storage.from("product-images").getPublicUrl(fileName);
    results.push({ url: data.publicUrl, file_name: fileName });
  }
  res.json(results);
});

function buildProductPayload(body) {
  const toArr = (v) => Array.isArray(v) ? v : (typeof v === "string" ? v.split(",").map(s => s.trim()).filter(Boolean) : []);
  return {
    name: body.name, slug: body.slug,
    short_description: body.short_description || null,
    description: body.description || null,
    thumbnail: body.thumbnail || null,
    images:      toArr(body.images),
    spec_images: toArr(body.spec_images),
    categories:  toArr(body.categories),
    tags:        toArr(body.tags),
    features:    toArr(body.features),
    brand: body.brand || null, type: body.type || null,
    status: body.status || "draft",
    visible:   body.visible  !== undefined ? body.visible  : true,
    featured:  body.featured !== undefined ? body.featured : false,
    sort_order: body.sort_order || 0,
    spec_table: body.spec_table || null,
    resources:  body.resources  || null,
  };
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ SAWO API → http://localhost:${PORT}`));
