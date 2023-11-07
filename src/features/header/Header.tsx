import {
    Flex,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";
<<<<<<< HEAD
import { IcMenuClose } from "@renderer/assets/icons/IcMenuClose";
import { SeatchNormal } from "@renderer/assets/icons/SearchNormal";
import Icons from "@renderer/components/Icons";
import User from "@renderer/components/User";
import { useState } from "react";
import { IcMenuOpen } from "@renderer/assets/icons/IcMenuOpen";


const Header = ({sideToggle}:any) => {
=======
import { IcMenuClose } from "../../assets/icons/IcMenuClose";
import { SeatchNormal } from "../../assets/icons/SearchNormal";
import Icons from "./components/Icons";
import User from "./components/User";
import { useState } from "react";
import { IcMenuOpen } from "../../assets/icons/IcMenuOpen";

const Header = ({ sideToggle }: any) => {
>>>>>>> 47e69242a8be75fe7faa93820def80c6dbd80d49
    const [menuOpen, setMenuOpen] = useState(false);

    const icMenuHandler = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <Flex pl="31px" pr="40px" mt="27px">
            <HStack cursor="pointer" onClick={sideToggle}>
<<<<<<< HEAD
            <div onClick={icMenuHandler}>
                {menuOpen  
                         ? <>
                             <IcMenuClose /> 
                               </>
                         : <>
                             <IcMenuOpen />
                              </>}
                 </div>
=======
                <div onClick={icMenuHandler}>
                    {menuOpen ? (
                        <>
                            <IcMenuClose />
                        </>
                    ) : (
                        <>
                            <IcMenuOpen />
                        </>
                    )}
                </div>
>>>>>>> 47e69242a8be75fe7faa93820def80c6dbd80d49
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
    );
};

export default Header;