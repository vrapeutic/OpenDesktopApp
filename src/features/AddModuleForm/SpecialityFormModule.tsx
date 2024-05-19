import { ChangeEvent,  useState } from 'react';
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
import { useForm } from 'react-hook-form';
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
      .message('"To" must be greater than "From"')
      .label('To'),
      packagename: joi.string().required(),

      
    certification: joi.required().custom((value, helpers) => {
      if (value) {
        const ext = value.name.split('.').pop().toLowerCase();
        const allowedImageExtensions = ['png', 'jpg', 'jpeg', 'gif'];

        if (allowedImageExtensions.includes(ext)) {
          return value;
        } else {
          return helpers.error(
            'Invalid file type. Please upload an image file.'
          );
        }
      }
      return value;
    }),
  });

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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedFile, setSelectedFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { otp } = useAdminContext();

  const handleCertificateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const ext = file.name.split('.').pop()?.toLowerCase();
    const allowedImageExtensions = ['png', 'jpg', 'jpeg', 'gif'];

    if (allowedImageExtensions.includes(ext)) {
      setSelectedFile(file);
      setValue('certification', file);
      clearErrors('certification');
    } else {
      setError('certification', { message: 'Please upload an image file.' });
    }
  };

  const FormonSubmit = (data:object) => {
    onSubmit(data);
    SendDataToApi(data);
    setLoading(true);
    console.log('Updated FormData in SpecialtyFormModule:', formData);
  };

  const createFormData = (data:any) => {
    console.log('form data in create form data', formData);
    const formDataTobesent = new FormData();

    formDataTobesent.append('name', formData.Name);
    formDataTobesent.append('version', formData.Version);

    formDataTobesent.append('technology', formData.Technology);

    formData.specializationschema.forEach((specialty: { id: string | Blob }) =>
      formDataTobesent.append('targeted_skill_ids[]', specialty.id)
    );
    formDataTobesent.append('min_age', data.From) ;
    formDataTobesent.append('max_age', data.To);
    formDataTobesent.append('image', data.certification);
    formDataTobesent.append('package_name', data.packagename);

    return formDataTobesent;
  };
  const SendDataToApi = async (data:object) => {
    const formDatasent = createFormData(data);

    try {
      await postFormData(formDatasent);
      console.log("test")
      onOpen();
    } catch (error) {
      console.log("error in request",error)
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
      duration: 9000,
      position: 'top-right',
    });
  };

  const handleCloseModal = () => {
    console.log('handle close modal');
    onClose();
    navigate('/');
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
              package name
            </FormLabel>

            <Input
              {...register('packagename')}
              id="packagename"
              borderColor="#4965CA"
              border="2px solid #E8E8E8"
              _hover={{ border: '1px solid #4965CA' }}
              boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
              type="text"
              mt="0.75em"
              mb="1em"
              borderRadius="8px"
            />
            {errors.packagename && (
              <Text color="red.500">{errors.packagename.message as string}</Text>
            )}
          </GridItem>
          </GridItem>

          <GridItem rowSpan={2}>
            <>
              <FormControl>
                <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                  Profile image
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
            {loading ? 'Uploading Your Data' : 'Submit'}
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
      </Box>

      {onOpen && (
        <CongratulationsModuleAdmin
          isOpen={isOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
export default SpecialtyFormModule;
