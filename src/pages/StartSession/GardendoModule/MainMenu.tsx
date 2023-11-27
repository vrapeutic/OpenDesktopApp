import React from 'react'
import {Box, Flex, Image, Link} from '@chakra-ui/react'
import BG from '@renderer/assets/images/Gardendo game/BG.png'
import gardendologo from '@renderer/assets/images/Gardendo game/gardendologo.png'
import BgMainmenu from '@renderer/assets/images/Gardendo game/BgMainmenu.png'
import { Link as ReachLink} from 'react-router-dom';
import { LinearGradient } from 'react-text-gradients'

export default function MainMenu() {
  return (
    <>
        <Box 
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
                position="relative"
                top="290px"
                flexDirection="column"
                fontFamily="Seymour One"
                fontWeight="400"  
               >
                <Link 
                     as={ReachLink}
                     to="/ChooseCourse"
                     fontSize="25px"
                     ml="10px"
                    _hover={{textDecoration: 'none'}}
                    >
                        <LinearGradient gradient={['to top', '#CB8F4A, #FCF1B1']}>Main Menu</LinearGradient>
                        </Link>
                <Link
                     color="rgba(252, 241, 177, 0.55)"
                     textShadow="-1px 1px 3px rgba(113, 52, 9, 1), 
                                1px 1px 3px rgba(113, 52, 9, 1), 
                                1px -1px 3px rgba(113, 52, 9, 1), 
                                -1px -1px 3px rgba(113, 52, 9, 1)"
                
                     fontSize="15px" 
                     mt="70px"
                     ml="41px"
                    _hover={{textDecoration: 'none'}}
                    >
                        Exit Module</Link>
            </Flex>
          
            <Image src={gardendologo} h="200px" mt="-80px"/>
            <Image src={BgMainmenu} h="210px" mt="-43px"/>
         



       
          
      </Box>
      
    </>
  )
}
