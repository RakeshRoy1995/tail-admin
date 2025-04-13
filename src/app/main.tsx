import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "@/app/store";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n.ts"; // Import i18n configuration
import { enUS, bnBD } from "@mui/material/locale"; // MUI locales

const muiLocale = i18n.language === "bn" ? bnBD : enUS;

const theme = createTheme(
  {
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
    // You can add more customizations here, like palette, breakpoints, etc.
  },
  muiLocale,
);

ReactDOM.createRoot(document.getElementById("page-top") as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
