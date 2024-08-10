import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TabsViewCenter from '../theme/components/Tabs';
import HeaderWithButton from '../theme/components/HeaderWithButton';
import CardWithLogo from '../theme/components/CardWithLogo';
const ViewCenter = () => {
  const location = useLocation();
  const { center, includes } = location.state;
  console.log('centerData', center);
  const navigate = useNavigate();

  useEffect(() => {
    if (center) {
      console.log('Clicked Center Data from view center:', center);
    }
  }, [center]);

  return (
    <>
      <HeaderWithButton
        leftText="Therapy Center"
        rightText="Edit Center"
        onButtonClick={() =>
          navigate('/editcenter', {
            state: { centerData: center, includes: includes },
          })
        }
      />
      <CardWithLogo centerData={center} />
      <TabsViewCenter centerData={center} />
    </>
  );
};

export default ViewCenter;
