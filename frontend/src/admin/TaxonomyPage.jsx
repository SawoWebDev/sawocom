// src/admin/TaxonomyPage.jsx — v6
// 2-col layout: categories left, tags right as pills
// Click category → product grid cards (image + name, clickable, pencil edit)
import React, { useEffect, useState } from "react";
import {
  apiGetCategories, apiCreateCategory, apiUpdateCategory, apiDeleteCategory,
  apiGetTags, apiCreateTag, apiDeleteTag,
  apiGetProducts, apiGetProduct, apiUpdateProduct,
} from "../lib/api";
import {
  Toast, useToast, Field, RichField, Select, Btn, IconBtn, Modal, Confirm,
  PageShell, Badge, Card, EmptyState, PillInput, ImageUploader, ImageStrip,
  Toggle, Checkbox, SectionLabel, StatusBadge, C, F,
} from "./ui";
import { apiGetCategories as fetchCats, apiGetTags as fetchTags, apiCreateCategory as createCat, apiCreateTag as createTag, apiUploadImage, apiUploadImages } from "../lib/api";
import { useRef } from "react";
const FRONT_URL = process.env.REACT_APP_FRONT_URL || "http://localhost:3000";

// ── Reusable category row ─────────────────────────────────────────────
function CatRow({ cat, onClick, onEdit, onDelete }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderBottom: `1px solid ${C.border}`, background: hov ? C.primaryXlt : "transparent", transition: "background 0.13s", cursor: "pointer" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={onClick}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: F, fontWeight: 600, fontSize: "0.84rem", color: C.text }}>{cat.name}</div>
        {cat.description && <div style={{ fontFamily: F, fontSize: "0.7rem", color: C.textLight, marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cat.description}</div>}
      </div>
      {cat.usage_count > 0 && (
        <span style={{ background: C.primaryXlt, color: C.primary, padding: "2px 8px", borderRadius: 20, fontSize: "0.68rem", fontWeight: 700, fontFamily: F, whiteSpace: "nowrap" }}>{cat.usage_count}</span>
      )}
      {/* Edit / Delete — stop propagation so they don't trigger onClick */}
      <div style={{ display: "flex", gap: 3 }} onClick={e => e.stopPropagation()}>
        <button type="button" onClick={onEdit}
          style={{ background: "none", border: "none", cursor: "pointer", color: C.textLight, padding: "4px 6px", borderRadius: 4 }}
          onMouseEnter={e => { e.currentTarget.style.color = C.primary; e.currentTarget.style.background = C.primaryXlt; }}
          onMouseLeave={e => { e.currentTarget.style.color = C.textLight; e.currentTarget.style.background = "none"; }}>
          <i className="fa-solid fa-pen" style={{ fontSize: "0.75rem" }} />
        </button>
        <button type="button" onClick={onDelete}
          style={{ background: "none", border: "none", cursor: "pointer", color: C.textLight, padding: "4px 6px", borderRadius: 4 }}
          onMouseEnter={e => { e.currentTarget.style.color = C.danger; e.currentTarget.style.background = C.dangerLt; }}
          onMouseLeave={e => { e.currentTarget.style.color = C.textLight; e.currentTarget.style.background = "none"; }}>
          <i className="fa-solid fa-trash" style={{ fontSize: "0.75rem" }} />
        </button>
      </div>
      <i className="fa-solid fa-chevron-right" style={{ color: C.textLight, fontSize: "0.65rem", flexShrink: 0 }} />
    </div>
  );
}

// ── Tag pill ──────────────────────────────────────────────────────────
function TagPill({ tag, onDelete }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: hov ? C.primaryXlt : C.bg, border: `1.5px solid ${hov ? C.primary : C.border}`, borderRadius: 20, padding: "4px 6px 4px 12px", transition: "all 0.15s", cursor: "default" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <span style={{ fontFamily: F, fontSize: "0.8rem", fontWeight: 500, color: C.text }}>{tag.name}</span>
      {tag.usage_count > 0 && (
        <span style={{ background: C.primary, color: "#fff", borderRadius: 20, padding: "1px 7px", fontSize: "0.62rem", fontWeight: 700 }}>{tag.usage_count}</span>
      )}
      <button type="button" onClick={onDelete}
        style={{ background: "none", border: "none", cursor: "pointer", color: C.textLight, padding: "2px 4px", lineHeight: 1, borderRadius: "50%", display: "flex", alignItems: "center" }}
        onMouseEnter={e => e.currentTarget.style.color = C.danger}
        onMouseLeave={e => e.currentTarget.style.color = C.textLight}>
        <i className="fa-solid fa-xmark" style={{ fontSize: "0.72rem" }} />
      </button>
    </div>
  );
}

