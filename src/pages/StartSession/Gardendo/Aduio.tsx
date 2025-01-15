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
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useNavigate } from 'react-router-dom';

import useSocketManager from '@renderer/Context/SocketManagerProvider';
import { ErrorPopup } from '../ErrorPopup';
import usePopupsHandler from '@renderer/Context/PopupsHandlerContext';

import { useTranslation } from 'react-i18next';
import SelectLanguage from './SelectLanguage';
const Aduio = (props: any) => {
  const toast = useToast();
  const toastIdRef: any = useRef();
  const [notFound, setNotFound] = useState(false);
  const {
    isOpen: isOpenLanguage,
    onOpen: onOpenLanguage,
    onClose: onCloseLanguage,
  } = useDisclosure();

  const navigate = useNavigate();
  const [errorMEssage, setErrorMEssage] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const schema = joi.object({
    selectedCourses: joi.number().required(),
  });
  const { t } = useTranslation();
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
  console.log(props.formData, 'props');

  const handleFormSubmit = async (data: any) => {
    const updatedFormData = [
      props.formData[0],
      props.formData[1],
      props.formData[2],
      props.formData[3],
      props.formData[4],
      props.formData[5],
      data.selectedCourses,
      ...props.formData.slice(7),
    ];
    props.setFormData(updatedFormData);
    console.log('all subimtted data in cousres', updatedFormData);
    onOpenLanguage();
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
    setSelectedCourse(distractors);
    setValue('selectedCourses', distractors);
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
            {t('AudioDistraction')}
          </ModalHeader>

          <ModalBody fontSize="20px" fontWeight="600" mt="25px">
            <FormControl isInvalid={!!errors.selectedCourses}>
              <Stack spacing={4} direction="column" align="center">
                <Button
                  onClick={() => handleButtonClick(1)}
                  bg={selectedCourse === 1 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectedCourses')}
                >
                  {t('AudioON')}
                </Button>
                <Button
                  onClick={() => handleButtonClick(2)}
                  bg={selectedCourse === 2 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectedCourses')}
                >
                  {t('AudioOFF')}
                </Button>
              </Stack>

              <FormErrorMessage>
                {errors.selectedCourses && t('AudioError')}
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
          updatedFormData={props.updatedFormData}
          onclosemodules={props.onclosemodules}
          onCloseSelectEnvironment={props.onCloseSelectEnvironment}
          SelectDistractors={props.dSelectDistractors}
          CourseSelection={props.onClose}
          onCloseSelectNumber={props.onCloseSelectNumber}
          oncloseselectlevel={props.oncloseselectlevel}
          closeAllModalsAndToast={closeAllModalsAndToast}
          closeAllModals={closeAllModalsAndToast}
        />
      )}
    </>
  );
};

export default Aduio;
