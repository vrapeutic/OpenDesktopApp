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
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import Progressbar from '../../theme/components/ProgressBarAddCenter';
import { Image } from '../../assets/icons/Image';
import { TherapyFormProps } from './therapyFormInterface';

const EductionIInfoForm: React.FC<TherapyFormProps> = ({
  onSubmit,
  nextHandler,
  backHandler,
  sliding,
  formData,
}) => {
  const schema = joi.object({
    registrationNumber: joi.number().required().label('Registration Number'),
    taxID: joi.number().required().label('Tax ID'),
    certification: joi
      .any()
      .custom((value, helpers) => {
        if (value) {
          const ext = value.name.split('.').pop().toLowerCase();
          if (ext !== 'pdf') {
            return helpers.error('Invalid file type. Please upload a PDF file.');
          }
          return value;
        }
        return helpers.error('File is required.');
      })
      .required(),
  });

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'all',
  });

  const [selectedFile, setSelectedFile] = useState<File>();

  const handleCertificateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValue('certification', file);
      clearErrors('certification');
    }
  };

  const FormonSubmit = (data: { registrationNumber: number; taxID: number; certification: File }) => {
    if (!selectedFile) {
      setError('certification', {
        type: 'manual',
        message: 'Please upload a PDF file.',
      });
    } else {
      onSubmit(data);
      nextHandler();
    }
  };

  return (
    <Box
      bg="#FFFFFF"
      borderRadius="10px"
      m="5.875em 2.625em 5.875em 2.375em"
      as="form"
      onSubmit={handleSubmit(FormonSubmit)}
    >
      <Progressbar index={2} />

      <Grid
        m="2.625em 1.5em 0em 1.5em"
        templateColumns="repeat(2, 1fr)"
        gap="0em 1.5625em"
      >
        <GridItem>
          <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
            Registration Number
          </FormLabel>
          <Input
            {...control.register('registrationNumber')}
            id="registrationNumber"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            mt="0.75em"
            mb="1em"
            borderRadius="8px"
            defaultValue={formData.registrationNumber}
          />
          {errors.registrationNumber && (
            <Text color="red.500" mb={2} fontSize={16}>
              {errors.registrationNumber.message as string}
            </Text>
          )}
        </GridItem>
        
        <GridItem rowSpan={2}>
          <FormControl>
            <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
              Certification
            </FormLabel>
            <Controller
              name="certification"
              control={control}
              render={({ field }) => (
                <>
                  <Button
                    h="128px"
                    w="174px"
                    border="2px solid #E8E8E8"
                    borderRadius="8px"
                    bg="#FFFFFF"
                    cursor={"auto"}
                  >
                    <label style={{ cursor:"pointer"}} >
                      <Image />
                      <Input
                        id="certification"
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                          handleCertificateChange(e);
                          field.onChange(e.target.files?.[0]);
                        }}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </Button>
                  {selectedFile && (
                    <Text mt="1em">Selected File: {selectedFile.name}</Text>
                  )}
                  {errors.certification && (
                    <Text color="red.500" mb={2} fontSize={16}>
                      {errors.certification.message as string}
                    </Text>
                  )}
                </>
              )}
            />
          </FormControl>
        </GridItem>

        <GridItem>
          <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
            Tax ID
          </FormLabel>
          <Input
            {...control.register('taxID')}
            id="taxID"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            mt="0.75em"
            mb="1em"
            borderRadius="8px"
            defaultValue={formData.taxID}
          />
          {errors.taxID && (
            <Text color="red.500" mb={2} fontSize={16}>
              {errors.taxID.message as string}
            </Text>
          )}
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
          isDisabled={!isValid}
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
    </Box>
  );
};

export default EductionIInfoForm;
