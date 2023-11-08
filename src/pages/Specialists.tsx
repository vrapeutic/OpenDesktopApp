import React, { useState, useEffect} from 'react'
import { Button, Card, Flex, Grid, GridItem, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text,useDisclosure} from '@chakra-ui/react'
import { config } from '../config';

export default function Specialists(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const [doctors, setDoctors] = useState([]);
 
  useEffect(()=>{
    (async () => {
      const token = await (window as any).electronAPI.getPassword("token");              
      fetch(`${config.apiURL}/api/v1/doctors/home_doctors?center_id=${props.center.id}`,{
        method: 'Get',
        redirect: 'follow',
        headers: {'Authorization': `Bearer ${token}`}
      })
       .then(response => response.json())
       .then(result => {
                        console.log(result.data);
                        setDoctors(result.data)
                        })
       .catch(error => console.log('error', error)); 
  })();
   
},[]);

  const handleSubmit = async (event: any) =>{
    event.preventDefault();
    const token = await (window as any).electronAPI.getPassword("token");
    const data = new FormData();
    data.append('email', email);
    console.log(data.get("email"));
  
   fetch(`${config.apiURL}/api/v1/centers/3/invite_doctor`,{
    method: 'POST',
    body: data,
    redirect: 'follow',
    headers: {'Authorization': `Bearer ${token}`}
    })
   .then(response => response.text())
   .then(result => {
              console.log(result);
              // console.log(centers);
              })
   .catch(error => console.log('error', error)); 

   onClose();
   }

  return (
    <>
      <Text
          position="absolute"
          alignItems="center"
          left="279px"
          top="129px"
          fontFamily="Graphik LCG"
          fontSize="29px"
          fontWeight="500"
          lineHeight="29px"
          letterSpacing="-0.01em"
      >
            Specialists</Text>


      <Button
          position="absolute"
          width="123px"
          height="40px"
          top="129px"
          left="994px"
          borderRadius="8px"
          backgroundColor="#F5B50E"
          color="#FFFFFF"
          fontSize="14px"
          fontWeight="700"
          fontFamily="Roboto"
          lineHeight="16.41px"
          padding="16px"
          onClick={onOpen}
      >
           Add Specialist</Button>

      <Grid
          position="absolute"
          height="40px"
          width="1121px"
          top="195px"
          left="279px"
          borderRadius="10px"
          backgroundColor="#FFFFFF"
          templateColumns="repeat(7, 1fr)"
          alignItems="center"
          color="#787486"
          fontSize="14px"
          fontFamily="Inter"
          fontWeight="500"
          lineHeight="24px"
      >

        <GridItem colSpan={2} style={{marginLeft: "15px"}}>Name</GridItem>
        <GridItem>Speciality</GridItem>
        <GridItem>Education</GridItem>
        <GridItem>Joined in</GridItem>
        <GridItem>Therapy center</GridItem>
        <GridItem>Sessions</GridItem>

      </Grid>

     <Flex
       flexDirection="column" 
       position="absolute"
       top="247px"
       left="279px"
     >
      {doctors.map(doctor =>(
          <Card
              height="112px"
              width="1121px"
              borderRadius="10px"
              backgroundColor="#FFFFFF"
              justifyContent="center"
              margin="10px 0px"
              key={doctor.id}
          >
            <Grid
                templateColumns="repeat(7, 1fr)"
                color="#595959"
                fontSize="16px"
                fontFamily="Graphik LCG"
                fontWeight="500"
                lineHeight="16px"
                alignItems="center"
                gap={3}
            >

              <GridItem colSpan={2} style={{color: "#15134B",marginLeft: "15px"}}>
                <Flex style={{alignItems:"center"}}>
                  <Image src={doctor.attributes["photo_url"]} width="40px" height="40px" borderRadius="50%"/>
                  <Text style={{marginLeft: "10px"}}>{doctor.attributes.name}</Text>
                </Flex>
              </GridItem>
              <GridItem style={{
                           backgroundColor:"#F3F3F3",
                           fontSize:"10px",
                           borderRadius:"10px", 
                           padding: "5px 0px",
                           height: "42px",
                           width: "120px",
                           textAlign: "center"
                          }}
              >
                         {doctor.attributes["specialties"].map(speciality => speciality.name)}</GridItem>
              <GridItem>{doctor.attributes.degree}</GridItem>
              <GridItem>{doctor.attributes["join_date"].slice(0,10)}</GridItem>
              <GridItem>{props.center.attributes.name}</GridItem>
              <GridItem>{doctor.attributes["number_of_sessions"]}</GridItem>

            </Grid>
         </Card>
      ))}

</Flex>

    { onOpen && (
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Enter the doctor's email</ModalHeader>
            <form onSubmit={handleSubmit}>
            <ModalBody>
                <Input 
                   type="email"
                   onChange={(e) => setEmail(e.target.value)}
                   />
            </ModalBody>
            <ModalFooter>
              <Button 
                  type="submit"
                  color="#FFFFFF"
                  bgColor="#00DEA3"
                  >Invite</Button>
            </ModalFooter>
            </form>
        </ModalContent>
      </Modal>
    )}

   

    </>
  )
}
