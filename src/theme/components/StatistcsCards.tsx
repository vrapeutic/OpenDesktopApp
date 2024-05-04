// import React, { useEffect, useState, useContext } from 'react';
// import { Flex, Card, Box, Text } from '@chakra-ui/react';

// import { Kids } from '../../assets/icons/Kids';
// import { VRsessions } from '../../assets/icons/VRsessions';
// import { config } from '../../config';
// import { dataContext } from '@renderer/shared/Provider';

// export default function StatistcsCards(props: any) {
//   const [kids, setKids] = useState<any>(new Object());
//   const [sessions, setSessions] = useState<any>(new Object());
//   const selectedCenter = useContext(dataContext);

//   const fetchData = async () => {
//     const token = await (window as any).electronAPI.getPassword('token');
//     if (selectedCenter.id !== undefined) {
//       fetch(
//         `${config.apiURL}/api/v1/doctors/kids_percentage?center_id=${selectedCenter.id}`,
//         {
//           method: 'Get',
//           redirect: 'follow',
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       )
//         .then((response) => response.json())
//         .then((result) => {
//           setKids(result);
//         })
//         .catch((error) => console.log('error', error));

//       fetch(
//         `${config.apiURL}/api/v1/doctors/sessions_percentage?center_id=${selectedCenter.id}`,
//         {
//           method: 'Get',
//           redirect: 'follow',
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       )
//         .then((response) => response.json())
//         .then((result) => {
//           setSessions(result);
//           // console.log(result);
//         })
//         .catch((error) => console.log('error', error));
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [props.refreshKey]);

//   return (
//     <>
//       <Flex width="606px" height="186.6px" left="279px" top="519.75px">
//         <Card
//           position="absolute"
//           width="130.62px"
//           height="186.6px"
//           backgroundColor="#FFFFFF"
//           left="596.22px"
//           top="519.75px"
//           borderRadius="10px"
//           boxShadow="0px 20px 45px #F0EDF7"
//         >
//           <Box
//             position="absolute"
//             width="50px"
//             height="50px"
//             left="13px"
//             top="23.25px"
//             backgroundColor="rgba(69,36,248,0.1)"
//             borderRadius="10px"
//           >
//             <Kids position="absolute" color="#4524F8" left="15px" top="16px" />
//           </Box>
//           <Text
//             position="absolute"
//             top="93.25px"
//             left="13px"
//             fontFamily="Roboto"
//             fontStyle="normal"
//             fontWeight="700"
//             fontSize="14px"
//             lineHeight="16px"
//             textTransform="capitalize"
//             color="#5A5881"
//           >
//             Kids
//           </Text>

//           <Text
//             position="absolute"
//             top="117.25px"
//             left="13px"
//             fontFamily="Roboto"
//             fontStyle="normal"
//             fontWeight="500"
//             fontSize="24px"
//             lineHeight="28px"
//             textTransform="capitalize"
//             color="#15134B"
//           >
//             {kids['today_kids']}
//           </Text>

//           <Text
//             position="absolute"
//             top="153.25px"
//             left="13px"
//             fontFamily="Roboto"
//             fontStyle="normal"
//             fontWeight="500"
//             fontSize="14px"
//             lineHeight="16px"
//             textTransform="capitalize"
//             color="#595959"
//           >
//             {kids['percentage']}
//           </Text>
//         </Card>

//         <Card
//           position="absolute"
//           width="130.62px"
//           height="186.6px"
//           backgroundColor="#FFFFFF"
//           left="754.83px"
//           top="519.75px"
//           borderRadius="10px"
//           boxShadow="0px 20px 45px #F0EDF7"
//         >
//           <Box
//             position="absolute"
//             width="50px"
//             height="50px"
//             left="13px"
//             top="23.25px"
//             backgroundColor="rgba(36,214,165,0.1)"
//             borderRadius="10px"
//           >
//             <VRsessions
//               position="absolute"
//               color="#24D6A5"
//               left="13px"
//               top="16px"
//             />
//           </Box>
//           <Text
//             position="absolute"
//             top="93.25px"
//             left="13px"
//             fontFamily="Roboto"
//             fontStyle="normal"
//             fontWeight="700"
//             fontSize="14px"
//             lineHeight="16px"
//             textTransform="capitalize"
//             color="#5A5881"
//           >
//             VR Sessions
//           </Text>

//           <Text
//             position="absolute"
//             top="117.25px"
//             left="13px"
//             fontFamily="Roboto"
//             fontStyle="normal"
//             fontWeight="500"
//             fontSize="24px"
//             lineHeight="28px"
//             textTransform="capitalize"
//             color="#15134B"
//           >
//             {sessions['today_sessions']}
//           </Text>

//           <Text
//             position="absolute"
//             top="153.25px"
//             left="13px"
//             fontFamily="Roboto"
//             fontStyle="normal"
//             fontWeight="500"
//             fontSize="14px"
//             lineHeight="16px"
//             textTransform="capitalize"
//             color="#595959"
//           >
//             {sessions['percentage']}
//           </Text>
//         </Card>
//       </Flex>
//     </>
//   );
// }

// import React, { useEffect, useState, useContext } from 'react';
// import { Flex, Box, Text, Spinner } from '@chakra-ui/react';
// import { Kids } from '../../assets/icons/Kids';
// import { VRsessions } from '../../assets/icons/VRsessions';
// import { config } from '../../config';
// import { dataContext } from '@renderer/shared/Provider';

