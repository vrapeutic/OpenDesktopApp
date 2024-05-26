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
} from '@chakra-ui/react';
import useSocketManager from '../../Context/SocketManagerProvider';
import { END_SESSION_MESSAGE } from '@main/constants';

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
  const { dispatchSocketMessage } = useSocketManager();
  const handlePlayAnotherModule = useCallback(() => {
    dispatchSocketMessage(END_SESSION_MESSAGE, { deviceId: headsetId });

    closeConnectedVrPopup();
    onClose();
  }, [closeConnectedVrPopup, onclose]);

  const handleEndSession = useCallback(() => {
    dispatchSocketMessage(END_SESSION_MESSAGE, { deviceId: headsetId });

    closeConnectedVrPopup();
    closeSelectingAHeadset();
    closeSelectingAModule();
    onClose();
    // TODO dispatch end session message here
  }, [
    closeConnectedVrPopup,
    closeSelectingAHeadset,
    closeSelectingAModule,
    onClose,
  ]);

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
              You are connected to the VR headset {headsetId}
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
    </>
  );
}
