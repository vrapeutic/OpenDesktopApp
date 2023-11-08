import {
  Button,
  FormControl,
  Input,
  Text,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  Image,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ImageLogo } from "../../assets/icons/Image";
import axios from "axios";
import { config } from "../../config";
import { getMe } from "@renderer/cache";
import { setApiToken } from "@renderer/api";
export default function Uploadlogo(props: any) {
  const [imagePreview, setImagePreview] = useState();
  const [logo, setLogo] = useState();
  const [allData, setallData] = useState();
  const handleImageChange = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];
    setLogo(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };


  console.log(props.formData);
  console.log(allData);

  const [locationData, setLocationData] = useState(null)


  useEffect(() => {
        getLocation();
    }, []);
   async function getLocation() {
        const res = await axios.get("http://ip-api.com/json");
        console.log(res);
        if (res.status === 200) 
            setLocationData(res.data)
    }



    
  const FormonSubmit = () => {
    setallData(props.onSubmit({ logo }));
    console.log(allData);
    SendDataToapi();
    props.onClose();
  };

  const SendDataToapi = () => {
    console.log(allData);
    const socialLinksArray = [
      { link: props.formData.Website, link_type: "facebook" },
      { link: props.formData.Linkedin, link_type: "twitter" },
    ];
    const DataTobesent = new FormData();
    DataTobesent.append("name", props.formData.therapyCenterName);
    DataTobesent.append("website", props.formData.Website);
    DataTobesent.append("latitude", locationData?.lat);
    DataTobesent.append("longitude", locationData?.lon);
    DataTobesent.append("tax_id", props.formData.taxID);
    DataTobesent.append(
      "registration_number",
      props.formData.registrationNumber
    );
    DataTobesent.append("logo", logo);
    DataTobesent.append("certificate", props.formData.certification);
    DataTobesent.append("email", props.formData.Email);
    DataTobesent.append("phone_number", props.formData.phoneNumber);
    props.formData.specializationschema.map((specialty) =>
      DataTobesent.append("specialty_ids[]", specialty.id)
    );
    DataTobesent.append("social_links", JSON.stringify(socialLinksArray));

    const getToken = getMe();
    const Token = {
      headers: {
        Authorization: `Bearer ${getToken.token}`,
      },
    };
    axios
      .post(`${config.apiURL}/centers`, DataTobesent, Token)
      .then((response) => {
        console.log("POST request successful:", response.data);
      })
      .catch((error) => {
        console.error("Error making POST request:", error);
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
                      <ImageLogo />

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
            {/* 
            <ModalFooter display="table-column">
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
                Upload
              </Button>

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
            </ModalFooter> */}
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
                  Upload
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
}
