import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./components/screens/homeScreen";
import BattleScreen from "./components/screens/battleScreen";

function App() {
  const appStyle = {
    backgroundColor: "#f5f5f5", // Light gray color
  };
  return (
    <div className="App" style={appStyle}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/battle" element={<BattleScreen />} />
      </Routes>
    </div>
  );
}

export default App;
