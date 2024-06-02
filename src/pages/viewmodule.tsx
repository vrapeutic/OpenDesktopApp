import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TabsViewCenter from '../theme/components/Tabs';
import HeaderWithButton from '../theme/components/HeaderWithButton';
import CardWithLogo from '../theme/components/CardWithLogo';
const ViewModule = () => {
  const location = useLocation();
  const Module = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    if (Module) {
      console.log('Clicked module Data from module:', Module);
    }
  }, [Module]);

  return (
    <>
      <HeaderWithButton
        leftText="therapeutic module"
        rightText="Edit Module"
        onButtonClick={() => navigate('/Editmodule', { state: Module })}
      />{' '}
      {/* <CardWithLogo centerData={centerData} />
      <TabsViewCenter centerData={centerData} /> */}
    </>
  );
};

export default ViewModule;
