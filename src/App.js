import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Map from "./pages/Map";
import Z4B1 from "./components/MapLayer2/Zone4/z4";
import Z4B1Z1 from "./components/MapLayer3/Zone4block1/z1";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import MarketDetail from "./components/Marketplace/MarketDetail";
import Zone from "./pages/Zone";
import Whitepaper from "./pages/Whitepaper";
import Footer from "./components/HomeComponents/Footer";
import Cookie from "./components/PrivencyPolicy/Cookie";

function App() {
  return (
      <BrowserRouter>
        <Cookie />
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/zone" element={<Zone />} />
          <Route path="/map" element={<Map />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/detail/:idnft" element={<MarketDetail />} />
          <Route path="/mapz4b1/:idl1" element={<Z4B1 />} />
          <Route
            path="/mapz4b1z1/:idl1/:idl2/:numland/:numcols"
            element={<Z4B1Z1 />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
