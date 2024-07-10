import {
  Button,
  GridItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { config } from '@renderer/config';
import { dataContext } from '@renderer/shared/Provider';
import axios from 'axios';
import Joi from 'joi';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { END_SESSION_MESSAGE } from '@main/constants';
import usePopupsHandler from '@renderer/Context/PopupsHandlerContext';
import { useStartSessionContext } from '@renderer/Context/StartSesstionContext';
import { getMe } from '@renderer/cache';
import useSocketManager from '../../Context/SocketManagerProvider';
import { ErrorPopup } from './ErrorPopup';
import SelectingModule from './SelectingModule';

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

const SelectingHeadset2 = (props: SelectingHeadsetProps) => {
  const {
    setStartSession,
    setheadsetid,
    headsetid,
    sessionId,
    setSessionId,
    headsetKey,
    setHeadsetKey,
  } = useStartSessionContext();
  const { addFunction } = usePopupsHandler();
  const {
    dispatchSocketMessage,
    checkIfServiceExists,
    checkAppNetWorkConnection,
  } = useSocketManager();

  const [deviceIsFound, setDeviceIsFound] = useState(false);
  // const [sessionId, setSessionId] = useState<string>(null);

  const {
    isOpen: isErrorOpen,
    onOpen: onErrorOpen,
    onClose: onErrorClose,
  } = useDisclosure();
  const [headsets, setHeadsets] = useState([]);
  const selectedCenterContext = useContext(dataContext);
  const [errorMessages, setErrorMessages] = useState('');
  const navigate = useNavigate();

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
  const handleFormSubmit = async (data: any) => {
    // Access the selected headset value from data
    const selectedHeadsetId = data.headset;

    // If headsets array is available, find the corresponding headset
    const selectedHeadset = headsets.find(
      (headset) => headset.id === selectedHeadsetId
    );

    if (selectedHeadset) {
      const headsetKeyt = selectedHeadset.attributes.key;
      setHeadsetKey(headsetKeyt);
      console.log('Selected headset key:', headsetKey);
      // You can use the headsetKey value here as needed
    }

    await setheadsetid(selectedHeadsetId);
    const existingDevice = await checkIfServiceExists(headsetKey);
    const appIsConnectedToInternet = await checkAppNetWorkConnection();
    console.log(appIsConnectedToInternet, sessionId, existingDevice);
    if (appIsConnectedToInternet && existingDevice) {
      console.log('finddivice', existingDevice);
      // if (appIsConnectedToInternet) {
      // End old session
      dispatchSocketMessage(
        END_SESSION_MESSAGE,
        { deviceId: headsetKey },
        headsetKey
      );

      const sessionResponse = await getSessionId(data.headset);

      if (sessionResponse.success) {
        console.log(headsetid);
        console.log(existingDevice);
        setDeviceIsFound(true);
      } else {
        // Handle error from getSessionId
        const errorMessage =
          sessionResponse.error || 'Error assigning session ID.';
        setErrorMessages(errorMessage);
        onErrorOpen();
      }
    } else {
      const errorMessage = !appIsConnectedToInternet
        ? 'You are not connected to the internet.'
        : 'The selected headset is not connected. You might need first to click on Start Service in the Master App on the VR headset.';

      setErrorMessages(errorMessage);
      onErrorOpen();
    }
  };

  const getSessionId = async (dataheadset: any) => {
    console.log('getSessionId');
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
      console.log('setSessionId', response?.data?.data?.id);
      // setSessionId(response.data.data.id);
      setSessionId(response.data.data.id);
      setStartSession(response.data.data.attributes.created_at);

      return { success: true }; // Success
    } catch (error) {
      onErrorOpen();
      console.error('Error assigning session id:', error.response.data.error);
      return { success: false, error: error.response.data.error };
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

    addFunction('closeSelectingAHeadset', props.onClose);
    addFunction('renderDisconnectedHeadSetError', (errorMessage = '') => {
      setDeviceIsFound(false);
      errorMessage && setErrorMessages(errorMessage);
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
                <Text mt="25px">Select a VR Headset</Text>
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
                  onClick={() => {
                    props.onClose();
                    navigate('/home');
                  }}
                >
                  Cancel Session
                </Button>
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
        closeSelectingAHeadset={props.onClose}
        onCancelSession={handleCancelSession}
        onSelectAnotherHeadset={handleSelectAnotherHeadset}
        errorMessages={errorMessages}
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

export default SelectingHeadset2;
