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
import { RedArrow } from '@renderer/assets/icons/RedArrow';
import { useCSVData } from '@renderer/Context/CSVDataContext';
import { dataContext } from '@renderer/shared/Provider';
import Papa from 'papaparse';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as ReachLink, useLocation } from 'react-router-dom';
import { useGetCenter, useGetCentersData } from '../api';
import Statists from './Statists';

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
  date?: string;
}
export default function Home() {
  let selectedCenter = useContext(dataContext);
  const { t } = useTranslation();
  const [centers, setCenters] = useState([]);
  const [centerName, setCenterName] = useState(t('selectCenter'));
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [arrow, setArrow] = useState(false);
  const selectedCenterContext = useContext(dataContext);
  const { processCSVDataForHome } = useCSVData();
  const [files, setFiles] = useState([]);
  const [reportDir, setReportDir] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sessionIds, setSessionIds] = useState<string[]>([]);
  const [fileDataArray, setFileDataArray] = useState<FileData[]>([]);
  const [availableMonths, setAvailableMonths] = useState([]);
  const location = useLocation();
  const [sessionData, setSessionData] = useState<{ [key: string]: string }>({});

  const { data, isLoading: centersLoading } = useGetCentersData();
  const mutation = useGetCenter();

  const getCurrentMonthSessions = (data: any[]) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return data.filter((session: any) => {
      const sessionDate = new Date(session?.attributes?.created_at);
      return (
        sessionDate.getMonth() === currentMonth &&
        sessionDate.getFullYear() === currentYear
      );
    });
  };

  useEffect(() => {
    setCenterName(t('selectCenter'));
    setIsLoading(false);
    setFiles([]);
    setFileDataArray([]);
    setSessionIds([]);
    setSessionData({});
    setAvailableMonths([]);

    if (Object.keys(selectedCenterContext).length > 0) {
      handleClick(selectedCenterContext);
    }
  }, [location.key]);

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

  const handleClick = (center: any) => {
    setCenterName(center?.attributes?.name);
    setIsLoading(true);
    selectedCenter = Object.assign(selectedCenter, center);

    mutation.mutate(center?.id, {
      onSuccess: (data: any) => {
        if (data) {
          setIsLoading(false);
          console.log(data, 'sessionData');

          // Filter sessions for current month
          const currentMonthSessions = getCurrentMonthSessions(data);
          console.log(currentMonthSessions, 'currentMonthSessions');

          // Set session IDs only for current month
          const sessionIdsFromApi = currentMonthSessions.map(
            (session: any) => session.id
          );
          setSessionIds(sessionIdsFromApi);

          // Create session data mapping for all sessions (we keep this for reference)
          const sessionData = currentMonthSessions.reduce(
            (acc: { [key: string]: string }, session: any) => {
              acc[session.id] = session?.attributes?.created_at;
              return acc;
            },
            {}
          );
          setSessionData(sessionData);

          // Extract unique months (although we're only using current month now)
          const uniqueMonths = new Set<string>();
          Object.values(sessionData).forEach((date: string) => {
            const month = new Date(date).toLocaleString('en', {
              month: 'long',
            });
            uniqueMonths.add(month);
          });
          setAvailableMonths(Array.from(uniqueMonths));
        }
      },
    });
    setRefreshKey((oldKey) => oldKey + 1);
    setArrow(false);
  };

  useEffect(() => {
    if (sessionIds.length > 0 && reportDir) {
      handleListFiles();
    }
  }, [sessionIds, reportDir, refreshKey]);

  const handleListFiles = async () => {
    try {
      const files = await (window as any).electron.listFiles(reportDir);
      setFiles(files);
      console.log('Files: from list ', files);
      const fileDataArray = await readFiles(files);
      console.log(fileDataArray);
      setFileDataArray(fileDataArray);
    } catch (error) {
      console.log('Error listing files:', error);
    }
  };

  const readFiles = async (files: string[]): Promise<FileData[]> => {
    const fileDataArray: FileData[] = [];
    const errors: string[] = [];

    for (const file of files) {
      try {
        const sessionIDFromFile = file.replace('.csv', '');
        if (sessionIds.includes(sessionIDFromFile)) {
          const fileData = await handleReadFile(`${reportDir}/${file}`);
          if (fileData) {
            fileDataArray.push({
              fileName: file,
              modules: fileData,
            });
          }
        }
      } catch (error) {
        errors.push(`Error processing file ${file}: ${error}`);
      }
    }

    if (errors.length > 0) {
      console.error('Errors during file processing:', errors);
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
                      ? t('chooseCenter')
                      : t('chooseCenterPrompt')}
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
                      fontFamily="Graphik LCG"
                      fontWeight="700"
                      fontSize="18px"
                      lineHeight="21.09px"
                      textDecoration="none"
                      onClick={onClose}
                    >
                      {t('buttonCancel')}
                    </Button>
                  )}

                  <Button
                    h="50px"
                    w="auto"
                    borderRadius="12px"
                    bg="#00DEA3"
                    color="#FFFFFF"
                    fontFamily="Graphik LCG"
                    fontWeight="700"
                    fontSize="18px"
                    lineHeight="21.09px"
                    textDecoration="none"
                    onClick={onClose}
                  >
                    {t(`let'sChooseCenter`)}
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
              {t('home')}
            </Text>
            <Flex alignItems={'center'} gap={2}>
              {arrow && (
                <Box mx={10}>
                  <RedArrow />
                </Box>
              )}
              {/* {selectedCenter.id && (
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
                  loading={centersLoading}
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
  const { t } = useTranslation();

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading fontSize="2rem" mt={3} mb={2}>
        {t('noCenter')}
      </Heading>

      <Link as={ReachLink} to={'/Therapycenters'}>
        <Button
          colorScheme="teal"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid"
        >
          {t('goToCenter')}
        </Button>
      </Link>
    </Box>
  );
}
