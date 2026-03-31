# SAWO Admin v4 — What Changed & Setup

## Files in this update

```
server/
  index.js              ← Gallery removed. Categories, tags, password reset, snapshot added.
  package.json          ← Added: nodemailer

src/
  admin/
    Login.jsx           ← Centered, logo, forgot password flow, no two-column
    Dashboard.jsx       ← Logo image in sidebar (no text), no nav icons, Gallery removed
    ProductsPage.jsx    ← Tags+categories in table, click-name preview, better image UX, loading skeletons
    TaxonomyPage.jsx    ← NEW: Categories & Tags management with autocomplete
    UsersPage.jsx       ← Unchanged (keep v3 version, colors auto-update via ui.jsx)
    LayoutPage.jsx      ← Unchanged (keep v3 version)
    DetailsPage.jsx     ← Unchanged (keep v3 version)
    ProtectedRoute.jsx  ← Minor color update
    ui.jsx              ← #af8564 primary, hover states, Skeleton component added

  lib/
    api.js              ← Gallery removed. Categories, tags, snapshot, reset added. Cache helpers.

  pages/Sauna/heaters/
    WallMounted.jsx     ← ALL products shown, no filters, localStorage cache + offline sync
```

## Step 1 — Run the SQL migration

Supabase → SQL Editor → paste `database-migration-v4.sql` → Run

This:
- Drops the gallery table
- Creates categories, tags, password_reset_tokens, product_snapshots tables
- Seeds some default categories

## Step 2 — Install new server dependency

```bash
cd server
npm install
```
(adds `nodemailer`)

## Step 3 — Add to server/.env (for password reset emails)

```env
# Optional — if not set, reset links are logged to console (dev mode)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your_app_password
```

If you leave SMTP out, when someone requests a reset link it will be logged to the server console — useful for testing.

## Step 4 — Update the logo import path

In `Login.jsx` and `Dashboard.jsx`, the logo is imported as:
```js
import logo from "../assets/SAWO-logo.webp";
```

Make sure `SAWO-logo.webp` is copied to `src/assets/SAWO-logo.webp` in your project.

## Step 5 — Why WallMounted shows nothing (the fix)

The old version filtered by `category=Wall-Mounted` AND also filtered client-side by `FIXED_ORDER` tags.
The new version: **fetches ALL published+visible products, shows all of them, no grouping, no filtering.**
So as long as your product has `status=published` and `visible=true` in the admin, it will show.

## Step 6 — Caching behavior

- **WallMounted.jsx** caches the product list in `localStorage` for 5 minutes
- On load: shows cached data immediately (no blank screen), then silently refetches in background
- When offline: shows last cached data + shows "You're offline" banner
- When back online: auto-refetches and updates cache

## Color reference

All colors come from `src/admin/ui.jsx` → `C` object.
Primary: `#af8564` · Dark: `#8c6a4f` · Light: `#c9a47a` · XLight: `#f5ede3`
