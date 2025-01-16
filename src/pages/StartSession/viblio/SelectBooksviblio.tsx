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
import usePopupsHandler from '@renderer/Context/PopupsHandlerContext';
import useSocketManager from '@renderer/Context/SocketManagerProvider';
import joi from 'joi';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ErrorPopup } from '../ErrorPopup';
import SelectDistractors from './SelectDistractorsviblio';
import SelectLanguage from './SelectLanguage';
const SelectBooksViblio = (props: any) => {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const toast = useToast();
  const {
    isOpen: isOpenLanguage,
    onOpen: onOpenLanguage,
    onClose: onCloseLanguage,
  } = useDisclosure();
  const {
    isOpen: isOpenSelectDistractors,
    onOpen: onOpenSelectDistractors,
    onClose: onCloseSelectDistractors,
  } = useDisclosure();

  const [notFound, setNotFound] = useState(false);
  const [errorMEssage, setErrorMEssage] = useState(null);
  const toastIdRef: any = useRef();
  const { popupFunctions } = usePopupsHandler();
  const { closeSelectingAHeadset, closeSelectingAModule } = popupFunctions;
  const { socketError } = useSocketManager();
  const schema = joi.object({
    selectBook: joi.number().required(),
  });
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onSubmit',
  });

  const handleFormSubmit = async (data: any) => {
    const updatedFormData = [
      props.formData[0],
      props.formData[1],
      data.selectBook,
      ...props.formData.slice(3),
    ];
    props.setFormData(updatedFormData);

    if (props.formData[0] === 2 || props.formData[0] === 3) {
      onOpenSelectDistractors();
    } else {
      onOpenLanguage();
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
    return null;
  }
  const handleBackToSelectLevel = () => {
    props.onClose();
  };

  const handleButtonClick = (book: number) => {
    setSelectedBook(book);
    setValue('selectBook', book);
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
            {t('selectBooks')}
          </ModalHeader>

          <ModalBody fontSize="20px" fontWeight="600" mt="25px">
            <FormControl isInvalid={!!errors.selectBook}>
              <Stack spacing={4} direction="column" align="center">
                <Button
                  onClick={() => handleButtonClick(1)}
                  bg={selectedBook === 1 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectBook')}
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
      {onOpenSelectDistractors && (
        <SelectDistractors
          isOpen={isOpenSelectDistractors}
          onClose={onCloseSelectDistractors}
          formData={props.formData}
          setFormData={props.setFormData}
          onCloseSelectAttentionType={props.onCloseSelectAttentionType}
          onCloseSelectBooksViblio={props.onClose}
          onCloseSelectEnvironmentViblio={props.onCloseSelectEnvironmentViblio}
          onclosemodules={props.onclosemodules}
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
        <SelectLanguage
          isOpen={isOpenLanguage}
          onClose={onCloseLanguage}
          formData={props.formData}
          setFormData={props.setFormData}
          updatedFormData={props.updatedFormData}
          onCloseSelectBooksViblio={props.onClose}
          onCloseSelectEnvironmentViblio={props.onCloseSelectEnvironmentViblio}
          onCloseSelectAttentionType={props.onCloseSelectAttentionType}
          onclosemodules={props.onclosemodules}
        />
      )}
    </>
  );
};

export default SelectBooksViblio;
