import  { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TabsViewCenter from '../theme/components/Tabs';
import HeaderWithButton from '../theme/components/HeaderWithButton';
import CardWithLogo from '../theme/components/CardWithLogo';
import HeaderWithArrow from '@renderer/theme/components/HeaderWithArrow';
import { Box } from '@chakra-ui/react';
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
      <CardWithLogo centerData={centerData} />
      <TabsViewCenter centerData={centerData} />
    </Box>
  );
};

export default ViewKids;