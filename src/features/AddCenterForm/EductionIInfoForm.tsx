import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Text,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import Progressbar from "../../theme/components/ProgressBar";

export default function EductionIInfoForm({
  onSubmit,
  nextHandler,
  backHandler,
  sliding,
}) {
  const schema = joi.object({
    registrationNumber: joi.number().required().label("Registration Number"),
    taxID: joi.number().required().label("Tax ID"),
    certification: joi.required().label("certification"),
  });

  const inputRef = useRef(null);
  const { control, handleSubmit, setError, clearErrors } = useForm({
    resolver: joiResolver(schema),
    mode: "onTouched",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleCertificateChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    clearErrors("certification");
    if (file) {
      if (file.type !== "application/pdf") {
        setError("certification", {
          type: "manual",
          message: "Please upload a PDF file.",
        });
      }
    }
  };

  const FormonSubmit = (data) => {
    if (!selectedFile) {
      setError("certification", {
        type: "manual",
        message: "Please upload a PDF file.",
      });
    } else {
      clearErrors("certification");
      data.certification = selectedFile.name;
      alert(JSON.stringify(data));

      onSubmit(data);
    }
  };

  return (
    <>
      <Progressbar index={2} />

      <Box as="form" onSubmit={handleSubmit(FormonSubmit)}>
        <Grid
          m="2.625em 1.5em 0em 1.5em"
          templateColumns="repeat(2, 1fr)"
          gap="0em 1.5625em"
        >
          <GridItem>
            <Controller
              control={control}
              name="registrationNumber"
              render={({ field, fieldState: { error } }) => (
                <FormControl isRequired isInvalid={!!error}>
                  <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                    Registration Number
                  </FormLabel>
                  <Input
                    {...field}
                    id="registrationNumber"
                    autoComplete="registrationNumber"
                    borderColor="#4965CA"
                    border="2px solid #E8E8E8"
                    _hover={{ border: "1px solid #4965CA" }}
                    boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
                    mt="0.75em"
                    mb="1em"
                    borderRadius="8px"
                  />
                  {error && <Text color="red.500">{error.message}</Text>}
                </FormControl>
              )}
            />
          </GridItem>
          <GridItem rowSpan={2}>
            <Controller
              control={control}
              name="certification"
              render={({ field, fieldState: { error } }) => (
                <FormControl isRequired isInvalid={!!error}>
                  <FormLabel
                    fontFamily="Graphik LCG"
                    fontWeight="400"
                    fontSize="16px"
                    lineHeight="16px"
                    color="#15134B"
                  >
                    Certification
                  </FormLabel>
                  <Button
                    h="128px"
                    w="174px"
                    border="2px solid #E8E8E8"
                    borderRadius="8px"
                    bg="#FFFFFF"
                  >
                    <Input
                      {...field}
                      id="certification"
                      autoComplete="certification"
                      type="file"
                      accept=".pdf" // Update this line to accept PDF files
                      ref={inputRef}
                      name="certification"
                      onChange={handleCertificateChange}
                    />
                  </Button>
                  {selectedFile && (
                    <Text mt="1em">Selected File: {selectedFile.name}</Text>
                  )}
                  {error && <Text color="red.500">{error.message}</Text>}
                </FormControl>
              )}
            />
          </GridItem>
          <GridItem>
            <Controller
              control={control}
              name="taxID"
              render={({ field, fieldState: { error } }) => (
                <FormControl isRequired isInvalid={!!error}>
                  <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                    Tax ID
                  </FormLabel>
                  <Input
                    {...field}
                    id="taxID"
                    autoComplete="taxID"
                    borderColor="#4965CA"
                    border="2px solid #E8E8E8"
                    _hover={{ border: "1px solid #4965CA" }}
                    boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
                    mt="0.75em"
                    mb="1em"
                    borderRadius="8px"
                  />
                  {error && <Text color="red.500">{error.message}</Text>}
                </FormControl>
              )}
            />
          </GridItem>
        </Grid>

        <Flex flexDirection="row-reverse">
          <Button
            type="submit"
            bg="#4AA6CA"
            borderRadius="0.75em"
            w="13.375em"
            h="3.375em"
            mt="0em"
            mr="1.5em"
            mb="2em"
            color="#FFFFFF"
            fontSize="1.125em"
            fontWeight="700"
          >
            Next
          </Button>

          {sliding === 1 ? null : (
            <Button
              onClick={backHandler}
              bg="#F5F5F5"
              borderRadius="0.75em"
              w="13.375em"
              h="3.375em"
              mt="0em"
              ml="1.5em"
              mb="2em"
              mr="auto"
              color="#A0A0A0"
              fontSize="1.125em"
              fontWeight="700"
            >
              Back
            </Button>
          )}
        </Flex>
      </Box>
    </>
  );
}
