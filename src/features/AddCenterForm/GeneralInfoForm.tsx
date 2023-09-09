import { FormLabel, Grid, GridItem, Input, Select } from "@chakra-ui/react";

export default function GeneralInfoForm() {
  return (
    <>
      <Grid
        m="2.625em 1.5em 0em 1.5em"
        templateColumns="repeat(2, 1fr)"
        gap="0em 1.5625em">
        <GridItem>
          <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
            First name
          </FormLabel>
          <Input
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: "1px solid #4965CA" }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb="1em"
            borderRadius="8px"
          />
        </GridItem>
        <GridItem>
          <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
            Last name
          </FormLabel>
          <Input
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: "1px solid #4965CA" }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb="1em"
            borderRadius="8px"
          />
        </GridItem>
        <GridItem>
          <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
            Work email
          </FormLabel>
          <Input
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: "1px solid #4965CA" }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="email"
            mt="0.75em"
            mb="1em"
            borderRadius="8px"
          />
        </GridItem>
        <GridItem>
          <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
            Personal email
          </FormLabel>
          <Input
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: "1px solid #4965CA" }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="email"
            mt="0.75em"
            mb="1em"
            borderRadius="8px"
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
            borderRadius="8px">
            <option>Male</option>
            <option>Female</option>
          </Select>
        </GridItem>
        <GridItem>
          <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
            Complete address
          </FormLabel>
          <Input
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: "1px solid #4965CA" }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb="1em"
            borderRadius="8px"
          />
        </GridItem>
        <GridItem colSpan={2}>
          <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
            Bio
          </FormLabel>
          <Input
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
        </GridItem>
      </Grid>
    </>
  );
}
