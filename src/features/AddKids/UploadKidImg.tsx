import {
    Button,
    FormControl,
    Input,
    Text,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useToast,
    useDisclosure,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { Image } from '../../assets/icons/Image';
import axios from 'axios';
import { config } from '../../config';
import { getMe } from '../../cache';
import { useNavigate } from 'react-router-dom';

import { TherapyFormProps } from '../AddCenterForm/therapyFormInterface';
import { dataContext } from '@renderer/shared/Provider';
import Congratulations from './Congratulations';

interface UploadKidImgProps extends TherapyFormProps {
    isOpen: boolean;
    onClose: () => void;
}

const UploadKidImg: React.FC<UploadKidImgProps> = (props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const selectedCenter = useContext(dataContext);
    const {
        isOpen: isOpenCongratulations,
        onOpen: onOpenCongratulations,
        onClose: onDeleteCongratulations,
    } = useDisclosure();
console.log(props)
    const toast = useToast();
    const [imagePreview, setImagePreview] = useState('');
    const [logo, setLogo] = useState<File>();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];
        
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        setLogo(previewUrl);
    };

    const FormonSubmit = () => {
        setLoading(true);
        SendDataToApi()
    };

    const createFormData = () => {
        const formData = new FormData();

        formData.append('name', props.formData.Name);
        formData.append('email', props.formData.Email);
        formData.append('age', props.formData.Age);
        formData.append('photo', logo);
   
        props.formData.diagnoses.forEach((diagnose: { id: string | Blob }) =>
            formData.append('diagnosis_ids[]', diagnose.id)
        );

        return formData;
    };

    const postFormData = (formData: FormData) => {
        const token = getMe().token;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return axios.post(
            `${config.apiURL}/api/v1/centers/${selectedCenter.id}/add_child`,
            formData,
            { headers }
        );
    };

    const handleSuccess = () => {
        props.onClose();
        onOpenCongratulations();
    };

    const handleError = (error: any) => {
        props.onClose();

        toast({
            title: 'Error',
            description: error.response.data.error,
            status: 'success',
            duration: 9000,
            position: 'top-right',
        });
    };

    const handleCloseModal = () => {
        onDeleteCongratulations();
        navigate('/');
    };

    const SendDataToApi = async () => {
    
        const formData = createFormData();
    
        try {
          await postFormData(formData);
          handleSuccess();
        } catch (error) {
          handleError(error);
        } finally {
          setLoading(false);
        }
      };

    return (
        <>
            <Box as="form" onSubmit={FormonSubmit}>
                <Modal isOpen={props.isOpen} onClose={props.onClose}>
                    <ModalOverlay />
                    <ModalContent
                        h="645px"
                        w="623px"
                        bgColor="#FFFFFF"
                        borderRadius="10px"
                    >
                        <Box borderBottom="1px solid rgba(0, 0, 0, 0.08)">
                            <ModalHeader
                                fontFamily="Graphik LCG"
                                fontSize="20px"
                                fontWeight="400"
                                lineHeight="20px"
                                color="#00261C"
                                textAlign="center"
                            >
                                {' '}
                                Upload Logo
                            </ModalHeader>
                            <ModalCloseButton marginLeft="100px" />
                        </Box>
                        <ModalBody>
                            <Text
                                position="absolute"
                                h="271px"
                                w="271px"
                                top="20%"
                                left="19%"
                                border="2px solid #E8E8E8"
                                borderRadius="50%"
                                bg="#F9F9F9"
                                padding="23%"
                            >
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        height="271px"
                                        width="271px"
                                    />
                                ) : (
                                    <>
                                        <label>
                                            <Image />

                                            <Input
                                                type="file"
                                                accept="image/png,image/jpeg"
                                                name="logo"
                                                onChange={(e) => handleImageChange(e)}
                                                style={{ display: 'none' }}
                                                hidden
                                            />
                                        </label>
                                    </>
                                )}
                            </Text>

                            <Text
                                position="absolute"
                                top="445px"
                                left="18%"
                                fontFamily="Graphik LCG"
                                fontSize="18px"
                                fontWeight="400"
                                lineHeight="18px"
                                color="#595959"
                            >
                                Please upload your Therapy Logo
                            </Text>
                        </ModalBody>

                        <ModalFooter display="table-column">
                            <FormControl>
                                <Button
                                    h="54px"
                                    w="265px"
                                    top="-50px"
                                    left="18%"
                                    borderRadius="12px"
                                    bg="#00DEA3"
                                    color="#FFFFFF"
                                    fontFamily="Roboto"
                                    fontWeight="700"
                                    fontSize="18px"
                                    lineHeight="21.09px"
                                    type="submit"
                                    onClick={FormonSubmit}
                                >
                                    {loading ? 'Uploading Your Data' : 'Upload'}
                                </Button>
                            </FormControl>

                            <Button
                                w="39px"
                                h="18px"
                                top="-30px"
                                left="45%"
                                bgColor="#FFFFFF"
                                color="#595959"
                                fontFamily="Graphik LCG"
                                fontWeight="400"
                                fontSize="18px"
                                lineHeight="18px"
                                onClick={props.onClose}
                            >
                                Skip
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>

            {onOpenCongratulations && (
                <Congratulations
                    isOpen={isOpenCongratulations}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default UploadKidImg;
