import { Box, Card, CardBody, Flex, Text } from '@chakra-ui/react';

import LineChartLineChart from './LineChart';

export default function VRminutesCard(props: any) {
  return (
    <>
     
      <Flex
        width={{ base: '100%', md: '50%', lg: '50.33%' }}
        padding="20px"
        marginBottom="20px"
      >
        <Card
          backgroundColor="#FFFFFF"
          boxShadow="0px 20px 45px #F0EDF7"
          borderRadius="10px"
          width="100%"
          maxWidth="606px"
        >
          <CardBody>
            {props.loading && <LineChartLineChart refreshKey={props.refreshKey} />}
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
    </>
  );
}


 {/* <Card
        backgroundColor="#FFFFFF"
        boxShadow="0px 20px 45px #F0EDF7"
        borderRadius="10px"
        width="100%" // Make the card take up the full width of its container
        maxWidth="606px" // Limit the maximum width of the card
      >
        <CardBody>
        {props.loading && <LineChartLineChart  />}
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
      </Card> */}