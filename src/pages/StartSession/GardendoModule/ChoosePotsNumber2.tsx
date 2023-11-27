import React from 'react'
import {Box, Flex, Image, Link} from '@chakra-ui/react'
import BG from '@renderer/assets/images/Gardendo game/BG.png'
import Group83 from '@renderer/assets/images/Gardendo game/Group83.png'
import GardenDologo2 from '@renderer/assets/images/Gardendo game/GardenDologo2.png'
import Group6 from '@renderer/assets/images/Gardendo game/Group6.png'
import Group7 from '@renderer/assets/images/Gardendo game/Group7.png'
import Group8 from '@renderer/assets/images/Gardendo game/Group8.png'


export default function ChoosePotsNumber2() {
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
                flexDirection="row"
                justifyContent="space-around"
                gap="3"
                w="270px" 
                mt="350px"
              > 
              <Link _hover={{borderBottom: "5px solid rgba(248, 178, 117, 1)", borderRadius: "5px", mt: "-30px"}}><Image src={Group6}/></Link>
              <Link  _hover={{borderBottom: "5px solid rgba(248, 178, 117, 1)", borderRadius: "5px", mt: "-30px"}}><Image src={Group7}/></Link> 
              <Link  _hover={{borderBottom: "5px solid rgba(248, 178, 117, 1)", borderRadius: "5px", mt: "-30px"}}><Image src={Group8}/></Link> 
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

            <Image src={Group83} h="550px" mt="-60px"/>
            <Link
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
