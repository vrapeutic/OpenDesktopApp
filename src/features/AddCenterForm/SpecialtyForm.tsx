import { useForm, Controller } from 'react-hook-form';
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
import axios from 'axios';
import { useEffect, useState } from 'react';
import { config } from '../../config';
import Progressbar from '../../theme/components/ProgressBarAddCenter';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { TherapyFormProps } from './therapyFormInterface';

const SpecialtyForm: React.FC<TherapyFormProps> = ({
  onSubmit,
  nextHandler,
  backHandler,
  sliding,
  formData,
}) => {
  const [defaultSpecialties, setDefaultSpecialties] = useState([]);
  const [specialistslist, setspecialistslist] = useState([]);

  const schema = joi.object({
    specialtyInformation: joi.string().required().label('SpecialtyInformation'),
    specializationschema: joi
      .array()
      .min(1)
      .required()
      .label('specializationschema'),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onTouched',
  });

  const FormonSubmit = (data: {
    specialtyInformation: string;
    specializationschema: any[];
  }) => {
    onSubmit(data);
    nextHandler();
  };

  useEffect(() => {
    getSpecialists();
  }, []);

  const getSpecialists = async () => {
    try {
      const response = await axios.get(`${config.apiURL}/api/v1/specialties`);
      const specialties = response.data.map((speciality: any) => ({
        id: speciality.id,
        label: speciality.name,
        value: speciality.id,
      }));
      setspecialistslist(specialties);
      setDefaultSpecialtiesList(specialties);
    } catch (error) {
      console.error(error);
    }
  };

  const animatedComponents = makeAnimated();

  const setDefaultSpecialtiesList = (specialties: any) => {
    const defaultSpecialties = specialties.filter(
      (specialty: any) =>
        formData?.specializationschema?.some(
          (selected: any) => selected.value === specialty.value
        )
    );
    setDefaultSpecialties(defaultSpecialties);
    setValue('specializationschema', defaultSpecialties);
  };

  const remainingSpecialties = specialistslist.filter(
    (specialty) =>
      !defaultSpecialties.some((selected) => selected.value === specialty.value)
  );

  return (
    <Box
      bg="#FFFFFF"
      borderRadius="10px"
      m="5.875em 2.625em 5.875em 2.375em"
      as="form"
      onSubmit={handleSubmit(FormonSubmit)}
    >
      <Progressbar index={1} />

      <Grid
        m="2.625em 1.5em 0em 1.5em"
        templateColumns="repeat(2, 1fr)"
        gap="0em 1.5625em"
      >
        <GridItem colSpan={2}>
          <FormLabel
            display="inline"
            m="0em"
            letterSpacing="0.256px"
            color="#15134B"
          >
            Specialty information
          </FormLabel>
          <FormLabel
            pl="0.5em"
            display="inline"
            m="0em"
            fontSize="0.75em"
            letterSpacing="0.192px"
            color="#8D8D8D"
          >
            (description)
          </FormLabel>
          <Input
            {...register('specialtyInformation')}
            id="specialtyInformation"
            h="5.5em"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb="1em"
            borderRadius="8px"
            defaultValue={formData.specialtyInformation}
          />
          {errors.specialtyInformation && (
            <Text color="red.500" mb={2} fontSize={16}>
              {errors.specialtyInformation.message as string}
            </Text>
          )}
        </GridItem>

        <GridItem colSpan={2}>
          <Controller
            name="specializationschema"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={remainingSpecialties}
                id="specializationschema"
                name="specializationschema"
                onChange={(options) => field.onChange(options)}
                defaultValue={defaultSpecialties}
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    marginTop: '0.75em',
                    marginBottom: '1em',
                    borderRadius: '8px',
                    borderColor: '#4965CA',
                    border: '2px solid #E8E8E8',
                    boxShadow: '0px 0px 4px 0px rgba(57, 97, 251, 0.30)',
                  }),
                }}
              />
            )}
          />
          {errors.specializationschema && (
            <Text color="red.500" mb={2} fontSize={16}>
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
          isDisabled={!isValid}
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

export default SpecialtyForm;
