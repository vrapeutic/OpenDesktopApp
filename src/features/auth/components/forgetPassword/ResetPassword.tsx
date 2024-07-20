import { ArrowForwardIcon } from '@chakra-ui/icons';
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
} from '@chakra-ui/react';
import Joi from 'joi';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon } from '../../../../assets/icons/EyeIcon';
import VRapeutic from '../../../../assets/images/VRapeutic.png';
import LoginNavigation from '../../../../features/auth/components/LoginNavigation';
import BackgroundLogin from '../../../../assets/images/BackgroundLogin.png';

const ResetPassword = () => {
  const [data, setData] = useState({ password: '', confirmPassword: '' });
  const [error, setError] = useState({ password: null, confirmPassword: null });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const onLoginSuccess = (response: any) => {
    console.log('onLoginSuccess my function:', response);

    response.is_admin
      ? navigate('/validateotp', {
          state: {
            id: null,
            email: null,
            admin: response.is_admin,
          },
        })
      : navigate('/validateotp', {
          state: {
            id: response.doctor.id,
            email: response.doctor.attributes.email,
            admin: response.is_admin,
          },
        });
  };

  const schema = Joi.object({
    password: Joi.string().min(4).required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .messages({
        'any.only': 'Passwords do not match',
      }),
  });

  const handlePasswordChange = (password: string) => {
    setData((prev) => ({ ...prev, password }));
    const result = schema.validate({ ...data, password });
    console.log(result);
    if (result.error) {
      setError((prev) => ({ ...prev, password: result.error.message }));
    } else {
      setError((prev) => ({ ...prev, password: null }));
    }
  };

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setData((prev) => ({ ...prev, confirmPassword }));
    const result = schema.validate({ ...data, confirmPassword });
    console.log(result);

    if (result.error) {
      setError((prev) => ({ ...prev, confirmPassword: result.error.message }));
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
      // Perform your login logic here
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
                fontFamily="inherit"
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
                      isInvalid={
                        data.password.length > 0 && Boolean(error.password)
                      }
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
                      children={<EyeIcon />}
                    />
                  </InputGroup>
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
                      isInvalid={
                        data.confirmPassword.length > 0 &&
                        Boolean(error.confirmPassword)
                      }
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
                      children={<EyeIcon />}
                    />
                  </InputGroup>
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
    </>
  );
};

export default ResetPassword;
