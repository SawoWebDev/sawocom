// src/pages/Hero.jsx
import React, { useEffect } from "react";
import heroBg from "assets/STONE-WALL-WITH-BLACK-ACC-and-sawo-30-wall-revised.webp";

const Hero = () => {
  useEffect(() => {
    const typewriterEl = document.querySelector(".sauna-unique .typewriter");
    const sentences = [
      "a rejuvenating escape",
      "wellness with ancient tradition",
      "an authentic Finnish sauna",
    ];
    let n = 0,
      i = 0,
      isTyping = true,
      spans = [];

    function setupSentence() {
      const current = sentences[n];
      typewriterEl.innerHTML = current
        .split("")
        .map((char) => `<span>${char}</span>`)
        .join("");
      spans = typewriterEl.querySelectorAll("span");
      i = 0;
      isTyping = true;
    }

    function animate() {
      if (isTyping) {
        if (i < spans.length) {
          spans[i].style.opacity = 1;
          i++;
          setTimeout(animate, 120);
        } else {
          isTyping = false;
          setTimeout(animate, 1500);
        }
      } else {
        if (i > 0) {
          i--;
          spans[i].style.opacity = 0;
          setTimeout(animate, 80);
        } else {
          n = (n + 1) % sentences.length;
          setupSentence();
          setTimeout(animate, 600);
        }
      }
    }

    setupSentence();
    animate();
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <section
      className="sauna-unique relative z-0 min-h-[95vh]"
      role="region"
      aria-label="Sauna Sentences"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="experience-title">Experience . . .</h1>
      <div className="sr-only">
        a rejuvenating escape, wellness with ancient tradition, an authentic
        Finnish sauna, SAWO sauna heaters, Finnish sauna, sauna accessories,
        infrared sauna, steam generator
      </div>
      <div className="stack">
        <div className="typewriter"></div>
        <a
          className="btn"
          href="https://www.sawo.com/wp-content/uploads/2025/10/SAWO-Product-Catalogue-2025.pdf"
          download="SAWO-Product-Catalogue-2025.pdf"
          rel="noopener"
        >
          VIEW CATALOGUE
        </a>
      </div>

      <style jsx>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        .sauna-unique {
          margin: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: #fff;
          font-family:
            "Montserrat",
            system-ui,
            -apple-system,
            "Segoe UI",
            Roboto,
            Arial,
            sans-serif !important;
          font-weight: 400;
          padding: 20px;
        }
        .sauna-unique * {
          box-sizing: border-box;
          font-family: inherit !important;
        }
        .sauna-unique h1.experience-title {
          font-family: "Montserrat", sans-serif !important;
          font-weight: 700 !important;
          font-size: clamp(28px, 6vw, 60px) !important;
          color: #fff !important;
          text-shadow: 4px 6px 7px rgba(0, 0, 0, 0.5) !important;
          text-align: left !important;
          margin-bottom: clamp(6px, 1.5vw, 12px) !important;
          white-space: nowrap;
        }
        .sauna-unique .stack {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .sauna-unique .typewriter {
          font-size: clamp(15px, 4.6vw, 46px) !important;
          font-weight: 200 !important;
          font-family: "Montserrat", sans-serif !important;
          text-align: center;
          color: #fff !important;
          letter-spacing: 0.2px;
          text-shadow: 0px 12px 10px rgba(0, 0, 0, 0.9) !important;
          line-height: 1.4;
          display: inline-block;
          white-space: nowrap;
          margin-bottom: clamp(20px, 4vw, 36px);
          min-height: 1.4em;
        }
        .sauna-unique .typewriter span {
          opacity: 0;
          transition: opacity 0.25s ease-in-out;
        }
        .sauna-unique .btn {
          margin-top: clamp(30px, 8vw, 120px);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(12px, 1.8vw, 18px) !important;
          line-height: 1.2;
          color: #fff !important;
          background: transparent;
          border: 2px solid #fff;
          padding: clamp(8px, 2vw, 14px) clamp(14px, 3.5vw, 28px);
          border-radius: 4px;
          text-decoration: none !important;
          transition:
            background-color 0.3s ease-in-out,
            color 0.5s ease-in-out,
            border-color 0.3s ease-in-out,
            transform 0.25s ease;
        }
        .sauna-unique .btn:hover {
          background: #fff !important;
          color: #af8564 !important;
          border-color: #fff !important;
          text-decoration: none !important;
        }
        @media (max-width: 768px) {
          .sauna-unique h1.experience-title {
            font-size: 15px;
          }
          .sauna-unique .typewriter {
            font-size: clamp(14px, 4vw, 32px) !important;
          }
          .sauna-unique .btn {
            font-size: 14px !important;
            padding: 8px 20px;
            margin-top: 30px;
          }
        }
        @media (max-width: 480px) {
          .sauna-unique .typewriter {
            font-size: clamp(12px, 3.5vw, 24px) !important;
          }
          .sauna-unique .btn {
            font-size: 12px !important;
            padding: 6px 16px;
            margin-top: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
