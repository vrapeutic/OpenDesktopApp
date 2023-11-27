import React from 'react'
import {Box, Flex, Image, Link} from '@chakra-ui/react'
import BG from '@renderer/assets/images/Gardendo game/BG.png'
import Group1 from '@renderer/assets/images/Gardendo game/Group1.png'
import GardenDologo2 from '@renderer/assets/images/Gardendo game/GardenDologo2.png'
import AdaptiveAttention from '@renderer/assets/images/Gardendo game/AdaptiveAttention.png'
import SelectiveAttention from '@renderer/assets/images/Gardendo game/SelectiveAttention.png'
import SustainedAttention from '@renderer/assets/images/Gardendo game/SustainedAttention.png'
import { Link as ReachLink} from 'react-router-dom';


export default function ChooseCourse() {
  return (
    <>
      <Box
          position="absolute" 
          bgImage={BG}
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          w="1519px"
          h="780px"
          display='flex'
          flexDir='column'
          alignItems='center'
          gap='12.28px'
  
      >     
            <Flex
                position="absolute"
                flexDirection="column"
                gap="3"
                w="250px" 
                mt="280px"
              > 

              <Link><Image src={SustainedAttention}/></Link>
              <Link><Image src={SelectiveAttention}/></Link>
              <Link><Image src={AdaptiveAttention}/></Link>

            </Flex>
            
          
            <Image src={GardenDologo2} h="50px" position="relative" top="80px"/>
            <Link
                 position="absolute"
                 width="40px"
                 p="5px"
                 textAlign="center"
                 textColor="transparent"
                 mt="160px"
                 ml="350px"
                 _hover={{textDecoration: 'none'}} 
                 >
                     x</Link>

            <Image src={Group1} h="600px" mt="-60px"/>
            <Link
                 as={ReachLink}
                 to="/ChooseCourse2"
                 width="170px"
                 p="15px"
                 textAlign="center"
                 textColor="transparent"
                 mt="-80px"
                 _hover={{textDecoration: 'none'}} 
                 >
                     play</Link>
          



       
          
      </Box>
      
    </>
  )
}
