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
const GeneralInfoForm: React.FC<TherapyFormProps> = ({
  onSubmit,
  nextHandler,
  backHandler,
  sliding,
  formData,
}) => {
  const schema = joi.object({
    therapyCenterName: joi
      .string()
      .min(3)
      .max(30)
      .required()
      .label('therapyCenterName'),
    completeAddress: joi.string().required(),
    Email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required(),
    managerName: joi.string().min(3).max(30).required().label('managerName'),
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
            Therapy Center Name
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
            <Text color="red.500">
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
            Complete Address
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
            <Text color="red.500">
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
            Email
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
            <Text color="red.500">{errors.Email.message as string}</Text>
          )}
        </GridItem>
        <GridItem>
          <FormLabel
            display="inline"
            m="0em"
            letterSpacing="0.256px"
            color="#15134B"
          >
            Manager's Name
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
            <Text color="red.500">{errors.managerName.message as string}</Text>
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
export default GeneralInfoForm;
