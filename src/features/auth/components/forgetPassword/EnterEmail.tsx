import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
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
import BackgroundLogin from '../../../../assets/images/BackgroundLogin.png';
import VRapeutic from '../../../../assets/images/VRapeutic.png';
import { useSendEmail } from '../../hooks/ForgetPassword';
import LoginNavigation from '../LoginNavigation';

const EnterEmail = () => {
  const [data, setData] = useState({ email: '' });
  const [error, setError] = useState({ email: null });
  const navigate = useNavigate();
  const mutation = useSendEmail();

  const emailSchema = Joi.string()
    .lowercase()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: false,
      },
    });

  const schema = Joi.object().keys({
    email: emailSchema,
  });

  const handleEmailChange = (email: string) => {
    setData((prev) => ({ ...prev, email: email }));
    const result = emailSchema.validate(email);
    const handleEmailChange = (email: string) => {
      setData((prev) => ({ ...prev, email: email }));
      const result = emailSchema.validate(email);
      if (result.error) {
        setError((prev) => ({ ...prev, email: result.error }));
      } else {
        setError((prev) => ({ ...prev, email: null }));
        setError((prev) => ({ ...prev, email: null }));
      }
    };
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = schema.validate(data);
    if (result) {
      mutation.mutate(data.email, {
        onSuccess: (response) => {
          navigate('/validateotp', {
            state: {
              id: response.id,
              email: response.attributes.email,
              path: 'ResetPassword',
            },
          });
        },
        onError: (error) => {
          console.log('error', error);
        },
      });
    }
    if (result.error) {
      // TODO: handle error
      console.log(result.error);
    }
  };
  return (
    <Grid
      templateColumns={['repeat(1, 1fr)', null, null, 'repeat(2, 1fr)']}
      gridColumnGap="5"
      height="100vh"
    >
      <GridItem bg="white">
        <Flex maxW="400px" marginX="auto" flexDirection="column" height="100%">
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
              Please enter your email address you used for registration.
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
                  Email
                </FormLabel>
                <InputGroup>
                  <Input
                    isInvalid={data.email.length > 0 && Boolean(error.email)}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    value={data.email}
                    type="email"
                    borderRadius="8px"
                    border="1px"
                    borderColor="#4965CA"
                    px="20px"
                    py="18px"
                    h="unset"
                    placeholder="Email"
                  />
                  <InputRightElement h="100%" pr="11.33px" />
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
                  isLoading={mutation.isLoading}
                >
                  Submit
                </Button>
              </FormControl>
            </form>
            <Box display={'flex'} onClick={() => navigate('/login')}>
              <ArrowBackIcon
                mt="27px"
                fontWeight="500"
                fontSize="1rem"
                cursor={'pointer'}
                mr={'10px'}
              />
              <Text
                mt="24px"
                fontWeight="500"
                fontSize="1rem"
                cursor={'pointer'}
              >
                Back to Login
              </Text>
            </Box>
            <Text pt="32px" color="#4F4F4F" fontWeight="500" fontSize="1rem">
              New to VRapeutic?{' '}
              <Link
                display="inline"
                color="#3961FB"
                onClick={() => {
                  navigate('/signup');
                }}
                // href="https://site.vrpeutic.ca/request-demo/"
              >
                Create an Account
              </Link>
            </Text>
            <Text pt="12px" fontSize="0.75rem" color="#58667E">
              By continuing you are agreeing to{' '}
              <Link
                display="inline"
                color="#4F4F4F"
                fontWeight="500"
                textDecoration="underline"
                  href="https://myvrapeutic.com/privacy-policy/"
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
  );
};

export default EnterEmail;
