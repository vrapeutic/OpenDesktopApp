import {
  Box,
  Button,
  GridItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
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
import { useTranslation } from 'react-i18next';




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
  const { addFunction, popupFunctions } = usePopupsHandler();
  const { closeSelectingAChild } = popupFunctions;
  const { t } = useTranslation();
  const {
 
    checkIfServiceExists,
    checkAppNetWorkConnection,
  } = useSocketManager();

  const [deviceIsFound, setDeviceIsFound] = useState(false);
  const {
    isOpen: isErrorOpen,
    onOpen: onErrorOpen,
    onClose: onErrorClose,
  } = useDisclosure();
  const [headsets, setHeadsets] = useState([]);
  const selectedCenterContext = useContext(dataContext);
  const [errorMessages, setErrorMessages] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const schema = Joi.object({
    headset: Joi.string().required().messages({
      'string.empty': t('selectHeadsetError'),
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
    setLoading(true);
    const token = await (window as any).electronAPI.getPassword('token');
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get(
        `${config.apiURL}/api/v1/doctors/center_headsets?center_id=${props.centerId}`,
        { headers }
      );
      setHeadsets(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching center headsets:', error);
      setErrorMessages(t('errorFetchingHeadsets'));
      onErrorOpen();
    }
  };

  const handleFormSubmit = async (data: any) => {
    const selectedHeadsetId = data.headset;
    const selectedHeadset = headsets.find(
      (headset) => headset.id === selectedHeadsetId
    );

    if (selectedHeadset) {
      const newHeadsetKey = selectedHeadset.attributes.key;
      setHeadsetKey(newHeadsetKey);
      setheadsetid(selectedHeadsetId);
      console.log('set headsetKey', newHeadsetKey);
      console.log('set headsetid', selectedHeadsetId);

      const existingDevice = await checkIfServiceExists(newHeadsetKey);
      const appIsConnectedToInternet = await checkAppNetWorkConnection();
      console.log(appIsConnectedToInternet, sessionId, existingDevice);
      if (appIsConnectedToInternet && existingDevice) {
        // dispatchSocketMessage(
        //   END_SESSION_MESSAGE,
        //   { deviceId: newHeadsetKey },
        //   newHeadsetKey
        // );

        const sessionResponse = await getSessionId(data.headset);

        if (sessionResponse.success) {
          setDeviceIsFound(true);
        } else {
          const errorMessage =
            sessionResponse.error || t('ErrorAssigningSessionID');
          setErrorMessages(errorMessage);
          onErrorOpen();
        }
      } else {
        const errorMessage = !appIsConnectedToInternet
          ? t("connectionError")
          : t("headsetNotConnected");

        setErrorMessages(errorMessage);
        onErrorOpen();
      }
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
      setSessionId(response.data.data.id);
      setStartSession(response.data.data.attributes.created_at);

      return { success: true };
    } catch (error) {
      onErrorOpen();
 
      return { success: false, error: error.response.data.error };
    }
  };

  const handleCancelSession = () => {
    closeSelectingAChild();
    props.onClose();
    onErrorClose();
    navigate('/home');
  };

  const handleSelectAnotherHeadset = () => {
    onErrorClose();
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

  useEffect(() => {
    console.log('Headset key after setting:', headsetKey);
  }, [headsetKey]);

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}  closeOnOverlayClick={false}
        closeOnEsc={false}>
        <ModalOverlay />
        <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
          <ModalHeader textAlign="center" fontSize="30px">
            {t('startSession')}
          </ModalHeader>

          {loading ? (
            <Box textAlign="center" py={10} px={6}>
              <Spinner />
            </Box>
          ) : (
            <>
              {headsets.length > 0 ? (
                <>
                  <ModalBody fontSize="20px" fontWeight="600" mt="15px">
                    <Text mt="25px">{t('selectHeadsetVR')}</Text>
                    <GridItem>
                      <Select
                        {...register('headset')}
                        id="headset"
                        name="headset"
                        placeholder={t('selectHeadset')}
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
                      {t('cancelSession')}
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
                      {t("connectToHeadset")}
                    </Button>
                  </ModalFooter>
                </>
              ) : (
                <ModalHeader textAlign="center" fontSize="1.2rem" color="red">
                  {t('noVRHeadsetsAvailable')}
                  <Button
                      w="180px"
                      h="54px"
                      mx={2}
                      mt={50}
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
                        {t('cancelSession')}
                    </Button>
                </ModalHeader>
              )}
            </>
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
          headsetId={headsetKey}
          sessionId={sessionId}
        />
      )}
    </>
  );
};

export default SelectingHeadset2;
