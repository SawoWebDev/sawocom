import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import sLogo from "assets/SAWO_logo.webp";
import "./header.css";

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [forceMobile, setForceMobile] = useState(false);

  const lastScrollY = useRef(0);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setHidden(currentScroll > lastScrollY.current && currentScroll > 80);
      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleMouseEnter = (menu) => {
    clearTimeout(dropdownTimeout);
    setHoveredMenu(menu);
  };

  const handleMouseLeave = () => {
    setDropdownTimeout(setTimeout(() => setHoveredMenu(null), 300));
  };

  const navItems = [
    { name: "Home" },
    {
      name: "Sauna",
      submenu: ["Sauna Heaters", "Sauna Controls", "Sauna Accessories", "Sauna Rooms"],
    },
    {
      name: "Steam",
      submenu: ["Steam Generators", "Steam Controls", "Steam Accessories"],
    },
    {
      name: "Support",
      submenu: ["Frequently Asked Questions", "User Manuals", "Product Catalogue"],
    },
    { name: "Contact Us", submenu: ["For Distributors"] },
    { name: "About Us", submenu: ["Latest News"] },
    { name: "Careers" },
  ];

  return (
    <header className={`site-header ${hidden ? "header-hidden" : ""}`}>
      <div className="header-inner">
        <a href="/" className="logo-wrap">
          <img src={sLogo} alt="SAWO Logo" className="site-logo" />
        </a>

        {!forceMobile && (
          <nav ref={navRef} className="main-nav">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="nav-item"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <button className="nav-link">
                  <span>{item.name}</span>
                  {item.submenu && <ChevronDown size={16} />}
                </button>

                {item.submenu && hoveredMenu === item.name && (
                  <div className="dropdown-menu animate-fadeIn">
                    {item.submenu.map((sub) => (
                      <a key={sub} href="/" className="dropdown-link">
                        {sub}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        )}

        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-menu animate-fadeIn">
          {navItems.map((item) => (
            <div key={item.name} className="mobile-item">
              <button
                className="mobile-link"
                onClick={() =>
                  setHoveredMenu(hoveredMenu === item.name ? null : item.name)
                }
              >
                {item.name}
                {item.submenu && <ChevronDown size={16} />}
              </button>

              {item.submenu && hoveredMenu === item.name && (
                <div className="mobile-submenu">
                  {item.submenu.map((sub) => (
                    <a key={sub} href="/" className="mobile-sublink">
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
