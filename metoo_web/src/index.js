import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './State Mangement/store'; // Import your Redux store
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchCartDataAsync } from "./State Mangement/action";
store.dispatch(fetchCartDataAsync());
ReactDOM.render(
  <Provider store={store}> {/* Wrap your App component with Provider and pass the Redux store */}
    <React.StrictMode>
      <App />
      <ToastContainer />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

