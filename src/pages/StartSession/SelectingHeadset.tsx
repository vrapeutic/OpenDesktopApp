import React, { useState, useEffect, useContext, useCallback } from 'react';
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
import { config } from '../../config';
import axios from 'axios';
import { dataContext } from '../../shared/Provider';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import SelectingModule from './SelectingModule';
import { useStartSessionContext } from '../../Context/StartSesstionContext';
import { getMe } from '@renderer/cache';
import useSocketManager from '../../Context/SocketManagerProvider';
import { ErrorPopup } from './ErrorPopup';
import usePopupsHandler from '@renderer/Context/PopupsHandlerContext';
import { END_SESSION_MESSAGE } from '@main/constants';

interface ErrorsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAnotherHeadset: () => void;
  onCancelSession: () => void;
  closeselectingheadset: () => void;
}

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
interface SelectingHeadsetProps {
  centerId: string;
  onClose: () => void;
  isOpen: boolean;
  childId: string;
}
const ErrorsModal: React.FC<ErrorsModalProps> = ({
  isOpen,
  onClose,
  onSelectAnotherHeadset,
  onCancelSession,
  closeselectingheadset,
}) => {
  const navigate = useNavigate();
  const { startSession, sessionId } = useStartSessionContext();

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
  const token = getMe().token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const toast = useToast();

  const endSessionApi = async () => {
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
    return axios.put(
      `${config.apiURL}/api/v1/sessions/${sessionId}/end_session`,
      { vr_duration: differenceInMinutes },
      { headers }
    );
  };

  const endSessionId = async () => {
    try {
      await endSessionApi();
      onCancelSession();
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'An error occurred',
        status: 'error',
        duration: 3000,
        position: 'top-right',
      });
    }
  };

  const SelectAnother = async () => {
    try {
      await endSessionApi();
      onSelectAnotherHeadset();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'An error occurred',
        status: 'error',
        duration: 3000,
        position: 'top-right',
      });
    }
  };
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
              marginLeft="10px"
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
              onClick={SelectAnother}
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

interface SelectingHeadsetProps {
  isOpen: boolean;
  onClose: () => void;
  centerId: string;
  childId: string;
}

interface FormData {
  headset: string;
}

const SelectingHeadset: React.FC<SelectingHeadsetProps> = (props) => {
  const {
    isOpen: isErrorOpen,
    onOpen: onErrorOpen,
    onClose: onErrorClose,
  } = useDisclosure();
  const [headsets, setHeadsets] = useState<any[]>([]);
  const { setStartSession, setheadsetid } = useStartSessionContext();
  const toast = useToast();
  const [errorMessages, setErrorMessages] = useState('');
  const selectedCenterContext = useContext(dataContext);
  const { addFunction } = usePopupsHandler();
  const {
    dispatchSocketMessage,
    checkIfServiceExists,
    checkAppNetWorkConnection,
  } = useSocketManager();

  const [deviceIsFound, setDeviceIsFound] = useState(false);
  const [sessionId, setSessionId] = useState<string>(null);
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
  } = useForm<FormData>({
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

  // const handleFormSubmit = () => {
  //   console.log('Form submitted with data in headset.');
  //   setErrorMessages('This is a test error message.');
  //   onErrorOpen();
  // };
  const getSessionId:any = async (dataheadset: string) => {
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
      setSessionId(response.data.data.id);
      setStartSession(response.data.data.attributes.created_at);
      return { success: true }; // Success
    } catch (error) {
      console.error('Error assigning session id:', error.response.data.error);
      return { success: false, error: error.response.data.error }; 
    }
  };
  const handleFormSubmit = async () => {
    const headsetId = getValues(HEADSET_FIELD);
    const existingDevice = await checkIfServiceExists(headsetId);
    const appIsConnectedToInternet = await checkAppNetWorkConnection();

    if (appIsConnectedToInternet && existingDevice) {
      // end old session
      dispatchSocketMessage(
        END_SESSION_MESSAGE,
        { deviceId: headsetId },
        headsetId
      );

      getSessionId();
      setSessionIdState()
      console.log(headsetId);
      console.log(existingDevice);
      setDeviceIsFound(true);
    } else {
      const errorMessage = !appIsConnectedToInternet
        ? 'You are not connected to the internet.'
        : 'The selected headset is not connected.';

      setErrorMessages(errorMessage);
      onErrorOpen();
    }
  };

 
  const setSessionIdState = useCallback(async () => {
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
          headset_id: getValues(HEADSET_FIELD),
        },
        { headers }
      );

      console.log(
        'API Response from session id: data.data.id',
        response.data.data.id
      );
      setSessionId(response?.data?.data?.id);
    } catch (error) {
      console.log('Error assigning center to module:', error);
    } finally {
      // TODO: remove this after integrating a working session id API call
      if (!sessionId) {
        const sessionID = localStorage.getItem('sessionID');
        const sessionHex = Math.floor(
          Math.random() * 0xffffff * 10000000
        ).toString(12);

        localStorage.setItem('sessionID', sessionID || sessionHex);
        setSessionId(sessionHex);
      }
    }
  }, [getValues, props.centerId, props.childId]);

  const handleCancelSession = () => {
    onErrorClose();
    props.onClose();
  };

  const handleSelectAnotherHeadset = () => {
    onErrorClose();
  };

  useEffect(() => {
    if (selectedCenterContext.id) {
      getHeadsets();
    }
    addFunction('closeSelectingAHeadset', props.onClose);
    addFunction('renderDisconnectedHeadSetError', (errorMessage = 'manar test') => {
      setDeviceIsFound(false);

      errorMessage && setErrorMessages(errorMessage);
      console.log(errorMessage);
      onErrorOpen();
    });
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
                  onClick={handleSubmit(handleFormSubmit)}
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

      {deviceIsFound && (
        <SelectingModule
          isOpen={deviceIsFound}
          onClose={() => setDeviceIsFound(false)}
          headsetId={getValues(HEADSET_FIELD)}
          sessionId={sessionId}
        />
      )}
    </>
  );
};

export default SelectingHeadset;
