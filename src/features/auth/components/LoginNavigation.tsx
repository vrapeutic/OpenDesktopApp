<<<<<<< HEAD
import { Box, Button, Flex, Link, Image } from "@chakra-ui/react";
import ImageLogin from "../../../assets/images/ImageLogin.png";

const LoginNavigation = () => {
    return (
        <>
            <Flex
                justifyContent="space-between"
                marginX="auto"
                alignItems="center"
                paddingTop="45px"
                maxW="435px"
            >
                <Link
                    fontFamily="Manrope"
                    lineHeight="1.2"
                    color="#FFFFFF"
                    fontWeight="600"
                    href="https://site.vrpeutic.ca/#vr"
                >
                    Features
                </Link>
                <Link
                    fontFamily="Manrope"
                    color="#FFFFFF"
                    fontWeight="600"
                    href="https://site.vrpeutic.ca/#about"
                >
                    About us
                </Link>
                <Link
                    fontFamily="Manrope"
                    color="#FFFFFF"
                    fontWeight="600"
                    href="http://yuram.tech/blog/"
                >
                    Blog
                </Link>
                <Button
                    as="a"
                    fontFamily="Manrope"
                    bg="#FFFFFF"
                    color="#15134B"
                    fontWeight="800"
                    padding="12px 24px"
                    border-radius="8px"
                    href="https://site.vrpeutic.ca/request-demo/"
                >
                    Get Started
                </Button>
            </Flex>
            <Box marginLeft="-55px">
                <Image src={ImageLogin} alt="login background image" />
            </Box>
        </>
    );
=======
import { Box, Button, Flex, Link, Image } from '@chakra-ui/react';
import ImageLogin from '../../../assets/images/ImageLogin.png';

const LoginNavigation = () => {
  return (
    <>
      <Flex
        justifyContent="space-between"
        marginX="auto"
        alignItems="center"
        paddingTop="45px"
        maxW="435px"
      >
        <Link
          fontFamily="Manrope"
          lineHeight="1.2"
          color="#FFFFFF"
          fontWeight="600"
          href="https://site.vrpeutic.ca/#vr"
        >
          Features
        </Link>
        <Link
          fontFamily="Manrope"
          color="#FFFFFF"
          fontWeight="600"
          href="https://site.vrpeutic.ca/#about"
        >
          About us
        </Link>
        <Link
          fontFamily="Manrope"
          color="#FFFFFF"
          fontWeight="600"
          href="http://yuram.tech/blog/"
        >
          Blog
        </Link>
        <Button
          as="a"
          fontFamily="Manrope"
          bg="#FFFFFF"
          color="#15134B"
          fontWeight="800"
          padding="12px 24px"
          border-radius="8px"
          href="https://site.vrpeutic.ca/request-demo/"
        >
          Get Started
        </Button>
      </Flex>
      <Box marginLeft="-55px">
        <Image src={ImageLogin} alt="login background image" />
      </Box>
    </>
  );
>>>>>>> dev
};

export default LoginNavigation;