// export default function StatistcsCards(props: any) {
//   const [kids, setKids] = useState<any>({});
//   const [sessions, setSessions] = useState<any>({});
//   const selectedCenter = useContext(dataContext);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchData = async () => {
//     setIsLoading(true);
//     const token = await (window as any).electronAPI.getPassword('token');
//     if (selectedCenter.id !== undefined) {
//       Promise.all([
//         fetch(
//           `${config.apiURL}/api/v1/doctors/kids_percentage?center_id=${selectedCenter.id}`,
//           {
//             method: 'GET',
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         ),
//         fetch(
//           `${config.apiURL}/api/v1/doctors/sessions_percentage?center_id=${selectedCenter.id}`,
//           {
//             method: 'GET',
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         ),
//       ])
//         .then((responses) =>
//           Promise.all(responses.map((response) => response.json()))
//         )
//         .then((data) => {
//           setKids(data[0]);
//           setSessions(data[1]);
//           setIsLoading(false);
//         })
//         .catch((error) => {
//           console.error('Error fetching data:', error);
//           setIsLoading(false);
//         });
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [props.refreshKey]);

//   return (
//     <Flex justify="space-between" width="100%" maxW="606px" margin="auto">
//       <Box
//         width="130px"
//         backgroundColor="#FFFFFF"
//         borderRadius="10px"
//         boxShadow="0px 20px 45px #F0EDF7"
//       >
//         <Box
//           width="50px"
//           height="50px"
//           bg="rgba(69, 36, 248, 0.1)"
//           borderRadius="10px"
//           display="inline-block"
//         >
//           <Kids color="#4524F8" />
//         </Box>
//         <Text
//           fontWeight="700"
//           fontSize="14px"
//           lineHeight="16px"
//           color="#5A5881"
//         >
//           Kids
//         </Text>
//         <Text
//           fontWeight="500"
//           fontSize="24px"
//           lineHeight="28px"
//           color="#15134B"
//         >
//           {kids['today_kids']}
//         </Text>
//         <Text
//           fontWeight="500"
//           fontSize="14px"
//           lineHeight="16px"
//           color="#595959"
//         >
//           {kids['percentage']}
//         </Text>
//       </Box>

//       <Box
//         width="130px"
//         backgroundColor="#FFFFFF"
//         borderRadius="10px"
//         boxShadow="0px 20px 45px #F0EDF7"
//       >
//         <Box
//           width="50px"
//           height="50px"
//           bg="rgba(36, 214, 165, 0.1)"
//           borderRadius="10px"
//           display="inline-block"
//         >
//           <VRsessions color="#24D6A5" />
//         </Box>
//         <Text
//           fontWeight="700"
//           fontSize="14px"
//           lineHeight="16px"
//           color="#5A5881"
//         >
//           VR Sessions
//         </Text>
//         <Text
//           fontWeight="500"
//           fontSize="24px"
//           lineHeight="28px"
//           color="#15134B"
//         >
//           {sessions['today_sessions']}
//         </Text>
//         <Text
//           fontWeight="500"
//           fontSize="14px"
//           lineHeight="16px"
//           color="#595959"
//         >
//           {sessions['percentage']}
//         </Text>
//       </Box>
//     </Flex>
//   );
// }

import React, { useEffect, useState, useContext } from 'react';
import { Flex, Box, Text, Spinner, Stack } from '@chakra-ui/react';
import { Kids } from '../../assets/icons/Kids';
import { VRsessions } from '../../assets/icons/VRsessions';
import { config } from '../../config';
import { dataContext } from '@renderer/shared/Provider';

export default function StatistcsCards(props: any) {
  const [kids, setKids] = useState<any>({});
  const [sessions, setSessions] = useState<any>({});
  const selectedCenter = useContext(dataContext);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const token = await (window as any).electronAPI.getPassword('token');
    if (selectedCenter.id !== undefined) {
      try {
        const [kidsResponse, sessionsResponse] = await Promise.all([
          fetch(
            `${config.apiURL}/api/v1/doctors/kids_percentage?center_id=${selectedCenter.id}`,
            {
              method: 'GET',
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          fetch(
            `${config.apiURL}/api/v1/doctors/sessions_percentage?center_id=${selectedCenter.id}`,
            {
              method: 'GET',
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);
        const [kidsData, sessionsData] = await Promise.all([
          kidsResponse.json(),
          sessionsResponse.json(),
        ]);
        setKids(kidsData);
        setSessions(sessionsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.refreshKey]);

  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      spacing="4"
      width="100%"
      maxW="606px"
      margin="auto"
    >
      {isLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <StatisticsCard
            title="Kids"
            icon={<Kids color="#4524F8" />}
            value={kids['today_kids']}
            percentage={kids['percentage']}
          />
          <StatisticsCard
            title="VR Sessions"
            icon={<VRsessions color="#24D6A5" />}
            value={sessions['today_sessions']}
            percentage={sessions['percentage']}
          />
        </>
      )}
    </Stack>
  );
}

interface StatisticsCardProps {
  title: string;
  icon: React.ReactNode;
  value: number;
  percentage: number;
}

function StatisticsCard({
  title,
  icon,
  value,
  percentage,
}: StatisticsCardProps) {
  return (
    <Box
      backgroundColor="#FFFFFF"
      borderRadius="10px"
      boxShadow="0px 20px 45px #F0EDF7"
      padding="4"
      textAlign="center"
      
    >
      <Box
        width="50px"
        height="50px"
        bg={
          title === 'Kids'
            ? 'rgba(69, 36, 248, 0.1)'
            : 'rgba(36, 214, 165, 0.1)'
        }
        borderRadius="10px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginBottom="2"
      >
        {icon}
      </Box>

      <Text fontWeight="700" fontSize="14px" lineHeight="16px" color="#5A5881">
        {title}
      </Text>
      <Text fontWeight="500" fontSize="24px" lineHeight="28px" color="#15134B">
        {value}
      </Text>
      <Text fontWeight="500" fontSize="14px" lineHeight="16px" color="#595959">
        {percentage}
      </Text>
    </Box>
  );
}
