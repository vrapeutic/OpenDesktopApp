import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  RadioGroup,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import SelectEnvironmentArcheeko from './SelectEnvironmentArcheeko';
import { useStartSessionContext } from '@renderer/Context/StartSesstionContext';

const SelectLevelArcheeko = (props: any) => {
  const {
    isOpen: isOpenSelectEnvironment,
    onOpen: onOpenSelectEnvironment,
    onClose: onCloseSelectEnvironment,
  } = useDisclosure();
  const [formData, setFormData] = useState<any[]>([]);

  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const schema = joi.object({
    selectLevel: joi.number().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onSubmit',
  });

  const handleFormSubmit = (data: any) => {
    const hasLevelObject = formData.some((obj) => 'level' in obj);
    setFormData(
      hasLevelObject
        ? [{ level: data.selectLevel }, ...formData.slice(1)]
        : [{ ...formData[0], level: data.selectLevel }, ...formData.slice(1)]
    );
    console.log('Form Data Submitted: ', [
      { level: data.selectLevel },
      ...formData.slice(1),
    ]);
    onOpenSelectEnvironment();
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
      >
        <ModalOverlay />
        <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
          {/* <Box borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            <ModalCloseButton marginLeft="100px" />
          </Box> */}
          <ModalHeader textAlign="center" fontSize="1rem">
            Choose Level
          </ModalHeader>

          <ModalBody fontSize="20px" fontWeight="600" mt="25px">
            <FormControl isInvalid={!!errors.selectLevel}>
              <Stack spacing={4} direction="column" align="center">
                <Button
                  onClick={() => handleButtonClick(1)}
                  bg={selectedLevel === 1 ? 'blue.300' : 'gray.300'}
                  color="black"
                  fontSize="0.65rem"
                  as="button"
                  {...register('selectLevel')}
                >
                  Sustained Attention
                </Button>
                <Button
                  onClick={() => handleButtonClick(2)}
                  bg={selectedLevel === 2 ? 'blue.300' : 'gray.300'}
                  color="black"
                  fontSize="0.65rem"
                  as="button"
                  {...register('selectLevel')}
                >
                  Selective Attention
                </Button>
                <Button
                  onClick={() => handleButtonClick(3)}
                  bg={selectedLevel === 3 ? 'blue.300' : 'gray.300'}
                  color="black"
                  fontSize="0.65rem"
                  as="button"
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
              w="120px"
              h="54px"
              mx={2}
              bg="#00DEA3"
              borderRadius="12px"
              color="#FFFFFF"
              fontFamily="Graphik LCG"
              fontWeight="700"
              fontSize="15px"
              onClick={props.onClose}
              as="button"
            >
              Back
            </Button>
            <Button
              w="120px"
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
              Next
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {onOpenSelectEnvironment && (
        <SelectEnvironmentArcheeko
          isOpen={isOpenSelectEnvironment}
          onClose={onCloseSelectEnvironment}
          formData={formData}
          setFormData={setFormData}
          oncloseselectlevel={props.onClose}
          onclosemodules={props.onclosemodules}
        />
      )}

      {/* {formData.length > 0 && (
          <Box mt={4}>
            <Text>Form Data Submitted: {JSON.stringify(formData)}</Text>
          </Box>
        )} */}
    </>
  );
};

export default SelectLevelArcheeko;
