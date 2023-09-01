import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import store from "./redux/store";
import Routes from "./routes/Routes";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer autoClose={3000} />
      <Routes />
    </Provider>
  );
}

export default App;
