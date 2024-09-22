import { CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { Link as ReachLink, useNavigate } from 'react-router-dom';

export default function CongratulationsAssignCenter(props: any) {
  console.log(props);
  const navigate = useNavigate();

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent w="645px" h="466px" bgColor="#FFFFFF" borderRadius="10px">
          <Box borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            <ModalHeader
              fontFamily="Graphik LCG"
              fontSize="20px"
              fontWeight="400"
              lineHeight="20px"
              color="#00261C"
              textAlign="center"
            >
              Congratulations
            </ModalHeader>
            <ModalCloseButton marginLeft="100px" />
          </Box>

          <ModalBody>
            <Box
              h="118px"
              w="118px"
              backgroundColor="#3DB39E"
              margin="20px 140px"
              borderRadius="50%"
            >
              <CheckIcon
                color="#F2F1EF"
                h="73.79px"
                w="95.83px"
                margin="20px 18px"
              />
            </Box>

            <Text
              fontFamily="Graphik LCG"
              fontSize="33px"
              fontWeight="600"
              textAlign="center"
              color="#595959"
            >
              Congratulations
            </Text>

            <Text
              fontFamily="Graphik LCG"
              fontSize="20px"
              fontWeight="400"
              textAlign="center"
              color="#A8A8A8"
            >
              You assigned center to module successfully
            </Text>
          </ModalBody>

          <ModalFooter display="flex" justifyContent="center">
            <Button
              h="54px"
              w={{ base: '100%', md: 'auto' }} // Set width to full width on small screens, auto on medium and larger screens
              mr={{ base: 0, md: '16px' }} // Add margin on medium and larger screens
              mb={{ base: '16px', md: 0 }} // Add margin on small screens
              borderRadius="12px"
              bg="#00DEA3"
              color="#FFFFFF"
              fontFamily="Graphik LCG"
              fontWeight="700"
              fontSize="18px"
              lineHeight="21.09px"
              textDecoration="none"
            >
              <Link
                as={ReachLink}
                to={'/Theraputicmodules'}
                _hover={{
                  textDecoration: 'none',
                }}
              >
                Go to Modules
              </Link>
            </Button>
            <Button
              h="54px"
              w={{ base: '100%', md: 'auto' }} // Set width to full width on small screens, auto on medium and larger screens
              mr={{ base: 0, md: '16px' }} // Add margin on medium and larger screens
              mb={{ base: '16px', md: 0 }} // Add margin on small screens
              borderRadius="12px"
              bg="#00DEA3"
              color="#FFFFFF"
              fontFamily="Graphik LCG"
              fontWeight="700"
              fontSize="18px"
              lineHeight="21.09px"
              textDecoration="none"
              onClick={props.onClose}
            >
              Assign another center
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
