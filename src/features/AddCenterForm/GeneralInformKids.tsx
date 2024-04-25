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
  Textarea,
} from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
import Progressbar from '../../theme/components/ProgrressBarAddKides';
import { TherapyFormProps } from './therapyFormInterface';
const GeneralInfoFormKids: React.FC<TherapyFormProps> = ({
  onSubmit,
  nextHandler,
  backHandler,
  sliding,
}) => {
  const schema = joi.object({
    FirstName: joi.string().min(3).max(30).required().label('FirstName'),

    LastName: joi.string().required(),
    Email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required(),
    PersonalEmail: joi
      .string()
      .min(3)
      .max(30)
      .required()
      .label('PersonalEmail'),
    Gender: joi.string().required(),
    Completeaddress: joi.string().min(3).max(50).required(),
    Bio: joi.string().min(3).max(500).required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onTouched',
  });

  const FormonSubmit = (data: {
    FirstName: string;
    LastName: string;
    Email: string;
    PersonalEmail: string;
    Gender: string;
    Completeaddress: string;
    Bio: string;
  }) => {
    onSubmit(data);
    nextHandler();
  };
  return (
    <Box
      bg="#FFFFFF"
      borderRadius="10px"
      mx="18"
      my="30"
      as="form"
      onSubmit={handleSubmit(FormonSubmit)}
    >
      <Box
        display={'flex'}
        justifyContent={'center'}
        pb="18px"
        borderBottom={'1px solid #F5F5F5'}
      >
        <Progressbar index={0} />
      </Box>

      <Grid
        m="2.625em 1.5em 0em 1.5em"
        templateColumns="repeat(2, 1fr)"
        gap="0em 1.5625em"
      >
        <GridItem mb="5">
          <FormLabel
            display="inline"
            m="0em"
            letterSpacing="0.256px"
            color="#15134B"
          >
            First Name
          </FormLabel>

          <Input
            {...register('FirstName')}
            id="FirstName"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb=".3em"
            borderRadius="8px"
          />
          {errors.FirstName && (
            <Text color="red.500">{errors.FirstName.message as string}</Text>
          )}
        </GridItem>
        <GridItem mb="5">
          <FormLabel
            display="inline"
            m="0em"
            letterSpacing="0.256px"
            color="#15134B"
          >
            Last Name
          </FormLabel>

          <Input
            {...register('LastName')}
            id="LastName"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb=".3em"
            borderRadius="8px"
          />
          {errors.LastName && (
            <Text color="red.500">{errors.LastName.message as string}</Text>
          )}
        </GridItem>
        <GridItem mb="5">
          <FormLabel
            display="inline"
            m="0em"
            letterSpacing="0.256px"
            color="#15134B"
          >
            Work Email
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
            mb=".3em"
            borderRadius="8px"
          />
          {errors.Email && (
            <Text color="red.500">{errors.Email.message as string}</Text>
          )}
        </GridItem>
        <GridItem mb="5">
          <FormLabel
            display="inline"
            m="0em"
            letterSpacing="0.256px"
            color="#15134B"
          >
            Personal Email
          </FormLabel>

          <Input
            {...register('PersonalEmail')}
            id="PersonalEmail"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb=".3em"
            borderRadius="8px"
          />
          {errors.PersonalEmail && (
            <Text color="red.500">
              {errors.PersonalEmail.message as string}
            </Text>
          )}
        </GridItem>
        <GridItem mb="5">
          <FormLabel
            display="inline"
            m="0em"
            letterSpacing="0.256px"
            color="#15134B"
          >
            Gender
          </FormLabel>

          <Input
            {...register('Gender')}
            id="Gender"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb=".3em"
            borderRadius="8px"
          />
          {errors.Gender && (
            <Text color="red.500">{errors.Gender.message as string}</Text>
          )}
        </GridItem>
        <GridItem mb="5">
          <FormLabel
            display="inline"
            m="0em"
            letterSpacing="0.256px"
            color="#15134B"
          >
            Complete Address
          </FormLabel>

          <Input
            {...register('Completeaddress')}
            id="Completeaddress"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb=".3em"
            borderRadius="8px"
          />
          {errors.Completeaddress && (
            <Text color="red.500">
              {errors.Completeaddress.message as string}
            </Text>
          )}
        </GridItem>
      </Grid>
      <Grid
        m="0em 1.5em 1.5em 1.5em"
        templateColumns="repeat(1, 1fr)"
        gap="0em 1.5625em"
      >
        <GridItem>
          <FormLabel
            display="inline"
            m="1em"
            letterSpacing="0.256px"
            color="#15134B"
          >
            Bio
          </FormLabel>
          <Textarea
            {...register('Bio')}
            id="Bio"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: '1px solid #4965CA' }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            mt="0.75em"
            mb=".3em"
            borderRadius="8px"
          />

          {errors.Bio && (
            <Text color="red.500">{errors.Bio.message as string}</Text>
          )}
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
};
export default GeneralInfoFormKids;
