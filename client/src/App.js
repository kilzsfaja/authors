import "./bootstrap.min.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import DisplayAll from "./components/DisplayAll";
import EditOne from "./components/EditOne";
import CreateOne from "./components/CreateOne";

function App() {
  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center my-5">Favorite Author</h1>
        {/* set the stage */}
        <Routes>
          {/* ---- display all ------ */}
          <Route path="/" element={<DisplayAll/>}/>
          {/* ---- create one ------- */}
          <Route path="/new" element={<CreateOne/>}/>
          {/* ---- edit one -------- */}
          <Route path="/edit/:id" element={<EditOne/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
