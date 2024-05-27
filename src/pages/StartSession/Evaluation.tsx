import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Text,
  Button,
  ModalHeader,
  Select,
  GridItem,
  Box,
  Textarea,
} from '@chakra-ui/react';

import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function SelectEvaluation(props) {
  const schema = Joi.object({
    Evaluation: Joi.string().required().messages({
      'string.empty': 'You must select an Evaluation',
    }),
    Notes: Joi.string().required().messages({
      'string.empty': 'You must enter Notes',
    }),
  });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onTouched',
  });

  const [value, setValue] = useState('');

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  const handleFormSubmit = (data) => {
    console.log('Evaluation:', data.Evaluation);
    console.log('Notes:', data.Notes);
    props.onClose();
    props.closeopenconnected();
    props.closemodules()
         navigate('/');

  };

  return (
    <Box>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
          <ModalHeader textAlign="center" fontSize="30px">
            Session Overall Evaluation
          </ModalHeader>
          <ModalBody fontSize="20px" fontWeight="600" mt="5px">
            <Text mt="25px">Session Overall Evaluation</Text>
            <GridItem>
              <Select
                {...register('Evaluation')}
                id="Evaluation"
                placeholder="Select Evaluation"
                size="sm"
              >
                <option value="1">Poor</option>
                <option value="2">Average</option>
                <option value="3">Good</option>
                <option value="4">Very Good</option>
                <option value="5">Excellent</option>
              </Select>
            </GridItem>
            {errors.Evaluation && (
              <Text color="red.500">{errors.Evaluation.message as string}</Text>
            )}
            <GridItem>
              <Text mt="25px">Session Notes (Optional)</Text>
              <Textarea
                {...register('Notes')}
                id="Notes"
                value={value}
                onChange={handleInputChange}
                placeholder="Here is a sample placeholder"
                size="sm"
              />
            </GridItem>
          </ModalBody>
          <ModalFooter>
            <Button
              w="214px"
              h="54px"
              bg="#00DEA3"
              borderRadius="12px"
              color="#FFFFFF"
              fontFamily="Roboto"
              fontWeight="700"
              fontSize="18px"
              onClick={handleSubmit(handleFormSubmit)}
            >
              Submit session data
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
