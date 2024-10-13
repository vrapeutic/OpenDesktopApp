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
import BallSpeed from './BallSpeed';

const NumberOfPlay = (props: any) => {
  const [formData, setFormData] = useState<any[]>([]);
  const {
    isOpen: isOpenSelectNumber,
    onOpen: onOpenSelectNumber,
    onClose: onCloseSelectNumber,
  } = useDisclosure();

  const schema = joi.object({
    selectNumber: joi.number().required(),
  });
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
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
    const updatedFormData = [
      props.formData[0],
      props.formData[1],
      data.selectNumber,
      ...props.formData.slice(2),
    ];
    props.setFormData(updatedFormData);
    console.log('Form Data : ', [
      props.formData[0],
      props.formData[1],
      data.selectNumber,
      ...props.formData.slice(2),
    ]);
    onOpenSelectNumber();
  };
  const handleButtonClick = (envienment: number) => {
    setSelectedNumber(envienment);
    setValue('selectNumber', envienment);
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
            Number Of Play
          </ModalHeader>

          <ModalBody fontSize="20px" fontWeight="600" mt="25px">
            <FormControl isInvalid={!!errors.selectedNumber}>
              <Stack spacing={4} direction="column" align="center">
                <Button
                  onClick={() => handleButtonClick(1)}
                  bg={selectedNumber === 1 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectNumber')}
                >
                  4
                </Button>
                <Button
                  onClick={() => handleButtonClick(2)}
                  bg={selectedNumber === 2 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectNumber')}
                >
                  5
                </Button>
              </Stack>
              <FormErrorMessage>
                {errors.selectedNumber && 'Please select Number of Kicks.'}
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
              Back
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
              Next
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {onOpenSelectNumber && (
        <BallSpeed
          isOpen={isOpenSelectNumber}
          onClose={onCloseSelectNumber}
          onCloseselectedNumber={props.onClose}
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

export default NumberOfPlay;
