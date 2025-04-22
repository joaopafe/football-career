import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Game } from "./pages/Game";
import { Classification } from "./pages/Classification";
import { NationalCup } from "./pages/NationalCup";
import { ContinentalCup } from "./pages/continentalCup";
import { Transfer } from "./pages/Tranfer";

import "./style/App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/game" element={<Game />} />

      <Route path="/classification" element={<Classification />} />

      <Route path="/national-cup" element={<NationalCup />} />

      <Route path="/continental-cup" element={<ContinentalCup />} />

      <Route path="/transfer" element={<Transfer />} />
    </Routes>
  );
};

export default App;
