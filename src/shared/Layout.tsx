import { Flex } from "@chakra-ui/react";
import Header from "@renderer/features/header/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import SmallSidebar from "./SmallSidebar";
import { useState } from "react";

export default function Layout() {
  const [sidebarSize, setSidebarSize] = useState(true);

  return (
    <Flex height="inherit">
      {sidebarSize ? <SmallSidebar /> : <Sidebar />}
      <Flex height="inherit" flexGrow="1" flexDir="column" bg="#F5F5F5">
        <Header setSidebarSize={setSidebarSize} />
        <Outlet />
      </Flex>
    </Flex>
  );
}
