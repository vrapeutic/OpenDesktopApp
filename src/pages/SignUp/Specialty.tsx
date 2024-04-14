import {
  HStack,
  Text,
  Icon,
  Box,
  FormControl,
  FormLabel,
  Button,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Educationinfo from '@renderer/pages/SignUp/Educationinfo';
import Generalinfo from '@renderer/pages/SignUp/Generalinfo';
import Progressbar from '@renderer/theme/components/ProgressBarSignup';
import Joi from 'joi';
import { config } from '@renderer/config';

export default function Specialty(props: any) {
  const animatedComponents = makeAnimated();
  const [content, setContent] = useState([]);
  const [Next, setNext] = useState(false);
  const [Back, setBack] = useState(false);
  const [values, setValues] = useState({
    specializations: [],
  });

  const [errors, setErrors] = useState({
    specializations: null,
  });

  useEffect(() => {
    fetch(`${config.apiURL}/api/v1/specialties`, {
      method: 'Get',
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => setContent(result))
      .catch((error) => console.log('error', error));
  });

  const specialties = content.map((speciality) => ({
    id: speciality.id,
    label: speciality.name,
    value: speciality.name,
  }));

  const next = () => {
    setNext((current) => !current);
  };

  const back = () => {
    setBack((current) => !current);
  };

  const schema = Joi.object().keys({
    specializations: Joi.array().required(),
  });

  const handleSpecializations = (options: any) => {
    setValues({ ...values, specializations: options });
    console.log(values);
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
      values.specializations.map((speciality) =>
        props.userData['specialty_ids[]'].push(speciality.id)
      );
      console.log(props.userData);
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

      <Box
        bg="#FFFFFF"
        borderRadius="10px"
        m={{ base: '5.875em 0.625em', md: '5.875em 2.625em 5.875em 2.375em' }}
        as="form"
      >
        <Progressbar index={1} />
        <Grid
          m={{ base: '2.625em 1em', md: '2.625em 1.5em 0em 1.5em' }}
          templateColumns={{ base: '1fr', md: 'repeat(1, 1fr)' }}
          gap="0em 1.5625em"
        >
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <FormControl>
              <GridItem>
                <FormLabel
                  fontFamily="Graphik LCG"
                  fontWeight="400"
                  fontSize="16px"
                  lineHeight="16px"
                  color="#15134B"
                >
                  Choose specializations (like tags, for example, Sensory
                  Integration, Physical Therapy, etc.)
                </FormLabel>

                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={specialties}
                  name="specializations"
                  value={values.specializations}
                  onChange={handleSpecializations}
                />

                <div>{errors.specializations}</div>
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

      {Back && <Generalinfo />}

      {Next && <Educationinfo userData={props.userData} />}
    </>
  );
}
