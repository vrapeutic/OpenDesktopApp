import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { IcTime } from "@renderer/assets/icons/IcTime";
import { RecentActivitiesMore } from "@renderer/assets/icons/RecentActivitiesMore";
import { RecentActivitiesUserOne } from "@renderer/assets/icons/RecentActivitiesUserOne";
import { RecentActivitiesUserThree } from "@renderer/assets/icons/RecentActivitiesUserThree";
import { RecentActivitiesUserTwo } from "@renderer/assets/icons/RecentActivitiesUserTwo";
import IcMore from "./components/IcMore";

const RecentActivities = (props: any) => {
  return (
    <>
      <Flex bg="#FFFFFF" borderRadius="10px" mt="667px" direction="column">
        <Flex justifyContent="space-between">
          <Text
            mt="24px"
            ml="24px"
            fontSize="1.25rem"
            color="#00261C"
            letterSpacing="0.016em">
            Recent Activities
          </Text>
          <HStack pt="10px" mr="24px">
            <IcMore />
          </HStack>
        </Flex>
        <Flex mt="24px" ml="24px" mr="27px">
          <Box w="40px" h="40px" bg="#FFCC40" borderRadius="8px">
            <HStack m="10px 10px 10px 10px">
              <RecentActivitiesUserOne />
            </HStack>
          </Box>
          <Text
            ml="16px"
            mt="12px"
            fontWeight="500"
            fontSize="1rem"
            color="#15134B"
            letterSpacing="0.016em">
            Yahya A.
          </Text>
          <Text
            mt="14px"
            ml="145px"
            color="#707EAE"
            fontWeight="500"
            fontSize="0.875rem"
            letterSpacing="0.016em">
            Added a new Kid, joined a therapy center
          </Text>
          <Button
            mt="5px"
            ml="auto"
            w="122px"
            h="32px"
            bg="rgba(255, 204, 64, 0.06)"
            borderRadius="4px"
            fontWeight="600"
            fontSize="0.875rem"
            color="#FFCC40">
            Pending
          </Button>
          <HStack mt="6px" ml="62px">
            <IcTime />
          </HStack>
          <Text
            mt="13px"
            ml="6px"
            fontWeight="500"
            fontSize="0.75rem"
            color="#595959"
            letterSpacing="0.016em">
            22 Sun 2022 - 02:06 PM
          </Text>
        </Flex>
        <Flex mt="22px" ml="24px" mr="27px">
          <Box w="40px" h="40px" bg="#00DEA3" borderRadius="8px">
            <HStack m="10px 10px 10px 10px">
              <RecentActivitiesUserTwo />
            </HStack>
          </Box>
          <Text
            ml="16px"
            mt="12px"
            fontWeight="500"
            fontSize="1rem"
            color="#15134B"
            letterSpacing="0.016em">
            Ahmad K.
          </Text>
          <Text
            mt="14px"
            ml="136px"
            color="#707EAE"
            fontWeight="500"
            fontSize="0.875rem"
            letterSpacing="0.016em">
            Added a new Kid, joined a therapy center
          </Text>
          <Button
            mt="5px"
            ml="auto"
            w="122px"
            h="32px"
            bg="rgba(0, 222, 163, 0.06)"
            borderRadius="4px"
            fontWeight="600"
            fontSize="0.875rem"
            color="#00DEA3">
            Added
          </Button>
          <HStack mt="6px" ml="62px">
            <IcTime />
          </HStack>
          <Text
            mt="13px"
            ml="6px"
            fontWeight="500"
            fontSize="0.75rem"
            color="#595959"
            letterSpacing="0.016em">
            14 Mon 2022 - 09:24 PM
          </Text>
        </Flex>
        <Flex mt="22px" ml="24px" mr="27px" mb="24px">
          <Box w="40px" h="40px" bg="#3575FF" borderRadius="8px">
            <HStack m="10px 10px 10px 10px">
              <RecentActivitiesUserThree />
            </HStack>
          </Box>
          <Text
            ml="16px"
            mt="12px"
            fontWeight="500"
            fontSize="1rem"
            color="#15134B"
            letterSpacing="0.016em">
            Mohamed H.
          </Text>
          <Text
            mt="14px"
            ml="112px"
            color="#707EAE"
            fontWeight="500"
            fontSize="0.875rem"
            letterSpacing="0.016em">
            Added a new Kid, joined a therapy center
          </Text>
          <Button
            mt="5px"
            ml="auto"
            w="122px"
            h="32px"
            bg="rgba(53, 117, 255, 0.06)"
            borderRadius="4px"
            fontWeight="600"
            fontSize="0.875rem"
            color="#3575FF">
            Completed
          </Button>
          <HStack mt="6px" ml="62px">
            <IcTime />
          </HStack>
          <Text
            mt="13px"
            ml="6px"
            fontWeight="500"
            fontSize="0.75rem"
            color="#595959"
            letterSpacing="0.016em">
            08 Sat 2022 - 08:00 PM
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default RecentActivities;
