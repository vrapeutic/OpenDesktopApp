import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Text } from '@chakra-ui/react';
import ContactForm from '../features/AddCenterForm/ContactForm';
import EductionIInfoForm from '../features/AddCenterForm/EductionIInfoForm';
import GeneralInfoForm from '../features/AddCenterForm/GeneralInfoForm';
import SpecialtyForm from '../features/AddCenterForm/SpecialtyForm';

export default function Therapycenters() {
  const totalSteps = 5;
  const [sliding, setSliding] = useState(1);
  const [formData, setFormData] = useState({});

  const handleFormSubmit = (data: any) => {
    setFormData({ ...formData, ...data });
    return { ...formData, ...data };
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
          <>
            <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text
                padding="12px 24px"
                borderRadius="8px"
                fontSize="14px"
                fontFamily="Roboto"
              >
                Therapy Centers
              </Text>

              <Button
                w="143px"
                h="40px"
                ml="24px"
                mt="55px"
                padding="12px 24px"
                bg="#F5B50E"
                borderRadius="8px"
                fontSize="14px"
                fontFamily="Roboto"
                onClick={nextHandler}
                boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
              >
                Add Therapy
              </Button>
            </Grid>
          </>
        );
      case 2:
        return (
          <GeneralInfoForm
            onSubmit={handleFormSubmit}
            nextHandler={nextHandler}
            backHandler={backHandler}
            sliding={sliding}
          />
        );
      case 3:
        return (
          <SpecialtyForm
            onSubmit={handleFormSubmit}
            nextHandler={nextHandler}
            backHandler={backHandler}
            sliding={sliding}
          />
        );
      case 4:
        return (
          <EductionIInfoForm
            onSubmit={handleFormSubmit}
            nextHandler={nextHandler}
            backHandler={backHandler}
            sliding={sliding}
          />
        );
      case 5:
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

  return <>{renderFormStep()}</>;
}
