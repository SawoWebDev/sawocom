import React, { useRef, useEffect, useState } from "react";

const accessories = [
  {
    title: "PAILS and LADLES",
    href: "https://www.sawo.com/sawo-products/finnish-sauna/sauna-accessories/pails-ladles/",
    img: "https://www.sawo.com/wp-content/uploads/2025/08/DRAGON-FIRE-PAIL-AND-LADDLE-SCENE.webp",
    alt: "Sauna pails and ladles",
  },
  {
    title: "THERMOMETERS and COMBINED METERS",
    href: "https://www.sawo.com/sawo-products/finnish-sauna/sauna-accessories/thermometers-combined-meters/",
    img: "https://www.sawo.com/wp-content/uploads/2025/09/BoxType2-copy-new.webp",
    alt: "Sauna thermometers and combined meters",
  },
  {
    title: "CLOCKS and SANDTIMERS",
    href: "https://www.sawo.com/sawo-products/finnish-sauna/sauna-accessories/clocks-sandtimers/",
    img: "https://www.sawo.com/wp-content/uploads/2025/09/sand-timer-copy-new.webp",
    alt: "Sauna clocks and sand timers",
  },
  {
    title: "SAUNA LIGHTS and COVERS",
    href: "https://www.sawo.com/sawo-products/finnish-sauna/sauna-accessories/sauna-light/",
    img: "https://www.sawo.com/wp-content/uploads/2025/11/TR-LIGHT-COVER_SCENE1-copy.webp",
    alt: "Sauna light covers",
  },
  {
    title: "HEADRESTS and BACKRESTS",
    href: "https://www.sawo.com/sawo-products/finnish-sauna/sauna-accessories/headrests-backrests/",
    img: "https://www.sawo.com/wp-content/uploads/2025/09/506-2-D.webp",
    alt: "Sauna headrests and backrests",
  },
  {
    title: "DOORS and HANDLES",
    href: "https://www.sawo.com/sawo-products/finnish-sauna/sauna-accessories/doors-handles/",
    img: "https://www.sawo.com/wp-content/uploads/2025/09/DOORS-AND-HANDLES-copy.webp",
    alt: "Sauna doors and handles",
  },
  {
    title: "BENCHES and FLOOR TILES",
    href: "https://www.sawo.com/benches-and-floor-tiles/",
    img: "https://www.sawo.com/wp-content/uploads/2025/08/siro-bench.webp",
    alt: "Sauna benches and floor tiles",
  },
  {
    title: "KIVISTONE",
    href: "https://www.sawo.com/kivistone/",
    img: "https://www.sawo.com/wp-content/uploads/2025/08/R-500-D_Scene2.webp",
    alt: "Kivistone sauna stones",
  },
  {
    title: "VENTILATION and ADD-ONS",
    href: "https://www.sawo.com/ventilations-and-add-ons/",
    img: "https://www.sawo.com/wp-content/uploads/2025/08/Ventilation.webp",
    alt: "Sauna ventilation and add-ons",
  },
];

const Section4 = () => {
  const carouselRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const loopedItems = [...accessories, ...accessories]; // Duplicate for seamless scroll

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current && !isHovered) {
        const itemWidth = carouselRef.current.firstChild.offsetWidth + 24;
        if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
          carouselRef.current.scrollLeft = 0;
        } else {
          carouselRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.firstChild.offsetWidth + 24;
      if (carouselRef.current.scrollLeft <= 0) {
        carouselRef.current.scrollLeft = carouselRef.current.scrollWidth / 2;
      }
      carouselRef.current.scrollBy({ left: -itemWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.firstChild.offsetWidth + 24;
      if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
        carouselRef.current.scrollLeft = 0;
      }
      carouselRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-12">
      <h2
        className="text-center mb-6"
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 500,
          color: "rgb(175, 133, 100)",
          fontSize: "35px",
        }}
      >
        SAUNA ACCESSORIES
      </h2>

      <div
        className="accessories-carousel-wrapper relative flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left Arrow */}
        <button
          className="arrow left-arrow text-2xl font-bold text-gray-700 hover:text-amber-600 mr-2 z-20"
          onClick={scrollLeft}
        >
          &#10094;
        </button>

        {/* Carousel */}
        <div
          className="accessories-carousel flex overflow-x-auto gap-6 scroll-smooth snap-x snap-mandatory px-2"
          ref={carouselRef}
        >
          {loopedItems.map((item, idx) => (
            <a
              href={item.href}
              key={idx}
              className="carousel-item relative flex-shrink-0 snap-start rounded overflow-hidden group"
            >
              <img
                src={item.img}
                alt={item.alt}
                title={item.title}
                loading="lazy"
                className="w-full h-auto block transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div className="gradient-overlay absolute bottom-0 left-0 w-full h-2/3 z-10 pointer-events-none"></div>
              {/* Title */}
              <div
                className="slide-title absolute bottom-0 w-full text-center p-2 z-20"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontStyle: "normal",
                  fontWeight: 500,
                  color: "rgb(255, 255, 255)",
                  fontSize: "20px",
                  lineHeight: "30px",
                }}
              >
                {item.title}
              </div>
            </a>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className="arrow right-arrow text-2xl font-bold text-gray-700 hover:text-yellow-700 ml-2 z-20"
          onClick={scrollRight}
        >
          &#10095;
        </button>
      </div>

      {/* Explore More Button */}
      <div className="text-center mt-6">
        <a
          href="https://www.sawo.com/sawo-products/finnish-sauna/sauna-accessories/"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 500,
            fontSize: "15px",
            lineHeight: "27px",
            color: "#333333",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#af8564")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#333333")}
        >
          Explore More &#8250;
        </a>
      </div>

      <style jsx>{`
        .accessories-carousel::-webkit-scrollbar {
          display: none;
        }
        .accessories-carousel {
          scrollbar-width: none;
        }

        /* Gradient overlay */
        .gradient-overlay {
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.75),
            rgba(0, 0, 0, 0)
          );
        }

        /* Desktop: 4 cards */
        .carousel-item {
          flex: 0 0 calc((100% - 3*1.5rem)/4);
        }

        /* Tablet: 2 cards */
        @media (max-width: 1024px) {
          .carousel-item {
            flex: 0 0 calc((100% - 1.5rem)/2);
          }
        }

        /* Mobile: 1 card */
        @media (max-width: 640px) {
          .carousel-item {
            flex: 0 0 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default Section4;
