import { FormEvent, useState } from "react";
import {
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
import VRapeutic from "../../../assets/images/VRapeutic.png";
import { EyeIcon } from "../../../assets/icons/EyeIcon";
import { ArrowForwardIcon, CheckIcon } from "@chakra-ui/icons";
import Joi from "joi";
import { useLoginMutation } from "../hooks/useLoginMutation";

const LoginForm = () => {
    const [data, setData] = useState({ identifier: "", password: "" });
    const [error, setError] = useState({ identifier: null, password: null });
    const [showPassword, setShowPassword] = useState(false);
    const loginMutation = useLoginMutation();

    const identifierSchema = Joi.alternatives()
        .try(
            Joi.string()
                .lowercase()
                .email({
                    minDomainSegments: 2,
                    tlds: {
                        allow: ["com", "net", "in", "co"],
                    },
                }),
            Joi.string()
                .length(11)
                .pattern(/^[0-9]+$/)
        )
        .required();

    const passwordSchema = Joi.string().min(4).required();

    const schema = Joi.object().keys({
        identifier: identifierSchema,
        password: passwordSchema,
    });

    const handleIdentifierChange = (email: string) => {
        setData((prev) => ({ ...prev, identifier: email }));
        const result = identifierSchema.validate(email);

        if (result.error) {
            setError((prev) => ({ ...prev, identifier: result.error }));
        } else {
            setError((prev) => ({ ...prev, identifier: null }));
        }
    };

    const handlePasswordChange = (password: string) => {
        setData((prev) => ({ ...prev, password }));
        const result = passwordSchema.validate(password);

        if (result.error) {
            setError((prev) => ({ ...prev, password: result.error }));
        } else {
            setError((prev) => ({ ...prev, password: null }));
        }
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        const result = schema.validate(data);

        if (result.error) {
            // TODO: handle error
            console.log(result.error);
        } else {
            loginMutation.mutate(data, {
                onSuccess: () => {
                    // TODO: handle success
                    console.log("success");
                },
                onError: (e) => console.log("login failed: ", e.message),
            });
        }
    };

    return (
        <Flex maxW="400px" marginX="auto" flexDirection="column" height="100%">
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
                    Please login or register to start using your VRapeutic
                    account.
                </Text>
                <form onSubmit={onSubmit}>
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
                                isInvalid={
                                    data.identifier.length > 0 &&
                                    Boolean(error.identifier)
                                }
                                onChange={(e) =>
                                    handleIdentifierChange(e.target.value)
                                }
                                value={data.identifier}
                                type="email"
                                borderRadius="8px"
                                border="1px"
                                borderColor="#4965CA"
                                px="20px"
                                py="18px"
                                h="unset"
                                placeholder="0123 456 7890"
                            />
                            <InputRightElement
                                h="100%"
                                pr="11.33px"
                                children={
                                    data.identifier.length > 0 &&
                                    !Boolean(error.identifier) ? (
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
                                isInvalid={
                                    data.password.length > 0 &&
                                    Boolean(error.password)
                                }
                                onChange={(e) =>
                                    handlePasswordChange(e.target.value)
                                }
                                value={data.password}
                                type={showPassword ? "text" : "password"}
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
                                onClick={() => setShowPassword(!showPassword)}
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
                    <Link
                        display="inline"
                        color="#3961FB"
                        href="https://site.vrpeutic.ca/request-demo/"
                    >
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
    );
};

export default LoginForm;
