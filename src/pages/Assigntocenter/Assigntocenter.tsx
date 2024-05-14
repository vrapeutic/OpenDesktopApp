import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { joiResolver } from '@hookform/resolvers/joi';
import {
  Button,
  Box,
  Grid,
  GridItem,
  Flex,
  Heading,
  Select,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { useAdminContext } from '../../Context/AdminContext';
import { config } from '../../config';
import CongratulationsAssignCenter from './CongratulationsAssigntocenter';

const Assigntocenter: React.FC = () => {
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
