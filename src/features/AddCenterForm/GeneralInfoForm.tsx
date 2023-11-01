import { useForm, Controller } from "react-hook-form";
import joi from "joi";
import {
 
  Button,
  FormControl,
  Text,
  Box,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
} from "@chakra-ui/react";
import { joiResolver } from "@hookform/resolvers/joi";

export default function GeneralInfoForm() {
  const schema = joi.object({
    firstName: joi
      .string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .label("firstName"),
    lastName: joi
      .string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .label("lastName"),
    workEmail: joi
      .string()
      .email({ tlds: { allow: false } })
      .required(),
    personalEmail: joi
      .string()
      .email({ tlds: { allow: false } })
      .required(),
    completeAddress: joi.string().required(),
    Bio: joi.string().required(),
    // password: joi.string().required(),
    // repeatPassword: joi.ref("password"),
    // birthYear: joi.number().integer().min(1900).max(new Date().getFullYear()),
    // remember: joi.boolean(),
  });

  const { control, handleSubmit } = useForm({
    resolver: joiResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = (data:object) => {
    alert(JSON.stringify(data));
    console.log("data:", data);
  };

  return (
    <>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid
          m="2.625em 1.5em 0em 1.5em"
          templateColumns="repeat(2, 1fr)"
          gap="0em 1.5625em"
        >
          <GridItem>
            <Controller
              control={control}
              name="firstName"
              render={({ field, fieldState: { error } }) => (
                <FormControl isRequired isInvalid={!!error}>
                  <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                    FirstName
                  </FormLabel>
                  <Input
                    {...field}
                    id="firstName"
                    autoComplete="firstName"
                    borderColor="#4965CA"
                    border="2px solid #E8E8E8"
                    _hover={{ border: "1px solid #4965CA" }}
                    boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
                    type="text"
                    mt="0.75em"
                    mb="1em"
                    borderRadius="8px"
                  />
                  {error && <Text color="red.500">{error.message}</Text>}
                </FormControl>
              )}
            />
          </GridItem>
          <GridItem>
            <Controller
              control={control}
              name="lastName"
              render={({ field, fieldState: { error } }) => (
                <FormControl isRequired isInvalid={!!error}>
                  <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                    lastName
                  </FormLabel>
                  <Input
                    {...field}
                    id="lastName"
                    autoComplete="lastName"
                    borderColor="#4965CA"
                    border="2px solid #E8E8E8"
                    _hover={{ border: "1px solid #4965CA" }}
                    boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
                    type="text"
                    mt="0.75em"
                    mb="1em"
                    borderRadius="8px"
                  />
                  {error && <Text color="red.500">{error.message}</Text>}
                </FormControl>
              )}
            />
          </GridItem>
          <GridItem>
            <Controller
              control={control}
              name="workEmail"
              render={({ field, fieldState: { error } }) => (
                <FormControl isRequired isInvalid={!!error}>
                  <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                    workEmail
                  </FormLabel>
                  <Input
                    {...field}
                    id="workEmail"
                    autoComplete="workEmail"
                    borderColor="#4965CA"
                    border="2px solid #E8E8E8"
                    _hover={{ border: "1px solid #4965CA" }}
                    boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
                    type="email"
                    mt="0.75em"
                    mb="1em"
                    borderRadius="8px"
                  />
                  {error && <Text color="red.500">{error.message}</Text>}
                </FormControl>
              )}
            />
          </GridItem>
          <GridItem>
            <Controller
              control={control}
              name="personalEmail"
              render={({ field, fieldState: { error } }) => (
                <FormControl isRequired isInvalid={!!error}>
                  <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                    workEmail
                  </FormLabel>
                  <Input
                    {...field}
                    id="personalEmail"
                    autoComplete="personalEmail"
                    borderColor="#4965CA"
                    border="2px solid #E8E8E8"
                    _hover={{ border: "1px solid #4965CA" }}
                    boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
                    type="email"
                    mt="0.75em"
                    mb="1em"
                    borderRadius="8px"
                  />
                  {error && <Text color="red.500">{error.message}</Text>}
                </FormControl>
              )}
            />
          </GridItem>
          <GridItem>
            <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
              Gender
            </FormLabel>
            <Select
              placeholder=" "
              borderColor="#4965CA"
              border="2px solid #E8E8E8"
              _hover={{ border: "1px solid #4965CA" }}
              boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
              mt="0.75em"
              mb="1em"
              borderRadius="8px"
            >
              <option>Male</option>
              <option>Female</option>
            </Select>
          </GridItem>
          <GridItem>
            <Controller
              control={control}
              name="completeAddress"
              render={({ field, fieldState: { error } }) => (
                <FormControl isRequired isInvalid={!!error}>
                  <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                    completeAddress
                  </FormLabel>
                  <Input
                    {...field}
                    id="completeAddress"
                    autoComplete="completeAddress"
                    borderColor="#4965CA"
                    border="2px solid #E8E8E8"
                    _hover={{ border: "1px solid #4965CA" }}
                    boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
                    type="text"
                    mt="0.75em"
                    mb="1em"
                    borderRadius="8px"
                  />
                  {error && <Text color="red.500">{error.message}</Text>}
                </FormControl>
              )}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <Controller
              control={control}
              name="Bio"
              render={({ field, fieldState: { error } }) => (
                <FormControl isRequired isInvalid={!!error}>
                  <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                    Bio
                  </FormLabel>
                  <Input
                    {...field}
                    id="Bio"
                    autoComplete="Bio"
                    h="5.5em"
                    borderColor="#4965CA"
                    border="2px solid #E8E8E8"
                    _hover={{ border: "1px solid #4965CA" }}
                    boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
                    type="text"
                    mt="0.75em"
                    mb="3.875em"
                    borderRadius="8px"
                  />
                  {error && <Text color="red.500">{error.message}</Text>}
                </FormControl>
              )}
            />
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
              submit
            </Button>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
