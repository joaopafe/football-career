import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Game } from "./pages/Game";

import "./style/App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/game" element={<Game />} />
    </Routes>
  );
};

export default App;
