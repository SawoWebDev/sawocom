// WallMounted.jsx

import React, { useState } from "react";
import ButtonClear from "../../../components/Buttons/ButtonClear";
import CirclesInfo from "../../../components/CirclesInfo";
import productsData from "../../../assets/data/products.json";

// ── Filter & group from JSON ─────────────────────────────────────────────────
const wallMountedProducts = productsData.filter((p) =>
  p.categories?.includes("Wall-Mounted")
);

const groupedProducts = wallMountedProducts.reduce((groups, product) => {
  const tag = product.tags?.[0] || "Other";
  if (!groups[tag]) groups[tag] = [];
  groups[tag].push(product);
  return groups;
}, {});

const groupNames = Object.keys(groupedProducts);

const WallMounted = () => {
  const [activeGroup, setActiveGroup] = useState(null);

  const filteredGroups = activeGroup
    ? { [activeGroup]: groupedProducts[activeGroup] }
    : groupedProducts;

  return (
    <div className="relative">

      {/* ===================== */}
      {/* HERO                  */}
      {/* ===================== */}
      <section
        className="wm-hero min-h-[95vh] flex flex-col justify-center items-center text-center px-6 relative"
        style={{
          backgroundImage: `url(https://www.sawo.com/wp-content/uploads/2025/09/WALL-MOUNTED-SERIES-v2-1.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="wm-hero-overlay" />
        <div className="wm-hero-content">
          <h1 className="wm-hero-title">WALL-MOUNTED SAUNA HEATERS</h1>
          <p className="wm-hero-subtitle">Space-saving sleek modern designs</p>
          <div style={{ marginTop: "32px" }}>
            <ButtonClear
              text="EXPLORE HEATERS"
              href="https://www.sawo.com/sawo-products/finnish-sauna/sauna-heaters/sauna-products/"
            />
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/* INTRODUCING           */}
      {/* ===================== */}
      <section className="wm-section">
        <div className="wm-container text-center">
          <h2 className="wm-products-title">Introducing Our Premium Wall Mounted Heaters</h2>
          <p className="wm-products-desc">
            Our wall-mounted heaters are crafted for those who love the
            traditional dry and hot sauna experience. This series of classic
            heaters boasts of robust, space-saving models for small and
            medium-sized saunas. For added safety, some models feature
            cool-to-touch fibercoating to minimize the risk of injury.
          </p>
        </div>
      </section>

      {/* ===================== */}
      {/* FILTER + PRODUCTS     */}
      {/* ===================== */}
      <section className="wm-section" style={{ paddingBottom: "0" }}>
        <div className="wm-container">
          <div className="wm-filter-wrap">
            <button
              className={`wm-filter-btn ${activeGroup === null ? "wm-filter-btn--active" : ""}`}
              onClick={() => setActiveGroup(null)}
            >
              All
            </button>
            {groupNames.map((g) => (
              <button
                key={g}
                className={`wm-filter-btn ${activeGroup === g ? "wm-filter-btn--active" : ""}`}
                onClick={() => setActiveGroup(g)}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="wm-section" style={{ paddingTop: "24px" }}>
        <div className="wm-container">
          {Object.entries(filteredGroups).map(([brand, products], gi) => (
            <div className="wm-group" key={gi}>
              <h3 className="wm-group-title">{brand.toUpperCase()}</h3>
              <div className="wm-products-grid">
                {products.map((product, ii) => {
                  let productImage = null;
                  try {
                    if (product.image) {
                      productImage = require(`../../../assets/products/${product.image.split("/").pop()}`);
                    }
                  } catch (err) {
                    console.warn(`Image not found: ${product.image}`);
                  }
                  return (
                    <div className="wm-product-item" key={ii}>
                      <div className="wm-product-img-wrap">
                        {productImage ? (
                          <img src={productImage} alt={product.name} className="wm-product-img" />
                        ) : (
                          <div className="wm-product-img-placeholder">
                            <i className="fas fa-image"></i>
                          </div>
                        )}
                      </div>
                      <p className="wm-product-name">{product.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== */}
      {/* WHY SAWO + CIRCLES    */}
      {/* ===================== */}
      <section className="wm-section">
        <div className="wm-container">
          <div className="wm-why-grid">
            {/* Left */}
            <div className="wm-why-left">
              <p className="wm-eyebrow">SAWO HEATERS</p>
              <h2 className="wm-why-title">Why Choose SAWO Heaters</h2>
              <p className="wm-why-desc">
                SAWO heaters combine durability, energy efficiency, and modern
                design, offering consistent performance for a reliable, superior
                sauna experience every time.
              </p>
              <div style={{ marginTop: "24px" }}>
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
            {/* Right — CirclesInfo */}
            <div className="wm-why-right">
              <CirclesInfo />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/* BANNER                */}
      {/* ===================== */}
      <section className="wm-banner">
        <div className="wm-banner-content">
          <h2 className="wm-banner-title">Experience Ultimate Relaxation</h2>
          <p className="wm-banner-sub">
            Find your source of serenity from over 100 heater models
          </p>
        </div>
      </section>

      {/* ===================== */}
      {/* STYLES                */}
      {/* ===================== */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap');

        /* ---- Hero ---- */
        .wm-hero-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.48); z-index: 0;
        }
        .wm-hero-content {
          position: relative; z-index: 1;
          display: flex; flex-direction: column;
          align-items: center; gap: 10px;
        }
        .wm-hero-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 45px; line-height: 52px;
          font-weight: 700; color: #fff; margin: 0;
        }
        .wm-hero-subtitle {
          font-family: 'Montserrat', sans-serif;
          font-size: 20px; font-weight: 300;
          color: rgba(255,255,255,0.88); margin: 0;
        }

        /* ---- Layout ---- */
        .wm-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        .wm-section   { padding: 64px 0; }

        /* ---- Intro desc ---- */
        .wm-intro-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.1rem; font-weight: 400;
          color: #555; line-height: 1.8;
          max-width: 720px; margin: 0 auto;
        }

        /* ---- Introducing ---- */
        .wm-products-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 2rem; font-weight: 700;
          background: linear-gradient(135deg, #AA8161 0%, #c4a077 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          margin-bottom: 14px; line-height: 1.2;
        }
        .wm-products-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 1rem; font-weight: 400;
          color: #555; line-height: 1.8;
          max-width: 760px; margin: 0 auto;
        }

        /* ---- Filter tabs ---- */
        .wm-filter-wrap {
          display: flex; flex-wrap: wrap; gap: 10px;
        }
        .wm-filter-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.78rem; font-weight: 600;
          letter-spacing: 0.8px; padding: 8px 18px;
          border-radius: 999px; border: 1.5px solid #e0d0c0;
          background: transparent; color: #888;
          cursor: pointer; transition: all 0.25s ease;
        }
        .wm-filter-btn:hover { border-color: #AA8161; color: #AA8161; }
        .wm-filter-btn--active { background: #AA8161; border-color: #AA8161; color: #fff; }

        /* ---- Product groups ---- */
        .wm-group { margin-bottom: 52px; }
        .wm-group-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 1rem; font-weight: 700;
          color: #AA8161; text-transform: uppercase;
          letter-spacing: 1.5px;
          padding-bottom: 10px;
          border-bottom: 2px solid #ede5db;
          margin-bottom: 24px;
        }
        .wm-products-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
        }

        /* ---- Product item ---- */
        .wm-product-item {
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          cursor: default;
        }
        .wm-product-img-wrap {
          width: 100%;
          aspect-ratio: 1 / 1;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          transition: transform 0.3s ease;
        }
        .wm-product-item:hover .wm-product-img-wrap {
          transform: scale(1.04);
        }
        .wm-product-img {
          width: 100%; height: 100%;
          object-fit: contain; display: block;
        }
        .wm-product-img-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          color: #ddd; font-size: 1.8rem;
        }
        .wm-product-name {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.78rem; font-weight: 600;
          color: #444; margin-top: 8px; line-height: 1.35;
        }

        /* ---- Why SAWO ---- */
        .wm-why-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 60px; align-items: center;
        }
        .wm-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem; font-weight: 600;
          letter-spacing: 2.5px; color: #AA8161;
          text-transform: uppercase; margin-bottom: 10px;
        }
        .wm-why-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 2.2rem; font-weight: 700;
          color: #AA8161; margin-bottom: 16px; line-height: 1.2;
        }
        .wm-why-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 1rem; font-weight: 400;
          color: #444; line-height: 1.8; margin-bottom: 16px;
        }
        .wm-brochure-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.85rem; font-weight: 600;
          letter-spacing: 1px; padding: 12px 34px;
          border: 2px solid #AA8161; color: #AA8161;
          background: transparent; border-radius: 6px;
          text-decoration: none; display: inline-block;
          transition: all 0.3s ease;
        }
        .wm-brochure-btn:hover { background: #AA8161; color: #fff; }

        /* ---- Banner ---- */
        .wm-banner {
          background: linear-gradient(135deg, #AA8161 0%, #c4a077 100%);
          padding: 80px 24px;
          text-align: center;
        }
        .wm-banner-content { max-width: 700px; margin: 0 auto; }
        .wm-banner-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 2.4rem; font-weight: 700;
          color: #fff; margin-bottom: 14px; line-height: 1.2;
        }
        .wm-banner-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.1rem; font-weight: 300;
          color: rgba(255,255,255,0.9); margin: 0; line-height: 1.6;
        }

        /* ---- Responsive ---- */
        @media (max-width: 1200px) {
          .wm-products-grid { grid-template-columns: repeat(5, 1fr); }
        }
        @media (max-width: 1024px) {
          .wm-products-grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 768px) {
          .wm-hero-title { font-size: 28px; line-height: 36px; }
          .wm-hero-subtitle { font-size: 16px; }
          .wm-why-grid { grid-template-columns: 1fr; gap: 30px; }
          .wm-products-grid { grid-template-columns: repeat(3, 1fr); }
          .wm-why-title { font-size: 1.7rem; }
          .wm-section { padding: 44px 0; }
          .wm-banner-title { font-size: 1.8rem; }
        }
        @media (max-width: 480px) {
          .wm-products-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

    </div>
  );
};

export default WallMounted;