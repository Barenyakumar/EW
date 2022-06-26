import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App"
import { AuthContextProvider } from "./context/AuthContext"
import { createRoot } from "react-dom/client"
const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)