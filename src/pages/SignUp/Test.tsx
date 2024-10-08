import {
    Step,
    StepIcon,
    StepIndicator,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    Flex,
    Text,
  } from '@chakra-ui/react';


  import { Info } from '../../assets/icons/InfoSvg';

  const ProgressBarAddSginUP = (props: any) => {
    const steps = [
      { title: 'General info', icon: <Info /> },
      // { title: 'Specialty', icon: <Star /> },
      // { title: 'Education info', icon: <Documents /> },
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
      marginTop: '35px',
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
        
         my="15px"
          w="80%"
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
                      <Flex
                        flexDirection="row"
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
                        <StepTitle style={{ width: '100px', marginLeft: '20px' }}>
                          {step.title}
                        </StepTitle>
                      </Flex>
                    }
                    incomplete={
                      <Flex
                        flexDirection="column"
                        alignItems="center"
                        style={inCompleteStatus}
                      >
                        {step.icon}{' '}
                        <StepTitle style={inCompleteTitle}>
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
                        <StepTitle style={title}>{step.title}</StepTitle>
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
  };
  
  export default ProgressBarAddSginUP;