// ── Product card for category view ─────────────────────────────────────
function ProductCard({ product, onEdit }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ background: C.surface, borderRadius: 10, border: `1px solid ${C.border}`, overflow: "hidden", position: "relative", transition: "box-shadow 0.2s", boxShadow: hov ? "0 6px 22px rgba(175,133,100,0.18)" : "none" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>

      {/* Pencil icon — upper right */}
      <button type="button" onClick={e => { e.stopPropagation(); onEdit(product); }}
        title="Edit product"
        style={{
          position: "absolute", top: 8, right: 8, zIndex: 3,
          background: "rgba(255,255,255,0.92)", border: `1px solid ${C.border}`,
          borderRadius: 6, width: 28, height: 28, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: C.primary, fontSize: "0.72rem", transition: "all 0.15s",
          boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = C.primary; e.currentTarget.style.color = "#fff"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.92)"; e.currentTarget.style.color = C.primary; }}>
        <i className="fa-solid fa-pen" />
      </button>

      {/* Image */}
      <a href={`${FRONT_URL}/products/${product.slug}`} target="_blank" rel="noopener noreferrer">
        <div style={{ height: 140, background: C.bg, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {product.thumbnail
            ? <img src={product.thumbnail} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain", transition: "transform 0.3s", transform: hov ? "scale(1.04)" : "scale(1)" }} />
            : <i className="fa-regular fa-image" style={{ color: C.border, fontSize: "2.2rem" }} />
          }
        </div>
      </a>

      {/* Name — clickable */}
      <div style={{ padding: "10px 12px 12px" }}>
        <a href={`${FRONT_URL}/products/${product.slug}`} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: F, fontWeight: 700, fontSize: "0.82rem", color: C.text, textDecoration: "none", lineHeight: 1.3, display: "block", marginBottom: 5, transition: "color 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.color = C.primary}
          onMouseLeave={e => e.currentTarget.style.color = C.text}>
          {product.name}
        </a>
        <StatusBadge status={product.status} visible={product.visible} />
      </div>
    </div>
  );
}

// ── Inline product edit modal (reuses full product form) ──────────────
// We pull in ProductEditModal which is just the modal portion from ProductsPage
function ProductEditModal({ product, allCats, allTags, onClose, onSaved, add }) {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [upThumb, setUpThumb] = useState(false);
  const [upImgs, setUpImgs]   = useState(false);
  const thumbRef = useRef();

  useEffect(() => {
    if (!product) return;
    apiGetProduct(product.id).then(p => setForm({
      name: p.name || "", slug: p.slug || "", short_description: p.short_description || "",
      description: p.description || "", thumbnail: p.thumbnail || "",
      images: p.images || [], spec_images: p.spec_images || [], files: p.files || [],
      categories: p.categories || [], tags: p.tags || [], features: p.features || [],
      brand: p.brand || "", type: p.type || "", status: p.status || "draft",
      visible: p.visible !== false, featured: p.featured || false, sort_order: p.sort_order || 0,
    })).catch(() => {});
  }, [product]);

  const uploadThumb = async (file) => {
    setUpThumb(true);
    try { const { url } = await apiUploadImage(file); setForm(f => ({ ...f, thumbnail: url })); }
    catch (err) { add(err.message, "error"); }
    finally { setUpThumb(false); }
  };

  const uploadImgs = async (files) => {
    setUpImgs(true);
    try {
      const results = await apiUploadImages(Array.isArray(files) ? files : [files]);
      setForm(f => ({ ...f, images: [...f.images, ...results.map(r => r.url)] }));
    } catch (err) { add(err.message, "error"); }
    finally { setUpImgs(false); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name || !form.slug) return add("Name and slug required.", "error");
    setSaving(true);
    try { await apiUpdateProduct(product.id, form); add("Product saved.", "success"); onSaved(); }
    catch (err) { add(err.message, "error"); }
    finally { setSaving(false); }
  };

  if (!form) return (
    <Modal open title={`Edit: ${product?.name}`} onClose={onClose} width={700}>
      <div style={{ padding: "40px", textAlign: "center", color: C.textLight, fontFamily: F }}>
        <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: 8 }} />Loading…
      </div>
    </Modal>
  );

  return (
    <Modal open title={`Edit: ${product.name}`} onClose={onClose} width={720}>
      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 14 }}>

        <SectionLabel label="Featured Image" />
        <input ref={thumbRef} type="file" accept="image/*" style={{ display: "none" }}
          onChange={e => { if (e.target.files[0]) { uploadThumb(e.target.files[0]); e.target.value = ""; } }} />
        {form.thumbnail ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ width: "100%", maxWidth: 300, height: 200, borderRadius: 10, overflow: "hidden", border: `2px solid ${C.border}`, background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={form.thumbnail} alt="thumb" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <label style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 16px", background: C.primary, color: "#fff", borderRadius: 7, cursor: upThumb ? "not-allowed" : "pointer", fontFamily: F, fontWeight: 700, fontSize: "0.78rem", opacity: upThumb ? 0.7 : 1 }}>
                <i className="fa-solid fa-arrow-up-from-bracket" />
                {upThumb ? "Uploading…" : "Replace Image"}
                <input type="file" accept="image/*" style={{ display: "none" }} disabled={upThumb} onChange={e => { if (e.target.files[0]) { uploadThumb(e.target.files[0]); e.target.value = ""; } }} />
              </label>
              <Btn label="Remove" variant="ghost" icon="fa-xmark" size="sm" onClick={() => setForm(f => ({ ...f, thumbnail: "" }))} />
            </div>
          </div>
        ) : (
          <ImageUploader onUpload={f => uploadThumb(f instanceof FileList ? f[0] : f)} label="Add Featured Image — click or drag & drop" uploading={upThumb} />
        )}

        <SectionLabel label="Basic Info" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="Product Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
          <Field label="Slug" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })) } required helper="URL identifier" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="Brand" value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} />
          <Field label="Type" value={form.type}  onChange={e => setForm(f => ({ ...f, type: e.target.value }))} />
        </div>
        <Field label="Short Description" value={form.short_description} onChange={e => setForm(f => ({ ...f, short_description: e.target.value }))} />
        <RichField label="Full Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />

        <SectionLabel label="Categories & Tags" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <PillInput label="Categories" value={form.categories} onChange={v => setForm(f => ({ ...f, categories: v }))} suggestions={allCats} />
          <PillInput label="Tags" value={form.tags} onChange={v => setForm(f => ({ ...f, tags: v }))} suggestions={allTags} />
        </div>
        <PillInput label="Features" value={form.features} onChange={v => setForm(f => ({ ...f, features: v }))} />

        <SectionLabel label="Gallery Images" />
        {form.images.length > 0 ? (
          <>
            <ImageStrip images={form.images} onRemove={i => setForm(f => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }))} />
            <label style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 6, cursor: upImgs ? "not-allowed" : "pointer", fontFamily: F, fontSize: "0.78rem", fontWeight: 600, color: C.textMid, marginTop: 6, opacity: upImgs ? 0.7 : 1 }}>
              <i className="fa-solid fa-plus" />
              {upImgs ? "Uploading…" : "Add More Images"}
              <input type="file" accept="image/*" multiple onChange={e => e.target.files?.length && uploadImgs(Array.from(e.target.files))} style={{ display: "none" }} disabled={upImgs} />
            </label>
          </>
        ) : (
          <ImageUploader onUpload={uploadImgs} label="Upload Gallery Images" multiple uploading={upImgs} />
        )}

        <SectionLabel label="Status & Visibility" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, alignItems: "start" }}>
          <Select label="Status" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} options={[{ value: "draft", label: "Draft" }, { value: "published", label: "Published" }]} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 20 }}>
            <Toggle label="Visible" checked={form.visible} onChange={v => setForm(f => ({ ...f, visible: v }))} helper="Show on website" />
            <Toggle label="Featured" checked={form.featured} onChange={v => setForm(f => ({ ...f, featured: v }))} />
          </div>
          <Field label="Sort Order" type="number" value={String(form.sort_order)} onChange={e => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))} helper="Lower = first" />
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
          <Btn label="Cancel" variant="ghost" onClick={onClose} />
          <Btn loading={saving} label="Save Changes" icon="fa-check" type="submit" />
        </div>
      </form>
    </Modal>
  );
}

