import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useAdminContext } from '@renderer/Context/AdminContext';
import { TherapyFormProps } from '@renderer/features/AddCenterForm/therapyFormInterface';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from '../../assets/icons/Image';
import { config } from '../../config';
import CongratulationEdit from './CongratulationEdit';

interface UploadKidImgProps extends TherapyFormProps {
  isOpen: boolean;
  onClose: () => void;
  datachild?: any;
  id?: string;
  email?: string;
}

const UploadDoctorImg: React.FC<UploadKidImgProps> = (props) => {
  const navigate = useNavigate();
  console.log(props.formData);
  const { otp } = useAdminContext();
  const [loading, setLoading] = useState(false);
  const {
    isOpen: isOpenCongratulations,
    onOpen: onOpenCongratulations,
    onClose: onDeleteCongratulations,
  } = useDisclosure();
  const toast = useToast();
  const [imagePreview, setImagePreview] = useState('');
  const [logo, setLogo] = useState<File>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setLogo(file);
  };

  const FormonSubmit = () => {
    setLoading(true);
    SendDataToApi();
  };

  const createFormEdit = () => {
    const doctorFormData = new FormData();
    doctorFormData.append('name', props.formData.name);
    doctorFormData.append('degree', props.formData.degree);
    doctorFormData.append('university', props.formData.university);
    doctorFormData.append('certification', props.formData.certification);
    if (logo) {
      doctorFormData.append('photo', logo);
    }
    props.formData.specialities.forEach((speciality: { id: string | Blob }) =>
      doctorFormData.append('specialty_ids[]', speciality.id)
    );
    return doctorFormData;
  };

  const postFormData = async (formData: FormData) => {
    try {
      const headers = { otp: otp };
      const response = await axios.put(
        `${config.apiURL}/api/v1/admins/edit_doctor?doctor_id=${props.id}`,
        formData,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleSuccess = () => {
    props.onClose();
    onOpenCongratulations();
  };

  const handleError = (error: any) => {
    props.onClose();
    const errorMessage = error.response?.data?.error || 'Unknown Error';
    toast({
      title: 'Error',
      description: errorMessage,
      status: 'error',
      duration: 9000,
      position: 'top-right',
    });
    console.error('API Error:', error);
  };

  const handleCloseModal = () => {
    onDeleteCongratulations();
    navigate('/');
  };

  const SendDataToApi = async () => {
    const formData = createFormEdit();

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
                Upload Photo
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
                    src={logo ? imagePreview : props.datachild}
                    alt="Preview"
                    height="271px"
                    width="271px"
                  />
                ) : (
                  <>
                    <label>
                      {props.datachild ? (
                        <img
                          src={props.datachild}
                          alt="Preview"
                          height="271px"
                          width="271px"
                        />
                      ) : (
                        <Image />
                      )}
                      {/* <Image /> */}

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
                left="25%"
                fontFamily="Graphik LCG"
                fontSize="18px"
                fontWeight="400"
                lineHeight="18px"
                color="#595959"
              >
                Please upload your photo
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

      {onOpenCongratulations && (
        <CongratulationEdit
          isOpen={isOpenCongratulations}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default UploadDoctorImg;
