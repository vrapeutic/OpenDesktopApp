import { useForm, Controller } from "react-hook-form";
import joi from "joi";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useRef } from "react";

export default function EductionIInfoForm({ onSubmit }) {
  const schema = joi.object({
    registrationNumber: joi.number().required().label("registrationNumber"),
    Certification: joi.string().required().label("Certification"),
    taxID: joi.number().required().label("taxID"),
  });
  const inputRef = useRef(null);

  const { control, handleSubmit } = useForm({
    resolver: joiResolver(schema),
    mode: "onTouched",
  });

  const FormonSubmit = (data: object) => {
    alert(JSON.stringify(data));
    onSubmit(data);
  };

  const handleCertificateChange = (event: any) => {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
  };
  return (
    <>
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
                    registrationNumber
                  </FormLabel>
                  <Input
                    {...field}
                    id="registrationNumber"
                    autoComplete="registrationNumber"
                    borderColor="#4965CA"
                    border="2px solid #E8E8E8"
                    _hover={{ border: "1px solid #4965CA" }}
                    boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
                    type="name"
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
              name="Certification"
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
                    onClick={() => inputRef.current.click()}
                  >
                    <Image />
                    <Input
                      {...field}
                      id="Certification"
                      autoComplete="Certification"
                      type="file"
                      accept="pdf/*"
                      ref={inputRef}
                      name="certification"
                      //  value={values.certification}
                      onChange={handleCertificateChange}
                      hidden
                    />
                  </Button>

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
                    taxID
                  </FormLabel>
                  <Input
                    {...field}
                    id="taxID"
                    autoComplete="taxID"
                    borderColor="#4965CA"
                    border="2px solid #E8E8E8"
                    _hover={{ border: "1px solid #4965CA" }}
                    boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
                    type="name"
                    mt="0.75em"
                    mb="1em"
                    borderRadius="8px"
                  />
                  {error && <Text color="red.500">{error.message}</Text>}
                </FormControl>
              )}
            />
          </GridItem>

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
            submit
          </Button>
        </Grid>
      </Box>
    </>
  );
}

// <Box marginLeft="50px">
//             <FormLabel
//                      fontFamily="Graphik LCG"
//                      fontWeight="400"
//                      fontSize="16px"
//                      lineHeight="16px"
//                      color="#15134B">
//                          Certification</FormLabel>

//             <Button
//                    h="128px"
//                    w="174px"
//                    border="2px solid #E8E8E8"
//                    borderRadius="8px"
//                    bg="#FFFFFF"
//                    onClick={() => inputRef.current.click()}
//                    >
//               <Image />
//             <Input
//                type="file"
//                accept='pdf/*'
//                ref={inputRef}
//                name="certification"
//               //  value={values.certification}
//                onChange={handleCertificateChange}
//                hidden
//                 />
//            </Button>
//             <div>{errors.certification}</div>
//            </Box>
