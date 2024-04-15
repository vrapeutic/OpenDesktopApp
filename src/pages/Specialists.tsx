import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tag,
  TagLabel,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { config } from '../config';
import Joi from 'joi';
import { dataContext } from '@renderer/shared/Provider';
import HeaderSpaceBetween from '@renderer/theme/components/HeaderSpaceBetween';

export default function Specialists() {
  const selectedCenter = useContext(dataContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState({
    email: '',
  });
  const [doctors, setDoctors] = useState([]);
  const [errors, setErrors] = useState({
    email: null,
  });

  const schema = Joi.object().keys({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'in', 'co'] },
    }),
  });

  useEffect(() => {
    (async () => {
      const token = await (window as any).electronAPI.getPassword('token');
      fetch(
        `${config.apiURL}/api/v1/doctors/home_doctors?center_id=${selectedCenter.id}`,
        {
          method: 'Get',
          redirect: 'follow',
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result.data);
          setDoctors(result.data);
        })
        .catch((error) => console.log('error', error));
    })();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { error } = schema.validate(email, { abortEarly: false });
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
      const token = await (window as any).electronAPI.getPassword('token');
      const data = new FormData();
      data.append('email', email.email);
      fetch(`${config.apiURL}/api/v1/centers/3/invite_doctor`, {
        method: 'POST',
        body: data,
        redirect: 'follow',
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.log('error', error));

      onClose();
    }
  };

  return (
    <>
      {/* <Text
        position="absolute"
        alignItems="center"
        left="279px"
        top="129px"
        fontFamily="Graphik LCG"
        fontSize="29px"
        fontWeight="500"
        lineHeight="29px"
        letterSpacing="-0.01em"
      >
        Specialists
      </Text>

      <Button
        position="absolute"
        width="123px"
        height="40px"
        top="129px"
        left="994px"
        borderRadius="8px"
        backgroundColor="#F5B50E"
        color="#FFFFFF"
        fontSize="14px"
        fontWeight="700"
        fontFamily="Roboto"
        lineHeight="16.41px"
        padding="16px"
        onClick={onOpen}
      >
        Add Specialist
      </Button> */}
      <HeaderSpaceBetween
        Title="Specialists"
        ButtonText="Add Specialist"
        onClickFunction={onOpen}
      />

      <Table variant="simple" background="#FFFFFF">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Speciality</Th>
            <Th>Education</Th>
            <Th>Joined in</Th>
            <Th>Therapy center</Th>
            <Th>Sessions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {doctors?.map((doctor) => (
            <Tr key={doctor.id} cursor={'pointer'}>
              <Td>
                <Flex direction="row" gap={2}>
                  <Box
                    width={197}
                    height={197}
                    alignItems={'center'}
                    display={'flex'}
                  >
                    <img
                      src={doctor.attributes['photo_url']}
                      alt={doctor.attributes.name}
                    />
                  </Box>

                  <Text
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {doctor.attributes.name}
                  </Text>
                </Flex>
              </Td>
              <Td>
                {doctor?.attributes?.specialties?.map((specialty: any) => (
                  <Tag key={specialty.id} size="sm" colorScheme="gray" mr={1}>
                    <TagLabel>{specialty?.name}</TagLabel>
                  </Tag>
                ))}
              </Td>
              <Td>{doctor.attributes.degree}</Td>
              <Td>{doctor.attributes['join_date'].slice(0, 10)}</Td>
              <Td>{selectedCenter.attributes.name}</Td>
              <Td>{doctor.attributes['number_of_sessions']}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {onOpen && (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enter the doctor's email</ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <Input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail({ email: e.target.value })}
                />
              </ModalBody>
              <Text fontSize="16px" color="red" ml="30px">
                {errors.email}
              </Text>
              <ModalFooter>
                <Button type="submit" color="#FFFFFF" bgColor="#00DEA3">
                  Invite
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
