import { useForm, Controller } from "react-hook-form";
import joi from "joi";
import {
  Button,
  FormControl,
  Text,
  Box,
  FormLabel,
  Grid,
  GridItem,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { joiResolver } from "@hookform/resolvers/joi";
import Uploadlogo from "./UploadLogoCenter";
import Progressbar from "../../theme/components/ProgressBar";

export default function ContactForm({ onSubmit }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const schema = joi.object({
    phoneNumber: joi.number().required().label("phoneNumber"),
    socialMedia: joi.string().required().label("socialMedia"),
    Website: joi.string().required().label("Website"),
    Linkedin: joi.string().required().label("Linkedin"),
  });

  const { control, handleSubmit } = useForm({
    resolver: joiResolver(schema),
    mode: "onTouched",
  });

  const FormonSubmit = (data: object) => {
    alert(JSON.stringify(data));
    onSubmit(data);
    onOpen();
  };
  return (
    <>
      <Progressbar index={3} />

      <Box as="form" onSubmit={handleSubmit(FormonSubmit)}>
        <Grid
          m="2.625em 1.5em 0em 1.5em"
          templateColumns="repeat(2, 1fr)"
          gap="0em 1.5625em"
        >
          <GridItem>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field, fieldState: { error } }) => (
                <FormControl isRequired isInvalid={!!error}>
                  <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                    Phone number 1
                  </FormLabel>
                  <Input
                    {...field}
                    id="phoneNumber"
                    autoComplete="phoneNumber"
                    borderColor="#4965CA"
                    border="2px solid #E8E8E8"
                    _hover={{ border: "1px solid #4965CA" }}
                    boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
                    type="text"
                    mt="0.75em"
                    mb="1em"
                    borderRadius="8px"
                  />
                  {error && <Text color="red.500">{error.message}</Text>}
                </FormControl>
              )}
            />
          </GridItem>
          <GridItem>
            <Controller
              control={control}
              name="socialMedia"
              render={({ field, fieldState: { error } }) => (
                <FormControl isRequired isInvalid={!!error}>
                  <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                    Social media
                  </FormLabel>
                  <Input
                    {...field}
                    id="socialMedia"
                    autoComplete="socialMedia"
                    placeholder="Facebook.com/"
                    borderColor="#4965CA"
                    border="2px solid #E8E8E8"
                    _hover={{ border: "1px solid #4965CA" }}
                    boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
                    type="text"
                    mt="0.75em"
                    mb="1em"
                    borderRadius="8px"
                  />
                  {error && <Text color="red.500">{error.message}</Text>}
                </FormControl>
              )}
            />
          </GridItem>
          <GridItem>
            <Controller
              control={control}
              name="Website"
              render={({ field, fieldState: { error } }) => (
                <FormControl isRequired isInvalid={!!error}>
                  <FormLabel m="0em" letterSpacing="0.256px" color="#15134B">
                    Website
                  </FormLabel>
                  <Input
                    {...field}
                    id="Website"
                    autoComplete="Website"
                    borderColor="#4965CA"
                    border="2px solid #E8E8E8"
                    _hover={{ border: "1px solid #4965CA" }}
                    boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
                    type="text"
                    mt="0.75em"
                    mb="9.3125em"
                    borderRadius="8px"
                  />
                  {error && <Text color="red.500">{error.message}</Text>}
                </FormControl>
              )}
            />
          </GridItem>
          <GridItem>
            <Controller
              control={control}
              name="Linkedin"
              render={({ field, fieldState: { error } }) => (
                <FormControl isRequired isInvalid={!!error}>
                  <Input
                    {...field}
                    id="Linkedin"
                    autoComplete="Linkedin"
                    placeholder="Linkedin.com/"
                    borderColor="#4965CA"
                    border="2px solid #E8E8E8"
                    _hover={{ border: "1px solid #4965CA" }}
                    boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
                    mt="2.3125em"
                    mb="9.3125em"
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
      {onOpen && (
        <Uploadlogo isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} />
      )}
    </>
  );
}
