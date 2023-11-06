import {HStack ,Text ,Icon, Box, FormControl,FormLabel, Button} from '@chakra-ui/react'
import {ArrowBackIcon} from '@chakra-ui/icons'
import React , {useEffect, useState} from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Educationinfo from '@renderer/Educationinfo';
import Generalinfo from '@renderer/Generalinfo';
import Progressbar from '@renderer/theme/components/Progressbar';
import Joi from 'joi';
import { config } from '@renderer/config';



export default function Specialty(props: any) {
  const animatedComponents = makeAnimated();
  const [content, setContent] = useState([]);
  const [Next, setNext] = useState(false);
  const [Back, setBack] = useState(false);
  const [values, setValues] = useState({
    specializations: [],
  });

  const [errors, setErrors] = useState({
    specializations: null,
  });
   
  useEffect(()=>{
    fetch(`${config.apiURL}/api/v1/specialties`,{
        method: 'Get',
        redirect: 'follow'
      })
       .then(response => response.json())
       .then(result => setContent(result))
       .catch(error => console.log('error', error)); 
  })

  const specialties = content.map(speciality => ({id: speciality.id,label: speciality.name, value: speciality.name}))
  
  const next = ()=> {
     setNext(current => !current);
     };

  const back = ()=> {
      setBack(current => !current);
      };

  const schema = Joi.object().keys({
    specializations: Joi.array().required(), 
      });

  const handleSpecializations =(options: any)=>{
    setValues({...values, specializations: options});
    console.log(values);
  }

  const handleSubmit =async  (event: any) =>{
      event.preventDefault();
      const {error} = schema.validate(values,{ abortEarly: false});
      console.log(error);
  
      if(error){
        const validationErrors: any ={};
        error.details.forEach(detail => {
          validationErrors[detail.path[0]] = detail.message;
        });
        setErrors(validationErrors);
        console.log(validationErrors);
      } else{
        console.log("form is valid")
        values.specializations.map(speciality => props.userData["specialty_ids[]"].push(speciality.id))
        console.log(props.userData);
        next();
      }
    }
  return (
    <>
     <HStack
            position="absolute"
            left="291px"
            top="128px"
        >
          <Icon as={ArrowBackIcon} w="16px" h="16px" top="135px" />
          <Text
               top="128px"
               left="331px"
               fontFamily="Graphik LCG"
               fontSize="29px"
               fontWeight="400"
               lineHeight="29px"
               >Create Profile</Text>
      </HStack>
      
      <Box
          position="absolute"
          top="189px"
          left="277px"
          w="1121px"
          h="742px"
          borderRadius="10px"
          bg="#FFFFFF">
        <Progressbar index={1}/>

        <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <FormControl
                  w="1073px"
                  h="248px"
                  top="213px"
                  left="24px">

           <FormLabel
                     fontFamily="Graphik LCG"
                     fontWeight="400"
                     fontSize="16px"
                     lineHeight="16px"
                     color="#15134B">
                         Choose specializations (like tags, for example, Sensory Integration, Physical Therapy, etc.)
                         </FormLabel>
        

              <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={specialties}
                  name="specializations"
                  value={values.specializations}
                  onChange={handleSpecializations}
              />

            <div>{errors.specializations}</div>
           
           
           <Button 
                   position="absolute" 
                   w="214px"
                   h="54px"
                   top="200px"
                   left="24px"
                   bg="#F5F5F5"
                   borderRadius="12px"
                   color="#A0A0A0"
                   fontFamily="Roboto"
                   fontWeight="700"
                   fontSize="18px"
                   onClick={back}>
              Back</Button>


            <Button
                   position="absolute" 
                   w="214px"
                   h="54px"
                   top="200px"
                   left="853px"
                   bg="#4AA6CA"
                   borderRadius="12px"
                   color="#FFFFFF"
                   fontFamily="Roboto"
                   fontWeight="700"
                   fontSize="18px"
                   type="submit"
                   >
              Next</Button>
        </FormControl>
        </form>

      </Box>

      {Back && (
         <Generalinfo /> 
        )}

      {Next && (
         <Educationinfo userData={props.userData}/> 
        )}
      
    </>
  )
}
