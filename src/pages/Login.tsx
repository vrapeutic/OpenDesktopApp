import React, { useState } from "react";
import {
  Grid,
  GridItem,
  Flex,
  Box,
  Image,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Link,
  Button,
  Input,
  FormHelperText,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { ArrowForwardIcon, CheckIcon } from "@chakra-ui/icons";

import Group59 from "../assets/images/Group 59.png";
import Group237698 from "../assets/images/Group 237698.png";
import Gradient from "../assets/images/Gradient.png";
import { EyeIcon } from "../assets/icons/EyeIcon";

const Login = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const printing = () => {
    console.log(email);
    console.log(password);
  };

  printing();

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gridColumnGap="5">
        <GridItem pl="141px" bg="white">
          <Flex flexDirection="column">
            <Box maxW="23.75rem">
              <Image src={Group59} alt="VRapeutic" w="176px" pt="32px" />
              <Heading
                pt="69px"
                letterSpacing="-0.01em"
                fontFamily="inherit"
                fontWeight="600"
                fontSize="2rem"
                color="#222631">
                Welcome back
              </Heading>
              <Text fontSize="1rem" pt="19px" color="#58667E">
                Please login or register to start using your VRapeutic account.
              </Text>
              <form>
                <FormControl>
                  <FormLabel
                    pt="24px"
                    pb="12px"
                    fontSize="1rem"
                    color="#4965CA"
                    m="0px">
                    Email or mobile number
                  </FormLabel>
                  <InputGroup>
                    <Input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type="email"
                      borderRadius="8px"
                      border="1px"
                      borderColor="#4965CA"
                      px="20px"
                      py="18px"
                      h="unset"
                      placeholder="+20 123 456 789"
                    />
                    <InputRightElement
                      h="100%"
                      pr="11.33px"
                      children={<CheckIcon color="#16C683" />}
                    />
                  </InputGroup>
                  <FormLabel
                    pt="24px"
                    pb="12px"
                    fontSize="1rem"
                    color="#222631"
                    m="0px">
                    Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      type="password"
                      borderRadius="8px"
                      border="1px"
                      borderColor="#E9EDF0"
                      px="20px"
                      py="18px"
                      h="unset"
                      placeholder="Password"
                    />
                    <InputRightElement
                      pr="10.83px"
                      h="100%"
                      children={<EyeIcon />}
                    />
                  </InputGroup>
                  <FormHelperText pt="12px" color="#C76565" fontSize="0.875rem">
                    Forgot Password ?
                  </FormHelperText>
                  <Button
                    w="380px"
                    h="73px"
                    mt="32px"
                    bg="#45A4C8"
                    box-shadow="0px 4px 16px rgba(69, 164, 200, 0.24)"
                    borderRadius="12px"
                    color="#45A4C8">
                    <Text
                      p="28px 32px"
                      pr="240px"
                      fontSize="1.25rem"
                      fontWeight="400"
                      color="#FFFFFF">
                      Login
                    </Text>
                    <ArrowForwardIcon color="#FFFFFF"></ArrowForwardIcon>
                  </Button>
                </FormControl>
              </form>
              <Text pt="32px" color="#4F4F4F" fontSize="1rem">
                New to VRapeutic?{" "}
                <Link display="inline" color="#3961FB">
                  Create an Account
                </Link>
              </Text>
              <Text pt="12px" fontSize="0.75rem" color="#58667E">
                By continuing you are agreeing to{" "}
                <Link display="inline" color="#4F4F4F">
                  Terms & Conditions
                </Link>
              </Text>
            </Box>
            <Text pt="55px" fontSize="0.75rem" color="#000000">
              2022 All Rights Reserved. VRapeutic.
            </Text>
          </Flex>
        </GridItem>
        <GridItem
          bgGradient={Gradient}
          borderTopLeftRadius="100px"
          borderBottomLeftRadius="100px">
          <Flex>
            <Link
              fontFamily="Manrope"
              fontSize="1rem"
              color="#FFFFFF"
              fontWeight="600"
              pt="32px"
              ml="100px">
              Features
            </Link>
            <Link
              fontFamily="Manrope"
              fontSize="16px"
              color="#FFFFFF"
              fontWeight="600"
              pt="32px"
              ml="40px">
              About us
            </Link>
            <Link
              fontFamily="Manrope"
              fontSize="16px"
              color="#FFFFFF"
              fontWeight="600"
              pt="32px"
              ml="40px">
              Blog
            </Link>
            <Button
              fontFamily="Manrope"
              mt="22px"
              ml="43px"
              bg="#FFFFFF"
              color="#15134B"
              fontWeight="800"
              fontSize="16px"
              padding="12px 24px"
              border-radius="8px">
              Get Started
            </Button>
          </Flex>
          <Box>
            <Image
              ml="-50px"
              mt="33px"
              src={Group237698}
              alt="VRapeutic Woman"
            />
          </Box>
        </GridItem>
      </Grid>
      {/* <h1>Welcome back</h1>
      <div>
        Please login or register to start using your VRapeutic account.{" "}
      </div>
      <FormControl>
        <FormLabel>Email or mobile number</FormLabel>
        <input type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <input type="password" />
        <FormHelperText>Forgot Password ?</FormHelperText>
      </FormControl> */}
    </>
  );
};

export default Login;
