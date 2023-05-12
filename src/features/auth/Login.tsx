import { Grid, GridItem } from "@chakra-ui/react";

import LoginForm from "@renderer/features/auth/components/LoginForm";
import LoginNavigation from "@renderer/features/auth/components/LoginNavigation";
import BackgroundLogin from "../../assets/images/BackgroundLogin.png";

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
                    <LoginNavigation />
                </GridItem>
            </Grid>
        </>
    );
};

export default Login;
