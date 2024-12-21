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
  Select,
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
  useToast,
} from '@chakra-ui/react';
import { dataContext } from '@renderer/shared/Provider';
import HeaderSpaceBetween from '@renderer/theme/components/HeaderSpaceBetween';
import Joi from 'joi';
import { useContext, useEffect, useState } from 'react';
import { config } from '../config';
import axios from 'axios';
import { MyContext } from '@renderer/theme/ContextHelper';

export default function Specialists() {
  const selectedCenter = useContext(dataContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAssign,
    onOpen: onOpenAssign,
    onClose: onCloseAssign,
  } = useDisclosure();
  const [email, setEmail] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [Kids, setKids] = useState([]);
  const [errors, setErrors] = useState({
    email: null,
  });
  const [selectKids, setSelectedKids] = useState('');
  const [isValid, setIsValid] = useState(false);
  const toast = useToast();
  const [errorsKids, setErrorsKids] = useState(false);
  const { state } = useContext(MyContext);
  const schema = Joi.object().keys({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: false },
      })
      .required(),
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

  useEffect(() => {
    (async () => {
      const token = await (window as any).electronAPI.getPassword('token');
      fetch(` ${config.apiURL}/api/v1/centers/${selectedCenter.id}/kids`, {
        method: 'GET',
        redirect: 'follow',
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result.data, 'Kids');
          setKids(result.data);
        })
        .catch((error) => console.log('error', error));
    })();
  }, [selectedCenter.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    // Validate input on every change
    const { error } = schema.validate(
      { email: e.target.value },
      { abortEarly: false }
    );
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
      axios
        .post(
          `${config.apiURL}/api/v1/centers/${selectedCenter.id}/invite_doctor`,
          data, // Pass the body directly
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          const result = response.data; // Access the response data
          toast({
            title: 'Success',
            description: result.message || 'Invitation sent successfully.',
            status: 'success',
            duration: 5000,
            position: 'top-right',
          });
          console.log(result);
        })
        .catch((error) => {
          console.error('Error:', error);
          toast({
            title: 'Error',
            description:
              error.response?.data?.message || 'Something went wrong.',
            status: 'error',
            duration: 5000,
            position: 'top-right',
          });
        });
      onClose();
    }
  };

  const handleAssignKid = async () => {
    try {
      const token = await (window as any).electronAPI.getPassword('token');

      const response = await axios.put(
        `${config.apiURL}/api/v1/centers/${selectedCenter.id}/doctors/${doctorId}/assign_doctor_child?child_id=${selectKids}`,
        {
          doctor_id: state.id, // This is your request payload
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If the response is successful
      console.log(response.data); // Log the response or handle it as needed
      toast({
        title: 'Success',
        description: response.data?.message || 'Assignment successful',
        status: 'success',
        duration: 5000,
        position: 'top-right',
      });
      onCloseAssign(); // Assuming this closes the assignment modal or component
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description:
          error?.response?.data?.message || 'An unexpected error occurred.',
        status: 'error',
        duration: 5000,
        position: 'top-right',
      });
    }
  };

  return (
    <Box mx={18}>
      <HeaderSpaceBetween
        Title="Specialists"
        ButtonText={state.is_center_admin ? 'Add Specialist' : null}
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
            <Th>Kids</Th>
          </Tr>
        </Thead>
        <Tbody>
          {doctors?.map((doctor) => (
            <Tr key={doctor.id} cursor={'pointer'}>
              <Td>
                <Flex direction="row" gap={2}>
                  <Box
                    width={70}
                    height={70}
                    alignItems={'center'}
                    display={'flex'}
                  >
                    <img
                      src={doctor.attributes['photo_url']}
                      alt={doctor.attributes.name}
                      width={70}
                      height={70}
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
              <Td>
                <Button
                  onClick={() => {
                    setDoctorId(doctor.id);
                    onOpenAssign();
                  }}
                >
                  Assign
                </Button>
              </Td>
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
                <Button type="submit" colorScheme="teal" isDisabled={!isValid}>
                  Invite
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
      {onOpenAssign && (
        <Modal
          isOpen={isOpenAssign}
          onClose={onCloseAssign}
          closeOnOverlayClick={true}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enter the Kid</ModalHeader>
            <form>
              <ModalBody>
                <Select
                  placeholder="Select kid"
                  size="sm"
                  onChange={(e) => {
                    console.log('Selected kids:', e.target.value);
                    setSelectedKids(e.target.value);
                    setErrorsKids(true);
                  }}
                >
                  {Kids?.map((kid) => (
                    <option value={kid.id} key={kid.id}>
                      {kid?.attributes.name}
                    </option>
                  ))}
                </Select>
                {errorsKids && (
                  <Text fontSize="sm" color="red.500" mt={2}>
                    {errors.email}
                  </Text>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => {
                    if (!selectKids) {
                      setErrorsKids(false);
                      console.log(selectKids);
                    } else {
                      console.log(selectKids);
                      setErrorsKids(true);
                      handleAssignKid();
                    }
                  }}
                  colorScheme="teal"
                  isDisabled={!errorsKids}
                >
                  Assign
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}
