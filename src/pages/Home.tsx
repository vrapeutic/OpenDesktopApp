import React, {useEffect, useState} from 'react'
import { Button, Menu, MenuButton, MenuItem, MenuList, Text} from '@chakra-ui/react'
import VRminutesCard from '../shared/VRminutetsPerMonth/VRminutesCard'
import VRsessionsCard from '../shared/VRsessions/VRsessionsCard'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { config } from '../config';
import StatistcsCards from '../theme/components/StatistcsCards'



export default function Home(props: any) {
  const [centers, setCenters] = useState([]);

  useEffect(()=>{
    (async () => {
      const token = await (window as any).electronAPI.getPassword("token");        
      fetch(`${config.apiURL}/api/v1/doctors/home_centers`,{
        method: 'Get',
        redirect: 'follow',
        headers: {'Authorization': `Bearer ${token}`}
      })
       .then(response => response.json())
       .then(result => {setCenters(result.data)})
       .catch(error => console.log('error', error)); 
  })();
},[]);

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
          >Home</Text>

      <Menu>
        <MenuButton
                as={Button} 
                rightIcon={<ChevronDownIcon />}
                width="250px"
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
          {
            centers.map((center => (
              <MenuItem key={center.id} onClick={() => props.handleClick(center)}>
                {center.attributes.name}
                </MenuItem>
            )))
          }
        </MenuList>
      </Menu>

      <VRminutesCard centerId={props.centerId.id} loading={props.isLoading}/>
      <VRsessionsCard centerId={props.centerId.id} loading={props.isLoading}/>
       
      {props.isLoading && (

         <StatistcsCards centerId={props.centerId.id} loading={props.isLoading}/>
      
      )}
    </>
  )
}


