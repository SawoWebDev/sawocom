// src/pages/Sauna/heaters/AllHeaters.jsx
// Shows ALL published sauna heater products with search, category pills, and tag chips
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import CirclesInfo from "../../../components/CirclesInfo";
import "./heaters.css";

const API       = process.env.REACT_APP_API_URL || "http://localhost:4000";
const CACHE_KEY = "sawo_heaters_products";
const CACHE_TS  = "sawo_heaters_products_ts";
const CACHE_TTL = 5 * 60 * 1000;

// ─── Category definitions ────────────────────────────────────────────────────
const CATEGORIES = [
  { label: "All",            value: "all" },
  { label: "Wall Mounted",   value: "wall-mounted" },
  { label: "Floor Standing", value: "floor-standing" },
  { label: "Corner",         value: "corner" },
  { label: "Ceiling",        value: "ceiling" },
  { label: "Electric",       value: "electric" },
  { label: "Wood Burning",   value: "wood-burning" },
];

// ─── Cache helpers ────────────────────────────────────────────────────────────
function getCached() {
  try {
    const data = localStorage.getItem(CACHE_KEY);
    const ts   = parseInt(localStorage.getItem(CACHE_TS) || "0");
    if (data && Date.now() - ts < CACHE_TTL) return JSON.parse(data);
  } catch {}
  return null;
}
function setCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_TS, Date.now().toString());
  } catch {}
}

// ─── Skeleton card ─────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="wm-product-item" style={{ opacity: 0.45 }}>
      <div
        className="wm-product-img-wrap"
        style={{
          background: "linear-gradient(90deg,#f0ebe3 25%,#faf8f5 50%,#f0ebe3 75%)",
          backgroundSize: "200% 100%",
          animation: "wm-shimmer 1.5s infinite",
          borderRadius: 8,
        }}
      />
      <div style={{ height: 10, background: "#f0ebe3", borderRadius: 4, marginTop: 8, width: "70%", animation: "wm-shimmer 1.5s infinite" }} />
    </div>
  );
}

// ─── Product card ─────────────────────────────────────────────────────────
function ProductCard({ product }) {
  const power = (product.tags || []).find(t => /\d+(\.\d+)?\s*[-–]\s*\d+(\.\d+)?\s*kW/i.test(t)) || "";

  return (
    <Link
      to={`/products/${product.slug}`}
      className="wm-product-item"
      style={{ textDecoration: "none" }}
    >
      <div className="wm-product-img-wrap">
        {product.thumbnail ? (
          <img
            src={product.thumbnail}
            alt={product.name}
            className="wm-product-img"
            onError={e => { e.currentTarget.style.display = "none"; }}
          />
        ) : (
          <div className="wm-product-img-placeholder">
            <i className="fas fa-image" />
          </div>
        )}
      </div>
      <p className="wm-product-name">{product.name}</p>
      {power && <p className="wm-product-power">{power}</p>}
    </Link>
  );
}

