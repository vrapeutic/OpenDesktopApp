import {
  HStack,
  Text,
  Icon,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  useDisclosure,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import React, { useState, useRef } from 'react';
import Specialty from '@renderer/pages/SignUp/Specialty';
import { Image } from '@renderer/assets/icons/Image';
import Progressbar from '../../theme/components/ProgressBarSignup';
import Joi from 'joi';
import Uploadlogo from '@renderer/pages/SignUp/Uploadlogo';

export default function Educationinfo(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputRef = useRef(null);
  const [Back, setBack] = useState(false);
  const [values, setValues] = useState({
    degree: '',
    university: '',
    certification: [],
  });

  const [errors, setErrors] = useState({
    degree: null,
    university: null,
    certification: null,
  });

  const back = () => {
    setBack((current) => !current);
  };

  const schema = Joi.object().keys({
    degree: Joi.string().required(),
    university: Joi.string().required(),
    certification: Joi.array().required(),
  });

  const handleCertificateChange = (event: any) => {
    const file = (event.target as HTMLInputElement).files[0];
    setValues({ ...values, certification: [file] });
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event: any) => {
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
      props.userData.degree = values.degree;
      props.userData.university = values.university;
      props.userData.certificate = values.certification[0];
      console.log(props.userData);
      onOpen();
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

      <Box
        bg="#FFFFFF"
        borderRadius="10px"
        m={{ base: '5.875em 0.625em', md: '5.875em 2.625em 5.875em 2.375em' }}
        as="form"
      >
        <Progressbar index={2} />
        <Grid m={{ base: "2.625em 1em", md: "2.625em 1.5em 0em 1.5em" }} templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }} gap="0em 1.5625em">

        <form onSubmit={handleSubmit}>
          <FormControl>
          <GridItem>

                <FormLabel
                  marginTop="10px"
                  fontFamily="Graphik LCG"
                  fontWeight="400"
                  fontSize="16px"
                  lineHeight="16px"
                  color="#15134B"
                >
                  Degree
                </FormLabel>
                <Input
                  type="text"
                  w="524px"
                  marginRight="25px"
                  name="degree"
                  value={values.degree}
                  onChange={handleChange}
                />
                <div>{errors.degree}</div>
                </GridItem>
                <GridItem>

                <FormLabel
                  marginTop="10px"
                  fontFamily="Graphik LCG"
                  fontWeight="400"
                  fontSize="16px"
                  lineHeight="16px"
                  color="#15134B"
                >
                  University
                </FormLabel>
                <Input
                  type="text"
                  w="524px"
                  marginRight="25px"
                  name="university"
                  value={values.university}
                  onChange={handleChange}
                />

                <div>{errors.university}</div>
                </GridItem>
                <GridItem>

                <FormLabel
                  fontFamily="Graphik LCG"
                  fontWeight="400"
                  fontSize="16px"
                  lineHeight="16px"
                  color="#15134B"
                >
                  Certification
                </FormLabel>

                <Button
                  h="128px"
                  w="174px"
                  border="2px solid #E8E8E8"
                  borderRadius="8px"
                  bg="#FFFFFF"
                  onClick={() => inputRef.current.click()}
                >
                  <Image />
                  <Input
                    type="file"
                    accept="pdf/*"
                    ref={inputRef}
                    name="certification"
                    onChange={handleCertificateChange}
                    hidden
                  />
                </Button>
                <div>{errors.certification}</div>
                </GridItem>

                <Button
                w="45%"
                h="54px"
                mt="1em"
                mr="1em"
                bg="#F5F5F5"
                color="#A0A0A0"
                fontWeight="700"
                onClick={back}
              >
                Back
              </Button>

              <Button
                w="45%"
                h="54px"
                mt="1em"
                bg="#4AA6CA"
                color="#FFFFFF"
                fontWeight="700"
                type="submit"
              >
                Next
              </Button>
          </FormControl>
        </form>
        </Grid>
      </Box>

      {Back && <Specialty />}

      {isOpen && (
        <Uploadlogo
          isOpen={isOpen}
          onClose={onClose}
          userData={props.userData}
        />
      )}
    </>
  );
}
