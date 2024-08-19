import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Link,
  Spinner,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import VRminutesCard from '../shared/VRminutetsPerMonth/VRminutesCard';
import VRsessionsCard from '../shared/VRsessions/VRsessionsCard';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { config } from '../config';
import StatistcsCards from '../theme/components/StatistcsCards';
import { dataContext } from '@renderer/shared/Provider';
import { Link as ReachLink } from 'react-router-dom';
import { RedArrow } from '@renderer/assets/icons/RedArrow';
import Papa from 'papaparse';

const moduleNames = ['Archeeko', 'Viblio', 'GardenDo']; // Replace with your actual module names
type ModuleData = {
  moduleName: string;
  totalTimeSpent: number;
  formattedTimeSpent: string;
  distractors: string[];
};

// Function to convert "HH:MM" time string to total minutes
const parseDateTime = (dateTimeString: string): Date => {
  const [datePart, timePart] = dateTimeString.split(' ');
  const [day, month, year] = datePart.split('/').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes);
};

// Function to calculate time difference in minutes
const calculateTimeDifference = (start: Date, end: Date): number => {
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60));
};

// Function to format time spent
const formatTimeSpent = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  let result = '';

  if (hours > 0) {
    result += `${hours} hour${hours > 1 ? 's' : ''}`;
  }

  if (minutes > 0) {
    if (hours > 0) {
      result += ' and ';
    }
    result += `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }

  return result || '0 minutes';
};

const processCSVData = (parsedData: string[][]): ModuleData[] => {
  const modules: ModuleData[] = [];
  let currentModule: ModuleData | null = null;
  let moduleStartTime: Date | null = null;
  let moduleEndTime: Date | null = null;

  parsedData.forEach((row) => {
    const dateTimeString = row[0].trim();

    if (moduleNames.includes(row[0].trim())) {
      if (currentModule) {
        currentModule.totalTimeSpent =
          moduleStartTime && moduleEndTime
            ? calculateTimeDifference(moduleStartTime, moduleEndTime)
            : 0;
        currentModule.formattedTimeSpent = formatTimeSpent(
          currentModule.totalTimeSpent
        );
        modules.push(currentModule);
      }
      currentModule = {
        moduleName: row[0].trim(),
        totalTimeSpent: 0,
        formattedTimeSpent: '',
        distractors: [],
      };
      moduleStartTime = null;
      moduleEndTime = null;
    } else if (
      currentModule &&
      row[0].trim().toLowerCase() !== 'target starting time' &&
      row[0].trim() !== ''
    ) {
      const currentDateTime = parseDateTime(dateTimeString);
      if (!moduleStartTime) {
        moduleStartTime = currentDateTime;
      }
      moduleEndTime = currentDateTime;

      const distractorName = row[3].trim(); // Assume distractor name is in the third column
      if (
        distractorName &&
        !currentModule.distractors.includes(distractorName)
      ) {
        currentModule.distractors.push(distractorName);
      }
    }
  });

  if (currentModule) {
    currentModule.totalTimeSpent =
      moduleStartTime && moduleEndTime
        ? calculateTimeDifference(moduleStartTime, moduleEndTime)
        : 0;
    currentModule.formattedTimeSpent = formatTimeSpent(
      currentModule.totalTimeSpent
    );
    modules.push(currentModule);
  }

  return modules;
};

// Example usage

export default function Home() {
  const [centers, setCenters] = useState([]);
  const [centerName, setCenterName] = useState('Select Centers');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  let selectedCenter = useContext(dataContext);
  const [Loading, setLoading] = useState(false);
  const [arrow, setArrow] = useState(false);
  const selectedCenterContext = useContext(dataContext);
  const [files, setFiles] = useState([]);
  const [fileContent, setFileContent] = useState('');
  const [reportDir, setReportDir] = useState('');
  const [modules, setModules] = useState<ModuleData[]>([]);

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

  const handleListFiles = async () => {
    try {
      const files = await (window as any).electron.listFiles(reportDir);
      setFiles(files);
      console.log(files);
      // Call readFiles function after getting the list of files
      await readFiles(files);
    } catch (error) {
      console.error('Error listing files:', error);
    }
  };
  const readFiles = async (files: string[]) => {
    for (const file of files) {
      await handleReadFile(
        'C:/Users/Issra Ismaiel/Downloads/sample_data_complex_session_2.csv'
      );
    }
  };

  const handleReadFile = async (filePath: string) => {
    try {
      const content = await (window as any).electron.readFile(filePath);
      setFileContent(content);
      console.log(`Content of ${filePath}:`, content);

      const parsedCSVData = Papa.parse<string[]>(content, {
        skipEmptyLines: true,
      }).data;
      console.log('Parsed CSV data:', parsedCSVData);
      // Processing the parsed CSV data to extract the needed information
      const moduleData = processCSVData(parsedCSVData);
      console.log('Processed CSV data:', moduleData);
      setModules(moduleData);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  useEffect(() => {
    if (reportDir) {
      handleListFiles();
    }
  }, [reportDir]);

  const handleClick = (center: any) => {
    console.log(center?.attributes?.name);
    setCenterName(center?.attributes?.name);
    setIsLoading(true);
    selectedCenter = Object.assign(selectedCenter, center);
    setRefreshKey((oldKey) => oldKey + 1);
    setArrow(false);
  };
  const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const token = await (window as any).electronAPI.getPassword('token');
      fetch(
        `${config.apiURL}/api/v1/doctors/home_centers?include=center_social_links,specialties`,
        {
          method: 'Get',
          redirect: 'follow',
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          setLoading(false);
          setCenters(result.data);
        })
        .catch((error) => console.log('error', error));
    })();
  }, []);
  console.log(
    'centers length',
    centers.length,
    selectedCenterContext.id,
    centers
  );

  useEffect(() => {
    if (Object.keys(selectedCenterContext).length === 0) {
      onOpen();
      setArrow(true);
    }
  }, []);

  return (
    <>
      {Loading ? (
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
            <Flex alignItems={'center'}>
              {arrow && (
                <Box mx={10}>
                  <RedArrow />
                </Box>
              )}

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
                      key={center.id}
                      onClick={() => handleClick(center)}
                    >
                      {center.attributes.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Flex>
          </Flex>

          {selectedCenterContext.id && (
            <>
              <Flex
                width="90%"
                justifyContent="space-between"
                padding="20px"
                marginBottom="20px"
                flexWrap="wrap"
              >
                <VRminutesCard loading={isLoading} refreshKey={refreshKey} />
                <VRsessionsCard loading={isLoading} refreshKey={refreshKey} />
              </Flex>

              <StatistcsCards refreshKey={refreshKey} />
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
