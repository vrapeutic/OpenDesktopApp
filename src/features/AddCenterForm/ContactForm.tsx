import { FormLabel, Grid, GridItem, Input } from "@chakra-ui/react";

export default function ContactForm() {
  return (
    <>
      <Grid
        m="2.625em 1.5em 0em 1.5em"
        templateColumns="repeat(2, 1fr)"
        gap="0em 1.5625em">
        <GridItem>
          <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
            Phone number 1
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
            Social media
          </FormLabel>
          <Input
            placeholder="Facebook.com/"
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
            Website
          </FormLabel>
          <Input
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: "1px solid #4965CA" }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="text"
            mt="0.75em"
            mb="9.3125em"
            borderRadius="8px"
          />
        </GridItem>
        <GridItem>
          <Input
            placeholder="Linkedin.com/"
            borderColor="#4965CA"
            border="2px solid #E8E8E8"
            _hover={{ border: "1px solid #4965CA" }}
            boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
            type="email"
            mt="2.3125em"
            mb="9.3125em"
            borderRadius="8px"
          />
        </GridItem>
      </Grid>
    </>
  );
}
