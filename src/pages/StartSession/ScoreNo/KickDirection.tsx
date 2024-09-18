import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    useDisclosure,
    RadioGroup,
    FormControl,
    FormErrorMessage,
  } from '@chakra-ui/react';
  import React, { useState } from 'react';
  import joi from 'joi';
  import { useForm } from 'react-hook-form';
  import { joiResolver } from '@hookform/resolvers/joi';
import NumberOfKicks from './NumberOfKicks';
import NumberOfPlay from './NumberOfPlay';
  
  const KickDirection = (props: any) => {
    const {
      isOpen: isOpenSelectEnvironment,
      onOpen: onOpenSelectEnvironment,
      onClose: onCloseSelectEnvironment,
    } = useDisclosure();
     const {
      isOpen: isNumberOfPlay,
      onOpen: onNumberOfPlay,
      onClose: onCloseNumberOfPlay,
    } = useDisclosure();
    
    
    const [formData, setFormData] = useState<any[]>([
      -100, -200, -300, -400, -500, -600, -700, -800, -900, -1000,
    ]);
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  
    const schema = joi.object({
      selectLevel: joi.number().required(),
    });
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      resolver: joiResolver(schema),
      mode: 'onSubmit',
    });
  
    const handleFormSubmit = (data: any) => {
    //   setFormData([data.selectLevel, ...formData.slice(1)]);
      if(selectedLevel !== 2){
        const newFormData:any = [data.selectLevel, 1, ...formData.slice(2)];
    
        setFormData(newFormData);
        console.log(newFormData);
        onOpenSelectEnvironment();

      }else{
        setFormData([data.selectLevel, ...formData.slice(1)]);
        console.log('Form Data Submitted in level Arc: ', [
            data.selectLevel,
            ...formData.slice(1),
          ]);
          onNumberOfPlay()
      }
      
      
    };
  
    const handleButtonClick = (level: number) => {
      setSelectedLevel(level);
      setValue('selectLevel', level);
      console.log(level)
    };
  
    return (
      <>
        <Modal
          isOpen={props.isOpen}
          onClose={props.onClose}
          closeOnOverlayClick={false}
          closeOnEsc={false}
        >
          <ModalOverlay />
          <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
            {/* <Box borderBottom="1px solid rgba(0, 0, 0, 0.08)">
              <ModalCloseButton marginLeft="100px" />
            </Box> */}
            <ModalHeader textAlign="center" fontSize="1rem">
            Kick direction
            </ModalHeader>
  
            <ModalBody fontSize="20px" fontWeight="600" mt="25px">
              <FormControl isInvalid={!!errors.selectLevel}>
                <Stack spacing={4} direction="column" align="center">
                  <Button
                    onClick={() => handleButtonClick(1)}
                    bg={selectedLevel === 1 ? 'blue.300' : 'gray.300'}
                    color="black"
                    width="12em"
                    fontSize="1.2rem"
                    as="button"
                    {...register('selectLevel')}
                  >
                    right
                  </Button>
                  <Button
                    onClick={() => handleButtonClick(2)}
                    bg={selectedLevel === 2 ? 'blue.300' : 'gray.300'}
                    color="black"
                    width="12em"
                    fontSize="1.2rem"
                    as="button"
                    {...register('selectLevel')}
                  >
                  center
                  </Button>
                  <Button
                    onClick={() => handleButtonClick(3)}
                    bg={selectedLevel === 3 ? 'blue.300' : 'gray.300'}
                    color="black"
                    width="12em"
                    fontSize="1.2rem"
                    as="button"
                    {...register('selectLevel')}
                  >
                    left
                  </Button>
                </Stack>
                <FormErrorMessage>
                  {errors.selectLevel && 'Please select a level.'}
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
                as="button"
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
        {onOpenSelectEnvironment && (
          <NumberOfKicks
            isOpen={isOpenSelectEnvironment}
            onClose={onCloseSelectEnvironment}
            formData={formData}
            setFormData={setFormData}
            oncloseselectlevel={props.onClose}
            onclosemodules={props.onclosemodules}
           
          />
        )}
        {onNumberOfPlay && (
          <NumberOfPlay
            isOpen={isNumberOfPlay}
            onClose={onCloseNumberOfPlay}
            formData={formData}
            setFormData={setFormData}
            oncloseselectlevel={props.onClose}
            onclosemodules={props.onclosemodules}
           
          />
        )}
  
        {/* {formData.length > 0 && (
            <Box mt={4}>
              <Text>Form Data Submitted: {JSON.stringify(formData)}</Text>
            </Box>
          )} */}
      </>
    );
  };
  
  export default KickDirection;
  