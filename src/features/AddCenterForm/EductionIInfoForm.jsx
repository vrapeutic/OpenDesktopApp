import { useState } from 'react';
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
import { useForm } from 'react-hook-form';
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import Progressbar from '../../theme/components/ProgressBar';
import { Image } from '../../assets/icons/Image';

export default function EductionIInfoForm({
  onSubmit,
  nextHandler,
  backHandler,
  sliding,
}) {
  const schema = joi.object({
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
  });

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'all',
  });

  const [selectedFile, setSelectedFile] = useState('');
  const handleCertificateChange = (event) => {
    const file = event.target.files[0];
    const ext = file.name.split('.').pop();
    if (ext == 'pdf') {
      setSelectedFile(file);
      setValue('certification', file);
      clearErrors('certification');
    } else {
      setError('certification', { message: 'Please upload a PDF file.' });
    }
  };

  const FormonSubmit = (data) => {
    if (selectedFile.length < 1) {
      setError('certification', {
        type: 'manual',
        message: 'Please upload a PDF file.',
      });
    } else {
      clearErrors('certification');
      data.certification = selectedFile;

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
            {...register('registrationNumber')}
            id="registrationNumber"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            mt="0.75em"
            mb="1em"
            borderRadius="8px"
          />
          {errors.registrationNumber && (
            <Text color="red.500">{errors.registrationNumber.message}</Text>
          )}
        </GridItem>
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
        <GridItem>
          <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
            Tax ID
          </FormLabel>
          <Input
            {...register('taxID')}
            id="taxID"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            mt="0.75em"
            mb="1em"
            borderRadius="8px"
          />
          {errors.taxID && <Text color="red.500">{errors.taxID.message}</Text>}
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
    </Box>
  );
}
