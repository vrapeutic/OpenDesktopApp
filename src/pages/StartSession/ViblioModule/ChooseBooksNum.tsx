import React from 'react'
import { Box, Button, Image, Menu, MenuButton, MenuItem, MenuList,Text,Link, Flex } from '@chakra-ui/react'
import viblioBG from '@renderer/assets/images/viblioBG.png'
import VIBLIO2 from '@renderer/assets/images/VIBLIO2.png'
import BGMENU from '@renderer/assets/images/BGMENU.png'
import BOOKNUMBER from '@renderer/assets/images/BOOKNUMBER.png'
import { Link as ReachLink} from 'react-router-dom';
import { MainmenuBtn } from '@renderer/assets/icons/MainmenuBtn'
import { BackBtn } from '@renderer/assets/icons/BackBtn'

export default function ChooseBooksNum() {
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
              to="/ChooseLevel"
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
                fontSize="37px"
                color="#FFD9A1"
                fontWeight="400"
                lineHeight="68.95px"
                >
                    Sustained Attention</Text>
           <Link
               position="absolute"
               mt="420px"
               ml="280px"
               fontFamily="Lalezar"
               fontSize="44px"
               color="#FFD9A1"
               fontWeight="400"
               lineHeight="68.95px"
               _hover={{
                textDecoration: 'none',
              }}
                >
                   START
           </Link>
           <Text
               position="absolute"
               mt="90px"
               ml="120px"
               fontFamily="Lalezar"
               fontSize="44px"
               fontWeight="700"
               lineHeight="86.19px"
               color="#1D180E"   
               >
                   Choose number of Book</Text>
           <Flex
               position="absolute"
               flexDirection="row"
               w="600px"
               justifyContent="space-around"
               mt="230px"
               ml="38px"
               fontFamily="Lalezar"
               fontWeight="400"
               fontSize="26px"
               lineHeight="30.28px"
               >
                   <Link _hover={{borderBottom: "5px solid rgba(248, 178, 117, 1)",borderRadius: "5px", color: "white", mt: "-30px"}}>
                    <Image src={BOOKNUMBER} h="120px" />
                    <Text
                         position="absolute"
                         mt="-90px"
                         ml="120px"
                        _hover={{textDecoration: 'none'}}
                        >
                            5</Text>
                   </Link>

                   <Link _hover={{borderBottom: "5px solid rgba(248, 178, 117, 1)",borderRadius: "5px", color: "white", mt: "-30px"}}>
                    <Image src={BOOKNUMBER} h="120px" />
                    <Text
                         position="absolute"
                         mt="-90px"
                         ml="120px"
                         _hover={{textDecoration: 'none'}}
                         >
                             10</Text>
                   </Link>

                   <Link _hover={{borderBottom: "5px solid rgba(248, 178, 117, 1)",borderRadius: "5px", color: "white", mt: "-30px"}}>
                    <Image src={BOOKNUMBER} h="120px" />
                    <Text
                         position="absolute"
                         mt="-90px"
                         ml="120px" 
                        _hover={{textDecoration: 'none'}}
                        >
                            15</Text>
                 </Link>
           </Flex>

            <Image src={BGMENU} h="500px"  />
            
              
        </Box>
        
          
         
      </Box>
      
      
    </>
  )
}
