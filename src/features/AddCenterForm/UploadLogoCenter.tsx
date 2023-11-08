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
import { useState } from "react";
import { ImageLogo } from "../../assets/icons/Image";

export default function Uploadlogo(props: any) {
  const [imagePreview, setImagePreview] = useState();
  const [logo, setLogo] = useState();

  const handleImageChange = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];
    setLogo(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const FormonSubmit = () => {
    
  const res =  props.onSubmit({ logo });
    props.onClose();
    console.log(props.formData)
    console.log(res)
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