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
} from '@chakra-ui/react';
import React from 'react';

const ConnectedVR = (props: any) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
        <Box borderBottom="1px solid rgba(0, 0, 0, 0.08)">
          <ModalCloseButton marginLeft="100px" />
        </Box>

        <ModalBody fontSize="20px" fontWeight="600" mt="25px">
          <Text fontSize="15px" color="orange" fontFamily="Graphik LCG">
            You are now connected to
            {props.headsetId}
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
            onClick={props.onClose}
          >
            Cancel session
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
            // onClick={handleSubmit}
            mx={2}
          >
            Play
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConnectedVR;