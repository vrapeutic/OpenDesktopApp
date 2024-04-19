import React, { useState } from 'react';

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
} from '@chakra-ui/react';
import img from '../assets/images/vr.png';
import Joi from 'joi';

export default function Subscriptions() {
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

  const [values, setValues] = useState({
    modalText: '',
    id: '',
  });

  const [errors, setErrors] = useState({
    modalText: null,
    id: null,
  });

  const schema = Joi.object().keys({
    modalText: Joi.string().min(3).max(30).required(),

    id: Joi.string().min(3).max(30).required(),
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
      setErrors({ modalText: null, id: null });

      console.log('hhhhhhhhhh');
    }
  };

  return (
    <>
      <HeaderSpaceBetween
        Title="Therapy Centers"
        ButtonText="Add Therapy"
        onClickFunction={nextHandler}
      />

      <Grid
        py="2"
        mx="18"
        my="3"
        borderRadius="10px"
        backgroundColor="#FFFFFF"
        templateColumns="repeat(8, 1fr)"
        alignItems="center"
        color="#787486"
        fontSize="14px"
     
        fontFamily="Graphik LCG"
        fontWeight="500"
        lineHeight="24px"
      >
        <GridItem colSpan={3} style={{ marginLeft: '15px' }}>
          Name
        </GridItem>
        <GridItem colSpan={1} textAlign={'center'}>
          Speciality
        </GridItem>
        <GridItem colSpan={1} textAlign={'center'}>
          Location
        </GridItem>
        <GridItem colSpan={1} textAlign={'center'}>
          Specialties
        </GridItem>
        <GridItem colSpan={1} textAlign={'center'}>
          Kids
        </GridItem>
        <GridItem colSpan={1} textAlign={'center'}>
          Subscriptions
        </GridItem>
      </Grid>

      <DataTable onOpenVR={onOpenVR} onOpenModal={onOpenModal} />
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
                  name="modalText"
                  onChange={handleChange}
                  value={values.modalText}
                  
          fontFamily="Graphik LCG"
                />
                <Text fontSize="16px" color="red" 
          fontFamily="Graphik LCG">
                  {errors.modalText}
                </Text>
                <Text fontSize="16px" color="black" my="4" 
          fontFamily="Graphik LCG">
                  Device ID
                </Text>
                <Input
                  type="text"
                  name="id"
                  onChange={handleChange}
                  value={values.id}
                />
                <Text fontSize="16px" color="red" 
          fontFamily="Graphik LCG">
                  {errors.id}
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
                  Cancel
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
              templateColumns="repeat(5, 1fr)"
              alignItems="center"
              color="#4A4A4A99"
              fontSize="14px"
           
              fontWeight="500"
              lineHeight="24px"
              
          fontFamily="Graphik LCG"
            >
              <GridItem colSpan={2} textAlign={'center'}>
                Module Name
              </GridItem>
              <GridItem colSpan={1} textAlign={'center'}>
                Status
              </GridItem>
              <GridItem colSpan={2} textAlign={'center'}>
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
    </>
  );
}
const DataTable = ({ onOpenVR, onOpenModal }: any) => {
  return (
    <Grid
      py="3"
      mx="18"
      my="1"
      borderRadius="10px"
      backgroundColor="#FFFFFF"
      templateColumns="repeat(8, 1fr)"
      alignItems="center"
      color="#787486"
      fontSize="14px"
    
      fontWeight="500"
      
      fontFamily="Graphik LCG"
      lineHeight="24px"
    >
      <GridItem colSpan={3} style={{ marginLeft: '15px' }} 
          fontFamily="Graphik LCG">
        <Flex>
          <Box>
            <Image
              boxShadow="base"
              rounded="md"
              boxSize="80px"
              objectFit="cover"
              src={img}
              alt="VR"
            />
          </Box>

          <Box display="flex" flexDirection="column" alignItems="center" px="2" 
          fontFamily="Graphik LCG">
            <Text fontSize="16" textAlign={'start'} 
          fontFamily="Graphik LCG">
              {' '}
              VRapeutic Therapy Center
            </Text>
            <Box display="flex" flexDirection="row">
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
                onClick={() => onOpenModal()}
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
                onClick={() => onOpenVR()}
              >
                Assign a headset
              </Button>
            </Box>
          </Box>
        </Flex>
      </GridItem>
      <GridItem colSpan={1} textAlign={'center'} display={'flex'} 
          fontFamily="Graphik LCG">
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
      </GridItem>
      <GridItem
        colSpan={1}
        textAlign={'center'}
        fontSize={'16'}
        color={'#707EAE'}

      >
        AUC - Egypt
      </GridItem>
      <GridItem colSpan={1} textAlign={'center'} fontSize={'16'}>
        6
      </GridItem>
      <GridItem colSpan={1} textAlign={'center'} fontSize={'16'}>
        120
      </GridItem>
      <GridItem colSpan={1} textAlign={'center'} fontSize={'16'}>
        700
      </GridItem>
    </Grid>
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
      templateColumns="repeat(5, 1fr)"
      alignItems="center"
      color="#787486"
      fontSize="14px"
      
      fontFamily="Graphik LCG"
      fontWeight="500"
      lineHeight="24px"
    >
      <GridItem colSpan={2} textAlign={'center'} color={'#15134B'} 
          fontFamily="Graphik LCG">
        <Box
          backgroundColor="#3575FF29"
          borderRadius="15px"
          mx="15"
          py="1"
          color={'#15134B'}
          textAlign={'center'}

        >
          {ModalName}
        </Box>
      </GridItem>
      <GridItem colSpan={1} direction="row" align="center" 
          fontFamily="Graphik LCG">
        <Switch size="md" />
      </GridItem>
      <GridItem colSpan={2} 
          fontFamily="Graphik LCG">
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
