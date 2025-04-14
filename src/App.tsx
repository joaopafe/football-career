import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";

import "./style/App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
