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
import { useNavigate } from 'react-router-dom';
const CongratulationsReset = (props: any) => {
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
              Your password has been successfully updated
            </Text>
          </ModalBody>
          <ModalFooter display="table-column">
            <Link
              _hover={{
                textDecoration: 'none',
              }}
              onClick={() => navigate('/login')}
            >
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
                Go to login
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CongratulationsReset;
