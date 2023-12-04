import { Flex, HStack } from '@chakra-ui/layout';
import { Text, Image } from '@chakra-ui/react';
import UserImage from '../../../assets/images/UserImage.png';
import ArrowDowns from './ArrowDowns';

const User = (props: any) => {
  return (
    <>
      <Flex pl="60px">
        <Flex direction="column">
          <Text
            width="max-content"
            fontFamily="Inter"
            fontSize="1rem"
            color="#0D062D"
          >
            Ahmed Sharaby Doctor
          </Text>
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
