import {
  Box,
  Grid,
  GridItem,
  Spinner,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import { useGetEvaluation } from '@renderer/api/Evaluation';
import { useCSVData } from '@renderer/Context/CSVDataContext';
import { dataContext } from '@renderer/shared/Provider';
import { useContext, useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useGetDoctorsData } from '../api';
import { FileData, ModuleData } from './Home';

interface ModuleCountPerFile {
  name: string;
  sessions: number;
}
const Statists = ({ refreshKey, loading, fileDataArray }: any) => {
  const selectedCenterContext = useContext(dataContext);
  const [pieData, setPieData] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [moduleData, setModuleData] = useState([]);
  const { data } = useGetEvaluation(selectedCenterContext.id);
  const { modulesForHome } = useCSVData();
  const { data: doctorData, isLoading } = useGetDoctorsData(
    selectedCenterContext?.id
  );
  const moduleNames = ['Archeeko', 'Viblio', 'GardenDo', 'Rodja', 'Badminton']; // Replace with your actual module names

  const totalVRDuration = modulesForHome.reduce(
    (acc, curr) => acc + curr.totalTimeSpent,
    0
  );
  const longestVRSession = modulesForHome.reduce(
    (acc, curr) => Math.max(acc, curr.totalTimeSpent),
    0
  );
  const moduleCounts = modulesForHome.map((item) => item.moduleName);
  const uniqueModules = [...new Set(moduleCounts)]?.length;
  const averageModulesPerSession = moduleCounts?.length / uniqueModules;
  const averageLevelsPerSession =
    modulesForHome.reduce((acc, curr) => acc + curr.level, 0) /
    modulesForHome?.length;
  console.log(modulesForHome, 'modulesForHome');
  console.log(averageLevelsPerSession);
  const maxSessions = Math.max(
    ...modulesForHome.map((module) => module.totalTimeSpent)
  );

  const getModuleCountsPerFile = (
    filesData: FileData[]
  ): ModuleCountPerFile[] => {
    const moduleCounts: { [moduleName: string]: number } = {};
    filesData.forEach((fileData) => {
      fileData.modules.forEach((module) => {
        if (moduleCounts[module.moduleName]) {
          moduleCounts[module.moduleName]++;
        } else {
          moduleCounts[module.moduleName] = 1;
        }
      });
    });

    return Object.entries(moduleCounts).map(([name, sessions]) => ({
      name,
      sessions,
    }));
  };

  const handleProcessFile = (fileData: FileData[]) => {
    const moduleCounts = getModuleCountsPerFile(fileData);
    setModuleData(moduleCounts);
  };

  const transformDoctorData = () => {
    const topPerformersData = doctorData.data.map((doctor: any) => {
      // Find the corresponding doctor in the included array
      const doctorDetails = doctorData.included.find((item: any) => {
        return (
          item.type === 'doctor' &&
          item.id === doctor.attributes.doctor_id.toString()
        );
      });
      console.log(doctorDetails, 'doctorDetails');
      // Return an object with the doctor's name and session number
      return {
        name: doctorDetails
          ? doctorDetails.attributes.name.charAt(0).toUpperCase() +
            doctorDetails.attributes.name.slice(1).toLowerCase()
          : 'Unknown Doctor', // Fallback in case the doctor is not found
        sessions: doctor.attributes.sessions_number,
      };
    });
    setDoctors(topPerformersData);
  };

  const formatData = () => {
    if (data) {
      const formattedData = [
        {
          name: 'Unevaluated',
          value: data.total_unevaluated,
          color: '#718096',
        },
        { name: 'Poor', value: data.total_poor_evaluation, color: '#155f82' },
        {
          name: 'Average',
          value: data.total_average_evaluation,
          color: '#e97132',
        },
        { name: 'Good', value: data.total_good_evaluation, color: '#196b23' },
        {
          name: 'Very Good',
          value: data.total_very_good_evaluation,
          color: '#0e9fd6',
        },
        {
          name: 'Excellent',
          value: data.total_excellent_evaluation,
          color: '#a02b93',
        },
      ];
      setPieData(formattedData);
    }
  };
  useEffect(() => {
    formatData();
  }, [data, refreshKey]);

  useEffect(() => {
    if (doctorData) {
      transformDoctorData();
      handleProcessFile(fileDataArray);
    }
  }, [doctorData, fileDataArray]);

  const PieDescription = () => (
    <div
      style={{ display: 'flex', justifyContent: 'space-evenly', padding: 10 }}
    >
      {pieData.map((entry, index) => (
        <div
          key={index}
          style={{ marginRight: 10, display: 'flex', alignItems: 'center' }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              backgroundColor: entry.color,
              marginRight: 5,
            }}
          ></div>
          <span>{entry.name}</span>
        </div>
      ))}
    </div>
  );

  const isEmptyData =
    modulesForHome.length === 0 && pieData.length === 0 && doctors.length === 0;

  if (isEmptyData) {
    return (
      <Box textAlign="center" py={6}>
        <Text fontSize="lg">No data available for this month.</Text>
      </Box>
    );
  }

  if (loading || isLoading) {
    // Show a spinner or skeleton when loading
    return (
      <Box textAlign="center" py={6}>
        <Spinner size="xl" />
      </Box>
    );
  }
  return (
    <Box>
      <Grid templateColumns="repeat(2, 1fr)" gap={5}>
        <GridItem colSpan={[2, 1]} textAlign={'center'}>
          <Stack spacing={4}>
            <Box
              bg={'white'}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              h="100%"
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Text fontSize="l">Total VR Duration/Month</Text>
              <Text fontSize="xl" fontWeight="bold">
                {totalVRDuration} Minutes
              </Text>
            </Box>
            <Box
              bg={'white'}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              h="100%"
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Text fontSize="l">Longest VR Session/Month</Text>
              <Text fontSize="xl" fontWeight="bold">
                {longestVRSession} Minutes
              </Text>
            </Box>
            <Box
              bg={'white'}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              h="100%"
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Text fontSize={'large'}>Average Number of Modules/Session</Text>
              <Text fontSize="xl" fontWeight="bold">
                {averageModulesPerSession} Module
              </Text>
            </Box>
            <Box
              bg={'white'}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              h="100%"
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Text fontSize="l">Average Number of Levels/Session</Text>
              <Text fontSize="xl" fontWeight="bold">
                {averageLevelsPerSession} Level
              </Text>
            </Box>
            <Box
              bg={'white'}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              h="100%"
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Text fontSize="xl" mb={2}>
                Modules Used During This Month
              </Text>
              <Stack
                direction="row"
                textAlign={'center'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                {modulesForHome.length > 0 ? (
                  <>
                    <Tag
                      size="lg"
                      variant={
                        modulesForHome.find(
                          (module) => module.moduleName === 'Viblio'
                        )?.totalTimeSpent === maxSessions
                          ? 'solid'
                          : 'outline'
                      }
                      colorScheme={
                        modulesForHome.find(
                          (module) => module.moduleName === 'Viblio'
                        )?.totalTimeSpent === maxSessions
                          ? 'primary'
                          : 'gray'
                      }
                    >
                      Viblio
                    </Tag>
                    <Tag
                      size="lg"
                      variant={
                        modulesForHome.find(
                          (module) => module.moduleName === 'Archeeko'
                        )?.totalTimeSpent === maxSessions
                          ? 'solid'
                          : 'outline'
                      }
                      colorScheme={
                        modulesForHome.find(
                          (module) => module.moduleName === 'Archeeko'
                        )?.totalTimeSpent === maxSessions
                          ? 'primary'
                          : 'gray'
                      }
                    >
                      Archeeko
                    </Tag>

                    {/* GardenDo */}
                    <Tag
                      size="lg"
                      variant={
                        modulesForHome.find(
                          (module) => module.moduleName === 'GardenDo'
                        )?.totalTimeSpent === maxSessions
                          ? 'solid'
                          : 'outline'
                      }
                      colorScheme={
                        modulesForHome.find(
                          (module) => module.moduleName === 'GardenDo'
                        )?.totalTimeSpent === maxSessions
                          ? 'primary'
                          : 'gray'
                      }
                    >
                      GardenDo
                    </Tag>

                    {/* Badminton */}
                    <Tag
                      size="lg"
                      variant={
                        modulesForHome.find(
                          (module) => module.moduleName === 'Badminton'
                        )?.totalTimeSpent === maxSessions
                          ? 'solid'
                          : 'outline'
                      }
                      colorScheme={
                        modulesForHome.find(
                          (module) => module.moduleName === 'Badminton'
                        )?.totalTimeSpent === maxSessions
                          ? 'primary'
                          : 'gray'
                      }
                    >
                      Badminton
                    </Tag>

                    {/* Rodja */}
                    <Tag
                      size="lg"
                      variant={
                        modulesForHome.find(
                          (module) => module.moduleName === 'Rodja'
                        )?.totalTimeSpent === maxSessions
                          ? 'solid'
                          : 'outline'
                      }
                      colorScheme={
                        modulesForHome.find(
                          (module) => module.moduleName === 'Rodja'
                        )?.totalTimeSpent === maxSessions
                          ? 'primary'
                          : 'gray'
                      }
                    >
                      Rodja
                    </Tag>
                  </>
                ) : (
                  <Box
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Text>No modules used this month.</Text>
                  </Box>
                )}
              </Stack>
            </Box>
          </Stack>
        </GridItem>
        <GridItem colSpan={[2, 1]} textAlign={'center'} height={'100%'}>
          <Box bg={'white'} borderWidth="1px" borderRadius="lg" p={4} h="100%">
            <Text fontSize="xl">
              Monthly Distribution of Sessions Evaluation
            </Text>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="70%">
                <PieChart>
                  <Tooltip />
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Text>No evaluation data available.</Text>
              </Box>
            )}
            <PieDescription />
          </Box>
        </GridItem>
        <GridItem colSpan={[2, 1]} textAlign={'center'}>
          <Box
            bg={'white'}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            h="400px"
            mb={4}
          >
            <Text fontSize="xl">Modules' Usage Distribution</Text>

            {moduleData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={moduleData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    height={100}
                    width={100}
                    textAnchor="end"
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#00DEA3" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Text>No modules data available.</Text>
              </Box>
            )}
          </Box>
        </GridItem>
        <GridItem colSpan={[2, 1]} textAlign={'center'}>
          <Box bg={'white'} borderWidth="1px" borderRadius="lg" p={4} h="400px">
            <Text fontSize="xl">Top "N" Performers This Month</Text>
            {doctors.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={doctors}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    height={100}
                    width={100}
                    textAnchor="end"
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#00DEA3" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Text>No doctors data available.</Text>
              </Box>
            )}
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Statists;
