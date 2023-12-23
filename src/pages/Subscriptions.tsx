// import { Button } from '@chakra-ui/button';
// import { Box, Flex, Grid, Text } from '@chakra-ui/layout';
// import HeaderSpaceBetween from '../theme/components/HeaderSpaceBetween'
// import { getMe } from '@renderer/cache';
// import { useState } from 'react';
// import GeneralInfoForm from '@renderer/features/AddCenterForm/GeneralInfoForm';
// import SpecialtyForm from '@renderer/features/AddCenterForm/SpecialtyForm';
// import EductionIInfoForm from '@renderer/features/AddCenterForm/EductionIInfoForm';
// import ContactForm from '@renderer/features/AddCenterForm/ContactForm';
// import { Table, Td, Th, Thead, Tr } from '@chakra-ui/table';
// import { Tag, TagLabel } from '@chakra-ui/tag';
// import { useNavigate } from '@reach/router';

//  function Subscriptions() {
//   const totalSteps = 5;
//   const [sliding, setSliding] = useState(1);
//   const [formData, setFormData] = useState({});
//   const [centersList, setCentersList] = useState([]);
//   const [showTable, setShowTable] = useState(true);

//   const token = getMe()?.token;
//   const headers = {
//     Authorization: `Bearer ${token}`,
//   };

//   const handleFormSubmit = (data: any) => {
//     setFormData({ ...formData, ...data });
//     return { ...formData, ...data };
//   };

//   const nextHandler = () => {
//     if (sliding < totalSteps) {
//       setSliding(sliding + 1);
//       setShowTable(false);
//     }
//   };

//   const backHandler = () => {
//     if (sliding > 1) {
//       setSliding(sliding - 1);
//       if (sliding === 2) {
//         setSliding(sliding - 1);
//         setShowTable(true);
//       }
//     }
//   };

//   const renderFormStep = () => {
//     switch (sliding) {
//       case 2:
//         return (
//           <GeneralInfoForm
//             onSubmit={handleFormSubmit}
//             nextHandler={nextHandler}
//             backHandler={backHandler}
//             sliding={sliding}
//           />
//         );
//       case 3:
//         return (
//           <SpecialtyForm
//             onSubmit={handleFormSubmit}
//             nextHandler={nextHandler}
//             backHandler={backHandler}
//             sliding={sliding}
//           />
//         );
//       case 4:
//         return (
//           <EductionIInfoForm
//             onSubmit={handleFormSubmit}
//             nextHandler={nextHandler}
//             backHandler={backHandler}
//             sliding={sliding}
//           />
//         );
//       case 5:
//         return (
//           <ContactForm
//             onSubmit={handleFormSubmit}
//             nextHandler={nextHandler}
//             backHandler={backHandler}
//             sliding={sliding}
//             formData={formData}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   const renderTable = () => {
//     return (
//       <Table
//         variant="simple"
//         background="#FFFFFF"
//         style={{ marginLeft: 10, marginRight: 10 }}
//       >
//         <Thead>
//           <Tr>
//             <Th> Name</Th>
//             <Th>Specialties</Th>
//             <Th>Kids</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {centersList?.map((center) => (
//             <Tr
//               key={center.id}
//               onClick={() => handleCenterClick(center)}
//               cursor={'pointer'}
//             >
//               <Td>
//                 <Flex direction="row" gap={2}>
//                   <Box
//                     width={197}
//                     height={197}
//                     alignItems={'center'}
//                     display={'flex'}
//                   >
//                     <img
//                       src={center?.attributes?.logo?.url}
//                       alt={center?.attributes?.name}
//                     />
//                   </Box>

//                   <Text
//                     style={{
//                       display: 'flex',
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                     }}
//                   >
//                     {center?.attributes?.name}
//                   </Text>
//                 </Flex>
//               </Td>
//               <Td>
//                 {center?.attributes?.specialties?.map((specialty) => (
//                   <Tag key={specialty.id} size="sm" colorScheme="gray" mr={1}>
//                     <TagLabel>{specialty?.name}</TagLabel>
//                   </Tag>
//                 ))}
//               </Td>
//               <Td>{center?.attributes?.children_count}</Td>
//             </Tr>
//           ))}
//         </Tbody>
//       </Table>
//     );
//   };

//   const navigate = useNavigate();

//   const handleCenterClick = (center: Center) => {
//     console.log('Clicked Center Data:', center);
//     navigate('/ViewCenter', { state: center });
//   };

