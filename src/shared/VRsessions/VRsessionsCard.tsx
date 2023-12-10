import { Card, CardBody, Text } from '@chakra-ui/react';
import React, {useContext} from 'react';
import RadialChart from './RadialChart';
import { dataContext } from '@renderer/shared/Provider';

export default function VRsessionsCard(props: any) {
  const selectedCenter = useContext(dataContext);
  return (
    
    <Card
      position="absolute"
      height="293px"
      width="480px"
      left="918px"
      top="195px"
      backgroundColor="#FFFFFF"
      boxShadow="0px 20px 45px #F0EDF7"
      borderRadius="10px"
    >
      <CardBody>
        
        {props.loading && <RadialChart centerId={selectedCenter.id} />}

        {!props.loading && (
          <Text textAlign="center" fontWeight="bold" marginTop="17%">
            Loading....
          </Text>
        )}
        
      </CardBody>
    </Card>
  );
}
