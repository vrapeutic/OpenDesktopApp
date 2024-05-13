import { Flex, HStack } from '@chakra-ui/layout';
import { Text, Image } from '@chakra-ui/react';
import UserImage from '../../../assets/images/UserImage.png';
import ArrowDowns from './ArrowDowns';


const User = (props: any) => {
  const userData = localStorage.getItem("USER");
  const UserImage = localStorage.getItem("USERImg");
  return (
    <>
      
        <Flex pl="60px" alignItems={"center"}>
        {userData&&(
        <Flex direction="column">
          <Text
            width="max-content"
            fontFamily="Inter"
            fontSize="1rem"
            color="#0D062D"
          >

            {userData}
           
          </Text>
        </Flex>
          )

        }
        {userData&&(
        <Image objectFit="contain" ml="12px" src={UserImage} alt="User Image" width={50} height={50} borderRadius={"50%"} />
        )}
        <HStack>
          <ArrowDowns />
        </HStack>
      </Flex>
     
    </>
  );
};

export default User;
