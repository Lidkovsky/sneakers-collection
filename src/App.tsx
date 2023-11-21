import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Main from "./pages/main/Main";
import Create from "./pages/create/Create";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to={"/create"} />} />
        <Route path="main" element={<Main />} />
        <Route path="create" element={<Create />} />
      </Routes>
    </Router>
  );
}

export default App;
