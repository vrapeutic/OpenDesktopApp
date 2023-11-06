
import {HStack ,Text ,Icon, Box, FormControl,FormLabel,Input, Button, Flex,useDisclosure} from '@chakra-ui/react'
import {ArrowBackIcon} from '@chakra-ui/icons' 
import React,{useState, useRef} from 'react'
import Specialty from '@renderer/Specialty';
import { Image } from '@renderer/assets/icons/Image';
import Progressbar from '@renderer/theme/components/Progressbar';
import Joi from 'joi';
import Uploadlogo from '@renderer/Uploadlogo';

export default function Educationinfo(props: any) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const inputRef= useRef(null);
  const [Back, setBack] = useState(false);
  const [values, setValues] = useState({
    degree: '',
    university: '',
    certification: [],
    
  });
  
  const [errors, setErrors] = useState({
    degree: null,
    university: null,
    certification: null,
  });
  
 
  

  const back = ()=> {
      setBack(current => !current);
      };

  const schema = Joi .object().keys({
    degree: Joi.string().required(),
    university:  Joi.string().required(),
    certification: Joi.array().required(),
          });


  const handleCertificateChange= (event:any) =>{
     const file= (event.target as HTMLInputElement).files[0]
     setValues({...values, certification: [file]})
  }
    
  const handleChange = (event: any) =>{ 
        const {name, value} = event.target;
        setValues({...values, [name]: value});
        };
      
  const handleSubmit =async (event: any) =>{
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
            props.userData.degree=values.degree;
            props.userData.university=values.university;
            props.userData.certificate=values.certification[0];
            console.log(props.userData);
            onOpen()
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
        <Progressbar index={2}/>
        <form onSubmit={handleSubmit}>
        <FormControl
                  w="1073px"
                  h="248px"
                  top="213px"
                  left="24px">

          <Flex>
            <Box>
            <FormLabel 
                    marginTop="10px"
                    fontFamily="Graphik LCG"
                    fontWeight="400"
                    fontSize="16px"
                    lineHeight="16px"
                    color="#15134B">
                        Degree</FormLabel>
           <Input 
                type='text' 
                w="524px" 
                marginRight="25px"
                name="degree"
                value={values.degree}
                onChange={handleChange}
                />
              <div>{errors.degree}</div>
            <FormLabel 
                marginTop="10px"
                fontFamily="Graphik LCG"
                fontWeight="400"
                fontSize="16px"
                lineHeight="16px"
                color="#15134B">
                     University</FormLabel>
           <Input 
                type='text' 
                w="524px" 
                marginRight="25px"
                name="university"
                value={values.university}
                onChange={handleChange}
                />
           
             <div>{errors.university}</div>

            </Box>
            <Box marginLeft="50px">
            <FormLabel
                     fontFamily="Graphik LCG"
                     fontWeight="400"
                     fontSize="16px"
                     lineHeight="16px"
                     color="#15134B">
                         Certification</FormLabel> 

           
            
            <Button
                   h="128px"
                   w="174px"
                   border="2px solid #E8E8E8"
                   borderRadius="8px"
                   bg="#FFFFFF"
                   onClick={() => inputRef.current.click()}
                   > 
              <Image />          
            <Input 
               type="file" 
               accept='pdf/*'
               ref={inputRef}
               name="certification"
               onChange={handleCertificateChange}
               hidden
                />
           </Button>
            <div>{errors.certification}</div>
           </Box> 
           </Flex>
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
         <Specialty />
        )}

      {onOpen && (
         <Uploadlogo isOpen={isOpen} onClose={onClose} userData={props.userData}/>
        )}
    </>
  )
}
