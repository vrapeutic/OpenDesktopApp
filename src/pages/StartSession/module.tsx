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
import { useNavigate } from 'react-router-dom';
import usePopupsHandler from '@renderer/Context/PopupsHandlerContext';
import useSocketManager from '@renderer/Context/SocketManagerProvider';
import { MODULE_PACKAGE_KEY, START_APP_MESSAGE } from '@main/constants';
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectedCenter = useContext(dataContext);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    packageName: '',
  });

  const [name, setName] = useState('Modules');
  const [errors, setErrors] = useState({
    packageName: null,
  });

  const schema = Joi.object().keys({
    packageName: Joi.string().required().label('module Name'),
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const existingDevice = await checkIfServiceExists(props.headsetId);
    const appIsConnectedToInternet = await checkAppNetWorkConnection();
    if (!existingDevice || !appIsConnectedToInternet) {
      renderDisconnectedHeadSetError(
        !appIsConnectedToInternet && 'You are not connected to the internet'
      );
      return;
    }

    if (socketError) {
      console.log(socketError, 'socketError');
      setSocketError(null);
      setOpenRunningPopup(false);
    }

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
      setErrors({ packageName: null });

      onOpen();
      // props.onClose();
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

    addFunction('closeSelectingAModule', props.onClose);
    addFunction('closeConnectedVrPopup', onClose);
  }, [selectedCenter.id]);

  const cancelSession = () => {
    closeSelectingAHeadset();
    props.onClose();
    navigate('/home');
    setValues({
      packageName: '',
    });
    setName('modules');
  };

  return (
    <Box>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
          {/* <Box borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            <ModalCloseButton marginLeft="100px" />
          </Box> */}

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
                            name="packageName"
                            onClick={() => {
                              setValues({
                                packageName: module.attributes.package_name,
                              });
                              setName(module.attributes.name);
                            }}
                          >
                            {module.attributes.name}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                    <Text fontSize="10px" color="red">
                      {errors.packageName}
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
              onClick={cancelSession}
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
      {onOpen && (
        <ConnectedVR
          isOpen={isOpen}
          headsetId={props.headsetId}
          packageName={values.packageName}
          sessionId={props.sessionId}
          setOpenRunningPopup={setOpenRunningPopup}
          openRunningPopup={openRunningPopup}
        />
      )}
    </Box>
  );
}
