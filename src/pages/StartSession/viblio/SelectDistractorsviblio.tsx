import React, { useState } from 'react';
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
  FormControl,
  FormErrorMessage,
  Stack,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useNavigate } from 'react-router-dom';
import { useStartSessionContext } from '@renderer/Context/StartSesstionContext';
import Openconnected from '../openconnected';

const SelectDistractors = (props: any) => {
  const navigate = useNavigate();
  const { module, sessionId } = useStartSessionContext();
  const {
    isOpen: isOpenConnected,
    onOpen: onOpenConnected,
    onClose: onCloseConnected,
  } = useDisclosure();
  const [selectedDistractor, setselectedDistractor] = useState<number | null>(
    null
  );
  const toast = useToast();

  const schema = joi.object({
    selectDistractor: joi.number().required(),
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
    const updatedFormData = [
      props.formData[0],
      props.formData[1],
      data.selectDistractor,
      ...props.formData.slice(3),
    ];
    props.setFormData(updatedFormData);

    navigate('/Therapycenters');
    props.onClose();
    // props.oncloseselectlevel();
    // props.onclosemodules();
    // props.onCloseBooks();
    onOpenConnected();
    toast({
      title: 'Success',
      description: `You assigned level ${updatedFormData[0]} and book ${props.formData[1]} and distractor  ${selectedDistractor} 
      module name is ${module} and session id is ${sessionId}`,
      status: 'success',
      duration: 9000,
      position: 'top-right',
    });

    console.log(
      `You assigned level ${updatedFormData[0]} and book ${props.formData[1]} and distractor  ${selectedDistractor} 
      module name is ${module} and session id is ${sessionId}`
    );
    console.log('Array of menu choices', updatedFormData);
  };

  const handleBackToSelectBook = () => {
    props.onClose();
  };

  const handleButtonClick = (distractor: number) => {
    setselectedDistractor(distractor);
    setValue('selectDistractor', distractor);
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
          <Box borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            <ModalCloseButton marginLeft="100px" />
          </Box>
          <ModalHeader textAlign="center" fontSize="1rem">
            Select Distractors
          </ModalHeader>

          <ModalBody fontSize="20px" fontWeight="600" mt="25px">
            <FormControl isInvalid={!!errors.selectLevel}>
              <Stack spacing={4} direction="column" align="center">
                <Button
                  onClick={() => handleButtonClick(1)}
                  bg={selectedDistractor === 1 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectDistractor')}
                  value={1}
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
                  value={2}
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
                  value={3}
                >
                  3
                </Button>
              </Stack>
              <FormErrorMessage>
                {errors.selectDistractor && 'Please select a Distractor.'}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="center">
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
              Back to Select Book
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
              Play
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {onOpenConnected && (
        <Openconnected
          isOpen={isOpenConnected}
          onClose={onCloseConnected}
          onclosemodules={props.onclosemodules}
          onCloseBooks={props.onCloseBooks}
          oncloseselectlevel={props.oncloseselectlevel}
        />
      )}
    </>
  );
};

export default SelectDistractors;