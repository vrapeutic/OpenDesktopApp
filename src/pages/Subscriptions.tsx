import React from 'react';

import HeaderSpaceBetween from '@renderer/theme/components/HeaderSpaceBetween';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import img from '../assets/images/vr.png';

export default function Subscriptions() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nextHandler = () => {
    console.log('jjjjj');
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
        fontFamily="Inter"
        fontWeight="500"
        lineHeight="24px"
      >
        <GridItem  colSpan={3}   style={{ marginLeft: '15px' }}>
          Name
        </GridItem>
        <GridItem   colSpan={1}  textAlign={'center'}>
          Speciality
        </GridItem>
        <GridItem  colSpan={1}  textAlign={'center'}>
          Location
        </GridItem>
        <GridItem   colSpan={1}  textAlign={'center'}>
          Specialties
        </GridItem>
        <GridItem  colSpan={1}  textAlign={'center'}>
          Kids
        </GridItem>
        <GridItem    colSpan={1}  textAlign={'center'}>
          Subscriptions
        </GridItem>
      </Grid>
     
   <DataTable onOpen={onOpen}/>
   {onOpen && (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>VR Headset Model</ModalHeader>
            <form >
              <ModalBody>
                {/* <Input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail({ email: e.target.value })}
                /> */}
              </ModalBody>
              <Text fontSize="16px" color="red" ml="30px">
              ;jkljklj
              </Text>
              {/* <ModalFooter>
                <Button type="submit" color="#FFFFFF" bgColor="#00DEA3">
                  Invite
                </Button>
              </ModalFooter> */}
            </form>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
 const DataTable=({onOpen})=>{
  return(
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
    fontFamily="Inter"
    fontWeight="500"
    lineHeight="24px"
  >
    <GridItem colSpan={3} style={{ marginLeft: '15px' }}>
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

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          px="2"
        >
          <Text fontSize="16" textAlign={"start"}> VRapeutic Therapy Center</Text>
          <Box display="flex" flexDirection="row">
            <Button
              w="110px"
              h="40px"
              padding="10px"
              margin="5px"
              bg="#F5B50E"
              borderRadius="8px"
              fontSize="14px"
              fontFamily="Roboto"
              boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
              color={"white"}
              onClick={onOpen}
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
              fontSize="14px"
              fontFamily="Roboto"
              boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
              color={"white"}
            >
              Assign a headset
            </Button>
          </Box>
        </Box>
      </Flex>
    </GridItem>
    <GridItem    colSpan={1} textAlign={'center'} display={'flex'}>
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
    <GridItem    colSpan={1} textAlign={'center'} fontSize={'16'}>
      6
    </GridItem>
    <GridItem    colSpan={1} textAlign={'center'} fontSize={'16'}>
      120
    </GridItem>
    <GridItem    colSpan={1} textAlign={'center'} fontSize={'16'}>
      700
    </GridItem>
  </Grid>



  )
 }