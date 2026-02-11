import React, { useState, useEffect, useRef } from "react";
import sLogo from "assets/SAWO-logo.webp";
import heroBg from "assets/STONE-WALL-WITH-BLACK-ACC-and-sawo-30-wall-revised.webp";

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [hoveredSubmenu, setHoveredSubmenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [forceMobile, setForceMobile] = useState(false);

  const lastScrollY = useRef(0);
  const navRef = useRef(null);
  const menuTimeout = useRef(null);
  const subMenuTimeout = useRef(null);
  const mobileMenuRef = useRef(null);

  const navItems = [
    { name: "Home" },
    {
      name: "Sauna",
      submenu: [
        {
          name: "Sauna Heaters",
          submenu: ["Wall-Mounted", "Tower", "Stone", "Floor", "Combi", "Dragonfire"],
        },
        { name: "Sauna Controls" },
        { name: "Sauna Accessories" },
        { name: "Sauna Rooms" },
      ],
    },
    { name: "Steam", submenu: ["Steam Generators", "Steam Controls", "Accessories"] },
    { name: "Infrared" },
    { name: "Support", submenu: ["Frequently Asked Questions", "User Manuals", "Product Catalogue"] },
    { name: "Contact Us" },
    { name: "About Us", submenu: ["Latest News", "Sustainability"] },
    { name: "Careers" },
  ];

  // Hide header on scroll down + close mobile menu
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setHidden(currentScroll > lastScrollY.current && currentScroll > 80);
      lastScrollY.current = currentScroll;
      if (mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen]);

  // Force mobile if nav overflows
  useEffect(() => {
    const checkWrap = () => {
      if (!navRef.current) return;
      const isWrapped = navRef.current.scrollWidth > navRef.current.clientWidth;
      setForceMobile(isWrapped);
      if (isWrapped) setMobileOpen(false);
    };
    checkWrap();
    window.addEventListener("resize", checkWrap);
    return () => window.removeEventListener("resize", checkWrap);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Desktop hover handlers with delay
  const handleMouseEnterMenu = (name) => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
    setHoveredMenu(name);
  };
  const handleMouseLeaveMenu = () => {
    menuTimeout.current = setTimeout(() => setHoveredMenu(null), 200);
  };
  const handleMouseEnterSubmenu = (name) => {
    if (subMenuTimeout.current) clearTimeout(subMenuTimeout.current);
    setHoveredSubmenu(name);
  };
  const handleMouseLeaveSubmenu = () => {
    subMenuTimeout.current = setTimeout(() => setHoveredSubmenu(null), 200);
  };

  return (
    <>
      {/* Preload Montserrat font */}
      <link
        rel="preload"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;500;700&display=swap"
        as="style"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;500;700&display=swap"
        rel="stylesheet"
      />

      {/* Preload hero image */}
      <link rel="preload" as="image" href={heroBg} />

      <header
        className={`fixed top-0 left-0 w-full bg-white z-50 shadow-md transition-transform duration-500 font-sans ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{ fontFamily: `"Montserrat"` }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <a href="/" className="flex-shrink-0">
            <img
              src={sLogo}
              alt="SAWO-logo"
              className="h-14 md:h-20 object-contain transition-all duration-300"
            />
          </a>

          {!forceMobile && (
            <nav
              ref={navRef}
              className="hidden md:flex gap-6 whitespace-nowrap text-[16px] font-normal text-[rgb(51,51,51)]"
            >
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnterMenu(item.name)}
                  onMouseLeave={handleMouseLeaveMenu}
                >
                  <button className="flex items-center gap-1 hover:text-[#af8564] transition-colors">
                    {item.name}{" "}
                    {item.submenu && <i className="fa-solid fa-chevron-down text-[10px]"></i>}
                  </button>

                  {item.submenu && hoveredMenu === item.name && (
                    <div className="absolute left-0 top-full mt-2 bg-white rounded-md shadow-lg min-w-[220px] z-50">
                      {item.submenu.map((sub) => (
                        <div
                          key={sub.name || sub}
                          className="relative group"
                          onMouseEnter={() => handleMouseEnterSubmenu(sub.name)}
                          onMouseLeave={handleMouseLeaveSubmenu}
                        >
                          {sub.submenu ? (
                            <>
                              <button className="w-full text-left px-4 py-2 hover:bg-[#af8564] hover:text-white transition-colors rounded-md flex justify-between items-center">
                                {sub.name}{" "}
                                <i className="fa-solid fa-chevron-down text-[10px]"></i>
                              </button>

                              {hoveredSubmenu === sub.name && (
                                <div className="absolute top-0 left-full ml-1 bg-white rounded-md shadow-lg min-w-[180px] z-50">
                                  {sub.submenu.map((item2) => (
                                    <a
                                      key={item2}
                                      href="/"
                                      className="block px-4 py-2 text-[16px] font-normal text-[rgb(51,51,51)] hover:bg-[#af8564] hover:text-white transition-colors rounded-md"
                                    >
                                      {item2}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <a
                              href="/"
                              className="block px-4 py-2 text-[16px] font-normal text-[rgb(51,51,51)] hover:bg-[#af8564] hover:text-white transition-colors rounded-md"
                            >
                              {sub.name || sub}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          )}

          <button
            className="md:hidden text-2xl font-bold bg-transparent border-none cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>

        {mobileOpen && (
          <div ref={mobileMenuRef} className="md:hidden bg-white shadow-lg">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-gray-200">
                <button
                  className="w-full px-4 py-3 flex justify-between items-center text-gray-800 font-normal hover:bg-[#af8564] hover:text-white transition-colors"
                  onClick={() =>
                    setHoveredMenu(hoveredMenu === item.name ? null : item.name)
                  }
                >
                  {item.name}
                  {item.submenu && <i className="fa-solid fa-chevron-down text-[10px]"></i>}
                </button>
                {item.submenu && hoveredMenu === item.name && (
                  <div className="bg-gray-50">
                    {item.submenu.map((sub) =>
                      sub.submenu ? (
                        <div key={sub.name} className="border-t border-gray-200">
                          <button
                            className="w-full px-6 py-2 flex justify-between items-center text-gray-800 font-normal hover:bg-[#af8564] hover:text-white transition-colors"
                            onClick={() =>
                              setHoveredSubmenu(hoveredSubmenu === sub.name ? null : sub.name)
                            }
                          >
                            {sub.name}{" "}
                            <i className="fa-solid fa-chevron-down text-[10px]"></i>
                          </button>
                          {hoveredSubmenu === sub.name && (
                            <div className="bg-gray-100">
                              {sub.submenu.map((item2) => (
                                <a
                                  key={item2}
                                  href="/"
                                  className="block px-8 py-2 text-gray-800 hover:bg-[#af8564] hover:text-white transition-colors"
                                >
                                  {item2}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <a
                          key={sub.name || sub}
                          href="/"
                          className="block px-6 py-2 text-gray-800 hover:bg-[#af8564] hover:text-white transition-colors"
                        >
                          {sub.name || sub}
                        </a>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
