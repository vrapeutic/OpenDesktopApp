import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import joi from 'joi';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import {
  Button,
  Text,
  Box,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Flex,
  Select as SelectChakra,
} from '@chakra-ui/react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import ProgressBarAddModule from '../../theme/components/ProgressBarAddModule';
import { config } from '../../config';

interface ModuleAttributes {
  name: string;
  technology: string;
  version: number;
  targeted_skills: { id: number; name: string }[];
}

interface Module {
  attributes: ModuleAttributes;
}

interface LocationState {
  Module: Module;
}

interface FormInputs {
  Name: string;
  Technology: string;
  Version: number;
  specializationschema: { id: number; label: string; value: number }[];
}

interface Props {
  onSubmit: (data: FormInputs) => void;
  nextHandler: () => void;
  sliding: number;
}

const GeneralInfoEditModule: React.FC<Props> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const Module = (location.state as LocationState)?.Module;

  if (!Module) {
    navigate('/error'); // or handle the error appropriately
  }

  const schema = joi.object({
    Name: joi.string().min(3).max(30).required().label('Name'),
    Technology: joi.string().required(),
    Version: joi.number().required(),
    specializationschema: joi.array().required().label('specializationschema'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormInputs>({
    resolver: joiResolver(schema),
    mode: 'onTouched',
  });

  const FormonSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log("Form Data after submission:", data); // Log the form data
    nextHandler(data); // Call the nextHandler function to navigate or perform other actions
  };

  const [specialistslist, setspecialistslist] = useState<
    { id: number; name: string }[]
  >([]);
  const animatedComponents = makeAnimated();

  const getSpecialists = async () => {
    try {
      const response = await axios.get(
        `${config.apiURL}/api/v1/targeted_skills`
      );
      setspecialistslist(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSpecializations = (options: any) => {
    setValue('specializationschema', [...options]);
  };

  const specialties = specialistslist.map((speciality) => ({
    id: speciality.id,
    label: speciality.name,
    value: speciality.id,
  }));

  useEffect(() => {
    getSpecialists();
  }, []);

  useEffect(() => {
    if (Module) {

      console.log("type of verison without parse int", typeof Module.attributes.version)

      console.log("type of verison", parseInt(Module.attributes.version))

      setValue('Name', Module.attributes.name);
      setValue('Technology', Module.attributes.technology);
      setValue('Version', parseInt(Module.attributes.version));
      setValue(
        'specializationschema',
        Module.attributes.targeted_skills.map((skill) => ({
          id: skill.id,
          label: skill.name,
          value: skill.id,
        }))
      );
    }
  }, [Module]);

  const backHandler = () => {
    navigate('/Theraputicmodules');
  };

  const nextHandler = (data: any) => {
    console.log("Form Data in general info edit module:", data); 
    navigate('/EditModule2', { state: { newdata: data, olddata: Module } });
  };
  return (
    <>
      <Box
        bg="#FFFFFF"
        borderRadius="10px"
        m="5.875em 2.625em 5.875em 2.375em"
        as="form"
        onSubmit={handleSubmit(FormonSubmit)}
      >
        <ProgressBarAddModule index={0} />
        <Grid
          m="2.625em 1.5em 0em 1.5em"
          templateColumns="repeat(2, 1fr)"
          gap="0em 1.5625em"
        >
          <GridItem>
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
              mb="1em"
              borderRadius="8px"
            />
            {errors.Name && (
              <Text color="red.500">{errors.Name.message as string}</Text>
            )}
          </GridItem>
          <GridItem>
            <FormLabel
              display="inline"
              m="0em"
              letterSpacing="0.256px"
              color="#15134B"
            >
              Technology
            </FormLabel>
            <SelectChakra
              {...register('Technology')}
              id="Technology"
              name="Technology"
            >
              <option value="virtual_reality">Virtual Reality</option>
              <option value="two_dimensional">Two Dimensional</option>
            </SelectChakra>
            {errors.Technology && (
              <Text color="red.500">{errors.Technology.message as string}</Text>
            )}
          </GridItem>
          <GridItem>
            <FormLabel
              display="inline"
              m="0em"
              letterSpacing="0.256px"
              color="#15134B"
            >
              Version
            </FormLabel>
            <Input
              {...register('Version')}
              id="Version"
              borderColor="#4965CA"
              border="2px solid #E8E8E8"
              _hover={{ border: '1px solid #4965CA' }}
              boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
              type="text"
              mt="0.75em"
              mb="1em"
              borderRadius="8px"
            />
            {errors.Version && (
              <Text color="red.500">{errors.Version.message as string}</Text>
            )}
          </GridItem>
          <GridItem>
            <FormLabel
              display="inline"
              m="0em"
              letterSpacing="0.256px"
              color="#15134B"
            >
              Skills
            </FormLabel>
            <Select
              {...register('specializationschema')}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={specialties}
              id="specializationschema"
              name="specializationschema"
              onChange={handleSpecializations}
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
     
        </Flex>
      </Box>
    </>
  );
};

export default GeneralInfoEditModule;
