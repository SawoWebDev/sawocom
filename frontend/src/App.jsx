import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import menuPaths from "menuPaths";

// Pages
import Home from "./pages/Home/Home";
import Infrared from "./pages/Infrared/Infrared";

// AboutUs
import Sustainability from "./pages/AboutUs/Sustainability";
import LatestNews from "./pages/AboutUs/LatestNews";

// Careers
import Careers from "./pages/Careers/Careers";

// Contact
import Contact from "./pages/Contact/Contact";

// Sauna top-level page
import Sauna from "./pages/Sauna/Sauna";
// Sauna submenu
import WallMounted from "./pages/Sauna/heaters/WallMounted";
import Tower from "./pages/Sauna/heaters/Tower";
import Stone from "./pages/Sauna/heaters/Stone";
import Floor from "./pages/Sauna/heaters/Floor";
import Combi from "./pages/Sauna/heaters/Combi";
import Dragonfire from "./pages/Sauna/heaters/Dragonfire";
import SaunaControls from "./pages/Sauna/SaunaControls";
import SaunaAccessories from "./pages/Sauna/SaunaAccessories";
import SaunaRooms from "./pages/Sauna/SaunaRooms";

// Steam top-level page
import Steam from "./pages/Steam/Steam";
// Steam submenu
import SteamGenerators from "./pages/Steam/SteamGenerators";
import SteamControls from "./pages/Steam/SteamControls";
import SteamAccessories from "./pages/Steam/SteamAccessories";

// Support top-level page
import Support from "./pages/Support/Support";
// Support submenu
import FAQ from "./pages/Support/FAQ";
import UserManuals from "./pages/Support/UserManuals";
import ProductCatalogue from "./pages/Support/ProductCatalogue";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* Main page */}
          <Route path={menuPaths.home} element={<Home />} />

          {/* Infrared */}
          <Route path={menuPaths.infrared} element={<Infrared />} />

          {/* About pages */}
          <Route path={menuPaths.about.sustainability} element={<Sustainability />} />
          <Route path={menuPaths.about.news} element={<LatestNews />} />

          {/* Top-level parent pages (use parent string) */}
          <Route path={menuPaths.sauna.parent} element={<Sauna />} />
          <Route path={menuPaths.steam.parent} element={<Steam />} />
          <Route path={menuPaths.support.parent} element={<Support />} />
          <Route path={menuPaths.careers} element={<Careers />} />
          <Route path={menuPaths.contact} element={<Contact />} />

          {/* Sauna submenu */}
          <Route path={menuPaths.sauna.heaters.wallMounted} element={<WallMounted />} />
          <Route path={menuPaths.sauna.heaters.tower} element={<Tower />} />
          <Route path={menuPaths.sauna.heaters.stone} element={<Stone />} />
          <Route path={menuPaths.sauna.heaters.floor} element={<Floor />} />
          <Route path={menuPaths.sauna.heaters.combi} element={<Combi />} />
          <Route path={menuPaths.sauna.heaters.dragonfire} element={<Dragonfire />} />
          <Route path={menuPaths.sauna.controls} element={<SaunaControls />} />
          <Route path={menuPaths.sauna.accessories} element={<SaunaAccessories />} />
          <Route path={menuPaths.sauna.rooms} element={<SaunaRooms />} />

          {/* Steam submenu */}
          <Route path={menuPaths.steam.generators} element={<SteamGenerators />} />
          <Route path={menuPaths.steam.controls} element={<SteamControls />} />
          <Route path={menuPaths.steam.accessories} element={<SteamAccessories />} />

          {/* Support submenu */}
          <Route path={menuPaths.support.faq} element={<FAQ />} />
          <Route path={menuPaths.support.manuals} element={<UserManuals />} />
          <Route path={menuPaths.support.catalogue} element={<ProductCatalogue />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
