import { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  Stack,
  Text,
  Toast,
  useDisclosure,
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
import CongratulationWithEditCenter from '../theme/components/CongratulationWithEditCenter';

const EditCenter = () => {
  const location = useLocation();
  const { centerData, includes } = location.state;
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [specialistslist, setspecialistslist] = useState([]);
  const [specialistIds, setspecialistIds] = useState([]);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [imagePreview, setImagePreview] = useState(
    centerData?.attributes?.logo?.url
  );
  const [logo, setLogo] = useState<File>();
  const navigate = useNavigate();
  const url = centerData?.attributes?.certificate?.url;
  const fileName = url.split('/').pop().split('?')[0];
  const {
    isOpen: isOpenCongratulationsEditcenter,
    onOpen: onOpenCongratulationsEditcenter,
    onClose: onDeleteCongratulationsEditcenter,
  } = useDisclosure();

  const centerSocialLinks = includes.filter((item: any) => {
    return item.type === 'center_social_link';
  });

  const matchingLinks = centerData?.relationships?.center_social_links?.data
    ?.map((link: any) => {
      const matchingValue = centerSocialLinks.find((item: any) => {
        return String(link.id) === String(item.id);
      });

      if (matchingValue) {
        return matchingValue.attributes?.link;
      }

      return null;
    })
    .filter((link: any) => link !== null);

  const socialMediaIndex =
    centerData?.attributes?.center_social_links?.data?.find(
      (link: { link_type: string }) => link?.link_type === 'facebook'
    );

  const linkedIndex = centerData?.attributes?.center_social_links?.data?.find(
    (link: { link_type: string }) => link?.link_type === 'twitter'
  );

  const schema = joi.object({
    name: joi.string().min(3).max(30).required().label('name'),
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required(),
    specializationschema: joi
      .array()
      .min(1)
      .required()
      .label('specializationschema'),
    tax_id: joi.number().required().label('tax_id'),
    certificate: joi.allow(null).label('certificate'),
    phone_number: joi.number().required().label('phone_number'),
    website: joi.string().required().label('website'),
    socialMedia: joi.string().required().label('socialMedia'),
    Linkedin: joi.string().required().label('Linkedin'),
    completeAddress: joi.string().allow(''),
    managerName: joi.string().allow('').max(30).label('managerName'),
    specialtyInformation: joi.string().allow(''),
    registrationNumber: joi.number().allow(null).label('Registration Number'),
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
    formState: { errors },
    setValue,
    setError,
    clearErrors,
    trigger
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onChange',
  });

  const animatedComponents = makeAnimated();

  useEffect(() => {
    // Set the initial values for the form fields using centerData
    if (centerData) {
      setValue('name', centerData.attributes.name ?? '');
      setValue('email', centerData.attributes.email ?? '');
      setValue('phone_number', centerData.attributes.phone_number ?? null);
      setValue('website', centerData.attributes.website ?? '');
      setValue('tax_id', centerData.attributes.tax_id ?? null);
      setValue('completeAddress', centerData.attributes.completeAddress ?? '');
      setValue('managerName', centerData.attributes.managerName ?? '');
      setValue(
        'specialtyInformation',
        centerData.attributes.specialtyInformation ?? ''
      );
      setValue(
        'registrationNumber',
        centerData.attributes.registration_number ?? ''
      );
      setValue('socialMedia', matchingLinks[0] ?? '');
      setValue('Linkedin', matchingLinks[1] ?? '');

      // If there's a logo, set the image preview
      if (centerData.attributes.logo?.url) {
        setImagePreview(centerData.attributes.logo.url);
      }
    }
  }, [centerData, setValue, matchingLinks]);

  const getSpecialists = async () => {
    try {
      const response = await axios.get(`${config.apiURL}/api/v1/specialties`);
      const specialties = centerData?.relationships?.specialties?.data || [];
      if (specialties.length === 0) {
        console.log('No specialties found in centerData.');
      }
      setspecialistslist(response.data);
      const filteredData = response.data.filter((specialty: any) => {
        return specialties.some((item: any) => {
          return item.id === String(specialty.id);
        });
      });
      const specialtiesSelected = filteredData.map((speciality: any) => ({
        id: speciality.id,
        label: speciality.name,
        value: speciality.id,
      }));
      setValue('specializationschema', specialtiesSelected);
      setSelectedSpecialties(specialtiesSelected);
    } catch (error) {
      console.error(error);
    }
  };

  const specialtiesList = specialistslist.map((specialty: any) => ({
    id: specialty.id,
    label: specialty.name,
    value: specialty.id,
  }));
  useEffect(() => {
    getSpecialists();
  }, []);

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
  const handleSpecializations = (options: any) => {
    setValue('specializationschema', [...options]);
    setSelectedSpecialties([...options]);
  };

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

  const goBack = () => {
    navigate(-1);
  };
  const EditFormData = (formData: FormData) => {
    const token = getMe()?.token;
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
        specializationschema: [],
        social_links: JSON.stringify([
          { link: data.socialMedia, link_type: 'facebook' },
          { link: data.Linkedin, link_type: 'twitter' },
        ]),
        latitude: centerData.attributes.latitude,
        longitude: centerData.attributes.longitude,
      },
      { indices: true }
    );
    selectedSpecialties.forEach((specialty: { id: string | Blob }) =>
      formData.append('specialty_ids[]', specialty.id)
    );

    try {
      await EditFormData(formData);
      handleSuccess();
    } catch (error) {
      handleError(error);
    }
  };

  const handleSuccess = () => {
    onOpenCongratulationsEditcenter();
    console.log('handle succcess');
  };

  const handleError = (error: any) => {
    onDeleteCongratulationsEditcenter();
    Toast({
      title: 'Error',
      description: error.response.data.error,
      status: 'success',
      duration: 5000,
      position: 'top-right',
    });
  };

  const handleCloseEditCenterModal = () => {
    onDeleteCongratulationsEditcenter();
    navigate('/Therapycenters');
  };
  return (
    <>
      <Box
        bg="#F5F5F5"
        p="24px"
        as="form"
        onSubmit={handleSubmit(FormOnSubmit)}
      >
        <HStack onClick={goBack} style={{ cursor: 'pointer' }}>
          <ArrowBackIcon />
          <Text
            padding="12px"
            borderRadius="8px"
            fontFamily="Graphik LCG"
            fontSize="29px"
            fontWeight="500"
            lineHeight="29px"
            letterSpacing="-0.01em"
          >
            Therapy Center
          </Text>
        </HStack>
        <Box bg="#FFFFFF" borderRadius={10} p={'24px'}>
          <Text fontSize="xl" fontFamily={'Graphik LCG'} fontWeight={'500'}>
            General info
          </Text>

          <Grid templateColumns="repeat(2, 1fr)" gap="0em 1.5625em">
            <GridItem>
              <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                Therapy Center Name
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
                Complete Address
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
                Manager's Name
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

          <Text
            fontSize="xl"
            my={'28px'}
            fontFamily={'Graphik LCG'}
            fontWeight={'500'}
          >
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
                {...register('specializationschema')}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                id="specializationschema"
                name="specializationschema"
                onChange={handleSpecializations}
                options={specialtiesList}
                value={selectedSpecialties}
              />
              {errors.specializationschema && (
                <Text color="red.500">
                  {errors.specializationschema.message as string}
                </Text>
              )}
            </GridItem>
          </Grid>
          <Text
            fontSize="xl"
            my={'28px'}
            fontFamily={'Graphik LCG'}
            fontWeight={'500'}
          >
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
                {selectedFile ? (
                  <Text mt="1em">Selected File: {selectedFile.name}</Text>
                ) : (
                  <Text mt="1em">You uploaded before: {fileName}</Text>
                )}
                {errors.certificate && (
                  <Text color="red.500">
                    {errors.certificate.message as string}
                  </Text>
                )}
              </>
            </GridItem>
          </Grid>
          <Text
            fontSize="xl"
            my={'28px'}
            fontFamily={'Graphik LCG'}
            fontWeight={'500'}
          >
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
              )}
            </GridItem>
            <GridItem rowSpan={2} mb="5">
              <>
                <FormControl>
                  <FormLabel m="0em" letterSpacing="0.256px" color="#15134B" cursor="pointer">
                    Upload Photo
                  </FormLabel>
                  <Button
                    h="128px"
                    w="174px"
                    border="2px solid #E8E8E8"
                    borderRadius="8px"
                    bg="#FFFFFF"
                    position={'relative'}
                    cursor={"auto"}
                  >
                    <label  >
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
              Submit
            </Button>
            <Button
              onClick={goBack}
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
          </Flex>
        </Box>
      </Box>

      {onOpenCongratulationsEditcenter && (
        <CongratulationWithEditCenter
          isOpen={isOpenCongratulationsEditcenter}
          onClose={handleCloseEditCenterModal}
        />
      )}
    </>
  );
};

export default EditCenter;
