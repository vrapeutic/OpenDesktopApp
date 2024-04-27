import  { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderWithArrow from '@renderer/theme/components/HeaderWithArrow';
import { Box } from '@chakra-ui/react';
import ProfileKid from '@renderer/theme/components/ProfileKid';
import TabsKids from '@renderer/theme/components/TabsKids';
const ViewKids= () => {
  const location = useLocation();
  const centerData = location.state;

  useEffect(() => {
    if (centerData) {
      console.log('Clicked Center Data from view center:', centerData);
    }
  }, [centerData]);

  return (
    <Box px={31}>
      <HeaderWithArrow title={"Kid Profile"} bntTitle={"Edit Profile"} />
      <ProfileKid />
      <TabsKids />
    </Box>
  );
};

export default ViewKids;