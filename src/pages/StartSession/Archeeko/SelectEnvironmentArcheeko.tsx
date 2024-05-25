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
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import SelectNumberArcheeko from './SelectNumberArcheeko';

const SelectEnvironmentArcheeko = (props: any) => {
 
  const {
    isOpen: isOpenSelectNumber,
    onOpen: onOpenSelectNumber,
    onClose: onCloseSelectNumber,
  } = useDisclosure();
  const [formData, setFormData] = useState<any[]>([]);

  const schema = joi.object({
    selectEniverinment: joi.number().required(),
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
    console.log(data);
    const hasEnvironmentObject = formData.some((obj) => 'environment' in obj);

    const updatedFormData = hasEnvironmentObject
      ? [
          ...props.formData.slice(0, 1),
          { environment: data.selectEniverinment },
          ...props.formData.slice(2),
        ]
      : [
          ...props.formData.slice(0, 1),
          { environment: data.selectEniverinment, ...props.formData.slice(1) },
        ];


    setFormData(updatedFormData);
    props.setFormData(updatedFormData);
    console.log(updatedFormData);

    onOpenSelectNumber();
  };
  const handleButtonClick = (envienment: number) => {
    setSelectedEniverinment(envienment);
    setValue('selectEniverinment', envienment);
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
            <FormControl isInvalid={!!errors.selectEniverinment}>
                <Stack spacing={4} direction="column" align="center">
                  <Button
                    onClick={() => handleButtonClick(1)}
                    bg={selectedEniverinment === 1 ? 'blue.300' : 'gray.300'}
                    color="black"
                    fontSize="0.65rem"
                    width={'100px'}
                   
                    {...register('selectEniverinment')}
                  >
                    Garden
                  </Button>
                  <Button
                    onClick={() => handleButtonClick(2)}
                    bg={selectedEniverinment === 2 ? 'blue.300' : 'gray.300'}
                    color="black"
                    fontSize="0.65rem"
                    width={'100px'}
                    
                    {...register('selectEniverinment')}
                  >
                    Room
                  </Button>
                </Stack>
              <FormErrorMessage>
                {errors.selectEniverinment && 'Please select a Enironment.'}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="space-between">
            <Button
              w="120px"
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
              Back
            </Button>
            <Button
              w="120px"
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
              Next
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {onOpenSelectNumber && (
        <SelectNumberArcheeko
          isOpen={isOpenSelectNumber}
          onClose={onCloseSelectNumber}
          formData={formData}
          setFormData={setFormData}
          oncloseselectlevel={props.onClose}
          onclosemodules={props.onclosemodules}
          level={formData[0] && formData[0].level}
        />
      )}
    </>
  );
};

export default SelectEnvironmentArcheeko;
