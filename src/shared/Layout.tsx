import { Flex } from "@chakra-ui/react";
import Header from "@renderer/features/header/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
    return (
        <Flex height="inherit">
            <Sidebar />
            <Flex height="inherit" flexGrow="1" flexDir="column" bg="#F5F5F5">
                <Header />
                <Outlet />
            </Flex>
        </Flex>
    );
}
