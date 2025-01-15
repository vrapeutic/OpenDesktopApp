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
import useSocketManager from '@renderer/Context/SocketManagerProvider';
import joi from 'joi';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import SelectDistractors from './SelectDistractors';
import SelectLanguage from './SelectLanguage';

const SelectAttentionSpanBed = (props: any) => {
  const { t } = useTranslation();
  const [selectedAttentionSpan, setSelectedAttentionSpan] = useState<
    number | null
  >(null);
  const toast = useToast();
  const {
    isOpen: isOpenSelectLanguage,
    onOpen: onOpenSelectLanguage,
    onClose: onCloseSelectLanguage,
  } = useDisclosure();
  const {
    isOpen: isOpenSelectDistractors,
    onOpen: onOpenSelectDistractors,
    onClose: onCloseSelectDistractors,
  } = useDisclosure();
  const toastIdRef: any = useRef();
  const { socketError } = useSocketManager();

  const schema = joi.object({
    selectAttentionSpan: joi.number().required(),
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
    const updatedFormData = [
      props.formData[0],
      props.formData[1],
      data.selectAttentionSpan,
      ...props.formData.slice(3),
    ];
    props.setFormData(updatedFormData);

    if (props.formData[0] === 2 || props.formData[0] === 3) {
      onOpenSelectDistractors();
    } else {
      onOpenSelectLanguage();
    }
  };

  if (socketError) {
    return null;
  }
  const handleBackToSelectLevel = () => {
    props.onClose();
  };

  const handleButtonClick = (book: number) => {
    setSelectedAttentionSpan(book);
    setValue('selectAttentionSpan', book);
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
            {t('attentionDuration')}
          </ModalHeader>

          <ModalBody fontSize="20px" fontWeight="600" mt="25px">
            <FormControl isInvalid={!!errors.selectAttentionSpan}>
              <Stack spacing={4} direction="column" align="center">
                <Button
                  onClick={() => handleButtonClick(1)}
                  bg={selectedAttentionSpan === 1 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectAttentionSpan')}
                >
                  20
                </Button>

                <Button
                  onClick={() => handleButtonClick(2)}
                  bg={selectedAttentionSpan === 2 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectAttentionSpan')}
                >
                  40
                </Button>
                <Button
                  onClick={() => handleButtonClick(3)}
                  bg={selectedAttentionSpan === 3 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectAttentionSpan')}
                >
                  60
                </Button>
              </Stack>
              <FormErrorMessage>
                {errors.selectAttentionSpan && 'Please select a attention Duration.'}
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
          onCloseSelectAttentionTypeBed={props.onCloseSelectAttentionTypeBed}
          onCloseSelectEnvironmentBed={props.onCloseSelectEnvironmentBed}
          onCloseSelectAttentionSpan={props.onClose}
          onclosemodules={props.onclosemodules}
          closeAllModalsAndToast={closeAllModalsAndToast}
          closeAllModals={closeAllModalsAndToast}
        />
      )}

      {onOpenSelectLanguage && (
        <SelectLanguage
          isOpen={isOpenSelectLanguage}
          onClose={onCloseSelectLanguage}
          formData={props.formData}
          setFormData={props.setFormData}
          onCloseSelectAttentionSpan={props.onClose}
          onCloseSelectEnvironmentBed={props.onCloseSelectEnvironmentBed}
          onCloseSelectAttentionTypeBed={props.onCloseSelectAttentionTypeBed}
          onclosemodules={props.onclosemodules}
          closeAllModalsAndToast={closeAllModalsAndToast}
          closeAllModals={closeAllModalsAndToast}
        />
      )}
    </>
  );
};

export default SelectAttentionSpanBed;
