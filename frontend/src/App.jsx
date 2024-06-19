import React from "react";
import { Route, Routes } from "react-router";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Purchase from "./components/Purchase";
export default function App() {
  return (
    <div className="overflow-x-hidden">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<Purchase />} />
      </Routes>
    </div>
  );
}
