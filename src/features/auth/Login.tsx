import { useState } from "react";
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

import VRapeutic from "../../assets/images/VRapeutic.png";
import ImageLogin from "../../assets/images/ImageLogin.png";
import BackgroundLogin from "../../assets/images/BackgroundLogin.png";
import { EyeIcon } from "../../assets/icons/EyeIcon";

const Login = (props: any) => {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [checkIconView, setcheckIconView] = useState(false);

    const togglePassword: any = () => {
        setShowPassword(!showPassword);
    };

    const validationHandler = () => {
        event.preventDefault();
        const Joi = require("joi");
        const schema = Joi.object().keys({
            email: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.number().integer().min(3).required(),
        });

        const emailToValidate = {
            email: emailInput,
            password: passwordInput,
        };
        const result = schema.validate(emailToValidate);
        if (result.error == null) {
            setcheckIconView(true);
        } else {
            setcheckIconView(false);
        }
    };

    return (
        <>
            <Grid
                templateColumns={[
                    "repeat(1, 1fr)",
                    null,
                    null,
                    "repeat(2, 1fr)",
                ]}
                gridColumnGap="5"
                height="100vh"
            >
                <GridItem bg="white">
                    <Flex
                        maxW="400px"
                        marginX="auto"
                        flexDirection="column"
                        height="100%"
                    >
                        <Box maxW="23.75rem">
                            <Image
                                src={VRapeutic}
                                alt="VRapeutic logo"
                                w="176px"
                                pt="32px"
                            />
                            <Heading
                                pt="69px"
                                letterSpacing="-0.01em"
                                fontFamily="inherit"
                                fontWeight="600"
                                fontSize="2rem"
                                color="#222631"
                            >
                                Welcome back
                            </Heading>
                            <Text fontSize="1rem" pt="19px" color="#58667E">
                                Please login or register to start using your
                                VRapeutic account.
                            </Text>
                            <form onSubmit={validationHandler}>
                                <FormControl>
                                    <FormLabel
                                        pt="24px"
                                        pb="12px"
                                        fontSize="1rem"
                                        color="#4965CA"
                                        m="0px"
                                    >
                                        Email or mobile number
                                    </FormLabel>
                                    <InputGroup>
                                        <Input
                                            onChange={(e) =>
                                                setEmailInput(e.target.value)
                                            }
                                            value={emailInput}
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
                                            children={
                                                checkIconView ? (
                                                    <CheckIcon color="#16C683" />
                                                ) : null
                                            }
                                        />
                                    </InputGroup>
                                    <FormLabel
                                        pt="24px"
                                        pb="12px"
                                        fontSize="1rem"
                                        color="#222631"
                                        m="0px"
                                    >
                                        Password
                                    </FormLabel>
                                    <InputGroup>
                                        <Input
                                            onChange={(e) =>
                                                setPasswordInput(e.target.value)
                                            }
                                            value={passwordInput}
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            borderRadius="8px"
                                            border="1px"
                                            borderColor="#E9EDF0"
                                            px="20px"
                                            py="18px"
                                            h="unset"
                                            letterSpacing="6px"
                                            placeholder="Password"
                                            _placeholder={{
                                                letterSpacing: "initial",
                                            }}
                                        />
                                        <InputRightElement
                                            pr="10.83px"
                                            h="100%"
                                            cursor="pointer"
                                            onClick={togglePassword}
                                            children={<EyeIcon />}
                                        />
                                    </InputGroup>
                                    <FormHelperText
                                        pt="12px"
                                        color="#C76565"
                                        fontSize="0.875rem"
                                    >
                                        Forgot Password ?
                                    </FormHelperText>
                                    <Button
                                        type="submit"
                                        w="380px"
                                        h="73px"
                                        mt="32px"
                                        bg="#45A4C8"
                                        _focus={{
                                            boxShadow:
                                                "0px 4px 16px rgba(69, 164, 200, 0.24)",
                                        }}
                                        borderRadius="12px"
                                        bgColor="#45A4C8"
                                        padding="28px 32px"
                                        color="white"
                                        fontSize="1.5rem"
                                        justifyContent="space-between"
                                        rightIcon={<ArrowForwardIcon />}
                                    >
                                        Login
                                    </Button>
                                </FormControl>
                            </form>
                            <Text
                                pt="32px"
                                color="#4F4F4F"
                                fontWeight="500"
                                fontSize="1rem"
                            >
                                New to VRapeutic?{" "}
                                <Link display="inline" color="#3961FB">
                                    Create an Account
                                </Link>
                            </Text>
                            <Text pt="12px" fontSize="0.75rem" color="#58667E">
                                By continuing you are agreeing to{" "}
                                <Link
                                    display="inline"
                                    color="#4F4F4F"
                                    fontWeight="500"
                                    textDecoration="underline"
                                >
                                    Terms & Conditions
                                </Link>
                            </Text>
                        </Box>
                        <Text
                            position="relative"
                            marginTop="auto"
                            marginBottom="32px"
                            fontSize="0.75rem"
                            color="#000000"
                        >
                            2022 All Rights Reserved. VRapeutic.
                        </Text>
                    </Flex>
                </GridItem>
                <GridItem
                    bgImage={BackgroundLogin}
                    bgRepeat="no-repeat"
                    backgroundSize="cover"
                    borderStartRadius="50px"
                    height="100%"
                >
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
                        >
                            Features
                        </Link>
                        <Link
                            fontFamily="Manrope"
                            color="#FFFFFF"
                            fontWeight="600"
                        >
                            About us
                        </Link>
                        <Link
                            fontFamily="Manrope"
                            color="#FFFFFF"
                            fontWeight="600"
                        >
                            Blog
                        </Link>
                        <Button
                            fontFamily="Manrope"
                            bg="#FFFFFF"
                            color="#15134B"
                            fontWeight="800"
                            padding="12px 24px"
                            border-radius="8px"
                        >
                            Get Started
                        </Button>
                    </Flex>
                    <Box marginLeft="-55px">
                        <Image src={ImageLogin} alt="login background image" />
                    </Box>
                </GridItem>
            </Grid>
        </>
    );
};

export default Login;
