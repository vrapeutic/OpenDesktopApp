import {
  Box,
  Button,
  Flex,
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
import { dataContext } from '@renderer/shared/Provider';
import HeaderSpaceBetween from '@renderer/theme/components/HeaderSpaceBetween';
import Joi from 'joi';
import { useContext, useEffect, useState } from 'react';
import { config } from '../config';

export default function Specialists() {
  const selectedCenter = useContext(dataContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [errors, setErrors] = useState({
    email: null,
  });
  const [isValid, setIsValid] = useState(false);

  const schema = Joi.object().keys({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: false },
    }).required(),
  });

  useEffect(() => {
    (async () => {
      const token = await (window as any).electronAPI.getPassword('token');
      fetch(
        `${config.apiURL}/api/v1/doctors/home_doctors?center_id=${selectedCenter.id}`,
        {
          method: 'GET',
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
  }, [selectedCenter.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    
    // Validate input on every change
    const { error } = schema.validate({ email: e.target.value }, { abortEarly: false });
    setIsValid(!error);
    if (error) {
      setErrors({
        email: error.details[0].message,
      });
    } else {
      setErrors({ email: null });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { error } = schema.validate({ email }, { abortEarly: false });

    if (error) {
      const validationErrors: any = {};
      error.details.forEach((detail) => {
        validationErrors[detail.path[0]] = detail.message;
      });
      setErrors(validationErrors);
      setIsValid(false);
    } else {
      setErrors({ email: null });
      setIsValid(true);
      
      const token = await (window as any).electronAPI.getPassword('token');
      const data = new FormData();
      data.append('email', email);
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
    <Box mx={18}>
      <HeaderSpaceBetween
        Title="Specialists"
        ButtonText="Add Specialist"
        onClickFunction={onOpen}
      />

      <Table variant="simple" background="#FFFFFF" >
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
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={true}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enter the doctor's email</ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <Input
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  value={email}
                  isInvalid={!!errors.email}
                />
                {errors.email && (
                  <Text fontSize="sm" color="red.500" mt={2}>
                    {errors.email}
                  </Text>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  colorScheme="teal"
                  isDisabled={!isValid}
                >
                  Invite
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}
