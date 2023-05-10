import {
    Grid,
    GridItem,
    Flex,
    Box,
    Image,
    Link,
    Button,
} from "@chakra-ui/react";

import ImageLogin from "../../assets/images/ImageLogin.png";
import BackgroundLogin from "../../assets/images/BackgroundLogin.png";
import LoginForm from "@renderer/features/auth/components/LoginForm";

const Login = () => {
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
                    <LoginForm />
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
