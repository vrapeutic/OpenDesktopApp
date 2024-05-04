
import {  Card, CardBody, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import RadialChart from './RadialChart';

export default function VRsessionsCard(props: any) {


  return (
    <Flex width={{ base: '100%', md: '48%', lg: '44%' }}>


      <Card
        backgroundColor="#FFFFFF"
        boxShadow="0px 20px 45px #F0EDF7"
        borderRadius="10px"
        width="100%"
      >
        <CardBody>
          {props.loading && <RadialChart refreshKey={props.refreshKey} />}
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
    </Flex>
  );
}
