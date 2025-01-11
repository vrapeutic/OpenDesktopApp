import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    FormControl,
    FormErrorMessage,
    useDisclosure,
    useToast,
  } from '@chakra-ui/react';
  import React, { useContext, useEffect, useRef, useState } from 'react';
  import { useForm } from 'react-hook-form';
  import joi from 'joi';
  import { joiResolver } from '@hookform/resolvers/joi';

  import { MODULE_PACKAGE_KEY, START_APP_MESSAGE } from '@main/constants';

  import { useStartSessionContext } from '@renderer/Context/StartSesstionContext';
  import { useNavigate } from 'react-router-dom';
  import useSocketManager from '@renderer/Context/SocketManagerProvider';

  import usePopupsHandler from '@renderer/Context/PopupsHandlerContext';
import Screw from './Screw';
import { useTranslation } from 'react-i18next';
  const BallSpeed = (props: any) => {
    const toast = useToast();
 
    const navigate = useNavigate();
    const [notFound, setNotFound] = useState(false);
 
     const { t } = useTranslation();
    const { popupFunctions } = usePopupsHandler();
    const { closeSelectingAHeadset, closeSelectingAModule } = popupFunctions;
    const { socketError } = useSocketManager();
    const {
      isOpen: isOpenSelectDistractors,
      onOpen: onOpenSelectDistractors,
      onClose: onCloseSelectDistractors,
    } = useDisclosure();
  
    const schema = joi.object({
      selectNumber: joi.number().required(),
    });
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
    const toastIdRef:any = useRef();
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      resolver: joiResolver(schema),
      mode: 'onSubmit',
    });
  
    let updatedFormData;
    const handleFormSubmit = async (data: any) => {
      console.log(data.selectNumber);
      updatedFormData = [
        props.formData[0],
        props.formData[1],
        props.formData[2],
        data.selectNumber,
        ...props.formData.slice(3),
      ];
      props.setFormData(updatedFormData);
  
      console.log('updated form data in number', updatedFormData);
      onOpenSelectDistractors();
 
    };
  
    const handleButtonClick = (number: number) => {
      setSelectedNumber(number);
      setValue('selectNumber', number);
    };
  
    const cancelSession = () => {
      setNotFound(false);
      closeSelectingAModule();
      closeSelectingAHeadset();
      navigate('/');
    };
  
    const closeErrorModal = () => {
      setNotFound(false);
      closeSelectingAModule();
    };
  
    const selectAnotherHeadset = () => {
      setNotFound(false);
      closeSelectingAModule();
    };
  
  
  
  
  
  
    const closeAllModalsAndToast = () => {
      if (toastIdRef.current) {
        toast.close(toastIdRef.current);
      }
    
    };
  
  
  
    if (socketError) {
      return null;
    }
    return (
      <>
        <Modal
          isOpen={props.isOpen}
          onClose={props.onClose}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
            {/* <Box borderBottom="1px solid rgba(0, 0, 0, 0.08)">
              <ModalCloseButton marginLeft="100px" />
            </Box> */}
            <ModalHeader textAlign="center" fontSize="1rem">
            {t("ballSpeed")}
            </ModalHeader>
  
            <ModalBody fontSize="20px" fontWeight="600" mt="25px">
              <FormControl isInvalid={!!errors.selectNumber}>
                <Stack spacing={4} direction="column" align="center">
                  <Button
                    onClick={() => handleButtonClick(1)}
                    bg={selectedNumber === 1 ? 'blue.300' : 'gray.300'}
                    color="black"
                    width="12em"
                    fontSize="1.2rem"
                    {...register('selectNumber')}
                  >
                    1
                  </Button>
                  <Button
                    onClick={() => handleButtonClick(2)}
                    bg={selectedNumber === 2 ? 'blue.300' : 'gray.300'}
                    color="black"
                    width="12em"
                    fontSize="1.2rem"
                    {...register('selectNumber')}
                  >
                     2
                  </Button>
                  <Button
                    onClick={() => handleButtonClick(3)}
                    bg={selectedNumber === 3 ? 'blue.300' : 'gray.300'}
                    color="black"
                    width="12em"
                    fontSize="1.2rem"
                    {...register('selectNumber')}
                  >
                    3
                  </Button>
                </Stack>
  
                <FormErrorMessage>
                  {errors.selectNumber && t("selectNumberError")}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter display="flex" justifyContent="space-between">
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
                onClick={props.onClose}
              >
              {t("back")}
              </Button>
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
                onClick={handleSubmit(handleFormSubmit)}
              >
             {t("next")}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
 
        <Screw
            isOpen={ isOpenSelectDistractors }
            onClose={onCloseSelectDistractors}
            formData={props.formData}
            updatedFormData={props.updatedFormData}
            selectedNumber={selectedNumber}
            setFormData={props.setFormData}
            onclosemodules={props.onclosemodules}
            onCloseSelectEnvironment={props.onCloseSelectEnvironment}
            onCloseSelectNumber={props.onClose}
            onCloseselectedNumber={props.onCloseselectedNumber}
            
            oncloseselectlevel={props.oncloseselectlevel}
          />
        {/* {onOpenConnected && (
          <OpenconnectedArcheeko
            isOpen={isOpenConnected}
            onClose={onCloseConnected}
            onclosemodules={props.onclosemodules}
            onCloseSelectEnvironment={props.onCloseSelectEnvironment}
            SelectDistractors={onCloseSelectDistractors}
            onCloseSelectNumber={props.onClose}
            oncloseselectlevel={props.oncloseselectlevel}
          />
        )} */}
      </>
    );
  };
  
  export default BallSpeed;
  