import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { MODULE_PACKAGE_KEY, START_APP_MESSAGE } from '@main/constants';
import usePopupsHandler from '@renderer/Context/PopupsHandlerContext';
import useSocketManager from '@renderer/Context/SocketManagerProvider';
import { useStartSessionContext } from '@renderer/Context/StartSesstionContext';
import joi from 'joi';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ErrorPopup } from '../ErrorPopup';
import OpenConnectedBed from './OpenConnectedbed';

const LANGUAGES = [
  { id: 1, name: 'Vietnamese' },
  { id: 2, name: 'English' },
] as const;

const schema = joi.object({
  selectLanguage: joi.number().required(),
});

const SelectLanguage = (props: any) => {
  const [notFound, setNotFound] = useState(false);
  const [errorMEssage, setErrorMEssage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState<number | null>(null);
  const {
    dispatchSocketMessage,
    checkIfServiceExists,
    checkAppNetWorkConnection,
    socketError,
  } = useSocketManager();
  const { module, sessionId, headsetKey } = useStartSessionContext();
  const {
    isOpen: isOpenConnected,
    onOpen: onOpenConnected,
    onClose: onCloseConnected,
  } = useDisclosure();
  const { popupFunctions } = usePopupsHandler();
  const { closeSelectingAHeadset, closeSelectingAModule } = popupFunctions;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toast = useToast();
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

  const handleFormSubmit = async (data: any) => {
    const updatedFormData = [
      props.formData[0],
      props.formData[1],
      props.formData[2],
      data.selectLanguage,
      ...props.formData.slice(4),
    ];
    console.log(updatedFormData);

    props.setFormData(updatedFormData);

    navigate('/home');
    props.onClose();
    toastIdRef.current = toast({
      title: 'Success',
      description: (
        <Box>
          {t('YouAssignedLevel6', {
            level: updatedFormData[0],
            attentionDuration: updatedFormData[2],
            distractor: updatedFormData[3],
            module,
            sessionId,
          })}
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
      const errorMessage = !appIsConnectedToInternet
        ? t('connectionError')
        : t('NoHeadsetFound');

      setErrorMEssage(errorMessage);
      setNotFound(true);
    }
  };
  const handleButtonClick = (language: number) => {
    setSelectedLanguage(language);
    setValue('selectLanguage', language);
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
      description: t('socketError'),
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
          <ModalHeader textAlign="center" fontSize="1rem">
            {t('language')}
          </ModalHeader>
          <ModalBody fontSize="20px" fontWeight="600" mt="25px">
            <FormControl isInvalid={!!errors.selectLanguage}>
              <Stack spacing={4} direction="column" align="center">
                {LANGUAGES.map((lang) => (
                  <Button
                    key={lang.id}
                    onClick={() => {
                      setSelectedLanguage(lang.id);
                      setValue('selectLanguage', lang.id);
                    }}
                    bg={selectedLanguage === lang.id ? 'blue.300' : 'gray.300'}
                    color="black"
                    width="12em"
                    fontSize="1.2rem"
                    {...register('selectLanguage')}
                  >
                    {t(lang.name)}
                  </Button>
                ))}
              </Stack>

              <FormErrorMessage>
                {errors.selectLanguage && t('selectLanguageError')}
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
        <OpenConnectedBed
          isOpen={isOpenConnected}
          onClose={onCloseConnected}
          onCloseSelectBooksBed={props.onCloseSelectBooksBed}
          oncloseselectlevel={props.oncloseselectlevel}
          onclosemodules={props.onclosemodules}
          onCloseSelectDistractors={props.onClose}
          closeAllModalsAndToast={closeAllModalsAndToast}
          closeAllModals={closeAllModalsAndToast}
        />
      )}
    </>
  );
};

export default SelectLanguage;
