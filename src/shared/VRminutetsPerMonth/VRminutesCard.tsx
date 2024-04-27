import { Box, Card, CardBody, Flex } from '@chakra-ui/react';
import React from 'react';
import LineChart from './LineChart';

export default function VRminutesCard(props: any) {
  return (
    <Flex
      width={{ base: '100%', md: '50%', lg: '50.33%' }}
      padding="20px"
      marginBottom="20px"
    >
      <Card
        backgroundColor="#FFFFFF"
        boxShadow="0px 20px 45px #F0EDF7"
        borderRadius="10px"
        width="100%" // Make the card take up the full width of its container
        maxWidth="606px" // Limit the maximum width of the card
      >
        <CardBody>
          <LineChart refreshKey={props.refreshKey} />
        </CardBody>
      </Card>
    </Flex>
  );
}
