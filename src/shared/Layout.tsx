<<<<<<< HEAD
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
=======
import { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import Header from '@renderer/features/header/Header';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Sideclose from './Sidebar/Sideclose';

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(true);

  const MenuHandler = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <Flex height="inherit">
      {menuOpen ? <Sidebar /> : <Sideclose />}
      <Flex height="inherit" flexGrow="1" flexDir="column" bg="#F5F5F5">
        <Header sideToggle={MenuHandler} />
        <Outlet />
      </Flex>
    </Flex>
  );
>>>>>>> dev
}
