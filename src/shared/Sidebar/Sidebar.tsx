import {
  Flex,
  Image,
  Box,
  Text,
  Link,
  VStack,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { Link as ReachLink, useLocation } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import VRapeutic from '../../assets/images/VRapeutic.png';
import { Dashboard } from '../../assets/icons/Dashboard';
import { Assessmenttools } from '../../assets/icons/Assessmenttools';
import { Branches } from '../../assets/icons/Branches';
import { Kids } from '../../assets/icons/Kids';
import { Setting } from '../../assets/icons/Setting';
import { Specialists } from '../../assets/icons/Specialists';
import { Therapycenters } from '../../assets/icons/Therapycenters';
import { Theraputicmodules } from '../../assets/icons/Theraputicmodules';
import { Lamp } from '../../assets/icons/Lamp';
import { Subscriptions } from '../../assets/icons/Subscriptions';
import SelectingCenter from '../../pages/StartSession/SelectingCenter';
import { useAdminContext } from '../../Context/AdminContext';
import SelectingModule from '@renderer/pages/StartSession/SelectingModule';
import ConnectedVR from '@renderer/pages/StartSession/ConnectedVR';

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const { adminBoolean } = useAdminContext();
  useEffect(() => {
    // Log the value of adminBoolean when the component mounts or when it changes
    console.log('Admin Context Value:', adminBoolean);
  }, [adminBoolean]);

  const active = {
    color: '#00DEA3',
    fontWeight: '600',
  };
  const Sidebar = {
    background: '#00DEA3',
    width: '5px',
    height: '33px',
    left: 0,
    marginTop: '-7px',
  };
  console.log(location.pathname);

  const sideItemsDoctor = [
    {
      link: 'Dashboard',
      icon: (
        <Dashboard
          color={location.pathname === '/home' ? '#00DEA3' : '#333333'}
        />
      ),
      path: '/home',
    },
    {
      link: 'Kids',
      icon: (
        <Kids color={location.pathname === '/Kids' ? '#00DEA3' : '#333333'} />
      ),
      path: '/Kids',
    },
  
    {
      link: 'Therapy Centers',
      icon: (
        <Therapycenters
          color={
            location.pathname === '/Therapycenters' ? '#00DEA3' : '#333333'
          }
        />
      ),
      path: '/Therapycenters',
    },
    // {
    //   link: 'Branches',
    //   icon: (
    //     <Branches
    //       color={location.pathname === '/Branches' ? '#00DEA3' : '#333333'}
    //     />
    //   ),
    //   path: '/Branches',
    // },
    {
      link: 'Specialists',
      icon: (
        <Specialists
          color={location.pathname === '/Specialists' ? '#00DEA3' : '#333333'}
        />
      ),
      path: '/Specialists',
    },
    // {
    //   link: 'Assessment tools',
    //   icon: (
    //     <Assessmenttools
    //       color={
    //         location.pathname === '/Assessmenttools' ? '#00DEA3' : '#333333'
    //       }
    //     />
    //   ),
    //   path: '/Assessmenttools',
    // },
    {
      link: 'Subscriptions',
      icon: (
        <Subscriptions
          color={location.pathname === '/Subscriptions' ? '#00DEA3' : '#333333'}
        />
      ),
      path: '/Subscriptions',
    },
    // {
    //   link: 'General settings',
    //   icon: (
    //     <Setting
    //       color={location.pathname === '/Setting' ? '#00DEA3' : '#333333'}
    //     />
    //   ),
    //   path: '/Setting',
    // },
  ];

  const sideItemsAdmin = [
    
    {
      link: 'Theraputic Modules',
      icon: (
        <Theraputicmodules
          color={
            location.pathname === '/Theraputicmodules' ? '#00DEA3' : '#333333'
          }
        />
      ),
      path: '/Theraputicmodules',
    },
    {
      link: 'Therapy Centers',
      icon: (
        <Therapycenters
          color={
            location.pathname === '/Therapycentersadmin' ? '#00DEA3' : '#333333'
          }
        />
      ),
      path: '/Therapycentersadmin',
    },
  ];

  return (
    <Flex
      pos="sticky"
      h="inherit"
      background="#FFFFFF"
      boxShadow="0px 3px 8px rgba(0, 0, 0, 0.08)"
      borderRadius="0px 20px 20px 0px;"
      flexDir="column"
      justifyContent="space-between"
    >
      <VStack>
        <Box ml="24px">
          <Flex paddingY="27px">
            <Image src={VRapeutic} />
          </Flex>
          {adminBoolean
            ? sideItemsAdmin.map((item) => (
                <Fragment key={item.path}>
                  <Box
                    position="absolute"
                    style={location.pathname === item.path ? Sidebar : null}
                  />
                  <Flex
                    mb="24px"
                    style={location.pathname === item.path ? active : null}
                  >
                    {item.icon}
                    <Link
                      as={ReachLink}
                      to={item.path}
                      size="18px"
                      ml="14px"
                      _hover={{
                        textDecoration: 'none',
                      }}
                    >
                      {item.link}
                    </Link>
                  </Flex>
                </Fragment>
              ))
            : sideItemsDoctor.map((item) => (
                <Fragment key={item.path}>
                  <Box
                    position="absolute"
                    style={location.pathname === item.path ? Sidebar : null}
                  />
                  <Flex
                    mb="24px"
                    style={location.pathname === item.path ? active : null}
                  >
                    {item.icon}
                    <Link
                      as={ReachLink}
                      to={item.path}
                      size="18px"
                      ml="14px"
                      _hover={{
                        textDecoration: 'none',
                      }}
                    >
                      {item.link}
                    </Link>
                  </Flex>
                </Fragment>
              ))}

          <Flex
            justify="center"
            direction="column"
            align="center"
            borderRadius="30px"
            me={{ base: '20px' }}
            position="relative"
          >
            <Flex
              border="5px solid #F5F5F5"
              bg="#F5F5F5"
              borderRadius="50%"
              w="66px"
              h="66px"
              align="center"
              justify="center"
              mx="auto"
              position="absolute"
              left="50%"
              top="39px"
              mb="4px"
              transform="translate(-50%, 0%)"
            >
              <Lamp />
            </Flex>
            <Flex
              direction="column"
              mb="12px"
              align="center"
              justify="center"
              px="15px"
              pt="55px"
              bg="#F5F5F5"
              mt="72px"
              w="191px"
              h="148px"
              borderRadius="16px"
            >
              <Text
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="500"
                fontSize="14px"
                lineHeight=" 17px"
                mb="12px"
              >
                Thoughts Time
              </Text>
              <Text
                fontSize="12px"
                mb="50px"
                width="166px"
                height="60px"
                color="#787486"
                textAlign="center"
                fontWeight="400"
                fontFamily="Inter"
              >
                We don’t have any notice for you, till then you can share your
                thoughts with your peers.
              </Text>
            </Flex>
          </Flex>

          <Flex
            w="143px"
            h="40px"
            ml="24px"
            mt="55px"
            padding="12px 24px"
            bg="#F5B50E"
            borderRadius="8px"
            fontSize="14px"
            fontFamily="Roboto"
            boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
          >
            <Text color="#FFFFFF" fontWeight="400">
              Create
            </Text>
            <Link color="#007C5B" fontWeight="700" textDecoration="underline">
              New kid
            </Link>
          </Flex>
          <Button
            w="143px"
            h="40px"
            ml="24px"
            mt="55px"
            padding="12px 24px"
            bg="#F5B50E"
            color="#FFFFFF"
            fontWeight="500"
            onClick={onOpen}
          >
            Start a Session
          </Button>
        </Box>
      </VStack>
      {/* {onOpen && <SelectingCenter isOpen={isOpen} onClose={onClose} />} */}
      {onOpen && <SelectingModule isOpen={isOpen} onClose={onClose} />}

    </Flex>
  );
}
