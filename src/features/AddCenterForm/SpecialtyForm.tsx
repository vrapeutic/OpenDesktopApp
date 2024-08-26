import { Controller, useForm } from 'react-hook-form';
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
  Select as SelectChakra,
} from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { TherapyFormProps } from '../AddCenterForm/therapyFormInterface';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { config } from '../../config';
import makeAnimated from 'react-select/animated';
import ProgressBarAddModule from '../../theme/components/ProgressBarAddModule';

const GeneralInfoModule: React.FC<TherapyFormProps> = ({
  onSubmit,
  nextHandler,
  backHandler,
  sliding,
  
  formData
}) => {
  const schema = joi.object({
    Name: joi.string().min(3).max(30).required().label('Name'),
    Technology: joi.string().required(),
    Version: joi.number().required(),
    specializationschema: joi.array().required().label('specializationschema'),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onTouched',
  
  });

  const [specialistslist, setspecialistslist] = useState([]);

  useEffect(() => {
    getSpecialists();
  }, []);

  const getSpecialists = async () => {
    try {
      const response = await axios.get(`${config.apiURL}/api/v1/targeted_skills`);
      setspecialistslist(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const animatedComponents = makeAnimated();

  const specialties = specialistslist.map((speciality) => ({
    label: speciality.name,
    value: speciality.id,
  }));

  return (
    <>
      <Box
        bg="#FFFFFF"
        borderRadius="10px"
        m="5.875em 2.625em 5.875em 2.375em"
        as="form"
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          nextHandler();
        })}
      >
        <ProgressBarAddModule index={0} />
        <Grid
          m="2.625em 1.5em 0em 1.5em"
          templateColumns="repeat(2, 1fr)"
          gap="0em 1.5625em"
        >
          <GridItem>
            <FormLabel color="#15134B">Name</FormLabel>
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
            <FormLabel color="#15134B">Version</FormLabel>
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
            <FormLabel color="#15134B">Technology</FormLabel>
            <Controller
              name="Technology"
              control={control}
              render={({ field }) => (
                <SelectChakra {...field}>
                  <option value="virtual_reality">virtual reality</option>
                  <option value="two_dimensional">two dimensional</option>
                </SelectChakra>
              )}
            />
            {errors.Technology && (
              <Text color="red.500">{errors.Technology.message as string}</Text>
            )}
          </GridItem>
          <GridItem>
            <FormLabel color="#15134B">Skills</FormLabel>
            <Controller
              name="specializationschema"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={specialties}
                />
              )}
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
            bg={isValid ? '#4AA6CA' : '#D3D3D3'}
            borderRadius="0.75em"
            w="13.375em"
            h="3.375em"
            color="#FFFFFF"
            fontSize="1.125em"
            fontWeight="700"
            isDisabled={!isValid}
          >
            Next
          </Button>
          {sliding !== 1 && (
            <Button
              onClick={backHandler}
              bg="#F5F5F5"
              borderRadius="0.75em"
              w="13.375em"
              h="3.375em"
              color="#A0A0A0"
              fontSize="1.125em"
              fontWeight="700"
              mr="auto"
            >
              Back
            </Button>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default GeneralInfoModule;
