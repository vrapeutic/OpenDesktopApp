import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Link,
  Spinner,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import VRminutesCard from '../shared/VRminutetsPerMonth/VRminutesCard';
import VRsessionsCard from '../shared/VRsessions/VRsessionsCard';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { config } from '../config';
import StatistcsCards from '../theme/components/StatistcsCards';
import { dataContext } from '@renderer/shared/Provider';
import { Link as ReachLink } from 'react-router-dom';
import { RedArrow } from '@renderer/assets/icons/RedArrow';

export default function Home() {
  const [centers, setCenters] = useState([]);
  const [centerName, setCenterName] = useState("Select Centers")
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  let selectedCenter = useContext(dataContext);
  const [Loading, setLoading] = useState(false);
  const [arrow, setArrow] = useState(false);
  const selectedCenterContext = useContext(dataContext);
  const handleClick = (center: any) => {
    console.log(center?.attributes?.name)
    setCenterName(center?.attributes?.name)
    setIsLoading(true);
    selectedCenter = Object.assign(selectedCenter, center);
    setRefreshKey((oldKey) => oldKey + 1);
    setArrow(false);
   
  };
  const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const token = await (window as any).electronAPI.getPassword('token');
      fetch(`${config.apiURL}/api/v1/doctors/home_centers`, {
        method: 'Get',
        redirect: 'follow',
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((result) => {
          setLoading(false);
          setCenters(result.data);
        })
        .catch((error) => console.log('error', error));
    })();
  }, []);
  console.log(
    'centers length',
    centers.length,
    selectedCenterContext.id,
    centers
  );

  useEffect(() => {
    if (Object.keys(selectedCenterContext).length === 0) {
      onOpen();
      setArrow(true);
    }
  }, []);

  return (
    <>
      {Loading ? (
        <Box textAlign="center" py={10} px={6}>
          <Spinner />
        </Box>
      ) : centers.length == 0 ? (
        <NotFound />
      ) : (
        <>
          {onOpen && (
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent
                w="645px"
           
                bgColor="#FFFFFF"
                borderRadius="10px"
              >
                <ModalBody>
                  <Text
                    fontFamily="Graphik LCG"
                    fontSize="20px"
                    fontWeight="400"
                    textAlign="center"
                    color="red"
                    mt={5}
                  >
                 { centers.length > 0 ?"It seems you haven't joined any center yet. Please create a center first, or ask a center administrator to send you an invitation.":"Before you can proceed, please choose a center from the home page beside the red arrow."}
                  </Text>
                </ModalBody>

                <ModalFooter display="flex" justifyContent={'space-around'}>
                  {centers.length === 0 && (
                    <Button
                      h="50px"
                      w="auto"
                      borderRadius="12px"
                      bg="#00DEA3"
                      color="#FFFFFF"
                      fontFamily="Roboto"
                      fontWeight="700"
                      fontSize="18px"
                      lineHeight="21.09px"
                      textDecoration="none"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                  )}

                  <Button
                    h="50px"
                    w="auto"
                    borderRadius="12px"
                    bg="#00DEA3"
                    color="#FFFFFF"
                    fontFamily="Roboto"
                    fontWeight="700"
                    fontSize="18px"
                    lineHeight="21.09px"
                    textDecoration="none"
                    onClick={onClose}
                  >
                   Let’s go choose a center
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}

          <Flex
            justifyContent={'space-between'}
            py={15}
            px={30}
            alignItems={'center'}
          >
            <Text
              alignItems="center"
              top="129px"
              fontFamily="Graphik LCG"
              fontSize="29px"
              fontWeight="500"
              lineHeight="29px"
              letterSpacing="-0.01em"
            >
              Home
            </Text>
            <Flex alignItems={'center'}>
              {arrow && (
                <Box mx={10}>
                  <RedArrow />
                </Box>
              )}

              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  bgColor="#FFFFFF"
                  border="2px solid #00DEA3"
                  borderRadius="8px"
                  color="#00DEA3"
                >
            {  selectedCenterContext.id ?selectedCenterContext.attributes.name : centerName}
                </MenuButton>
                <MenuList>
                  {centers?.map((center) => (
                    <MenuItem
                      key={center.id}
                      onClick={() => handleClick(center)}
                    >
                      {center.attributes.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Flex>
          </Flex>

          {selectedCenterContext.id && (
            <>
              <Flex
                width="90%"
                justifyContent="space-between"
                padding="20px"
                marginBottom="20px"
                flexWrap="wrap"
              >
                <VRminutesCard loading={isLoading} refreshKey={refreshKey} />
                <VRsessionsCard loading={isLoading} refreshKey={refreshKey} />
              </Flex>

              <StatistcsCards refreshKey={refreshKey} />
            </>
          )}
        </>
      )}
    </>
  );
}

export function NotFound() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading fontSize="2rem" mt={3} mb={2}>
        You don't have center yet
      </Heading>

      <Link as={ReachLink} to={'/Therapycenters'}>
        <Button
          colorScheme="teal"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid"
        >
          Go to Centers
        </Button>
      </Link>
    </Box>
  );
}
