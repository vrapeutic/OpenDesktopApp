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
  Flex,
} from "@chakra-ui/react";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { useEffect, useState } from "react";
import { config } from "../../config";
import Progressbar from "../../theme/components/ProgressBar";
import Select from "react-select";
import makeAnimated from "react-select/animated";
export default function SpecialtyForm({
  onSubmit,
  nextHandler,
  backHandler,
  sliding,
}) {
  const schema = joi.object({
    specialtyInformation: joi.string().required().label("SpecialtyInformation"),
    specializationschema: joi.array().required().label("specializationschema"),
  });

  const { control, handleSubmit, setValue } = useForm({
    resolver: joiResolver(schema),
    mode: "onTouched",
  });

  const FormonSubmit = (data: object) => {
    alert(JSON.stringify(data));
    onSubmit(data);
    nextHandler();
  };

  const [specialistslist, setspecialistslist] = useState([]);

  useEffect(() => {
    getSpecialists();
  }, []);

  const getSpecialists = async () => {
    try {
      const response = await axios.get(`${config.apiURL}/specialties`);
      setspecialistslist(response.data);
      console.log(specialistslist);
    } catch (error) {
      console.error(error);
    }
  };

  const animatedComponents = makeAnimated();

  const [values, setValues] = useState([]);
  const handleSpecializations = (options: any) => {
    setValues([...options]);
    setValue("specializationschema", [...options]);
    console.log(values);
  };
  const specialties = specialistslist.map((speciality) => ({
    id: speciality.id,
    label: speciality.name,
    value: speciality.id,
  }));

  console.log(values);

  return (
    <>
      <Progressbar index={1} />

      <Box as="form" onSubmit={handleSubmit(FormonSubmit)}>
        <Grid
          m="2.625em 1.5em 0em 1.5em"
          templateColumns="repeat(2, 1fr)"
          gap="0em 1.5625em"
        >
          <GridItem colSpan={2}>
            <Controller
              control={control}
              name="specialtyInformation"
              render={({ field, fieldState: { error } }) => (
                <FormControl isRequired isInvalid={!!error}>
                  <FormLabel
                    display="inline"
                    m="0em"
                    letterSpacing="0.256px"
                    color="#15134B"
                  >
                    Specialty information
                  </FormLabel>
                  <FormLabel
                    pl="0.5em"
                    display="inline"
                    m="0em"
                    fontSize="0.75em"
                    letterSpacing="0.192px"
                    color="#8D8D8D"
                  >
                    (description)
                  </FormLabel>
                  <Input
                    {...field}
                    id="specialtyInformation"
                    autoComplete="specialtyInformation"
                    h="5.5em"
                    borderColor="#4965CA"
                    border="2px solid #E8E8E8"
                    _hover={{ border: "1px solid #4965CA" }}
                    boxShadow="0px 0px 4px 0px rgba(57, 97, 251, 0.30)"
                    type="text"
                    mt="0.75em"
                    mb="3.5em"
                    borderRadius="8px"
                  />
                  {error && <Text color="red.500">{error.message}</Text>}
                </FormControl>
              )}
            />
          </GridItem>

          <GridItem>
            <Controller
              name="specializationschema"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FormControl isInvalid={!!error}>
                  <Select
                    {...field}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={specialties}
                    id="specializationschema"
                    name="specializationschema"
                    onChange={handleSpecializations}
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