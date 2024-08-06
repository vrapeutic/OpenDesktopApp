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

import SelectenvRodja from './Selectenvrodja';

const SelectLevelRodja = (props: any) => {
  const {
    isOpen: isOpenSelectEnvrodja,
    onOpen: onOpenSelectEnvrodja,
    onClose: onCloseSelectEnvrodja,
  } = useDisclosure();

  const [formData, setFormData] = useState<any[]>([
    -100, -200, -300, -400, -500, -600, -700, -800, -900, -1000,
  ]);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const schema = joi.object({
    selectLevel: joi.number().required(),
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
    setFormData([data.selectLevel, ...formData.slice(1)]);

    onOpenSelectEnvrodja();
    props.onClose();
  };

  const handleButtonClick = (level: number) => {
    setSelectedLevel(level);
    setValue('selectLevel', level);
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
            Select Level rodja
          </ModalHeader>

          <ModalBody fontSize="20px" fontWeight="600" mt="25px">
            <FormControl isInvalid={!!errors.selectLevel}>
              <Stack spacing={4} direction="column" align="center">
                <Button
                  onClick={() => handleButtonClick(1)}
                  bg={selectedLevel === 1 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1rem"
                  {...register('selectLevel')}
                >
                  Sustained Attention
                </Button>
                <Button
                  onClick={() => handleButtonClick(2)}
                  bg={selectedLevel === 2 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1rem"
                  {...register('selectLevel')}
                >
                  Selective Attention
                </Button>
                <Button
                  onClick={() => handleButtonClick(3)}
                  bg={selectedLevel === 3 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1rem"
                  {...register('selectLevel')}
                >
                  Adaptive Attention
                </Button>
              </Stack>

              <FormErrorMessage>
                {errors.selectLevel && 'Please select a level.'}
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
              Back
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
              Select Environment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {onOpenSelectEnvrodja && (
        <SelectenvRodja
          isOpen={isOpenSelectEnvrodja}
          onClose={onCloseSelectEnvrodja}
          formData={formData}
          setFormData={setFormData}
          oncloseselectlevel={props.onClose}
          onclosemodules={props.onclosemodules}
        />
      )}
    </>
  );
};

export default SelectLevelRodja;
