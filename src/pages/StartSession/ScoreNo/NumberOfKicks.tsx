
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
    Select,
  } from '@chakra-ui/react';
  import React, { useState } from 'react';
  import { Controller, useForm } from 'react-hook-form';
  import joi from 'joi';
  import { joiResolver } from '@hookform/resolvers/joi';
import BallSpeed from './BallSpeed';


  const NumberOfKicks = (props: any) => {
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
      control
    } = useForm({
      resolver: joiResolver(schema),
      mode: 'onSubmit',
    });
  
    const handleFormSubmit = (data: any) => {
      console.log(data.selectEnvironment);
      const updatedFormData = [
        props.formData[0],
        props.formData[1],
        data.selectEnvironment,
        ...props.formData.slice(3),
      ];
  
      props.setFormData(updatedFormData);
      console.log('Form Data : ', [
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
            Number of Kicks
            </ModalHeader>
  
            <ModalBody fontSize="20px" fontWeight="600" mt="25px">
              <FormControl isInvalid={!!errors.selectEnvironment}>
                <Stack spacing={4} direction="column" align="center">
                <Controller
                  name="selectEnvironment"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select {...field} placeholder="Select Number of Kicks">
                      <option value="1" onClick={()=>handleButtonClick(1)}>1</option>
                      <option value="2"  onClick={()=>handleButtonClick(2)}>2</option>
                      <option value="3"  onClick={()=>handleButtonClick(3)}>3</option>
                      <option value="4"  onClick={()=>handleButtonClick(4)}>4</option>
                      <option value="5"  onClick={()=>handleButtonClick(5)}>5</option>
                      <option value="6"  onClick={()=>handleButtonClick(6)}>6</option>
                      <option value="7"  onClick={()=>handleButtonClick(7)}>7</option>
                      <option value="8"  onClick={()=>handleButtonClick(8)}>8</option>
                      <option value="9"  onClick={()=>handleButtonClick(9)}>9</option>
                      <option value="10"  onClick={()=>handleButtonClick(10)}>10</option>
                    </Select>
                  )}
                />
                </Stack>
                <FormErrorMessage>
                  {errors.selectEnvironment && 'Please select Number of Kicks.'}
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
  
  export default NumberOfKicks;
  