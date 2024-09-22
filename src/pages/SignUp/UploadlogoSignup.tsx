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
} from '@chakra-ui/react';
import { useState } from 'react';
import { Image } from '../../assets/icons/Image';
import axios from 'axios';
import { config } from '../../config';
import { getMe } from '../../cache';
import { useNavigate } from 'react-router-dom';
import { SignupFormProps } from './signupFormInterface';

interface uploadLogoProps extends SignupFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadlogoSignup: React.FC<uploadLogoProps> = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const [imagePreview, setImagePreview] = useState('');
  const [logo, setLogo] = useState<File>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    setLogo(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const FormonSubmit = () => {
    SendDataToApi();
    setLoading(true);
  };

  const createFormData = () => {
    const formData = new FormData();

    formData.append('name', props.formData.Name);
    formData.append('email', props.formData.Email);

    formData.append('password', props.formData.Password);
    formData.append('degree', props.formData.Degree);
    formData.append('university', props.formData.University);
    formData.append('photo', logo);

    formData.append('certificate', props.formData.certification);

    props.formData.specializationschema.forEach(
      (specialty: { id: string | Blob }) =>
        formData.append('specialty_ids[]', specialty.id)
    );

    return formData;
  };

  const postFormData = (formData: FormData) => {
 

    return axios.post(`${config.apiURL}/api/v1/doctors`, formData);
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


  

  const handleSuccess = () => {
    props.onClose();
    navigate('/');
  };

  const handleError = (error: any) => {
    props.onClose();
     console.log("errrrrror",error)
    toast({
      title: 'Error',
      description: error.response.data.error,
      status: 'error',
      duration: 5000,
      position: 'top-right',
    });
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
                Upload Profile picture
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
                Please upload your Profile picture
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
                  fontFamily="Graphik LCG"
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
    </>
  );
};

export default UploadlogoSignup;
