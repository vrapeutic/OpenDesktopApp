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
import usePopupsHandler from '@renderer/Context/PopupsHandlerContext';
import useSocketManager from '@renderer/Context/SocketManagerProvider';
import ConnectedVR from './ConnectedVR';

export default function SelectingModule(props: any) {
  const { popupFunctions, addFunction } = usePopupsHandler();
  const {
    socketError,
    setSocketError,
    checkIfServiceExists,
    checkAppNetWorkConnection,
  } = useSocketManager();
  const [openRunningPopup, setOpenRunningPopup] = useState(false);

  const { closeSelectingAHeadset, renderDisconnectedHeadSetError } =
    popupFunctions;
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
    selectedModule: Joi.string().required().label('module Name'),
  });

  // old Code
  // const handleSubmit = (): void => {
  //   switch (name) {
  //     case 'Archeeko':
  //       console.log('Archeekon', name);
  //       return onOpenSelectlevelArcheeko();
  //     case 'Viblio':
  //       console.log('Viblio', name);
  //       return onOpenSelectlevelviblio();
  //       case 'Rodja':
  //       console.log('Rodja', name);
  //       return onOpenSelectlevelrodja();
  //     default: toast({
  //         title: 'error',
  //         description: `This module is not available, please select anther module`,
  //         status: 'error',
  //         duration: 5000,
  //         position: 'top-right',
  //       });
  //   }
  // };

  //new Code
  const handleSubmit = async (event: any) => {
    event.preventDefault();
console.log("iam here one")
    const existingDevice = await checkIfServiceExists(props.headsetId);
    console.log("iam here 2",props.headsetId)
    const appIsConnectedToInternet = await checkAppNetWorkConnection();
    console.log("iam here 3",appIsConnectedToInternet)
    //---------------------------- now this line i think it,s for error or not get id head
    // if (!existingDevice || !appIsConnectedToInternet) {
    //   renderDisconnectedHeadSetError(
    //     !appIsConnectedToInternet && 'You are not connected to the internet'
    //   );
    //   return;
    // }

    if (socketError) {
      setSocketError(null);
      setOpenRunningPopup(false);
    }

    const { error } = schema.validate(values, { abortEarly: false });
    console.log(error);

    if (error) {
      console.log("iam here 4", error)
      const validationErrors: any = {};
      error.details.forEach((detail) => {
        validationErrors[detail.path[0]] = detail.message;
      });
      setErrors(validationErrors);
      console.log(validationErrors);
    } else {
      console.log("i am here")
      setErrors({ selectedModule: null });
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
        default:
          toast({
            title: 'error',
            description: `This module is not available, please select anther module`,
            status: 'error',
            duration: 5000,
            position: 'top-right',
          });
      }
    }
  };

  //both old and new code
  // const handleSubmit = async (event: any) => {
  //   event.preventDefault();

  //   const existingDevice = await checkIfServiceExists(props.headsetId);
  //   const appIsConnectedToInternet = await checkAppNetWorkConnection();

  //   if (!existingDevice || !appIsConnectedToInternet) {
  //     renderDisconnectedHeadSetError(
  //       !appIsConnectedToInternet && 'You are not connected to the internet'
  //     );
  //     return;
  //   }

  //   if (socketError) {
  //     setSocketError(null);
  //     setOpenRunningPopup(false);
  //   }

  //   const { error } = schema.validate(values, { abortEarly: false });
  //   console.log(error);

  //   if (error) {
  //     const validationErrors: any = {};
  //     error.details.forEach((detail) => {
  //       validationErrors[detail.path[0]] = detail.message;
  //     });
  //     setErrors(validationErrors);
  //     console.log(validationErrors);
  //     return;
  //   } else {
  //     setErrors({ selectedModule: null });
  //   }

  //   switch (
  //     values.selectedModule // Assuming values.selectedModule contains the module name
  //   ) {
  //     case 'Archeeko':
  //       console.log('Archeeko', values.selectedModule);
  //       onOpenSelectlevelArcheeko();
  //       break;
  //     case 'Viblio':
  //       console.log('Viblio', values.selectedModule);
  //       onOpenSelectlevelviblio();
  //       break;
  //     case 'Rodja':
  //       console.log('Rodja', values.selectedModule);
  //       onOpenSelectlevelrodja();
  //       break;
  //     default:
  //       toast({
  //         title: 'error',
  //         description: `This module is not available, please select another module`,
  //         status: 'error',
  //         duration: 5000,
  //         position: 'top-right',
  //       });
  //   }

  //  props.onOpen();
  // };

  useEffect(() => {
    (async () => {
      const token = await (window as any).electronAPI.getPassword('token');
      console.log('token: ', token);
      fetch(
        `${config.apiURL}/api/v1/centers/${selectedCenter.id}/assigned_modules`,
        {
          method: 'Get',
          redirect: 'follow',
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          selectedCenter.id && setModules(result.data);
          console.log(result);
        })
        .catch((error) => console.log('error', error));
    })();

    addFunction('closeSelectingAModule', props.onClose);
    addFunction('closeConnectedVrPopup', props.onClose);
  }, [selectedCenter.id]);

  const handleModuleSelect = (module: any) => {
    setValues({ selectedModule: module.id });
    setName(module.attributes.name);
    setModule(module.attributes.name);
    console.log('Selected Module:', module);
  };

  const { startSession, sessionId } = useStartSessionContext();
  console.log(sessionId, startSession);
  const token = getMe()?.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const toast = useToast();
  const endSessionApi = () => {
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
      await endSessionApi();
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
    <Box>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
          <ModalBody fontSize="20px" fontWeight="600" mt="25px">
            <Text fontSize="15px" color="orange" fontFamily="Graphik LCG">
              You have been connected successfully to the headset{' '}
              {props.headsetId}
            </Text>
            {socketError && (
              <Text
                textAlign="center"
                fontSize="1.2rem"
                color="red"
                fontFamily="Graphik LCG"
              >
                {socketError}
              </Text>
            )}

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
      )}{' '}
    </Box>
  );
}