//   const renderTableOrForm = () => {
//     if (sliding === 1) {
//       return (
//         <>
//           <Grid
//             style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               marginTop: sliding === 1 ? '0' : '55px',
//             }}
//           >
//             <Text
//               padding="12px 24px"
//               borderRadius="8px"
//               fontSize="14px"
//               fontFamily="Roboto"
//             >
//               Therapy Centers
//             </Text>

//             <Button
//               w="143px"
//               h="40px"
//               ml="24px"
//               mt="55px"
//               padding="12px 24px"
//               bg="#F5B50E"
//               borderRadius="8px"
//               fontSize="14px"
//               fontFamily="Roboto"
//               onClick={() => nextHandler()}
//               boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
//             >
//               Add Therapy
//             </Button>
//           </Grid>
//           {showTable && renderTable()}
//         </>
//       );
//     } else {
//       return renderFormStep();
//     }
//   };

//   return (
//     <>
//       {/* <Grid
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           margin: '20px',
//         }}
//       >
//         <Text
//           padding="12px"
//           borderRadius="8px"
//           fontFamily="Graphik LCG"
//           fontSize="29px"
//           fontWeight="500"
//           lineHeight="29px"
//           letterSpacing="-0.01em"
//         >
//           therapeutic modules
//         </Text>

//         <Button
//           w="143px"
//           h="40px"

//           padding="12px"
//           bg="#F5B50E"
//           borderRadius="8px"
//           fontSize="14px"
//           fontFamily="Roboto"
//           boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
//         >
//           Add New Module
//         </Button>
//       </Grid> */}
//       <HeaderSpaceBetween Title={"therapeutic modules"} ButtonText={"Add New Module"}/>

//     </>
//   );
// }
// export default Subscriptions

import { useState, useEffect } from 'react';
import axios from 'axios';
import { config } from '../config';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tag,
  TagLabel,
  Img,
  Flex,
  Text,
  Box,
  Button,
  Grid,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../cache';
import ContactForm from '../features/AddCenterForm/ContactForm';
import EductionIInfoForm from '../features/AddCenterForm/EductionIInfoForm';
import GeneralInfoForm from '../features/AddCenterForm/GeneralInfoForm';
import SpecialtyForm from '../features/AddCenterForm/SpecialtyForm';
import HeaderSpaceBetween from '../theme/components/HeaderSpaceBetween';
import GeneralInfoModule from '@renderer/features/AddModuleForm/GeneralInfoModule';

interface Center {
  id: number;
  attributes: {
    name: string;
    logo: {
      url: string;
    };
    specialties: { id: number; name: string }[];
    children_count: number;
  };
}

const Subscriptions: React.FC = () => {
  const totalSteps = 3;
  const [sliding, setSliding] = useState(1);
  const [formData, setFormData] = useState({});

  const handleFormSubmit = (data: any) => {
    setFormData({ ...formData, ...data });
    return { ...formData, ...data };
  };

  const nextHandler = () => {
    if (sliding < totalSteps) {
      setSliding(sliding + 1);
    }
  };

  const backHandler = () => {
    if (sliding > 1) {
      setSliding(sliding - 1);
    }
  };

  const renderFormStep = () => {
    switch (sliding) {
      case 1:
        return (
          <HeaderSpaceBetween
            Title={'therapeutic modules'}
            ButtonText={'Add New Module'}
            onClickFunction={nextHandler}
          />
        );
      case 2:
        return (
          <GeneralInfoModule
            onSubmit={handleFormSubmit}
            nextHandler={nextHandler}
            backHandler={backHandler}
            sliding={sliding}
          />
        );
      case 3:
        return (
          <SpecialtyForm
            onSubmit={handleFormSubmit}
            nextHandler={nextHandler}
            backHandler={backHandler}
            sliding={sliding}
          />
        );
      case 4:
        return (
          <EductionIInfoForm
            onSubmit={handleFormSubmit}
            nextHandler={nextHandler}
            backHandler={backHandler}
            sliding={sliding}
          />
        );
      case 5:
        return (
          <ContactForm
            onSubmit={handleFormSubmit}
            nextHandler={nextHandler}
            backHandler={backHandler}
            sliding={sliding}
            formData={formData}
          />
        );
      default:
        return null;
    }
  };

  // const renderTableOrForm = () => {
  //   if (sliding === 1) {
  //     return (
  //       <>
  //         <HeaderSpaceBetween
  //           Title={'therapeutic modules'}
  //           ButtonText={'Add New Module'}
  //           onClickFunction={nextHandler}
  //         />
  //       </>
  //     );
  //   } else {
  //     return renderFormStep();
  //   }
  // };

  return <>{renderFormStep()}</>;
};

export default Subscriptions;
