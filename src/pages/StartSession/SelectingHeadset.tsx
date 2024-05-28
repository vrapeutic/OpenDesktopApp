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
  useToast,
} from '@chakra-ui/react';
import { config } from '@renderer/config';
import axios from 'axios';
import { dataContext } from '@renderer/shared/Provider';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import SelectingModule from './SelectingModule';
import { getMe } from '@renderer/cache';
import { useStartSessionContext } from '@renderer/Context/StartSesstionContext';

const ErrorsModal = ({
  isOpen,
  onClose,
  onSelectAnotherHeadset,
  onCancelSession,
  closeselectingheadset,
}) => {
  const navigate = useNavigate();

  const {
    isOpen: ismoduleopen,
    onOpen: onmoduleOpen,
    onClose: onmoduleClose,
  } = useDisclosure();

  const OpenModulemodal = () => {
    onClose();
    onmoduleOpen();
  };

  const CloseModuleModal = () => {
    onmoduleClose();
    closeselectingheadset();
    navigate('/');
  };

  const { startSession, sessionId } = useStartSessionContext();
 console.log(sessionId , startSession)
  const token = getMe().token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const toast = useToast();
  const endSissionApi = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');

    // Format the date string
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

    console.log(formattedDate);

    const date1String = startSession;
    const date2String = formattedDate;
    console.log(date1String, date2String);

    // Create Date objects
    const date1: any = new Date(date1String);
    const date2: any = new Date(date2String);

    // Calculate the difference in milliseconds
    const timeDifferenceInMilliseconds = Math.abs(date2 - date1);
    console.log(timeDifferenceInMilliseconds);
    // Convert milliseconds to seconds
    const differenceInMinutes = Math.floor(
      (timeDifferenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );
    console.log(differenceInMinutes);
return    axios.put(
      `${config.apiURL}/api/v1/sessions/${sessionId}/end_session`,
      { vr_duration:differenceInMinutes},
      { headers }
    );
  };

  const endSessionId = async () => {
    try {
      await endSissionApi();
      onCancelSession();
      navigate('/');
    } catch (error) {
      console.log(error.response);
      toast({
        title: 'error',
        description: `${error.response.data.error}`,
        status: 'error',
        duration: 3000,
        position: 'top-right',
      });
    
    }
  };



 
  const SelectAnther =async ()=> {
    try{
      await endSissionApi();
      onSelectAnotherHeadset()
    }catch(error) {
      console.log(error.response);
      toast({
        title: 'error',
        description: `${error.response.data.error}`,
        status: 'error',
        duration: 3000,
        position: 'top-right',
      });
    
    }

   

  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h="400px" w="800px" bgColor="#FFFFFF" borderRadius="10px">
          <ModalHeader textAlign="center" fontSize="30px">
            Start a session
          </ModalHeader>
          <ModalBody fontSize="20px" fontWeight="600" mt="15px">
            <Text mt="25px">
              The selected headset could not be found on this network
            </Text>

            <Button
              w="12rem"
              h="54px"
              bg="#00DEA3"
              borderRadius="12px"
              color="#FFFFFF"
              fontFamily="Roboto"
              fontWeight="700"
              fontSize="1rem"
              ml="10px"
              onClick={OpenModulemodal}
            >
              Continue to select module
            </Button>
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
              fontSize="1rem"
              marginRight="10px"
              onClick={endSessionId}
            >
              Cancel session
            </Button>
            <Button
              w="214px"
              h="54px"
              bg="#00DEA3"
              borderRadius="12px"
              color="#FFFFFF"
              fontFamily="Roboto"
              fontWeight="700"
              fontSize="1rem"
              marginLeft="10px"
              onClick={SelectAnther
                }
            >
              Select another headset
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {onmoduleOpen && (
        <SelectingModule isOpen={ismoduleopen} onClose={CloseModuleModal} />
      )}
    </>
  );
};

const SelectingHeadset = (props: any) => {
  const {
    isOpen: isErrorOpen,
    onOpen: onErrorOpen,
    onClose: onErrorClose,
  } = useDisclosure();
  const [headsets, setHeadsets] = useState([]);
  const [headsetid, setHeadsetid] = useState('');
  const { setSessionId, setStartSession } = useStartSessionContext();

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

  const handleFormSubmit = (data: any) => {
    console.log('Selected headset:', data.headset);
    setHeadsetid(data.headset);
    Getsessionid(data.headset);
    console.log('Form submitted with data in headset.');
    setErrorMessages('This is a test error message.');
    onErrorOpen();
  };

  const handleCancelSession = () => {
    onErrorClose();
    props.onClose();
  };

  const handleSelectAnotherHeadset = () => {
    onErrorClose();
  };

  const Getsessionid = async (dataheadset: any) => {

    const token = getMe().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.post(
        `${config.apiURL}/api/v1/sessions`,
        {
          center_id: props.centerId,
          child_id: props.childId,
          headset_id: dataheadset,
        },
        { headers }
      );

      console.log(
        'API Response from session id: data.data.id',
        response.data.data.id,
        response.data.data.attributes
      );
      await setSessionId(response.data.data.id);
      setStartSession(response.data.data.attributes.created_at);
    } catch (error) {
      console.log('Error assigning center to module:', error);
    }
  };

  useEffect(() => {
    // Getsessionid()
    if (selectedCenterContext.id) {
      getHeadsets();
    }
  }, [selectedCenterContext.id]);

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
                    {...register('headset')}
                    id="headset"
                    name="headset"
                    placeholder="Select headset"
                    size="sm"
                  >
                    {headsets.map((headset) => (
                      <option value={headset.id} key={headset.id}>
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
                  onClick={handleSubmit(handleFormSubmit)} // Use handleSubmit here
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
        closeselectingheadset={props.onClose}
        onCancelSession={handleCancelSession}
        onSelectAnotherHeadset={handleSelectAnotherHeadset}
        // errorMessages={errorMessages}
      />
    </>
  );
};

export default SelectingHeadset;
