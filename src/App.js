import React from "react";
import "./App.css";
import Table from "./components/table";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <main className="container">
      <ToastContainer />
      <Table />
    </main>
  );
}

export default App;
