// server/createAdmin.js
// ─────────────────────────────────────────────────────────────
// Run this ONCE to create your first admin user.
// Usage: node createAdmin.js
// First run this in server/npm run dev
// ─────────────────────────────────────────────────────────────

const bcrypt = require("bcryptjs");
const { createClient } = require("@supabase/supabase-js");
const readline = require("readline");
require("dotenv").config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

async function main() {
  console.log("\n═══════════════════════════════════");
  console.log("  SAWO – Create First Admin User");
  console.log("═══════════════════════════════════\n");

  const username = (await ask("Username (e.g. admin): ")).trim().toLowerCase();
  const full_name = (await ask("Full name (e.g. John Cruz): ")).trim();
  const email = (await ask("Email (for password reset, optional): ")).trim();
  const password = (await ask("Password (min 6 characters): ")).trim();

  if (!username || !password) {
    console.error("\n❌ Username and password are required.\n");
    process.exit(1);
  }
  if (password.length < 6) {
    console.error("\n❌ Password must be at least 6 characters.\n");
    process.exit(1);
  }

  const password_hash = await bcrypt.hash(password, 12);

  const { data, error } = await supabase
    .from("users")
    .insert([{ username, full_name, email: email || null, password_hash, role: "admin" }])
    .select("id, username, full_name, role")
    .single();

  if (error) {
    console.error("\n❌ Failed to create user:", error.message, "\n");
  } else {
    console.log("\n✅ Admin user created successfully!");
    console.log(`   Username : ${data.username}`);
    console.log(`   Name     : ${data.full_name}`);
    console.log(`   Role     : ${data.role}`);
    console.log(`   ID       : ${data.id}`);
    console.log("\nYou can now log in at /admin/login\n");
  }

  rl.close();
}

main();
