import React, { useContext, useEffect, useState } from 'react';
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
  GridItem,
  Select,
} from '@chakra-ui/react';
import { config } from '@renderer/config';
import { ChevronDownIcon } from '@chakra-ui/icons';
import Joi from 'joi';
import ValidateOtp from './ValidateOtp';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { dataContext } from '@renderer/shared/Provider';
export default function SelectingHeadset(props: any) {
  const [headsets, setHeadsets] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectedCenterContext = useContext(dataContext);

  const schema = Joi.object({
    headset: Joi.string().required().messages({
      'string.empty': 'You must select a headset',
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onTouched',
  });

  const getheadsets = async () => {
    const token = await (window as any).electronAPI.getPassword('token');
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get(
        `${config.apiURL}/api/v1/doctors/center_headsets?center_id=${props.centerId}`,
        { headers }
      );
      setHeadsets(response.data.data);
    } catch (error) {
      console.error('Error fetching center_headsets:', error);
    }
  };

  const handleFormSubmit = (data: any) => {
    console.log('Form submitted with data in headset: ', data);

  };

   console.log("props in headsets",props)
  useEffect(() => {
    if (selectedCenterContext.id) {
      getheadsets();
    }
  }, [selectedCenterContext.id]);

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalOverlay />
      <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
      <ModalHeader textAlign="center" fontSize="30px">
          Start a session
        </ModalHeader>
      {headsets.length > 0 ?
      <>
   
        <ModalBody fontSize="20px" fontWeight="600" mt="15px">
          <Text mt="25px">Select a headset</Text>
          <GridItem>
            <Select
              {...register('headseat')}
              id="headset"
              name="headset"
              placeholder="Select headseat"
              size="sm"
            >
              {headsets.map((headset) => (
                <option value={headset.id} key={headset.id}>
                  {headset?.attributes.name}
                </option>
              ))}
            </Select>
          </GridItem>
          {errors.headset && (
            <Text color="red.500">{errors.headset.message as string}</Text>
          )}
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
            onClick={handleSubmit(handleFormSubmit)}
            >
            Connect to headset
          </Button>
        </ModalFooter>
        </>
      :
      <ModalHeader textAlign="center" fontSize="1.2rem" color="red">
      No VR headsets are available in this center
    </ModalHeader>
    }
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

// const handleSubmit = async (event: any) => {
//   event.preventDefault();
//   const { error } = schema.validate(values, { abortEarly: false });
//   console.log(error);

//   if (error) {
//     const validationErrors: any = {};
//     error.details.forEach((detail) => {
//       validationErrors[detail.path[0]] = detail.message;
//     });
//     setErrors(validationErrors);
//     console.log(validationErrors);
//   } else {
//     console.log('form is valid');
//     onOpen();

//     const data = new FormData();
//     data.append('center_id', props.centerId);
//     data.append('child_id', props.childId);
//     data.append('headset_id', values.selectedHeadset);
//     const token = await (window as never).electronAPI.getPassword('token');
//     fetch(`${config.apiURL}/api/v1/sessions`, {
//       method: 'POST',
//       body: data,
//       redirect: 'follow',
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((response) => response.json())
//       .then((result) => {
//         setSessionId(result.data.id);
//         console.log(result);
//       })
//       .catch((error) => console.log('error', error));
//   }
// };

// const selectHeadset = async () => {
//   const token = await (window as any).electronAPI.getPassword('token');
//   fetch(
//     `${config.apiURL}/api/v1/doctors/center_headsets?center_id=${props.centerId}`,
//     {
//       method: 'Get',
//       redirect: 'follow',
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   )
//     .then((response) => response.json())
//     .then((result) => {
//       console.log(result.data);
//       setHeadsets(result.data);
//     })
//     .catch((error) => console.log('error', error));
// };
