import { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import Header from '@renderer/features/header/Header';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Sideclose from './Sidebar/Sideclose';

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      if (location.pathname === '/signup') return;

      const token = await (window as any).electronAPI.getPassword('token');
      console.log('token: ', token);
      if (!token) {
        navigate('/login');
      }
    })();
  }, [location.pathname]);

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
}
