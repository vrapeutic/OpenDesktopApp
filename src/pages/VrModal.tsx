import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text, useToast } from '@chakra-ui/react';
import Joi from 'joi';
import { useState } from 'react';
import { useAdminContext } from '@renderer/Context/AdminContext';
import { config } from '@renderer/config';
import axios from 'axios';

const VrModal = ({ id, isOpenVR, onOpenVR, onCloseVR }:any) => {
    const toast = useToast();
    const { otp } = useAdminContext();
    const [values, setValues] = useState({ model: '', key: '' });
    const [errors, setErrors] = useState({ model: null, key: null });
    const [isValid, setIsValid] = useState(false);

    const schema = Joi.object().keys({
        model: Joi.string().min(3).max(30).required(),
        key: Joi.string().min(3).max(30).required(),
    });

    const validateField = (name: string, value: string): string | undefined => {
        const fieldSchema = schema.extract(name);
        const { error } = fieldSchema.validate(value);
        return error ? error.message : null;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });

        // Validate the field on change
        const errorMessage = validateField(name, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
        }));

        // Check if form is valid
        const isFormValid = !Object.values(errors).some((error) => error !== null) && 
                            !Object.values(values).some((fieldValue) => fieldValue === '');
        setIsValid(isFormValid);
    };

    const headers = { otp: `${otp}` };

    const addVr = async (body:any) => {
        const dataSend = { headset: body };
        try {
            const response = await axios.post(
                `${config.apiURL}/api/v1/admins/assign_center_headset/${id}`,
                dataSend,
                { headers }
            );
            console.log(response);
            handleSuccess();
        } catch (error) {
            handleError(error);
            console.error(error);
        }
    };

    const handleError = (error:any) => {
        onCloseVR();
        toast({
            title: 'Error',
            description: error.response.data.error,
            status: 'error',
            duration: 5000,
            position: 'top-right',
        });
    };

    const handleSuccess = () => {
        onCloseVR();
        toast({
            title: 'Success',
            description: 'Added successfully',
            status: 'success',
            duration: 5000,
            position: 'top-right',
        });
    };

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        const { error } = schema.validate(values, { abortEarly: false });
        if (error) {
            const validationErrors:any = {};
            error.details.forEach((detail) => {
                validationErrors[detail.path[0]] = detail.message;
            });
            setErrors(validationErrors);
            setIsValid(false);
        } else {
            setErrors({ model: null, key: null });
            addVr(values);
            setIsValid(true);
        }
    };

    return (
        <Modal isOpen={isOpenVR} onClose={onCloseVR} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={handleSubmit}>
                    <ModalBody>
                        <Text fontSize="16px" color="black" my="4">VR Headset Model</Text>
                        <Input
                            type="text"
                            name="model"
                            onChange={handleChange}
                            value={values.model}
                            fontFamily="Graphik LCG"
                        />
                        <Text fontSize="16px" color="red" fontFamily="Graphik LCG">{errors.model}</Text>

                        <Text fontSize="16px" color="black" my="4" fontFamily="Graphik LCG">Device ID</Text>
                        <Input
                            type="text"
                            name="key"
                            onChange={handleChange}
                            value={values.key}
                        />
                        <Text fontSize="16px" color="red" fontFamily="Graphik LCG">{errors.key}</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            type="button"
                            w="110px"
                            h="40px"
                            padding="10px"
                            margin="5px"
                            bg="#F5B50E"
                            borderRadius="8px"
                            fontSize="14px"
                            boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
                            color="white"
                            onClick={onCloseVR}
                            fontFamily="Graphik LCG"
                        >
                            Cancel Add
                        </Button>
                        <Button
                            type="submit"
                            h="40px"
                            w="110px"
                            padding="10px"
                            margin="5px"
                            bg={isValid ? '#F5B50E' : '#D3D3D3'}
                            borderRadius="8px"
                            fontSize="14px"
                            boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
                            color="white"
                            disabled={!isValid}
                            fontFamily="Graphik LCG"
                        >
                            Add
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default VrModal;
