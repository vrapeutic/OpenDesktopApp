import {
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useCSVData } from '@renderer/Context/CSVDataContext';
import { dataContext } from '@renderer/shared/Provider';
import axios from 'axios';
import Papa from 'papaparse';
import React, { useContext, useEffect, useState } from 'react';
import img from '../../assets/images/Person3.png';
import { getMe } from '../../cache';
import { config } from '../../config';
import { ipcRenderer } from 'electron/renderer';
import { assert } from 'console';

interface Child {
  id: number;
  attributes: {
    name: string;
    email: string;
    age: number;
  };
}
interface TabsKids {
  id: number;
  kidData?: any;
  diagnosis?: any;
}
const TabsKids: React.FC<TabsKids> = ({ id, kidData, diagnosis }) => {
  const [doctorsList, setDoctorList] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showDoctor, setShowDoctor] = useState(false);
  const [selectedSessionDate, setSelectedSessionDate] = useState('');
  const [selectedSessionEvaluation, setSelectedSessionEvaluation] =
    useState('');
  const [selectedSessionNotes, setSelectedSessionNotes] = useState('');
  const [files, setFiles] = useState<string[]>([]);
  const [reportDir, setReportDir] = useState('');
  const [noDataAvailable, setNoDataAvailable] = useState(false);
  const [noFileAvailable, setNoFileAvailable] = useState(false);
  const [selectedSessionID, setSelectedSessionID] = useState('');
  const selectedCenter = useContext(dataContext);
  const [includedD, setIncludedD] = useState([]);
  const { modulesForReport, setModulesForReport, processCSVDataForReport } =
    useCSVData();

  const token = getMe()?.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const getDoctors = async () => {
    try {
      const response = await axios.get(
        `${config.apiURL}/api/v1/doctors/center_child_doctors?center_id=${selectedCenter.id}&child_id=${id}&include=sessions,specialties`,
        { headers }
      );
      if (response.data.data) {
        setDoctorList(response.data.data);
        setIncludedD(response.data.included);
      }
      setShowDoctor(false);
    } catch (error) {
      console.error('error', error.response.status);
      if (error.response.status === 403) {
        setShowDoctor(true);
        setDoctorList([]);
      }
    }
  };

  const getSessions = async () => {
    try {
      const response = await axios.get(
        `${config.apiURL}/api/v1/doctors/center_child_sessions?center_id=${selectedCenter.id}&child_id=${id}`,
        { headers }
      );
      setSessions(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDoctors();
    getSessions();
  }, []);

  useEffect(() => {
    const fetchReportDir = async () => {
      try {
        const dirUrl = await (window as any).electron.getReportDir();
        // Replace backslashes with forward slashes
        const fixedDirUrl = dirUrl.replace(/\\/g, '/');
        console.log(fixedDirUrl, 'fixedDirUrl');
        setReportDir(fixedDirUrl);
      } catch (error) {
        console.error('Error fetching report directory:', error);
      }
    };

    fetchReportDir();
  }, []);

  useEffect(() => {
    if (reportDir) {
      handleListFiles();
    }
  }, [reportDir]);
  const handleListFiles = async () => {
    try {
      const fileNames = await (window as any).electron.listFiles(reportDir);
      const sessionIDs = fileNames.map((fileName: string) =>
        fileName.replace('.csv', '')
      );
      setFiles(sessionIDs);
      console.log('Session IDs:', sessionIDs);
    } catch (error) {
      console.error('Error listing files:', error);
    }
  };

  const handleReadFile = async (filePath: string) => {
    console.log('handleReadFile', filePath);
    try {
      const content = await (window as any).electron.readFile(filePath);
      console.log(`Content of ${filePath}:`, content);

      const parsedCSVData = Papa.parse<string[]>(content, {
        skipEmptyLines: true,
      }).data;

      const moduleData = processCSVDataForReport(parsedCSVData);
      console.log('Processed CSV data:', moduleData);
      setModulesForReport(moduleData);
    } catch (error) {
      console.log('Error reading file:', error);
    }
  };

  const handleOpenSession = async (session: any) => {
    const date = new Date(session.attributes.created_at).toLocaleString('en', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    setSelectedSessionDate(date);
    setSelectedSessionEvaluation(session.attributes.evaluation);
    setSelectedSessionNotes(session.attributes.notes);
    setSelectedSessionID(session.id); // Save the session ID
    const sessionFileName = `${session.id}.csv`;

    if (files.includes(session.id.toString())) {
      setNoDataAvailable(false); // Data available
      setNoFileAvailable(false);
      await handleReadFile(`${reportDir}/${sessionFileName}`);
    } else {
      setNoDataAvailable(true); // No data available
      setNoFileAvailable(true);
      setModulesForReport([]); // Set an empty array to show "No data available"
    }

    onOpen();
  };

  const handleExportCSV = async () => {
    if (selectedSessionID) {
      const filePath = `${reportDir}/${selectedSessionID}.csv`;
      // Trigger the download in the main process
      const result = await (window as any).electron.downloadFile(filePath);
      if (result.success) {
        console.log('File downloaded successfully:', result.path);
      } else {
        console.error('Error downloading file:', result.error);
      }
    }
  };

  const calculateTotalDuration = (modules: any[]) => {
    const totalMinutes = modules.reduce((total, module) => {
      return total + (module.timeSpent || 0);
    }, 0);

    return `${totalMinutes} minutes`;
  };

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
              <Box p={5}>
                {/* Top Section */}
                <Grid
                  templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }}
                  gap={6}
                  mb={6}
                >
                  {/* Spec Section */}
                  <GridItem>
                    <Box borderWidth="1px" borderRadius="lg" p={4} h="100%">
                      <Text fontSize="xl" fontWeight="bold">
                        Specialist Details
                      </Text>
                      {doctorsList.length === 0 ? (
                        <Text>No Data Available</Text>
                      ) : (
                        doctorsList.map((doctor, index) => (
                          <Text key={index}>
                            {doctor.attributes.name} -{' '}
                            {doctor.attributes.specialty}
                          </Text>
                        ))
                      )}
                    </Box>
                  </GridItem>

                  {/* Date & Duration Section */}
                  <GridItem>
                    <Box borderWidth="1px" borderRadius="lg" p={4} h="100%">
                      <Text fontSize="xl" fontWeight="bold">
                        Date & Duration
                      </Text>
                      {/* Add content here */}
                      <Text mt={2}>Date: {selectedSessionDate}</Text>
                      <Text>
                        Duration:{' '}
                        {modulesForReport.length > 0
                          ? calculateTotalDuration(modulesForReport)
                          : 'No data available'}
                      </Text>
                    </Box>
                  </GridItem>

                  {/* Session Ratings Section */}
                  <GridItem>
                    <Box borderWidth="1px" borderRadius="lg" p={4} h="100%">
                      <Text fontSize="xl" fontWeight="bold">
                        Session Evaluation
                      </Text>
                      {/* Add content here */}
                      <Text mt={2}>
                        {selectedSessionEvaluation
                          ? selectedSessionEvaluation
                          : 'No data available'}
                      </Text>
                    </Box>
                  </GridItem>
                </Grid>

                {/* Middle Section */}
                <Grid templateColumns={{ base: '1fr', md: '1fr 2fr' }} gap={6}>
                  {/* Kid Section */}
                  <GridItem>
                    <Box borderWidth="1px" borderRadius="lg" p={4}>
                      <Text fontSize="xl" fontWeight="bold">
                        Kid Details
                      </Text>
                      <Box display={'flex'} gap={5}>
                        <Image
                          mt={4}
                          borderRadius="md"
                          objectFit="cover"
                          src={
                            kidData?.attributes?.photo_url
                              ? kidData?.attributes?.photo_url
                              : 'placeholder-image-url'
                          }
                          alt="Kid Image"
                          w="52px"
                          h="52px"
                        />
                        <Box>
                          <Text mt={2} fontWeight="bold" fontSize={'lg'}>
                            {kidData?.attributes?.name}
                          </Text>
                          <Text color="gray.500">
                            {diagnosis
                              .map(
                                (diagnosis: any) => diagnosis.attributes.name
                              )
                              .join(', ')}
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  </GridItem>

                  {/* Modules Section */}
                  <GridItem>
                    <Box>
                      <Text fontSize="xl" fontWeight="bold" mb={4}>
                        Modules
                      </Text>
                      {noDataAvailable ? (
                        <Text>No Data Available</Text>
                      ) : (
                        modulesForReport.map((module, index) => (
                          <Box
                            key={index}
                            borderWidth="1px"
                            borderRadius="lg"
                            p={4}
                            mb={4}
                          >
                            <Text fontSize="lg" fontWeight="bold">
                              {module.moduleName}
                            </Text>
                            {module.distractors.length > 0 ? (
                              module.distractors.map(
                                (distractor, distractorIndex) => (
                                  <Text key={distractorIndex}>
                                    Distractors: {distractorIndex > 0 && ', '}
                                    {distractor}
                                  </Text>
                                )
                              )
                            ) : (
                              <Text>Distractors: No Distractors recorded</Text>
                            )}

                            <Text>Level: {module.level}</Text>
                            <Text>Duration: {module.formattedTimeSpent}</Text>
                          </Box>
                        ))
                      )}
                    </Box>
                  </GridItem>
                </Grid>

                {/* Bottom Section */}
                <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={6}>
                  {/* Session Notes Section */}
                  <GridItem colSpan={2}>
                    <Box borderWidth="1px" borderRadius="lg" p={4} h="100%">
                      <Text fontSize="xl" fontWeight="bold">
                        Session Notes
                      </Text>
                      <Text>
                        {selectedSessionNotes
                          ? selectedSessionNotes
                          : 'No data available'}
                      </Text>
                    </Box>
                  </GridItem>

                  {/* Export Button */}
                  <GridItem>
                    <Button
                      bg="#4AA6CA"
                      w="100%"
                      h="100%"
                      textColor={'white'}
                      fontSize="1.125em"
                      fontWeight="700"
                      onClick={handleExportCSV}
                      isDisabled={noFileAvailable}
                    >
                      Export CSV
                    </Button>
                  </GridItem>
                </Grid>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      <Tabs py={'23px'} colorScheme="#1C1C1C">
        <TabList color={'#38383866'}>
          <Tab>Doctors</Tab>
          <Tab>Session</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {doctorsList.length > 0 ? (
              <>
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
                    Last activity
                  </GridItem>
                </Grid>

                <TableData
                  showDoctor={showDoctor}
                  doctorsList={doctorsList}
                  includedD={includedD}
                />
              </>
            ) : (
              <Text>No data available</Text>
            )}
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
            <SessionTable
              openModal={onOpen}
              sessions={sessions}
              handleOpenSession={handleOpenSession}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default TabsKids;
