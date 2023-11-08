import {
    Grid,
    GridItem,
    Flex,
    Box,
    Image,
    Heading,
    Text,
    Button,
    HStack,
} from "@chakra-ui/react";
import LoginNavigation from "@renderer/features/auth/components/LoginNavigation";
import BackgroundLogin from "@renderer/assets/images/BackgroundLogin.png";
import VRapeutic from "@renderer/assets/images/VRapeutic.png";
import { Spinner } from "@renderer/assets/icons/Spinner";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { useParams } from "react-router-dom";
import { config } from "@renderer/config";

export default function OTP(props: any) {
    const [otp, setOtp] = useState("");
    const params = useParams();

    const input = {
        width: "60px",
        height: "64px",
        border: "1px solid black",
        borderRadius: "8px",
        marginRight: "8px",
    };

    const otpHandleChange = (otp: string) => {
        setOtp(otp);
        if (otp.length === 6) {
            fetch(
                `${config.apiURL}/api/v1/doctors/${params.userId}/validate_otp`,
                {
                    method: "POST",
                    body: otp,
                    redirect: "follow",
                }
            )
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.log("error", error));
        }
    };

    const resendOtp = () => {
        fetch(`${config.apiURL}/api/v1/doctors/${params.userId}/resend_otp`, {
            method: "PUT",
            redirect: "follow",
        })
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
    };

    return (
        <Grid
            templateColumns={["repeat(1, 1fr)", null, null, "repeat(2, 1fr)"]}
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
                            Verify Your Email
                        </Heading>

                        <Text
                            pt="15px"
                            color="#58667E"
                            fontFamily="Graphik LCG"
                            fontSize="16px"
                            fontWeight="400"
                            lineHeight="27.2px"
                        >
                            We’ve sent a verification code to
                        </Text>

                        <Text
                            color="#222631"
                            fontFamily="Graphik LCG"
                            fontSize="16px"
                            fontWeight="400"
                            lineHeight="27.2px"
                        >
                            kh@gmail.com
                            {/* {props.userData.email} */}
                        </Text>

                        <Text
                            pt="40px"
                            color="#58667E"
                            fontFamily="Graphik LCG"
                            fontSize="15px"
                            fontWeight="400"
                            lineHeight="27.2px"
                        >
                            Please enter that code below to verify your account.
                        </Text>

                        <Text
                            pt="40px"
                            color="#222631"
                            fontFamily="Graphik LCG"
                            fontSize="16px"
                            fontWeight="400"
                            lineHeight="27.2px"
                            mb="13px"
                        >
                            Enter code
                        </Text>

                        <OTPInput
                            value={otp}
                            onChange={otpHandleChange}
                            numInputs={6}
                            renderInput={(props) => <input {...props} />}
                            shouldAutoFocus
                            inputStyle={input}
                        />

                        <HStack pt="15px" spacing="46px">
                            <Text
                                color="#3961FB"
                                fontFamily="Graphik LCG"
                                fontSize="14px"
                                fontWeight="500"
                                lineHeight="24px"
                            >
                                Code is valid for 30 minutes
                            </Text>

                            <Button
                                isLoading
                                loadingText="Verifying"
                                color="#3961FB"
                                bgColor="#FFFFFF"
                                spinner={<Spinner />}
                            >
                                Verifying
                            </Button>
                        </HStack>

                        <Button
                            width="149px"
                            height="59px"
                            bgColor="#FFFFFF"
                            marginTop="25px"
                            border="1.5px solid #45A4C8"
                            borderRadius="8px"
                            padding="8px 16px 8px 16px"
                            color="#45A4C8"
                            fontFamily="Graphik LCG"
                            fontWeight="400"
                            fontSize="14px"
                            lineHeight="24px"
                            onClick={resendOtp}
                        >
                            Resend Code
                        </Button>
                    </Box>
                </Flex>
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
    );
}
