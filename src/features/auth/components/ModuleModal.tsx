import { CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Switch,
  useToast,
  Text,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { config } from '@renderer/config';
import { useAdminContext } from '@renderer/Context/AdminContext';
export default function ModuleModal(props: any) {
    const [startDate, setStartDate] = useState(new Date());
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [selectedCenter, setSelectedCenter] = useState(null);
    const [CentersData, setCentersData] = useState([]);
    const [selectedModuleId, setSelectedModuleId] = useState(props.selectedModuleId);
    const toast = useToast();

    console.log("selected module id", props.selectedModuleId)
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
        console.log("is switch on value",isSwitchOn)
        if (isSwitchOn && selectedCenter) {
          try {
            // Send a request to the API to assign the center to the module
            const response = await axios.post(
              `${config.apiURL}/api/v1/admins/assign_center_module`,
              {
                center_id: selectedCenter.id,
                software_module_id: props.selectedModuleId,
                end_date: startDate, // Assuming endDate is the selected date
              },
              { headers }
            );
  
            // Log the response from the API
            console.log('API Response:', response.data);
            handleSuccess()

          } catch (error) {
            console.log('Error assigning center to module:', error);
            handleError(error)
          }
        }
    
        // Close the modal
        props.onClose();
      };
    
    //   useEffect(() => {
    //     if (isSwitchOn) {
    //         handleAssign()
    //       console.log('Switch is ON, do something...');
    //     }
    //   }, [isSwitchOn]);
  

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
          description: "Assigned Successfully",
          status: 'success',
          duration: 9000,
          position: 'top-right',
        });
      };
    return (
      <>
  <Modal isOpen={props.isOpen} onClose={props.onClose} size={'2xl'}>{/* Increase the width of the modal */}
        <ModalOverlay />
        <ModalContent bgColor="#FFFFFF" borderRadius="10px">

          {/* Header Boxes */}
          <Flex justify="space-between" p={4} mb={4} bg="blue.500" borderRadius="8px">
            <Box>
              <Text color="white" fontSize="lg" fontWeight="bold">
                Center Name: {/* Add logic to display center name here */}
              </Text>
            </Box>
            <Box>
              <Text color="white" fontSize="lg" fontWeight="bold">
                Status: {/* Add logic to display status here */}
              </Text>
            </Box>
            <Box>
              <Text color="white" fontSize="lg" fontWeight="bold">
                Valid Until: {/* Add logic to display valid until date here */}
              </Text>
            </Box>
          </Flex>

          {CentersData?.map((center) => (
          
              <ModalBody>
                <Flex>
                  <Box w="40%" borderRight="1px solid rgba(0, 0, 0, 0.08)">{/* Increase the width of the center box */}
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

                  <Box w="20%" borderRight="1px solid rgba(0, 0, 0, 0.08)">{/* Decrease the width of the switch box */}
                    <Stack direction="row">
                      <Switch
                        colorScheme="teal"
                        size="lg"
                        onChange={() => {
                          setSelectedCenter(center);
                          setIsSwitchOn(true);
                          if (isSwitchOn) {
                            handleAssign()
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
                      onChange={(date) => setStartDate(date)}
                      style={{ width: '80%', margin: 'auto' }} 
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
