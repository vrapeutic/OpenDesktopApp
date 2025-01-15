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
  useDisclosure,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useState } from 'react';
import SelectAttentionSpanBed from './SelectAttentionSpanBed';
const SelectEnvironment = (props: any) => {
  const { t } = useTranslation();

  const {
    isOpen: isOpenSelectAttentionSpan,
    onOpen: onOpenSelectAttentionSpan,
    onClose: onCloseSelectAttentionSpan,
  } = useDisclosure();

  const schema = joi.object({
    selectEnvironment: joi.number().required(),
  });
  const [selectedEnvironment, setSelectedEnvironment] = useState<number | null>(
    null
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onSubmit',
  });

  const handleFormSubmit = (data: any) => {
    console.log(data.selectEnvironment);
    const updatedFormData = [
      props.formData[0],
      data.selectEnvironment,
      ...props.formData.slice(2),
    ];

    props.setFormData(updatedFormData);
    console.log('Form Data : ', [
      props.formData[0],
      data.selectEnvironment,
      ...props.formData.slice(2),
    ]);
    onOpenSelectAttentionSpan();
  };
  const handleButtonClick = (environment: number) => {
    setSelectedEnvironment(environment);
    setValue('selectEnvironment', environment);
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
          <ModalHeader textAlign="center" fontSize="1rem">
            {t('chooseEnvironment')}
          </ModalHeader>

          <ModalBody fontSize="20px" fontWeight="600" mt="25px">
            <FormControl isInvalid={!!errors.selectEnvironment}>
              <Stack spacing={4} direction="column" align="center">
                <Button
                  onClick={() => handleButtonClick(1)}
                  bg={selectedEnvironment === 1 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectEnvironment')}
                >
                  {t('Hanoi Court')}
                </Button>
              </Stack>
              <FormErrorMessage>
                {errors.selectEnvironment && t('selectEnvironmentError')}
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

      {onOpenSelectAttentionSpan && (
        <SelectAttentionSpanBed
          isOpen={isOpenSelectAttentionSpan}
          onClose={onCloseSelectAttentionSpan}
          formData={props.formData}
          setFormData={props.setFormData}
          onCloseSelectEnvironmentBed={props.onClose}
          onCloseSelectAttentionTypeBed={props.onCloseSelectAttentionTypeBed}
          onclosemodules={props.onclosemodules}
        />
      )}
    </>
  );
};

export default SelectEnvironment;
