import { Card, CardBody, Text } from '@chakra-ui/react';
import React from 'react';
import RadialChart from './RadialChart';

export default function VRsessionsCard(props: any) {
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
        {props.loading && <RadialChart />}
        {!props.loading && (
          <>
            <Text
              textAlign="left"
              fontSize="20px"
              fontWeight="500"
              fontFamily="Graphik LCG"
              color="#00261C"
              lineHeight="20px"
              left="24px"
              top="24px"
            >
              VR Sessions Monthly Metrics
            </Text>
            <Text textAlign="center" marginTop="25%">
              Select center to show chart...
            </Text>
          </>
        )}
      </CardBody>
    </Card>
  );
}
