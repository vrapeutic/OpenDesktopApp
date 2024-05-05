import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderWithArrow from '@renderer/theme/components/HeaderWithArrow';
import { Box } from '@chakra-ui/react';
import ProfileKid from '@renderer/features/AddKids/ProfileKid';
import TabsKids from '@renderer/theme/components/TabsKids';
import { config } from '../../config';
import { dataContext } from '@renderer/shared/Provider';

const ViewKids = () => {
  const location = useLocation();
  const kidsData = location.state;
  const selectedCenter = useContext(dataContext);
  const [data,setDate]=useState([])
  useEffect(() => {
    if (kidsData) {
      console.log('Clicked Center Data from view center:', kidsData);
    }
    (async () => {
      const token = await (window as any).electronAPI.getPassword('token');

      fetch(
        `${config.apiURL}/api/v1/centers/${selectedCenter.id}/kids/${kidsData.id}?include=diagnoses`,
        {
          method: 'Get',
          redirect: 'follow',
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.data) {
            
            setDate(result.included)
            console.log("test",result.included);
          }
        })
        .catch((error) => console.log('error', error));
    })();
  }, [kidsData]);
 
  return (
    <Box px={31}>
      <HeaderWithArrow title={'Kid Profile'} bntTitle={'Edit Profile'} />
      <ProfileKid
        img={kidsData.attributes.photo_url}
        name={kidsData.attributes.name}
        age={kidsData.attributes.age}
        email={kidsData.attributes.email}
        diagnosis={data}
      />
      <TabsKids />
    </Box>
  );
};

export default ViewKids;
