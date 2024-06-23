import React, { useCallback } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  Button,
  ModalHeader,
  Box,
  useDisclosure,
  ModalBody,
  Text,
  useToast,
} from '@chakra-ui/react';
import useSocketManager from '../../Context/SocketManagerProvider';
import { END_SESSION_MESSAGE } from '@main/constants';
import { useStartSessionContext } from '@renderer/Context/StartSesstionContext';
import { useNavigate } from '@reach/router';
import axios from 'axios';
import { config } from '@renderer/config';
import { getMe } from '@renderer/cache';
import SelectEvaluation from './Evaluation';

interface OpenConnectedProps {
  isOpen: boolean;
  onClose: () => void;
  closeSelectingAHeadset?: () => void;
  closeSelectingAModule?: () => void;
  closeConnectedVrPopup?: () => void;
  headsetId?: string;
}
export default function Openconnected({
  isOpen,
  onClose,
  closeSelectingAHeadset,
  closeSelectingAModule,
  closeConnectedVrPopup,
  headsetId,
}: OpenConnectedProps) {
  const { startSession, sessionId, headsetid } = useStartSessionContext();
  const { dispatchSocketMessage } = useSocketManager();
  const {
    isOpen: isevaluationopen,
    onOpen: onevaluationOpen,
    onClose: onevalutionClose,
  } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const handlePlayAnotherModule = useCallback(() => {
    closeConnectedVrPopup();
    onClose();
  }, [closeConnectedVrPopup, onclose]);

  const handleEndSession = useCallback(async () => {
    try {
      await endSessionApi();
      localStorage.removeItem('sessionID');
      dispatchSocketMessage(
        END_SESSION_MESSAGE,
        { deviceId: headsetId },
        headsetId
      );

      closeConnectedVrPopup();
      closeSelectingAHeadset();
      closeSelectingAModule();
      onevaluationOpen();
      onClose();
      // props.onClose();
      // props.onclosemodules();
      // navigate('/');
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
  }, [
    closeConnectedVrPopup,
    closeSelectingAHeadset,
    closeSelectingAModule,
    onClose,
  ]);

  const token = getMe()?.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const endSessionApi = () => {
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
  // const antherModule = () => {
  //   onClose();
  //   {
  //     props.onCloseBooks & props.onCloseBooks();
  //   }
  //   {
  //     props.oncloseselectlevel & props.oncloseselectlevel();
  //   }
  // };

  return (
    <>
      <Box>
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
          <ModalOverlay />
          <ModalContent
            h="400px"
            w="600px"
            bgColor="#FFFFFF"
            borderRadius="10px"
          >
            <ModalHeader textAlign="center" fontSize="1rem">
              You are connected to the VR headset {headsetId}{' '}
            </ModalHeader>

            <ModalBody>
              <Text
                fontFamily="Graphik LCG"
                fontSize="1rem"
                fontWeight="600"
                textAlign="center"
                color="#595959"
              >
                Session in progress. Please see the casting app to follow the
                child’s performance.{' '}
              </Text>

              <Text
                fontFamily="Graphik LCG"
                fontSize="1rem"
                fontWeight="400"
                textAlign="center"
                color="#A8A8A8"
              >
                Press on the button below to end the session.
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
                fontSize="18px"
                marginRight="10px"
                onClick={handleEndSession}
              >
                End session
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
                marginLeft="10px"
                onClick={handlePlayAnotherModule}
              >
                Play Another Module
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

      {onevaluationOpen && (
        <SelectEvaluation
          isOpen={isevaluationopen}
          onClose={onevalutionClose}
          closeopenconnected={onClose}
          closemodules={closeSelectingAModule}
        />
      )}
    </>
  );
}
