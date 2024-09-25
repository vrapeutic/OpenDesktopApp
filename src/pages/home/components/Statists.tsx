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
import { useContext, useEffect, useMemo, useState } from 'react';
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
  const [calculatedStats, setCalculatedStats] = useState({
    totalVRDuration: 0,
    longestVRSession: 0,
    uniqueModules: 0,
    averageModulesPerSession: 0,
    averageLevelsPerSession: 0,
    maxSessions: 0,
  });
  const moduleNames = ['Archeeko', 'Viblio', 'GardenDo', 'Rodja', 'Badminton'];

  useEffect(() => {
    if (fileDataArray && fileDataArray.length > 0) {
      const allModules = fileDataArray.flatMap((file: any) => file.modules);

      const totalVRDuration = allModules.reduce(
        (acc: any, curr: any) => acc + curr.totalTimeSpent,
        0
      );

      const longestVRSession = allModules.reduce(
        (acc: any, curr: any) => Math.max(acc, curr.totalTimeSpent),
        0
      );

      const moduleCounts = allModules.map((item: any) => item.moduleName);
      const uniqueModules = [...new Set(moduleCounts)].length;
      const averageModulesPerSession =
        moduleCounts.length / fileDataArray.length;
      console.log('averageModulesPerSession', averageModulesPerSession);
      console.log('uniqueModules', uniqueModules);
      const averageLevelsPerSession =
        allModules.reduce((acc: any, curr: any) => acc + curr.level, 0) /
        allModules.length;

      const maxSessions = Math.max(
        ...allModules.map((module: any) => module.totalTimeSpent)
      );

      setCalculatedStats({
        totalVRDuration,
        longestVRSession,
        uniqueModules,
        averageModulesPerSession,
        averageLevelsPerSession,
        maxSessions,
      });

      console.log('Calculated stats:', {
        totalVRDuration,
        longestVRSession,
        uniqueModules,
        averageModulesPerSession,
        averageLevelsPerSession,
        maxSessions,
      });
    } else {
      setCalculatedStats({
        totalVRDuration: 0,
        longestVRSession: 0,
        uniqueModules: 0,
        averageModulesPerSession: 0,
        averageLevelsPerSession: 0,
        maxSessions: 0,
      });
    }
  }, [fileDataArray]);

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
  }, [doctorData, fileDataArray, selectedCenterContext.id]);

  const moduleExistence = useMemo(() => {
    if (!fileDataArray || fileDataArray.length === 0) {
      return Object.fromEntries(moduleNames.map((name) => [name, false]));
    }

    return moduleNames.reduce(
      (acc, name) => {
        acc[name] = fileDataArray.some((file: any) =>
          file.modules.some((m: any) => m.moduleName === name)
        );
        return acc;
      },
      {} as Record<string, boolean>
    );
  }, [fileDataArray, moduleNames]);

  // For debugging
  useEffect(() => {
    console.log('Module existence:', moduleExistence);
  }, [moduleExistence]);

  const PieDescription = () => (
    <Box display={'flex'} justifyContent={'space-evenly'} padding={2}>
      {pieData.map((entry, index) => (
        <Box display={'flex'} alignItems={'center'} key={index}>
          <Box borderRadius={4} mr={1} w={5} h={5} bg={entry.color} />
          <span style={{ whiteSpace: 'nowrap' }}>{entry.name}</span>
        </Box>
      ))}
    </Box>
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
                {calculatedStats.totalVRDuration} Minutes
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
                {calculatedStats.longestVRSession} Minutes
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
                {calculatedStats.averageModulesPerSession} Module
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
                {calculatedStats.averageLevelsPerSession} Level
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
                {fileDataArray?.length > 0 ? (
                  <>
                    <Tag
                      size="lg"
                      variant={moduleExistence['Viblio'] ? 'solid' : 'outline'}
                      colorScheme={
                        moduleExistence['Viblio'] ? 'primary' : 'gray'
                      }
                    >
                      Viblio
                    </Tag>
                    <Tag
                      size="lg"
                      variant={
                        moduleExistence['Archeeko'] ? 'solid' : 'outline'
                      }
                      colorScheme={
                        moduleExistence['Archeeko'] ? 'primary' : 'gray'
                      }
                    >
                      Archeeko
                    </Tag>

                    {/* GardenDo */}
                    <Tag
                      size="lg"
                      variant={
                        moduleExistence['GardenDo'] ? 'solid' : 'outline'
                      }
                      colorScheme={
                        moduleExistence['GardenDo'] ? 'primary' : 'gray'
                      }
                    >
                      GardenDo
                    </Tag>

                    {/* Badminton */}
                    <Tag
                      size="lg"
                      variant={
                        moduleExistence['Badminton'] ? 'solid' : 'outline'
                      }
                      colorScheme={
                        moduleExistence['Badminton'] ? 'primary' : 'gray'
                      }
                    >
                      Badminton
                    </Tag>

                    {/* Rodja */}
                    <Tag
                      size="lg"
                      variant={moduleExistence['Rodja'] ? 'solid' : 'outline'}
                      colorScheme={
                        moduleExistence['Rodja'] ? 'primary' : 'gray'
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
              <ResponsiveContainer
                width="100%"
                height="70%"
                style={{ marginBottom: '1rem', marginTop: '1rem' }}
              >
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
              <ResponsiveContainer
                width="100%"
                height="100%"
                style={{ marginBottom: '1rem', marginTop: '1rem' }}
              >
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
              <ResponsiveContainer
                width="100%"
                height="100%"
                style={{ marginBottom: '1rem', marginTop: '1rem' }}
              >
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
