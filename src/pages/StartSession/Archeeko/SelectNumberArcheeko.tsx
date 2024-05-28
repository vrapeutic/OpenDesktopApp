import {
  Box,
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
  useToast,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import SelectDistractors from './SelectDistractors';

import OpenconnectedArcheeko from './OpenconnectedArcheeko';
import { useStartSessionContext } from '@renderer/Context/StartSesstionContext';
import { useNavigate } from 'react-router-dom';
const SelectNumberArcheeko = (props: any) => {
  console.log('select form data in number in 30', props.formData);
  const toast = useToast();
  const { module, sessionId } = useStartSessionContext();
  const {
    isOpen: isOpenConnected,
    onOpen: onOpenConnected,
    onClose: onCloseConnected,
  } = useDisclosure();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any[]>([]);
  const {
    isOpen: isOpenSelectDistractors,
    onOpen: onOpenSelectDistractors,
    onClose: onCloseSelectDistractors,
  } = useDisclosure();

  const schema = joi.object({
    selectNumber: joi.number().required(),
  });
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onSubmit',
  });


  let updatedFormData;
  const handleFormSubmit = (data: any) => {
    console.log(data.selectNumber);
    updatedFormData = [
      props.formData[0],
      props.formData[1],
      data.selectNumber,
      ...props.formData.slice(3),
    ];
    props.setFormData(updatedFormData);

    console.log('updated form data in number', updatedFormData);
    if (props.formData[0] === 2 || props.formData[0] === 3) {
      onOpenSelectDistractors();
    } else {
      navigate('/Therapycenters');
      onOpenConnected();
      console.log('session id', sessionId);

      toast({
        title: 'Success',
        description: `You assigned level ${updatedFormData[0]} ,environment ${props.formData[1]}, Number ${selectedNumber} ,
         module name is ${module} and session id is ${sessionId}`,
        status: 'success',

        duration: 5000,
        position: 'top-right',
      });

      console.log(
        `You assigned level ${updatedFormData[0]} ,environment ${props.formData[1]}, Number ${selectedNumber} ,
         module name is ${module} and session id is ${sessionId}`
      );
      console.log('Array of menu choices', updatedFormData);
    }
  };

  const handleButtonClick = (number: number) => {
    setSelectedNumber(number);
    setValue('selectNumber', number);
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
            Choose Number of Arrows/Shots
          </ModalHeader>

          <ModalBody fontSize="20px" fontWeight="600" mt="25px">
            <FormControl isInvalid={!!errors.selectNumber}>
              <Stack spacing={4} direction="column" align="center">
                <Button
                  onClick={() => handleButtonClick(1)}
                  bg={selectedNumber === 1 ? 'blue.300' : 'gray.300'}
                  color="black"
                  fontSize="0.65rem"
                  width={'100px'}
                  {...register('selectNumber')}
                >
                  1
                </Button>
                <Button
                  onClick={() => handleButtonClick(2)}
                  bg={selectedNumber === 2 ? 'blue.300' : 'gray.300'}
                  color="black"
                  fontSize="0.65rem"
                  width={'100px'}
                  {...register('selectNumber')}
                >
                  2
                </Button>
                <Button
                  onClick={() => handleButtonClick(3)}
                  bg={selectedNumber === 3 ? 'blue.300' : 'gray.300'}
                  color="black"
                  fontSize="0.65rem"
                  width={'100px'}
                  {...register('selectNumber')}
                >
                  3
                </Button>
              </Stack>

              <FormErrorMessage>
                {errors.selectNumber && 'Please select a number.'}
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
              {props.level != 1 ? 'Next' : 'Play'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {props.level != 1 && (
        <SelectDistractors
          isOpen={props.level !== 1 ? isOpenSelectDistractors : null}
          onClose={onCloseSelectDistractors}
          formData={props.formData}
          updatedFormData={updatedFormData}
          selectedNumber={selectedNumber}
          setFormData={props.setFormData}
          onclosemodules={props.onclosemodules}
          onCloseSelectEnvironment={props.onCloseSelectEnvironment}
          onCloseSelectNumber={props.onClose}
          oncloseselectlevel={props.oncloseselectlevel}
        />
      )}

      {onOpenConnected && (
        <OpenconnectedArcheeko
          isOpen={isOpenConnected}
          onClose={onCloseConnected}
          onclosemodules={props.onclosemodules}
          onCloseSelectEnvironment={props.onCloseSelectEnvironment}
          SelectDistractors={onCloseSelectDistractors}
          onCloseSelectNumber={props.onClose}
          oncloseselectlevel={props.oncloseselectlevel}
        />
      )}
    </>
  );
};

export default SelectNumberArcheeko;
