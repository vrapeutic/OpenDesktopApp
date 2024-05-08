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
} from '@chakra-ui/react';
import { Info } from '../../assets/icons/Info';
import { Contact } from '../../assets/icons/Contact';
import { Documents } from '../../assets/icons/Documents';
import { Specialty } from '../../assets/icons/Specialty';

export default function ProgressbarSignup(props: any) {
  const steps = [
    { title: 'General info', icon: <Info /> },
    { title: 'Specialty', icon: <Specialty /> },
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
    marginLeft: '30px',
    width: '120px',
  };

  const inCompleteStatus = {
    marginTop: '45px',
  };

  const inCompleteTitle = {
    width: '150px',
    marginTop: '20px',
    marginLeft: '80px',
    color: '#A0A0A0',
  };

  return (
    <>
       <Stepper
        index={props.index}
        position="relative"
        top="27px"
        left="50%"
        transform="translateX(-50%)"
        w={{ base: '90vw', md: '756px' }}
        h="132px"
        colorScheme="whatsapp"
        overflowX="hidden"
        paddingLeft={'50px'}
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <Flex direction="column" justifyContent="center">
              <StepIndicator
                top="32px"
                left={`calc(${index} * (100% / ${steps.length}))`}
                transform="translateX(-50%)"
                w={{ base: '30%', md: '62px' }}
                h="62px"
                margin="5px"
              >
                <StepStatus
                  complete={
                    <Flex
                      flexDirection="column"
                      alignItems="center"
                      pt="22px"
                      color="#00DEA3"
                    >
                      <StepIcon
                        bgColor="#00DEA3"
                        h="62px"
                        w="62px"
                        borderRadius="50%"
                        color="#FFFFFF"
                      />
                      <StepTitle>{step.title}</StepTitle>
                    </Flex>
                  }
                  incomplete={
                    <Flex
                      flexDirection="column"
                      alignItems="center"
                      style={{ marginTop: '45px' }}
                    >
                      {step.icon}{' '}
                      <StepTitle
                        style={{
                          width: '150px',
                          marginTop: '20px',
                          marginLeft: '80px',
                          color: '#A0A0A0',
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
                      style={{
                        backgroundColor: '#00DEA3',
                        height: '62px',
                        width: '62px',
                        borderRadius: '50%',
                        paddingTop: '22%',
                        color: '#00DEA3',
                      }}
                    >
                      {step.icon}{' '}
                      <StepTitle
                        style={{
                          marginTop: '35px',
                          marginLeft: '30px',
                          width: '120px',
                        }}
                      >
                        {step.title}
                      </StepTitle>
                    </Flex>
                  }
                />
              </StepIndicator>
            </Flex>
            {index !== steps.length - 1 && <StepSeparator />}
          </Step>
        ))}
      </Stepper>
    </>
  );
}
