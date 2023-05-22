import {
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { IcMenuClose } from "@renderer/assets/icons/IcMenuClose";
import { SeatchNormal } from "@renderer/assets/icons/SearchNormal";
import Icons from "./components/Icons";
import User from "./components/User";
import { useState } from "react";
import { IcMenuOpen } from "@renderer/assets/icons/IcMenuOpen";

const Header = (props: any) => {
  const [menuOpen, setMenuOpen] = useState(true);

  const icMenuHandler = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <Flex pl="31px" pr="40px" mt="27px" bg="#F5F5F5">
        <HStack cursor="pointer" onClick={icMenuHandler}>
          {menuOpen ? <IcMenuClose /> : <IcMenuOpen />}
        </HStack>
        <HStack flexGrow={2} ml="20px" bg="#F5F5F5">
          <InputGroup bg="rgba(255, 255, 255, 0.8)">
            <InputLeftElement
              pointerEvents="none"
              children={<SeatchNormal />}
            />
            <Input
              type="text"
              fontFamily="Inter"
              fontWeight="500"
              fontSize="0.875rem"
              placeholder="Search for anything..."
            />
          </InputGroup>
        </HStack>
        <Icons />
        <User />
      </Flex>
    </>
  );
};

export default Header;
