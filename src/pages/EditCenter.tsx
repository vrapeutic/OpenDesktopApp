import { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import Select from 'react-select';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import joi from 'joi';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import makeAnimated from 'react-select/animated';
import { Image } from '../assets/icons/Image';
import { serialize } from 'object-to-formdata';
import { getMe } from '../cache';
import { config } from '../config';

const EditCenter = () => {
  const location = useLocation();
  const centerData = location.state;
  const socialMediaIndex = centerData?.attributes.center_social_links.find(
    (link) => link.link_type === 'facebook'
  );
  const linkedIndex = centerData?.attributes.center_social_links.find(
    (link) => link.link_type === 'twitter'
  );
  const schema = joi.object({
    name: joi.string().min(3).max(30).required().label('name'),
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required(),
    specialty_ids: joi.array().required().label('specialty_ids'),
    tax_id: joi.number().required().label('tax_id'),
    certificate: joi.custom((value, helpers) => {
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
    phone_number: joi.number().required().label('phone_number'),
    website: joi.string().required().label('website'),
    socialMedia: joi.string().required().label('socialMedia'),
    Linkedin: joi.string().required().label('Linkedin'),
    completeAddress: joi.string().allow(''),
    managerName: joi.string().allow('').max(30).label('managerName'),
    specialtyInformation: joi.string().allow(''),
    registrationNumber: joi.number().allow(null).label('Registration Number'),
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
    mode: 'onChange',
    defaultValues: {
      name: centerData?.attributes?.name ?? '',
      email: centerData?.attributes?.email ?? '',
      phone_number: centerData?.attributes?.phone_number ?? null,
      website: centerData?.attributes?.website ?? '',
      specialty_ids: centerData?.attributes?.specialty_ids ?? [],
      tax_id: centerData?.attributes?.tax_id ?? null,
      certificate: centerData?.attributes?.certificate ?? null,
      Linkedin:
        centerData?.attributes.center_social_links[linkedIndex ?? 1].link ?? '',
      socialMedia:
        centerData?.attributes.center_social_links[socialMediaIndex ?? 0]
          .link ?? '',
      completeAddress: '',
      managerName: '',
      specialtyInformation: '',
      registrationNumber: null,
    },
  });
  const [specialistsList, setSpecialistsList] = useState([]);
  const [specialistIds, setspecialistIds] = useState([]);
  const animatedComponents = makeAnimated();
  const [selectedFile, setSelectedFile] = useState<File>();

  useEffect(() => {
    if (specialistIds) {
      setValue('specialty_ids', specialistIds);
    }
  }, [specialistIds]);
  useEffect(() => {
    if (centerData) {
      setspecialistIds(
        centerData?.attributes?.specialties.map(
          (specialty: { id: number | string; name: string }) => ({
            id: specialty.id,
            label: specialty.name,
            value: specialty.id,
          })
        )
      );
    }
    getSpecialists();
  }, []);
  const getSpecialists = async () => {
    try {
      const response = await axios.get(
        `http://vrapeutic-api-production.eba-7rjfenj2.eu-west-1.elasticbeanstalk.com/api/v1/specialties`
      );
      setSpecialistsList(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const [imagePreview, setImagePreview] = useState(
    centerData?.attributes?.logo?.url
  );
  const [logo, setLogo] = useState<File>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    setLogo(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };
  const handleSpecializations = (options: any) => {
    setspecialistIds([...options]);
    setValue('specialty_ids', [...options]);
  };
  const specialties = specialistsList.map((speciality) => ({
    id: speciality.id,
    label: speciality.name,
    value: speciality.id,
  }));
  const handleCertificateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const ext = file.name.split('.').pop();
    if (ext === 'pdf') {
      setSelectedFile(file);
      setValue('certificate', file);
      clearErrors('certificate');
    } else {
      setValue('certificate', null);
      setSelectedFile(null);
      setError('certificate', { message: 'Please upload a PDF file.' });
    }
  };

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  const EditFormData = (formData: FormData) => {
    const token = getMe().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axios.put(
      `${config.apiURL}/api/v1/centers/${centerData.id}`,
      formData,
      { headers }
    );
  };
  const FormOnSubmit = async (data: any) => {
    const formData = serialize(
      {
        ...data,
        certificate: data.certificate ?? undefined,
        completeAddress: data.completeAddress
          ? data.completeAddress
          : undefined,
        managerName: data.managerName ? data.managerName : undefined,
        specialtyInformation: data.specialtyInformation
          ? data.specialtyInformation
          : undefined,
        registrationNumber: data.registrationNumber
          ? data.registrationNumber
          : undefined,
        logo,
        Linkedin: undefined,
        socialMedia: undefined,
        specialty_ids: [],
        social_links: JSON.stringify([
          { link: data.socialMedia, link_type: 'facebook' },
          { link: data.Linkedin, link_type: 'twitter' },
        ]),
        latitude: centerData.attributes.latitude,
        longitude: centerData.attributes.longitude,
      },
      { indices: true }
    );
    specialistIds.forEach((specialty: { id: string | Blob }) =>
      formData.append('specialty_ids[]', specialty.id)
    );
    console.log(formData);

    try {
      await EditFormData(formData);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(errors);
  return (
    <Box bg="#F5F5F5" p="24px" as="form" onSubmit={handleSubmit(FormOnSubmit)}>
      <HStack onClick={goBack} style={{ cursor: 'pointer' }}>
        <ArrowBackIcon />
        <Text> Therapy Center</Text>
      </HStack>
      <Box bg="#FFFFFF" borderRadius={10} p={'24px'}>
        <Grid>
          <Text fontSize={20} mt={0}>
            General info
          </Text>
          <HStack mb={'32px'}>
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
          </HStack>

          <Grid templateColumns="repeat(2, 1fr)" gap="0em 1.5625em">
            <GridItem>
              <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                therapyCenter Name
              </FormLabel>

              <Input
                {...register('name')}
                id="name"
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
              {errors.name && (
                <Text color="red.500">{errors.name.message as string}</Text>
              )}
            </GridItem>
            <GridItem>
              <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                Email
              </FormLabel>

              <Input
                {...register('email')}
                id="email"
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
              {errors.email && (
                <Text color="red.500">{errors.email.message as string}</Text>
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
            </GridItem>

            <GridItem>
              <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                manager Name
              </FormLabel>

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
                {...register('specialtyInformation')}
                id="SpecialtyInformation"
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
                {...register('specialty_ids')}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                value={specialistIds}
                options={specialties}
                id="specialty_ids"
                name="specialty_ids"
                onChange={handleSpecializations}
              />
              {errors.specialty_ids && (
                <Text color="red.500">
                  {errors.specialty_ids.message as string}
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
                id="registration_number"
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
            </GridItem>
            <GridItem>
              <FormLabel color="#15134B">Tax ID</FormLabel>
              <Input
                {...register('tax_id')}
                id="tax_id"
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
              {errors.tax_id && (
                <Text color="red.500">{errors.tax_id.message as string}</Text>
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
                      <Image />
                      <Input
                        {...register('certificate')}
                        id="certificate"
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
                {errors.certificate && (
                  <Text color="red.500">
                    {errors.certificate.message as string}
                  </Text>
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
                {...register('phone_number')}
                id="phone_number"
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
              {errors.phone_number && (
                <Text color="red.500">
                  {errors.phone_number.message as string}
                </Text>
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
                <Text color="red.500">
                  {errors.socialMedia.message as string}
                </Text>
              )}{' '}
            </GridItem>
            <GridItem>
              <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                Website
              </FormLabel>
              <Input
                {...register('website')}
                id="website"
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
              {errors.website && (
                <Text color="red.500">{errors.website.message as string}</Text>
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
                <Text color="red.500">{errors.Linkedin.message as string}</Text>
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
              type="submit"
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
              onClick={goBack}
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
