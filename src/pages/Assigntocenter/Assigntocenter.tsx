// import { useForm } from 'react-hook-form';
// import Joi from 'joi';
// import {
//   Button,
//   Text,
//   Box,
//   FormLabel,
//   Grid,
//   GridItem,
//   Input,
//   Flex,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuList,
//   Heading,
//   Select,
// } from '@chakra-ui/react';
// import { joiResolver } from '@hookform/resolvers/joi';
// import { SignupFormProps } from '../SignUp/signupFormInterface';
// import { ChevronDownIcon } from '@chakra-ui/icons';

// import ProgressBarSignup from '../../theme/components/ProgressBarSignup';
// import { useEffect, useState } from 'react';
// import { config } from '@renderer/config';
// import DatePicker from 'react-datepicker';
// import axios from 'axios';
// import { useAdminContext } from '@renderer/Context/AdminContext';
// import { useLocation } from 'react-router-dom';

// const Assigntocenter: React.FC<SignupFormProps> = ({
//   onSubmit,
//   nextHandler,
//   formData,
// }) => {
//   const schema = Joi.object({
//     Name: Joi.string()

//       .min(3)
//       .max(30)

//       .required(),
//     Email: Joi.string()
//       .email({ tlds: { allow: false } })
//       .required(),
//     Password: Joi.string().min(4).required(),
//   });
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: joiResolver(schema),
//     mode: 'onTouched',
//   });
//   const [centers, setCenters] = useState([]);
//   const [startDate, setStartDate] = useState<Date>(new Date());
//   const { otp } = useAdminContext();
//   const location = useLocation();
//   const { Module } = location.state;

//   console.log('module in state', Module);

//   const handleClick = (center: object) => {
//     console.log('selected center', center);
//   };

//   const headers = {
//     otp: `${otp}`,
//   };

//   const getCenters = async () => {
//     try {
//       const response = await axios.get(
//         `${config.apiURL}/api/v1/admins/centers`,
//         { headers }
//       );
//       console.log('response centers', response.data.data);
//       setCenters(response.data.data);
//       console.log('centers', centers);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAssign = async () => {
//       try {
//         const response = await axios.post(
//           `${config.apiURL}/api/v1/admins/assign_center_module`,
//           {
//             center_id: selectedCenter.id,
//             software_module_id: props.selectedModuleId,
//             end_date: startDate,
//           },
//           { headers }
//         );

//         console.log('API Response:', response.data);
//         handleSuccess();
//       } catch (error) {
//         console.log('Error assigning center to module:', error);
//         handleError(error);
//       }

//     props.onClose();
//   };
//   useEffect(() => {
//     getCenters();
//   }, []);
//   return (
//     <>
//       <Box
//         bg="#FFFFFF"
//         borderRadius="10px"
//         m="5.875em 2.625em 5.875em 2.375em"
//         as="form"
//         onSubmit={handleSubmit(FormonSubmit)}
//       >
//         <Box textAlign="center" py={10} px={6}>
//           <Heading fontSize="2rem" mt={3} mb={2}>
//             Assign Module {Module?.attributes?.name} To centers
//           </Heading>
//         </Box>
//         <Grid
//           m="2.625em 1.5em 0em 1.5em"
//           templateColumns="repeat(2, 1fr)"
//           gap="0em 1.5625em"
//         >
//           <GridItem>
//             <Select placeholder="Select option" size="sm">
//               {centers.map((center) => (
//                 <option value={center.id} key={center.id}>
//                   {' '}
//                   {center?.attributes.name}
//                 </option>
//               ))}
//             </Select>
//           </GridItem>
//           <GridItem>
//             <DatePicker
//               showIcon
//               selected={startDate}
//               onChange={(date: Date) => setStartDate(date)}
//               minDate={new Date()} // Set minDate to the current date
//             />
//           </GridItem>
//         </Grid>
//         <Flex flexDirection="row-reverse">
//           <Button
//             type="submit"
//             bg="#4AA6CA"
//             borderRadius="0.75em"
//             w="13.375em"
//             h="3.375em"
//             mt="0em"
//             mr="1.5em"
//             mb="2em"
//             color="#FFFFFF"
//             fontSize="1.125em"
//             fontWeight="700"
//           >
//             Submit
//           </Button>
//         </Flex>
//       </Box>
//     </>
//   );
// };
// export default Assigntocenter;

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { joiResolver } from '@hookform/resolvers/joi';
import {
  Button,
  Text,
  Box,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Heading,
  Select,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useAdminContext } from '@renderer/Context/AdminContext';
