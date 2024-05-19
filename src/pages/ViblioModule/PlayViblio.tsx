import {
  Box,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Link,
} from '@chakra-ui/react';
import React from 'react';
import viblioBG from '@renderer/assets/images/viblioBG.png';
import VIBLIO from '@renderer/assets/images/VIBLIO.png';
import { Link as ReachLink } from 'react-router-dom';
import { PlayBtn } from '@renderer/assets/icons/PlayBtn';
import { ExitBtn } from '@renderer/assets/icons/ExitBtn';
import { MainmenuBtn } from '@renderer/assets/icons/MainmenuBtn';

export default function PlayViblio() {
  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          bgColor="rgba(0,0,0,0)"
          top="130px"
          left="1300px"
        >
          <MainmenuBtn />
        </MenuButton>
        <MenuList bgColor="beige" marginRight="110px" marginTop="10px">
          <MenuItem bgColor="beige">Main Menu</MenuItem>
          <MenuItem bgColor="beige">Exit Session</MenuItem>
          <MenuItem bgColor="beige">Exit Module</MenuItem>
        </MenuList>
      </Menu>
      <Box
        bgImage={viblioBG}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        w="1519px"
        h="780px"
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        gap="12.28px"
      >
        <Image src={VIBLIO} />
        <Link as={ReachLink} to="/ChooseLevel">
          <PlayBtn />
        </Link>
        <Link to="#">
          <ExitBtn />
        </Link>
      </Box>
    </>
  );
}
