import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Collapse,
  Divider,
  Flex,
  FormControl,
  HStack,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";
import ContactForm from "../features/AddCenterForm/ContactForm";
import EductionIInfoForm from "../features/AddCenterForm/EductionIInfoForm";
import GeneralInfoForm from "../features/AddCenterForm/GeneralInfoForm";
import SpecialtyForm from "../features/AddCenterForm/SpecialtyForm";


export default function AddTherapycenters() {
  const totalSteps = 4;
  const [sliding, setSliding] = useState(1);
  const [formData, setFormData] = useState({});

  const handleFormSubmit = (data) => {
    console.log(data);
    setFormData({ ...formData, ...data });
  };

  const nextHandler = () => {
    if (sliding < totalSteps) {
      setSliding(sliding + 1);
    }
  };

  const backHandler = () => {
    if (sliding > 1) {
      setSliding(sliding - 1);
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const renderFormStep = () => {
    switch (sliding) {
      case 1:
        return <GeneralInfoForm onSubmit={handleFormSubmit} />;
      case 2:
        return <SpecialtyForm onSubmit={handleFormSubmit} />;
      case 3:
        return <EductionIInfoForm onSubmit={handleFormSubmit} />;
      case 4:
        return <ContactForm onSubmit={handleFormSubmit} />;
      default:
        return null;
    }
  };



  return (
    <>
      <Box bg="#FFFFFF" borderRadius="10px" m="5.875em 2.625em 5.875em 2.375em">
       
        {renderFormStep()}
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
