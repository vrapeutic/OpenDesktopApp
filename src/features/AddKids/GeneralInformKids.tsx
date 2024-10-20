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
  FormControl,
  Spinner,
} from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { TherapyFormProps } from '../AddCenterForm/therapyFormInterface';
import { config } from '@renderer/config';
import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import UploadKidImg from './UploadKidImg';
import { Image } from '../../assets/icons/Image';
import Congratulations from './Congratulations';
import { getMe } from '@renderer/cache';
import { dataContext } from '@renderer/shared/Provider';

const GeneralInfoFormKids: React.FC<TherapyFormProps> = ({
  onSubmit,
  backHandler,
  sliding,
  formData,
}) => {
  const animatedComponents = makeAnimated();
  const [diagnoses, setDiagnoses] = useState([]);
  const [age, setAge] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [logo, setLogo] = useState<File>();
  const [imagePreviewError, setImagePreviewError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectedCenter = useContext(dataContext);
  const toast = useToast();

  const handleChange = (e: any) => {
    let value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (value.length > 2) {
        value = value.slice(0, 2);
      }
      setAge(value);
    }
  };



  const schema = joi.object({
    Name: joi.string().min(3).max(30).required().label('Name'),
    Email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required(),
    Age: joi.number().min(6).max(15).required(),
    diagnoses: joi.array().min(1).required().label('diagnoses'),
    file:joi.any().required().label('file'),
  });
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImagePreviewError(false);
      setValue('file', file);
                    trigger('file'); // Trigger validation for the 'diagnoses' field
    }
  };
  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: formData,
  });

  const FormonSubmit = (data: {
    Name: string;
    Email: string;
    Age: number;
    diagnoses: any[];
  }) => {
    if (!logo) {
      setImagePreviewError(true);
      return;
    }
    onSubmit(data);
    SendDataToApi(data);
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
    setValue('diagnoses', options);
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: '2px solid #E8E8E8',
      borderRadius: '8px',
      boxShadow: '0px 0px 4px 0px rgba(57, 97, 251, 0.30)',
      '&:hover': {
        border: '1px solid #4965CA',
      },
    }),
  };

  const createFormData = (data: any) => {
    const formData = new FormData();
    formData.append('name', data.Name);
    formData.append('email', data.Email);
    formData.append('age', data.Age.toString());
    formData.append('photo', logo as File);
    data.diagnoses.forEach((diagnose: { id: string | Blob }) =>
      formData.append('diagnosis_ids[]', diagnose.id)
    );
    return formData;
  };

  const postFormData = (formData: FormData) => {
    const token = getMe()?.token;
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(
      `${config.apiURL}/api/v1/centers/${selectedCenter.id}/add_child`,
      formData,
      { headers }
    );
  };

  const SendDataToApi = async (data: any) => {
    const formData = createFormData(data);
    setIsLoading(true);

    try {
      await postFormData(formData);
      handleSuccess();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = () => {
    onOpen();
  };

  const handleError = (error: any) => {
    onClose();
    console.log('error', error);
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
                  styles={customStyles}
                  onChange={(selectedOptions) => {
                    field.onChange(selectedOptions);
                    setValue('diagnoses', selectedOptions);
                    trigger('diagnoses'); // Trigger validation for the 'diagnoses' field
                  }}
                />
              )}
            />
          </Box>
          {errors.diagnoses && (
            <Text color="red.500">{errors.diagnoses.message as string}</Text>
          )}
        </GridItem>

        {/* <GridItem>
          <FormControl>
            <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
              Upload Image
            </FormLabel>
            <Button
              h="128px"
              w="174px"
              border="2px solid #E8E8E8"
              borderRadius="8px"
              bg="#FFFFFF"
              mt={'0.75em'}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" />
              ) : (
                <>
                  <label>
                    <Image />
                    <Controller
              name="file"
              control={control}
              render={({ field }) => (
                
                <Input
                {...field}
                type="file"
                accept="image/png,image/jpeg"
             
                onChange={handleImageChange}
                style={{ display: 'none' }}
                hidden
                id="file"
                
              />
              )}
            />
                   
                  </label>
                </>
              )}
            </Button>
            {errors.file && (
            <Text color="red.500">{errors.file.message as string}</Text>
          )}
            {imagePreviewError && (
              <Text color="red.500">"Image" is required</Text>
            )}
          </FormControl>
        </GridItem> */}
        <GridItem mb="5">
          <FormLabel
            display="inline"
            m="0em"
            letterSpacing="0.256px"
            color="#15134B"
          >
            Upload a photo
          </FormLabel>
          <FormControl id="file" isInvalid={!!errors.file}>
            <Input
              type="file"
              border="none"
              accept="image/*"
              onChange={handleImageChange}
              display="none"
              id="file-upload"
            />
            <Box
              border="2px dashed #4965CA"
              cursor="pointer"
              borderRadius="8px"
              _hover={{
                bg: 'rgba(57, 97, 251, 0.1)',
              }}
              width={"70%"}
              p="1em"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    width: '100%',
                    height: 150,
                    borderRadius: '8px',
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <Flex align="center" justify="center">
                  <Image />
                  <Text ml="2">Drag & Drop here or click to upload</Text>
                </Flex>
              )}
            </Box>
            {errors.file && (
              <Text color="red.500">{errors.file.message as string}</Text>
            )}
            {imagePreviewError && (
              <Text color="red.500">Please upload an image.</Text>
            )}
          </FormControl>
        </GridItem>
      </Grid>

      <Flex flexDirection="row-reverse" my={15}>
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
          isDisabled={isLoading || !isValid}
        >
          {isLoading ? <Spinner size="md" /> : 'Submit'}
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
      
      {onOpen && <Congratulations isOpen={isOpen} onClose={onClose}   backHandler={backHandler}/>}
    </Box>
  );
};

export default GeneralInfoFormKids;
