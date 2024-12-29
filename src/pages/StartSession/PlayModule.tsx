import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import Openconnected from './openconnected';
import usePopupsHandler from '@renderer/Context/PopupsHandlerContext';
import { useTranslation } from 'react-i18next';

interface PlayModuleProps {
  isOpen: boolean;
  onClose: () => void;
  headsetId?: string;
  handleSubmit: () => void;
  openRunningPopup: boolean;
  setOpenRunningPopup: React.Dispatch<React.SetStateAction<boolean>>;
  headsetKey?: string;
}

const PlayModule = ({
  handleSubmit,
  isOpen,
  onClose,
  headsetId,
  openRunningPopup,
  setOpenRunningPopup,
}: PlayModuleProps) => {
  const { popupFunctions } = usePopupsHandler();
  const {
    closeSelectingAHeadset,
    closeSelectingAModule,
    closeConnectedVrPopup,
  } = popupFunctions;

  const {
    isOpen: connectedPopupOpen,
    onOpen: onOpenConnectedPopup,
    onClose: onCloseConnectedPopup,
  } = useDisclosure();
   const { t } = useTranslation();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
          <Box borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            <ModalCloseButton marginLeft="100px" />
          </Box>

          <ModalBody fontSize="20px" fontWeight="600" mt="25px">
            <Text fontSize="15px" color="orange" fontFamily="Graphik LCG">
              You are now connected to
              {headsetId}
            </Text>

            <Box h={'70%'} display={'flex'} alignItems={'center'}>
              <Text fontSize="20px" color="red" fontFamily="Graphik LCG">
                This screen should show the selected module’s UI.
              </Text>
            </Box>
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
              onClick={onClose}
            >
            {t("cancelSession")}
            </Button>
            <Button
              w="180px"
              h="54px"
              bg="#00DEA3"
              borderRadius="12px"
              color="#FFFFFF"
              fontFamily="Graphik LCG"
              fontWeight="700"
              fontSize="15px"
              onClick={handleSubmit}
              mx={2}
            >
             {t("play")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {openRunningPopup && (
        <Openconnected
          isOpen={openRunningPopup || connectedPopupOpen}
          onClose={() => {
            onCloseConnectedPopup();
            setOpenRunningPopup(false);
          }}
          closeSelectingAHeadset={closeSelectingAHeadset}
          closeSelectingAModule={closeSelectingAModule}
          closeConnectedVrPopup={closeConnectedVrPopup}
          headsetId={headsetId}
        />
      )}
    </>
  );
};

export default PlayModule;
