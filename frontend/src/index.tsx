import React from "react";
import ReactDOM from "react-dom";

const home_node = document.getElementById("home");

window.onload = () => {
  ReactDOM.render(<div>hello, world</div>, home_node);
};