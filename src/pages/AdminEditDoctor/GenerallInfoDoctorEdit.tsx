import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import joi from 'joi';
import { ChangeEvent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Image } from '../../assets/icons/Image';
import { TherapyFormProps } from '@renderer/features/AddCenterForm/therapyFormInterface';
import { config } from '../../config';
import { useAdminContext } from '@renderer/Context/AdminContext';
import CongratulationEdit from './CongratulationEdit';

const GeneralInfoDoctorEdit: React.FC<TherapyFormProps> = ({
  onSubmit,
  backHandler,
  sliding,
  formData,
  datachild,
}) => {
  const animatedComponents = makeAnimated();
  const [selectedSpecialities, setSelectedSpecialities] = useState([]);
  const [specialistsList, setSpecialistsList] = useState([]);
  const [specialistIds, setSpecialistIds] = useState([]);
  const [degree, setDegree] = useState('');
  const [university, setUniversity] = useState('');
  const [selectedFile, setSelectedFile] = useState<File>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const url = datachild?.attributes?.certificate_url;
  const [imagePreview, setImagePreview] = useState(
    datachild?.attributes?.photo_url
  );
  const [logo, setLogo] = useState<File>();
  const schema = joi.object({
    name: joi.string().min(3).max(30).required().label('Name'),
    degree: joi.string().required().label('Degree'),
    university: joi.string().required().label('University'),
    specialities: joi.array().min(1).required().label('specialities'),
    certification: joi
      .any()
      .label('Certification')
      .custom((value, helpers) => {
        if (value && value.name) {
          const ext = value.name.split('.').pop().toLowerCase();
          if (ext !== 'pdf') {
            return helpers.error(
              'Invalid file type. Please upload a PDF file.'
            );
          }
        }
        return value;
      }),
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
    clearErrors,
    setError,
    control,
    trigger,
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onTouched',
  });

  useEffect(() => {
    getSpecialists();
  }, []);

  useEffect(() => {
    if (datachild) {
      setValue('name', datachild.attributes.name);
      setValue('degree', datachild.attributes.degree);
      setValue('university', datachild.attributes.university);
      if (url) {
        setValue('certification', url);
      }

      const x: any[] = datachild.relationships.specialties.data;
      const filteredArray = specialistsList.filter((item: any) => {
        return x.some((elem) => elem.id === String(item.id));
      });
      console.log(filteredArray);
      const mappedSpecialties = filteredArray.map((y: any) => ({
        id: y.id,
        label: y.name,
        value: y.id,
      }));

      setValue('specialities', mappedSpecialties);
      setSelectedSpecialities(mappedSpecialties);
      setDegree(datachild.attributes.degree);
      setUniversity(datachild.attributes.university);
    }
  }, [datachild, url, specialistsList]);

  const getSpecialists = async () => {
    try {
      const response = await axios.get(`${config.apiURL}/api/v1/specialties`);
      setSpecialistsList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const specialitiesOptions = specialistsList.map((speciality) => ({
    id: speciality.id,
    label: speciality.name,
    value: speciality.id,
  }));
  console.log(specialitiesOptions);

  const handleSpecializations = (options: any) => {
    setValue('specialities', options);

    setSelectedSpecialities(options);
    setSpecialistIds(options.map((opt: any) => opt.id));
    trigger('specialities');
  };

  const FormonSubmit = (data: {
    name: string;
    degree: string;
    university: string;
    specialities: any[];
    certification: any;
  }) => {
    const updatedFormData = { ...data, certification: selectedFile || url };
    onSubmit(updatedFormData);
    SendDataToApi(updatedFormData);
  };

  const handleCertificateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file) {
      const ext = file.name.split('.').pop();
      if (ext === 'pdf') {
        setSelectedFile(file);
        setValue('certification', file);
        clearErrors('certification');
      } else {
        setSelectedFile(null);
        setValue('certification', null);
        setError('certification', { message: 'Please upload a PDF file.' });
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setLogo(file);
    trigger('logo')
    if (!file) {
      setValue('logo', null);
      setError('logo', { message: 'Please upload a logo.' });
    }
  };

  const { otp } = useAdminContext();
  const postFormData = async (formData: FormData) => {
    try {
      const headers = { otp: otp };
      const response = await axios.put(
        `${config.apiURL}/api/v1/admins/edit_doctor?doctor_id=${datachild.id}`,
        formData,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error(
        'Error in postFormData:',
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const handleError = (error: any) => {
    onClose();
    const errorMessage = error.response?.data?.error || 'Unknown Error';
    toast({
      title: 'Error',
      description: errorMessage,
      status: 'error',
      duration: 5000,
      position: 'top-right',
    });
    console.error('API Error:', error);
  };
  const SendDataToApi = async (data: any) => {
    console.log('data in SendDataToApi:', data);
    const formData = createFormEdit(data);
    try {
      await postFormData(data);
      handleSuccess();
      console.log(formData);
    } catch (error) {
      handleError(error);
    }
  };

  const handleSuccess = () => {
    onOpen();
  };
  const createFormEdit = (data: any) => {
    const doctorFormData = new FormData();
  
    doctorFormData.append('name', data.name);
    doctorFormData.append('degree', data.degree);
    doctorFormData.append('university', data.university);
  
    // Append certification (if available)
    if (data.certification) {
      doctorFormData.append('certification', data.certification);
    }
  
    // Append logo (if available)
    if (logo) {
      doctorFormData.append('photo', logo);
    }
  
    // Append specialty IDs (only the 'id' from each speciality)
    if (data.specialities && data.specialities.length > 0) {
      data.specialities.forEach((speciality: { id: string }) => {
        console.log('Appending specialty id:', speciality.id);
        doctorFormData.append('specialty_ids[]', speciality.id); // Append only the ID
      });
    } else {
      console.error('No specialties provided');
    }
  
    return doctorFormData;
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
            {...register('name')}
            id="name"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb=".3em"
            borderRadius="8px"
          />
          {errors.name && (
            <Text color="red.500">{errors.name.message as string}</Text>
          )}
        </GridItem>
        <GridItem mb="5">
          <FormLabel
            display="inline"
            m="0em"
            letterSpacing="0.256px"
            color="#15134B"
          >
            Degree
          </FormLabel>

          <Input
            {...register('degree')}
            id="degree"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb=".3em"
            borderRadius="8px"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />

          {errors.degree && (
            <Text color="red.500">{errors.degree.message as string}</Text>
          )}
        </GridItem>
        <GridItem mb="5">
          <FormLabel
            display="inline"
            m="0em"
            letterSpacing="0.256px"
            color="#15134B"
          >
            Specialities
          </FormLabel>
          <Box mt="0.75em" mb=".3em">
            {/* 
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
              )}/> */}
            <Controller
              name="specialities"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={specialitiesOptions}
                  styles={customStyles}
                  value={selectedSpecialities}
                  onChange={handleSpecializations}
                />
              )}
            />
            {/* <Select
              {...register('specialities')}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={specialitiesOptions}
              id="specialities"
              name="specialities"
              onChange={handleSpecializations}
              styles={customStyles}
              value={selectedSpecialities}
            /> */}
          </Box>

          {errors.specialities && (
            <Text color="red.500">{errors.specialities.message as string}</Text>
          )}
        </GridItem>
        <GridItem mb="5">
          <FormLabel
            display="inline"
            m="0em"
            letterSpacing="0.256px"
            color="#15134B"
          >
            University
          </FormLabel>

          <Input
            {...register('university')}
            id="university"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb=".3em"
            borderRadius="8px"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
          />

          {errors.university && (
            <Text color="red.500">{errors.university.message as string}</Text>
          )}
        </GridItem>
        <GridItem rowSpan={2} mb="5">
          <>
            <FormControl>
              <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                Certification
              </FormLabel>
              <Button
                h="128px"
                w="174px"
                border="2px solid #E8E8E8"
                borderRadius="8px"
                bg="#FFFFFF"
              >
                <label>
                  <Image />
                  <Input
                    {...register('certification')}
                    id="certification"
                    type="file"
                    accept="application/pdf" // Update this line to accept PDF files
                    onChange={(e) => handleCertificateChange(e)}
                    style={{ display: 'none' }}
                  />
                </label>
              </Button>
            </FormControl>
            {selectedFile && (
              <Text mt="1em">Selected File: {selectedFile.name}</Text>
            )}
            {errors.certification && (
              <Text color="red.500">
                {errors.certification.message as string}
              </Text>
            )}
          </>
        </GridItem>
        <GridItem rowSpan={2} mb="5">
          <>
            <FormControl>
              <FormLabel m="0em" letterSpacing="0.256px" color="#15134B" cursor="pointer">
                upload photo
              </FormLabel>
              <Button
                h="128px"
                w="174px"
                border="2px solid #E8E8E8"
                borderRadius="8px"
                bg="#FFFFFF"
                position={'relative'}
                cursor="auto"
              >
                <label >
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
            </FormControl>

            {errors.logo && (
              <Text color="red.500">{errors.logo.message as string}</Text>
            )}
          </>
        </GridItem>
        {/* <HStack mb={'32px'}>
              <Box
                width={197}
                height={197}
                alignItems={'center'}
                display={'flex'}
              >
                <img src={imagePreview} alt="brand_logo" />
              </Box>

              <Button
                style={{
                  width: '153px',
                  height: '38px',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: '#4AA6CA',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                <label
                  htmlFor="logo"
                  style={{
                    width: '153px',
                    height: '38px',
                    cursor: 'pointer',
                    position: 'absolute',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  Change logo
                  <Input
                    type="file"
                    accept="image/png,image/jpeg"
                    name="logo"
                    id="logo"
                    onChange={(e) => handleImageChange(e)}
                    style={{ display: 'none' }}
                    hidden
                  />
                </label>
              </Button>
            </HStack> */}
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
      {onOpen && <CongratulationEdit isOpen={isOpen} onClose={onClose} />}
    </Box>
  );
};

export default GeneralInfoDoctorEdit;
