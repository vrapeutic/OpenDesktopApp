import { Card, CardBody} from '@chakra-ui/react'
import React from 'react'
import Radialbar from './Radialbar'

export default function SBDcard() {
  return (
    <Card 
         position="absolute"
         height="293px" 
         width="480px"
         left="918px"
         top="195px"
         backgroundColor="#FFFFFF"
         boxShadow="0px 20px 45px #F0EDF7"
         borderRadius="10px"
         >
    
      <CardBody>
          <Radialbar />
      </CardBody>
    </Card>
  )
}
