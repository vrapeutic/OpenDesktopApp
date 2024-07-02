import { useForm } from 'react-hook-form';
import joi from 'joi';
import {
  Button,
  Text,
  Box,
  FormLabel,
  Grid,
  GridItem,
  Flex,
} from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { config } from '../../config';
import ProgressBarSignup from '../../theme/components/ProgressBarSignup';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { SignupFormProps } from './signupFormInterface';

const SpecialtySignup: React.FC<SignupFormProps> = ({
  onSubmit,
  nextHandler,
  backHandler,
  sliding,
  formData,
}) => {
  const schema = joi.object({
    specializationschema: joi
      .array()
      .min(1)
      .required()
      .label('Specializations'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onTouched',
  });

  const FormonSubmit = (data: { specializationschema: any[] }) => {
    onSubmit(data);
    nextHandler();
  };

  const [specialistslist, setspecialistslist] = useState([]);

  useEffect(() => {
    getSpecialists();
  }, []);

  const getSpecialists = async () => {
    try {
      const response = await axios.get(`${config.apiURL}/api/v1/specialties`);
      setspecialistslist(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const animatedComponents = makeAnimated();

  const handleSpecializations = (options: any) => {
    setValue('specializationschema', options || []);
  };

  const specialties = specialistslist.map((speciality) => ({
    id: speciality.id,
    label: speciality.name,
    value: speciality.id,
  }));

  return (
    <Box
      bg="#FFFFFF"
      borderRadius="10px"
      m="5.875em 2.625em 5.875em 2.375em"
      as="form"
      onSubmit={handleSubmit(FormonSubmit)}
    >
      <ProgressBarSignup index={1} />
      <Grid
        m="2.625em 1.5em 0em 1.5em"
        templateColumns="repeat(2, 1fr)"
        gap="0em 1.5625em"
      >
        <GridItem colSpan={2}>
          <FormLabel
            fontFamily="Graphik LCG"
            fontWeight="400"
            fontSize="1rem"
            lineHeight="1rem"
            color="#15134B"
          >
            Choose specializations (like tags, for example, Sensory Integration,
            Physical Therapy, etc.)
          </FormLabel>
          <Select
            components={animatedComponents}
            isMulti
            options={specialties}
            id="specializationschema"
            name="specializationschema"
            onChange={handleSpecializations}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                marginTop: '0.75em',
                marginBottom: '1em',
                borderRadius: '8px',
              }),
            }}
          />
          {errors.specializationschema && (
            <Text color="red.500">
              {errors.specializationschema.message as string}
            </Text>
          )}
        </GridItem>
      </Grid>
      <Flex flexDirection="row-reverse">
        <Button
          type="submit"
          bg="#4AA6CA"
          borderRadius="0.75em"
          w="13.375em"
          h="3.375em"
          mt="0em"
          mr="1.5em"
          mb="2em"
          color="#FFFFFF"
          fontSize="1.125em"
          fontWeight="700"
        >
          Next
        </Button>

        {sliding === 1 ? null : (
          <Button
            onClick={backHandler}
            bg="#F5F5F5"
            borderRadius="0.75em"
            w="13.375em"
            h="3.375em"
            mt="0em"
            ml="1.5em"
            mb="2em"
            mr="auto"
            color="#A0A0A0"
            fontSize="1.125em"
            fontWeight="700"
          >
            Back
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default SpecialtySignup;
