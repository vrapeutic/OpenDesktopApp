import { Flex, Image, Box, Text, Link, VStack } from '@chakra-ui/react';
import { Link as ReachLink, useLocation } from 'react-router-dom';
import { Fragment } from 'react';
import VRapeutic from '../../assets/images/VRapeutic.png';
import logo1 from '../../assets/images/logo1.png';
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

export default function Sideclose() {
  const location = useLocation();
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

  const sideItems = [
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
            location.pathname === '/Therapycenters' ? '#00DEA3' : '#333333'
          }
        />
      ),
      path: '/Therapycenters',
    },
    {
      link: 'Branches',
      icon: (
        <Branches
          color={location.pathname === '/Branches' ? '#00DEA3' : '#333333'}
        />
      ),
      path: '/Branches',
    },
    {
      link: 'Specialists',
      icon: (
        <Specialists
          color={location.pathname === '/Specialists' ? '#00DEA3' : '#333333'}
        />
      ),
      path: '/Specialists',
    },
    {
      link: 'Assessment tools',
      icon: (
        <Assessmenttools
          color={
            location.pathname === '/Assessmenttools' ? '#00DEA3' : '#333333'
          }
        />
      ),
      path: '/Assessmenttools',
    },
    {
      link: 'Subscriptions',
      icon: (
        <Subscriptions
          color={location.pathname === '/Subscriptions' ? '#00DEA3' : '#333333'}
        />
      ),
      path: '/Subscriptions',
    },
    {
      link: 'General settings',
      icon: (
        <Setting
          color={location.pathname === '/Setting' ? '#00DEA3' : '#333333'}
        />
      ),
      path: '/Setting',
    },
  ];

  return (
    <Flex
      pos="sticky"
      h="781px"
      width="93px"
      background="#FFFFFF"
      boxShadow="0px 3px 8px rgba(0, 0, 0, 0.08)"
      borderRadius="0px 20px 20px 0px;"
      flexDir="column"
      justifyContent="space-between"
    >
      <VStack>
        <Box ml="24px">
          <Flex paddingY="27px">
            <Image src={logo1} />
          </Flex>

          {sideItems.map((item) => (
            <Fragment key={item.path}>
              <Box
                position="absolute"
                style={location.pathname === item.path ? Sidebar : null}
              />
              <Flex
                mb="24px"
                style={location.pathname === item.path ? active : null}
              >
                <Link
                  as={ReachLink}
                  to={item.path}
                  size="18px"
                  ml="14px"
                  _hover={{
                    textDecoration: 'none',
                  }}
                >
                  {item.icon}
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
              w="53px"
              h="53px"
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
          </Flex>

          <Flex
            position="absolute"
            w="40px"
            h="40px"
            top="693px"
            left="27px"
            padding="2px 13px"
            bg="#F5B50E"
            borderRadius="8px"
            fontSize="25px"
            fontWeight="600"
            fontFamily="Roboto"
            boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
          >
            <Link
              color="#FFFFFF"
              textDecoration="none"
              h="16px"
              w="16px"
              _hover={{
                textDecoration: 'none',
              }}
            >
              +
            </Link>
          </Flex>
        </Box>
      </VStack>
    </Flex>
  );
}
