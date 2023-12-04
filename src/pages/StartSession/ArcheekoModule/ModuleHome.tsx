import React from 'react'
import {Box, Flex, Image, Link} from '@chakra-ui/react'
import Homebg from '@renderer/assets/images/Archeeko Module/Homebg.png'
import MainMenu from '@renderer/assets/images/Archeeko Module/MainMenu.png'
import ExistModel from '@renderer/assets/images/Archeeko Module/ExistModel.png'
import Archeekologo from '@renderer/assets/images/Archeeko Module/Archeekologo.png'
import ArcheekoHome from '@renderer/assets/images/Archeeko Module/ArcheekoHome.png'
import { Link as ReachLink} from 'react-router-dom';

export default function ModuleHome() {
  return (
        <Box 
          bgImage={Homebg}
          position="absolute"
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
            <Image src={Archeekologo} width="600px"/>
            <Image src={ArcheekoHome} position="absolute" width="400px" ml="-52%" mt="190px"/>
            <Flex
                position="relative"
                top="30px"
                flexDirection="column" 
               >
                <Link 
                     as={ReachLink}
                     to="/ChooseLevel"
                    >
                        <Image src={MainMenu} width="370px"/>
                 </Link>
                <Link>
                    <Image src={ExistModel} width="320px" mt="50px" ml="30px"/>
                </Link>
            </Flex>
         </Box>
      

  )
}

