import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./components/screens/homeScreen";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomeScreen />} />
      </Routes>
    </div>
  );
}

export default App;
