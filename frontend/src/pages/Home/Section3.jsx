import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Section3 = () => {
  const exploreBtnStyle = {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 500,
    fontSize: "15px",
    lineHeight: "27px",
    color: "#333333",
    textDecoration: "none",
    transition: "color 0.3s ease",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  };

  return (
    <section className="section3-wrapper">
      {/* ================= STEAM ================= */}
      <h2 className="section-title">STEAM</h2>

      <div className="steam-grid">
        <a
          className="steam-card has-caption"
          href="https://www.sawo.com/sawo-products/steam-sauna/steam-generators/"
        >
          <img
            src="https://www.sawo.com/wp-content/uploads/2025/09/steam-generator1.jpg"
            alt="Steam Generators"
          />
          <div className="steam-title">Steam Generators</div>
          <div className="steam-caption">
            The luxury of tailored steam from advanced steam generators for a
            spa-like experience.
          </div>
        </a>

        <a
          className="steam-card has-caption"
          href="https://www.sawo.com/sawo-products/steam-sauna/steam-controls/"
        >
          <img
            src="https://www.sawo.com/wp-content/uploads/2025/07/SteamControlFinal.webp"
            alt="Steam Controls"
          />
          <div className="steam-title">Steam Controls</div>
          <div className="steam-caption">
            Precision, effortlessness, and personalization from Saunova and
            Innova control series.
          </div>
        </a>

        <a
          className="steam-card has-caption"
          href="https://www.sawo.com/sawo-products/steam-sauna/steam-accessories/"
        >
          <img
            src="https://www.sawo.com/wp-content/uploads/2025/05/ST-746-I_Display2.webp"
            alt="Steam Accessories"
          />
          <div className="steam-title">Steam Accessories</div>
          <div className="steam-caption">
            Premium accessories designed to enhance functionality and maximize
            comfort.
          </div>
        </a>
      </div>

      <div className="text-center mt-6">
        <a
          href="https://www.sawo.com/sawo-products/steam-sauna/"
          style={exploreBtnStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#af8564")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#333333")}
        >
          Explore More <FontAwesomeIcon icon={faChevronRight} />
        </a>
      </div>

      {/* ================= SAUNA ROOMS ================= */}
      <h2 className="section-title">SAUNA ROOMS</h2>

      <div className="steam-grid">
        <a
          className="steam-card has-caption"
          href="https://www.sawo.com/sawo-products/finnish-sauna/sauna-rooms/standard-sauna-rooms/"
        >
          <img
            src="https://www.sawo.com/wp-content/uploads/2025/11/700x525.webp"
            alt="Standard Sauna"
          />
          <div className="steam-title">Standard Sauna</div>
          <div className="steam-caption">
            Classic indoor sauna experience with timeless design.
          </div>
        </a>

        <a
          className="steam-card has-caption"
          href="https://www.sawo.com/glass-front-sauna-rooms/"
        >
          <img
            src="https://www.sawo.com/wp-content/uploads/2025/11/GLASS-FRONT.webp"
            alt="Glass Front Sauna"
          />
          <div className="steam-title">Glass Front Sauna</div>
          <div className="steam-caption">
            Modern design with clear tempered glass panels.
          </div>
        </a>

        <a
          className="steam-card has-caption"
          href="https://www.sawo.com/outdoor-sauna-rooms/"
        >
          <img
            src="https://www.sawo.com/wp-content/uploads/2025/12/700x525-outdoor-2.jpg"
            alt="Outdoor Sauna"
          />
          <div className="steam-title">Outdoor Sauna</div>
          <div className="steam-caption">
            Built to withstand extreme weather conditions.
          </div>
        </a>

        <a
          className="steam-card has-caption"
          href="https://www.sawo.com/sawo-products/finnish-sauna/sauna-rooms/infrared-sauna-rooms/"
        >
          <img
            src="https://www.sawo.com/wp-content/uploads/2025/08/INFRARED-SAUNA-ROOM.webp"
            alt="Infrared Sauna"
          />
          <div className="steam-title">Infrared Sauna</div>
          <div className="steam-caption">
            Gentle infrared warmth for therapeutic comfort.
          </div>
        </a>
      </div>

      <div className="text-center mt-6">
        <a
          href="https://www.sawo.com/sawo-products/finnish-sauna/sauna-rooms/"
          style={exploreBtnStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#af8564")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#333333")}
        >
          Explore More <FontAwesomeIcon icon={faChevronRight} />
        </a>
      </div>

      {/* ================= INFRARED ================= */}
      <h2 className="section-title">INFRARED</h2>

      <div className="image-grid">
        <a
          href="https://www.sawo.com/infrared-sauna-rooms/"
          className="image-card"
        >
          <img
            src="https://www.sawo.com/wp-content/uploads/2025/04/SR06-44710101-1313LS_PERSPECTIVE-VIEW-1.webp"
            alt="Infrared Rooms"
          />
          <div className="title">Infrared Rooms</div>
        </a>

        <a href="https://www.sawo.com/infrared-panels/" className="image-card">
          <img
            src="https://www.sawo.com/wp-content/uploads/2025/12/infrared-panelss-400x600px.webp"
            alt="Infrared Panels"
          />
          <div className="title">Infrared Panels</div>
        </a>

        <a
          href="https://www.sawo.com/infrared-2-0-built-in-control/"
          className="image-card"
        >
          <img
            src="https://www.sawo.com/wp-content/uploads/2025/07/IR-UI-V2.webp"
            alt="Infrared Controls"
          />
          <div className="title">Infrared Controls</div>
        </a>
      </div>

      <div className="text-center mt-6">
        <a
          href="https://www.sawo.com/infrared-sauna/"
          style={exploreBtnStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#af8564")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#333333")}
        >
          Explore More <FontAwesomeIcon icon={faChevronRight} />
        </a>
      </div>

      {/* ================= SAUNA CONTROL ================= */}
      <h2 className="section-title">SAUNA CONTROL</h2>

      <div className="image-grid">
        <a
          href="https://www.sawo.com/sawo-products/finnish-sauna/saunova-series/"
          className="image-card"
        >
          <img
            src="https://www.sawo.com/wp-content/uploads/2025/08/SAU-UI-V2_AspenSauna.webp"
            alt="Saunova Series"
          />
          <div className="title">Saunova Series</div>
        </a>

        <a
          href="https://www.sawo.com/sawo-products/finnish-sauna/innova-series/"
          className="image-card"
        >
          <img
            src="https://www.sawo.com/wp-content/uploads/2025/04/INC-S-V2_SpruceSauna.webp"
            alt="Innova Series"
          />
          <div className="title">Innova Series</div>
        </a>

        <a
          href="https://www.sawo.com/sawo-products-finnish-sauna/control-accessories/"
          className="image-card"
        >
          <img
            src="https://www.sawo.com/wp-content/uploads/2025/04/sensor-holder.webp"
            alt="Control Accessories"
          />
          <div className="title">Control Accessories</div>
        </a>
      </div>

      <style jsx>{`
        .section3-wrapper {
          font-family: "Montserrat", sans-serif;
          padding: 40px 0;
        }

        .section-title {
          text-align: center;
          font-size: 35px;
          font-weight: 500;
          color: rgb(175, 133, 100);
          margin: 60px 0 30px;
        }

        .steam-grid,
        .image-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }

        .steam-card,
        .image-card {
          flex: 1 1 calc(25% - 20px);
          min-width: 220px;
          position: relative;
          overflow: hidden;
          border-radius: 4px;
        }

        img {
          width: 100%;
          display: block;
          transition: transform 0.6s ease;
        }

        .steam-card:hover img,
        .image-card:hover img {
          transform: scale(1.08);
        }

        .steam-title,
        .image-card .title {
          position: absolute;
          bottom: 0;
          width: 100%;
          text-align: center;
          color: #fff;
          padding: 16px;
          z-index: 2;
          font-size: clamp(14px, 2vw, 20px);
          font-weight: 500;
          text-transform: uppercase;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent);
        }

        .steam-card.has-caption::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.65);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 1;
        }

        .steam-card.has-caption:hover::before {
          opacity: 1;
        }

        .steam-caption {
          position: absolute;
          inset: 0; /* FULL CARD */
          display: flex;
          align-items: center; /* vertical center */
          justify-content: center; /* horizontal center */
          text-align: center;
          padding: 20px;
          color: #fff;
          opacity: 0;
          z-index: 2;
          transition: opacity 0.4s ease;
        }

        .steam-card.has-caption:hover .steam-caption {
          opacity: 1;
        }

        .steam-card.has-caption:hover .steam-title {
          opacity: 0;
        }

        @media (max-width: 768px) {
          .steam-card,
          .image-card {
            flex: 1 1 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default Section3;
