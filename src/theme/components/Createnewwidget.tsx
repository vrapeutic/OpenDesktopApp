import { Card, CardBody, CardHeader, FormControl, FormLabel,HStack,Box,CheckboxGroup,Checkbox, Button, Image, Flex, Text} from '@chakra-ui/react'
import React from 'react'
import BEARD16 from '../../assets/images/BEARD16.png'
import BEARD07 from '../../assets/images/BEARD07.png'
import BEARD14 from '../../assets/images/BEARD14.png'
import BEARD18 from '../../assets/images/BEARD18.png'
import BEARD21 from '../../assets/images/BEARD21.png'
import BEARD22 from '../../assets/images/BEARD22.png'

export default function Createnewwidget( {close}: any) {
  const smoothClasses = {
    p: "19px 6px 17px 12px",
    bg: '#FAFAFA',
    borderRadius: "8px",
    transition: "all 150ms",
    color:'#939393',
    _checked: {
      bg:'#FAFAFA',
      color:'#00DEA3',
    },
    "span[class*='checkbox__control']:not([data-disabled])": {
      borderColor: ' #D5D5D5',
      bg: '#D5D5D5',
      borderRadius: "9px",
      width: '26px',
      height: '26px',
      _checked: {
        bg: '#00DEA3',
        borderColor: '#00DEA3',
      },
    },
    
    _hover: {
      transition: "all 350ms",
      bg: '#FAFAFA',
      _checked: {
        bg: '#FAFAFA',
      }
    }
  };

  const chartStyle = {
    border: "1px solid rgba(164, 164, 164, 0.1)",
    borderRadius: "8px",
    filter:{
      dropShadow: "(0px 2px 4px rgba(0, 0, 0, 0.05))"
    },
    opacity: "0.3",
    _checked: {
      bg:'#FAFAFA',
      color:'#00DEA3',
      opacity: "1",
      border:"2px solid #00DEA3",
      padding:"0",
      margin: "0"
    },
    "span[class*='checkbox__control']:not([data-disabled])": {
      borderColor: '#EDEDED',
      bg: '#EDEDED',
      borderRadius: "9px",
      width: '16px',
      height: '16px',
      position: "absolute",
      left: "158px",
      top:"12px",
      _checked: {
        bg: '#00DEA3',
        borderColor: '#00DEA3',
        padding:"0",
        margin: "0"
      },
    },
    
  };

  const btn={
    backgroundColor: "#F1F1F1",
    color: "#646464",
    borderRaduis: "8px",
    fontSize: "16px",
    fontWeight:"400",
    fontFamily:"Graphik LCG",
    lineHeight:"24px",
    _focus:{
      bg: "#00DEA3",
      color: "#FFFFFF",
      borderRaduis: "8px",
      fontSize: "16px",
      fontWeight:"600",
      fontFamily:"Graphik LCG",
      lineHeight:"24px",
    }
  }

  const input={
    width:"285px",
    height:"60px",
    border:"2px solid #4965CA",
    borderRadius:"8px",
    boxShadow:"0px 0px 4px rgba(57, 97, 251, 0.3)",
    padding:"18px 20px",
  }
  return (
    <>
    <Card
         pos="absolute"
         width="645px"
         height="849px"
         left="398px"
         top="110px"
         backgroundColor="#FFFFFF"
         borderRadius="10px"
         zIndex="10">
        <CardHeader left="0" margin="0" padding="0">
                    <Text
                         position="absolute"
                         textAlign="center"
                         fontFamily="Graphik LCG"
                         fontStyle="normal"
                         fontWeight="400"
                         fontSize="20px"
                         lineHeight="20px"
                         letterSpacing="0.016em"
                         color="#00261C"
                         borderBottom="1px solid rgba(0, 0, 0, 0.08)"
                         width="100%"
                         padding="24px 0"
                         >Create New widget</Text>

                  <Button
                      position="absolute"
                      top="27.01px"
                      left="581px"
                      width="16px"
                      height="16px"
                      backgroundColor="#FFFFFF"
                      fontSize="20px"
                      fontWeight="300"
                      onClick={close}
                      >X</Button>
                  </CardHeader>
              
        <CardBody>
            
                <FormControl>
                    <HStack>
                    <Box
                        position="absolute"
                        width="285px"
                        height="96px"
                        top="68px"
                        left="24px">
                    <FormLabel
                            fontFamily="Graphik LCG"
                            fontStyle="normal"
                            fontWeight="400"
                            fontSize="16px"
                            lineHeight="24px"
                            color="#646464"
                             >Widget Name</FormLabel>
                     <Box
                        //  width="285px"
                        //  height="60px"
                        //  border= "2px solid #4965CA"
                        //  borderRadius="8px"
                        //  boxShadow="0px 0px 4px rgba(57, 97, 251, 0.3)"
                        //  padding="18px 20px"
                         >       
                    <input 
                          type="text" 
                          placeholder="Type here widget name"
                          style={input}
                          />
                      </Box> 
                    </Box>

                    <Box 
                        position="absolute"
                        left="336px"
                        top="68px">
                    <FormLabel
                             fontFamily="Graphik LCG"
                             fontStyle="normal"
                             fontWeight="400"
                             fontSize="16px"
                             lineHeight="24px"
                             color="#646464"
                             >Please select type</FormLabel>
                    <CheckboxGroup>
                    <HStack spacing='25px'>
                    <Checkbox defaultChecked sx={smoothClasses}>By Day</Checkbox>
                    <Checkbox sx={smoothClasses}>By Month</Checkbox>
                    </HStack>
                    </CheckboxGroup>
                    </Box>
                    </HStack>

                    <Box
                        position="absolute"
                        width="597px"
                        height="96px"
                        top="188px"
                        left="24px">
                    <FormLabel
                            fontFamily="Graphik LCG"
                            fontStyle="normal"
                            fontWeight="400"
                            fontSize="16px"
                            lineHeight="24px"
                            color="#646464"
                             >Please select type</FormLabel>
                    <HStack marginRight="33px">
                      <Button sx={btn}>Specialists</Button>
                      <Button sx={btn}>Kids</Button>
                      <Button sx={btn}>Assessment</Button>
                      <Button sx={btn}>VR</Button>
                      <Button sx={btn}>Subscriptions</Button>
                    </HStack>
                    </Box>

                    <Box 
                        position="absolute"
                        left="24px"
                        top="293px">
                    <FormLabel
                             fontFamily="Graphik LCG"
                             fontStyle="normal"
                             fontWeight="400"
                             fontSize="16px"
                             lineHeight="24px"
                             color="#646464"
                             >Choose style</FormLabel>
                    <CheckboxGroup>
                    <Flex marginBottom="16px" gap="20px">
                    <Checkbox sx={chartStyle}><Image src={BEARD16}  /></Checkbox>
                    <Checkbox sx={chartStyle}><Image src={BEARD07} /></Checkbox>
                    <Checkbox sx={chartStyle}><Image src={BEARD14} /></Checkbox>
                    </Flex>
                    <Flex marginBottom="24px" gap="20px">
                    <Checkbox sx={chartStyle}><Image src={BEARD22} /></Checkbox>
                    <Checkbox sx={chartStyle}><Image src={BEARD18} /></Checkbox>
                    <Checkbox sx={chartStyle}><Image src={BEARD21} /></Checkbox>
                    </Flex>
                    </CheckboxGroup>
                    </Box>

                    <Button
                           position="absolute"
                           top="765px"
                           width="597px"
                           height="60px"
                           margin="-24px 5px"
                           backgroundColor="#00DEA3"
                           color="#FFFFFF"
                           boxShadow="0px 4px 8px rgba(0, 222, 163, 0.2)"
                           borderRadius="12px"
                           fontFamily="Graphik LCG"
                           fontStyle="normal"
                           fontSize="16px"
                           lineHeight="24px"
                           >Save & Continue</Button>
                </FormControl>
            
        </CardBody>
    </Card>
    </>
  )
}
