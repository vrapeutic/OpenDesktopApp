import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import usePopupsHandler from '@renderer/Context/PopupsHandlerContext';
import useSocketManager from '@renderer/Context/SocketManagerProvider';
import { useTranslation } from 'react-i18next';
import { ErrorPopup } from '../ErrorPopup';
import SelectLanguage from './SelectLanguage';

const SelectDistractors = (props: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    isOpen: isOpenLanguage,
    onOpen: onOpenLanguage,
    onClose: onCloseLanguage,
  } = useDisclosure();
  const [selectedDistractor, setSelectedDistractor] = useState<number | null>(
    null
  );
  const toastIdRef: any = useRef();
  const [notFound, setNotFound] = useState(false);
  const [errorMEssage, setErrorMEssage] = useState(null);
  const { popupFunctions } = usePopupsHandler();
  const { closeSelectingAHeadset, closeSelectingAModule } = popupFunctions;
  const { socketError } = useSocketManager();
  const toast = useToast();

  const schema = joi.object({
    selectDistractor: joi
      .number()
      .required()
      .messages({
        'any.required': t('selectDistractorError'),
        'number.base': t('selectDistractorError'),
      }),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onSubmit',
  });

  const handleFormSubmit = async (data: any) => {
    const updatedFormData = [
      props.formData[0],
      props.formData[1],
      props.formData[2],
      data.selectDistractor,
      ...props.formData.slice(4),
    ];
    props.setFormData(updatedFormData);
    onOpenLanguage();
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
    return null;
  }

  const handleBackToSelectBook = () => {
    props.onClose();
  };

  const handleButtonClick = async (distractor: number) => {
    setSelectedDistractor(distractor);
    setValue('selectDistractor', distractor);
    await trigger('selectDistractor');
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
          <Box borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            <ModalCloseButton marginLeft="100px" />
          </Box>
          <ModalHeader textAlign="center" fontSize="1rem">
            {t('selectDistractors')}
          </ModalHeader>

          <ModalBody fontSize="20px" fontWeight="600" mt="25px">
            <FormControl isInvalid={!!errors.selectDistractor}>
              <Stack spacing={4} direction="column" align="center">
                <Button
                  onClick={() => handleButtonClick(1)}
                  bg={selectedDistractor === 1 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectDistractor')}
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
                >
                  3
                </Button>
              </Stack>
              <FormErrorMessage>
                {errors.selectDistractor && t('selectDistractorError')}
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
              {t('back')}
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
              {t('next')}
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
          onCloseSelectAttentionTypeBed={props.onCloseSelectAttentionTypeBed}
          onCloseSelectAttentionSpan={props.onCloseSelectAttentionSpan}
          onCloseSelectEnvironmentBed={props.onCloseSelectEnvironmentBed}
          onCloseSelectDistractors={props.onClose}
          onclosemodules={props.onclosemodules}
          closeAllModalsAndToast={closeAllModalsAndToast}
          closeAllModals={closeAllModalsAndToast}
        />
      )}
    </>
  );
};

export default SelectDistractors;
