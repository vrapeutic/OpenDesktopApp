import React, {useState,useEffect} from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    Text,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Button,
    ModalHeader,
    useDisclosure
  } from '@chakra-ui/react'
import { config } from '@renderer/config';
import { ChevronDownIcon } from '@chakra-ui/icons'
import Joi from 'joi';

export default function SelectingModule(props: any) {
    const [modules, setModules] = useState([]);
    const [specialists, setSpecialists] = useState([]);
    const [values, setValues] = useState({
        selectedModule: "",
        selectedSpecialist: "",
      });
    const [errors, setErrors] = useState({
        selectedModule: null,
        selectedSpecialist: "",
      });

    const schema = Joi.object().keys({
        selectedModule: Joi.string().required(),
        selectedSpecialist: Joi.string().required(),
      });

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const { error } = schema.validate(values, { abortEarly: false });
        console.log(error);

        if (error) {
            const validationErrors: any = {};
            error.details.forEach((detail) => {
            validationErrors[detail.path[0]] = detail.message;
            });
            setErrors(validationErrors);
            console.log(validationErrors);
        } else {
            console.log('form is valid');
        }
    };


    const selectSpecialist =async () => {
        const token = await (window as any).electronAPI.getPassword("token");
        fetch(`${config.apiURL}/api/v1/doctors/center_child_doctors?center_id=3&child_id=1`,{
            method: 'Get',
            redirect: 'follow',
            headers: {'Authorization': `Bearer ${token}`}
        })
        .then(response => response.json())
        .then(result => { console.log(result.data);
        
            setSpecialists(result.data)
        })
        .catch(error => console.log('error', error)); 
    }

    useEffect(()=>{
        (async () => {
          const token = await (window as any).electronAPI.getPassword("token");
            fetch(`${config.apiURL}/api/v1/software_modules`,{
                method: 'Get',
                redirect: 'follow',
                headers: {'Authorization': `Bearer ${token}`}
            })
            .then(response => response.json())
            .then(result => {setModules(result.data)})
            .catch(error => console.log('error', error)); 
      })();
    },[]);


  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} closeOnOverlayClick={false}>
         <ModalOverlay />
         <ModalContent h="450px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
             <ModalHeader textAlign="center" fontSize="30px">Start a session</ModalHeader>
             <ModalBody fontSize="20px" fontWeight="600" mt="15px">
                 <Text fontSize="12px" color="orange">You have been connected successfully to the headset</Text>
                 <Text fontSize="12px" color="orange">Your OTP has been verified</Text>
                 <Text mt="10px">Choose a module</Text>
                 <Menu>
                    <MenuButton
                            as={Button} 
                            rightIcon={<ChevronDownIcon />}
                            bgColor="#FFFFFF"
                            border="2px solid #E1E6EA"
                            borderRadius="8px"
                            marginTop="10px"
                            h="40px"
                            w="400px"
                    >
                            Modules
                    </MenuButton>
                    <MenuList>
                    {
                        modules.map((module => (
                        <MenuItem 
                              key={module.id} 
                              name="selectedModule"
                              onClick={() => setValues({selectedModule: module.id, selectedSpecialist: ""})}
                              >
                                  {module.attributes.name}</MenuItem>
                        )))
                    }
                    </MenuList>
                  </Menu>
                 <Text fontSize="10px" color="red">{errors.selectedModule}</Text>

                <Text mt="25px">Choose a session co-supervisor</Text>
                 <Menu>
                    <MenuButton
                            as={Button} 
                            rightIcon={<ChevronDownIcon />}
                            bgColor="#FFFFFF"
                            border="2px solid #E1E6EA"
                            borderRadius="8px"
                            marginTop="10px"
                            h="40px"
                            w="400px"
                            onClick={selectSpecialist}
                    >
                            Co-supervisors
                    </MenuButton>
                    <MenuList>
                    {
                        specialists.map((specialist => (
                        <MenuItem 
                            key={specialist.id}
                            name="selectedspecialist"
                            onClick={() => setValues({selectedModule: values.selectedModule, selectedSpecialist: specialist.id})}
                            >
                                {specialist.attributes.name}</MenuItem>
                        )))
                    }
                    </MenuList>
                  </Menu>
                  <Text fontSize="10px" color="red">{errors.selectedSpecialist}</Text>
             </ModalBody>
             <ModalFooter>
                <Button
                    w="214px"
                    h="54px"
                    bg="#00DEA3"
                    borderRadius="12px"
                    color="#FFFFFF"
                    fontFamily="Roboto"
                    fontWeight="700"
                    fontSize="18px"
                    onClick={handleSubmit}
                >
                    Next
                </Button>
             </ModalFooter>
         </ModalContent>
     </Modal>
      
  )
}
