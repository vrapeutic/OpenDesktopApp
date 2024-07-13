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
import SelectjewelRodja from './Selectjewelsrodja';

const SelectenvRodja = (props: any) => {
  const {
    isOpen: isOpenSelectJewel,
    onOpen: onOpenSelectJewel,
    onClose: onCloseSelectJewel,
  } = useDisclosure();

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
    const updatedFormData = [
      props.formData[0],
      data.selectEniverinment,
      ...props.formData.slice(2),
    ];
    props.setFormData(updatedFormData);
    onOpenSelectJewel();
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
            Choose Environment rodja
          </ModalHeader>

          <ModalBody fontSize="20px" fontWeight="600" mt="25px">
            <FormControl isInvalid={!!errors.selectEniverinment}>
              <Stack spacing={4} direction="column" align="center">
                <Button
                  onClick={() => handleButtonClick(1)}
                  bg={selectedEniverinment === 1 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
                  {...register('selectEniverinment')}
                >
                  Garden
                </Button>
                <Button
                  onClick={() => handleButtonClick(2)}
                  bg={selectedEniverinment === 2 ? 'blue.300' : 'gray.300'}
                  color="black"
                  width="12em"
                  fontSize="1.2rem"
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

      {onOpenSelectJewel && (
        <SelectjewelRodja
          isOpen={isOpenSelectJewel}
          onClose={onCloseSelectJewel}
          formData={props.formData}
          setFormData={props.setFormData}
          oncloseselectlevel={props.oncloseselectlevel}
          onCloseSelectEnvrodja={props.onClose}
          onclosemodules={props.onclosemodules}
          level={props.formData[0] && props.formData[0].level}
        />
      )}
    </>
  );
};

export default SelectenvRodja;
