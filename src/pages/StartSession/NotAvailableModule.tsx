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
} from '@chakra-ui/react';
import Openconnected from './openconnected';
import { useNavigate } from 'react-router-dom';

export default function NotAvailableModule(props: any) {
  const {
    isOpen: isOpenConnected,
    onOpen: onOpenConnected,
    onClose: onCloseConnected,
  } = useDisclosure();
  const navigate = useNavigate();

  const OpenConnectedModal = () => {
    props.onClose();
    onOpenConnected();
  };

  const CloseConnectedModal = () => {
    onCloseConnected();
    navigate('/');
  };
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
              You have lost connection with [the VR headset ID]!
            </ModalHeader>

            <ModalFooter>
              <Button
                w="214px"
                h="54px"
                bg="#00DEA3"
                borderRadius="12px"
                color="#FFFFFF"
                fontFamily="Roboto"
                fontWeight="700"
                fontSize="1.1rem"
                marginRight="10px"
                onClick={props.onClose}
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
                fontSize="1.1rem"
                marginLeft="10px"
                onClick={OpenConnectedModal}
              >
                Connect to headset again
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

    </>
  );
}
