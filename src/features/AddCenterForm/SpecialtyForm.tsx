import { FormLabel, Grid, GridItem, Input } from "@chakra-ui/react";

export default function SpecialtyForm() {
  return (
    <>
      <Grid
        m="2.625em 1.5em 0em 1.5em"
        templateColumns="repeat(2, 1fr)"
        gap="0em 1.5625em">
        <GridItem colSpan={2}>
          <FormLabel
            display="inline"
            m="0em"
            letterSpacing="0.256px"
            color="#15134B">
            Specialty information
          </FormLabel>
          <FormLabel
            pl="0.5em"
            display="inline"
            m="0em"
            fontSize="0.75em"
            letterSpacing="0.192px"
            color="#8D8D8D">
            (description)
          </FormLabel>
          <Input
            h="5.5em"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: "1px solid #4965CA" }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb="3.5em"
            borderRadius="8px"
          />
        </GridItem>
        <GridItem>
          <FormLabel
            display="inline"
            m="0em"
            letterSpacing="0.256px"
            color="#15134B">
            Choose specializations
          </FormLabel>
          <FormLabel
            pl="0.5em"
            display="inline"
            m="0em"
            fontSize="0.75em"
            letterSpacing="0.192px"
            color="#8D8D8D">
            (like tags, for example, ADHD, Autism, etc.)
          </FormLabel>
          <Input
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: "1px solid #4965CA" }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="name"
            mt="0.75em"
            mb="5.1875em"
            borderRadius="8px"
          />
        </GridItem>
        <GridItem>
          <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
            Registration number
          </FormLabel>
          <Input
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: "1px solid #4965CA" }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="name"
            mt="0.75em"
            mb="5.1875em"
            borderRadius="8px"
          />
        </GridItem>
      </Grid>
    </>
  );
}
