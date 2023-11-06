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
import ContactForm from "@renderer/features/AddCenterForm/ContactForm";
import EductionIInfoForm from "@renderer/features/AddCenterForm/EductionIInfoForm";
import GeneralInfoForm from "@renderer/features/AddCenterForm/GeneralInfoForm";
import SpecialtyForm from "@renderer/features/AddCenterForm/SpecialtyForm";
import { Step, Steps } from "chakra-ui-steps";
import { CheckIcon } from "@chakra-ui/icons";

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

  const steps = [
    { label: "Step 1", icon: <CheckIcon /> },
    { label: "Step 2", icon: <CheckIcon /> },
    { label: "Step 3", icon: <CheckIcon /> },
    { label: "Step 4", icon: <CheckIcon /> },
  ];

  return (
    <>
      <Box bg="#FFFFFF" borderRadius="10px" m="5.875em 2.625em 5.875em 2.375em">
        <Divider mt="10em" />
        <HStack spacing="2" mb="1em">
          {steps.map((step, index) => (
            <Stack direction="column" align="center" key={index}>
              {index < sliding ? (
                <Box bg="#4AA6CA" borderRadius="50%" p="0.5em" color="white">
                  {step.icon}
                </Box>
              ) : (
                <Box bg="gray.300" borderRadius="50%" p="0.5em">
                  {index + 1}
                </Box>
              )}
              <Text fontSize="sm">{step.label}</Text>
            </Stack>
          ))}
        </HStack>
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
