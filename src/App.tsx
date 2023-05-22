import "./App.css";
import Sidebar from "./shared/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Kids from "./pages/Kids";
import Theraputicmodules from "./pages/Theraputicmodules";
import Therapycenters from "./pages/Therapycenters";
import Branches from "./pages/Branches";
import Specialists from "./pages/Specialists";
import Assessmenttools from "./pages/Assessmenttools";
import Setting from "./pages/Setting";
import { Flex } from "@chakra-ui/react";
import Login from "./features/auth/Login";
import { useEffect, useState } from "react";

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        (async () => {
            const token = await (window as any).electronAPI.getPassword(
                "token"
            );

            setLoggedIn(Boolean(token));
        })();
    }, []);

    console.log("isLoggedIn: ", isLoggedIn);

    if (!isLoggedIn) return <Login />;

    return (
        <Flex>
            {/* <Login /> */}
            {/* <Header /> */}
            <BrowserRouter>
                <Sidebar />
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="main_window" element={<Home />} />
                    <Route path="Kids" element={<Kids />} />
                    <Route
                        path="Theraputicmodules"
                        element={<Theraputicmodules />}
                    />
                    <Route path="Therapycenters" element={<Therapycenters />} />
                    <Route path="Therapycenters" element={<Therapycenters />} />
                    <Route path="Branches" element={<Branches />} />
                    <Route path="Specialists" element={<Specialists />} />
                    <Route
                        path="Assessmenttools"
                        element={<Assessmenttools />}
                    />
                    <Route path="setting" element={<Setting />} />
                </Routes>
            </BrowserRouter>
        </Flex>
    );
}

export default App;
