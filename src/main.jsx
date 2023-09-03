import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/fonts/AirbnbCereal-Regular.ttf";
import "./assets/fonts/AirbnbCereal-Bold.ttf";
import "./assets/fonts/AirbnbCereal-Medium.ttf";
import "./assets/fonts/AirbnbCereal-Light.ttf";
import "./globalStyles/flexAndGrid.scss";
import "./globalStyles/variables.scss";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
