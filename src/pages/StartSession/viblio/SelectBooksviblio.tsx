import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormErrorMessage,
  Stack,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useNavigate } from 'react-router-dom';
import SelectDistractors from './SelectDistractorsviblio';
import { useStartSessionContext } from '@renderer/Context/StartSesstionContext';
import Openconnected from '../openconnected';
import OpenConnectedVi from './openConnectedVi';

const SelectBooksViblio = (props: any) => {
  const navigate = useNavigate();
  const [selectedBook, setselectedBook] = useState<number | null>(null);
  const { module,sessionId } = useStartSessionContext();
  const toast = useToast();
  const {
    isOpen: isOpenConnected,
    onOpen: onOpenConnected,
    onClose: onCloseConnected,
  } = useDisclosure();
  const {
    isOpen: isOpenSelectDistractors,
    onOpen: onOpenSelectDistractors,
    onClose: onCloseSelectDistractors,
  } = useDisclosure();

  const schema = joi.object({
    selectBook: joi.number().required(),
  });

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onTouched',
  });

  const handleFormSubmit = (data: any) => {
    const updatedFormData = [
      props.formData[0],
      data.selectBook,
      ...props.formData.slice(2),
    ];
    props.setFormData(updatedFormData);
  
    if (props.formData[0] === 2 || props.formData[0] === 3) {
      onOpenSelectDistractors();
    } else {
      navigate('/Therapycenters');
      onOpenConnected()
      // console.log("session id",sessionId)

      toast({
        title: 'Success',
        description: `You assigned level ${updatedFormData[0]} , book ${selectedBook} ,
         module name is ${module} and session id is ${sessionId}`,
         status: 'success',

        duration: 5000,
        position: 'top-right',
      });
  
      // console.log(
      //   `You assigned level ${updatedFormData[0]} and book ${props.formData[1]} 
      //   module name is ${module} and session id is ${sessionId}`
      // );
      // console.log('Array of menu choices', updatedFormData);
    }
  };
  
  const handleBackToSelectLevel = () => {
    props.onClose();
  };

  const handleButtonClick = (book: number) => {
    setselectedBook(book);
    setValue('selectBook', book);
  };
  return (
    <>
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
          <ModalHeader textAlign="center" fontSize="1rem">
            Select Books
          </ModalHeader>

          <ModalBody fontSize="20px" fontWeight="600" mt="25px">
            <FormControl isInvalid={!!errors.selectLevel}>
              <Stack spacing={4} direction="column" align="center">
                <Button
                  onClick={() => handleButtonClick(1)}
                  bg={selectedBook === 1 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectBook')}
                  value={1}
                >
                  5
                </Button>

                <Button
                  onClick={() => handleButtonClick(2)}
                  bg={selectedBook === 2 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectBook')}
                  value={2}
                >
                  10
                </Button>
                <Button
                  onClick={() => handleButtonClick(3)}
                  bg={selectedBook === 3 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectBook')}
                  value={3}
                >
                  15
                </Button>
              </Stack>
              <FormErrorMessage>
                {errors.selectBook && 'Please select a book.'}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="center">
            <Button
              w="180px"
              h="54px"
              bg="#00DEA3"
              borderRadius="12px"
              color="#FFFFFF"
              fontFamily="Graphik LCG"
              fontWeight="700"
              fontSize="15px"
              onClick={handleBackToSelectLevel}
              mx={2}
            >
              Back to Select Level
            </Button>
            <Button
              w="180px"
              h="54px"
              bg="#00DEA3"
              borderRadius="12px"
              color="#FFFFFF"
              fontFamily="Graphik LCG"
              fontWeight="700"
              fontSize="15px"
              onClick={handleSubmit(handleFormSubmit)}
              mx={2}
            >
             {props.formData[0] == 2  || props.formData[0] == 3 ? "select distractor" : "play"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {onOpenSelectDistractors && (
        <SelectDistractors
          isOpen={isOpenSelectDistractors}
          onClose={onCloseSelectDistractors}
          formData={props.formData}
          setFormData={props.setFormData}
          oncloseselectlevel={props.oncloseselectlevel}
          onclosemodules={props.onclosemodules}
          onCloseBooks={props.onClose}
         
        />
      )}
        {onOpenConnected && (
         <OpenConnectedVi
         isOpen={isOpenConnected}
         onClose={onCloseConnected}
         onCloseSelectBooksviblio={props.onClose}
         oncloseselectlevel={props.oncloseselectlevel}
         onclosemodules={props.onclosemodules}
         onCloseSelectDistractors={props.onClose}    />
      )}
    </>
  );
};

export default SelectBooksViblio;
