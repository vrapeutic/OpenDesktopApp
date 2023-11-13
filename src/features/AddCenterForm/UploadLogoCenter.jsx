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
} from "@chakra-ui/react";
import { useState } from "react";
import { Image } from "../../assets/icons/Image";
import axios from "axios";
import { config } from "../../config";
import { getMe } from "../../cache";
import { useNavigate } from "react-router-dom";
import Congratulations from "./CongratulationsModal";

export default function Uploadlogo(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    isOpen: isOpenCongratulations,
    onOpen: onOpenCongratulations,
    onClose: onDeleteCongratulations,
  } = useDisclosure();

  const toast = useToast();
  const [imagePreview, setImagePreview] = useState();
  const [logo, setLogo] = useState();
  const [allData, setAllData] = useState();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const FormonSubmit = () => {
    setAllData(props.onSubmit({ logo }));
    SendDataToApi();
    setLoading(true);
  };

  const createFormData = (socialLinks) => {
    const formData = new FormData();

    formData.append("name", props.formData.therapyCenterName);
    formData.append("website", props.formData.Website);

    formData.append("tax_id", props.formData.taxID);
    formData.append("registration_number", props.formData.registrationNumber);
    formData.append("logo", logo);
    formData.append("certificate", props.formData.certification);
    formData.append("email", props.formData.Email);
    formData.append("phone_number", props.formData.phoneNumber);

    props.formData.specializationschema.forEach((specialty) =>
      formData.append("specialty_ids[]", specialty.id)
    );

    formData.append("social_links", JSON.stringify(socialLinks));

    return formData;
  };

  const postFormData = (formData) => {
    const token = getMe().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axios.post(`${config.apiURL}/api/v1/centers`, formData, { headers });
  };

  const handleSuccess = () => {
    props.onClose();
    onOpenCongratulations();
  };

  const handleError = (error) => {
    props.onClose();

    toast({
      title: "Error",
      description: error.response.data.error,
      status: "success",
      duration: 9000,
      position: "top-right",
    });
  };

  const SendDataToApi = async () => {
    const socialLinksArray = [
      { link: props.formData.Website, link_type: "facebook" },
      { link: props.formData.Linkedin, link_type: "twitter" },
    ];

    const formData = createFormData(socialLinksArray);

    try {
      await postFormData(formData);
      handleSuccess();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    onDeleteCongratulations();
    navigate("/");
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
                        onChange={handleImageChange}
                        style={{ display: "none" }}
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
                  {loading ? "Uploading Your Data" : "Upload"}
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
}
