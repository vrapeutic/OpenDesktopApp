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
} from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import joi from 'joi';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Image } from '../../assets/icons/Image';
import UploadDoctorImg from './UploadDoctorImg';
import { TherapyFormProps } from '@renderer/features/AddCenterForm/therapyFormInterface';
import { config } from '../../config';

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
  const url = datachild?.attributes?.certificate_url;

  const schema = joi.object({
    name: joi.string().min(3).max(30).required().label('Name'),
    degree: joi.string().required().label('Degree'),
    university: joi.string().required().label('University'),
    specialities: joi.array().required().label('specialities'),
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
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    setError,
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

  const handleSpecializations = (options: any) => {
    setValue('specialities', options);
    setSelectedSpecialities(options);
    setSpecialistIds(options.map((opt: any) => opt.id));
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
    console.log(updatedFormData);
    onOpen();
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
            <Select
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
            />
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
        <UploadDoctorImg
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={onSubmit}
          formData={formData}
          datachild={datachild.attributes.photo_url}
          id={datachild.id}
          email={datachild.attributes.email}
        />
      )}
    </Box>
  );
};

export default GeneralInfoDoctorEdit;
