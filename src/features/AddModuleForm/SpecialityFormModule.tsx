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
    To: joi.number().required().greater(joi.ref('From')).message('"To" must be greater than "From"'),
    packagename: joi.string().required(),
    certification: joi.any().required(),
  });

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'all',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { otp } = useAdminContext();

  const handleCertificateChange = (event: ChangeEvent<HTMLInputElement>, onChange: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      const allowedImageExtensions = ['png', 'jpg', 'jpeg', 'gif'];

      if (allowedImageExtensions.includes(ext)) {
        onChange(file);
        clearErrors('certification');
      } else {
        setError('certification', { message: 'Please upload an image file.' });
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
    formDataTobesent.append('image', data.certification);
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
    return axios.post(`${config.apiURL}/api/v1/software_modules`, formDatasent, { headers });
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
        <Grid m="2.625em 1.5em 0em 1.5em" templateColumns="repeat(2, 1fr)" gap="0em 1.5625em">
          <GridItem>
            {/* Age Range Inputs */}
            <FormLabel>Age Range</FormLabel>
            <Grid gap={2} templateColumns="repeat(2, 1fr)">
              <GridItem>
                <FormLabel>From</FormLabel>
                <Input {...register('From')} id="From" />
                {errors.From && <Text color="red.500">{errors.From.message as string}</Text>}
              </GridItem>
              <GridItem>
                <FormLabel>To</FormLabel>
                <Input {...register('To')} id="To" />
                {errors.To && <Text color="red.500">{errors.To.message as string}</Text>}
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem>
            {/* Package Name */}
            <FormLabel>Package Name</FormLabel>
            <Input {...register('packagename')} id="packagename" />
            {errors.packagename && <Text color="red.500">{errors.packagename.message as string}</Text>}
          </GridItem>
          <GridItem rowSpan={2}>
            {/* Certification File Upload */}
            <FormControl>
              <FormLabel>Profile image</FormLabel>
              <Controller
                name="certification"
                control={control}
                render={({ field: { onChange } }) => (
                  <Button border="2px solid #E8E8E8" borderRadius="8px" bg="#FFFFFF">
                    <label>
                      <Image />
                      <Input
                        type="file"
                        accept=".png, .jpg, .jpeg, .gif"
                        onChange={(e) => handleCertificateChange(e, onChange)}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </Button>
                )}
              />
              {errors.certification && <Text color="red.500">{errors.certification.message as string}</Text>}
            </FormControl>
          </GridItem>
        </Grid>
        <Flex flexDirection="row-reverse">
          <Button type="submit" isDisabled={!isValid}>
            {loading ? 'Uploading Your Data' : 'Submit'}
          </Button>
          {sliding !== 1 && (
            <Button onClick={backHandler}>Back</Button>
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
