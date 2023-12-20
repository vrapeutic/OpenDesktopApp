import { Card, CardBody} from '@chakra-ui/react';
import React from 'react';
import LineChart from './LineChart';

export default function VRminutesCard(props: any) {
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
        <LineChart refreshKey={props.refreshKey}/>
      </CardBody>
    </Card>
  );
}
