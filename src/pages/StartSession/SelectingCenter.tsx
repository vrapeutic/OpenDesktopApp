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
import SelectingHeadset from './SelectingHeadset';
import Joi from 'joi';



export default function SelectingCenter(props: any) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [centers, setCenters] = useState([]);
    const [children, setChildren] = useState([{
        id: "",
        type:"",
        attributes:{
            name: ""
        }
    }]);
    const [centerId, setCenterId] = useState('1');
    const [childId, setChildId] = useState('1');

    const [values, setValues] = useState({
        selectedCenter: "",
        selectedChild: "",
      });
    
      const [errors, setErrors] = useState({
        selectedCenter: null,
        selectedChild: "",
      });

    const schema = Joi.object().keys({
        selectedCenter: Joi.string().required(),
        selectedChild: Joi.string().required(),
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
            onOpen();
           
        }
    };

    
    const selectChild =async () => {
        const token = await (window as any).electronAPI.getPassword("token");
        fetch(`${config.apiURL}/api/v1/centers/${centerId}/kids`,{
            method: 'Get',
            redirect: 'follow',
            headers: {'Authorization': `Bearer ${token}`}
        })
        .then(response => response.json())
        .then(result => { console.log(result.data);
        
            setChildren(result.data)
        })
        .catch(error => console.log('error', error)); 
        
        
    }
    const execCommands = async (command: string)=> {
        const result = await (window as any).electron.commands(command)
        console.log(result); 
      }


    useEffect(()=>{
        (async () => {
          const token = await (window as any).electronAPI.getPassword("token");
            fetch(`${config.apiURL}/api/v1/doctors/home_centers`,{
                method: 'Get',
                redirect: 'follow',
                headers: {'Authorization': `Bearer ${token}`}
            })
            .then(response => response.json())
            .then(result => {setCenters(result.data)
            console.log(result.data);
            })
            .catch(error => console.log('error', error));

           
            execCommands("adb connect 192.168.1.9:41257"); 
            // execCommands("adb push D:/after_graduation/CV/formal_photo.jpg storage/emulated/0");
              

      })();
    },[]);
    
  return (
     <Modal isOpen={props.isOpen} onClose={props.onClose} closeOnOverlayClick={false}>
         <ModalOverlay />
         <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
             <ModalHeader textAlign="center" fontSize="30px">Start a session</ModalHeader>
             <ModalBody fontSize="20px" fontWeight="600" mt="15px">
                 <Text>Select a center</Text>
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
                            Centers
                    </MenuButton>
                    <MenuList>
                    {
                        centers.map((center => (
                        <MenuItem 
                              key={center.id} 
                              name="selectedCenter"
                              onClick={() => { setCenterId(center.id);
                                              setValues({selectedCenter: center.attributes.name, selectedChild: ""}) 
                              }}
                              >
                                  {center.attributes.name}</MenuItem>
                        )))
                    }
                    </MenuList>
                  </Menu>

                 <Text fontSize="10px" color="red">{errors.selectedCenter}</Text>

                <Text mt="25px">Select a child</Text>
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
                            onClick={selectChild}
                    >
                            Children
                    </MenuButton>
                    <MenuList>
                    {
                        children.map((child => (
                        <MenuItem 
                            key={child.id}
                            name="selectedChild"
                            onClick={() => {setChildId(child.id)
                                   setValues({selectedCenter: values.selectedCenter, selectedChild: child.attributes.name})}}
                            >
                                {child.attributes.name}</MenuItem>
                        )))
                    }
                    </MenuList>
                  </Menu>
                  <Text fontSize="10px" color="red">{errors.selectedChild}</Text>
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

         {onOpen && <SelectingHeadset isOpen={isOpen} onClose={onClose} centerId={centerId} childId={childId}/>}

     </Modal>
      
  )
}