import { config } from '@renderer/config';
import { SignupFormProps } from '../SignUp/signupFormInterface';
import CongratulationsAssignCenter from './CongratulationsAssigntocenter';

const Assigntocenter: React.FC<SignupFormProps> = () => {
  const schema = Joi.object({
    Name: Joi.string().min(3).max(30).required(),
    Email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    Password: Joi.string().min(4).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onTouched',
  });

  const [centers, setCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const { otp } = useAdminContext();
  const location = useLocation();
  const { Module } = location.state;
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  console.log('module data from location', Module);
  const headers = {
    otp: `${otp}`,
  };

  const getCenters = async () => {
    try {
      const response = await axios.get(
        `${config.apiURL}/api/v1/admins/centers`,
        { headers }
      );
      console.log('response centers', response.data.data);
      setCenters(response.data.data);
    } catch (error) {
      console.error(error);
      // Handle error gracefully, e.g., display an error message to the user
    }
  };

  const handleAssign = async () => {
    try {
      const response = await axios.post(
        `${config.apiURL}/api/v1/admins/assign_center_module`,
        {
          center_id: selectedCenter,
          software_module_id: Module.id,
          end_date: startDate,
        },
        { headers }
      );

      console.log('API Response:', response.data);
      onOpen();
    } catch (error) {
      console.log('Error assigning center to module:', error);
      handleError(error);
    }
  };

  const handleSuccess = () => {
    toast({
      title: 'Success',
      description: 'Assigned Successfully',
      status: 'success',
      duration: 9000,
      position: 'top-right',
    });
  };

  const handleError = (error: any) => {
    toast({
      title: 'Error',
      description: error.response.data.error,
      status: 'error',
      duration: 9000,
      position: 'top-right',
    });
  };

  const CloseCongratulationsModal = () => {
    console.log('handle close modal');
    onClose();
    () => {
      navigate('/Assigntocenter', {
        state: { Module: Module },
      });
    };
  };

  useEffect(() => {
    getCenters();
  }, []);

  return (
    <>
      <Box
        bg="#FFFFFF"
        borderRadius="10px"
        m="5.875em 2.625em 5.875em 2.375em"
        as="form"
        onSubmit={handleSubmit(handleAssign)}
      >
        <Box textAlign="center" py={10} px={6}>
          <Heading fontSize="2rem" mt={3} mb={2}>
            Assign Module {Module?.attributes?.name} To centers
          </Heading>
        </Box>
        <Grid
          m="2.625em 1.5em 0em 1.5em"
          templateColumns="repeat(2, 1fr)"
          gap="0em 1.5625em"
        >
          <GridItem>
            <Select
              placeholder="Select Center"
              size="sm"
              onChange={(e) => {
                console.log('Selected center:', e.target.value);
                setSelectedCenter(e.target.value);
              }}
            >
              {centers.map((center) => (
                <option value={center.id} key={center.id}>
                  {center?.attributes.name}
                </option>
              ))}
            </Select>
          </GridItem>
          <GridItem>
            <DatePicker
              showIcon
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              minDate={new Date()}
            />
          </GridItem>
        </Grid>
        <Flex flexDirection="row-reverse">
          <Button
            type="submit"
            bg="#4AA6CA"
            borderRadius="0.75em"
            w="13.375em"
            h="3.375em"
            mt="0em"
            mr="1.5em"
            mb="2em"
            color="#FFFFFF"
            fontSize="1.125em"
            fontWeight="700"
            onClick={handleAssign}
          >
            Submit
          </Button>
        </Flex>
      </Box>

      {onOpen && (
        <CongratulationsAssignCenter
          isOpen={isOpen}
          Module={Module}
          onClose={CloseCongratulationsModal}
        />
      )}
    </>
  );
};
export default Assigntocenter;
