import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  GridItem,
  Grid,
  Box,
  Image,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  useDisclosure,
  ModalCloseButton,
  ModalBody,
  HStack,
  VStack,
  Stack,
} from '@chakra-ui/react';
import axios from 'axios';
import { config } from '../../config';
import { getMe } from '../../cache';
import React, { useEffect, useState } from 'react';
import img from '../../assets/images/Person3.png';
import { Time } from '@renderer/assets/icons/Time';
interface Doctor {
  id: number;
  attributes: {
    name: string;
    degree: string;
    university: string;
    photo: {
      url: string;
    };
  };
}

interface Child {
  id: number;
  attributes: {
    name: string;
    email: string;
    age: number;
  };
}

const TabsKids = () => {
  const token = getMe()?.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [childrenlist, setchildrenlist] = useState<Child[] | undefined>();
  const [Doctorslist, setDoctorlist] = useState<Doctor[] | undefined>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const getChildren = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${config.apiURL}/api/v1/centers/${centerData.id}/kids`,
  //       { headers }
  //     );
  //     setchildrenlist(response.data.data);
  //     console.log('children', response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const getDoctors = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${config.apiURL}/api/v1/centers/${centerData.id}/doctors`,
  //       { headers }
  //     );
  //     setDoctorlist(response.data.data);
  //     console.log('doctors', response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    //   getDoctors();
    //   getChildren();
  }, []);

  return (
    <>
      {onOpen && (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
          <ModalOverlay />
          <ModalContent minWidth={'70%'}>
            <Box borderBottom="1px solid rgba(0, 0, 0, 0.08)">
              <ModalHeader textAlign={'center'}>Sessions details</ModalHeader>
              <ModalCloseButton marginLeft="100px" />
            </Box>
            <ModalBody>
              <Grid templateColumns="repeat(6, 1fr)">
                <GridItem colSpan={6}>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                  >
                    <Box py={3}>
                      <Box display={'flex'} alignItems={'center'}>
                        <Image
                          // boxShadow="base"
                          rounded="md"
                          // boxSize="80px"
                          objectFit="cover"
                          src={img}
                          alt="VR"
                          w="52px"
                          h="52px"
                        />
                        <Text
                          fontSize="16"
                          textAlign={'start'}
                          px="5"
                          fontFamily="Graphik LCG"
                          color={'#15134B'}
                          lineHeight={'16px'}
                          letterSpacing={'1.6%'}
                        >
                          Yahya Alaa Ali
                        </Text>
                      </Box>
                    </Box>
                    <Box
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                    >
                      <Time />
                      <Text
                        color={'#558888'}
                        fontSize={'12px'}
                        fontWeight={'400'}
                        px={3}
                      >
                        14 Mon 2022 - 09:24 PM
                      </Text>
                    </Box>

                    <Button
                      borderColor={'#4AA6CA'}
                      background={'#ffff'}
                      borderWidth={1}
                      height="40px"
                      width={'293px'}
                    >
                      <Text
                        color={'#558888'}
                        fontSize={'14px'}
                        fontWeight={'500'}
                        fontFamily={'Roboto'}
                      >
                        exporting CSV
                      </Text>
                    </Button>
                  </Box>

                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                  >
                    <Box  width={'293px'}>
                      <Text
                        py={5}
                        color={'#787486'}
                        fontSize={'16px'}
                        fontWeight={'400'}
                        lineHeight={'24px'}
                      >
                        Adolescence disorders, Mood disorders (depression),
                        Anxiety disorders and obsessions, Mood disorders
                        (depression), Anxiety disorders and obsessions,
                      </Text>
                    </Box>
                    <Box>
                      <Box
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                      >
                        <Text
                          color={'#558888'}
                          fontSize={'16px'}
                          fontWeight={'400'}
                          fontFamily={'Graphik LCG'}
                          px={5}
                        >
                          Module
                        </Text>
                        <Box
                          background={'#F3F3F3'}
                          w="110px"
                          height={'42px'}
                          borderRadius={'10px'}
                          display={'flex'}
                          justifyContent={'center'}
                          alignItems={'center'}
                        >
                          <Text
                            fontSize="16"
                            textAlign={'center'}
                            px="5"
                            fontWeight={'500'}
                            fontFamily="Graphik LCG"
                            color={'#558888'}
                            lineHeight={'16px'}
                            letterSpacing={'1.6%'}
                          >
                            ADHD
                          </Text>
                        </Box>
                      </Box>
                      <Box
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        py={3}
                      >
                        <Text
                          color={'#558888'}
                          fontSize={'16px'}
                          fontWeight={'400'}
                          fontFamily={'Graphik LCG'}
                          px={5}
                        >
                          Results
                        </Text>
                        <Box
                          background={'#FFCC40'}
                          w="110px"
                          height={'42px'}
                          borderRadius={'10px'}
                          display={'flex'}
                          justifyContent={'center'}
                          alignItems={'center'}
                        >
                          <Text
                            fontSize="16"
                            textAlign={'center'}
                            px="5"
                            fontWeight={'500'}
                            fontFamily="Graphik LCG"
                            color={'#fff'}
                            lineHeight={'16px'}
                            letterSpacing={'1.6%'}
                          >
                            ADHD
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                    <Box>
                      <Text
                        fontFamily={'Graphik LCG'}
                        fontSize={'16px'}
                        fontWeight={'600'}
                        py={3}
                      >
                        Sesion Results
                      </Text>
                      <Text width={'293px'}>
                        Mood disorders (depression), Anxiety disorders and
                        obsessions, Mood disorders (depression),
                      </Text>
                    </Box>
                  </Box>
                </GridItem>
              </Grid>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      <Tabs py={'23px'} colorScheme="#1C1C1C">
        <TabList color={'#38383866'}>
          <Tab>Recent Activities </Tab>
          <Tab>Doctors</Tab>
          <Tab>Sesion</Tab>
          <Tab>Widgets</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>Dokkkkkkkkkkkkkkkkkkkors</p>
          </TabPanel>
          <TabPanel>
            <Grid
              py="2"
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
              <GridItem colSpan={1} style={{ marginLeft: '15px' }}>
                Name
              </GridItem>
              <GridItem colSpan={1} textAlign={'center'}>
                Speciality
              </GridItem>
              <GridItem colSpan={1} textAlign={'center'}>
                Sessions
              </GridItem>

              <GridItem colSpan={1} textAlign={'center'}>
                Last activty
              </GridItem>
            </Grid>

            <TableData />
          </TabPanel>

          <TabPanel>
            <Grid
              py="2"
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
              <GridItem colSpan={2} textAlign={'center'}>
                Date
              </GridItem>
              <GridItem colSpan={2} textAlign={'center'}>
                Session Report
              </GridItem>
            </Grid>
            <SessionTable openModal={onOpen} />
          </TabPanel>

          <TabPanel>
            <p>Widgets</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default TabsKids;
const TableData = () => {
  // const navigate = useNavigate();
  // const handleKids = (Kids:any) => {
  //   console.log('Clicked Center Data:', Kids);
  //   navigate('/ViewKids', { state: Kids });
  // };
  return (
    <Grid
      py="3"
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
      // onClick={()=>handleKids(id)}
    >
      <GridItem colSpan={1} style={{ marginLeft: '15px' }}>
        <Box display={'flex'} alignItems={'center'}>
          <Image
            // boxShadow="base"
            rounded="md"
            // boxSize="80px"
            objectFit="cover"
            src={img}
            alt="VR"
            w="52px"
            h="52px"
          />
          <Text
            fontSize="16"
            textAlign={'start'}
            px="5"
            fontFamily="Graphik LCG"
            color={'#15134B'}
            lineHeight={'16px'}
            letterSpacing={'1.6%'}
          >
            Yahya Alaa Ali
          </Text>
        </Box>
      </GridItem>
      <GridItem
        colSpan={1}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box
          background={'#F3F3F3'}
          w="120px"
          height={'42px'}
          borderRadius={'10px'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Text
            fontSize="16"
            textAlign={'center'}
            px="5"
            fontWeight={'500'}
            fontFamily="Graphik LCG"
            color={'#558888'}
            lineHeight={'16px'}
            letterSpacing={'1.6%'}
          >
            ADHD
          </Text>
        </Box>
      </GridItem>
      <GridItem colSpan={1} textAlign={'center'}>
        <Text
          fontSize="16"
          textAlign={'center'}
          px="5"
          fontFamily="Graphik LCG"
          color={'#15134B'}
          lineHeight={'16px'}
          letterSpacing={'1.6%'}
        >
          3 Sesions
        </Text>
      </GridItem>

      <GridItem colSpan={1}>
        <Text
          fontSize="16"
          textAlign={'center'}
          px="5"
          fontFamily="Graphik LCG"
          color={' #595959'}
          lineHeight={'17px'}
          letterSpacing={'1.6%'}
        >
          14 Mon 2022
        </Text>
      </GridItem>
    </Grid>
  );
};
interface SessionTable {
  openModal: any;
}
const SessionTable: React.FC<SessionTable> = ({ openModal }) => {
  return (
    <Grid
      py="3"
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
      // onClick={()=>handleKids(id)}
    >
      <GridItem colSpan={2}>
        <Text
          fontSize="16"
          textAlign={'center'}
          px="5"
          fontFamily="Graphik LCG"
          color={' #595959'}
          lineHeight={'17px'}
          letterSpacing={'1.6%'}
        >
          14.5.2023
        </Text>
      </GridItem>
      <GridItem
        colSpan={2}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Button
          bg={'#F3F3F3'}
          //   borderWidth={2}
          fontSize="14px"
          fontFamily="Graphik LCG"
          fontWeight="500"
          color={'#558888'}
          lineHeight={'17px'}
          letterSpacing={'1.6%'}
          onClick={openModal}
        >
          Show Report
        </Button>
      </GridItem>
    </Grid>
  );
};
