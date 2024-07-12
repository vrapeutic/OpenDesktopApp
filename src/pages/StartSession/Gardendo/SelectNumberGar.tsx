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
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useStartSessionContext } from '@renderer/Context/StartSesstionContext';
import SelectDistractorsGard from './SelectDistractorsGard';
import OpenconnectedGar from './OpenconnectedGar';
import { useNavigate } from 'react-router-dom';
import useSocketManager from '@renderer/Context/SocketManagerProvider';
import { ErrorPopup } from '../ErrorPopup';
import usePopupsHandler from '@renderer/Context/PopupsHandlerContext';
import { MODULE_PACKAGE_KEY, START_APP_MESSAGE } from '@main/constants';
const SelectNumberGar = (props: any) => {
  console.log('select form data in number in 30', props.formData);
  const toast = useToast();
  const { module, sessionId, headsetid, headsetKey } = useStartSessionContext();
  const {
    isOpen: isOpenConnected,
    onOpen: onOpenConnected,
    onClose: onCloseConnected,
  } = useDisclosure();
  const navigate = useNavigate();

  const {
    isOpen: isOpenSelectDistractors,
    onOpen: onOpenSelectDistractors,
    onClose: onCloseSelectDistractors,
  } = useDisclosure();

  const schema = joi.object({
    selectNumber: joi.number().required(),
  });
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [errorMEssage, setErrorMEssage] = useState(null);
  const {
    dispatchSocketMessage,
    checkIfServiceExists,
    checkAppNetWorkConnection,
  } = useSocketManager();
  const { popupFunctions } = usePopupsHandler();
  const { closeSelectingAHeadset, closeSelectingAModule } = popupFunctions;
  const { socketError } = useSocketManager();
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
      data.selectNumber,
      ...props.formData.slice(3),
    ];
    props.setFormData(updatedFormData);

    console.log('updated form data in number', updatedFormData);
    if (props.formData[0] === 2 || props.formData[0] === 3) {
      onOpenSelectDistractors();
    } else {
      navigate('/Therapycenters');

      console.log('session id', sessionId);

      toast({
        title: 'Success',
        description: `You assigned level ${updatedFormData[0]} ,environment ${props.formData[1]}, Number ${selectedNumber} ,
           module name is ${module} and session id is ${sessionId}`,
        status: 'success',

        duration: 5000,
        position: 'top-right',
      });

      const existingDevice = await checkIfServiceExists(headsetKey);
      const appIsConnectedToInternet = await checkAppNetWorkConnection(); //TODO: consider move this flow to HOC
      if (appIsConnectedToInternet && existingDevice) {
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
        onOpenConnected();
      } else {
        console.log(headsetid);
        console.log(existingDevice);
        const errorMessage = !appIsConnectedToInternet
          ? 'You are not connected to the internet'
          : 'No headset found';

        console.log(errorMessage);
        setErrorMEssage(errorMessage);
        setNotFound(true);
      }

      console.log(
        `You assigned level ${updatedFormData[0]} ,environment ${props.formData[1]}, Number ${selectedNumber} ,
           module name is ${module} and session id is ${sessionId}`
      );
      console.log('Array of menu choices', updatedFormData);
    }
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

  useEffect(() => {
    if (socketError) {
      toast({
        title: 'Socket Error',
        description:
          'There is a socket error. Please resolve it before proceeding.',
        status: 'error',
        duration: 5000,
        position: 'top-right',
      });
      setErrorMEssage(
        'There is a socket error. Please resolve it before proceeding.'
      );
      setNotFound(true);
    }
  }, [socketError]);

  const handleButtonClick = (number: number) => {
    setSelectedNumber(number);
    setValue('selectNumber', number);
  };

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
            Choose Number of Arrows/Shots
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
                  4
                </Button>
                <Button
                  onClick={() => handleButtonClick(2)}
                  bg={selectedNumber === 2 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectNumber')}
                >
                  8
                </Button>
                <Button
                  onClick={() => handleButtonClick(3)}
                  bg={selectedNumber === 3 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectNumber')}
                >
                  12
                </Button>
              </Stack>

              <FormErrorMessage>
                {errors.selectNumber && 'Please select a number.'}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="space-between">
            <Button
              w="120px"
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
              w="120px"
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
              {props.level != 1 ? 'Next' : 'Play'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {props.level != 1 && (
        <SelectDistractorsGard
          isOpen={props.level !== 1 ? isOpenSelectDistractors : null}
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
      )}

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
        <OpenconnectedGar
          isOpen={isOpenConnected}
          onClose={onCloseConnected}
          onclosemodules={props.onclosemodules}
          onCloseSelectEnvironment={props.onCloseSelectEnvironment}
          SelectDistractors={onCloseSelectDistractors}
          onCloseSelectNumber={props.onClose}
          oncloseselectlevel={props.oncloseselectlevel}
        />
      )}
      {/* {onOpenConnected && (
        <OpenconnectedGar
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

export default SelectNumberGar;
