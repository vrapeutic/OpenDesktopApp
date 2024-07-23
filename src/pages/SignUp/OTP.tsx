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
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import LoginNavigation from '../../features/auth/components/LoginNavigation';
import BackgroundLogin from '../../assets/images/BackgroundLogin.png';
import VRapeutic from '../../assets/images/VRapeutic.png';
import { Spinner } from '../..//assets/icons/Spinner';
import React, { useState } from 'react';
import OTPInput from 'react-otp-input';
import { useLocation, useNavigate } from 'react-router-dom';
import { config } from '../..//config';
import Congratulations from './Congratulations';
import { setApiToken } from '../..//api';
import { setMe } from '../..//cache';
import { useAdminContext } from '@renderer/Context/AdminContext';

export default function OTP() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [otp, setOtp] = useState('');
  const location = useLocation();
  console.log('location state in otp', location);
  const toast = useToast();
  const [errormessage, seterrormessage] = useState<string | undefined>(
    undefined
  );
  const navigate = useNavigate();
  const { setOtp: setContextOtp } = useAdminContext();

  const input = {
    width: '60px',
    height: '64px',
    border: '1px solid black',
    borderRadius: '8px',
    marginRight: '8px',
  };

  const handleError = (error: any) => {
    toast({
      title: 'Error',
      description: error.response.data.error,
      status: 'success',
      duration: 9000,
      position: 'top-right',
    });
  };
  console.log('location state in otp', location.state);
  const otpHandleChange = (otp: string) => {
    setOtp(otp);
    if (otp.length !== 6) return;

    const handleGetRequest = () => {
      setContextOtp(otp);
      fetch(
        'http://vrapeutic-api-production.eba-7rjfenj2.eu-west-1.elasticbeanstalk.com/api/v1/software_modules',
        {
          headers: {
            otp: `${otp}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log('GET request response:', data);
          navigate('/home');
        })
        .catch((error) => {
          console.error('GET request error:', error);
          seterrormessage('OTP is not valid or expired');
        });
    };

    const handleResetPassword = () => {
      fetch(
        `${config.apiURL}/api/v1/validate_otp?otp=${otp}&email=${location.state.email}&otp_code_type=forget_password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          redirect: 'follow',
        }
      )
        .then((response) => {
          if (response.ok && response.status >= 200 && response.status < 300) {
            return response.json(); // Return the response.json() promise
          } else {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            return Promise.reject('Failed to validate OTP'); // Reject the promise if the response is not successful
          }
        })
        .then((data) => {
          console.log('GET request response:', data.token);
          // Add your logic here to handle the data
          navigate('/ResetPassword', {
            state: {
              token: data.token,
            },
          });
        })
        .catch((error) => {
          console.error('GET request error:', error);
          seterrormessage('OTP is not valid or expired');
        });
    };

    const handlePostRequest = () => {
      fetch(
        `${config.apiURL}/api/v1/doctors/${location.state.id}/validate_otp`,
        {
          method: 'POST',
          body: JSON.stringify({ otp }),
          headers: {
            'Content-Type': 'application/json',
          },
          redirect: 'follow',
        }
      )
        .then((response) => {
          if (response.ok && response.status >= 200 && response.status < 300) {
            navigate('/home');
          } else {
            console.error(`Error: ${response.status} - ${response.statusText}`);
          }
          return response.text();
        })
        .then(async (...params) => {
          console.log('with name params', params);
          const resultObject = JSON.parse(params[0]);
          console.log('result object', resultObject);
          const token = resultObject.token;
          console.log('Accessing the token object params:', token);
          setApiToken(token);
          setMe(resultObject);
          (window as any).electronAPI.setPassword('token', token);
        })
        .catch((error) => {
          console.log('GET request error:', error);
          console.log('from result includes', 'OTP is not valid or expired');
          seterrormessage('OTP is not valid or expired');
        });
    };

    if (location.state.admin) {
      handleGetRequest();
    } else if (location.state.path === 'ResetPassword') {
      handleResetPassword();
    } else {
      handlePostRequest();
    }
  };

  const resendOtp = () => {
    fetch(`${config.apiURL}/api/v1/doctors/${location.state.id}/resend_otp`, {
      method: 'PUT',
      redirect: 'follow',
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

  return (
    <>
      <Grid
        templateColumns={['repeat(1, 1fr)', null, null, 'repeat(2, 1fr)']}
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
              <Image src={VRapeutic} alt="VRapeutic logo" w="176px" pt="32px" />
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
                {location.state.email}
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

                {/* <Button
                  isLoading
                  loadingText="Verifying"
                  color="#3961FB"
                  bgColor="#FFFFFF"
                  spinner={<Spinner />}
                >
                  Verifying
                </Button> */}
              </HStack>
              {errormessage && <Text color={'red'}>{errormessage}</Text>}
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

      {isOpen && <Congratulations isOpen={isOpen} onClose={onClose} />}
    </>
  );
}
