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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import SelectingModule from './SelectingModule';

interface ErrorPopupPropType {
  isOpen: boolean;
  onClose: () => void;
  onSelectAnotherHeadset: () => void;
  onCancelSession: () => void;
  closeSelectingAHeadset: () => void;
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

  const {
    isOpen: ismoduleopen,
    onOpen: openSelectModule,
    onClose: closeSelectModule,
  } = useDisclosure();

  const CloseModuleModal = () => {
    closeSelectModule();
    closeSelectingAHeadset();
    navigate('/');
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} w="800px">
        <ModalOverlay />
        <ModalContent h="400px" w="800px" bgColor="#FFFFFF" borderRadius="10px">
          <ModalHeader textAlign="center" fontSize="30px">
            Start a session
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
                onCancelSession();
                navigate('/');
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
              onClick={onSelectAnotherHeadset}
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
