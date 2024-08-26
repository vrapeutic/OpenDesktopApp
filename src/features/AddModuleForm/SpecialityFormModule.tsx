import { ChangeEvent, useState } from 'react';
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
import { Controller, useForm } from 'react-hook-form';
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { Image } from '../../assets/icons/Image';
import { AddModuleFormProps } from './ModuleFormInterface';
import ProgressBarAddModule from '../../theme/components/ProgressBarAddModule';
import { useNavigate } from 'react-router-dom';
import CongratulationsModuleAdmin from './CongratulationsModuleAdmin';
import axios from 'axios';
import { config } from '../../config';
import { useAdminContext } from '@renderer/Context/AdminContext';

const SpecialtyFormModule: React.FC<AddModuleFormProps> = ({
  onSubmit,
  backHandler,
  sliding,
  formData,
}) => {
  const schema = joi.object({
    From: joi.number().required(),
    To: joi
      .number()
      .required()
      .greater(joi.ref('From'))
      .message('"To" must be greater than "From"'),
    packagename: joi.string().required(),
    file: joi.any().required(),
  });

  const [imagePreview, setImagePreview] = useState('');
  const [logo, setLogo] = useState<File>();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    control,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onTouched',

  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { otp } = useAdminContext();

  const handleCertificateChange = (
    event: ChangeEvent<HTMLInputElement>,
    onChange: any
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      const allowedImageExtensions = ['png', 'jpg', 'jpeg', 'gif'];

      if (allowedImageExtensions.includes(ext)) {
        onChange(file);
        clearErrors('file');
      } else {
        setError('file', { message: 'Please upload an image file.' });
      }
    }
  };

  const FormonSubmit = (data: any) => {
    onSubmit(data);
    SendDataToApi(data);
    setLoading(true);
  };

  const createFormData = (data: any) => {
    const formDataTobesent = new FormData();
    formDataTobesent.append('name', formData.Name);
    formDataTobesent.append('version', formData.Version);
    formDataTobesent.append('technology', formData.Technology);
    formData.specializationschema.forEach((specialty: { id: string | Blob }) =>
      formDataTobesent.append('targeted_skill_ids[]', specialty.id)
    );
    formDataTobesent.append('min_age', data.From);
    formDataTobesent.append('max_age', data.To);
    formDataTobesent.append('image', data.file);
    formDataTobesent.append('package_name', data.packagename);
    return formDataTobesent;
  };

  const SendDataToApi = async (data: any) => {
    const formDatasent = createFormData(data);
    try {
      await postFormData(formDatasent);
      onOpen();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const postFormData = (formDatasent: FormData) => {
    const headers = {
      otp: `${otp}`,
    };
    return axios.post(
      `${config.apiURL}/api/v1/software_modules`,
      formDatasent,
      { headers }
    );
  };

  const handleError = (error: any) => {
    toast({
      title: 'Error',
      description: error.response.data,
      status: 'error',
      duration: 5000,
      position: 'top-right',
    });
  };

  const handleCloseModal = () => {
    onClose();
    navigate('/');
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
   
      setValue('file', file);
                    trigger('file'); // Trigger validation for the 'diagnoses' field
    }
  };

  return (
    <>
      <Box
        bg="#FFFFFF"
        borderRadius="10px"
        m="5.875em 2.625em 5.875em 2.375em"
        as="form"
        onSubmit={handleSubmit(FormonSubmit)}
      >
        <ProgressBarAddModule index={1} />
        <Grid
          m="2.625em 1.5em 0em 1.5em"
          templateColumns="repeat(2, 1fr)"
          gap="0em 1.5625em"
        >
          <GridItem>
            <FormLabel>Age Range</FormLabel>
          </GridItem>
          <GridItem></GridItem>
          <GridItem>
            <Grid gap={2} templateColumns="repeat(2, 1fr)">
              <GridItem>
                <FormLabel>From</FormLabel>
                <Input {...register('From')} id="From"  />
                {errors.From && (
                  <Text color="red.500" mb={2} fontSize={16}>{errors.From.message as string}</Text>
                )}
              </GridItem>
              <GridItem>
                <FormLabel>To</FormLabel>
                <Input {...register('To')} id="To" />
                {errors.To && (
                  <Text color="red.500" mb={2} fontSize={16}>{errors.To.message as string}</Text>
                )}
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem>
            {/* Package Name */}
            <FormLabel>Package Name</FormLabel>
            <Input {...register('packagename')} id="packagename" />
            {errors.packagename && (
              <Text color="red.500" mb={2} fontSize={16}>
                {errors.packagename.message as string}
              </Text>
            )}
          </GridItem>
       
          <GridItem my="5">
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
            {/* {imagePreviewError && (
              <Text color="red.500">Please upload an image.</Text>
            )} */}
          </FormControl>
        </GridItem>
        </Grid>

        <Flex flexDirection="row-reverse" m={3}>
          <Button
            type="submit"
            bg={isValid ? '#4AA6CA' : '#D3D3D3'}
            borderRadius="0.75em"
            w="13.375em"
            h="3.375em"
            color="#FFFFFF"
            fontSize="1.125em"
            fontWeight="700"
            isDisabled={!isValid}
          >
            {loading ? 'Uploading Your Data' : 'Submit'}
          </Button>
          {sliding !== 1 && (
            <Button
              onClick={backHandler}
              bg="#F5F5F5"
              borderRadius="0.75em"
              w="13.375em"
              h="3.375em"
              color="#A0A0A0"
              fontSize="1.125em"
              fontWeight="700"
              mr="auto"
            >
              Back
            </Button>
          )}
        </Flex>
      </Box>
      {isOpen && (
        <CongratulationsModuleAdmin
          isOpen={isOpen}
          onClose={handleCloseModal}
          text="Your Module has been created successfully"
        />
      )}
    </>
  );
};

export default SpecialtyFormModule;
