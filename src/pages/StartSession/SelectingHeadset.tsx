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
  GridItem,
  Select,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import { config } from '@renderer/config';
import axios from 'axios';
import { dataContext } from '@renderer/shared/Provider';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import SelectingModule from './SelectingModule';

import useSocketManager from '../../Context/SocketManagerProvider';
import { ErrorPopup } from './ErrorPopup';

const HEADSET_FIELD = 'headset';

interface HeadSet {
  id: string;
  type: string;
  attributes: {
    name: string | null;
    brand: string;
    model: string | null;
    version: string | null;
    key: string;
  };
}

interface ErrorModalPropType {
  isOpen: boolean;
  onClose: () => void;
  onSelectAnotherHeadset: () => void;
  onCancelSession: () => void;
  closeSelectingAHeadset: () => void;
  errorMessages?: string;
}

const ErrorsModal = ({
  isOpen,
  onClose,
  onSelectAnotherHeadset,
  onCancelSession,
  closeSelectingAHeadset,
  errorMessages,
}: ErrorModalPropType) => {
  return (
    <ErrorPopup
      isOpen={isOpen}
      onClose={onClose}
      onSelectAnotherHeadset={onSelectAnotherHeadset}
      onCancelSession={onCancelSession}
      closeSelectingAHeadset={closeSelectingAHeadset}
      errorMessages={errorMessages}
    />
  );
};

const SelectingHeadset = (props) => {
  const navigate = useNavigate();
  const { checkIfServiceExists } = useSocketManager();
  const [deviceIsFound, setDeviceIsFound] = useState(false);
  const {
    isOpen: isErrorOpen,
    onOpen: onErrorOpen,
    onClose: onErrorClose,
  } = useDisclosure();
  const [headsets, setHeadsets] = useState([]);
  const selectedCenterContext = useContext(dataContext);
  const [errorMessages, setErrorMessages] = useState('');

  const schema = Joi.object({
    headset: Joi.string().required().messages({
      'string.empty': 'You must select a headset',
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onTouched',
  });

  const getHeadsets = async () => {
    const token = await (window as any).electronAPI.getPassword('token');
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get(
        `${config.apiURL}/api/v1/doctors/center_headsets?center_id=${props.centerId}`,
        { headers }
      );
      setHeadsets(response.data.data);
    } catch (error) {
      console.error('Error fetching center headsets:', error);
      setErrorMessages('Error fetching center headsets');
      onErrorOpen();
    }
  };

  const handleFormSubmit = async () => {
    const headsetId = getValues(HEADSET_FIELD);
    console.log('Form submitted with data in headset.');
    const existingDevice = await checkIfServiceExists(headsetId);

    if (!existingDevice) {
      console.log(headsetId);
      console.log(existingDevice);
      setDeviceIsFound(true);
    } else {
      setErrorMessages('This is a test error message.');
      onErrorOpen();
    }
  };

  const handleCancelSession = () => {
    onErrorClose();
    props.onClose(); // Close the SelectingHeadset component
  };

  const handleSelectAnotherHeadset = () => {
    onErrorClose();
    // Additional logic to open the component for selecting another headset
  };

  useEffect(() => {
    if (selectedCenterContext.id) {
      getHeadsets();
    }
  }, [selectedCenterContext.id]);

  const closeSelectingHeadset = () => {
    setDeviceIsFound(false);
    props.onClose();
  };
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
          <ModalHeader textAlign="center" fontSize="30px">
            Start a session
          </ModalHeader>
          {headsets.length > 0 ? (
            <>
              <ModalBody fontSize="20px" fontWeight="600" mt="15px">
                <Text mt="25px">Select a headset</Text>
                <GridItem>
                  <Select
                    {...(register(HEADSET_FIELD),
                    {
                      onChange: (e) => setValue(HEADSET_FIELD, e.target.value),
                    })}
                    id={HEADSET_FIELD}
                    name={HEADSET_FIELD}
                    placeholder="Select headseat"
                    size="sm"
                  >
                    {headsets.map((headset) => (
                      <option value={headset.key} key={headset.id}>
                        {headset?.attributes.key}
                      </option>
                    ))}
                  </Select>
                </GridItem>
                {errors.headset && (
                  <Text color="red.500">
                    {errors.headset.message as string}
                  </Text>
                )}
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
                  onClick={handleFormSubmit}
                >
                  Connect to headset
                </Button>
              </ModalFooter>
            </>
          ) : (
            <ModalHeader textAlign="center" fontSize="1.2rem" color="red">
              No VR headsets are available in this center
            </ModalHeader>
          )}
        </ModalContent>
      </Modal>

      <ErrorsModal
        isOpen={isErrorOpen}
        onClose={onErrorClose}
        closeSelectingAHeadset={props.onClose}
        onCancelSession={handleCancelSession}
        onSelectAnotherHeadset={handleSelectAnotherHeadset}
        errorMessages={errorMessages}
      />

      {deviceIsFound && (
        <SelectingModule
          isOpen={deviceIsFound}
          onClose={()=> setDeviceIsFound(false)}
          headsetId={getValues(HEADSET_FIELD)}
          closeErrorToSelectAnotherSet={handleSelectAnotherHeadset}
          closeSelectingAHeadset={props.onClose}
        />
      )}
    </>
  );
};

export default SelectingHeadset;
