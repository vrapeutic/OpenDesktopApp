import React, { useState, useEffect, useContext } from 'react';
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
  useDisclosure,
  Box,
  ModalCloseButton,

} from '@chakra-ui/react';
import { config } from '@renderer/config';
import { ChevronDownIcon } from '@chakra-ui/icons';
import Joi from 'joi';
import { dataContext } from '@renderer/shared/Provider';
import ConnectedVR from './ConnectedVR';

export default function SelectingModule(props: any) {
  const [modules, setModules] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectedCenter = useContext(dataContext);
  const [values, setValues] = useState({
    selectedModule: '',
    
  });
   const [sessionId,setSessionId]=useState(5)
  const [name,setName] = useState('Modules')
  const [errors, setErrors] = useState({
    selectedModule: null,

  });

  const schema = Joi.object().keys({
    selectedModule: Joi.string().required(),
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
      setErrors({selectedModule:null})
      
      props.onClose()
      onOpen()
      console.log('form is valid');
    }
  };

 

  useEffect(() => {
    (async () => {
      const token = await (window as any).electronAPI.getPassword('token');
      console.log('token: ', token);
      fetch(`${config.apiURL}/api/v1/centers/${selectedCenter.id}/modules`, {
        method: 'Get',
        redirect: 'follow',
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((result) => {
          {
            selectedCenter.id && setModules(result.data);
          }

          console.log(result);
        })
        .catch((error) => console.log('error', error));
    })();
  }, [selectedCenter.id]);
  const CloseMOdule=()=>{
 
    props.onClose()
    setValues({
      selectedModule: ""
    })
    setName("modules")
  }

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
          <Box borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            <ModalCloseButton marginLeft="100px" />
          </Box>

          <ModalBody fontSize="20px" fontWeight="600" mt="25px">
            <Text fontSize="15px" color="orange" fontFamily="Graphik LCG">
              You have been connected successfully to the headset{' '}
              {props.headsetId}
            </Text>

            {selectedCenter.id ? (
              <>
                <Text mt="10px">Choose a module</Text>
                {modules.length > 0 ? (<>


                
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
                      {name}
                    </MenuButton>

                    <MenuList>
                      {modules.map((module) => (
                        <MenuItem
                          key={module.id}
                          name="selectedModule"
                          onClick={() =>
                           { setValues({
                              selectedModule: module.id
                            })
                            setName(module.attributes.name)}
                          }
                        >
                          {module.attributes.name}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                   <Text fontSize="10px" color="red">
                   {errors.selectedModule}
                 </Text>
                 </>
                ) : (
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    h={'70%'}
                  >
                    <Text
                      fontSize="13px"
                      fontWeight="500"
                      fontFamily="Graphik LCG"
                    >
                      {' '}
                      Center don't have module
                    </Text>
                  </Box>
                )}
               
              </>
            ) : (
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                h={'70%'}
              >
                <Text fontSize="13px" fontWeight="500" fontFamily="Graphik LCG">
                  {' '}
                  Please Select Center
                </Text>
              </Box>
            )}
          </ModalBody>
          <ModalFooter display={'flex'} justifyContent={'center'}>
         

            <Button
              w="180px"
              h="54px"
              mx={2}
              bg="#00DEA3"
              borderRadius="12px"
              color="#FFFFFF"
              fontFamily="Graphik LCG"
              fontWeight="700"
              fontSize="15px"
              onClick={  CloseMOdule
              }
            >
              Cancel session
            </Button>
            {selectedCenter.id && modules.length > 0 && (
              <Button
                w="180px"
                h="54px"
                bg="#00DEA3"
                borderRadius="12px"
                color="#FFFFFF"
                fontFamily="Graphik LCG"
                fontWeight="700"
                fontSize="15px"
                onClick={handleSubmit}
                mx={2}
              >
                Show module settings
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      {onOpen&& <ConnectedVR isOpen={isOpen} onClose={onClose} />}
     
    </Box>
  );
}
