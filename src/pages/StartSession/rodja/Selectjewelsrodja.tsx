import React, { useEffect, useState } from 'react';
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
import SelectDistractorsRodja from './SelectDistractorsrodja';
import OpenconnectedRodja from './OpenconnectedRodja';
import useSocketManager from '@renderer/Context/SocketManagerProvider';
import { ErrorPopup } from '../ErrorPopup';
import usePopupsHandler from '@renderer/Context/PopupsHandlerContext';
import { MODULE_PACKAGE_KEY, START_APP_MESSAGE } from '@main/constants';
const SelectjewelRodja = (props: any) => {
  const navigate = useNavigate();
  const [selectedBook, setselectedBook] = useState<number | null>(null);
  const { module, sessionId, headsetid, headsetKey } = useStartSessionContext();

  const toast = useToast();
  const [notFound, setNotFound] = useState(false);
  const [errorMEssage, setErrorMEssage] = useState(null);
  const {
    dispatchSocketMessage,
    checkIfServiceExists,
    checkAppNetWorkConnection,
  } = useSocketManager();
  const { popupFunctions } = usePopupsHandler();
  const { closeSelectingAHeadset, closeSelectingAModule } = popupFunctions;
  const {
    isOpen: isOpenConnected,
    onOpen: onOpenConnected,
    onClose: onCloseConnected,
  } = useDisclosure();
  const {
    isOpen: isOpenSelectDistractors,
    onOpen: onOpenSelectDistractors,
    onClose: onCloseSelectDistractors,
  } = useDisclosure();

  const schema = joi.object({
    selectBook: joi.number().required(),
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

  let updatedFormData;
  const handleFormSubmit = async (data: any) => {
    updatedFormData = [
      props.formData[0],
      props.formData[1],
      data.selectBook,
      ...props.formData.slice(3),
    ];
    props.setFormData(updatedFormData);

    // console.log("updated form data in jewel",updatedFormData)
    if (props.formData[0] === 2 || props.formData[0] === 3) {
      onOpenSelectDistractors();
    } else {
      navigate('/home');
      onOpenConnected();
      // console.log("session id",sessionId)

      toast({
        title: 'Success',
        description: `You assigned level ${updatedFormData[0]} ,environment ${props.formData[1]}, jewel ${selectedBook} ,
         module name is ${module} and session id is ${sessionId}`,
        status: 'success',

        duration: 5000,
        position: 'top-right',
      });

      const existingDevice = await checkIfServiceExists(headsetKey);
      const appIsConnectedToInternet = await checkAppNetWorkConnection(); //TODO: consider move this flow to HOC
      if (appIsConnectedToInternet && existingDevice) {
        // if (appIsConnectedToInternet) {
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
        props.onClose();
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

      // console.log(
      //   `You assigned level ${updatedFormData[0]} ,environment ${props.formData[1]}, jewel ${selectedBook} ,
      //    module name is ${module} and session id is ${sessionId}`
      // );
      // console.log('Array of menu choices', updatedFormData);
    }
  };

  const handleBackToSelectLevel = () => {
    props.onClose();
  };

  const handleButtonClick = (book: number) => {
    setselectedBook(book);
    setValue('selectBook', book);
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

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
          <Box borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            <ModalCloseButton marginLeft="100px" />
          </Box>
          <ModalHeader textAlign="center" fontSize="1rem">
            Select Jewels Rodja
          </ModalHeader>

          <ModalBody fontSize="20px" fontWeight="600" mt="25px">
            <FormControl isInvalid={!!errors.selectLevel}>
              <Stack spacing={4} direction="column" align="center">
                <Button
                  onClick={() => handleButtonClick(1)}
                  bg={selectedBook === 1 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectBook')}
                  value={1}
                >
                  5
                </Button>

                <Button
                  onClick={() => handleButtonClick(2)}
                  bg={selectedBook === 2 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectBook')}
                  value={2}
                >
                  10
                </Button>
                <Button
                  onClick={() => handleButtonClick(3)}
                  bg={selectedBook === 3 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectBook')}
                  value={3}
                >
                  15
                </Button>
              </Stack>
              <FormErrorMessage>
                {errors.selectBook && 'Please select a book.'}
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
              onClick={handleBackToSelectLevel}
              mx={2}
            >
              Back to Select Level
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
              {props.formData[0] == 2 || props.formData[0] == 3
                ? 'select distractor'
                : 'play'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {onOpenSelectDistractors && (
        <SelectDistractorsRodja
          isOpen={isOpenSelectDistractors}
          onClose={onCloseSelectDistractors}
          formData={props.formData}
          updatedFormData={updatedFormData}
          selectBook={selectedBook}
          setFormData={props.setFormData}
          onclosemodules={props.onclosemodules}
          onCloseSelectEnvrodja={props.onCloseSelectEnvrodja}
          oncloseselectlevel={props.oncloseselectlevel}
          onCloseSelectJewel={props.onClose}
          onCloseBooks={props.onClose}
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
        <OpenconnectedRodja
          oncloseselectlevel={props.oncloseselectlevel}
          onCloseSelectEnvrodja={props.onCloseSelectEnvrodja}
          onCloseSelectJewel={props.onClose}
          isOpen={isOpenConnected}
          onClose={onCloseConnected}
          onclosemodules={props.onclosemodules}
          onCloseSelectDistractors={props.onClose}
        />
      )}
      {/* {onOpenConnected && (
        <OpenconnectedRodja
        oncloseselectlevel={props.oncloseselectlevel}
        onCloseSelectEnvrodja={props.onCloseSelectEnvrodja}
        onCloseSelectJewel={props.onClose}
          isOpen={isOpenConnected}
          onClose={onCloseConnected}
          onclosemodules={props.onclosemodules}
          onCloseSelectDistractors={props.onClose}
        />
      )} */}
    </>
  );
};

export default SelectjewelRodja;
