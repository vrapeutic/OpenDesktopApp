
import React from 'react'
import { ArrowBackIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom';

const HeaderWithArrow = ({ title }: { title: string, bntTitle?:string }) => {
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
   
   </Flex>
    </>
  )
}

export default HeaderWithArrow