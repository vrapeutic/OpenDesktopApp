
import React from 'react'
import { Button, Card, Flex ,Text, CardHeader, Box, FormControl,FormLabel,Switch,Checkbox} from '@chakra-ui/react'
import MMcard from '../theme/components/MMChart.tsx/MMcard'
import SBDcard from '../theme/components/SBDchart.tsx/SBDcard'
import { Subscriptions } from '../assets/icons/Subscriptions'
import { Specialists } from '../assets/icons/Specialists'
import Statiscscard from '../theme/components/Statiscscard'




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
      <FormControl display='flex' alignItems='center' position="absolute" left="400" top="133">
      <FormLabel htmlFor='email-alerts' mb='0'>
           My Centers' View
      </FormLabel>
      <Switch/>
      <FormLabel htmlFor='email-alerts' mb='0'>
           My Networks' View
      </FormLabel>
      <Checkbox defaultChecked>Show My Stats Only</Checkbox>
      </FormControl>

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
       {/* <Button
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
             >exporting CSV</Button> */}
          
      <MMcard />
      <SBDcard />

      <Card
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
             borderRadius="8px"
             boxShadow="0px 4px 16px rgba(128, 234, 255, 0.64)"
             >
            <Box 
                position="absolute"
                width="40px"
                height="40px"
                backgroundColor="#FFFFFF"
                left="16px"
                top="18px"
                borderRadius="8px">
            <Subscriptions 
                         position="absolute"
                         color="#783EFD"
                         backgroundColor="#FFFFFF"
                         left="8px"
                         top="8px"
                        />
          </Box>

            
          <Text
               position="absolute"
               top="18px"
               left="70px"
               color="#FFFFFF"
               fontFamily="Roboto"
               fontStyle="normal"
               lineHeight="16px"
               fontSize="14px"
               fontWeight="700"
               textTransform="capitalize">Subscriptions</Text>
        
        <Text
               position="absolute"
               top="42px"
               left="70px"
               color="#FFFFFF"
               fontFamily="Roboto"
               fontStyle="normal"
               lineHeight="19px"
               fontSize="14px"
               fontWeight="700"
               textTransform="capitalize">6</Text>

        </Card>

        <Card
             direction={{ base: 'column', sm: 'row' }}
             overflow='hidden'
             position="absolute"
             width="205px"
             height="78px"
             left="251px"
             top="76px"
             backgroundColor="#00DEA3"
             borderRadius="8px"
             boxShadow="0px 4px 16px rgba(128, 234, 255, 0.64)"
             >
            <Box 
                position="absolute"
                width="40px"
                height="40px"
                backgroundColor="#FFFFFF"
                left="16px"
                top="18px"
                borderRadius="8px">
            <Specialists 
                         position="absolute"
                         color="#00DEA3"
                         backgroundColor="#FFFFFF"
                         left="8px"
                         top="8px"
                        />
          </Box>

            
          <Text
               position="absolute"
               top="18px"
               left="70px"
               color="#FFFFFF"
               fontFamily="Roboto"
               fontStyle="normal"
               lineHeight="16px"
               fontSize="14px"
               fontWeight="700"
               textTransform="capitalize">Specialists</Text>
        
        <Text
               position="absolute"
               top="42px"
               left="70px"
               color="#FFFFFF"
               fontFamily="Roboto"
               fontStyle="normal"
               lineHeight="19px"
               fontSize="14px"
               fontWeight="700"
               textTransform="capitalize">12</Text>

        </Card>
      </Flex> 
      </Card>
      <Statiscscard />
    </Flex>
  )
}