interface TableDataProps {
  showDoctor: boolean;
  doctorsList?: any[];
  includedD: any[];
}

const TableData: React.FC<TableDataProps> = ({
  showDoctor,
  doctorsList,
  includedD,
}) => {
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
      {showDoctor ? (
        <GridItem
          colSpan={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="14px" fontWeight="500" fontFamily="Graphik LCG">
            You are not authorized to see the data of this child.
          </Text>
        </GridItem>
      ) : (
        <>
          {doctorsList.map((doctor: any) => {
            const specialties = doctor.relationships.specialties.data;
            const filterByReference = ({
              includedD,
              specialties,
            }: {
              includedD: any[];
              specialties: any[];
            }) => {
              let res = [];
              res = includedD.filter((el: any) => {
                return specialties.find((element: any) => {
                  return element.id === el.id;
                });
              });
              console.log(res);
              return res;
            };

            const result = filterByReference({ includedD, specialties });
            return (
              <>
                <GridItem
                  colSpan={1}
                  style={{ marginLeft: '15px' }}
                  key={doctor.id}
                >
                  <Box display={'flex'} alignItems={'center'}>
                    <Image
                      // boxShadow="base"
                      rounded="md"
                      // boxSize="80px"
                      objectFit="cover"
                      src={
                        doctor.attributes.photo_url
                          ? doctor.attributes.photo_url
                          : img
                      }
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
                      {doctor.attributes.name}
                    </Text>
                  </Box>
                </GridItem>
                <GridItem
                  colSpan={1}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <Box>
                    {result.map((speciality: any) => {
                      return (
                        <Box
                          background={'#F3F3F3'}
                          w="190px"
                          height={'42px'}
                          borderRadius={'10px'}
                          display={'flex'}
                          justifyContent={'center'}
                          alignItems={'center'}
                          my={3}
                          key={speciality.id}
                        >
                          <Text
                            fontSize="13"
                            textAlign={'center'}
                            px="5"
                            fontWeight={'500'}
                            fontFamily="Graphik LCG"
                            color={'#558888'}
                            lineHeight={'16px'}
                            letterSpacing={'1.6%'}
                            key={speciality.id}
                          >
                            {speciality.attributes.name}
                          </Text>
                        </Box>
                      );
                    })}
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
                    {doctor.relationships.sessions.data.length} Sessions
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
                    TBD
                  </Text>
                </GridItem>
              </>
            );
          })}
        </>
      )}
    </Grid>
  );
};
interface SessionTable {
  openModal: any;
  sessions?: any[];
  handleOpenSession: (session: any) => void;
}
const SessionTable: React.FC<SessionTable> = ({
  openModal,
  sessions,
  handleOpenSession,
}) => {
  const date = (time: string) => {
    const transformedDate = new Date(time); // Transform the date once when the component mounts

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const formattedDate =
      transformedDate.getDate() +
      ' ' +
      months[transformedDate.getMonth()] +
      ' ' +
      transformedDate.getFullYear();
    return formattedDate;
  };

  return (
    <>
      {sessions.length > 0 ? (
        sessions.map((session: any) => {
          const time = date(session.attributes.created_at);
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
              key={session.id}
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
                  {time}
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
                  onClick={() => handleOpenSession(session)}
                >
                  Show Report
                </Button>
              </GridItem>
            </Grid>
          );
        })
      ) : (
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
          <GridItem colSpan={4} display={'flex'} justifyContent={'center'}>
            <Text fontSize="14px" fontWeight="500" fontFamily="Graphik LCG">
              There are no sessions
            </Text>
          </GridItem>
        </Grid>
      )}
    </>
  );
};
