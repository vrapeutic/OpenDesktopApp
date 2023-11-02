import React,{useEffect, useState} from 'react'
import { Flex, Card, Box, Text} from '@chakra-ui/react'
// import { Therapycenters } from '../../assets/icons/Therapycenters'
// import { Specialists } from '../../assets/icons/Specialists'
import { Kids } from '../../assets/icons/Kids'
import { VRsessions } from '../../assets/icons/VRsessions'
import { config } from '../../config';

export default function StatistcsCards(props: any) {
    const [kids,setKids] = useState({});
    const [sessions,setSessions] = useState({});

    useEffect(()=>{
        (async () => {
          const token = await (window as any).electronAPI.getPassword("token");
                  // console.log(token);
                  
        fetch(`${config.apiURL}/api/v1/doctors/kids_percentage?center_id=${props.centerId}`,{
            method: 'Get',
            redirect: 'follow',
            headers: {'Authorization': `Bearer ${token}`}
          })
           .then(response => response.json())
           .then(result => {
                            setKids(result);
                         //    console.log(result);
                            })
           .catch(error => console.log('error', error)); 


        fetch(`${config.apiURL}/api/v1/doctors/sessions_percentage?center_id=${props.centerId}`,{
            method: 'Get',
            redirect: 'follow',
            headers: {'Authorization': `Bearer ${token}`}
          })
           .then(response => response.json())
           .then(result => {
                            setSessions(result);
                            // console.log(result);
                            })
           .catch(error => console.log('error', error)); 
      })();
    },[]);


  return (
    <>
      <Flex width="606px" height="186.6px" left="279px" top="519.75px">
        {/* <Card
             position="absolute"
             width="130.62px"
             height="186.6px"
             backgroundColor="#FFFFFF"
             left="279px" 
             top="519.75px"
             borderRadius="10px"
             boxShadow="0px 20px 45px #F0EDF7"
             >
        <Box
            position="absolute"
            width="50px"
            height="50px"
            left="13px"
            top="23.25px"
            backgroundColor="rgba(53,117,255,0.1)"
            borderRadius="10px"
            >
            <Therapycenters position="absolute" color="#3575FF" left="15px" top="16px"/>
        </Box>
        <Text
             position="absolute"
             top="93.25px"
             left="13px"
             fontFamily="Roboto"
             fontStyle="normal"
             fontWeight="700"
             fontSize="14px"
             lineHeight="16px"
             textTransform="capitalize"
             color="#5A5881"
             >Therapy Centers</Text>

        <Text
             position="absolute"
             top="117.25px"
             left="13px"
             fontFamily="Roboto"
             fontStyle="normal"
             fontWeight="500"
             fontSize="24px"
             lineHeight="28px"
             textTransform="capitalize"
             color="#15134B"
             >72</Text>

        <Text
             position="absolute"
             top="153.25px"
             left="13px"
             fontFamily="Roboto"
             fontStyle="normal"
             fontWeight="500"
             fontSize="14px"
             lineHeight="16px"
             textTransform="capitalize"
             color="#595959"
             >+25%</Text>
        
        </Card>

        <Card
             position="absolute"
             width="130.62px"
             height="186.6px"
             backgroundColor="#FFFFFF"
             left="437.61px" 
             top="519.75px"
             borderRadius="10px"
             boxShadow="0px 20px 45px #F0EDF7"
             >
        <Box
            position="absolute"
            width="50px"
            height="50px"
            left="13px"
            top="23.25px"
            backgroundColor="rgba(243,102,67,0.1)"
            borderRadius="10px"
            >
            <Specialists position="absolute" color="#F36643" left="15px" top="16px"/>
        </Box>
        <Text
             position="absolute"
             top="93.25px"
             left="13px"
             fontFamily="Roboto"
             fontStyle="normal"
             fontWeight="700"
             fontSize="14px"
             lineHeight="16px"
             textTransform="capitalize"
             color="#5A5881"
             >Specialists</Text>

        <Text
             position="absolute"
             top="117.25px"
             left="13px"
             fontFamily="Roboto"
             fontStyle="normal"
             fontWeight="500"
             fontSize="24px"
             lineHeight="28px"
             textTransform="capitalize"
             color="#15134B"
             >87</Text>

        <Text
             position="absolute"
             top="153.25px"
             left="13px"
             fontFamily="Roboto"
             fontStyle="normal"
             fontWeight="500"
             fontSize="14px"
             lineHeight="16px"
             textTransform="capitalize"
             color="#595959"
             >+47%</Text>
        
        </Card> */}

        <Card
             position="absolute"
             width="130.62px"
             height="186.6px"
             backgroundColor="#FFFFFF"
             left="596.22px" 
             top="519.75px"
             borderRadius="10px"
             boxShadow="0px 20px 45px #F0EDF7"
             >
        <Box
            position="absolute"
            width="50px"
            height="50px"
            left="13px"
            top="23.25px"
            backgroundColor="rgba(69,36,248,0.1)"
            borderRadius="10px"
            >
            <Kids position="absolute" color="#4524F8" left="15px" top="16px"/>
        </Box>
        <Text
             position="absolute"
             top="93.25px"
             left="13px"
             fontFamily="Roboto"
             fontStyle="normal"
             fontWeight="700"
             fontSize="14px"
             lineHeight="16px"
             textTransform="capitalize"
             color="#5A5881"
             >Kids</Text>
       
        <Text
             position="absolute"
             top="117.25px"
             left="13px"
             fontFamily="Roboto"
             fontStyle="normal"
             fontWeight="500"
             fontSize="24px"
             lineHeight="28px"
             textTransform="capitalize"
             color="#15134B"
             >{kids["today_kids"]}</Text>

        <Text
             position="absolute"
             top="153.25px"
             left="13px"
             fontFamily="Roboto"
             fontStyle="normal"
             fontWeight="500"
             fontSize="14px"
             lineHeight="16px"
             textTransform="capitalize"
             color="#595959"
             >{kids["percentage"]}</Text>
        </Card>

        <Card
             position="absolute"
             width="130.62px"
             height="186.6px"
             backgroundColor="#FFFFFF"
             left="754.83px" 
             top="519.75px"
             borderRadius="10px"
             boxShadow="0px 20px 45px #F0EDF7"
             >
        <Box
            position="absolute"
            width="50px"
            height="50px"
            left="13px"
            top="23.25px"
            backgroundColor="rgba(36,214,165,0.1)"
            borderRadius="10px"
            >
            <VRsessions position="absolute" color="#24D6A5" left="13px" top="16px"/>
        </Box>
        <Text
             position="absolute"
             top="93.25px"
             left="13px"
             fontFamily="Roboto"
             fontStyle="normal"
             fontWeight="700"
             fontSize="14px"
             lineHeight="16px"
             textTransform="capitalize"
             color="#5A5881"
             >VR Sessions</Text>

        <Text
             position="absolute"
             top="117.25px"
             left="13px"
             fontFamily="Roboto"
             fontStyle="normal"
             fontWeight="500"
             fontSize="24px"
             lineHeight="28px"
             textTransform="capitalize"
             color="#15134B"
             >{sessions["today_sessions"]}</Text>

        <Text
             position="absolute"
             top="153.25px"
             left="13px"
             fontFamily="Roboto"
             fontStyle="normal"
             fontWeight="500"
             fontSize="14px"
             lineHeight="16px"
             textTransform="capitalize"
             color="#595959"
             >{sessions["percentage"]}</Text>
        
        </Card>
    </Flex>
      
    </>
  )
}
