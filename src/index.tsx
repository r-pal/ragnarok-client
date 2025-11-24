import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProviderWrapper } from "./ThemeProviderWrapper";
import { DataProvider } from "./context/DataContext";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <DataProvider>
        <App />
      </DataProvider>
    </ThemeProviderWrapper>
  </React.StrictMode>
);
