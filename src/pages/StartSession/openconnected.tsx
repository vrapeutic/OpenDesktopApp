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
import { useTranslation } from 'react-i18next';

interface OpenConnectedProps {
  isOpen: boolean;
  onClose: () => void;
  closeSelectingAHeadset?: () => void;
  closeSelectingAModule?: () => void;
  closeConnectedVrPopup?: () => void;
  headsetKey?: string;
  headsetId?: string;
}
export default function Openconnected({
  isOpen,
  onClose,
  closeSelectingAHeadset,
  closeSelectingAModule,
  closeConnectedVrPopup,
  headsetKey,
}: OpenConnectedProps) {
  const { dispatchSocketMessage } = useSocketManager();
  const handlePlayAnotherModule = useCallback(() => {
    onClose();
  }, []);

  const { t } = useTranslation();

  const handleEndSession = useCallback(() => {
    localStorage.removeItem('sessionID');
    dispatchSocketMessage(
      END_SESSION_MESSAGE,
      { deviceId: headsetKey },
      headsetKey
    );

    // closeConnectedVrPopup();
    // closeSelectingAHeadset();
    // closeSelectingAModule();
    onClose();
  }, [
    // closeConnectedVrPopup,
    // closeSelectingAHeadset,
    // closeSelectingAModule,
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
              {t('connectedSuccessfully')} {headsetKey}!
            </ModalHeader>

            <ModalBody>
              <Text
                fontFamily="Graphik LCG"
                fontSize="1rem"
                fontWeight="600"
                textAlign="center"
                color="#595959"
              >
                {t('sessionInProgress')}
              </Text>

              <Text
                fontFamily="Graphik LCG"
                fontSize="1rem"
                fontWeight="400"
                textAlign="center"
                color="#A8A8A8"
              >
                {t('pressButtonToEnd')}{' '}
              </Text>
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
                marginRight="10px"
                onClick={handleEndSession}
              >
                {t('endSession')}
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
                marginLeft="10px"
                onClick={handlePlayAnotherModule}
              >
                {t('playAnotherModule')}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}
