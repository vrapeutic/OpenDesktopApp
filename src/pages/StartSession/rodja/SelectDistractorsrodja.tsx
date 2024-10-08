import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormErrorMessage,
  Stack,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useNavigate } from 'react-router-dom';
import { useStartSessionContext } from '@renderer/Context/StartSesstionContext';
import Openconnected from '../openconnected';
import OpenconnectedRodja from './OpenconnectedRodja';
import useSocketManager from '@renderer/Context/SocketManagerProvider';
import usePopupsHandler from '@renderer/Context/PopupsHandlerContext';
import { MODULE_PACKAGE_KEY, START_APP_MESSAGE } from '@main/constants';
import { ErrorPopup } from '../ErrorPopup';

const useSocketErrorHandler = () => {
  const [socketErrorState, setSocketErrorState] = useState(null);
  const { socketError } = useSocketManager();

  useEffect(() => {
    if (socketError) {
      console.log('Socket error detected:', socketError); // Logging for debugging
      setSocketErrorState(socketError);
    }
  }, [socketError]);

  return { socketErrorState, setSocketErrorState };
};

const SelectDistractorsRodja = (props: any) => {
  const navigate = useNavigate();
  const { module, sessionId, headsetKey } = useStartSessionContext();
  const {
    isOpen: isOpenConnected,
    onOpen: onOpenConnected,
    onClose: onCloseConnected,
  } = useDisclosure();
  const [notFound, setNotFound] = useState(false);
  const [errorMEssage, setErrorMEssage] = useState(null);
  const { socketErrorState, setSocketErrorState } = useSocketErrorHandler();
  const {
    dispatchSocketMessage,
    checkIfServiceExists,
    checkAppNetWorkConnection,
  } = useSocketManager();
  const { popupFunctions } = usePopupsHandler();
  const { closeSelectingAHeadset, closeSelectingAModule } = popupFunctions;
  const [selectedDistractor, setselectedDistractor] = useState<number | null>(null);
  const toast = useToast();
  const toastIdRef:any = useRef();
  const schema = joi.object({
    selectDistractor: joi.number().required(),
  });
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onTouched',
  });

  const handleFormSubmit = async (data: any) => {
    const existingDevice = await checkIfServiceExists(headsetKey);
    const appIsConnectedToInternet = await checkAppNetWorkConnection(); //TODO: consider move this flow to HOC
    if (appIsConnectedToInternet && existingDevice) {
      // if (appIsConnectedToInternet) {

      const updatedFormData = [
        props.formData[0],
        props.formData[1],
        props.selectBook,
        data.selectDistractor,
        ...props.formData.slice(4),
      ];

      console.log('all subimtted data in distractor', updatedFormData);
      props.setFormData(updatedFormData);
      console.log('updatedFormData', updatedFormData);
      const socketMessage = {
        sessionId,
        [MODULE_PACKAGE_KEY]: module,
        deviceId: headsetKey,
      };
      dispatchSocketMessage(
        START_APP_MESSAGE,
        socketMessage,
        headsetKey,
        updatedFormData
      );
      navigate('/home');
      props.onClose();
      onOpenConnected();
      toastIdRef.current = toast({
        title: 'Success',
        description: (
          <Box>
            {`You assigned level ${updatedFormData[0]} , environment ${props.formData[1]} , jewel ${props.selectBook},
         distractor  ${selectedDistractor} 
        module name is ${module} and session id is ${sessionId}`}
            <Button
             color={"white"}
              width={3}
              height={5}
              onClick={() => {
                if (toastIdRef.current) {
                 
                  toast.close(toastIdRef.current);
                }
              }}
            position={"absolute"}
       
            top={3}
            right={3}
          
            >
          x
            </Button>
          </Box>
        ),
        status: 'success',
        duration: null,
        position: 'bottom-left',
        onCloseComplete: () => {
          console.log('Toast has been removed.');
          // Additional logic for when the toast is removed
        },
      });
      console.log(
        `You assigned level ${updatedFormData[0]} , environment ${props.formData[1]} , jewel ${props.selectBook},
         distractor  ${selectedDistractor} 
        module name is ${module} and session id is ${sessionId}`
      );
      console.log('Array of menu choices', updatedFormData);
    } else {
      console.log(headsetKey);
      console.log(existingDevice);
      const errorMessage = !appIsConnectedToInternet
        ? 'You are not connected to the internet'
        : 'No headset found';

      console.log(errorMessage);
      setErrorMEssage(errorMessage);
      setSocketErrorState(socketErrorState);
      setNotFound(true);
    }
  };

  const handleBackToSelectBook = () => {
    props.onClose();
  };

  const handleButtonClick = (distractor: number) => {
    setselectedDistractor(distractor);
    setValue('selectDistractor', distractor);
  };

  const cancelSession = () => {
    setNotFound(false);
    closeSelectingAModule();
    closeSelectingAHeadset();
    navigate('/home');
  };

  const closeErrorModal = () => {
    setNotFound(false);
    closeSelectingAModule();
  };

  const selectAnotherHeadset = () => {
    setNotFound(false);
    closeSelectingAModule();
  };

  useEffect(() => {
    if (socketErrorState) {
      console.log('Socket Error:', socketErrorState);
      setNotFound(true);
      props.onClose();
    }
  }, [socketErrorState]);
  const closeAllModalsAndToast = () => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  
  }
  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <ModalOverlay />
        <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
          <Box borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            <ModalCloseButton marginLeft="100px" />
          </Box>
          <ModalHeader textAlign="center" fontSize="1rem">
            Select Distractors
          </ModalHeader>

          <ModalBody fontSize="20px" fontWeight="600" mt="25px">
            <FormControl isInvalid={!!errors.selectLevel}>
              <Stack spacing={4} direction="column" align="center">
                <Button
                  onClick={() => handleButtonClick(1)}
                  bg={selectedDistractor === 1 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectDistractor')}
                  value={1}
                >
                  1
                </Button>

                <Button
                  onClick={() => handleButtonClick(2)}
                  bg={selectedDistractor === 2 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectDistractor')}
                  value={2}
                >
                  2
                </Button>
                <Button
                  onClick={() => handleButtonClick(3)}
                  bg={selectedDistractor === 3 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectDistractor')}
                  value={3}
                >
                  3
                </Button>
              </Stack>
              <FormErrorMessage>
                {errors.selectDistractor && 'Please select a Distractor.'}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="space-between">
            <Button
              w="180px"
              h="54px"
              bg="#00DEA3"
              borderRadius="12px"
              color="#FFFFFF"
              fontFamily="Graphik LCG"
              fontWeight="700"
              fontSize="15px"
              onClick={handleBackToSelectBook}
              mx={2}
            >
              Back to Select Jewel
            </Button>
            <Button
              w="180px"
              h="54px"
              bg="#00DEA3"
              borderRadius="12px"
              color="#FFFFFF"
              fontFamily="Graphik LCG"
              fontWeight="700"
              fontSize="15px"
              onClick={handleSubmit(handleFormSubmit)}
              mx={2}
            >
              Play
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {notFound ? (
        <ErrorPopup
          isOpen={notFound || !!socketErrorState}
          onClose={closeErrorModal}
          closeSelectingAHeadset={closeSelectingAHeadset}
          onCancelSession={cancelSession}
          onSelectAnotherHeadset={selectAnotherHeadset}
          errorMessages={errorMEssage || socketErrorState}
        />
      ) : (
        <OpenconnectedRodja
          isOpen={isOpenConnected}
          onClose={onCloseConnected}
          onclosemodules={props.onclosemodules}
          onCloseSelectEnvrodja={props.onCloseSelectEnvrodja}
          oncloseselectlevel={props.oncloseselectlevel}
          onCloseSelectJewel={props.onCloseSelectJewel}
          onCloseSelectDistractors={props.onClose}
          closeAllModalsAndToast={closeAllModalsAndToast}
          closeAllModals={closeAllModalsAndToast}
        />
      )}
      {/* {onOpenConnected && (
        <OpenconnectedRodja
          isOpen={isOpenConnected}
          onClose={onCloseConnected}
          onclosemodules={props.onclosemodules}
          onCloseSelectEnvrodja={props.onCloseSelectEnvrodja}
          oncloseselectlevel={props.oncloseselectlevel}
          onCloseSelectJewel={props.onCloseSelectJewel}
          onCloseSelectDistractors={props.onClose}
        />
      )} */}
    </>
  );
};

export default SelectDistractorsRodja;
