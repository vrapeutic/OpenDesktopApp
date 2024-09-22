import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Text,
  Button,
  ModalHeader,
} from '@chakra-ui/react';
import OTPInput from 'react-otp-input';
import { config } from '@renderer/config';
import SelectingModule from './SelectingModule';

export default function ValidateOtp(props: any) {
  const [otp, setOtp] = useState('');
  const [Next, setNext] = useState(false);
  const [wrongOtp, setWrongOtp] = useState(false);

  const input = {
    width: '60px',
    height: '64px',
    border: '1px solid black',
    borderRadius: '8px',
    marginRight: '8px',
    marginTop: '15px',
  };

  const otpHandleChange = async (otp: string) => {
    setOtp(otp);
    const token = await (window as any).electronAPI.getPassword('token');
    if (otp.length === 6) {
      fetch(
        `${config.apiURL}/api/v1/sessions/${props.sessionId}/validate_otp`,
        {
          method: 'Put',
          body: otp,
          redirect: 'follow',
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => response.text())
        .then((result) => {
          next();
          console.log(result);
        })
        .catch((error) => {
          setWrongOtp(true);
          console.log('error', error);
        });
    }
  };

  const resendOtp = async () => {
    const token = await (window as any).electronAPI.getPassword('token');
    fetch(`${config.apiURL}/api/v1/sessions/${props.sessionId}/resend_otp`, {
      method: 'POST',
      redirect: 'follow',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => console.log('error', error));
  };

  const next = () => {
    setNext((current) => !current);
  };

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
          <ModalHeader textAlign="center" fontSize="30px">
            Start a session
          </ModalHeader>
          <ModalBody fontSize="20px" fontWeight="600" mt="15px">
            <Text fontSize="12px" color="orange">
              You have been connected successfully to the headset{' '}
              {props.headsetId}
            </Text>
            <OTPInput
              value={otp}
              onChange={otpHandleChange}
              numInputs={6}
              renderInput={(props) => <input {...props} />}
              shouldAutoFocus
              inputStyle={input}
            />
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
            >
              Next
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {Next && (
        <SelectingModule centerId={props.centerId} childId={props.childId} />
      )}
      {wrongOtp && (
        <>
          <Text fontSize="12px" color="orange">
            The OTP enterned is incorrect
          </Text>
          <Button color="white" bgColor="orange" onClick={resendOtp}>
            Send an OTP again
          </Button>
        </>
      )}
    </>
  );
}
