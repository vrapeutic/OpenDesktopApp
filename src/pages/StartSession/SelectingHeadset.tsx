import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  ModalHeader,
  useDisclosure,
} from '@chakra-ui/react';
import { config } from '@renderer/config';
import { ChevronDownIcon } from '@chakra-ui/icons';
import Joi from 'joi';
import ValidateOtp from './ValidateOtp';

export default function SelectingHeadset(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [headsets, setHeadsets] = useState([]);
  const [sessionId, setSessionId] = useState('');
  const [values, setValues] = useState({
    selectedHeadset: '',
  });

  const [errors, setErrors] = useState({
    selectedHeadset: null,
  });

  const schema = Joi.object().keys({
    selectedHeadset: Joi.string().required(),
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { error } = schema.validate(values, { abortEarly: false });
    console.log(error);

    if (error) {
      const validationErrors: any = {};
      error.details.forEach((detail) => {
        validationErrors[detail.path[0]] = detail.message;
      });
      setErrors(validationErrors);
      console.log(validationErrors);
    } else {
      console.log('form is valid');
      onOpen();

      const data = new FormData();
      data.append('center_id', props.centerId);
      data.append('child_id', props.childId);
      data.append('headset_id', values.selectedHeadset);
      const token = await (window as any).electronAPI.getPassword('token');
      fetch(`${config.apiURL}/api/v1/sessions`, {
        method: 'POST',
        body: data,
        redirect: 'follow',
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((result) => {
          setSessionId(result.data.id);
          console.log(result);
        })
        .catch((error) => console.log('error', error));
    }
  };

  const selectHeadset = async () => {
    const token = await (window as any).electronAPI.getPassword('token');
    fetch(
      `${config.apiURL}/api/v1/doctors/center_headsets?center_id=${props.centerId}`,
      {
        method: 'Get',
        redirect: 'follow',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setHeadsets(result.data);
      })
      .catch((error) => console.log('error', error));
  };

  return (
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
          <Text>Select a headset</Text>


          
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              bgColor="#FFFFFF"
              border="2px solid #E1E6EA"
              borderRadius="8px"
              marginTop="10px"
              h="40px"
              w="400px"
              onClick={selectHeadset}
            >
              Headsets
            </MenuButton>
            <MenuList>
              {headsets.map((headset) => (
                <MenuItem
                  key={headset.id}
                  name="SelectedHeadset"
                  onClick={() => setValues({ selectedHeadset: headset.id })}
                >
                  {headset.attributes.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Text fontSize="10px" color="red">
            {errors.selectedHeadset}
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
            onClick={handleSubmit}
          >
            Next
          </Button>
        </ModalFooter>
      </ModalContent>
      {/* {onOpen && (
        <ValidateOtp
          isOpen={isOpen}
          onClose={onClose}
          headsetId={values.selectedHeadset}
          sessionId={sessionId}
          centerId={props.centerId}
          childId={props.childId}
        />
      )} */}
    </Modal>
  );
}
