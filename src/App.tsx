
// import React from "react";
// import logo from "@renderer/logo.svg";
import "./App.css";
import Login from "./pages/Login";
import Header from "./theme/components/Header";
import Sidebar from "./theme/components/Sidebar";
import { BrowserRouter , Routes ,Route } from "react-router-dom";
import Home from "./pages/Home";
import Kids from "./pages/Kids";
import Theraputicmodules from "./pages/Theraputicmodules";
import Therapycenters from "./pages/Therapycenters";
import Branches from "./pages/Branches";
import Specialists from "./pages/Specialists";
import Assessmenttools from "./pages/Assessmenttools";
import Setting from "./pages/Setting";
import { Flex } from "@chakra-ui/react";

function App() {
  return (
    <Flex>
      {/* <Login /> */}
      {/* <Header /> */}
      <BrowserRouter>
      <Sidebar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="Kids" element={<Kids />} />
      <Route path="Theraputicmodules" element={<Theraputicmodules />} />
      <Route path="Therapycenters" element={<Therapycenters />} />
      <Route path="Therapycenters" element={<Therapycenters />} />
      <Route path="Branches" element={<Branches />} />
      <Route path="Specialists" element={<Specialists />} />
      <Route path="Assessmenttools" element={<Assessmenttools />} />
      <Route path="setting" element={<Setting />} />
      </Routes>
      </BrowserRouter>
    </Flex>
  );
}

export default App;
