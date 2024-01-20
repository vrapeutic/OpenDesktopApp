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
  
          } catch (error) {
            console.error('Error assigning center to module:', error);
          }
        }
    
        // Close the modal
        props.onClose();
      };
    
      useEffect(() => {
        if (isSwitchOn) {
            handleAssign()
          console.log('Switch is ON, do something...');
        }
      }, [isSwitchOn]);
  
    return (
      <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} size={'xl'}>
          <ModalOverlay />
          <ModalContent bgColor="#FFFFFF" borderRadius="10px">
            {CentersData?.map((center) => (
              <ModalBody key={center.id}>
                <Flex>
                  <Box w="33%" borderRight="1px solid rgba(0, 0, 0, 0.08)">
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
  
                  <Box w="33%" borderRight="1px solid rgba(0, 0, 0, 0.08)">
                    <Stack direction="row">
                      <Switch
                        colorScheme="teal"
                        size="lg"
                        onChange={() => {
                          setSelectedCenter(center);
                          setIsSwitchOn(!isSwitchOn);
                        }}
                      />
                    </Stack>
                  </Box>
  
                  <Box w="33%">
                    <DatePicker
                      showIcon
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
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
