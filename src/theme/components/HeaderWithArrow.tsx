
import React from 'react'
import { ArrowBackIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom';

const HeaderWithArrow = ({ title ,bntTitle}: { title: string, bntTitle:string }) => {
    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1);
    };
  return (
    <>
   <Flex justifyContent={"space-between"} alignItems={"center"} py={23} >
    <HStack spacing={5}>
    <ArrowBackIcon onClick={goBack} />
          <Text fontSize={"29px"} fontFamily={"Graphik LCG"} fontWeight={"400"} color={"#383838"}>{title}</Text>
    </HStack>
    <Button
          w="143px"
          h="40px"
          padding="12px 24px"
          bg="#4AA6CA"
          borderRadius="8px"
          fontSize="14px"
          fontFamily="Roboto"
          onClick={() => console.log("nbhbh")}
          boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
        >
           <EditIcon/> <Text px={3}>
            {bntTitle}
           </Text>
        </Button>
   </Flex>
    </>
  )
}

export default HeaderWithArrow