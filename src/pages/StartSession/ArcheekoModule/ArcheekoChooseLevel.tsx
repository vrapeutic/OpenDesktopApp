import React from 'react'
import {Box, Flex, Image, Link} from '@chakra-ui/react'
import bg from '@renderer/assets/images/Archeeko Module/bg.png'
import MainMenu from '@renderer/assets/images/Archeeko Module/MainMenu.png'
import ExistModel from '@renderer/assets/images/Archeeko Module/ExistModel.png'
import back from '@renderer/assets/images/Archeeko Module/back.png'
import next from '@renderer/assets/images/Archeeko Module/next.png'
import chooseLevel from'@renderer/assets/images/Archeeko Module/chooseLevel.png'
import play from'@renderer/assets/images/Archeeko Module/play.png'
import { Link as ReachLink} from 'react-router-dom';

export default function ArcheekoChooseLevel() {
  return (
    <>
      <Box 
          bgImage={bg}
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
            <Link 
                as={ReachLink}
                to="/ChooseLevel"
            >
                <Image src={back} position="absolute" width="100px" ml="-45%" mt="80px"/>
            </Link>
            <Link 
                as={ReachLink}
                to="/ChooseLevel"
            >
                <Image src={next} position="absolute" width="90px" ml="38%" mt="75px"/>
            </Link>
            <Image src={chooseLevel} h="500px" mt="190px"/>
            <Link
                as={ReachLink}
                to="/ChooseLevel"
            >
                <Image src={play} width="200px" mt="-50px"/>
            </Link>
            <Flex
                position="absolute"
                top="400px"
                flexDirection="column" 
               >
                <Link 
                     as={ReachLink}
                     to="/ChooseLevel"
                     h="60px"
                     w="270px"
                    >
                        
                </Link>

                <Link 
                    as={ReachLink}
                    to="/ChooseLevel"
                    h="60px"
                    w="270px"
                    mt="30px"
                    >
                        
                </Link>

                <Link 
                    as={ReachLink}
                    to="/ChooseLevel"
                    h="60px"
                    w="270px"
                    mt="30px"
                    >
                        
                </Link>
                
            </Flex>
         </Box>
      
    </>
  )
}
