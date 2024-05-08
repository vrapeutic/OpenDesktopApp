import { useForm } from 'react-hook-form';
import Joi from 'joi';
import {
  Button,
  Text,
  Box,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { SignupFormProps } from '../SignUp/signupFormInterface';
import { ChevronDownIcon } from '@chakra-ui/icons';

import ProgressBarSignup from '../../theme/components/ProgressBarSignup';
import { useEffect, useState } from 'react';
import { config } from '@renderer/config';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { useAdminContext } from '@renderer/Context/AdminContext';

const Assigntocenter: React.FC<SignupFormProps> = ({
  onSubmit,
  nextHandler,
  formData,
}) => {
  const schema = Joi.object({
    Name: Joi.string()

      .min(3)
      .max(30)

      .required(),
    Email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    Password: Joi.string().min(4).required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onTouched',
  });
  const [centers, setCenters] = useState([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const { otp } = useAdminContext();

  const FormonSubmit = (data: {
    Name: string;
    Email: string;
    password: string;

    specializationschema: any[];
  }) => {
    onSubmit(data);

    nextHandler();
  };
  const handleClick = (center: object) => {
    console.log('selected center', center);
  };

  const headers = {
    otp: `${otp}`,
  };

  useEffect(() => {
    (async () => {
    //   const token = await (window as any).electronAPI.getPassword('token');
      //   fetch(`${config.apiURL}/api/v1/doctors/home_centers`, {
      //     method: 'Get',
      //     redirect: 'follow',
      //     headers: { Authorization: `Bearer ${token}` },
      //   })
      await axios
        .get(`${config.apiURL}/api/v1/admins/centers`, { headers })
        .then((response) => {console.log("response",response)})
        .then((result) => {
            console.log("result",result)
            console.log("result data",result?.data)

          setCenters(result.data);
        })
        .catch((error) => console.log('error', error));
    })();
  }, []);

  return (
    <>
      <Box
        bg="#FFFFFF"
        borderRadius="10px"
        m="5.875em 2.625em 5.875em 2.375em"
        as="form"
        onSubmit={handleSubmit(FormonSubmit)}
      >
        {/* <ProgressBarSignup index={0} /> */}
        <Grid
          m="2.625em 1.5em 0em 1.5em"
          templateColumns="repeat(2, 1fr)"
          gap="0em 1.5625em"
        >
          <GridItem>
            {/* <FormLabel
              display="inline"
              m="0em"
              letterSpacing="0.256px"
              color="#15134B"
            >
              Name
            </FormLabel>

            <Input
              {...register('Name')}
              id="Name"
              borderColor="#4965CA"
              border="2px solid #E8E8E8"
              _hover={{ border: '1px solid #4965CA' }}
              boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
              type="text"
              mt="0.75em"
              mb="1em"
              borderRadius="8px"
            />
            {errors.Name && (
              <Text color="red.500">{errors.Name.message as string}</Text>
            )} */}
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                bgColor="#FFFFFF"
                border="2px solid #00DEA3"
                borderRadius="8px"
                color="#00DEA3"
                marginLeft="200px"
                marginTop="45px"
              >
                Centers
              </MenuButton>
              <MenuList>
                {centers?.map((center) => (
                  <MenuItem key={center.id} onClick={() => handleClick(center)}>
                    {center.attributes.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </GridItem>
          <GridItem>
            {/* <FormLabel
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
            />
            {errors.Email && (
              <Text color="red.500">{errors.Email.message as string}</Text>
            )} */}
            <DatePicker
              showIcon
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
            />
          </GridItem>

          <GridItem>
            <FormLabel
              display="inline"
              m="0em"
              letterSpacing="0.256px"
              color="#15134B"
            >
              Password
            </FormLabel>

            <Input
              {...register('Password')}
              id="Password"
              borderColor="#4965CA"
              border="2px solid #E8E8E8"
              _hover={{ border: '1px solid #4965CA' }}
              boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
              type="Password"
              mt="0.75em"
              mb="1em"
              borderRadius="8px"
            />
            {errors.Password && (
              <Text color="red.500">{errors.Password.message as string}</Text>
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
        </Flex>
      </Box>
    </>
  );
};
export default Assigntocenter;
