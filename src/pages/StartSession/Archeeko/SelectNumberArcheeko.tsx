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
import SelectDistractors from './SelectDistractors';
import { MODULE_PACKAGE_KEY, START_APP_MESSAGE } from '@main/constants';
import OpenconnectedArcheeko from './OpenconnectedArcheeko';
import { useStartSessionContext } from '@renderer/Context/StartSesstionContext';
import { useNavigate } from 'react-router-dom';
import useSocketManager from '@renderer/Context/SocketManagerProvider';
import { ErrorPopup } from '../ErrorPopup';
import usePopupsHandler from '@renderer/Context/PopupsHandlerContext';
import { useTranslation } from 'react-i18next';
import Language from './Language';
const SelectNumberArcheeko = (props: any) => {
  const { t } = useTranslation();
  const toast = useToast();
  const { module, sessionId, headsetKey } = useStartSessionContext();
  const {
    isOpen: isOpenConnected,
    onOpen: onOpenConnected,
    onClose: onCloseConnected,
  } = useDisclosure();
  const navigate = useNavigate();
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
    isOpen: isOpenSelectDistractors,
    onOpen: onOpenSelectDistractors,
    onClose: onCloseSelectDistractors,
  } = useDisclosure();

  const {
    isOpen: isOpenLanguage,
    onOpen: onOpenLanguage,
    onClose: onCloseLanguage,
  } = useDisclosure();

  const schema = joi.object({
    selectNumber: joi.number().required(),
  });
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const toastIdRef: any = useRef();
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
 console.log(updatedFormData,"jjjjj");
    if (props.formData[0] === 2 || props.formData[0] === 3) {
      onOpenSelectDistractors();
    } else {
      onOpenLanguage()

      console.log('session id', sessionId);

      // toastIdRef.current = toast({
      //   title: 'Success',
      //   description: (
      //     <Box>
      //  {t('YouAssignedLevel3', {
      //                 level: updatedFormData[0],
      //                 environment: props.formData[1],
      //                 number: props.selectedNumber,
      //                 distractor: props.formData[3],
      //                 language: data.selectDistractors,
      //                 module,
      //                 sessionId,
      //               })}
      //       <Button
      //         color={'white'}
      //         width={3}
      //         height={5}
      //         onClick={() => {
      //           if (toastIdRef.current) {
      //             toast.close(toastIdRef.current);
      //           }
      //         }}
      //         position={'absolute'}
      //         top={3}
      //         right={3}
      //       >
      //         x
      //       </Button>
      //     </Box>
      //   ),
      //   status: 'success',
      //   duration: null,
      //   position: 'bottom-left',
      //   onCloseComplete: () => {
      //     console.log('Toast has been removed.');
      //     // Additional logic for when the toast is removed
      //   },
      // });
      // const existingDevice = await checkIfServiceExists(headsetKey);
      // const appIsConnectedToInternet = await checkAppNetWorkConnection(); //TODO: consider move this flow to HOC
      // if (appIsConnectedToInternet && existingDevice) {
      //   // if (appIsConnectedToInternet ) {
      //   console.log(updatedFormData);
      //   const socketMessage = {
      //     sessionId,
      //     [MODULE_PACKAGE_KEY]: module,
      //     deviceId: headsetKey,
      //   };

      //   dispatchSocketMessage(
      //     START_APP_MESSAGE,
      //     socketMessage,
      //     headsetKey,
      //     updatedFormData
      //   );
      //   onOpenConnected();
      // } else {
      //   console.log(headsetKey);
      //   console.log(existingDevice);
      //   const errorMessage = !appIsConnectedToInternet
      //     ? t('connectionError')
      //     : t('NoHeadsetFound');

      //   console.log(errorMessage);
      //   setErrorMEssage(errorMessage);
      //   setNotFound(true);
      // }

      console.log('Array of menu choices', updatedFormData);
    }
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
            {t('ChooseNumberArrows/Shots')}
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
                  1
                </Button>
                <Button
                  onClick={() => handleButtonClick(2)}
                  bg={selectedNumber === 2 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectNumber')}
                >
                  2
                </Button>
                <Button
                  onClick={() => handleButtonClick(3)}
                  bg={selectedNumber === 3 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectNumber')}
                >
                  3
                </Button>
              </Stack>

              <FormErrorMessage>
                {errors.selectNumber && t('selectNumberError')}
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
              {t('back')}
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
              {props.level != 1 ? t('next') : t('play')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {props.level != 1 && (
        <SelectDistractors
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
        <Language
        isOpen={isOpenLanguage}
        onClose={onCloseLanguage}
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

export default SelectNumberArcheeko;
