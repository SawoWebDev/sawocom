// src/pages/Hero.jsx
import React, { useEffect } from "react";
import heroBg from "assets/Home/SAWO-hero.webp";
// import heroBgSmall from "assets/Home/SAWO-hero-400.webp";
// import heroBgMedium from "assets/Home/SAWO-hero-800.webp";

const Hero = () => {
  useEffect(() => {
    const typewriterEl = document.querySelector(".sauna-unique .typewriter");
    const sentences = [
      "a rejuvenating escape",
      "wellness with ancient tradition",
      "an authentic Finnish sauna",
    ];
    let n = 0, i = 0, isTyping = true, spans = [];

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
    <section className="sauna-unique relative z-0 w-full min-h-[95vh] flex flex-col justify-center px-5 md:px-10">
      {/* Preload hero image */}
      <link rel="preload" as="image" href={heroBg} fetchpriority="high" />

      {/* Hero image */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <img
          src={heroBg}
          alt="SAWO hero"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        {/*
        // Uncomment when responsive images are available
        <picture>
          <source type="image/webp" media="(max-width:640px)" srcSet={heroBgSmall} />
          <source type="image/webp" media="(max-width:1024px)" srcSet={heroBgMedium} />
          <img src={heroBg} alt="SAWO hero" className="w-full h-full object-cover" loading="eager" decoding="async" />
        </picture>
        */}
      </div>

      <h1
        className="experience-title font-montserrat font-bold text-white text-left whitespace-nowrap text-2xl mt-10 sm:text-4xl md:text-5xl lg:text-[60px] leading-tight"
        style={{ textShadow: "4px 6px 7px rgba(0,0,0,0.5)" }}
      >
        Experience . . .
      </h1>

      <div className="sr-only">
        a rejuvenating escape, wellness with ancient tradition, an authentic
        Finnish sauna, SAWO sauna heaters, Finnish sauna, sauna accessories,
        infrared sauna, steam generator
      </div>

      <div className="stack flex flex-col items-center text-center">
        <div
          className="typewriter font-montserrat font-light text-white text-center mb-6 sm:mb-8 text-lg sm:text-2xl md:text-4xl lg:text-[46px] leading-snug"
          style={{ letterSpacing: "0.2px", textShadow: "0px 12px 10px rgba(0,0,0,0.9)", minHeight: "1.4em" }}
        ></div>

        <a
          href="https://www.sawo.com/wp-content/uploads/2025/10/SAWO-Product-Catalogue-2025.pdf"
          download="SAWO-Product-Catalogue-2025.pdf"
          rel="noopener"
          className="mt-4 sm:mt-6 md:mt-8 inline-flex items-center gap-2 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 border-2 border-white text-white font-semibold text-sm sm:text-base md:text-lg rounded transition-all duration-300 hover:bg-white hover:text-[#AF8564]"
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
        .experience-title {
          font-family: "Montserrat", sans-serif !important;
        }
        .stack * {
          font-family: inherit !important;
        }
        .typewriter span {
          opacity: 0;
          transition: opacity 0.25s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Hero;
