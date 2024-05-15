import React, { useState, useEffect, useContext } from 'react';
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

export default function Openconnected(props: any) {
  return (
    <>
      <Box>
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
          <ModalOverlay />
          <ModalContent
            h="400px"
            w="600px"
            bgColor="#FFFFFF"
            borderRadius="10px"
          >
            <ModalHeader textAlign="center" fontSize="1rem">
              You are connected to the VR headset [ID]
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
                onClick={props.onClose}

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
