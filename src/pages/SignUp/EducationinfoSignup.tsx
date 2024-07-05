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
  Spinner,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import ProgressBarSignup from '../../theme/components/ProgressBarSignup';
import { Image } from '../../assets/icons/Image';
import { SignupFormProps } from './signupFormInterface';
import axios from 'axios';
import { config } from '../../config';
import { useNavigate } from 'react-router-dom';
import CongratulationsSginUp from './CongratulationsSginUp';

const EductionIInfoSignup: React.FC<SignupFormProps> = ({
  onSubmit,
  nextHandler,
  backHandler,
  sliding,
  formData,
}) => {
  const [imagePreview, setImagePreview] = useState('');
  const [logo, setLogo] = useState<File>();
  const [imagePreviewError, setImagePreviewError] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const toast = useToast();
  const schema = joi.object({
    Degree: joi.string().required().label('Degree'),
    University: joi.string().required().label('University'),
    certification: joi
      .any()
      .custom((value, helpers) => {
        if (!value || !value.name) {
          return helpers.error('any.required', {
            message: 'Please upload a certification file.',
          });
        }
        const ext = value.name.split('.').pop().toLowerCase();
        if (ext !== 'pdf') {
          return helpers.error('any.invalid', {
            message: 'Invalid file type. Please upload a PDF file.',
          });
        }

        return value;
      })
      .required(),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImagePreviewError(false);
    }
  };

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'all',
  });

  const [selectedFile, setSelectedFile] = useState<File>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCertificateChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  const FormonSubmit = (data: { certification: File }) => {
    setIsFormSubmitted(true);

    if (!logo) {
      setImagePreviewError(true);
      return;
    }

    if (!selectedFile) {
      setError('certification', {
        message: 'Please upload a PDF file.',
      });
    } else {
      clearErrors('certification');
      data.certification = selectedFile;
      console.log(formData, data);
      onSubmit(data);
      SendDataToApi(data);
    }
  };

  const createFormData = (data: any) => {
    const formDataSet = new FormData();
    formDataSet.append('name', formData.Name);
    formDataSet.append('email', formData.Email);
    formDataSet.append('password', formData.Password);
    formDataSet.append('degree', data.Degree);
    formDataSet.append('university', data.University);
    formDataSet.append('photo', logo);
    formDataSet.append('certificate', data.certification);

    formData.specializationschema.forEach((specialty: { id: string | Blob }) =>
      formDataSet.append('specialty_ids[]', specialty.id)
    );

    return formDataSet;
  };

  const postFormData = (formDataSet: formDataSet) => {
    return axios.post(`${config.apiURL}/api/v1/doctors`, formDataSet);
  };

  const SendDataToApi = async (data: any) => {
    const formDataSet = createFormData(data);
    setIsLoading(true); // Set loading state to true

    try {
      await postFormData(formDataSet);
      handleSuccess();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false); // Set loading state to false
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
      duration: 9000,
      position: 'top-right',
    });
  };

  return (
    <Box
      bg="#FFFFFF"
      borderRadius="10px"
      m="5.875em 2.625em 5.875em 2.375em"
      as="form"
      onSubmit={handleSubmit(FormonSubmit)}
    >
      <ProgressBarSignup index={2} />

      <Grid
        m="2.625em 1.5em 0em 1.5em"
        templateColumns="repeat(2, 1fr)"
        gap="0em 1.5625em"
      >
        <GridItem>
          <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
            Degree
          </FormLabel>
          <Input
            {...register('Degree')}
            id="Degree"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            mt="0.75em"
            mb="1em"
            borderRadius="8px"
            defaultValue={formData.Degree}
          />
          {errors.Degree && (
            <Text color="red.500">{errors.Degree.message as string}</Text>
          )}
        </GridItem>

        <GridItem>
          <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
            University
          </FormLabel>
          <Input
            {...register('University')}
            id="University"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            mt="0.75em"
            mb="1em"
            borderRadius="8px"
            defaultValue={formData.University}
          />
          {errors.University && (
            <Text color="red.500">{errors.University.message as string}</Text>
          )}
        </GridItem>
        <GridItem>
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
                    <Input
                      type="file"
                      accept="image/png,image/jpeg"
                      name="image"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                      hidden
                    />
                  </label>
                </>
              )}
            </Button>
            {isFormSubmitted && imagePreviewError && (
              <Text color="red.500">"Image" is required</Text>
            )}
          </FormControl>
        </GridItem>
        <GridItem>
          <>
            <FormControl>
              <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                certification
              </FormLabel>
              <Button
                h="128px"
                w="174px"
                mt={'0.75em'}
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
                    accept="application/pdf"
                    onChange={(e) => handleCertificateChange(e)}
                    style={{ display: 'none' }}
                  />
                </label>
              </Button>
            </FormControl>
            {selectedFile && (
              <Text mt="1em" width={'400px'}>
                Selected File: {selectedFile.name}
              </Text>
            )}
            {errors.certification && (
              <Text color="red.500">
                {errors.certification.message as string}
              </Text>
            )}
          </>
        </GridItem>
      </Grid>

      <Flex flexDirection="row-reverse" my={15}>
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
          isDisabled={isLoading} // Disable button while loading
        >
          {isLoading ? <Spinner size="md" /> : 'Submit'}{' '}
          {/* Show spinner while loading */}
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
        <CongratulationsSginUp
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      )}
    </Box>
  );
};

export default EductionIInfoSignup;
