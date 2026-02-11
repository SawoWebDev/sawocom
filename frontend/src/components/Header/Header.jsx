import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import sLogo from "assets/SAWO-logo.webp";
import heroBg from "assets/Home/SAWO-hero.webp";
import menuPaths from "menuPaths";

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
    { name: "Home", path: menuPaths.home },
    {
      name: "Sauna",
      path: menuPaths.sauna, // Optional: make top parent clickable
      submenu: [
        {
          name: "Sauna Heaters",
          submenu: [
            { name: "Wall-Mounted", path: menuPaths.sauna.heaters.wallMounted },
            { name: "Tower", path: menuPaths.sauna.heaters.tower },
            { name: "Stone", path: menuPaths.sauna.heaters.stone },
            { name: "Floor", path: menuPaths.sauna.heaters.floor },
            { name: "Combi", path: menuPaths.sauna.heaters.combi },
            { name: "Dragonfire", path: menuPaths.sauna.heaters.dragonfire },
          ],
        },
        { name: "Sauna Controls", path: menuPaths.sauna.controls },
        { name: "Sauna Accessories", path: menuPaths.sauna.accessories },
        { name: "Sauna Rooms", path: menuPaths.sauna.rooms },
      ],
    },
    {
      name: "Steam",
      path: menuPaths.steam, // Optional clickable parent
      submenu: [
        { name: "Steam Generators", path: menuPaths.steam.generators },
        { name: "Steam Controls", path: menuPaths.steam.controls },
        { name: "Accessories", path: menuPaths.steam.accessories },
      ],
    },
    { name: "Infrared", path: menuPaths.infrared },
    {
      name: "Support",
      path: menuPaths.support, // Optional clickable parent
      submenu: [
        { name: "Frequently Asked Questions", path: menuPaths.support.faq },
        { name: "User Manuals", path: menuPaths.support.manuals },
        { name: "Product Catalogue", path: menuPaths.support.catalogue },
      ],
    },
    { name: "Contact Us", path: menuPaths.contact },
    {
      name: "About Us",
      path: menuPaths.about, // Optional clickable parent
      submenu: [
        { name: "Latest News", path: menuPaths.about.news },
        { name: "Sustainability", path: menuPaths.about.sustainability },
      ],
    },
    { name: "Careers", path: menuPaths.careers },
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
      <link rel="preload" as="image" href={heroBg} fetchpriority="high" />

      <header
        className={`fixed top-0 left-0 w-full bg-white z-50 shadow-md transition-transform duration-500 font-sans ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{ fontFamily: `"Montserrat"` }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={sLogo}
              alt="SAWO-logo"
              className="h-14 md:h-20 object-contain transition-all duration-300"
            />
          </Link>

          {/* Desktop nav */}
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
                  {/* Top-level link or button */}
                  {item.submenu ? (
                    item.path ? (
                      <Link
                        to={item.path}
                        className="flex items-center gap-1 hover:text-[#af8564] transition-colors"
                      >
                        {item.name} <i className="fa-solid fa-chevron-down text-[10px]"></i>
                      </Link>
                    ) : (
                      <button className="flex items-center gap-1 hover:text-[#af8564] transition-colors">
                        {item.name} <i className="fa-solid fa-chevron-down text-[10px]"></i>
                      </button>
                    )
                  ) : (
                    <Link
                      to={item.path}
                      className="flex items-center gap-1 hover:text-[#af8564] transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Submenu */}
                  {item.submenu && hoveredMenu === item.name && (
                    <div className="absolute left-0 top-full mt-2 bg-white rounded-md shadow-lg min-w-[220px] z-50">
                      {item.submenu.map((sub) =>
                        sub.submenu ? (
                          <div
                            key={sub.name}
                            className="relative group"
                            onMouseEnter={() => handleMouseEnterSubmenu(sub.name)}
                            onMouseLeave={handleMouseLeaveSubmenu}
                          >
                            {sub.path ? (
                              <Link
                                to={sub.path}
                                className="w-full text-left px-4 py-2 hover:bg-[#af8564] hover:text-white transition-colors rounded-md flex justify-between items-center"
                              >
                                {sub.name} <i className="fa-solid fa-chevron-down text-[10px]"></i>
                              </Link>
                            ) : (
                              <button className="w-full text-left px-4 py-2 hover:bg-[#af8564] hover:text-white transition-colors rounded-md flex justify-between items-center">
                                {sub.name} <i className="fa-solid fa-chevron-down text-[10px]"></i>
                              </button>
                            )}
                            {hoveredSubmenu === sub.name && (
                              <div className="absolute top-0 left-full ml-1 bg-white rounded-md shadow-lg min-w-[180px] z-50">
                                {sub.submenu.map((item2) => (
                                  <Link
                                    key={item2.name || item2}
                                    to={item2.path || "#"}
                                    className="block px-4 py-2 text-[16px] font-normal text-[rgb(51,51,51)] hover:bg-[#af8564] hover:text-white transition-colors rounded-md"
                                  >
                                    {item2.name || item2}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link
                            key={sub.name || sub}
                            to={sub.path || "#"}
                            className="block px-4 py-2 text-[16px] font-normal text-[rgb(51,51,51)] hover:bg-[#af8564] hover:text-white transition-colors rounded-md"
                          >
                            {sub.name || sub}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          )}

          {/* Mobile toggle */}
          <button
            className="md:hidden text-2xl font-bold bg-transparent border-none cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div ref={mobileMenuRef} className="md:hidden bg-white shadow-lg">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-gray-200">
                {/* Top-level link or toggle */}
                {item.submenu ? (
                  item.path ? (
                    <Link
                      to={item.path}
                      className="w-full px-4 py-3 flex justify-between items-center text-gray-800 font-normal hover:bg-[#af8564] hover:text-white transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.name} <i className="fa-solid fa-chevron-down text-[10px]"></i>
                    </Link>
                  ) : (
                    <button
                      className="w-full px-4 py-3 flex justify-between items-center text-gray-800 font-normal hover:bg-[#af8564] hover:text-white transition-colors"
                      onClick={() =>
                        setHoveredMenu(hoveredMenu === item.name ? null : item.name)
                      }
                    >
                      {item.name} <i className="fa-solid fa-chevron-down text-[10px]"></i>
                    </button>
                  )
                ) : (
                  <Link
                    to={item.path}
                    className="w-full px-4 py-3 flex items-center text-gray-800 font-normal hover:bg-[#af8564] hover:text-white transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}

                {/* Submenu */}
                {item.submenu && hoveredMenu === item.name && (
                  <div className="bg-gray-50">
                    {item.submenu.map((sub) =>
                      sub.submenu ? (
                        <div key={sub.name} className="border-t border-gray-200">
                          {sub.path ? (
                            <Link
                              to={sub.path}
                              className="w-full px-6 py-2 flex justify-between items-center text-gray-800 font-normal hover:bg-[#af8564] hover:text-white transition-colors"
                              onClick={() => setMobileOpen(false)}
                            >
                              {sub.name} <i className="fa-solid fa-chevron-down text-[10px]"></i>
                            </Link>
                          ) : (
                            <button
                              className="w-full px-6 py-2 flex justify-between items-center text-gray-800 font-normal hover:bg-[#af8564] hover:text-white transition-colors"
                              onClick={() =>
                                setHoveredSubmenu(
                                  hoveredSubmenu === sub.name ? null : sub.name
                                )
                              }
                            >
                              {sub.name} <i className="fa-solid fa-chevron-down text-[10px]"></i>
                            </button>
                          )}
                          {hoveredSubmenu === sub.name && (
                            <div className="bg-gray-100">
                              {sub.submenu.map((item2) => (
                                <Link
                                  key={item2.name || item2}
                                  to={item2.path || "#"}
                                  className="block px-8 py-2 text-gray-800 hover:bg-[#af8564] hover:text-white transition-colors"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {item2.name || item2}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          key={sub.name || sub}
                          to={sub.path || "#"}
                          className="block px-6 py-2 text-gray-800 hover:bg-[#af8564] hover:text-white transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {sub.name || sub}
                        </Link>
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
