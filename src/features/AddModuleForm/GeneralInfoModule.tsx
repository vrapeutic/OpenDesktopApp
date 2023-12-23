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
} from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
import Progressbar from '../../theme/components/ProgressBarAddCenter';
import { TherapyFormProps } from '../AddCenterForm/therapyFormInterface';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { config } from '@renderer/config';
import makeAnimated from 'react-select/animated';
import ProgressBarAddModule from '@renderer/theme/components/ProgressBarAddModule';

const GeneralInfoModule: React.FC<TherapyFormProps> = ({
  onSubmit,
  nextHandler,
  backHandler,
  sliding,
}) => {
  const schema = joi.object({
    Name: joi.string().min(3).max(30).required().label('Name'),

    Type: joi.string().required(),
  
    From: joi.number().required(),
    To: joi.number().required(),
    specializationschema: joi.array().required().label('specializationschema'),

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
    Name: string;
    Type: string;
    Email: string;
    // Skills: string;
    From: number;
    To:number;
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
      const response = await axios.get(`${config.apiURL}/api/v1/targeted_skills`);
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
            Type
          </FormLabel>

          <Input
            {...register('Type')}
            id="Type"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb="1em"
            borderRadius="8px"
          />
          {errors.Type && (
            <Text color="red.500">{errors.Type.message as string}</Text>
          )}
        </GridItem>
        <GridItem>
          <FormLabel
            display="inline"
            mb="1em"
            letterSpacing="0.256px"
            color="#15134B"
          >
            Age Range
          </FormLabel>
          <Grid gap={2} templateColumns="repeat(2, 1fr)">
            <GridItem>
              <FormLabel
                display="inline"
                m="0em"
                letterSpacing="0.256px"
                color="#15134B"
                fontSize={12}
              >
                From
              </FormLabel>

              <Input
                {...register('From')}
                id="From"
                borderColor="#4965CA"
                border="2px solid #E8E8E8"
                _hover={{ border: '1px solid #4965CA' }}
                boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
                type="text"
                mt="0.75em"
                mb="1em"
                borderRadius="8px"
              />
              {errors.From && (
                <Text color="red.500">{errors.From.message as string}</Text>
              )}
            </GridItem>
            <GridItem>
              <FormLabel
                display="inline"
                m="0em"
                letterSpacing="0.256px"
                color="#15134B"
                fontSize={12}
              >
                To
              </FormLabel>

              <Input
                {...register('To')}
                id="To"
                borderColor="#4965CA"
                border="2px solid #E8E8E8"
                _hover={{ border: '1px solid #4965CA' }}
                boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
                type="text"
                mt="0.75em"
                mb="1em"
                borderRadius="8px"
              />
              {errors.To && (
                <Text color="red.500">{errors.To.message as string}</Text>
              )}
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem>
          <FormLabel
            display="inline"
            m="0em"
            letterSpacing="0.256px"
            color="#15134B"
          >
            specializationschema
          </FormLabel>
{/* 
          <Input
            {...register('Skills')}
            id="Skills"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb="1em"
            borderRadius="8px"
          /> */}
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
            <Text color="red.500">{errors.specializationschema.message as string}</Text>
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
export default GeneralInfoModule;