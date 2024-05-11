import { useForm } from 'react-hook-form';
import joi from 'joi';
import {
  Button,
  Text,
  Box,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { TherapyFormProps } from '../AddCenterForm/therapyFormInterface';
import { config } from '@renderer/config';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import UploadKidImg from './UploadKidImg';

const GeneralInfoFormKids: React.FC<TherapyFormProps> = ({
  onSubmit,
  // nextHandler,
  backHandler,
  sliding,
  formData,
}) => {
  const animatedComponents = makeAnimated();

  const [diagnoses, setDiagnoses] = useState([]);
  const [age, setAge] = useState('');

  const handleChange = (e:any) => {
    let value = e.target.value;
    // Ensure only numeric characters are entered
    if (/^\d*$/.test(value)) {
      // Truncate the value if it exceeds the maximum length
      if (value.length > 2) {
        value = value.slice(0, 2);
      }
      setAge(value);
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const schema = joi.object({
    Name: joi.string().min(3).max(30).required().label('Name'),
    Email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required(),
    Age: joi.string().required(),
    diagnoses: joi.array().required().label('diagnoses'),
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

  const FormonSubmit = (data: {
    name: string;
    email: string;
    age: number;
    diagnoses: any[];
  }) => {
    onSubmit(data);

    onOpen();
  };
  useEffect(() => {
    getAllDiagnoses();
  }, []);
  const getAllDiagnoses = async () => {
    try {
      const response = await axios.get(`${config.apiURL}/api/v1/diagnoses`);
      setDiagnoses(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const diagnosesList = diagnoses.map((diagnose) => ({
    id: diagnose.id,
    label: diagnose.name,
    value: diagnose.id,
  }));
  const handleSpecializations = (options: any) => {
    setValue('diagnoses', [...options]);
  };
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      border: '2px solid #E8E8E8',
      borderRadius: '8px',
      boxShadow: '0px 0px 4px 0px rgba(57, 97, 251, 0.30)',
      '&:hover': {
        border: '1px solid #4965CA',
      },
    }),
  
  };
  return (
    <Box
      bg="#FFFFFF"
      borderRadius="10px"
      mx="18"
      my="30"
      as="form"
      onSubmit={handleSubmit(FormonSubmit)}
    >
      <Grid
        m="2.625em 1.5em 0em 1.5em"
        templateColumns="repeat(2, 1fr)"
        gap="0em 1.5625em"
      >
        <GridItem mb="5">
          <FormLabel
            display="inline"
            m="0em"
            letterSpacing="0.256px"
            color="#15134B"
          >
            Name
          </FormLabel>

          <Input
            {...register('Name')}
            id="Name"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb=".3em"
            borderRadius="8px"
          />
          {errors.Name && (
            <Text color="red.500">{errors.Name.message as string}</Text>
          )}
        </GridItem>

        <GridItem mb="5">
          <FormLabel
            display="inline"
            m="0em"
            letterSpacing="0.256px"
            color="#15134B"
          >
            Email
          </FormLabel>

          <Input
            {...register('Email')}
            id="Email"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb=".3em"
            borderRadius="8px"
          />
          {errors.Email && (
            <Text color="red.500">{errors.Email.message as string}</Text>
          )}
        </GridItem>
        <GridItem mb="5">
          <FormLabel
            display="inline"
            m="0em"
            letterSpacing="0.256px"
            color="#15134B"
          >
            Age
          </FormLabel>

          <Input
            {...register('Age')}
            id="Age"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="number"
            mt="0.75em"
            mb=".3em"
            borderRadius="8px"
            value={age}
            onChange={handleChange}
          />

          {errors.Age && (
            <Text color="red.500">{errors.Age.message as string}</Text>
          )}
        </GridItem>
        <GridItem mb="5">
          <FormLabel
            display="inline"
            m="0em"
            letterSpacing="0.256px"
            color="#15134B"
          >
            Diagnoses
          </FormLabel>
          <Box mt="0.75em" mb=".3em">
            <Select
              {...register('diagnoses')}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={diagnosesList}
              id="diagnoses"
              name="diagnoses"
              onChange={handleSpecializations}
              styles={customStyles}
            />
          </Box>

          {errors.diagnoses && (
            <Text color="red.500">{errors.diagnoses.message as string}</Text>
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
      {onOpen && (
        <UploadKidImg
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={onSubmit}
          formData={formData}
        />
      )}
    </Box>
  );
};
export default GeneralInfoFormKids;