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
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
// import { TherapyFormProps } from '../AddCenterForm/therapyFormInterface';
import { config } from '@renderer/config';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import { TherapyFormProps } from '@renderer/features/AddCenterForm/therapyFormInterface';
import { useAdminContext } from '@renderer/Context/AdminContext';
import { getMe } from '@renderer/cache';
import Congratulations from './SignUp/Congratulations';

const GeneralInfoFormKidsEdit: React.FC<TherapyFormProps> = ({
  onSubmit,
  // nextHandler,
  backHandler,
  sliding,
  formData,
  datachild,
}) => {
  const animatedComponents = makeAnimated();
  const [diagnoses, setDiagnoses] = useState([]);
  const [age, setAge] = useState('');
  const [logo, setLogo] = useState<File>();
  const [selectedDiagnoses, setSelectedDiagnoses] = useState([]);
  const { otp } = useAdminContext();
  const [imagePreview, setImagePreview] = useState(
    datachild?.attributes?.photo_url
  );
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const schema = joi.object({
    Name: joi.string().min(3).max(30).required().label('Name'),
    Age: joi.required(),
    diagnoses: joi.array().min(1).required().label('diagnoses'),
    logo: joi
    .any()
    .label('logo')
    .custom((value, helpers) => {
      if (value && value.name) {
        return helpers.error('Invalid file type. Please upload a  photo.');
      }
      return value;
    }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    setError,

  control, trigger} = useForm({
    resolver: joiResolver(schema),
    mode: 'onTouched',
  });
  const handleChange = (e: any) => {
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

  const FormonSubmit = (data: {
    name: string;
    age: number;
    diagnoses: any[];
  }) => {
    onSubmit(data);
    SendDataToApi(data);

  };
  useEffect(() => {
    getAllDiagnoses();
  }, []);
  const getAllDiagnoses = async () => {
    try {
      const response = await axios.get(`${config.apiURL}/api/v1/diagnoses`);
      await setDiagnoses(response.data);
      const filterAndMapData = async () => {
        // Perform filtering using datachild
        const x: any[] = datachild.relationships.diagnoses.data;

        const filteredArray = response.data.filter((item: any) => {
          // Convert item.id to a string for comparison with array1's IDs
          return x.some((elem) => elem.id === String(item.id));
        });

        console.log('Filtered array:', filteredArray);

        const m = filteredArray.map((y: any) => ({
          id: y.id,
          label: y.name,
          value: y.id,
        }));

        console.log('Mapped array:', m);

        // Set values or update state using filtered and mapped data
        if (datachild) {
          setValue('Name', datachild.attributes.name);
          setValue('Age', datachild.attributes.age);
          setValue('diagnoses', m);
          setSelectedDiagnoses(m);
          setAge(datachild.attributes.age);
        }
      };

      // Call filterAndMapData if datachild exists to trigger the operations when datachild changes
      if (datachild) {
        filterAndMapData();
      }
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
    console.log(options);
    setValue('diagnoses', [...options]);
    setSelectedDiagnoses([...options]);
    trigger('diagnoses');
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setLogo(file);

    if (!logo) {
      setValue('logo', null);
      setError('logo', { message: 'Please upload a logo.' });
    }
  };
  const SendDataToApi = async (data:any) => {
    const formData = createFormEdit(data)
    try {
      await postFormData(formData);
      handleSuccess();
    } catch (error) {
      handleError(error);
    } finally {
      console.log("mm")
    }
  };



  const createFormEdit = (data:any) => {
    const childFormData = new FormData();
    childFormData.append('child[name]', data.Name);
    childFormData.append('child[age]', data.Age);

    {
      logo && childFormData.append('child[photo]', logo);
    }

    // Append diagnosis IDs for the child form
    data.diagnoses.forEach((diagnose: { id: string | Blob }) =>
      childFormData.append('child[diagnosis_ids][]', diagnose.id)
    );
    return childFormData;
  };

  const postFormData = (formData: FormData) => {
    const token = getMe()?.token;
    const headers = {
      ...(datachild
        ? { otp: otp }
        : { Authorization: `Bearer ${token}` }),
    };

   
    axios.put(
            `${config.apiURL}/api/v1/admins/edit_child/?child_id=${datachild.id}`,
            formData,
            { headers }
          )
        

  };

  const handleSuccess = () => {
    onOpen();
  };
  
  const handleError = (error: any) => {
    onClose();
    toast({
      title: 'Error',
      description: error.response.data.error,
      status: 'error',
      duration: 5000,
      position: 'top-right',
    });
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
          <Controller
              name="diagnoses"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={diagnosesList}
                  id="diagnoses"
                  name="diagnoses"
                  onChange={handleSpecializations}
                  styles={customStyles}
                  value={selectedDiagnoses}
                 
                />
              )}
            />
            {/* <Select
              {...register('diagnoses')}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={diagnosesList}
              id="diagnoses"
              name="diagnoses"
              onChange={handleSpecializations}
              styles={customStyles}
              value={selectedDiagnoses}
            /> */}
          </Box>

          {errors.diagnoses && (
            <Text color="red.500">{errors.diagnoses.message as string}</Text>
          )}
        </GridItem>

        <GridItem mb="5">
          <>
            <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
              upload photo
            </FormLabel>
            <Button
              h="128px"
              w="174px"
              border="2px solid #E8E8E8"
              borderRadius="8px"
              bg="#FFFFFF"
              position={'relative'}
            >
              <label>
                <img
                  src={imagePreview}
                  alt="brand_logo"
                  style={{ height: '124px', objectFit: 'cover' }}
                />

                <Input
                  type="file"
                  accept="image/png,image/jpeg"
                  name="logo"
                  id="logo"
                  {...register('logo')}
                  onChange={(e) => handleImageChange(e)}
                  style={{ display: 'none' }}
                  hidden
                />
              </label>
            </Button>

            {errors.logo && (
              <Text color="red.500">{errors.logo.message as string}</Text>
            )}
          </>
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
          Submit
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
        <Congratulations
        isOpen={isOpen}
        onClose={onClose}
      />
      )}
    </Box>
  );
};
export default GeneralInfoFormKidsEdit;
