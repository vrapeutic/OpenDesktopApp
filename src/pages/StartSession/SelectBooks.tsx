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
    Stack,
    Radio,
    RadioGroup,
    FormControl,
    FormErrorMessage,
    Text,
    useToast,
  } from '@chakra-ui/react';
  import React from 'react';
  import { useForm } from 'react-hook-form';
  import joi from 'joi';
  import { joiResolver } from '@hookform/resolvers/joi';
import { useNavigate } from 'react-router-dom';
  
  const SelectBooks = (props: any) => {
    const navigate = useNavigate();
    const toast = useToast();

    const schema = joi.object({
      selectBook: joi.number().required(),
    });
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: joiResolver(schema),
      mode: 'onTouched',
    });
  
    const handleFormSubmit = (data: any) => {
      const updatedFormData = [...props.formData.slice(0, 1), data.selectBook, ...props.formData.slice(1)];
      props.setFormData(updatedFormData);
      navigate('/Therapycenters');
      props.onClose()
      props.oncloseselectlevel()
      props.onclosemodules()
      toast({
        title: 'Success',
        description: `you assigned level ${updatedFormData[0]} and book ${updatedFormData[1]}`,
        status: 'success',
        duration: 9000,
        position: 'top-right',
      });
      console.log(`you assigned level ${updatedFormData[0]} and book ${updatedFormData[1]}`);

      console.log('All form data', updatedFormData);
    };
  
    return (
      <Modal isOpen={props.isOpen} onClose={props.onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
          <Box borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            <ModalCloseButton marginLeft="100px" />
          </Box>
          <ModalHeader textAlign="center" fontSize="1rem">
            Select Books
          </ModalHeader>
  
          <ModalBody fontSize="20px" fontWeight="600" mt="25px">
            <FormControl isInvalid={!!errors.selectBook}>
              <RadioGroup defaultValue="1">
                <Stack spacing={4} direction="row" align="center">
                  <Radio value="1" {...register('selectBook')}>
                    A
                  </Radio>
                  <Radio value="2" {...register('selectBook')}>
                    B
                  </Radio>
                  <Radio value="3" {...register('selectBook')}>
                    C
                  </Radio>
                </Stack>
              </RadioGroup>
              <FormErrorMessage>
                {errors.selectBook && 'Please select a book.'}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="center">
            {/* <Button
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
              Cancel Session
            </Button> */}
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
              Play
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default SelectBooks;
  