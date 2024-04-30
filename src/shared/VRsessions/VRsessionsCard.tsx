// import { Box, Card, CardBody, Flex, Text } from '@chakra-ui/react';
// import React from 'react';
// import RadialChart from './RadialChart';

// export default function VRsessionsCard(props: any) {
//   return (
//     <Flex
//       width={{ base: '100%', md: '50%', lg: '35.33%' }}
//       padding="20px"
//       marginBottom="20px"
//     >
//       <Card
//         backgroundColor="#FFFFFF"
//         boxShadow="0px 20px 45px #F0EDF7"
//         borderRadius="10px"
//         width="100%" // Make the card take up the full width of its container
//         maxWidth="606px" // Limit the maximum width of the card
//       >
//         <CardBody>
//           {props.loading && <RadialChart refreshKey={props.refreshKey} />}
//           {!props.loading && (
//             <>
//               <Text
//                 textAlign="left"
//                 fontSize="20px"
//                 fontWeight="500"
//                 fontFamily="Graphik LCG"
//                 color="#00261C"
//                 lineHeight="20px"
//                 left="24px"
//                 top="24px"
//               >
//                 VR Sessions Monthly Metrics
//               </Text>
//               <Text textAlign="center" marginTop="25%">
//                 Select center to show chart...
//               </Text>
//             </>
//           )}
//         </CardBody>
//       </Card>
//     </Flex>
//   );
// }


import { Box, Card, CardBody, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import RadialChart from './RadialChart';

export default function VRsessionsCard(props: any) {
  const [cardHeight, setCardHeight] = React.useState<string>('auto');

  React.useEffect(() => {
    const calculateCardHeight = () => {
      const contentHeight = props.loading ? 'auto' : 'auto'; // Adjust as needed
      setCardHeight(contentHeight);
    };

    calculateCardHeight();
  }, [props.loading]);

  return (
    <Flex
      width={{ base: '100%', md: '48%', lg: '44%' }}
    >
      {/* <Card
        backgroundColor="#FFFFFF"
        boxShadow="0px 20px 45px #F0EDF7"
        borderRadius="10px"
        width="100%" 
        height={cardHeight} 
      > */}

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

