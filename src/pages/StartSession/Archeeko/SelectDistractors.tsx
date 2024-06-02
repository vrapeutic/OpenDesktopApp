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
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useNavigate } from 'react-router-dom';

import OpenconnectedArcheeko from './OpenconnectedArcheeko';
import { useStartSessionContext } from '@renderer/Context/StartSesstionContext';

const SelectDistractors = (props: any) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { module, sessionId } = useStartSessionContext();
  const {
    isOpen: isOpenConnected,
    onOpen: onOpenConnected,
    onClose: onCloseConnected,
  } = useDisclosure();

  const [formData, setFormData] = useState<any[]>([]);
  const [selectedDistractors, setSelectedDistractors] = useState<number | null>(
    null
  );

  const schema = joi.object({
    selectDistractors: joi.number().required(),
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
  
    const updatedFormData = [
      props.formData[0],
      props.formData[1],
      props.selectedNumber,
      data.selectDistractors,
      ...props.formData.slice(4),
    ];
   

    console.log("all subimtted data in distractor",updatedFormData)
    props.setFormData(updatedFormData);

    navigate('/Therapycenters');
    props.onClose();
  
    onOpenConnected();
    toast({
      title: 'Success',
      description: `You assigned level ${updatedFormData[0]} , environment ${props.formData[1]} , Number ${props.selectedNumber},
       distractor  ${selectedDistractors} 
      module name is ${module} and session id is ${sessionId}`,
      status: 'success',
      duration: 9000,
      position: 'top-right',
    });

    console.log(
      `You assigned level ${updatedFormData[0]} , environment ${props.formData[1]} , Number ${props.selectedNumber},
       distractor ${selectedDistractors} 
      module name is ${module} and session id is ${sessionId}`
    );
    console.log('Array of menu choices', updatedFormData);
  };
  const handleButtonClick = (distractors: number) => {
    setSelectedDistractors(distractors);
    setValue('selectDistractors', distractors);
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
            Choose Number of Distractors
          </ModalHeader>

          <ModalBody fontSize="20px" fontWeight="600" mt="25px">
            <FormControl isInvalid={!!errors.selectDistractors}>
              <Stack spacing={4} direction="column" align="center">
                <Button
                  onClick={() => handleButtonClick(1)}
                  bg={selectedDistractors === 1 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectDistractors')}
                >
                  1
                </Button>
                <Button
                  onClick={() => handleButtonClick(2)}
                  bg={selectedDistractors === 2 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectDistractors')}
                >
                  2
                </Button>
                <Button
                  onClick={() => handleButtonClick(3)}
                  bg={selectedDistractors === 3 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectDistractors')}
                >
                  3
                </Button>
              </Stack>

              <FormErrorMessage>
                {errors.selectDistractors && 'Please select a Distractors .'}
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
              play
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {onOpenConnected && (
        <OpenconnectedArcheeko
          isOpen={isOpenConnected}
          onClose={onCloseConnected}
          onclosemodules={props.onclosemodules}
          onCloseSelectEnvironment={props.onCloseSelectEnvironment}
          SelectDistractors={props.onClose}
          onCloseSelectNumber={props.onCloseSelectNumber}
          oncloseselectlevel={props.oncloseselectlevel}
        />
      )}
    </>
  );
};

export default SelectDistractors;