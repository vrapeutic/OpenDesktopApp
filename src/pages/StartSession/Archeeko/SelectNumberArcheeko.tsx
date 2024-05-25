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
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import SelectDistractors from './SelectDistractors';
import axios from 'axios';
import { config } from '../../../config';

import { dataContext } from '@renderer/shared/Provider';
import { getMe } from '@renderer/cache';
import Openconnected from '../openconnected';

const SelectNumberArcheeko = (props: any) => {
  const {
    isOpen: isOpenConnected,
    onOpen: onOpenConnected,
    onClose: onCloseConnected,
  } = useDisclosure();
  const selectedCenterContext = useContext(dataContext);
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

  const token = getMe().token;
  const headers = {
      Authorization: `Bearer ${token}`,
  };
  const postSessionId = (body: any) => {
    return axios.post(`${config.apiURL}/api/v1/Session`, { body }, { headers });
  };

  const Sessionid = async () => {
    try {
      await postSessionId({ center_id:`${selectedCenterContext.id}`, child_id: '1', headset_id: '21' });
      console.log(postSessionId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async (data: any) => {
    console.log(props.level);

    if (props.level != 1) {
      onOpenSelectDistractors();
    } else {
      props.onClose();
      // props.onclosemodules();

      Sessionid();
      onOpenConnected()
    }
    const hasEnvironmentObject = formData.some((obj) => 'number' in obj);

    const updatedFormData = hasEnvironmentObject
      ? [
          ...props.formData.slice(0, 2),
          { number: data.selectNumber },
          ...props.formData.slice(3),
        ]
      : [
          ...props.formData.slice(0, 2),
          { number: data.selectNumber, ...props.formData.slice(2) },
        ];

    props.setFormData(updatedFormData);
    setFormData(updatedFormData);
    console.log(updatedFormData);

    const numbers = updatedFormData.map((obj) => Object.values(obj)[0]);

    console.log(numbers);
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
          formData={formData}
          setFormData={setFormData}
          oncloseselectlevel={props.onClose}
          onclosemodules={props.onclosemodules}
        />
      )}

{onOpenConnected && (
        <Openconnected isOpen={isOpenConnected} onClose={onCloseConnected} onclosemodules={props.onclosemodules}/>
      )}
    </>
  );
};

export default SelectNumberArcheeko;
