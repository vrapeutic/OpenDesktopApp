import {
  Flex,
  Button,
  FormControl,
  Input,
  Text,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { Image } from '@renderer/assets/icons/Image';
import React, { useRef, useState } from 'react';
import Joi from 'joi';
import { useMutation } from '@tanstack/react-query';
import { config } from '@renderer/config';
import { useNavigate } from 'react-router-dom';

export default function Uploadlogo(props: any) {
  const inputRef = useRef(null);
  const [values, setValues] = useState([]);
  const [errors, setErrors] = useState(null);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const schema = Joi.array().required();

  const postData = async (user: any) => {
    console.log(user);
    const data = new FormData();
    data.append('name', user.name);
    data.append('email', user.email);
    data.append('password', user.password);
    data.append('degree', user.degree);
    data.append('university', user.university);
    data.append('photo', user.photo);
    data.append('certificate', user.certificate);
    user['specialty_ids[]'].map((id: string) =>
      data.append('specialty_ids[]', id)
    );
    console.log(data.get('name'));

    fetch(`${config.apiURL}/api/v1/doctors`, {
      method: 'POST',
      body: data,
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => {
        setUserId(result.data.id);
        console.log(result);
      })
      .catch((error) => console.log('error', error));
  };

  const { mutate, isLoading, isError } = useMutation(postData, {
    onSuccess: (successData) => {
      console.log(successData);
    },
  });

  if (isLoading) {
    console.log('loading....');
  }

  if (isError) {
    console.log('error');
  }

  const handleChange = (event: any) => {
    setValues((values) => [
      ...values,
      (event.target as HTMLInputElement).files[0],
    ]);
    console.log(values);
  };

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
      props.userData.photo = values[0];
      console.log(props.userData);
      mutate(props.userData);
      navigate('/validateotp', {
        state: { id: userId, email: props.userData.email },
      });
    }
  };

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent h="645px" w="623px" bgColor="#FFFFFF" borderRadius="10px">
          <Box borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            <ModalHeader
              fontFamily="Graphik LCG"
              fontSize="20px"
              fontWeight="400"
              lineHeight="20px"
              color="#00261C"
              textAlign="center"
            >
              Upload profile picture
            </ModalHeader>
            <ModalCloseButton marginLeft="100px" />
          </Box>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <ModalBody>
                <Button
                  position="absolute"
                  h="271px"
                  w="271px"
                  top="20%"
                  left="19%"
                  border="2px solid #E8E8E8"
                  borderRadius="50%"
                  bg="#F9F9F9"
                  padding="23%"
                  onClick={() => inputRef.current.click()}
                >
                  <Image />
                  <Input
                    type="file"
                    accept="image/png,image/jpeg"
                    ref={inputRef}
                    name="logo"
                    onChange={handleChange}
                    hidden
                  />
                </Button>

                <Text
                  position="absolute"
                  top="300px"
                  left="18%"
                  fontFamily="Graphik LCG"
                  fontSize="18px"
                  fontWeight="400"
                  lineHeight="18px"
                  color="#595959"
                >
                  Please upload your profile picture
                </Text>
              </ModalBody>

              <Flex flexDirection="column">
                <Button
                  h="54px"
                  w="265px"
                  top="330px"
                  left="18%"
                  borderRadius="12px"
                  bg="#00DEA3"
                  color="#FFFFFF"
                  fontFamily="Roboto"
                  fontWeight="700"
                  fontSize="18px"
                  lineHeight="21.09px"
                  type="submit"
                >
                  Submit
                </Button>

                <Button
                  w="39px"
                  h="18px"
                  top="360px"
                  left="43%"
                  bgColor="#FFFFFF"
                  color="#595959"
                  fontFamily="Graphik LCG"
                  fontWeight="400"
                  fontSize="18px"
                  lineHeight="18px"
                  onClick={() => {
                    navigate('/validateotp', {
                      state: { id: userId, email: props.userData.email },
                    });
                  }}
                >
                  Skip
                </Button>
              </Flex>
            </FormControl>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
