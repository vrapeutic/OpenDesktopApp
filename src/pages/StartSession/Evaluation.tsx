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
  useToast,
} from '@chakra-ui/react';

import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { config } from '@renderer/config';
import { useStartSessionContext } from '@renderer/Context/StartSesstionContext';

export default function SelectEvaluation(props: any) {
  const { sessionId } = useStartSessionContext();
  const toast = useToast();
  const schema = Joi.object({
    Evaluation: Joi.string().required().messages({
      'string.empty': 'You must select an Evaluation',
    }),
    Notes: Joi.string().optional(),
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

  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  const handleFormSubmit = (data: any) => {
    console.log('Evaluation:', data.Evaluation);
    console.log('Notes:', data.Notes);

    evaluation();
  };

  const evaluation = async () => {
    const token = await (window as any).electronAPI.getPassword('token'); // Replace 'your_token_here' with your actual token

    const data = {
      evaluation: 'good',
      note: 'Hellouu World!',
    };

    const configD = {
      method: 'put', // Method should be in lowercase
      url: `${config.apiURL}/api/v1/sessions/${sessionId}/add_evaluation`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(configD)
      .then((response) => {
        console.log(response.data);
        // Handle response
        props.onClose();
        props.closeopenconnected();
        props.closemodules();
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: 'error',
          description: `${error.response.data.error}`,

          status: 'error',
          duration: 9000,
          position: 'top-right',
        });
        // Handle error
      });
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
              <Text color="red.500" fontSize={"17px"}>{errors.Evaluation.message as string}</Text>
            )}
            <GridItem>
              <Text mt="25px">Session Notes </Text>
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
