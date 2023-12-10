import { Card, CardBody, Text } from '@chakra-ui/react';
import React,{useContext} from 'react';
import LineChart from './LineChart';
import { dataContext } from '@renderer/shared/Provider';

export default function VRminutesCard(props: any) {
  const selectedCenter = useContext(dataContext);
  return (
    <Card
      position="absolute"
      height="293px"
      width="606px"
      left="279px"
      top="195px"
      backgroundColor="#FFFFFF"
      boxShadow="0px 20px 45px #F0EDF7"
      borderRadius="10px"
    >
      <CardBody>
        
        {props.loading && <LineChart centerId={selectedCenter.id} />}

        {!props.loading && (
          <Text textAlign="center" fontWeight="bold" marginTop="17%">
            Loading....
          </Text>
        )}
        
      </CardBody>
    </Card>
  );
}
