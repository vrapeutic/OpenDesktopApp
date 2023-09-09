import { FormLabel, Grid, GridItem, Input } from "@chakra-ui/react";

export default function EductionIInfoForm() {
  return (
    <>
      <Grid
        m="2.625em 1.5em 0em 1.5em"
        templateColumns="repeat(2, 1fr)"
        gap="0em 1.5625em">
        <GridItem>
          <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
            Country
          </FormLabel>
          <Input
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: "1px solid #4965CA" }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="name"
            mt="0.75em"
            mb="1em"
            borderRadius="8px"
          />
        </GridItem>
        <GridItem rowSpan={2}>
          <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
            Certification
          </FormLabel>
          <Input
            h="8em"
            w="10.875em"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: "1px solid #4965CA" }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="image"
            mt="0.75em"
            mb="1.5em"
            borderRadius="8px"></Input>
        </GridItem>
        <GridItem>
          <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
            Degree
          </FormLabel>
          <Input
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: "1px solid #4965CA" }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="name"
            mt="0.75em"
            mb="1em"
            borderRadius="8px"
          />
        </GridItem>
        <GridItem>
          <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
            University
          </FormLabel>
          <Input
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: "1px solid #4965CA" }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb="5em"
            borderRadius="8px"
          />
        </GridItem>
        <GridItem>
          <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
            Graduation year
          </FormLabel>
          <Input
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: "1px solid #4965CA" }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb="5em"
            borderRadius="8px"
          />
        </GridItem>
      </Grid>
    </>
  );
}
