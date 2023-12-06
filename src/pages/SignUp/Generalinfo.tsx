import {
  HStack,
  Text,
  Icon,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
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
      {/* <HStack position="absolute" left="291px" top="128px">
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

      <Box
        position="absolute"
        top="189px"
        left="277px"
        w="1121px"
        h="742px"
        borderRadius="10px"
        bg="#FFFFFF"
      >
        <Progressbar index={0} />
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <FormControl w="1073px" h="392px" top="202px" left="24px">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              marginBottom="10px"
              name="name"
              value={values.name}
              onChange={handleChange}
            />

            <div>{errors.name}</div>

            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              marginBottom="10px"
              name="email"
              value={values.email}
              onChange={handleChange}
            />

            <div>{errors.email}</div>
            <FormLabel>Password</FormLabel>
            <Input
              type="text"
              marginBottom="10px"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            <div>{errors.password}</div>
            <Button
              w="214px"
              h="54px"
              top="80px"
              left="853px"
              bg="#4AA6CA"
              borderRadius="12px"
              color="#FFFFFF"
              fontFamily="Roboto"
              fontWeight="700"
              fontSize="18px"
              type="submit"
              //  onClick={next}
            >
              Next
            </Button>
          </FormControl>
        </form>
      </Box>
      {Next && <Specialty userData={userData} />} */}
    </>
  );
}
