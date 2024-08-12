import React, { useContext, useEffect, useState } from 'react';

import HeaderSpaceBetween from '@renderer/theme/components/HeaderSpaceBetween';
import {
  Box,
  Button,
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
  Switch,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import img from '../assets/images/vr.png';
import Joi from 'joi';
import axios from 'axios';

import { useAdminContext } from '@renderer/Context/AdminContext';
import { config } from '@renderer/config';
import { useNavigate } from 'react-router-dom';
import { dataContext } from '@renderer/shared/Provider';
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

interface Center {
  id: number;
  attributes: {
    name: string;
    // Add other attributes as needed
  };
}

interface ModelKeyValues {
  [id: string]: {
    model?: any;
    key?: any;
  };
}
export default function Therapycentersadmin() {
  const toast = useToast();
  const selectedCenterContext = useContext(dataContext);
  const {
    isOpen: isOpenVR,
    onOpen: onOpenVR,
    onClose: onCloseVR,
  } = useDisclosure();
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const [values, setValues] = useState({
    model: '',
    key: '',
  });
  const [id, setId] = useState('');
  const [errors, setErrors] = useState({
    model: null,
    key: null,
  });
  const [centersData, setCentersData] = useState<Center[]>([]);
  const [childData, setChildData] = useState([]);
  const [modelValues, setModelValues] = useState<{ [key: string]: string }>({});
  const [keyValues, setKeyValues] = useState<{ [key: string]: string }>({});
  const { otp } = useAdminContext();
  const [showEdit, setShowEdit] = useState(true);
  const selectedCenter = useContext(dataContext);
  const schema = Joi.object().keys({
    model: Joi.string().min(3).max(30).required(),

    key: Joi.string().min(3).max(30).required(),
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  const nextHandler = () => {
    console.log('jjjjj');
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
    } else {
      setErrors({ model: null, key: null });
      console.log(values);
      addVr(values);
      console.log('hhhhhhhhhh');
    }
  };

  useEffect(() => {
    getCenters();
  }, []);

  const headers = {
    otp: `${otp}`,
  };

  const getCenters = async () => {
    try {
      const response = await axios.get(
        `${config.apiURL}/api/v1/admins/centers?include=children,specialties`,
        { headers }
      );
      setCentersData(response.data.data);
      console.log(response.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleError = (error: any) => {
    onCloseVR();

    toast({
      title: 'Error',
      description: error.response.data.error,
      status: 'error',
      duration: 5000,
      position: 'top-right',
    });
  };
  const handleSuccess = () => {
    onCloseVR();
    toast({
      title: 'Success',
      description: 'Add successfully',
      status: 'success',
      duration: 5000,
      position: 'top-right',
    });
  };

  const addVr = async (body: any) => {
    const dataSend: any = { headset: body };
    try {
      const response = await axios.post(
        `${config.apiURL}/api/v1/admins/assign_center_headset/${id}`,
        dataSend,
        { headers }
      );
      console.log(response);
      handleSuccess();
    } catch (error) {
      handleError(error);
      console.error(error);
    }
  };
  const openVr = (id: string) => {
    console.log(id);
    setId(id);
  };
  const openEditHandle = (id: string) => {
    console.log('edit', id);
    setId(id);
  };

  const receiveDataFromChild = (dataFromChild: any) => {
    console.log('receiveDataFromChild', dataFromChild);
    setChildData(dataFromChild);
  };

  // Function to update modelValues state
  const handleChangeModel = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newValue = e.target.value;
    setModelValues((prevState) => ({
      ...prevState,
      [id]: newValue,
    }));
  };

  // Function to update keyValues state
  const handleChangeKey = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newValue = e.target.value;
    setKeyValues((prevState) => ({
      ...prevState,
      [id]: newValue,
    }));
  };

  const editModel = async (x: any) => {
    console.log(x, modelValues[x]);
    interface Body {
      model?: any;
      key?: any;
    }

    const body: Body = {};

    if (modelValues[x]) {
      console.log(modelValues[id]);
      body.model = modelValues[x];
    }

    if (keyValues[x]) {
      body.key = keyValues[x];
    }

    const dataSend: any = { headset: body };
    try {
      const response = await axios.put(
        `${config.apiURL}/api/v1/admins/edit_headset?headset_id=${x}`,
        dataSend,
        { headers }
      );
      console.log(response);
      handleSuccess();
      setShowEdit(!showEdit);
    } catch (error) {
      handleError(error);
      console.error(error);
    }
  };
  const handleDelete = async (x: any) => {
    try {
      const response = await axios.delete(
        `${config.apiURL}/api/v1/admins/delete_headset/${x}`,
        { headers }
      );
      console.log(response);
      handleSuccess();
      const updatedData = childData.filter((item) => item.id !== x);
      setChildData(updatedData);
    } catch (error) {
      handleError(error);
      console.error(error);
    }
  };

  return (
    <>
      <HeaderSpaceBetween
        Title="Therapy Centers"
        // ButtonText="Add Therapy"
        onClickFunction={nextHandler}
      />

      <Grid
        py="2"
        mx="18"
        my="3"
        borderRadius="10px"
        backgroundColor="#FFFFFF"
        templateColumns="repeat(4, 1fr)"
        alignItems="center"
        color="#787486"
        fontSize="14px"
        fontFamily="Graphik LCG"
        fontWeight="500"
        lineHeight="24px"
      >
        <GridItem colSpan={2} style={{ marginLeft: '15px' }}>
          Name
        </GridItem>
        {/* <GridItem colSpan={1} textAlign={'center'}>
          Speciality
        </GridItem> */}

        <GridItem colSpan={1} textAlign={'center'}>
          Specialties
        </GridItem>
        <GridItem colSpan={1} textAlign={'center'}>
          Kids
        </GridItem>
      </Grid>

      <DataTable
        onOpenVR={onOpenVR}
        onOpenModal={onOpenModal}
        data={centersData}
        openVr={openVr}
        openEditHandle={openEditHandle}
        onOpenEdit={onOpenEdit}
        sendDataToParent={receiveDataFromChild}
      />
      {onOpenVR && (
        <Modal
          isOpen={isOpenVR}
          onClose={onCloseVR}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent>
            {/* <ModalHeader>VR Headset Model</ModalHeader> */}
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <Text fontSize="16px" color="black" my="4">
                  VR Headset Model
                </Text>
                <Input
                  type="text"
                  name="model"
                  onChange={handleChange}
                  value={values.model}
                  fontFamily="Graphik LCG"
                />
                <Text fontSize="16px" color="red" fontFamily="Graphik LCG">
                  {errors.model}
                </Text>
                <Text
                  fontSize="16px"
                  color="black"
                  my="4"
                  fontFamily="Graphik LCG"
                >
                  Device ID
                </Text>
                <Input
                  type="text"
                  name="key"
                  onChange={handleChange}
                  value={values.key}
                />
                <Text fontSize="16px" color="red" fontFamily="Graphik LCG">
                  {errors.key}
                </Text>
              </ModalBody>

              <ModalFooter>
                <Button
                  type="button"
                  w="110px"
                  h="40px"
                  padding="10px"
                  margin="5px"
                  bg="#F5B50E"
                  borderRadius="8px"
                  fontSize="14px"
                  boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
                  color={'white'}
                  onClick={() => onCloseVR()}
                  fontFamily="Graphik LCG"
                >
                  Cancelddd
                </Button>
                <Button
                  type="submit"
                  h="40px"
                  w="110px"
                  padding="10px"
                  margin="5px"
                  bg="#F5B50E"
                  borderRadius="8px"
                  fontSize="14px"
                  boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
                  color={'white'}
                  fontFamily="Graphik LCG"
                >
                  Add
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
      {onOpenModal && (
        <Modal
          isOpen={isOpenModal}
          onClose={onCloseModal}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Assign a module to a center</ModalHeader>
            <Grid
              py="2"
              mx="18"
              my="3"
              borderRadius="10px"
              backgroundColor="#F9F9F9"
              templateColumns="repeat(4, 1fr)"
              alignItems="center"
              color="#4A4A4A99"
              fontSize="14px"
              fontWeight="500"
              lineHeight="24px"
              fontFamily="Graphik LCG"
            >
              <GridItem
                colSpan={2}
                textAlign={'center'}
                fontFamily="Graphik LCG"
              >
                Module Name
              </GridItem>
              <GridItem
                colSpan={1}
                textAlign={'center'}
                fontFamily="Graphik LCG"
              >
                Status
              </GridItem>
              <GridItem
                colSpan={2}
                textAlign={'center'}
                fontFamily="Graphik LCG"
              >
                Valid
              </GridItem>
            </Grid>
            <DataModal ModalName="Module 1" date="14 May 2022" />
            <DataModal ModalName="Module 2" date="14 May 2022" />
            <DataModal ModalName="Module 3" date="14 May 2022" />
            <ModalFooter>
              <Button
                type="button"
                w="110px"
                h="40px"
                padding="10px"
                margin="5px"
                bg="#F5B50E"
                borderRadius="8px"
                fontSize="14px"
                fontFamily="Graphik LCG"
                boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
                color={'white'}
                onClick={() => onCloseModal()}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {onOpenEdit && (
        <Modal
          isOpen={isOpenEdit}
          onClose={onCloseEdit}
          max-width={800}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent maxWidth="800px" width="800px">
            <ModalHeader textAlign={'center'}> All center Headset</ModalHeader>
            {childData.map((x: any) => {
              return (
                <Flex alignItems={'center'} justifyContent={'center'}>
                  {showEdit ? (
                    <>
                      <Text mx={3}  fontWeight={500}>modal:</Text>
                      <Text mx={3} width={"20%"}>{x.attributes.model}</Text>
                      <Text mx={3} fontWeight={500}>Key:</Text>
                      <Text mx={3} width={"20%"}>{x.attributes.key}</Text>

                      <Button
                        type="button"
                        padding="10px"
                        margin="5px"
                        bg="green"
                        borderRadius="8px"
                        fontSize="14px"
                        fontFamily="Graphik LCG"
                        boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
                        color={'white'}
                        onClick={() => setShowEdit(!showEdit)}
                      >
                        <EditIcon />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Text mx={3}>modal:</Text>
                      <Input
                        type="text"
                        height="40px"
                        width="180px"
                        borderWidth="2px"
                        borderColor="gray.400"
                        _focus={{
                          borderColor: 'blue.400',
                          boxShadow: 'outline',
                        }}
                        mx={2}
                        placeholder={x.attributes.model}
                        onChange={(e) => handleChangeModel(e, x.id)}
                        value={modelValues[x.id] || ''}
                      />

                      <Text mx={3}>Key:</Text>
                      <Input
                        type="text"
                        height="40px"
                        width="180px"
                        borderWidth="2px"
                        borderColor="gray.400"
                        _focus={{
                          borderColor: 'blue.400',
                          boxShadow: 'outline',
                        }}
                        mx={2}
                        placeholder={x.attributes.key}
                        onChange={(e) => handleChangeKey(e, x.id)}
                        value={keyValues[x.id] || ''}
                      />
                       <Button
                        type="button"
                        padding="10px"
                        margin="5px"
                        bg="orange"
                        borderRadius="8px"
                        fontSize="14px"
                        fontFamily="Graphik LCG"
                        boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
                        color={'white'}
                        onClick={() => setShowEdit(!showEdit)}
                      >
                        <CloseIcon />
                      </Button>
                      <Button
                        type="button"
                        padding="10px"
                        margin="5px"
                        bg="green"
                        borderRadius="8px"
                        fontSize="14px"
                        fontFamily="Graphik LCG"
                        boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
                        color={'white'}
                        onClick={() => editModel(x.id)}
                      >
                        <CheckIcon />
                      </Button>

                    </>
                  )}
                  <Button
                    type="button"
                    padding="10px"
                    margin="5px"
                    bg="red"
                    borderRadius="8px"
                    fontSize="14px"
                    fontFamily="Graphik LCG"
                    boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
                    color={'white'}
                    onClick={() => handleDelete(x.id)}
                  >
                    <DeleteIcon />
                  </Button>
                </Flex>
              );
            })}

            <ModalFooter>
              <Button
                type="button"
                w="110px"
                h="40px"
                padding="10px"
                margin="5px"
                bg="#F5B50E"
                borderRadius="8px"
                fontSize="14px"
                fontFamily="Graphik LCG"
                boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
                color={'white'}
                onClick={() => onCloseEdit()}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

const DataTable = ({
  openVr,
  onOpenVR,
  onOpenModal,
  data,
  onOpenEdit,
  openEditHandle,
  sendDataToParent,
}: any) => {
  const { otp } = useAdminContext();
  const navigate = useNavigate();
  const handleCenterClick = (center: Center) => {
    console.log('Clicked Center Data:', center);
    navigate('/ViewCenterAdmin', { state: center });
  };
  const headers = {
    otp: `${otp}`,
  };

  const getHeadset = async (x: any) => {
    try {
      const response = await axios.get(
        `${config.apiURL}/api/v1/admins/headsets?q[center_id_eq]=${x}`,
        { headers }
      );
      console.log('response getHeadset', response);
      console.log(response.data.data);
      sendDataToParent(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {data.map((x: any) => {
        return (
          <Grid
            py="3"
            mx="18"
            my="1"
            borderRadius="10px"
            backgroundColor="#FFFFFF"
            templateColumns="repeat(4, 1fr)"
            alignItems="center"
            color="#787486"
            fontSize="14px"
            fontWeight="500"
            fontFamily="Graphik LCG"
            lineHeight="24px"
            key={x.id}
            onClick={() => handleCenterClick(x)}
          >
            <GridItem
              colSpan={2}
              style={{ marginLeft: '15px' }}
              fontFamily="Graphik LCG"
            >
              <Flex>
                <Box>
                  <Image
                    boxShadow="base"
                    rounded="md"
                    boxSize="100px"
                    objectFit="cover"
                    src={x.attributes.logo_url}
                    alt="VR"
                  />
                </Box>

                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  px="5"
                  fontFamily="Graphik LCG"
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent={'center'}
                  >
                    <Text
                      mx="5px"
                      fontSize="16"
                      textAlign={'start'}
                      fontFamily="Graphik LCG"
                    >
                      {x.attributes.name}
                    </Text>
                  </Box>

                  <Box
                    display="flex"
                    flexDirection="row"
                    fontFamily="Graphik LCG"
                  >
                    <Button
                      w="110px"
                      h="40px"
                      padding="10px"
                      margin="5px"
                      bg="#F5B50E"
                      borderRadius="8px"
                      fontSize="12px"
                      fontFamily="Graphik LCG"
                      boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
                      color={'white'}
                      onClick={(e: any) => {
                        e.stopPropagation();
                        onOpenModal();
                      }}
                    >
                      Assign a module
                    </Button>
                    <Button
                      w="110px"
                      h="40px"
                      padding="10px"
                      margin="5px"
                      bg="#F5B50E"
                      borderRadius="8px"
                      fontSize="12px"
                      fontFamily="Graphik LCG"
                      boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
                      color={'white'}
                      onClick={(e: any) => {
                        e.stopPropagation();
                        openVr(x.id);
                        onOpenVR();
                      }}
                    >
                      Assign a headset
                    </Button>
                    <Button
                      w="110px"
                      h="40px"
                      padding="10px"
                      margin="5px"
                      bg="#F5B50E"
                      borderRadius="8px"
                      fontSize="12px"
                      fontFamily="Graphik LCG"
                      boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
                      color={'white'}
                      onClick={(e: any) => {
                        e.stopPropagation();
                        openEditHandle(x.id);
                        onOpenEdit();
                        getHeadset(x.id);
                      }}
                    >
                      Edit or Delete
                    </Button>
                  </Box>
                </Box>
              </Flex>
            </GridItem>
            {/* <GridItem
              colSpan={1}
              textAlign={'center'}
              display={'flex'}
              fontFamily="Graphik LCG"
            >
              <Button
                rounded="md"
                p="2"
                mx="1"
                style={{
                  backgroundColor: '#F3F3F3',
                  color: 'ADHD',
                  fontSize: 16,
                  fontWeight: '400',
                }}
                fontFamily="Graphik LCG"
              >
                ADHD
              </Button>
              <Button
                rounded="md"
                p="2"
                mx="1"
                style={{
                  backgroundColor: '#F3F3F3',
                  color: 'ADHD',
                  fontSize: 16,
                  fontWeight: '400',
                }}
                fontFamily="Graphik LCG"
              >
                Richo
              </Button>
            </GridItem> */}

            <GridItem colSpan={1} textAlign={'center'} fontSize={'16'}>
              {x.relationships.specialties.data.length}
            </GridItem>
            <GridItem colSpan={1} textAlign={'center'} fontSize={'16'}>
              {x.relationships.children.data.length}
            </GridItem>
          </Grid>
        );
      })}
    </>
  );
};

interface DataModal {
  ModalName: string;
  date: string;
}
const DataModal: React.FC<DataModal> = ({ ModalName, date }) => {
  return (
    <Grid
      py="3"
      mx="18"
      my="1"
      borderRadius="10px"
      backgroundColor="#F9F9F9"
      templateColumns="repeat(4, 1fr)"
      alignItems="center"
      color="#787486"
      fontSize="14px"
      fontFamily="Graphik LCG"
      fontWeight="500"
      lineHeight="24px"
    >
      <GridItem
        colSpan={2}
        textAlign={'center'}
        color={'#15134B'}
        fontFamily="Graphik LCG"
      >
        <Box
          backgroundColor="#3575FF29"
          borderRadius="15px"
          mx="15"
          py="1"
          color={'#15134B'}
          textAlign={'center'}
          fontFamily="Graphik LCG"
        >
          {ModalName}
        </Box>
      </GridItem>
      <GridItem colSpan={1} alignItems="center " fontFamily="Graphik LCG">
        <Switch size="md" />
      </GridItem>
      <GridItem colSpan={2} fontFamily="Graphik LCG">
        <Box
          backgroundColor="#3575FF29"
          borderRadius="15px"
          mx="15"
          py="1"
          color={'#15134B'}
          textAlign={'center'}
        >
          {date}
        </Box>
      </GridItem>
    </Grid>
  );
};
