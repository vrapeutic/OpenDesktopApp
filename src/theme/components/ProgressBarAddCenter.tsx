// import {
//   Step,
//   StepIcon,
//   StepIndicator,
//   StepSeparator,
//   StepStatus,
//   StepTitle,
//   Stepper,
//   Flex,
//   Text,
// } from '@chakra-ui/react';
// import { ArrowDown } from '../../assets/icons/ArrowDown';

// const ProgressBarAddCenter = (props: any) => {
//   const steps = [
//     { title: 'General info', icon: <ArrowDown /> },
//     { title: 'Specialty', icon: <ArrowDown /> },
//     { title: 'Education info', icon: <ArrowDown /> },
//     { title: 'Contact', icon: <ArrowDown /> },
//   ];

//   return (
//     <>
//       <Stepper
//         index={props.index}
//         position="relative"
//         top="27px"
//         left="50%"
//         transform="translateX(-50%)"
//         w={{ base: "90%", md: "756px" }}
//         h="101px"
//         colorScheme="whatsapp"
//         overflowX="hidden"
//       >
//         {steps.map((step, index) => (
//           <Step key={index}>
//             <Flex direction="column" justifyContent="center">
//               <StepIndicator
//                 top="32px"
//                 left={{ base: "50%", md: "206px" }}
//                 transform="translateX(-50%)"
//                 w={{ base: "30%", md: "62px" }}
//                 h="62px"
//                 margin="5px"
//               >
//                 <StepStatus
//                   complete={
//                     <Flex
//                       flexDirection="column"
//                       alignItems="center"
//                       pt="22px"
//                       color="#00DEA3"
//                     >
//                       <StepIcon
//                         bgColor="#00DEA3"
//                         h="62px"
//                         w="62px"
//                         borderRadius="50%"
//                         color="#FFFFFF"
//                       />
//                       <StepTitle>{step.title}</StepTitle>
//                     </Flex>
//                   }
//                   incomplete={
//                     <Flex
//                       flexDirection="column"
//                       alignItems="center"
//                       style={{ marginTop: '45px' }}
//                     >
//                       {step.icon}{' '}
//                       <StepTitle
//                         style={{
//                           width: '150px',
//                           marginTop: '20px',
//                           marginLeft: '80px',
//                           color: '#A0A0A0',
//                         }}
//                       >
//                         {step.title}
//                       </StepTitle>
//                     </Flex>
//                   }
//                   active={
//                     <Flex
//                       flexDirection="column"
//                       alignItems="center"
//                       style={{
//                         backgroundColor: '#00DEA3',
//                         height: '62px',
//                         width: '62px',
//                         borderRadius: '50%',
//                         paddingTop: '22%',
//                         color: '#00DEA3',
//                       }}
//                     >
//                       {step.icon}{' '}
//                       <StepTitle
//                         style={{
//                           marginTop: '35px',
//                           marginLeft: '30px',
//                           width: '120px',
//                         }}
//                       >
//                         {step.title}
//                       </StepTitle>
//                     </Flex>
//                   }
//                 />
//               </StepIndicator>
//             </Flex>
//             <StepSeparator />
//           </Step>
//         ))}
//       </Stepper>
//     </>
//   );
// };

// export default ProgressBarAddCenter;

// import {
//   Step,
//   StepIcon,
//   StepIndicator,
//   StepSeparator,
//   StepStatus,
//   StepTitle,
//   Stepper,
//   Flex,
//   Text,
// } from '@chakra-ui/react';
// import { ArrowDown } from '../../assets/icons/ArrowDown';

// const ProgressBarAddCenter = (props: any) => {
//   const steps = [
//     { title: 'General info', icon: <ArrowDown /> },
//     { title: 'Specialty', icon: <ArrowDown /> },
//     { title: 'Education info', icon: <ArrowDown /> },
//     { title: 'Contact', icon: <ArrowDown /> },
//   ];

//   return (
//     <>
//       <Stepper
//         index={props.index}
//         position="relative"
//         top="27px"
//         left="50%"
//         transform="translateX(-50%)"
//         w={{ base: "90%", md: "756px" }}
//         h="101px"
//         colorScheme="whatsapp"
//         overflowX="hidden"
//       >
//         {steps.map((step, index) => (
//           <Step key={index}>
//             <Flex direction="column" justifyContent="center">
//               <StepIndicator
//                 top="32px"
//                 left={`calc(${index} * (100% / ${steps.length}))`}
//                 transform="translateX(-50%)"
//                 w={{ base: "30%", md: "62px" }}
//                 h="62px"
//                 margin="5px"
//               >
//                 <StepStatus
//                   complete={
//                     <Flex
//                       flexDirection="column"
//                       alignItems="center"
//                       pt="22px"
//                       color="#00DEA3"
//                     >
//                       <StepIcon
//                         bgColor="#00DEA3"
//                         h="62px"
//                         w="62px"
//                         borderRadius="50%"
//                         color="#FFFFFF"
//                       />
//                       <StepTitle>{step.title}</StepTitle>
//                     </Flex>
//                   }
//                   incomplete={
//                     <Flex
//                       flexDirection="column"
//                       alignItems="center"
//                       style={{ marginTop: '45px' }}
//                     >
//                       {step.icon}{' '}
//                       <StepTitle
//                         style={{
//                           width: '150px',
//                           marginTop: '20px',
//                           marginLeft: '80px',
//                           color: '#A0A0A0',
//                         }}
//                       >
//                         {step.title}
//                       </StepTitle>
//                     </Flex>
//                   }
//                   active={
//                     <Flex
//                       flexDirection="column"
//                       alignItems="center"
//                       style={{
//                         backgroundColor: '#00DEA3',
//                         height: '62px',
//                         width: '62px',
//                         borderRadius: '50%',
//                         paddingTop: '22%',
//                         color: '#00DEA3',
//                       }}
//                     >
//                       {step.icon}{' '}
//                       <StepTitle
//                         style={{
//                           marginTop: '35px',
//                           marginLeft: '30px',
//                           width: '120px',
//                         }}
//                       >
//                         {step.title}
//                       </StepTitle>
//                     </Flex>
//                   }
//                 />
//               </StepIndicator>
//             </Flex>
//             {index !== steps.length - 1 && <StepSeparator />}
//           </Step>
//         ))}
//       </Stepper>
//     </>
//   );
// };

// export default ProgressBarAddCenter;

import {
  Step,
  StepIcon,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Flex,
  Box,
  Text,
} from '@chakra-ui/react';
import { ArrowDown } from '../../assets/icons/ArrowDown';
import { Info } from '@renderer/assets/icons/Info';
import { Star } from '@renderer/assets/icons/Star';
import { Documents } from '@renderer/assets/icons/Documents';
import { Contact } from '@renderer/assets/icons/Contact';

const ProgressBarAddCenter = (props: any) => {
  const steps = [
    { title: 'General info', icon: <Info /> },
    { title: 'Specialty', icon: <Star /> },
    { title: 'Education info', icon: <Documents /> },
    { title: 'Contact', icon: <Contact /> },
  ];
  const inCompleteStatus = {
    marginTop: '45px',
  };
  const activeStatus = {
    backgroundColor: '#00DEA3',
    height: '52px',
    width: '52px',
    borderRadius: '50%',
    paddingTop: '22%',
    color: '#00DEA3',
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
                      <StepTitle style={{ width: '120px' }}>
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
                      {step.icon}
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
};

export default ProgressBarAddCenter;
