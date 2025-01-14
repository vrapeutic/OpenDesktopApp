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
  Stack,
  useDisclosure,
  FormControl,
  FormErrorMessage,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';
import SelectEnvironment from './SelectEnvironment';

const SelectAttentionTypeBed = (props: any) => {
  const { t } = useTranslation();
  const {
    isOpen: isOpenSelectEnvironment,
    onOpen: onOpenSelectEnvironment,
    onClose: onCloseSelectEnvironment,
  } = useDisclosure();

  const [formData, setFormData] = useState<any[]>([
    -100, -200, -300, -400, -500, -600, -700, -800, -900, -1000,
  ]);
  const [selectedAttentionType, setSelectedAttentionType] = useState<
    number | null
  >(null);

  const schema = joi.object({
    selectAttentionType: joi.number().required(),
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

  const handleFormSubmit = (data: any) => {
    setFormData([data.selectAttentionType, ...formData.slice(1)]);
    console.log('Form Data Submitted: ', [
      data.selectAttentionType,
      ...formData.slice(1),
    ]);
    onOpenSelectEnvironment();
  };

  const handleButtonClick = (level: number) => {
    setSelectedAttentionType(level);
    setValue('selectAttentionType', level);
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
            {t('attentionType')}
          </ModalHeader>

          <ModalBody fontSize="20px" fontWeight="600" mt="25px">
            <FormControl isInvalid={!!errors.selectAttentionType}>
              <Stack spacing={4} direction="column" align="center">
                <Button
                  onClick={() => handleButtonClick(1)}
                  bg={selectedAttentionType === 1 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1rem"
                  {...register('selectAttentionType')}
                >
                  {t('sustainedAttention')}
                </Button>
                <Button
                  onClick={() => handleButtonClick(2)}
                  bg={selectedAttentionType === 2 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1rem"
                  {...register('selectAttentionType')}
                >
                  {t('selectiveAttention')}
                </Button>
                <Button
                  onClick={() => handleButtonClick(3)}
                  bg={selectedAttentionType === 3 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1rem"
                  {...register('selectAttentionType')}
                >
                  {t('adaptiveAttention')}
                </Button>
              </Stack>

              <FormErrorMessage>
                {errors.selectAttentionType && t('selectLevelError')}
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
      {onOpenSelectEnvironment && (
        <SelectEnvironment
          isOpen={isOpenSelectEnvironment}
          onClose={onCloseSelectEnvironment}
          formData={formData}
          setFormData={setFormData}
          onCloseSelectAttentionTypeBed={props.onClose}
          onclosemodules={props.onclosemodules}
        />
      )}
    </>
  );
};

export default SelectAttentionTypeBed;
