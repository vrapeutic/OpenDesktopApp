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
import { useAdminContext } from '@renderer/Context/AdminContext';
import axios from 'axios';
import { config } from '@renderer/config';

export default function ModuleModal(props: any) {
  const [startDate, setStartDate] = useState(new Date());
  console.log('selected date', startDate);

  const [CentersData, setCentersData] = useState([]);
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
      console.log('response modules', response);
      setCentersData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent bgColor="#FFFFFF" borderRadius="10px">
          {CentersData?.map((center) => (
            <ModalBody>
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
                    <Switch colorScheme="teal" size="lg" />
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
          <ModalFooter display="table-column" marginTop={10}>
            <Button
              h="54px"
              w="265px"
              top="-50px"
              left="18%"
              borderRadius="12px"
              bg="#00DEA3"
              color="#FFFFFF"
              fontFamily="Roboto"
              fontWeight="700"
              fontSize="18px"
              lineHeight="21.09px"
              textDecoration="none"
              onClick={props.onClose}
            >
              <Link
                as={ReachLink}
                to={'/'}
                _hover={{
                  textDecoration: 'none',
                }}
              >
                Assign
              </Link>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
