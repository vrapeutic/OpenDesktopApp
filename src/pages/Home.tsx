
import React from 'react'
import { Button, Card, Flex ,Text, CardHeader} from '@chakra-ui/react'
import MMcard from '../theme/components/MMChart.tsx/MMcard'
import SBDcard from '../theme/components/SBDchart.tsx/SBDcard'
import { Subscriptions } from '../assets/icons/Subscriptions'




export default function Home() {
  return (
    <Flex>
      <Text
          position="absolute"
          display="flex"
          alignItems="center"
          left="279px"
          top="129px"
          fontFamily="Graphik LCG"
          fontSize="29px"
          fontWeight="500"
          lineHeight="29px"
          letterSpacing="-0.01em"
          >Home</Text>
      <Button
            position="absolute"
            left="1087px"
            top="123px"
            height="40px"
            width="151px"
            borderRadius="8px"
            backgroundColor="#F5B50E"
            boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
            fontFamily="Roboto"
            fontSize="14px"
            fontWeight="700"
            color="#FFFFFF"
            lineHeight="16px"
            fontStyle="normal"
             >Create New widget</Button>
       <Button
            position="absolute"
            variant="outline"
            left="1262px"
            top="123px"
            height="40px"
            width="138px"
            border="2px solid #4AA6CA"
            borderRadius="8px"
            fontFamily="Roboto"
            fontSize="14px"
            fontWeight="500"
            color="#4AA6CA"
            lineHeight="16px"
            fontStyle="normal"
            textTransform="capitalize"
            _hover={{
              background:"#FFFFFF",
            }}
             >exporting CSV</Button>
          
      <MMcard />
      <SBDcard />

      {/* <Card
          position="absolute"
          width="480px"
          height="186px"
          top="520px"
          left="918px"
          backgroundColor="#FFFFFF"
          borderRadius="10px">
      
      <CardHeader
                fontFamily="Graphik LCG"
                fontWeight="500"
                fontSize="20px"
                lineHeight="20px"
                letterSpacing="0.016em"
                color="#00261C"
                >Therapy Centers</CardHeader>
      <Flex>
        <Card
             direction={{ base: 'column', sm: 'row' }}
             overflow='hidden'
             position="absolute"
             width="205px"
             height="78px"
             left="24px"
             top="76px"
             backgroundColor="#783EFD"
             boxShadow="0px 4px 16px rgba(128, 234, 255, 0.64)"
             borderRaduis="8px">

            <Subscriptions 
                         color="#783EFD"
                         backgroundColor="#FFFFFF"/>

        </Card>
      </Flex>
      
          
      </Card> */}
    </Flex>
  )
}
