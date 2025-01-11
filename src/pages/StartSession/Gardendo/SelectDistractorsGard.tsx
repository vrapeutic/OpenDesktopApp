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
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useNavigate } from 'react-router-dom';

import { useStartSessionContext } from '@renderer/Context/StartSesstionContext';
import OpenconnectedGar from './OpenconnectedGar';
import useSocketManager from '@renderer/Context/SocketManagerProvider';
import { ErrorPopup } from '../ErrorPopup';
import usePopupsHandler from '@renderer/Context/PopupsHandlerContext';
import { MODULE_PACKAGE_KEY, START_APP_MESSAGE } from '@main/constants';
import { useTranslation } from 'react-i18next';
import SelectLanguage from './SelectLanguage';
const SelectDistractorsGard = (props: any) => {
  const toast = useToast();
  const navigate = useNavigate();

  const { module, sessionId, headsetKey } = useStartSessionContext();
  const {
    isOpen: isOpenLanguage,
    onOpen: onOpenLanguage,
    onClose: onCloseLanguage,
  } = useDisclosure();

  const [selectedDistractors, setSelectedDistractors] = useState<number | null>(
    null
  );
  const toastIdRef: any = useRef();
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
  const schema = joi.object({
    selectDistractors: joi.number().required(),
  });
  const { t } = useTranslation();
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
      props.selectedNumber,
      data.selectDistractors,
      ...props.formData.slice(4),
    ];

    console.log('all subimtted data in distractor', updatedFormData);
    props.setFormData(updatedFormData);

    // navigate('/Therapycenters');
    // props.onClose();
    // toastIdRef.current = toast({
    //   title: 'Success',
    //   description: (
    //     <Box>
    //       {t('YouAssignedLevel4', {
    //         level: updatedFormData[0],
    //         environment: props.formData[1],
    //         number: props.selectedNumber,
    //         distractors: selectedDistractors,
    //         module,
    //         sessionId,
    //       })}
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
    onOpenLanguage();

    // const existingDevice = await checkIfServiceExists(headsetKey);
    // const appIsConnectedToInternet = await checkAppNetWorkConnection(); //TODO: consider move this flow to HOC
    // if (appIsConnectedToInternet && existingDevice) {
    //   // if (appIsConnectedToInternet) {
    //   console.log('updatedFormData', updatedFormData);
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
    //   onOpenLanguage();
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

  if (socketError) {
    return null;
  }
  const handleButtonClick = (distractors: number) => {
    setSelectedDistractors(distractors);
    setValue('selectDistractors', distractors);
  };

  const closeAllModalsAndToast = () => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  };
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
          <ModalHeader textAlign="center" fontSize="1rem">
            {t('chooseNumberOfDistractors')}
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
                  1
                </Button>
                <Button
                  onClick={() => handleButtonClick(2)}
                  bg={selectedDistractors === 2 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectDistractors')}
                >
                  2
                </Button>
                <Button
                  onClick={() => handleButtonClick(3)}
                  bg={selectedDistractors === 3 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectDistractors')}
                >
                  3
                </Button>
              </Stack>

              <FormErrorMessage>
                {errors.selectDistractors && t('selectDistractorError')}
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
              {t('play')}
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
        <SelectLanguage
          isOpen={isOpenLanguage}
          onClose={onCloseLanguage}
          formData={props.formData}
          setFormData={props.setFormData}
          updatedFormData={props.updatedFormData}
          onclosemodules={props.onclosemodules}
          onCloseSelectEnvironment={props.onCloseSelectEnvironment}
          SelectDistractors={props.onClose}
          onCloseSelectNumber={props.onCloseSelectNumber}
          oncloseselectlevel={props.oncloseselectlevel}
          closeAllModalsAndToast={closeAllModalsAndToast}
          closeAllModals={closeAllModalsAndToast}
        />
      )}
      {/* {onOpenConnected && (
          <OpenconnectedGar
            isOpen={isOpenConnected}
            onClose={onCloseConnected}
            onclosemodules={props.onclosemodules}
            onCloseSelectEnvironment={props.onCloseSelectEnvironment}
            SelectDistractors={props.onClose}
            onCloseSelectNumber={props.onCloseSelectNumber}
            oncloseselectlevel={props.oncloseselectlevel}
          />
        )} */}
    </>
  );
};

export default SelectDistractorsGard;
