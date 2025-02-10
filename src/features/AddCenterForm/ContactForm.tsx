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
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
import Uploadlogo from './UploadLogoCenter';
import Progressbar from '../../theme/components/ProgressBarAddCenter';
import { TherapyFormProps } from './therapyFormInterface';
import { useTranslation } from 'react-i18next';
// import { t } from 'i18next';

const ContactForm: React.FC<TherapyFormProps> = ({
  onSubmit,
  backHandler,
  sliding,
  formData,
}) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const schema = joi.object({
    phoneNumber: joi
      .number()
      .required()
      .messages({
        'string.empty': t('phoneRequired'),
        'any.required': t('phoneRequired'),
      })
      .label(t('phone')),
    socialMedia: joi
      .string()
      .required()
      .messages({
        'string.empty': t('socialMediaRequired'),
        'any.required': t('socialMediaRequired'),
      })
      .uri({ scheme: ['http', 'https'] })
      .label(t('socialMedia')),
    Website: joi
      .string()
      .required()
      .messages({
        'string.empty': t('websiteRequired'),
        'any.required': t('websiteRequired'),
      })
      .uri({ scheme: ['http', 'https'] })
      .label('Website'),
    Linkedin: joi
      .string()
      .required()
      .messages({
        'string.empty': t('linkedinRequired'),
        'any.required': t('linkedinRequired'),
      })
      .uri({ scheme: ['http', 'https'] })
      .label('Linkedin'),
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
    phoneNumber: number;
    website: string;
    linkedIn: string;
    socialMedia: string;
  }) => {
    onSubmit(data);
    onOpen();
  };
  return (
    <Box
      bg="#FFFFFF"
      borderRadius="10px"
      m="5.875em 2.625em 5.875em 2.375em"
      as="form"
      onSubmit={handleSubmit(FormonSubmit)}
    >
      <Progressbar index={3} />

      <Grid
        m="2.625em 1.5em 0em 1.5em"
        templateColumns="repeat(2, 1fr)"
        gap="0em 1.5625em"
      >
        <GridItem>
          <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
            {t('phone')}
          </FormLabel>
          <Input
            {...register('phoneNumber')}
            id="phoneNumber"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb="1em"
            borderRadius="8px"
            defaultValue={formData?.phoneNumber}
          />
          {errors.phoneNumber && (
            <Text color="red.500" mb={2} fontSize={16}>
              {errors.phoneNumber.message as string}
            </Text>
          )}
        </GridItem>
        <GridItem>
          <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
            {t('socialMedia')}
          </FormLabel>
          <Input
            {...register('socialMedia')}
            id="socialMedia"
            placeholder="Facebook.com/"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb="1em"
            borderRadius="8px"
            defaultValue={formData?.socialMedia}
          />
          {errors.socialMedia && (
            <Text color="red.500" mb={2} fontSize={16}>
              {errors.socialMedia.message as string}
            </Text>
          )}{' '}
        </GridItem>
        <GridItem>
          <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
            {t('website')}
          </FormLabel>
          <Input
            {...register('Website')}
            id="Website"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb="1em"
            borderRadius="8px"
            defaultValue={formData?.Website}
          />
          {errors.Website && (
            <Text color="red.500" mb={2} fontSize={16}>
              {errors.Website.message as string}
            </Text>
          )}{' '}
        </GridItem>
        <GridItem>
          <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
            Linkedin
          </FormLabel>
          <Input
            {...register('Linkedin')}
            id="Linkedin"
            autoComplete="Linkedin"
            placeholder="Linkedin.com/"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            mt="0.75em"
            mb="1em"
            borderRadius="8px"
            defaultValue={formData?.Linkedin}
          />
          {errors.Linkedin && (
            <Text color="red.500" mb={2} fontSize={16}>
              {errors.Linkedin.message as string}
            </Text>
          )}{' '}
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
      {onOpen && (
        <Uploadlogo
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={onSubmit}
          formData={formData}
        />
      )}
    </Box>
  );
};
export default ContactForm;
