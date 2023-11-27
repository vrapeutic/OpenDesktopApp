import React from 'react'
import { Box, Button, Image, Menu, MenuButton, MenuItem, MenuList,Text,Link, Flex } from '@chakra-ui/react'
import viblioBG from '@renderer/assets/images/viblioBG.png'
import VIBLIO2 from '@renderer/assets/images/VIBLIO2.png'
import BGMENU from '@renderer/assets/images/BGMENU.png'
import Levels from '@renderer/assets/images/Levels.png'
import { Link as ReachLink} from 'react-router-dom';
import { MainmenuBtn } from '@renderer/assets/icons/MainmenuBtn'
import { BackBtn } from '@renderer/assets/icons/BackBtn'



export default function ChooseLevel() {
  return (
    <>
       <Menu>
            <MenuButton 
                  as={Button} 
                  bgColor="rgba(0,0,0,0)"
                  top="130px"
                  left="1300px"
                  >
              <MainmenuBtn />
            </MenuButton>
            <MenuList bgColor="beige" marginRight="110px" marginTop="10px">
              <MenuItem bgColor="beige">Main Menu</MenuItem>
              <MenuItem bgColor="beige">Exit Session</MenuItem>
              <MenuItem bgColor="beige">Exit Module</MenuItem>
            </MenuList>
        </Menu>
        <Link
              as={ReachLink}
              to="/PlayViblio"
              position="relative"
              bgColor="rgba(0,0,0,0)"
              top="130px"
              left="-100px"
              >
            <BackBtn />
        </Link>
      <Box 
          bgImage={viblioBG}
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          w="1519px"
          h="780px"
          display='flex'
          flexDir='column'
          justifyContent='center'
          alignItems='center'
          gap='12.28px'
  
      >
          <Image src={VIBLIO2}/>
          <Box>
          <Text
                position="relative"
                top="70px"
                textAlign="center"
                fontFamily="Lalezar"
                fontSize="44px"
                color="#FFD9A1"
                fontWeight="400"
                lineHeight="68.95px"
                >
                    MAIN MENU</Text>
           <Link
               as={ReachLink}
               to="/ChooseBooksNum"
               position="absolute"
               mt="420px"
               ml="295px"
               fontFamily="Lalezar"
               fontSize="44px"
               color="#FFD9A1"
               fontWeight="400"
               lineHeight="68.95px"
               _hover={{
                textDecoration: 'none',
              }}
                >
                   PLAY
           </Link>
           <Text
               position="absolute"
               mt="90px"
               ml="190px"
               fontFamily="Lalezar"
               fontSize="55px"
               fontWeight="700"
               lineHeight="86.19px"
               color="#1D180E"   
               >
                   Choose Level</Text>
           <Flex
               position="absolute"
               flexDirection="row"
               w="600px"
               justifyContent="space-around"
               mt="190px"
               ml="38px"
               >
              <Image src={Levels} h="150px" />
              <Image src={Levels} h="150px" />
              <Image src={Levels} h="150px" />
           </Flex>

           <Flex
               position="absolute"
               flexDirection="row"
               w="600px"
               justifyContent="space-around"
               mt="280px"
               ml="87px"
               fontFamily="Lalezar"
               fontWeight="400"
               fontSize="26px"
               lineHeight="30.28px"
               >
              <Link  _hover={{textDecoration: 'none', color: "white"}}>Adaptive Attention</Link>
              <Link _hover={{textDecoration: 'none', color: "white"}}>Selective Attention</Link>
              <Link _hover={{textDecoration: 'none', color: "white"}}>Sustained Attention</Link>
           </Flex>
            <Image src={BGMENU} h="500px"  />
            
              
        </Box>
        
          
         
      </Box>
      
    </>
  )
}
