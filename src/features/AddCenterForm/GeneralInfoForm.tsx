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
  Flex,
} from "@chakra-ui/react";
import { joiResolver } from "@hookform/resolvers/joi";
import Progressbar from "../../theme/components/ProgressBar";
export default function GeneralInfoForm({
  onSubmit,
  nextHandler,
  backHandler,
  sliding,
}) {
  const schema = joi.object({
    therapyCenterName: joi
      .string()
      .min(3)
      .max(30)
      .required()
      .label("therapyCenterName"),

    completeAddress: joi.string().required(),
    Email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required(),
    managerName: joi.string().min(3).max(30).required().label("managerName"),
  });
  const { control, handleSubmit } = useForm({
    resolver: joiResolver(schema),
    mode: "onTouched",
  });

  const FormonSubmit = (data: object) => {
    alert(JSON.stringify(data));
    onSubmit(data);
    nextHandler();
  };

  return (
    <>
      <Progressbar index={0} />
      <Box as="form" onSubmit={handleSubmit(FormonSubmit)}>
        <Grid
          m="2.625em 1.5em 0em 1.5em"
          templateColumns="repeat(2, 1fr)"
          gap="0em 1.5625em"
        >
          <GridItem>
            <Controller
              control={control}
              name="therapyCenterName"
              render={({ field, fieldState: { error } }) => (
                <FormControl isRequired isInvalid={!!error}>
                  <FormLabel
                    display="inline"
                    m="0em"
                    letterSpacing="0.256px"
                    color="#15134B"
                  >
                    therapyCenterName
                  </FormLabel>

                  <Input
                    {...field}
                    id="therapyCenterName"
                    autoComplete="therapyCenterName"
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
              name="completeAddress"
              render={({ field, fieldState: { error } }) => (
                <FormControl isRequired isInvalid={!!error}>
                  <FormLabel
                    display="inline"
                    m="0em"
                    letterSpacing="0.256px"
                    color="#15134B"
                  >
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
          <GridItem>
            <Controller
              control={control}
              name="Email"
              render={({ field, fieldState: { error } }) => (
                <FormControl isRequired isInvalid={!!error}>
                  <FormLabel
                    display="inline"
                    m="0em"
                    letterSpacing="0.256px"
                    color="#15134B"
                  >
                    Email
                  </FormLabel>

                  <Input
                    {...field}
                    id="Email"
                    autoComplete="Email"
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
              name="managerName"
              render={({ field, fieldState: { error } }) => (
                <FormControl isRequired isInvalid={!!error}>
                  <FormLabel
                    display="inline"
                    m="0em"
                    letterSpacing="0.256px"
                    color="#15134B"
                  >
                    managerName
                  </FormLabel>

                  <Input
                    {...field}
                    id="managerName"
                    autoComplete="managerName"
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
    </>
  );
}