// ── Main TaxonomyPage ─────────────────────────────────────────────────
export default function TaxonomyPage() {
  const { toasts, add, remove } = useToast();

  // Categories
  const [cats, setCats]         = useState([]);
  const [catLoading, setCatLoading] = useState(true);
  const [catModal, setCatModal] = useState(false);
  const [editCat, setEditCat]   = useState(null);
  const [catForm, setCatForm]   = useState({ name: "", description: "" });
  const [delCat, setDelCat]     = useState(null);
  const [savingCat, setSavingCat] = useState(false);

  // Category → products drill-down
  const [viewCat, setViewCat]         = useState(null);
  const [catProds, setCatProds]       = useState([]);
  const [catProdsLoading, setCatProdsLoading] = useState(false);

  // Product edit modal (from taxonomy view)
  const [editingProd, setEditingProd] = useState(null);

  // Tags
  const [tags, setTags]         = useState([]);
  const [tagLoading, setTagLoading] = useState(true);
  const [newTag, setNewTag]     = useState("");
  const [savingTag, setSavingTag] = useState(false);
  const [delTag, setDelTag]     = useState(null);

  const loadCats = async () => { setCatLoading(true); try { setCats(await apiGetCategories()); } catch {} finally { setCatLoading(false); } };
  const loadTags = async () => { setTagLoading(true); try { setTags(await apiGetTags()); }       catch {} finally { setTagLoading(false); } };

  useEffect(() => { loadCats(); loadTags(); }, []);

  // ── Category CRUD ─────────────────────────────────────────────────
  const openCreateCat = () => { setEditCat(null); setCatForm({ name: "", description: "" }); setCatModal(true); };
  const openEditCat   = (c) => { setEditCat(c); setCatForm({ name: c.name, description: c.description || "" }); setCatModal(true); };

  const handleSaveCat = async (e) => {
    e.preventDefault();
    if (!catForm.name.trim()) return add("Name required.", "error");
    setSavingCat(true);
    try {
      editCat ? await apiUpdateCategory(editCat.id, catForm) : await apiCreateCategory(catForm);
      add(editCat ? "Updated." : "Category created.", "success");
      setCatModal(false); loadCats();
      // If we were viewing this category, refresh its name in the view
      if (viewCat && editCat?.id === viewCat.id) setViewCat({ ...viewCat, ...catForm });
    } catch (err) { add(err.message, "error"); }
    finally { setSavingCat(false); }
  };

  const handleDelCat = async () => {
    try { await apiDeleteCategory(delCat.id); add("Deleted.", "success"); if (viewCat?.id === delCat.id) setViewCat(null); }
    catch (err) { add(err.message, "error"); }
    finally { setDelCat(null); loadCats(); }
  };

  const openCatProducts = async (cat) => {
    setViewCat(cat); setCatProdsLoading(true);
    try { const prods = await apiGetProducts({ category: cat.name }); setCatProds(prods); }
    catch (err) { add(err.message, "error"); }
    finally { setCatProdsLoading(false); }
  };

  const refreshCatProds = async () => {
    if (!viewCat) return;
    try { const prods = await apiGetProducts({ category: viewCat.name }); setCatProds(prods); }
    catch {}
  };

  // ── Tags CRUD ─────────────────────────────────────────────────────
  const handleAddTag = async (e) => {
    e.preventDefault();
    if (!newTag.trim()) return;
    setSavingTag(true);
    try { await apiCreateTag({ name: newTag.trim() }); add("Tag created.", "success"); setNewTag(""); loadTags(); }
    catch (err) { add(err.message, "error"); }
    finally { setSavingTag(false); }
  };

  const handleDelTag = async () => {
    try { await apiDeleteTag(delTag.id); add("Deleted.", "success"); }
    catch (err) { add(err.message, "error"); }
    finally { setDelTag(null); loadTags(); }
  };

  // allCats / allTags for the edit modal pill inputs
  const allCatsNames = cats.map(c => c.name);
  const allTagsNames = tags.map(t => t.name);

  return (
    <PageShell title="Categories & Tags" subtitle="Manage taxonomy — click a category to see its products">
      <Toast toasts={toasts} remove={remove} />

      {/* ── 2-COLUMN MAIN LAYOUT ── */}
      {!viewCat ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>

          {/* ─── LEFT: Categories ─── */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <h2 style={{ fontFamily: F, fontWeight: 700, color: C.text, margin: 0, fontSize: "0.95rem" }}>
                Categories <span style={{ color: C.textLight, fontWeight: 400, fontSize: "0.78rem" }}>({cats.length})</span>
              </h2>
              <Btn icon="fa-plus" label="New" size="sm" onClick={openCreateCat} />
            </div>
            <Card>
              {catLoading ? (
                <div style={{ padding: "20px", textAlign: "center", color: C.textLight, fontFamily: F, fontSize: "0.82rem" }}>
                  <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: 8 }} />Loading…
                </div>
              ) : cats.length === 0 ? (
                <EmptyState icon="fa-folder" title="No categories" action={<Btn icon="fa-plus" label="Add Category" size="sm" onClick={openCreateCat} />} />
              ) : (
                <>
                  {/* Column header */}
                  <div style={{ display: "flex", padding: "7px 14px", borderBottom: `2px solid ${C.border}`, background: C.bg }}>
                    <span style={{ flex: 1, fontFamily: F, fontSize: "0.65rem", fontWeight: 700, color: C.textLight, textTransform: "uppercase", letterSpacing: "0.07em" }}>Category</span>
                    <span style={{ fontFamily: F, fontSize: "0.65rem", fontWeight: 700, color: C.textLight, textTransform: "uppercase", letterSpacing: "0.07em", marginRight: 60 }}>Products</span>
                  </div>
                  {cats.map(c => (
                    <CatRow key={c.id} cat={c} onClick={() => openCatProducts(c)} onEdit={() => openEditCat(c)} onDelete={() => setDelCat(c)} />
                  ))}
                </>
              )}
            </Card>
            <p style={{ fontFamily: F, fontSize: "0.72rem", color: C.textLight, margin: "8px 0 0", paddingLeft: 4 }}>
              <i className="fa-solid fa-circle-info" style={{ marginRight: 5, color: C.primary }} />
              Click any category to browse its products
            </p>
          </div>

          {/* ─── RIGHT: Tags as pills ─── */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <h2 style={{ fontFamily: F, fontWeight: 700, color: C.text, margin: 0, fontSize: "0.95rem" }}>
                Tags <span style={{ color: C.textLight, fontWeight: 400, fontSize: "0.78rem" }}>({tags.length})</span>
              </h2>
            </div>

            {/* Quick add */}
            <form onSubmit={handleAddTag} style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              <input value={newTag} onChange={e => setNewTag(e.target.value)} placeholder="New tag name…"
                style={{ flex: 1, padding: "8px 10px", borderRadius: 6, border: `1.5px solid ${C.border}`, fontFamily: F, fontSize: "0.875rem", background: C.surface, color: C.text, outline: "none" }} />
              <Btn type="submit" loading={savingTag} label="Add" icon="fa-plus" />
            </form>

            <Card style={{ padding: 14, minHeight: 160 }}>
              {tagLoading ? (
                <div style={{ textAlign: "center", color: C.textLight, fontFamily: F, fontSize: "0.82rem", padding: "20px" }}>
                  <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: 8 }} />Loading…
                </div>
              ) : tags.length === 0 ? (
                <div style={{ textAlign: "center", padding: "24px 12px", color: C.textLight, fontFamily: F, fontSize: "0.82rem", fontStyle: "italic" }}>
                  No tags yet. Add one above or create tags while editing a product.
                </div>
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {tags.map(t => (
                    <TagPill key={t.id} tag={t} onDelete={() => setDelTag(t)} />
                  ))}
                </div>
              )}
            </Card>
            <p style={{ fontFamily: F, fontSize: "0.72rem", color: C.textLight, margin: "8px 0 0", paddingLeft: 4 }}>
              <i className="fa-solid fa-circle-info" style={{ marginRight: 5, color: C.primary }} />
              The badge number shows how many products use each tag. Tags are also created automatically when added in the product form.
            </p>
          </div>
        </div>
      ) : (

        /* ── CATEGORY PRODUCTS GRID ── */
        <div>
          {/* Back nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <button type="button" onClick={() => setViewCat(null)}
              style={{ background: "none", border: "none", cursor: "pointer", color: C.primary, fontFamily: F, fontSize: "0.82rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
              <i className="fa-solid fa-arrow-left" /> Categories
            </button>
            <span style={{ color: C.textLight }}>›</span>
            <h2 style={{ fontFamily: F, fontWeight: 700, color: C.text, margin: 0, fontSize: "1rem" }}>{viewCat.name}</h2>
            {viewCat.description && <span style={{ fontFamily: F, fontSize: "0.78rem", color: C.textLight }}>— {viewCat.description}</span>}
            <span style={{ marginLeft: "auto" }}>
              <Btn size="sm" icon="fa-pen" label="Edit Category" variant="light" onClick={() => openEditCat(viewCat)} />
            </span>
          </div>

          {/* Product grid */}
          {catProdsLoading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 14 }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ background: C.surface, borderRadius: 10, border: `1px solid ${C.border}`, overflow: "hidden" }}>
                  <div style={{ height: 140, background: `linear-gradient(90deg,${C.border} 25%,${C.bg} 50%,${C.border} 75%)`, backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite" }} />
                  <div style={{ padding: "10px 12px 12px" }}>
                    <div style={{ height: 12, background: C.border, borderRadius: 4, marginBottom: 6 }} />
                    <div style={{ height: 10, width: "60%", background: C.border, borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>
          ) : catProds.length === 0 ? (
            <EmptyState icon="fa-box-open" title="No products in this category"
              message="Assign products to this category from the Products page." />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 14 }}>
              {catProds.map(p => (
                <ProductCard key={p.id} product={p} onEdit={prod => setEditingProd(prod)} />
              ))}
            </div>
          )}
          <p style={{ fontFamily: F, fontSize: "0.72rem", color: C.textLight, marginTop: 16 }}>
            <i className="fa-solid fa-circle-info" style={{ marginRight: 5 }} />
            Click a product name to view it on the website. Click the pencil icon to edit.
          </p>
        </div>
      )}

      {/* ── Category edit/create modal ── */}
      <Modal open={catModal} onClose={() => setCatModal(false)} title={editCat ? "Edit Category" : "New Category"} width={420}>
        <form onSubmit={handleSaveCat} style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          <Field label="Name" value={catForm.name} onChange={e => setCatForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Wall-Mounted" required />
          <Field label="Description (optional)" value={catForm.description} onChange={e => setCatForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief description…" />
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Btn label="Cancel" variant="ghost" onClick={() => setCatModal(false)} />
            <Btn loading={savingCat} label={editCat ? "Save" : "Create"} icon="fa-check" type="submit" />
          </div>
        </form>
      </Modal>

      {/* ── Product edit modal (inline from taxonomy) ── */}
      {editingProd && (
        <ProductEditModal
          product={editingProd}
          allCats={allCatsNames}
          allTags={allTagsNames}
          onClose={() => setEditingProd(null)}
          onSaved={() => { setEditingProd(null); refreshCatProds(); }}
          add={add}
        />
      )}

      <Confirm open={!!delCat}  onClose={() => setDelCat(null)}  onConfirm={handleDelCat}  title="Delete Category?" message={`Delete "${delCat?.name}"? Products using it won't be affected.`} confirmLabel="Delete" />
      <Confirm open={!!delTag}  onClose={() => setDelTag(null)}  onConfirm={handleDelTag}  title="Delete Tag?"      message={`Delete tag "${delTag?.name}"?`} confirmLabel="Delete" />
    </PageShell>
  );
}