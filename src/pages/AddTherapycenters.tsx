import { Box, Button, Divider, Flex, FormControl ,  Grid, Text } from "@chakra-ui/react";
import ContactForm from "@renderer/features/AddCenterForm/ContactForm";
import EductionIInfoForm from "@renderer/features/AddCenterForm/EductionIInfoForm";
import GeneralInfoForm from "@renderer/features/AddCenterForm/GeneralInfoForm";
import SpecialtyForm from "@renderer/features/AddCenterForm/SpecialtyForm";
import { useEffect, useState } from "react";

export default function AddTherapycenters() {
  const [sliding, setSliding] = useState(1);
  const [formData, setFormData] = useState({});

  const handleFormSubmit = (data) => {
    console.log(data)
    setFormData({ ...formData, ...data });
  };
  const nextHandler = () => {
    setSliding(sliding + 1);
    // console.log("next");
  };

  const backHandler = () => {
    setSliding(sliding - 1);
    // console.log("back");
  };

  useEffect(() => {
    // handleFormSubmit()
    console.log(formData)
}, [formData]);

  return (
    <>
      <Box bg="#FFFFFF" borderRadius="10px" m="5.875em 2.625em 5.875em 2.375em">
        <Divider mt="10em" />
          {sliding === 1 ? (
            <GeneralInfoForm  onSubmit={handleFormSubmit}  />
          ) : sliding === 2 ? (
            <SpecialtyForm  onSubmit={handleFormSubmit}/>
          ) : sliding === 3 ? (
            <EductionIInfoForm onSubmit={handleFormSubmit}/>
          ) : sliding === 4 ? (
            <ContactForm onSubmit={handleFormSubmit} />
          ) : undefined}
          <Flex flexDirection="row-reverse">
            <Button
              onClick={nextHandler}
              bg="#4AA6CA"
              borderRadius="0.75em"
              w="13.375em"
              h="3.375em"
              mt="0em"
              mr="1.5em"
              mb="2em"
              color="#FFFFFF"
              fontSize="1.125em"
              fontWeight="700">
              Next
            </Button>
            {sliding === 1 ? null : (
              <Button
                bg="#FFFFF"
                borderRadius="0.75em"
                border="2px solid #4AA6CA"
                w="13.375em"
                h="3.375em"
                mt="0em"
                mr="1.9375em"
                mb="2em"
                color="#4AA6CA"
                fontSize="1.125em"
                fontWeight="700">
                Save as draft
              </Button>
            )}
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
                fontWeight="700">
                Back
              </Button>
            )}
          </Flex>
      </Box>
    </>
  );
}
