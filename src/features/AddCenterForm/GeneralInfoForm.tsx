import { useForm } from 'react-hook-form';
import joi from 'joi';
import {
  Button,
  Text,
  Box,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Flex,
} from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
import Progressbar from '../../theme/components/ProgressBarAddCenter';
import { TherapyFormProps } from './therapyFormInterface';
import { useTranslation } from 'react-i18next';
const GeneralInfoForm: React.FC<TherapyFormProps> = ({
  onSubmit,
  nextHandler,
  backHandler,
  sliding,
  formData,
}) => {
  const { t } = useTranslation();

  const schema = joi.object({
    therapyCenterName: joi
      .string()
      .min(3)
      .max(30)
      .required()
      .messages({
        'string.min': t('validation.name.min'),
        'string.max': t('validation.name.max'),
        'string.empty': t('validation.name.required'),
        'any.required': t('validation.name.required'),
      })
      .label(t('therapyCenterName')),
    completeAddress: joi
      .string()
      .required()
      .messages({
        'string.empty': t('completeAddressRequired'),
        'any.required': t('completeAddressRequired'),
      }),
    Email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required()
      .label(t('email'))
      .messages({
        'string.base': t('validation.email.invalid'),
        'string.email': t('validation.email.invalid'),
        'any.required': t('validation.email.required'),
        'string.empty': t('validation.email.empty'),
      }),
    managerName: joi
      .string()
      .min(3)
      .max(30)
      .required()
      .label(t('managerName'))
      .messages({
        'string.min': t('validation.name.min'),
        'string.empty': t('validation.name.required'),
        'any.required': t('validation.name.required'),
      }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onTouched',
  });

  const FormonSubmit = (data: {
    therapyCenterName: string;
    completeAddress: string;
    Email: string;
    managerName: string;
  }) => {
    onSubmit(data);
    nextHandler();
  };

  return (
    <Box
      bg="#FFFFFF"
      borderRadius="10px"
      m="5.875em 2.625em 5.875em 2.375em"
      as="form"
      onSubmit={handleSubmit(FormonSubmit)}
    >
      <Progressbar index={0} />
      <Grid
        m="2.625em 1.5em 0em 1.5em"
        templateColumns="repeat(2, 1fr)"
        gap="0em 1.5625em"
      >
        <GridItem>
          <FormLabel
            display="inline"
            m="0em"
            letterSpacing="0.256px"
            color="#15134B"
          >
            {t('therapyCenterName')}
          </FormLabel>

          <Input
            {...register('therapyCenterName')}
            id="therapyCenterName"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb="1em"
            borderRadius="8px"
            defaultValue={formData?.therapyCenterName}
          />
          {errors.therapyCenterName && (
            <Text color="red.500" mb={2} fontSize={16}>
              {errors.therapyCenterName.message as string}
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
            {t('completeAddress')}
          </FormLabel>

          <Input
            {...register('completeAddress')}
            id="completeAddress"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb="1em"
            borderRadius="8px"
            defaultValue={formData?.completeAddress}
          />
          {errors.completeAddress && (
            <Text color="red.500" mb={2} fontSize={16}>
              {errors.completeAddress.message as string}
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
            {t('email')}
          </FormLabel>

          <Input
            {...register('Email')}
            id="Email"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb="1em"
            borderRadius="8px"
            defaultValue={formData?.Email}
          />
          {errors.Email && (
            <Text color="red.500" mb={2} fontSize={16}>
              {errors.Email.message as string}
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
            {t('managerName')}
          </FormLabel>

          <Input
            {...register('managerName')}
            id="managerName"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb="1em"
            borderRadius="8px"
            defaultValue={formData?.managerName}
          />
          {errors.managerName && (
            <Text color="red.500" mb={2} fontSize={16}>
              {errors.managerName.message as string}
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
          {t('next')}
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
            {t('back')}
          </Button>
        )}
      </Flex>
    </Box>
  );
};
export default GeneralInfoForm;
