import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    FormControl,
    FormErrorMessage,
    useDisclosure,
    useToast,
  } from '@chakra-ui/react';
  import React, { useContext, useEffect, useRef, useState } from 'react';
  import { useForm } from 'react-hook-form';
  import joi from 'joi';
  import { joiResolver } from '@hookform/resolvers/joi';

  import { MODULE_PACKAGE_KEY, START_APP_MESSAGE } from '@main/constants';

  import { useStartSessionContext } from '@renderer/Context/StartSesstionContext';
  import { useNavigate } from 'react-router-dom';
  import useSocketManager from '@renderer/Context/SocketManagerProvider';
  import { ErrorPopup } from '../ErrorPopup';
  import usePopupsHandler from '@renderer/Context/PopupsHandlerContext';
import Screw from './Screw';
  const BallSpeed = (props: any) => {
    const toast = useToast();
 
    const navigate = useNavigate();
    const [notFound, setNotFound] = useState(false);
 
   
    const { popupFunctions } = usePopupsHandler();
    const { closeSelectingAHeadset, closeSelectingAModule } = popupFunctions;
    const { socketError } = useSocketManager();
    const {
      isOpen: isOpenSelectDistractors,
      onOpen: onOpenSelectDistractors,
      onClose: onCloseSelectDistractors,
    } = useDisclosure();
  
    const schema = joi.object({
      selectNumber: joi.number().required(),
    });
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
    const toastIdRef:any = useRef();
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      resolver: joiResolver(schema),
      mode: 'onSubmit',
    });
  
    let updatedFormData;
    const handleFormSubmit = async (data: any) => {
      console.log(data.selectNumber);
      updatedFormData = [
        props.formData[0],
        props.formData[1],
        props.formData[2],
        data.selectNumber,
        ...props.formData.slice(3),
      ];
      props.setFormData(updatedFormData);
  
      console.log('updated form data in number', updatedFormData);
      onOpenSelectDistractors();
    //   if (props.formData[0] === 2 || props.formData[0] === 3) {
    //     onOpenSelectDistractors();
    //   } else {
    //     navigate('/Therapycenters');
  
    //     console.log('session id', sessionId);
  
       
  
    //     toastIdRef.current = toast({
    //       title: 'Success',
    //       description: (
    //         <Box>
    //           {`You assigned level ${updatedFormData[0]}, environment ${props.formData[1]}, Number ${props.selectedNumber}, module name is ${module} and session id is ${sessionId}`}
    //           <Button
    //            color={"white"}
    //             width={3}
    //             height={5}
    //             onClick={() => {
    //               if (toastIdRef.current) {
                   
    //                 toast.close(toastIdRef.current);
    //               }
    //             }}
    //           position={"absolute"}
         
    //           top={3}
    //           right={3}
            
    //           >
    //         x
    //           </Button>
    //         </Box>
    //       ),
    //       status: 'success',
    //       duration: null,
    //       position: 'bottom-left',
    //       onCloseComplete: () => {
    //         console.log('Toast has been removed.');
    //         // Additional logic for when the toast is removed
    //       },
    //     });
    //     const existingDevice = await checkIfServiceExists(headsetKey);
    //     const appIsConnectedToInternet = await checkAppNetWorkConnection(); //TODO: consider move this flow to HOC
    //     if (appIsConnectedToInternet && existingDevice) {
    //       // if (appIsConnectedToInternet ) {
    //       console.log(updatedFormData);
    //       const socketMessage = {
    //         sessionId,
    //         [MODULE_PACKAGE_KEY]: module,
    //         deviceId: headsetKey,
    //       };
  
    //       dispatchSocketMessage(
    //         START_APP_MESSAGE,
    //         socketMessage,
    //         headsetKey,
    //         updatedFormData
    //       );
    //       onOpenConnected();
    //     } else {
    //       console.log(headsetKey);
    //       console.log(existingDevice);
    //       const errorMessage = !appIsConnectedToInternet
    //         ? 'You are not connected to the internet'
    //         : 'No headset found';
  
    //       console.log(errorMessage);
    //       setErrorMEssage(errorMessage);
    //       setNotFound(true);
    //     }
  
    //     console.log(
    //       `You select Kick direction ${updatedFormData[0]} ,Number of Kicks ${props.formData[1]},  Ball Speed ${selectedNumber} ,
    //        module name is ${module} and session id is ${sessionId}`
    //     );
    //     console.log('Array of menu choices', updatedFormData);
    //   }
    };
  
    const handleButtonClick = (number: number) => {
      setSelectedNumber(number);
      setValue('selectNumber', number);
    };
  
    const cancelSession = () => {
      setNotFound(false);
      closeSelectingAModule();
      closeSelectingAHeadset();
      navigate('/');
    };
  
    const closeErrorModal = () => {
      setNotFound(false);
      closeSelectingAModule();
    };
  
    const selectAnotherHeadset = () => {
      setNotFound(false);
      closeSelectingAModule();
    };
  
  
  
  
  
  
    const closeAllModalsAndToast = () => {
      if (toastIdRef.current) {
        toast.close(toastIdRef.current);
      }
    
    };
  
  
  
    if (socketError) {
      return null;
    }
    return (
      <>
        <Modal
          isOpen={props.isOpen}
          onClose={props.onClose}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
            {/* <Box borderBottom="1px solid rgba(0, 0, 0, 0.08)">
              <ModalCloseButton marginLeft="100px" />
            </Box> */}
            <ModalHeader textAlign="center" fontSize="1rem">
            Ball Speed
            </ModalHeader>
  
            <ModalBody fontSize="20px" fontWeight="600" mt="25px">
              <FormControl isInvalid={!!errors.selectNumber}>
                <Stack spacing={4} direction="column" align="center">
                  <Button
                    onClick={() => handleButtonClick(1)}
                    bg={selectedNumber === 1 ? 'blue.300' : 'gray.300'}
                    color="black"
                    width="12em"
                    fontSize="1.2rem"
                    {...register('selectNumber')}
                  >
                    0.7
                  </Button>
                  <Button
                    onClick={() => handleButtonClick(2)}
                    bg={selectedNumber === 2 ? 'blue.300' : 'gray.300'}
                    color="black"
                    width="12em"
                    fontSize="1.2rem"
                    {...register('selectNumber')}
                  >
                     1
                  </Button>
                  <Button
                    onClick={() => handleButtonClick(3)}
                    bg={selectedNumber === 3 ? 'blue.300' : 'gray.300'}
                    color="black"
                    width="12em"
                    fontSize="1.2rem"
                    {...register('selectNumber')}
                  >
                    1.5
                  </Button>
                </Stack>
  
                <FormErrorMessage>
                  {errors.selectNumber && 'Please select a number.'}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter display="flex" justifyContent="space-between">
              <Button
                w="180px"
                h="54px"
                mx={2}
                bg="#00DEA3"
                borderRadius="12px"
                color="#FFFFFF"
                fontFamily="Graphik LCG"
                fontWeight="700"
                fontSize="15px"
                onClick={props.onClose}
              >
                Back
              </Button>
              <Button
                w="180px"
                h="54px"
                mx={2}
                bg="#00DEA3"
                borderRadius="12px"
                color="#FFFFFF"
                fontFamily="Graphik LCG"
                fontWeight="700"
                fontSize="15px"
                onClick={handleSubmit(handleFormSubmit)}
              >
                 Next
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
 
        <Screw
            isOpen={ isOpenSelectDistractors }
            onClose={onCloseSelectDistractors}
            formData={props.formData}
            updatedFormData={updatedFormData}
            selectedNumber={selectedNumber}
            setFormData={props.setFormData}
            onclosemodules={props.onclosemodules}
            onCloseSelectEnvironment={props.onCloseSelectEnvironment}
            onCloseSelectNumber={props.onClose}
            oncloseselectlevel={props.oncloseselectlevel}
          />
        {/* {onOpenConnected && (
          <OpenconnectedArcheeko
            isOpen={isOpenConnected}
            onClose={onCloseConnected}
            onclosemodules={props.onclosemodules}
            onCloseSelectEnvironment={props.onCloseSelectEnvironment}
            SelectDistractors={onCloseSelectDistractors}
            onCloseSelectNumber={props.onClose}
            oncloseselectlevel={props.oncloseselectlevel}
          />
        )} */}
      </>
    );
  };
  
  export default BallSpeed;
  