// import React from "react";
// import logo from "@renderer/logo.svg";
import "@renderer/App.css";
import Login from "./pages/Login";
import Header from "./theme/components/Header";

function App() {
  return (
    <>
      {/* <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div> */}
      {/* <Login /> */}
      <Header />
    </>
  );
}

export default App;
