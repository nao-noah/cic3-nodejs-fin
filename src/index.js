import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUsejb-aUu2avQslELDM_qsUMAOzYWI14",
  authDomain: "ciccc-nodejs-fin2.firebaseapp.com",
  projectId: "ciccc-nodejs-fin2",
  storageBucket: "ciccc-nodejs-fin2.appspot.com",
  messagingSenderId: "589239819826",
  appId: "1:589239819826:web:379a2953bb109a72eb262b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
