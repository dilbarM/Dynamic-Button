
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Config from "./Config";
import Output from "./Output";
import "./App.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Config />} />
        <Route path="/output" element={<Output />} />
      </Routes>
    </Router>
  );
}

export default App;
