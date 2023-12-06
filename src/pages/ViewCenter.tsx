import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TabsViewCenter from '../theme/components/Tabs';
import HeaderWithButton from '../theme/components/HeaderWithButton';
import CardWithLogo from '../theme/components/CardWithLogo';
const ViewCenter = () => {
  const location = useLocation();
  const centerData = location.state;

  useEffect(() => {
    if (centerData) {
      console.log('Clicked Center Data from view center:', centerData);
    }
  }, [centerData]);

  return (
    <>
      <HeaderWithButton  centerData={centerData} />
      <CardWithLogo centerData={centerData} />
      <TabsViewCenter  centerData={centerData}/>
    </>
  );
};

export default ViewCenter;
