import { ArrowForwardIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Joi from 'joi';
import { FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { EyeIcon } from '../../../../assets/icons/EyeIcon';
import VRapeutic from '../../../../assets/images/VRapeutic.png';
import LoginNavigation from '../../../../features/auth/components/LoginNavigation';
import BackgroundLogin from '../../../../assets/images/BackgroundLogin.png';
import CongratulationsReset from './CongratulationsReset';
import { useResetPassword } from '../../hooks/ForgetPassword';

const ResetPassword = () => {
  const [data, setData] = useState({ password: '', confirmPassword: '' });
  const [error, setError] = useState({ password: null, confirmPassword: null });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mutation = useResetPassword();
  const location = useLocation();

  const schema = Joi.object({
    password: Joi.string().min(4).required().messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 4 characters long',
    }),
    confirmPassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .messages({
        'any.only': 'Passwords do not match',
        'string.empty': 'Confirm Password is required',
      }),
  });

  const handlePasswordChange = (password: string) => {
    const result = schema.validate({ ...data, password });
    setData((prev) => ({ ...prev, password }));
    if (result.error) {
      const errorDetails = result.error.details.find(
        (detail) => detail.context?.key === 'password'
      );
      setError((prev) => ({
        ...prev,
        password: errorDetails?.message || null,
      }));
    } else {
      setError((prev) => ({ ...prev, password: null }));
    }
  };

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    const result = schema.validate({ ...data, confirmPassword });
    setData((prev) => ({ ...prev, confirmPassword }));
    if (result.error) {
      const errorDetails = result.error.details.find(
        (detail) => detail.context?.key === 'confirmPassword'
      );
      setError((prev) => ({
        ...prev,
        confirmPassword: errorDetails?.message || null,
      }));
    } else {
      setError((prev) => ({ ...prev, confirmPassword: null }));
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = schema.validate(data);
    if (result.error) {
      console.log(result.error);
    } else {
      console.log('Form is valid');
      mutation.mutate(
        {
          token: location.state.token,
          requestBody: {
            password: data.password,
            confirmPassword: data.confirmPassword,
          },
        },
        {
          onSuccess: (response) => {
            onOpen();
          },
          onError: (error) => {
            console.log('error', error);
            // Handle the error and show appropriate feedback to the user
          },
        }
      );
    }
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
                fontFamily="Graphik LCG"
                fontWeight="600"
                fontSize="2rem"
                color="#222631"
              >
                Welcome back
              </Heading>
              <Text fontSize="1rem" pt="19px" color="#58667E">
                Please enter a new password to continue using your VRapeutic
                account.
              </Text>
              <form onSubmit={onSubmit}>
                <FormControl>
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
                      isInvalid={Boolean(error.password)}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      value={data.password}
                      type={showPassword ? 'text' : 'password'}
                      borderRadius="8px"
                      border="1px"
                      borderColor="#E9EDF0"
                      px="20px"
                      py="18px"
                      h="unset"
                      letterSpacing="6px"
                      placeholder="Password"
                      _placeholder={{
                        letterSpacing: 'initial',
                      }}
                    />
                    <InputRightElement
                      pr="10.83px"
                      h="100%"
                      cursor="pointer"
                      onClick={() => setShowPassword(!showPassword)}
                      children={
                        showPassword ? (
                          <EyeIcon />
                        ) : (
                          <ViewOffIcon
                            color={'#b6bfcd'}
                            width="20px"
                            height="20px"
                          />
                        )
                      }
                    />
                  </InputGroup>
                  {error.password && (
                    <Text color="red.500" fontSize="sm" mt="5px">
                      {error.password}
                    </Text>
                  )}
                  <FormLabel
                    pt="24px"
                    pb="12px"
                    fontSize="1rem"
                    color="#222631"
                    m="0px"
                  >
                    Confirm Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      isInvalid={Boolean(error.confirmPassword)}
                      onChange={(e) =>
                        handleConfirmPasswordChange(e.target.value)
                      }
                      value={data.confirmPassword}
                      type={showConfirmPassword ? 'text' : 'password'}
                      borderRadius="8px"
                      border="1px"
                      borderColor="#E9EDF0"
                      px="20px"
                      py="18px"
                      h="unset"
                      letterSpacing="6px"
                      placeholder="Confirm Password"
                      _placeholder={{
                        letterSpacing: 'initial',
                      }}
                    />
                    <InputRightElement
                      pr="10.83px"
                      h="100%"
                      cursor="pointer"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      children={showConfirmPassword ? (
                        <EyeIcon />
                      ) : (
                        <ViewOffIcon
                          color={'#b6bfcd'}
                          width="20px"
                          height="20px"
                        />
                      )}
                    />
                  </InputGroup>
                  {error.confirmPassword && (
                    <Text color="red.500" fontSize="sm" mt="5px">
                      {error.confirmPassword}
                    </Text>
                  )}
                  <Button
                    type="submit"
                    w="380px"
                    h="73px"
                    mt="32px"
                    bg="#45A4C8"
                    _focus={{
                      boxShadow: '0px 4px 16px rgba(69, 164, 200, 0.24)',
                    }}
                    borderRadius="12px"
                    bgColor="#45A4C8"
                    padding="28px 32px"
                    color="white"
                    fontSize="1.5rem"
                    justifyContent="space-between"
                    rightIcon={<ArrowForwardIcon />}
                    isLoading={mutation.isLoading}
                  >
                    Submit
                  </Button>
                </FormControl>
              </form>
              <Text pt="12px" fontSize="0.75rem" color="#58667E">
                By continuing you are agreeing to{' '}
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
          <LoginNavigation />
        </GridItem>
      </Grid>
      {isOpen && <CongratulationsReset isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default ResetPassword;
