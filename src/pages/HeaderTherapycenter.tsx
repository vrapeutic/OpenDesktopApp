import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  Grid,
  Text,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";

export default function HeaderTherapyCenter() {
  return (
    <>
      <Grid style={{ display: "flex", justifyContent: "space-between" }}>
        <Text
       
          padding="12px 24px"
          borderRadius="8px"
          fontSize="14px"
          fontFamily="Roboto"
        >
          Therapy Centers
        </Text>

        <ChakraLink as={ReactRouterLink} to="/AddTherapycenters">
          <Button
            w="143px"
            h="40px"
            ml="24px"
            mt="55px"
            padding="12px 24px"
            bg="#F5B50E"
            borderRadius="8px"
            fontSize="14px"
            fontFamily="Roboto"
            boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
          >
            Add Therapy
          </Button>
        </ChakraLink>
      </Grid>
    </>
  );
}
