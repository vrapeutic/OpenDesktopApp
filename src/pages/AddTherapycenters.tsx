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
import { getMe } from "@renderer/cache";

export default function AddTherapycenters() {
  const totalSteps = 4;
  const [sliding, setSliding] = useState(1);
  const [formData, setFormData] = useState({});

  const handleFormSubmit = (data) => {
    console.log(data);
    setFormData({ ...formData, ...data });
    return { ...formData, ...data }
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
        return (
          <GeneralInfoForm
            onSubmit={handleFormSubmit}
            nextHandler={nextHandler}
            backHandler={backHandler}
            sliding={sliding}
          />
        );
      case 2:
        return (
          <SpecialtyForm
            onSubmit={handleFormSubmit}
            nextHandler={nextHandler}
            backHandler={backHandler}
            sliding={sliding}
          />
        );
      case 3:
        return (
          <EductionIInfoForm
            onSubmit={handleFormSubmit}
            nextHandler={nextHandler}
            backHandler={backHandler}
            sliding={sliding}
          />
        );
      case 4:
        return (
          <ContactForm
            onSubmit={handleFormSubmit}
            nextHandler={nextHandler}
            backHandler={backHandler}
            sliding={sliding}
            formData={formData}
          />
        );
      default:
        return null;
    }
  };

  const getToken = getMe()
console.log(getToken.token)

  return (
    <>
      <Box bg="#FFFFFF" borderRadius="10px" m="5.875em 2.625em 5.875em 2.375em">
        {renderFormStep()}
      </Box>
    </>
  );
}
