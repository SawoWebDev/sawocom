// src/pages/Home.jsx
import React from "react";
import Hero from "./Hero";

const Home = () => {
  const carouselItems = [
    {
      title: "SAUNA HEATERS",
      caption:
        "Rejuvenate in the warmth of a traditional Finnish sauna with SAWO’s premium heaters.",
      href: "https://www.sawo.com/sawo-products/finnish-sauna/sauna-heaters/",
      imgWebp:
        "https://www.sawo.com/wp-content/uploads/2025/05/FinnishSauna_.webp",
      imgJpg:
        "https://www.sawo.com/wp-content/uploads/2025/05/FinnishSauna_.jpg",
      alt: "Finnish sauna heater collection by SAWO for efficient sauna heating",
    },
    {
      title: "STEAM GENERATOR",
      caption:
        "Relieve your stress and tension with healing steam powered by SAWO generators.",
      href: "https://www.sawo.com/sawo-products/steam-sauna/steam-generators/",
      imgWebp:
        "https://www.sawo.com/wp-content/uploads/2025/05/5-SAUNA-ROOM-STEAM-GENERATOR1.webp",
      imgJpg:
        "https://www.sawo.com/wp-content/uploads/2025/05/5-SAUNA-ROOM-STEAM-GENERATOR1.jpg",
      alt: "SAWO steam generator for modern sauna and spa steam rooms",
    },
    {
      title: "SAUNA ROOM",
      caption:
        "Relax, detox, and rejuvenate in a SAWO-designed sauna room with therapeutic heat.",
      href: "https://www.sawo.com/sawo-products/finnish-sauna/sauna-rooms/",
      imgWebp:
        "https://www.sawo.com/wp-content/uploads/2025/07/StandardSauna386px.webp",
      imgJpg:
        "https://www.sawo.com/wp-content/uploads/2025/07/StandardSauna386px.jpg",
      alt: "Standard Finnish sauna room by SAWO with natural wood design",
    },
    {
      title: "INFRARED SAUNA",
      caption:
        "Experience deep relaxation with advanced infrared sauna technology.",
      href: "https://www.sawo.com/sawo-products/infrared-sauna/",
      imgWebp:
        "https://www.sawo.com/wp-content/uploads/2025/04/IR-SAUNA-1P-CEDAR-SCENE-.webp",
      imgJpg:
        "https://www.sawo.com/wp-content/uploads/2025/04/IR-SAUNA-1P-CEDAR-SCENE-.webp",
      alt: "Infrared sauna with cedar wood interior by SAWO",
    },
    {
      title: "SAUNA ACCESSORIES",
      caption:
        "Enhance your sauna with thoughtfully designed SAWO accessories.",
      href: "https://www.sawo.com/sawo-products/finnish-sauna/sauna-accessories/",
      imgWebp:
        "https://www.sawo.com/wp-content/uploads/2025/04/Sauna-Accessories-Cover1.webp",
      imgJpg:
        "https://www.sawo.com/wp-content/uploads/2025/04/Sauna-Accessories-Cover1.jpg",
      alt: "SAWO sauna accessories collection including buckets, ladles, and thermometers",
    },
  ];

  return (
    <div>
      {/* Hero Section (Full Width, No Padding) */}
      <Hero />

      {/* Title Above Carousel */}
      <section className="py-8">
        <h2
          className="text-center"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 500,
            color: "rgb(175, 133, 100)",
            fontSize: "35px",
          }}
        >
          Dive into our SAuna WOrld
        </h2>
      </section>

      {/* Carousel Section */}
      <section className="pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div
            className="sawo-carousel-container overflow-x-auto overflow-y-hidden flex gap-5 snap-x scroll-smooth"
            role="region"
            aria-label="SAWO Sauna Products Carousel"
          >
            <div className="sawo-carousel-track flex gap-5">
              {[...carouselItems, ...carouselItems].map((item, index) => (
                <div
                  className="sawo-carousel-item flex-shrink-0 w-[calc(25%-20px)] rounded overflow-hidden relative snap-start"
                  key={index}
                  role="listitem"
                >
                  <a href={item.href} className="relative block text-white">
                    <picture>
                      <source srcSet={item.imgWebp} type="image/webp" />
                      <img
                        src={item.imgJpg}
                        alt={item.alt}
                        title={item.title}
                        loading="lazy"
                        className="w-full h-auto block transition-transform duration-500 ease-in-out hover:scale-105"
                      />
                    </picture>
                    <div className="sawo-carousel-overlay absolute inset-0 bg-black/30 z-10"></div>
                    <div className="sawo-carousel-content absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent flex flex-col h-24 z-20">
                      <div className="sawo-carousel-title text-white text-base uppercase font-normal">
                        {item.title}
                      </div>
                      <div className="sawo-carousel-caption text-white text-xs sm:text-sm md:text-sm opacity-0 translate-y-2 transition-all duration-300">
                        {item.caption}
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Styles */}
      <style jsx>{`
        .sawo-carousel-container::-webkit-scrollbar {
          display: none;
        }
        .sawo-carousel-container {
          scrollbar-width: none;
        }
        .sawo-carousel-container:hover .sawo-carousel-track {
          animation-play-state: paused;
        }
        .sawo-carousel-track {
          display: flex;
          gap: 20px;
          animation: sawo-scroll 10s linear infinite;
        }
        .sawo-carousel-item:hover .sawo-carousel-caption {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes sawo-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @media (max-width: 1024px) {
          .sawo-carousel-item {
            flex: 0 0 calc(33.333% - 20px);
          }
        }
        @media (max-width: 768px) {
          .sawo-carousel-item {
            flex: 0 0 calc(50% - 20px);
          }
        }
        @media (max-width: 480px) {
          .sawo-carousel-item {
            flex: 0 0 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
