import { Flex, HStack } from "@chakra-ui/layout";
import { Text, Image } from "@chakra-ui/react";
import UserImage from "../../../assets/images/UserImage.png";
import ArrowDowns from "./ArrowDowns";

const User = (props: any) => {
  return (
    <>
      <Flex pl="60px">
        <Flex direction="column">
          <Text
            width="max-content"
            fontFamily="Inter"
            fontSize="1rem"
            color="#0D062D">
            Ahmed Sharaby
          </Text>
          <Flex justifyContent="flex-end">
            <Text fontFamily="Inter" fontSize="0.875rem" color="#787486">
              Doctor
            </Text>
          </Flex>
        </Flex>
        <Image objectFit="contain" ml="12px" src={UserImage} alt="User Image" />
        <HStack>
          <ArrowDowns />
        </HStack>
      </Flex>
    </>
  );
};

export default User;
