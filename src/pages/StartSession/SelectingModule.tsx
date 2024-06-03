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
  useToast,
} from '@chakra-ui/react';
import { config } from '@renderer/config';
import { ChevronDownIcon } from '@chakra-ui/icons';
import Joi from 'joi';
import { dataContext } from '@renderer/shared/Provider';
import { useNavigate } from 'react-router-dom';
import Selectlevel from './viblio/SelectLevelviblio';
import SelectLevelArcheeko from './Archeeko/SelectLevelArcheeko';
import { useStartSessionContext } from '@renderer/Context/StartSesstionContext';
import SelectLevelViblio from './viblio/SelectLevelviblio';
import SelectLevelRodja from './rodja/SelectLevelrodja';
import axios from 'axios';
import { getMe } from '@renderer/cache';

export default function SelectingModule(props: any) {
  const [modules, setModules] = useState([]);
  const {
    isOpen: isOpenSelectlevelviblio,
    onOpen: onOpenSelectlevelviblio,
    onClose: onCloseSelectlevelviblio,
  } = useDisclosure();
  const {
    isOpen: isOpenSelectlevelrodja,
    onOpen: onOpenSelectlevelrodja,
    onClose: onCloseSelectlevelrodja,
  } = useDisclosure();

  const selectedCenter = useContext(dataContext);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    selectedModule: '',
  });


  const {
    isOpen: isOpenSelectlevelArcheeko,
    onOpen: onOpenSelectlevelArcheeko,
    onClose: onCloseSelectlevelArcheeko,
  } = useDisclosure();
  const [name, setName] = useState('Modules');
  const { setModule } = useStartSessionContext();

  const [errors, setErrors] = useState({
    selectedModule: null,
  });

  const schema = Joi.object().keys({
    selectedModule: Joi.string().required(),
  });

  const handleSubmit = (): void => {
    switch (name) {
      case 'Archeeko':
        console.log('Archeekon', name);
        return onOpenSelectlevelArcheeko();
      case 'Viblio':
        console.log('Viblio', name);
        return onOpenSelectlevelviblio();
        case 'Rodja':
        console.log('Rodja', name);
        return onOpenSelectlevelrodja();
      default: toast({
          title: 'error',
          description: `This module is not available, please select anther module`,
          status: 'error',
          duration: 5000,
          position: 'top-right',
        });
    }
  };

  const handleModuleSelect = (module: any) => {
    setValues({ selectedModule: module.id });
    setName(module.attributes.name);
    setModule(module.attributes.name);
    console.log('Selected Module:', module);
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
          selectedCenter.id && setModules(result.data);
          console.log(result);
        })
        .catch((error) => console.log('error', error));
    })();
  }, [selectedCenter.id]);

  const { startSession, sessionId } = useStartSessionContext();
  console.log(sessionId, startSession);
  const token = getMe()?.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const toast = useToast();
  const endSissionApi = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');

    // Format the date string
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

    console.log(formattedDate);

    const date1String = startSession;
    const date2String = formattedDate;
    console.log(date1String, date2String);

    // Create Date objects
    const date1: any = new Date(date1String);
    const date2: any = new Date(date2String);

    // Calculate the difference in milliseconds
    const timeDifferenceInMilliseconds = Math.abs(date2 - date1);
    console.log(timeDifferenceInMilliseconds);
    // Convert milliseconds to seconds
    const differenceInMinutes = Math.floor(
      (timeDifferenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );
    console.log(differenceInMinutes);
    return axios.put(
      `${config.apiURL}/api/v1/sessions/${sessionId}/end_session`,
      { vr_duration: differenceInMinutes },
      { headers }
    );
  };

  const CloseModule = async () => {
    try {
      await endSissionApi();
      props.onClose();
      navigate('/home');
      setValues({ selectedModule: '' });

      setName('modules');
    } catch (error) {
      console.log(error.response);

      toast({
        title: 'error',
        description: `${error.response.data.error}`,
        status: 'error',
        duration: 3000,
        position: 'top-right',
      });
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
          <ModalBody fontSize="20px" fontWeight="600" mt="25px">
            <Text fontSize="15px" color="orange" fontFamily="Graphik LCG">
              You have been connected successfully to the headset{' '}
              {props.headsetId}
            </Text>

            {selectedCenter.id ? (
              <>
                <Text mt="10px">Choose a module</Text>
                {modules.length > 0 ? (
                  <>
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
                            onClick={() => handleModuleSelect(module)}
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
              onClick={CloseModule}
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
      {onOpenSelectlevelviblio && (
        <SelectLevelViblio
          isOpen={isOpenSelectlevelviblio}
          onClose={onCloseSelectlevelviblio}
          onclosemodules={props.onClose}
        />
      )}
           {onOpenSelectlevelrodja && (
        <SelectLevelRodja
          isOpen={isOpenSelectlevelrodja}
          onClose={onCloseSelectlevelrodja}
          onclosemodules={props.onClose}
        />
      )}
      {onOpenSelectlevelArcheeko && (
        <SelectLevelArcheeko
          isOpen={isOpenSelectlevelArcheeko}
          onClose={onCloseSelectlevelArcheeko}
          onclosemodules={props.onClose}
        />
      )}
    </Box>
  );
}
