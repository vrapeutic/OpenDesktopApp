import React, { useState, useEffect } from "react";
import {
  Box,
 
} from "@chakra-ui/react";
import ContactForm from "../features/AddCenterForm/ContactForm";
import EductionIInfoForm from "../features/AddCenterForm/EductionIInfoForm";
import GeneralInfoForm from "../features/AddCenterForm/GeneralInfoForm";
import SpecialtyForm from "../features/AddCenterForm/SpecialtyForm";

export default function AddTherapycenters() {
  const totalSteps = 4;
  const [sliding, setSliding] = useState(1);
  const [formData, setFormData] = useState({});

  const handleFormSubmit = (data:any) => {
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



  return (
    <>
      <Box bg="#FFFFFF" borderRadius="10px" m="5.875em 2.625em 5.875em 2.375em">
        {renderFormStep()}
      </Box>
    </>
  );
}
