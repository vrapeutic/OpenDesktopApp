import React from 'react';
import {
  Text,
  Step,
  StepIcon,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Flex,
  Box,
} from '@chakra-ui/react';
import { Info } from '../../assets/icons/Info';
import { Contact } from '../../assets/icons/Contact';
import { Documents } from '../../assets/icons/Documents';
import { Specialty } from '../../assets/icons/Specialty';
import { Star } from '@renderer/assets/icons/Star';

export default function ProgressbarSignup(props: any) {
  const steps = [
    { title: 'General info', icon: <Info /> },
    { title: 'Specialty', icon: <Star /> },
    { title: 'Education info', icon: <Documents /> },
    // { title: 'Contact', icon: <Contact /> },
  ];

  const activeStatus = {
    backgroundColor: '#00DEA3',
    height: '52px',
    width: '52px',
    borderRadius: '50%',
    paddingTop: '22%',
    color: '#00DEA3',
  };

  const title = {
    marginTop: '25px',
    width: '120px',
    textAlign: 'center',
  };

  const inCompleteStatus = {
    marginTop: '45px',
  };

  const inCompleteTitle = {
    width: '150px',
    marginTop: '20px',

    color: '#A0A0A0',
    textAlign: 'center',
  };

  return (
    <>
      <Stepper
        index={props.index}
        position="relative"
        my="15px"
        mx={50}
        h="101px"
        colorScheme="whatsapp"
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <Flex direction="column" justifyContent="center">
              <StepIndicator
                top="32px"
                left="206px"
                w="62px"
                h="62px"
                margin="5px"
              >
                <StepStatus
                  complete={
                    <Box
                      flexDirection="row"
                      alignItems="center"
                      pt="32px"
                      color="#00DEA3"
                      textAlign="center"
                    >
                      <StepIcon
                        bgColor="#00DEA3"
                        h="62px"
                        w="62px"
                        borderRadius="50%"
                        color="#FFFFFF"
                      />
                      <StepTitle style={{ width: '100px' }}>
                        {step.title}
                      </StepTitle>
                    </Box>
                  }
                  incomplete={
                    <Flex
                      flexDirection="column"
                      alignItems="center"
                      style={inCompleteStatus}
                    >
                      {step.icon}{' '}
                      <StepTitle
                        style={{
                          width: '150px',
                          marginTop: '20px',
                          color: '#A0A0A0',
                          textAlign: 'center',
                        }}
                      >
                        {step.title}
                      </StepTitle>
                    </Flex>
                  }
                  active={
                    <Flex
                      flexDirection="column"
                      alignItems="center"
                      style={activeStatus}
                    >
                      {step.icon}{' '}
                      <StepTitle
                        style={{
                          marginTop: '25px',
                          width: '120px',
                          textAlign: 'center',
                        }}
                      >
                        {step.title}
                      </StepTitle>
                    </Flex>
                  }
                />
              </StepIndicator>

              <Text
                position="absolute"
                marginTop="100px"
                h="18px"
                w="109px"
                fontFamily="Graphik LCG"
                fontWeight="400"
                fontSize="18px"
                lineHeight="18px"
              ></Text>
            </Flex>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </>
  );
}
