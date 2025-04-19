import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Game } from "./pages/Game";
import { Classification } from "./pages/Classification";

import "./style/App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/game" element={<Game />} />

      <Route path="/classification" element={<Classification />} />
    </Routes>
  );
};

export default App;
