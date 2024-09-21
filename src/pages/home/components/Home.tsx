import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { CiFilter } from 'react-icons/ci';
import { RedArrow } from '@renderer/assets/icons/RedArrow';
import { useCSVData } from '@renderer/Context/CSVDataContext';
import { dataContext } from '@renderer/shared/Provider';
import Papa from 'papaparse';
import { useContext, useEffect, useState } from 'react';
import { Link as ReachLink } from 'react-router-dom';
import { useGetCenter, useGetCentersData } from '../api';
import Statists from './Statists';
import { FaFilter } from 'react-icons/fa';
export interface ModuleData {
  moduleName: string;
  totalTimeSpent: number;
  formattedTimeSpent: string;
  distractors: string[];
  level: number;
}

export interface FileData {
  fileName: string;
  modules: ModuleData[];
}
export default function Home() {
  let selectedCenter = useContext(dataContext);
  const [centers, setCenters] = useState([]);
  const [centerName, setCenterName] = useState('Select Centers');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [arrow, setArrow] = useState(false);
  const selectedCenterContext = useContext(dataContext);
  const { setModulesForHome, processCSVDataForHome } = useCSVData();
  const [files, setFiles] = useState([]);
  const [reportDir, setReportDir] = useState('');
  const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure();
  const [sessionIds, setSessionIds] = useState<string[]>([]);
  const [fileDataArray, setFileDataArray] = useState<FileData[]>([]);
  const [availableMonths, setAvailableMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  const { data, isLoading: centersLoading } = useGetCentersData();
  const mutation = useGetCenter();

  useEffect(() => {
    const fetchReportDir = async () => {
      try {
        const dirUrl = await (window as any).electron.getReportDir();
        // Replace backslashes with forward slashes
        const fixedDirUrl = dirUrl.replace(/\\/g, '/');
        setReportDir(fixedDirUrl);
      } catch (error) {
        console.log('Error fetching report directory:', error);
      }
    };

    fetchReportDir();
  }, []);

  const handleClick = (center: any) => {
    setCenterName(center?.attributes?.name);
    setIsLoading(true);
    selectedCenter = Object.assign(selectedCenter, center);
    // getCenter();
    mutation.mutate(selectedCenter?.id, {
      onSuccess: (data: any) => {
        if (data) {
          setIsLoading(false);
          const sessionIdsFromApi = data.map((session: any) => session.id);
          const sessionDates = data.map(
            (session: any) => session.attributes.created_at
          );
          console.log(sessionDates, 'sessionDates');
          setSessionIds(sessionIdsFromApi);
          const uniqueMonths = new Set();

          sessionDates.forEach((session: any) => {
            const date = new Date(session);
            const month = date.toLocaleString('en', { month: 'long' });
            uniqueMonths.add(month);
          });

          // Convert the Set to an array
          const monthsArray = Array.from(uniqueMonths);
          setAvailableMonths(monthsArray);
        }
      },
    });
    setRefreshKey((oldKey) => oldKey + 1);
    setArrow(false);
  };

  useEffect(() => {
    if (data) {
      setCenters(data);
    }
  }, [data]);

  useEffect(() => {
    if (Object.keys(selectedCenterContext).length === 0) {
      onOpen();
      setArrow(true);
    }
  }, []);

  useEffect(() => {
    if (sessionIds.length > 0 && reportDir) {
      handleListFiles(); // This now runs after session IDs are fetched
    }
  }, [sessionIds, reportDir]);

  const handleListFiles = async () => {
    try {
      const files = await (window as any).electron.listFiles(reportDir);
      setFiles(files);
      console.log('Files: from list ', files);
      const fileDataArray = await readFiles(files);
      setFileDataArray(fileDataArray);
    } catch (error) {
      console.log('Error listing files:', error);
    }
  };

  const readFiles = async (files: string[]): Promise<FileData[]> => {
    const fileDataArray: FileData[] = [];
    let filesRead = 0;

    for (const file of files) {
      const sessionIDFromFile = file.replace('.csv', '');
      if (sessionIds.includes(sessionIDFromFile)) {
        const fileData = await handleReadFile(`${reportDir}/${file}`);
        if (fileData) {
          fileDataArray.push({
            fileName: file,
            modules: fileData,
          });
          filesRead++;
        }
      } else {
        console.log(
          'Session ID not found in sessionIds state:',
          sessionIDFromFile
        );
      }
    }

    if (filesRead === 0) {
      console.log('No matching files found for session IDs.');
    } else {
      console.log(`${filesRead} files were processed.`);
    }

    return fileDataArray;
  };

  const handleReadFile = async (
    filePath: string
  ): Promise<ModuleData[] | null> => {
    try {
      const content = await (window as any).electron.readFile(filePath);
      const parsedCSVData = Papa.parse<string[]>(content, {
        skipEmptyLines: true,
      }).data;
      return processCSVDataForHome(parsedCSVData);
    } catch (error) {
      console.log('Error reading file:', error);
      return null;
    }
  };

  return (
    <>
      {centersLoading ? (
        <Box textAlign="center" py={10} px={6}>
          <Spinner />
        </Box>
      ) : centers.length == 0 ? (
        <NotFound />
      ) : (
        <>
          {onOpen && (
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent w="645px" bgColor="#FFFFFF" borderRadius="10px">
                <ModalBody>
                  <Text
                    fontFamily="Graphik LCG"
                    fontSize="20px"
                    fontWeight="400"
                    textAlign="center"
                    color="red"
                    mt={5}
                  >
                    {centers.length > 0
                      ? "It seems you haven't joined any center yet. Please create a center first, or ask a center administrator to send you an invitation."
                      : 'Before you can proceed, please choose a center from the home page beside the red arrow.'}
                  </Text>
                </ModalBody>

                <ModalFooter display="flex" justifyContent={'space-around'}>
                  {centers.length === 0 && (
                    <Button
                      h="50px"
                      w="auto"
                      borderRadius="12px"
                      bg="#00DEA3"
                      color="#FFFFFF"
                      fontFamily="Roboto"
                      fontWeight="700"
                      fontSize="18px"
                      lineHeight="21.09px"
                      textDecoration="none"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                  )}

                  <Button
                    h="50px"
                    w="auto"
                    borderRadius="12px"
                    bg="#00DEA3"
                    color="#FFFFFF"
                    fontFamily="Roboto"
                    fontWeight="700"
                    fontSize="18px"
                    lineHeight="21.09px"
                    textDecoration="none"
                    onClick={onClose}
                  >
                    Let’s go choose a center
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}

          <Flex
            justifyContent={'space-between'}
            py={15}
            px={30}
            alignItems={'center'}
          >
            <Text
              alignItems="center"
              top="129px"
              fontFamily="Graphik LCG"
              fontSize="29px"
              fontWeight="500"
              lineHeight="29px"
              letterSpacing="-0.01em"
            >
              Home
            </Text>
            <Flex alignItems={'center'} gap={2}>
              {arrow && (
                <Box mx={10}>
                  <RedArrow />
                </Box>
              )}
              {/* {selectedCenter && (
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    bgColor="#FFFFFF"
                    border="2px solid #00DEA3"
                    borderRadius="8px"
                    color="#00DEA3"
                  >
                    <Flex gap={1}>
                      <FaFilter fill="#00DEA3" /> {selectedMonth}
                    </Flex>
                  </MenuButton>
                  <MenuList>
                    {availableMonths.map((month) => (
                      <MenuItem
                        key={month}
                        onClick={() => setSelectedMonth(month)}
                      >
                        {month}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              )} */}

              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  bgColor="#FFFFFF"
                  border="2px solid #00DEA3"
                  borderRadius="8px"
                  color="#00DEA3"
                >
                  {selectedCenterContext.id
                    ? selectedCenterContext.attributes.name
                    : centerName}
                </MenuButton>
                <MenuList>
                  {centers?.map((center) => (
                    <MenuItem
                      key={center?.id}
                      onClick={() => handleClick(center)}
                    >
                      {center.attributes.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Flex>
          </Flex>

          {selectedCenterContext?.id && (
            <>
              <Box
                // width="90%"
                // justifyContent="space-between"
                padding="10px"
                marginBottom="20px"
                // flexWrap="wrap"
              >
                {/* <VRminutesCard loading={isLoading} refreshKey={refreshKey} />
                <VRsessionsCard loading={isLoading} refreshKey={refreshKey} /> */}
                <Statists
                  loading={isLoading || centersLoading}
                  refreshKey={refreshKey}
                  fileDataArray={fileDataArray}
                />
              </Box>

              {/* <StatistcsCards refreshKey={refreshKey} /> */}
            </>
          )}
        </>
      )}
    </>
  );
}

export function NotFound() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading fontSize="2rem" mt={3} mb={2}>
        You don't have center yet
      </Heading>

      <Link as={ReachLink} to={'/Therapycenters'}>
        <Button
          colorScheme="teal"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid"
        >
          Go to Centers
        </Button>
      </Link>
    </Box>
  );
}
