import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./registerUser";
import Thank from "./thank";

const AppContent: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/thank" element={<Thank />} />
    </Routes>
  );
};

export default AppContent;
