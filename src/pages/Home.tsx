import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import VRminutesCard from '../shared/VRminutetsPerMonth/VRminutesCard';
import VRsessionsCard from '../shared/VRsessions/VRsessionsCard';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { config } from '../config';
import StatistcsCards from '../theme/components/StatistcsCards';
import { dataContext } from '@renderer/shared/Provider';

export default function Home() {
  const [centers, setCenters] = useState([]);
  // const [centerId, setCenterId] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  let selectedCenter = useContext(dataContext);

  useEffect(() => {
    (async () => {
      const token = await (window as any).electronAPI.getPassword('token');
      fetch(`${config.apiURL}/api/v1/doctors/home_centers`, {
        method: 'Get',
        redirect: 'follow',
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((result) => {
          setCenters(result.data);
          console.log(result.data);
        })
        .catch((error) => console.log('error', error));
    })();
  }, []);

  const handleClick = (center: object) => {
    setIsLoading(true);
    selectedCenter = Object.assign(selectedCenter, center);
    console.log(center);
    console.log(selectedCenter);
  };

  return (
    <>
      <Text
        position="absolute"
        alignItems="center"
        left="279px"
        top="129px"
        fontFamily="Graphik LCG"
        fontSize="29px"
        fontWeight="500"
        lineHeight="29px"
        letterSpacing="-0.01em"
      >
        Home
      </Text>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          bgColor="#FFFFFF"
          border="2px solid #00DEA3"
          borderRadius="8px"
          color="#00DEA3"
          marginLeft="200px"
          marginTop="45px"
        >
          Centers
        </MenuButton>
        <MenuList>
          {centers?.map((center) => (
            <MenuItem key={center.id} onClick={() => handleClick(center)}>
              {center.attributes.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <VRminutesCard loading={isLoading} />
      <VRsessionsCard loading={isLoading} />

      {isLoading && <StatistcsCards />}
    </>
  );
}
