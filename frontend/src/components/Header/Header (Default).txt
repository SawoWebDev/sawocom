import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import sLogo from "../assets/SAWO_logo.webp";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (menu) => {
    clearTimeout(dropdownTimeout);
    setHoveredMenu(menu);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setHoveredMenu(null), 300);
    setDropdownTimeout(timeout);
  };

  const navItems = [
    { name: "Home" },
    {
      name: "Sauna",
      submenu: [
        "Sauna Heaters",
        "Sauna Controls",
        "Sauna Accessories",
        "Sauna Rooms",
      ],
    },
    {
      name: "Steam",
      submenu: ["Steam Generators", "Steam Controls", "Steam Accessories"],
    },
    {
      name: "Support",
      submenu: [
        "Frequently Asked Questions",
        "User Manuals",
        "Product Catalogue",
      ],
    },
    { name: "Contact Us", submenu: ["For Distributors"] },
    { name: "About Us", submenu: ["Latest News"] },
    { name: "Careers" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
        isScrolled
          ? "bg-white shadow-md"
          : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-2">
          <img
            src={sLogo}
            alt="SAWO Logo"
            className="h-14 md:h-20 w-auto object-contain"
          />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-[16px] font-[400]">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`flex items-center space-x-1 ${
                  isScrolled ? "text-[#333333]" : "text-white"
                } hover:text-[#af8564] transition`}
              >
                <span>{item.name}</span>
                {item.submenu && <ChevronDown size={16} />}
              </button>

              {/* Dropdown */}
              {item.submenu && hoveredMenu === item.name && (
                <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md py-2 min-w-[220px] animate-fadeIn z-[1100]">
                  {item.submenu.map((sub) => (
                    <a
                      key={sub}
                      href="#"
                      className="block px-4 py-2 text-[#333333] hover:bg-[#af8564] hover:text-white transition"
                      style={{
                        fontFamily: '"Helvetica Neue LT Pro", sans-serif',
                        fontWeight: 300,
                        fontSize: "13px",
                        lineHeight: "23px",
                      }}
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden ${
            isScrolled ? "text-[#333333]" : "text-white"
          } text-2xl`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md py-3 animate-fadeIn z-[1100]">
          {navItems.map((item) => (
            <div key={item.name} className="border-b border-gray-200">
              <button
                onClick={() =>
                  setHoveredMenu(hoveredMenu === item.name ? null : item.name)
                }
                className="w-full text-left px-4 py-2 text-[#333333] flex justify-between items-center hover:bg-[#af8564] hover:text-white transition"
              >
                {item.name}
                {item.submenu && <ChevronDown size={16} />}
              </button>

              {item.submenu && hoveredMenu === item.name && (
                <div className="bg-gray-50">
                  {item.submenu.map((sub) => (
                    <a
                      key={sub}
                      href="#"
                      className="block px-6 py-2 text-[#333333] hover:bg-[#af8564] hover:text-white transition"
                      style={{
                        fontFamily: '"Helvetica Neue LT Pro", sans-serif',
                        fontWeight: 300,
                        fontSize: "13px",
                        lineHeight: "23px",
                      }}
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
