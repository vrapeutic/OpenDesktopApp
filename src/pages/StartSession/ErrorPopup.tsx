import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Text,
  Button,
  ModalHeader,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import SelectingModule from './SelectingModule';
import { useStartSessionContext } from '@renderer/Context/StartSesstionContext';
import { config } from '@renderer/config';
import axios from 'axios';
import { getMe } from '@renderer/cache';
import usePopupsHandler from '@renderer/Context/PopupsHandlerContext';
interface ErrorPopupPropType {
  isOpen: boolean;
  onClose?: () => void;
  onSelectAnotherHeadset?: () => void;
  onCancelSession?: () => void;
  closeSelectingAHeadset?: () => void;
  continueToSelectModule?: boolean;
  errorMessages?: string;
}

export const ErrorPopup = ({
  isOpen,
  onClose,
  onSelectAnotherHeadset,
  onCancelSession,
  closeSelectingAHeadset,
  continueToSelectModule = false,
  errorMessages,
}: ErrorPopupPropType) => {
  const navigate = useNavigate();
  const { startSession, sessionId, setSessionId } = useStartSessionContext();
  const { popupFunctions } = usePopupsHandler();

  const { closeSelectingAChild } = popupFunctions;

  const {
    isOpen: ismoduleopen,
    onOpen: openSelectModule,
    onClose: closeSelectModule,
  } = useDisclosure();

  const CloseModuleModal = () => {
    closeSelectModule();
    closeSelectingAHeadset();
    closeSelectingAChild();
    navigate('/home');
  };

  const token = getMe()?.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const endSessionApi = async () => {
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const day = String(currentDate.getDate()).padStart(2, '0');
      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      const seconds = String(currentDate.getSeconds()).padStart(2, '0');
      const milliseconds = String(currentDate.getMilliseconds()).padStart(
        3,
        '0'
      );

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
      console.log(sessionId, startSession);
      const response = await axios.put(
        `${config.apiURL}/api/v1/sessions/${sessionId}/end_session`,
        { vr_duration: differenceInMinutes },
        { headers }
      );

      // If successful, set sessionId to null
      setSessionId('');

      // Return the response data or handle as needed
      return response.data;
    } catch (error) {
      // Handle error
      console.error('Error ending session:', error);
      throw error; // Optionally rethrow to propagate the error
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h="400px" w="800px" bgColor="#FFFFFF" borderRadius="10px">
          <ModalHeader textAlign="center" fontSize="30px">
            Start a session error
          </ModalHeader>
          <ModalBody fontSize="20px" fontWeight="600" mt="15px">
            <Text mt="25px">
              {errorMessages ||
                'The selected headset could not be found on this network'}
            </Text>
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
              onClick={() => {
                {
                  sessionId && endSessionApi();
                }
                onCancelSession();
                closeSelectingAHeadset();
                closeSelectingAChild();
                navigate('/home');
              }}
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
              onClick={() => {
                {
                  sessionId && endSessionApi();
                }
                onSelectAnotherHeadset();
              }}
            >
              Select another headset
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {(openSelectModule || continueToSelectModule) && (
        <SelectingModule isOpen={ismoduleopen} onClose={CloseModuleModal} />
      )}
    </>
  );
};
