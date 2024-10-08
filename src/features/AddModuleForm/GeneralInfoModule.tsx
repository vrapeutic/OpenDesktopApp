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
    // Otp: joi.string().required(),
    specializationschema: joi.array().required().label('specializationschema'),
  });
  console.log(formData)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onTouched',
    defaultValues:formData
  });

  const FormonSubmit = (data: {
    Name: string;
    Technology: string;
    Email: string;
    Version: number;

    specializationschema: any[];
  }) => {
    onSubmit(data);

    nextHandler();
  };

  const [specialistslist, setspecialistslist] = useState([]);

  useEffect(() => {
    getSpecialists();
  }, []);

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

  const animatedComponents = makeAnimated();

  const handleSpecializations = (options: any) => {
    setValue('specializationschema', [...options]);
  };
  const specialties = specialistslist.map((speciality) => ({
    id: speciality.id,
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
          <GridItem my={4}>
            <FormLabel
              display="inline"
              m="0em"
              letterSpacing="0.256px"
              color="#15134B"
              mb={4}
            >
              Technology
            </FormLabel>

            <SelectChakra
              {...register('Technology')}
              id="Technology"
              name="Technology"
            >
              <option value="virtual_reality">virtual reality</option>
              <option value="two_dimensional">two dimensional</option>
            </SelectChakra>
            {errors.Technology && (
              <Text color="red.500">{errors.Technology.message as string}</Text>
            )}
          </GridItem>

          {/* <GridItem>
            <FormLabel
              display="inline"
              m="0em"
              letterSpacing="0.256px"
              color="#15134B"
            >
             Otp
            </FormLabel>

            <Input
              {...register('Otp')}
              id="Otp"
              borderColor="#4965CA"
              border="2px solid #E8E8E8"
              _hover={{ border: '1px solid #4965CA' }}
              boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
              type="text"
              mt="0.75em"
              mb="1em"
              borderRadius="8px"
            />
            {errors.Otp && (
              <Text color="red.500">{errors.Otp.message as string}</Text>
            )}
          </GridItem> */}

          <GridItem my={4}>
            <FormLabel
              display="inline"
              m="0em"
              letterSpacing="0.256px"
              color="#15134B"
              mb={4}
            >
              Skills
            </FormLabel>
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
                  id="specializationschema"
                  name="specializationschema"
                  onChange={handleSpecializations}
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
    </>
  );
};
export default GeneralInfoModule;
