import React from "react";
import "./App.css";
import DataStorage from "./components/dataStorage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <main className="container">
      <ToastContainer />
      <DataStorage />
    </main>
  );
}

export default App;