// ─── Main component ────────────────────────────────────────────────────────
export default function AllHeaters() {
  const cached = getCached();
  const [products,       setProducts]       = useState(cached || []);
  const [loading,        setLoading]        = useState(!cached);
  const [syncing,        setSyncing]        = useState(false);
  const [offline,        setOffline]        = useState(!navigator.onLine);
  const [searchQuery,    setSearchQuery]    = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTags,     setActiveTags]     = useState([]);

  // ── Connectivity listeners ────────────────────────────────────────────────
  useEffect(() => {
    const onOnline  = () => { setOffline(false); fetchProducts(true); };
    const onOffline = () => setOffline(true);
    window.addEventListener("online",  onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online",  onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { fetchProducts(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Fetch ─────────────────────────────────────────────────────────────────
  async function fetchProducts(force = false) {
    const c = getCached();
    if (c && !force) {
      setProducts(c);
      setLoading(false);
      setSyncing(true);
    } else if (!c) {
      setLoading(true);
    }

    try {
      const res = await fetch(`${API}/api/public/products`, { signal: AbortSignal.timeout(8000) });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
        setCache(data);
      }
    } catch {
      try {
        const snap = await fetch(`${API}/api/snapshot`, { signal: AbortSignal.timeout(5000) });
        if (snap.ok) {
          const s    = await snap.json();
          const list = Array.isArray(s?.data) ? s.data : Array.isArray(s) ? s : [];
          if (list.length) { setProducts(list); setCache(list); }
        }
      } catch {}
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  }

  // ── All unique non-power tags ─────────────────────────────────────────────
  const allTags = useMemo(() => {
    const tagSet = new Set();
    products.forEach(p =>
      (p.tags || []).forEach(t => {
        if (!/\d+(\.\d+)?\s*[-–]\s*\d+(\.\d+)?\s*kW/i.test(t)) tagSet.add(t);
      })
    );
    return Array.from(tagSet).sort();
  }, [products]);

  // ── Filtered products ─────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return products.filter(p => {
      const query = searchQuery.trim().toLowerCase();

      const matchesSearch =
        !query ||
        (p.name || "").toLowerCase().includes(query) ||
        (p.description || "").toLowerCase().includes(query) ||
        (p.tags || []).some(t => t.toLowerCase().includes(query));

      const matchesCategory =
        activeCategory === "all" ||
        (p.tags || []).some(t => t.toLowerCase().replace(/\s+/g, "-") === activeCategory) ||
        (p.category || "").toLowerCase().replace(/\s+/g, "-") === activeCategory;

      const matchesTags =
        activeTags.length === 0 ||
        activeTags.every(tag => (p.tags || []).includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [products, searchQuery, activeCategory, activeTags]);

  function toggleTag(tag) {
    setActiveTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }

  function clearFilters() {
    setSearchQuery("");
    setActiveCategory("all");
    setActiveTags([]);
  }

  const hasActiveFilters = searchQuery.trim() || activeCategory !== "all" || activeTags.length > 0;

  return (
    <div className="relative" style={{ paddingTop: "90px" }}>
      <style>{`

        /* ── Page header ── */
        .sh-header {
          padding: 56px 24px 36px;
          text-align: center;
          border-bottom: 1px solid #ede8e0;
        }

        /* ── Sticky filter bar ── */
        .sh-filter-bar {
          position: sticky;
          top: 0;
          z-index: 50;
          background: #faf8f5;
          border-bottom: 1px solid #ede8e0;
          padding: 14px 24px 12px;
          box-shadow: 0 2px 12px rgba(44,31,19,0.06);
        }
        .sh-filter-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* Search row */
        .sh-search-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .sh-search-wrap {
          position: relative;
          flex: 1;
          max-width: 420px;
        }
        .sh-search-icon {
          position: absolute;
          left: 13px;
          top: 50%;
          transform: translateY(-50%);
          color: #AA8161;
          font-size: 0.82rem;
          pointer-events: none;
        }
        .sh-search-input {
          width: 100%;
          padding: 9px 14px 9px 36px;
          border: 1.5px solid #e0d0c0;
          border-radius: 6px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.82rem;
          color: #2c1f13;
          background: #fff;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .sh-search-input:focus        { border-color: #AA8161; }
        .sh-search-input::placeholder { color: #b0a090; }

        .sh-clear-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.73rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #AA8161;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px 2px;
          white-space: nowrap;
          opacity: 0.85;
          transition: opacity 0.15s;
        }
        .sh-clear-btn:hover { opacity: 1; }

        .sh-result-count {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.04em;
          color: #999;
          white-space: nowrap;
          margin-left: auto;
        }

        /* Tag chips */
        .sh-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          align-items: center;
        }
        .sh-tags-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #AA8161;
          margin-right: 2px;
        }
        .sh-tag-chip {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          padding: 4px 10px;
          border-radius: 4px;
          border: 1px solid #e0d0c0;
          background: #f5f0ea;
          color: #6b5b4e;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .sh-tag-chip:hover               { border-color: #AA8161; color: #AA8161; }
        .sh-tag-chip.sh-tag-chip--active {
          background: #fdf0e0;
          border-color: #AA8161;
          color: #AA8161;
          font-weight: 700;
        }

        /* No results */
        .sh-no-results {
          text-align: center;
          padding: 64px 24px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.88rem;
          color: #999;
          line-height: 1.7;
        }
        .sh-no-results strong {
          display: block;
          font-size: 1rem;
          color: #6b5b4e;
          margin-bottom: 6px;
        }
        .sh-no-results-reset {
          margin-top: 14px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #AA8161;
          background: none;
          border: none;
          cursor: pointer;
        }
      `}</style>

      {/* ── PAGE HEADER ─────────────────────────────────────────────────────── */}
      <section className="sh-header">
        <p className="wm-eyebrow">SAWO HEATERS</p>
        <h1 className="wm-products-title">Sauna Heaters</h1>
        <p className="wm-products-desc" style={{ maxWidth: 600, margin: "0 auto" }}>
          Discover our full range of sauna heaters — from wall-mounted and floor-standing
          to wood-burning and electric models. Crafted for durability, efficiency,
          and the authentic sauna experience.
        </p>
      </section>

      {/* ── STICKY FILTER BAR ────────────────────────────────────────────────── */}
      <div className="sh-filter-bar">
        <div className="sh-filter-inner">

          {/* Search + clear + count */}
          <div className="sh-search-row">
            <div className="sh-search-wrap">
              <i className="fas fa-search sh-search-icon" />
              <input
                type="text"
                className="sh-search-input"
                placeholder="Search heaters…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            {hasActiveFilters && (
              <button className="sh-clear-btn" onClick={clearFilters}>
                ✕ Clear filters
              </button>
            )}
            {!loading && (
              <span className="sh-result-count">
                {filtered.length} {filtered.length === 1 ? "product" : "products"}
              </span>
            )}
          </div>

          {/* Category pills — uses wm-filter-btn / wm-filter-btn--active from heaters.css */}
          <div className="wm-filter-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                className={`wm-filter-btn${activeCategory === cat.value ? " wm-filter-btn--active" : ""}`}
                onClick={() => setActiveCategory(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Tag chips */}
          {allTags.length > 0 && (
            <div className="sh-tags-row">
              <span className="sh-tags-label">Tags:</span>
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`sh-tag-chip${activeTags.includes(tag) ? " sh-tag-chip--active" : ""}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── STATUS BANNERS ───────────────────────────────────────────────────── */}
      {offline && (
        <div style={{ background: "#FEF5EC", borderTop: "1px solid #F5D5A0", borderBottom: "1px solid #F5D5A0", padding: "8px 24px", textAlign: "center", fontFamily: "'Montserrat', sans-serif", fontSize: "0.78rem", color: "#9C6A10" }}>
          <i className="fa-solid fa-wifi" style={{ marginRight: 6, opacity: 0.6 }} />
          You are offline — showing last saved data
        </div>
      )}
      {syncing && !offline && (
        <div style={{ background: "#EBF5FB", borderTop: "1px solid #C5DDF0", borderBottom: "1px solid #C5DDF0", padding: "6px 24px", textAlign: "center", fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", color: "#1A6A9A" }}>
          <i className="fa-solid fa-rotate" style={{ marginRight: 6 }} />
          Refreshing products…
        </div>
      )}

      {/* ── PRODUCTS GRID ────────────────────────────────────────────────────── */}
      <section className="wm-section wm-section--flush-top">
        <div className="wm-container">
          {loading && (
            <div className="wm-products-grid">
              {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}
          {!loading && filtered.length === 0 && products.length === 0 && (
            <div className="sh-no-results">
              <strong>No products available yet.</strong>
              {offline ? "Connect to the internet to load products." : "Check back soon."}
            </div>
          )}
          {!loading && filtered.length === 0 && products.length > 0 && (
            <div className="sh-no-results">
              <strong>No products match your filters.</strong>
              Try adjusting your search or selected filters.
              <br />
              <button className="sh-no-results-reset" onClick={clearFilters}>
                Clear all filters
              </button>
            </div>
          )}
          {!loading && filtered.length > 0 && (
            <div className="wm-products-grid">
              {filtered.map(p => <ProductCard key={p.id || p.slug} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── WHY SAWO ─────────────────────────────────────────────────────────── */}
      <section className="wm-section">
        <div className="wm-container">
          <div className="wm-why-grid">
            <div>
              <p className="wm-eyebrow">SAWO HEATERS</p>
              <h2 className="wm-why-title">Why Choose SAWO Heaters</h2>
              <p className="wm-why-desc">
                SAWO heaters combine durability, energy efficiency, and modern design,
                offering consistent performance for a reliable, superior sauna experience every time.
              </p>
              <div style={{ marginTop: "20px" }}>
                <a
                  href="https://www.sawo.com/wp-content/uploads/2025/12/SAWO-Product-Catalogue-2025-2026-web.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wm-brochure-btn"
                >
                  VIEW BROCHURE
                </a>
              </div>
            </div>
            <div><CirclesInfo /></div>
          </div>
        </div>
      </section>

      {/* ── BANNER ───────────────────────────────────────────────────────────── */}
      <section className="wm-banner">
        <div className="wm-banner-content">
          <h2 className="wm-banner-title">Experience Ultimate Relaxation</h2>
          <p className="wm-banner-sub">Find your source of serenity from over 100 heater models</p>
        </div>
      </section>
    </div>
  );
}