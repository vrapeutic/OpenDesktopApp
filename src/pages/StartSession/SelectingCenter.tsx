import React, { useState, useEffect, useContext } from 'react';
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
  useDisclosure,
} from '@chakra-ui/react';
import { config } from '@renderer/config';
import SelectingHeadset from './SelectingHeadset';
import Joi from 'joi';
import axios from 'axios';
import { dataContext } from '@renderer/shared/Provider';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import usePopupsHandler, {
  PopupsHandlerProvider,
} from '@renderer/Context/PopupsHandlerContext';
import SelectingHeadset2 from './headset2';

export default function SelectingCenter(props: any) {
  const {
    isOpen: isHeadsetOpen,
    onOpen: onHeadsetOpen,
    onClose: onHeadsetClose,
  } = useDisclosure();
  const [kids, setKids] = useState([]);
  const [childId, setChildId] = useState('');
  const selectedCenterContext = useContext(dataContext);
  const { addFunction } = usePopupsHandler();

  const schema = Joi.object({
    kid: Joi.string().required().messages({
      'string.empty': 'You must select a child',
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onTouched',
  });

  const getKids = async () => {
    const token = await (window as any).electronAPI.getPassword('token');
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get(
        `${config.apiURL}/api/v1/centers/${selectedCenterContext.id}/kids?include=diagnoses,sessions`,

        { headers }
      );
      setKids(response.data.data);
    } catch (error) {
      console.error('Error fetching kids:', error);
    }
  };

  const handleFormSubmit = (data: any) => {
    console.log('Form submitted with data: ', data);
    console.log(
      `center id ${selectedCenterContext.id} , child id  ${data.kid}`
    );
    setChildId(data.kid);
    onHeadsetOpen();
    props.onClose();
    // reset();
  };

  useEffect(() => {
    if (selectedCenterContext.id) {
      getKids();
      addFunction('closeSelectingAChild', props.onClose);
    }
  }, [selectedCenterContext.id]);

  return (
    <Box>
      <Modal isOpen={props.isOpen} onClose={props.onClose}     closeOnOverlayClick={false}
        closeOnEsc={false}>
        <ModalOverlay />
        <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
          <ModalHeader textAlign="center" fontSize="30px">
            Start a session
          </ModalHeader>
          {selectedCenterContext.id ? (
            <>
              <ModalBody fontSize="20px" fontWeight="600" mt="15px">
                <Text mt="25px">Select a child</Text>
                <GridItem>
                  <Select
                    {...register('kid')}
                    id="kid"
                    name="kid"
                    placeholder="Select Child"
                    size="sm"
                  >
                    {kids.map((kid) => (
                      <option value={kid.id} key={kid.id}>
                        {kid?.attributes.name}
                      </option>
                    ))}
                  </Select>
                </GridItem>
                {errors.kid && (
                  <Text color="red.500">{errors.kid.message as string}</Text>
                )}
              </ModalBody>
              <ModalFooter display={'flex'} justifyContent={'center'}>
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
                  Cancel Session
                </Button>
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
                  Next
                </Button>
              </ModalFooter>
            </>
          ) : (
            <ModalHeader textAlign="center" fontSize="1.2rem" color="red">
              You should select a center first from home
              <Button
                  w="180px"
                  h="54px"
                  mt={50}
                  mx={2}
                  bg="#00DEA3"
                  borderRadius="12px"
                  color="#FFFFFF"
                  fontFamily="Graphik LCG"
                  fontWeight="700"
                  fontSize="15px"
                  onClick={props.onClose}
                >
                  Cancel 
                </Button>
            </ModalHeader>
          )}
        </ModalContent>
      </Modal>

      {isHeadsetOpen && (
        <SelectingHeadset2
          isOpen={isHeadsetOpen}
          onClose={onHeadsetClose}
          centerId={selectedCenterContext.id}
          childId={childId}
        />
      )}
    </Box>
  );
}
