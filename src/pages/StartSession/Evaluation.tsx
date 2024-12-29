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
import usePopupsHandler from '@renderer/Context/PopupsHandlerContext';
import { useTranslation } from 'react-i18next';

export default function SelectEvaluation(props: any) {
  const { sessionId } = useStartSessionContext();
  const { popupFunctions } = usePopupsHandler();
 const { t } = useTranslation();
  const { closeSelectingAHeadset, closeSelectingAChild } = popupFunctions;

  const toast = useToast();
  const schema = Joi.object({
    Evaluation: Joi.string().required().messages({
      'string.empty': t('errorEvaluation'),
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

    evaluation(data);
  };

  const evaluation = async (data: any) => {
    const token = await (window as any).electronAPI.getPassword('token'); // Replace 'your_token_here' with your actual token

    const formData = {
      evaluation: data.Evaluation,
      note: data.Notes,
    };
    const configD = {
      method: 'put', // Method should be in lowercase
      url: `${config.apiURL}/api/v1/sessions/${sessionId}/add_evaluation`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: formData,
    };

    axios(configD)
      .then((response) => {
        console.log(response.data);
        // Handle response
        props.onClose();
        props.closeopenconnected();
        props.closemodules();
        closeSelectingAHeadset();
        closeSelectingAChild();
        navigate('/home');
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: 'error',
          description: `${error.response.data.error}`,
          status: 'error',
          duration: 5000,
          position: 'top-right',
        });
        // Handle error
      });
  };

  return (
    <Box>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <ModalOverlay />
        <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
          <ModalHeader textAlign="center" fontSize="30px">
            {t('sessionOverallEvaluation')}
          </ModalHeader>
          <ModalBody fontSize="20px" fontWeight="600" mt="5px">
            <Text mt="25px">{t('sessionOverallEvaluation')}</Text>
            <GridItem>
              <Select
                {...register('Evaluation')}
                id="Evaluation"
                placeholder={t('selectEvaluation')}
                size="sm"
              >
                <option value="poor">{t('poor')}</option>
                <option value="average">{t('average')}</option>
                <option value="good">{t('good')}</option>
                <option value="very_good"> {t("veryGood")}</option>
                <option value="excellent">{t('excellent')}</option>
              </Select>
            </GridItem>
            {errors.Evaluation && (
              <Text color="red.500" fontSize={'17px'}>
                {errors.Evaluation.message as string}
              </Text>
            )}
            <GridItem>
              <Text mt="25px">{t('sessionNotes')} </Text>
              <Textarea
                {...register('Notes')}
                id="Notes"
                value={value}
                onChange={handleInputChange}
                placeholder={t("sampleplaceholder")}
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
              fontFamily="Graphik LCG"
              fontWeight="700"
              fontSize="18px"
              onClick={handleSubmit(handleFormSubmit)}
            >
              {t("sessionDataSubmitted")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
