import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import joi from 'joi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditCenter = () => {
  const schema = joi.object({
    therapyCenterName: joi
      .string()
      .min(3)
      .max(30)
      .required()
      .label('therapyCenterName'),
    completeAddress: joi.string().required(),
    Email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required(),
    managerName: joi.string().min(3).max(30).required().label('managerName'),
    specialtyInformation: joi.string().required().label('SpecialtyInformation'),
    specializationschema: joi.array().required().label('specializationschema'),
    registrationNumber: joi.number().required().label('Registration Number'),
    taxID: joi.number().required().label('Tax ID'),
    certification: joi.required().custom((value, helpers) => {
      if (value) {
        const ext = value.name.split('.').pop().toLowerCase();
        if (ext === 'pdf') {
          return value;
        } else {
          return helpers.error('Invalid file type. Please upload a PDF file.');
        }
      }
      return value;
    }),
    phoneNumber: joi.number().required().label('phoneNumber'),
    socialMedia: joi
      .string()
      .required()
      .uri({ scheme: ['http', 'https'] })
      .label('socialMedia'),
    Website: joi
      .string()
      .required()
      .uri({ scheme: ['http', 'https'] })
      .label('Website'),
    Linkedin: joi
      .string()
      .required()
      .uri({ scheme: ['http', 'https'] })
      .label('Linkedin'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
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
      const response = await axios.get(
        `http://vrapeutic-api-production.eba-7rjfenj2.eu-west-1.elasticbeanstalk.com/api/v1/specialties`
      );
      setspecialistslist(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSpecializations = (options) => {
    setValue('specializationschema', [...options]);
  };
  const specialties = specialistslist.map((speciality) => ({
    id: speciality.id,
    label: speciality.name,
    value: speciality.id,
  }));
  const [selectedFile, setSelectedFile] = useState();
  const handleCertificateChange = (event) => {
    const file = event.target.files[0];
    const ext = file.name.split('.').pop();
    if (ext === 'pdf') {
      setSelectedFile(file);
      setValue('certification', file);
      clearErrors('certification');
    } else {
      setError('certification', { message: 'Please upload a PDF file.' });
    }
  };
  const FormOnSubmit = () => {};

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <Box
      bg="#F5F5F5"
      p="5.875em 2.625em 5.875em 2.375em"
      as="form"
      onSubmit={handleSubmit(FormOnSubmit)}
    >
        <HStack>
          <ArrowBackIcon onClick={goBack}/>
          <Text> Therapy Center</Text>
        </HStack>
      <Box bg="#FFFFFF" borderRadius={10} p={24}>
        <Grid m="0 1.5em 0em 1.5em">
          <Text fontSize={20} mt={0}>
            General info
          </Text>
          <HStack mb={32}>
            <Box width={197} height={197}>
              <img src="images/brandLogo.png" alt="brand_logo" />
            </Box>
            <Button
              w={153}
              h={38}
              color="#FFF"
              border="none"
              borderRadius="8px"
              backgroundColor="#4AA6CA"
              variant="solid"
              cursor="pointer"
            >
              Change logo
            </Button>
          </HStack>

          <Grid templateColumns="repeat(2, 1fr)" gap="0em 1.5625em">
            <GridItem>
              <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                therapyCenter Name
              </FormLabel>

              <Input
                {...register('therapyCenterName')}
                id="therapyCenterName"
                _hover={{ border: '1px solid #4965CA' }}
                _focus={{ border: '1px solid #4965CA' }}
                border="1px solid #E8E8E8"
                type="text"
                mt="0.75em"
                mb="1em"
                borderRadius="8px"
                width={'100%'}
                height={'38px'}
              />
              {errors.therapyCenterName && (
                <Text color="red.500">{errors.therapyCenterName.message}</Text>
              )}
            </GridItem>
            <GridItem>
              <FormLabel>Email</FormLabel>

              <Input
                {...register('Email')}
                id="Email"
                _hover={{ border: '1px solid #4965CA' }}
                _focus={{ border: '1px solid #4965CA' }}
                border="1px solid #E8E8E8"
                type="text"
                mt="0.75em"
                mb="1em"
                borderRadius="8px"
                width={'100%'}
                height={'38px'}
              />
              {errors.Email && (
                <Text color="red.500">{errors.Email.message}</Text>
              )}
            </GridItem>
            <GridItem>
              <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                complete Address
              </FormLabel>

              <Input
                {...register('completeAddress')}
                id="completeAddress"
                _hover={{ border: '1px solid #4965CA' }}
                _focus={{ border: '1px solid #4965CA' }}
                border="1px solid #E8E8E8"
                type="text"
                mt="0.75em"
                mb="1em"
                borderRadius="8px"
                width={'100%'}
                height={'38px'}
              />
              {errors.completeAddress && (
                <Text color="red.500">{errors.completeAddress.message}</Text>
              )}
            </GridItem>

            <GridItem>
              <FormLabel color="#15134B">manager Name</FormLabel>

              <Input
                {...register('managerName')}
                id="managerName"
                _hover={{ border: '1px solid #4965CA' }}
                _focus={{ border: '1px solid #4965CA' }}
                border="1px solid #E8E8E8"
                type="text"
                mt="0.75em"
                mb="1em"
                borderRadius="8px"
                width={'100%'}
                height={'38px'}
              />
              {errors.managerName && (
                <Text color="red.500">{errors.managerName.message}</Text>
              )}
            </GridItem>
          </Grid>
          <Grid>
            <GridItem>
              <FormLabel color="#15134B">bio</FormLabel>
              <Input
                {...register('bio')}
                id="bio"
                _hover={{ border: '1px solid #4965CA' }}
                _focus={{ border: '1px solid #4965CA' }}
                border="1px solid #E8E8E8"
                type="text"
                mt="0.75em"
                mb="1em"
                borderRadius="8px"
                width={'100%'}
                height={'78px'}
                multiple
              />
              {errors.bio && <Text color="red.500">{errors.bio.message}</Text>}
            </GridItem>
          </Grid>
          <Grid>
            <GridItem>
              <FormLabel color="#15134B">description</FormLabel>
              <Input
                {...register('description')}
                id="description"
                _hover={{ border: '1px solid #4965CA' }}
                _focus={{ border: '1px solid #4965CA' }}
                border="1px solid #E8E8E8"
                type="text"
                mt="0.75em"
                mb="1em"
                borderRadius="8px"
                width={'100%'}
                height={'78px'}
                multiple
              />
              {errors.description && (
                <Text color="red.500">{errors.description.message}</Text>
              )}
            </GridItem>
          </Grid>
          <Text fontSize={20} mt={0}>
            Specialty
          </Text>

          <Grid>
            <GridItem>
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
                {...register('description')}
                id="description"
                _hover={{ border: '1px solid #4965CA' }}
                _focus={{ border: '1px solid #4965CA' }}
                border="1px solid #E8E8E8"
                type="text"
                mt="0.75em"
                mb="1em"
                borderRadius="8px"
                width={'100%'}
                height={'78px'}
                multiple
              />
              {errors.description && (
                <Text color="red.500">{errors.description.message}</Text>
              )}
            </GridItem>
          </Grid>
          <Grid templateColumns="repeat(2, 1fr)">
            <GridItem>
              <FormLabel
                display="inline"
                m="0em"
                letterSpacing="0.256px"
                color="#15134B"
              >
                Choose specializations
              </FormLabel>
              <FormLabel
                pl="0.5em"
                display="inline"
                m="0em"
                fontSize="0.75em"
                letterSpacing="0.192px"
                color="#8D8D8D"
              >
                (like tags, for example, ADHD, Autism, etc.)
              </FormLabel>
              <Select
                {...register('specializationschema')}
                options={specialties}
                id="specializationschema"
                onChange={handleSpecializations}
                size="lg"
              />
              {errors.specializationschema && (
                <Text color="red.500">
                  {errors.specializationschema.message}
                </Text>
              )}
            </GridItem>
          </Grid>
          <Text fontSize={20} m={'32 0'}>
            Official documents
          </Text>

          <Grid templateColumns="repeat(2, 1fr)" gap="0em 1.5625em">
            <GridItem>
              <FormLabel color="#15134B">Registration Number</FormLabel>

              <Input
                {...register('registrationNumber')}
                id="registrationNumber"
                _hover={{ border: '1px solid #4965CA' }}
                _focus={{ border: '1px solid #4965CA' }}
                border="1px solid #E8E8E8"
                type="text"
                mt="0.75em"
                mb="1em"
                borderRadius="8px"
                width={'100%'}
                height={'38px'}
              />
              {errors.registrationNumber && (
                <Text color="red.500">{errors.registrationNumber.message}</Text>
              )}
            </GridItem>
            <GridItem>
              <FormLabel color="#15134B">Tax ID</FormLabel>
              <Input
                {...register('taxID')}
                id="taxID"
                _hover={{ border: '1px solid #4965CA' }}
                _focus={{ border: '1px solid #4965CA' }}
                border="1px solid #E8E8E8"
                type="text"
                mt="0.75em"
                mb="1em"
                borderRadius="8px"
                width={'100%'}
                height={'38px'}
              />
              {errors.Email && (
                <Text color="red.500">{errors.Email.message}</Text>
              )}
            </GridItem>
          </Grid>
          <Grid>
            <GridItem rowSpan={2}>
              <>
                <FormControl>
                  <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                    certification
                  </FormLabel>
                  <Button
                    h="128px"
                    w="174px"
                    border="2px solid #E8E8E8"
                    borderRadius="8px"
                    bg="#FFFFFF"
                  >
                    <label>
                      <ArrowBackIcon />
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
                  <Text color="red.500">{errors.certification.message}</Text>
                )}
              </>
            </GridItem>
          </Grid>
          <Text fontSize={20} m={'32 0'}>
            Contact
          </Text>
          <Grid templateColumns="repeat(2, 1fr)" gap="0em 1.5625em">
            <GridItem>
              <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                Phone number 1
              </FormLabel>
              <Input
                {...register('phoneNumber')}
                id="phoneNumber"
                _hover={{ border: '1px solid #4965CA' }}
                _focus={{ border: '1px solid #4965CA' }}
                border="1px solid #E8E8E8"
                type="text"
                mt="0.75em"
                mb="1em"
                borderRadius="8px"
                width={'100%'}
                height={'38px'}
              />
              {errors.phoneNumber && (
                <Text color="red.500">{errors.phoneNumber.message}</Text>
              )}
            </GridItem>
            <GridItem>
              <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                Social media
              </FormLabel>
              <Input
                {...register('socialMedia')}
                id="socialMedia"
                _hover={{ border: '1px solid #4965CA' }}
                _focus={{ border: '1px solid #4965CA' }}
                border="1px solid #E8E8E8"
                type="text"
                mt="0.75em"
                mb="1em"
                borderRadius="8px"
                width={'100%'}
                height={'38px'}
              />
              {errors.socialMedia && (
                <Text color="red.500">{errors.socialMedia.message}</Text>
              )}{' '}
            </GridItem>
            <GridItem>
              <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                Website
              </FormLabel>
              <Input
                {...register('Website')}
                id="Website"
                _hover={{ border: '1px solid #4965CA' }}
                _focus={{ border: '1px solid #4965CA' }}
                border="1px solid #E8E8E8"
                type="text"
                mt="0.75em"
                mb="1em"
                borderRadius="8px"
                width={'100%'}
                height={'38px'}
              />
              {errors.Website && (
                <Text color="red.500">{errors.Website.message}</Text>
              )}{' '}
            </GridItem>
            <GridItem>
              <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                Linkedin
              </FormLabel>
              <Input
                {...register('Linkedin')}
                id="Linkedin"
                _hover={{ border: '1px solid #4965CA' }}
                _focus={{ border: '1px solid #4965CA' }}
                border="1px solid #E8E8E8"
                type="text"
                mt="0.75em"
                mb="1em"
                borderRadius="8px"
                width={'100%'}
                height={'38px'}
              />
              {errors.Linkedin && (
                <Text color="red.500">{errors.Linkedin.message}</Text>
              )}{' '}
            </GridItem>
          </Grid>
          <Stack direction="row" spacing={4} align="center">
            <Button
              w={273}
              h={38}
              color="#FFF"
              border="none"
              borderRadius="8px"
              backgroundColor="#00DEA3"
              variant="solid"
              cursor="pointer"
              marginInlineEnd={20}
            >
              Save change
            </Button>
            <Button
              w={126}
              h={38}
              border="1px solid #DD6969"
              borderRadius="8px"
              backgroundColor="#FFF"
              cursor="pointer"
              color="#DD6969"
              variant="outline"
            >
              Discard
            </Button>
          </Stack>
        </Grid>
      </Box>
    </Box>
  );
};

export default EditCenter;
