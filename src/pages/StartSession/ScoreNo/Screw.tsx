import {
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
  useToast,
  useDisclosure,
  Box,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useNavigate } from 'react-router-dom';
import { useStartSessionContext } from '@renderer/Context/StartSesstionContext';
import useSocketManager from '@renderer/Context/SocketManagerProvider';
import usePopupsHandler from '@renderer/Context/PopupsHandlerContext';
import { ErrorPopup } from '../ErrorPopup';
import { MODULE_PACKAGE_KEY, START_APP_MESSAGE } from '@main/constants';
import OpenconnectedScore from './OpenconnectedScore';

const Screw = (props: any) => {
  const navigate = useNavigate();
  const toast = useToast();
  const toastIdRef: any = useRef();
  const { module, sessionId, headsetKey } = useStartSessionContext();
  const {
    isOpen: isOpenConnected,
    onOpen: onOpenConnected,
    onClose: onCloseConnected,
  } = useDisclosure();

  const [notFound, setNotFound] = useState(false);
  const [errorMEssage, setErrorMEssage] = useState(null);
  const {
    dispatchSocketMessage,
    checkIfServiceExists,
    checkAppNetWorkConnection,
    socketError,
  } = useSocketManager();
  const { popupFunctions } = usePopupsHandler();
  const { closeSelectingAHeadset, closeSelectingAModule } = popupFunctions;
  const [selectedDistractors, setSelectedDistractors] = useState<number | null>(
    null
  );

  const schema = joi.object({
    selectDistractors: joi.number().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onSubmit',
  });

  const handleFormSubmit = async (data: any) => {
    const updatedFormData = [
      props.formData[0],
      props.formData[1],
      props.formData[2],
      props.selectedNumber,
      data.selectDistractors,
      ...props.formData.slice(4),
    ];

    console.log('all subimtted data in distractor', updatedFormData);
    props.setFormData(updatedFormData);

    navigate('/home');
    props.onClose();

    let direction: string;

    switch (updatedFormData[0]) {
      case 1:
        direction = 'right';
        break;
      case 2:
        direction = 'center';
        break;
      case 3:
        direction = 'left';
        break;
      default:
        direction = 'unknown'; // Handle unexpected values
        break;
    }
    let player: number;
    switch (updatedFormData[1]) {
      case 1:
        player = 4;
        break;
      case 2:
        player = 5;
        break;

      default:
        player = 0; // Handle unexpected values
        break;
    }

    let ball: string;
    switch (props.selectedNumber) {
      case 1:
        ball = ' 0.7';
        break;
      case 2:
        ball = '1';
        break;
      case 3:
        ball = '1.5';
        break;
      default:
        ball = 'unknown'; // Handle unexpected values
        break;
    }
    let srcew: string;
    if (selectedDistractors === 1) {
      srcew = 'Yes';
    } else {
      srcew = 'Not';
    }
    toastIdRef.current = toast({
      title: 'Success',
      description: (
        <Box>
          {`You select  Kick direction ${direction} ,
          Number of Players ${player}, Number of Kicks ${props.formData[2]} , Ball Speed ${ball},
         Screw ${srcew} ,
        module name is ${module} and session id is ${sessionId}`}
          <Button
            color={'white'}
            width={3}
            height={5}
            onClick={() => {
              if (toastIdRef.current) {
                toast.close(toastIdRef.current);
              }
            }}
            position={'absolute'}
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
    const existingDevice = await checkIfServiceExists(headsetKey);
    const appIsConnectedToInternet = await checkAppNetWorkConnection(); //TODO: consider move this flow to HOC
    if (appIsConnectedToInternet && existingDevice) {
      // if (appIsConnectedToInternet ) {
      console.log(updatedFormData);
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
      onOpenConnected();
    } else {
      console.log(headsetKey);
      console.log(existingDevice);
      const errorMessage = !appIsConnectedToInternet
        ? 'You are not connected to the internet'
        : 'No headset found';

      console.log(errorMessage);
      setErrorMEssage(errorMessage);
      setNotFound(true);
    }
    console.log(
      updatedFormData,
      `You select  Kick direction ${updatedFormData[0]} , Number of Kicks ${props.formData[1]} , Ball Speed ${props.selectedNumber},
         Screw ${selectedDistractors} 
        module name is ${module} and session id is ${sessionId}`
    );
    console.log('Array of menu choices', updatedFormData);
  };
  const handleButtonClick = (distractors: number) => {
    setSelectedDistractors(distractors);
    setValue('selectDistractors', distractors);
  };

  const closeAllModalsAndToast = () => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
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

  if (socketError) {
    toast({
      title: 'Socket Error',
      description:
        'There is a socket error. Please resolve it before proceeding.',
      status: 'error',
      duration: 5000,
      position: 'top-right',
    });
    return;
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
            Screw
          </ModalHeader>

          <ModalBody fontSize="20px" fontWeight="600" mt="25px">
            <FormControl isInvalid={!!errors.selectDistractors}>
              <Stack spacing={4} direction="column" align="center">
                <Button
                  onClick={() => handleButtonClick(1)}
                  bg={selectedDistractors === 1 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectDistractors')}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => handleButtonClick(2)}
                  bg={selectedDistractors === 2 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectDistractors')}
                >
                  Not
                </Button>
              </Stack>

              <FormErrorMessage>
                {errors.selectDistractors && 'Please select a Screw  .'}
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
              play
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {notFound ? (
        <ErrorPopup
          isOpen={notFound}
          onClose={closeErrorModal}
          closeSelectingAHeadset={closeSelectingAHeadset}
          onCancelSession={cancelSession}
          onSelectAnotherHeadset={selectAnotherHeadset}
          errorMessages={errorMEssage}
        />
      ) : (
        <OpenconnectedScore
          isOpen={isOpenConnected}
          onClose={onCloseConnected}
          onclosemodules={props.onclosemodules}
          onCloseSelectEnvironment={props.onCloseSelectEnvironment}
          SelectDistractors={props.onClose}
          onCloseSelectNumber={props.onCloseSelectNumber}
          oncloseselectlevel={props.oncloseselectlevel}
          closeAllModalsAndToast={closeAllModalsAndToast}
          closeAllModals={closeAllModalsAndToast}
        />
      )}
    </>
  );
};

export default Screw;
