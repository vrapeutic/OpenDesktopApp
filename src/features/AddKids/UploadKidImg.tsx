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
import { useAdminContext } from '@renderer/Context/AdminContext';

interface UploadKidImgProps extends TherapyFormProps {
  isOpen: boolean;
  onClose: () => void;
  datachild?: any;
  id?:string;
  email?:string;
}

const UploadKidImg: React.FC<UploadKidImgProps> = (props) => {
  const navigate = useNavigate();

  const { otp } = useAdminContext();
  const [loading, setLoading] = useState(false);
  const selectedCenter = useContext(dataContext);
  const {
    isOpen: isOpenCongratulations,
    onOpen: onOpenCongratulations,
    onClose: onDeleteCongratulations,
  } = useDisclosure();
  console.log(props);
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

  const createFormData = () => {
    const formData = new FormData();
    console.log(props.formData.Name, logo);

    formData.append('name', props.formData.Name)
    formData.append('email',props.email?props.email:props.formData.Email);
    formData.append('age', props.formData.Age);
    formData.append('photo', logo  );

    props.formData.diagnoses.forEach((diagnose: { id: string | Blob }) =>
      formData.append('diagnosis_ids[]', diagnose.id)
    );
    return formData;
  };



   const createFormEdit=()=>{
    const childFormData = new FormData();
childFormData.append('child[name]', props.formData.Name);
childFormData.append('child[age]', props.formData.Age);

{logo&& childFormData.append('child[photo]',  logo );}

// Append diagnosis IDs for the child form
props.formData.diagnoses.forEach((diagnose: { id: string | Blob }) =>
  childFormData.append('child[diagnosis_ids][]', diagnose.id)
 
);
return childFormData;
   }

  const postFormData = (formData: FormData) => {
    const token = getMe()?.token;
    const headers = {
        ...(props.datachild ? { otp: otp } : { Authorization: `Bearer ${token}` })
      };


    let x;
    {
      props.datachild
        ? (x = axios.put(
            `${config.apiURL}/api/v1/admins/edit_child/?child_id=${props.id}`,
            formData,
            { headers}
          ))
        : (x = axios.post(
            `${config.apiURL}/api/v1/centers/${selectedCenter.id}/add_child`,
            formData,
            { headers }
          ));
    }

    return x;
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
      status: 'error',
      duration: 5000,
      position: 'top-right',
    });
  };

  const handleCloseModal = () => {
    onDeleteCongratulations();
    navigate('/');
  };

  const SendDataToApi = async () => {

   
    const formData =  props.datachild? createFormEdit():createFormData()

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
                Upload Image
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
                left="18%"
                fontFamily="Graphik LCG"
                fontSize="18px"
                fontWeight="400"
                lineHeight="18px"
                color="#595959"
              >
                Please add a child photo
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
        <Congratulations
          isOpen={isOpenCongratulations}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default UploadKidImg;
