import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Home } from "./comps/home";
import { store } from "./store";

const home_node = document.getElementById("home");

const WrappedHome = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);

window.onload = () => {
  ReactDOM.render(<WrappedHome />, home_node);
};
