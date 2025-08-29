import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.css";

// Temporarily disabled StrictMode to test if it's causing multiple API calls
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
