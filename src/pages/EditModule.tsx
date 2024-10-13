import { ArrowBackIcon } from '@chakra-ui/icons';
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
  Select as SelectChakra,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Select from 'react-select';
import { joiResolver } from '@hookform/resolvers/joi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAdminContext } from '@renderer/Context/AdminContext';
import axios from 'axios';
import { config } from '../config';
import joi from 'joi';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import makeAnimated from 'react-select/animated';
import CongratulationsModuleAdmin from '@renderer/features/AddModuleForm/CongratulationsModuleAdmin';

interface ModuleAttributes {
  name: string;
  technology: string;
  version: any;
  targeted_skills: { id: number; name: string }[];
  image: any;
  min_age: number;
  max_age: number;
  package_name: string;
}

interface Module {
  attributes: ModuleAttributes;
  id: string;
}

interface LocationState {
  Module: Module;
}
const EditModule = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const Module = (location.state as LocationState)?.Module;
  const [logo, setLogo] = useState<File>();
  const [imagePreview, setImagePreview] = useState(
    Module?.attributes?.image?.url
  );
  const [loading, setLoading] = useState(false);
  const [skillsList, setSkillsList] = useState([]);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { otp } = useAdminContext();

  const schema = joi.object({
    Name: joi.string().min(3).max(30).required().label('Name'),
    Technology: joi.string().required().label('Technology'),
    Version: joi.number().required().label('Version'),
    targetSkills: joi.array().min(1).required().label('targetSkills'),
    From: joi.number().required().label('From'),
    To: joi
      .number()
      .required()
      .greater(joi.ref('From'))
      .message('"To" must be greater than "From"')
      .label('To'),
    packageName: joi.string().required().label('packageName'),
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
    setValue,
    setError,
    trigger,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onTouched',
  });

  const handleImageChange  =async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    const previewUrl = URL.createObjectURL(file);
    await setImagePreview(previewUrl);
    await setLogo(file);
    trigger("logo")
    if (!file) {
      setValue('logo', file);
      await setError('logo', { message: 'Please upload a logo.' });
    }
  };

  const handleError = (error: any) => {
    toast({
      title: 'Error',
      description: error.response.data,
      status: 'error',
      duration: 9000,
      position: 'top-right',
    });
  };

  const handleCloseModal = () => {
    console.log('handle close modal');
    onClose();
    navigate('/Theraputicmodules');
  };
  const animatedComponents = makeAnimated();
  const getSkills = async () => {
    try {
      const response = await axios.get(
        `${config.apiURL}/api/v1/targeted_skills`
      );

      setSkillsList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSkills();
  }, []);
  console.log(errors, 'errors');
  useEffect(() => {
    if (Module && skillsList.length > 0) {
      const x: any[] = Module.attributes.targeted_skills;
      const filteredArray = skillsList.filter((item: any) => {
        return x.some((elem) => elem.id === item.id);
      });
      const mappedSkills = filteredArray.map((y: any) => ({
        id: y.id,
        label: y.name,
        value: y.id,
      }));

      setValue('targetSkills', mappedSkills);
      setSelectedSkills(mappedSkills);
      console.log('mappedSkills', mappedSkills);
    }
  }, [Module, skillsList]);

  const skillsOptions = skillsList.map((skill) => ({
    id: skill.id,
    label: skill.name,
    value: skill.id,
  }));

  const handleTargetedSkills = (options: any) => {
    setValue('targetSkills', options);
    setSelectedSkills(options);
  };

  const FormOnSubmit = (data: any) => {
    console.log('Form Submitted'); // Log to check if the form is submitted
    console.log('Form Data:', data); // Log to inspect the form data
    SendDataToApi(data);
    setLoading(true);
    console.log('Updated FormData in:', data);
  };

  const createFormData = (data: any) => {
    console.log('Creating FormData with:', data); // Log to inspect the data used to create FormData
    const formDataToBeSent = new FormData();
    formDataToBeSent.append('software_module[name]', data.Name);
    formDataToBeSent.append('software_module[version]', data.Version);
    formDataToBeSent.append('software_module[technology]', data.Technology);
    data.targetSkills.forEach((skill: { id: string | Blob }) =>
      formDataToBeSent.append('software_module[targeted_skill_ids][]', skill.id)
    );
    formDataToBeSent.append('software_module[min_age]', data.From);
    formDataToBeSent.append('software_module[max_age]', data.To);
    if (logo) {
      formDataToBeSent.append('software_module[image]', logo);
    }
    formDataToBeSent.append('software_module[package_name]', data.packageName);

    return formDataToBeSent;
  };
  const SendDataToApi = async (data: object) => {
    const formDataSent = createFormData(data);
    try {
      console.log('Sending FormData to API...'); // Log to confirm that the API request is being made
      await postFormData(formDataSent);
      console.log('FormData sent successfully'); // Log to confirm success
      onOpen();
    } catch (error) {
      console.log('Error in request:', error); // Log any errors that occur during the request
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const postFormData = async (formDataToBeSent: FormData) => {
    const headers = {
      otp: `${otp}`,
    };
    console.log('Posting FormData with headers:', headers); // Log the headers and formData before posting
    return await axios.put(
      `${config.apiURL}/api/v1/software_modules/${Module?.id}`,
      formDataToBeSent,
      { headers }
    );
  };
  const goBack = () => {
    navigate(-1);
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
            Therapy Module
          </Text>
        </HStack>
        <Box bg="#FFFFFF" borderRadius={10} p={'24px'}>
          <Grid templateColumns="repeat(2, 1fr)" gap="0em 1.5625em">
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
                defaultValue={Module?.attributes?.name}
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
                Technology
              </FormLabel>
              <SelectChakra
                {...register('Technology')}
                id="Technology"
                name="Technology"
                borderColor="#4965CA"
                border="2px solid #E8E8E8"
                _hover={{ border: '1px solid #4965CA' }}
                boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
                mt="0.75em"
                mb="1em"
                borderRadius="8px"
                defaultValue={Module?.attributes?.technology}
              >
                <option value="virtual_reality">Virtual Reality</option>
                <option value="two_dimensional">Two Dimensional</option>
              </SelectChakra>
              {errors.Technology && (
                <Text color="red.500">
                  {errors.Technology.message as string}
                </Text>
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
                defaultValue={Module?.attributes?.version}
              />
              {errors.Version && (
                <Text color="red.500">{errors.Version.message as string}</Text>
              )}
            </GridItem>
            <GridItem>
              <FormLabel
                display="inline"
                m="0em"
                letterSpacing="0.256px"
                color="#15134B"
              >
                Skills
              </FormLabel>

              <Controller
                name="targetSkills"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    {...register('targetSkills')}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={skillsOptions}
                    value={selectedSkills}
                    id="targetSkills"
                    name="targetSkills"
                    onChange={(options) => {
                      field.onChange(options);
                      handleTargetedSkills(options);
                    }}
                    styles={{
                      control: (baseStyles, state) => ({
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
              {errors.targetSkills && (
                <Text color="red.500">
                  {errors.targetSkills.message as string}
                </Text>
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
                    defaultValue={Module?.attributes?.min_age}
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
                    defaultValue={Module?.attributes?.max_age}
                  />
                  {errors.To && (
                    <Text color="red.500">{errors.To.message as string}</Text>
                  )}
                </GridItem>
              </Grid>
              <GridItem>
                <FormLabel
                  display="inline"
                  m="0em"
                  letterSpacing="0.256px"
                  color="#15134B"
                >
                  Package name
                </FormLabel>
                <Input
                  {...register('packageName')}
                  id="packageName"
                  borderColor="#4965CA"
                  border="2px solid #E8E8E8"
                  _hover={{ border: '1px solid #4965CA' }}
                  boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
                  type="text"
                  mt="0.75em"
                  mb="1em"
                  borderRadius="8px"
                  defaultValue={Module?.attributes?.package_name}
                />
                {errors.packageName && (
                  <Text color="red.500">
                    {errors.packageName.message as string}
                  </Text>
                )}
              </GridItem>
            </GridItem>
            <GridItem rowSpan={2} mb="5">
              <>
                <FormControl>
                  <FormLabel m="0em" letterSpacing="0.256px" color="#15134B"  cursor="pointer">
                    Upload Photo
                  </FormLabel>
                  <Button
                    h="128px"
                    w="174px"
                    border="2px solid #E8E8E8"
                    borderRadius="8px"
                    bg="#FFFFFF"
                    position={'relative'}
                    cursor={'auto'}
                  >
                    <label style={{ cursor:"pointer"}} >
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
              disabled={isValid}
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
      {onOpen && (
        <CongratulationsModuleAdmin
          isOpen={isOpen}
          onClose={handleCloseModal}
          text={'Your Module has been edited successfully'}
        />
      )}
    </>
  );
};

export default EditModule;
