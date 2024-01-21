import {
  Box,
  Flex,
  Stack,
  Switch,
  useToast,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { config } from '../../../config';
import { useAdminContext } from '../../../Context/AdminContext';
import DatePicker from 'react-datepicker';
import { Grid } from '@chakra-ui/react';

interface Center {
  id: number;
  attributes: {
    name: string;
    // Add other attributes as needed
  };
}

interface ModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModuleId: number; // Adjust the type based on your requirements
}

export default function ModuleModal(props: ModuleModalProps): JSX.Element {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState<Center | null>(null);
  const [centersData, setCentersData] = useState<Center[]>([]);
  const toast = useToast();
  const { otp } = useAdminContext();

  useEffect(() => {
    getCenters();
  }, []);

  const headers = {
    otp: `${otp}`,
  };

  const getCenters = async () => {
    try {
      const response = await axios.get(
        `${config.apiURL}/api/v1/admins/centers`,
        { headers }
      );
      setCentersData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAssign = async () => {
    console.log('is switch on value', isSwitchOn);
    if (isSwitchOn && selectedCenter) {
      try {
        const response = await axios.post(
          `${config.apiURL}/api/v1/admins/assign_center_module`,
          {
            center_id: selectedCenter.id,
            software_module_id: props.selectedModuleId,
            end_date: startDate,
          },
          { headers }
        );

        console.log('API Response:', response.data);
        handleSuccess();
      } catch (error) {
        console.log('Error assigning center to module:', error);
        handleError(error);
      }
    }

    props.onClose();
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

  const handleSuccess = () => {
    toast({
      title: 'Success',
      description: 'Assigned Successfully',
      status: 'success',
      duration: 9000,
      position: 'top-right',
    });
  };

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} size={'2xl'}>
        <ModalOverlay />
        <ModalContent bgColor="#FFFFFF" borderRadius="10px">
          <Grid
            templateColumns="repeat(3, 1fr)" 
            p={4}
            mb={4}
            bg="blue.500"
            borderRadius="8px"
            gap={4} 
          >
            <Box>
              <Text
                color="white"
                fontSize="lg"
                fontWeight="bold"
                textAlign="center"
              >
                Center Name
              </Text>
            </Box>
            <Box>
              <Text
                color="white"
                fontSize="lg"
                fontWeight="bold"
                textAlign="center"
              >
                Status
              </Text>
            </Box>
            <Box>
              <Text
                color="white"
                fontSize="lg"
                fontWeight="bold"
                textAlign="center"
              >
                Valid Until
              </Text>
            </Box>
          </Grid>

          {centersData.map((center) => (
            <ModalBody key={center.id}>
              <Flex>
                <Box w="40%" borderRight="1px solid rgba(0, 0, 0, 0.08)">
                  <Box p="4">
                    <Text
                      fontFamily="Graphik LCG"
                      fontSize="20px"
                      fontWeight="400"
                      color="#00261C"
                      textAlign="center"
                    >
                      {center?.attributes.name}
                    </Text>
                  </Box>
                </Box>

                <Box w="20%" borderRight="1px solid rgba(0, 0, 0, 0.08)">
                  <Stack direction="row">
                    <Switch
                      colorScheme="teal"
                      size="lg"
                      onChange={() => {
                        setSelectedCenter(center);
                        setIsSwitchOn(true);
                        if (isSwitchOn) {
                          handleAssign();
                          console.log('Switch is ON, do something...');
                        }
                      }}
                    />
                  </Stack>
                </Box>

                <Box w="40%">
                  <DatePicker
                    showIcon
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                  />
                </Box>
              </Flex>
            </ModalBody>
          ))}
        </ModalContent>
      </Modal>
    </>
  );
}
