import {
  HStack,
  Text,
  Icon,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import Specialty from './Specialty';
import Progressbar from '../../theme/components/ProgressBarSignup';
import Joi from 'joi';

export default function Generalinfo() {
  const [Next, setNext] = useState(false);
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
  });

  const userData = {
    name: values.name,
    email: values.email,
    password: values.password,
    'specialty_ids[]': new Array(),
    degree: '',
    university: '',
    certificate: {},
    photo: {},
  };

  const next = () => {
    setNext((current) => !current);
  };

  const schema = Joi.object().keys({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/)
      .required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'in', 'co'] },
    }),
    password: Joi.string().min(4).required(),
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { error } = schema.validate(values, { abortEarly: false });
    console.log(error);

    if (error) {
      const validationErrors: any = {};
      error.details.forEach((detail) => {
        validationErrors[detail.path[0]] = detail.message;
      });
      setErrors(validationErrors);
      console.log(validationErrors);
    } else {
      console.log('form is valid');
      console.log(userData);
      next();
    }
  };

  return (
    <>
      <HStack position="absolute" left="291px" top="128px">
        <Icon as={ArrowBackIcon} w="16px" h="16px" top="135px" />
        <Text
          top="128px"
          left="331px"
          fontFamily="Graphik LCG"
          fontSize="29px"
          fontWeight="400"
          lineHeight="29px"
        >
          Create Profile
        </Text>
      </HStack>

      <Box bg="#FFFFFF" borderRadius="10px" m={{ base: "5.875em 0.625em", md: "5.875em 2.625em 5.875em 2.375em" }} as="form">
        <Progressbar index={0} />
        <Grid m={{ base: "2.625em 1em", md: "2.625em 1.5em 0em 1.5em" }} templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }} gap="0em 1.5625em">
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <FormControl>
              <GridItem>
                <FormLabel>Name</FormLabel>
                <Input
                  borderColor="#4965CA"
                  border="2px solid #E8E8E8"
                  _hover={{ border: '1px solid #4965CA' }}
                  boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
                  type="text"
                  mt="0.75em"
                  mb="1em"
                  borderRadius="8px"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
                <div>{errors.name}</div>
              </GridItem>
              <GridItem>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  borderColor="#4965CA"
                  border="2px solid #E8E8E8"
                  _hover={{ border: '1px solid #4965CA' }}
                  boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
                  mt="0.75em"
                  mb="1em"
                  borderRadius="8px"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                <div>{errors.email}</div>
              </GridItem>
              <GridItem>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  borderColor="#4965CA"
                  border="2px solid #E8E8E8"
                  _hover={{ border: '1px solid #4965CA' }}
                  boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
                  mt="0.75em"
                  mb="1em"
                  borderRadius="8px"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                <div>{errors.password}</div>
              </GridItem>
              <Button
                w="214px"
                h="54px"
                mt="1em"
                bg="#4AA6CA"
                borderRadius="12px"
                color="#FFFFFF"
                fontFamily="Roboto"
                fontWeight="700"
                fontSize="18px"
                type="submit"
              >
                Next
              </Button>
            </FormControl>
          </form>
        </Grid>
      </Box>
      {Next && <Specialty userData={userData} />}
    </>
  );
}
