import {

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
  } from '@chakra-ui/react';
  import React, { useState } from 'react';
  import { useForm } from 'react-hook-form';
  import joi from 'joi';
  import { joiResolver } from '@hookform/resolvers/joi';
  
  import SelectNumberArcheeko from './SelectNumberArcheeko';
import SelectNumberGar from './SelectNumberGar';
  
  const SelectEnvironmentGar = (props: any) => {
    const [formData, setFormData] = useState<any[]>([]);
    const {
      isOpen: isOpenSelectNumber,
      onOpen: onOpenSelectNumber,
      onClose: onCloseSelectNumber,
    } = useDisclosure();
  
    // const [formData, setFormData] = useState<any[]>([
    //   -100, -200, -300, -400, -500, -600, -700, -800, -900, -1000,
    // ]);
  
    const schema = joi.object({
      selectEnvironment: joi.number().required(),
    });
    const [selectedEniverinment, setSelectedEniverinment] = useState<
      number | null
    >(null);
  
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm({
      resolver: joiResolver(schema),
      mode: 'onSubmit',
    });
  
  
  
  
  
    const handleFormSubmit = (data: any) => {
  console.log(data.selectEnvironment)
      const updatedFormData = [
        props.formData[0],
        data.selectEnvironment,
        ...props.formData.slice(2),
      ];
  
      props.setFormData(updatedFormData);
      console.log('Form Data : ',  [
        props.formData[0],
        data.selectEnvironment,
        ...props.formData.slice(2),
      ]);
      onOpenSelectNumber();
    };
    const handleButtonClick = (envienment: number) => {
      setSelectedEniverinment(envienment);
      setValue('selectEnvironment', envienment);
  
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
            {/* <Box borderBottom="1px solid rgba(0, 0, 0, 0.08)">
              <ModalCloseButton marginLeft="100px" />
            </Box> */}
            <ModalHeader textAlign="center" fontSize="1rem">
              Choose Environment
            </ModalHeader>
  
            <ModalBody fontSize="20px" fontWeight="600" mt="25px">
              <FormControl isInvalid={!!errors.selectEnvironment}>
                  <Stack spacing={4} direction="column" align="center">
                    <Button
                      onClick={() => handleButtonClick(1)}
                      bg={selectedEniverinment === 1 ? 'blue.300' : 'gray.300'}
                      color="black"
                      width="12em"
                      fontSize="1.2rem"
                     
                      {...register('selectEnvironment')}
                    >
                      Garden
                    </Button>
                    <Button
                      onClick={() => handleButtonClick(2)}
                      bg={selectedEniverinment === 2 ? 'blue.300' : 'gray.300'}
                      width="12em"
                      fontSize="1.2rem"
                      
                      {...register('selectEnvironment')}
                    >
                      Balcony
                    </Button>
                  </Stack>
                <FormErrorMessage>
                  {errors.selectEnvironment && 'Please select a Enironment.'}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter display="flex" justifyContent="space-between">
              <Button
                 width="12em"
                 fontSize="1rem"
                h="54px"
                mx={2}
                bg="#00DEA3"
                borderRadius="12px"
                color="#FFFFFF"
                fontFamily="Graphik LCG"
                fontWeight="700"
            
                onClick={props.onClose}
              >
                Back
              </Button>
              <Button
                width="12em"
                fontSize="1rem"
                h="54px"
                bg="#00DEA3"
                borderRadius="12px"
                color="#FFFFFF"
                fontFamily="Graphik LCG"
                fontWeight="700"
               
                onClick={handleSubmit(handleFormSubmit)}
                mx={2}
              >
                Next
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
  
        {onOpenSelectNumber && (
          <SelectNumberGar
            isOpen={isOpenSelectNumber}
            onClose={onCloseSelectNumber}
            onCloseSelectEnvironment={props.onClose}
            formData={props.formData}
            setFormData={setFormData}
            oncloseselectlevel={props.oncloseselectlevel}
            onclosemodules={props.onclosemodules}
            level={formData[0] && formData[0].level}
          />
        )}
      </>
    );
  };
  
  export default SelectEnvironmentGar;
  