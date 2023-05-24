import {
  IconButton,
  PopoverBody,
  Text,
  Popover,
  HStack,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Flex,
  Divider,
  Button,
} from "@chakra-ui/react";
import { RecentActivitiesMore } from "@renderer/assets/icons/RecentActivitiesMore";

const IcMore = (props: any) => {
  return (
    <>
      <Popover
        closeOnBlur={false}
        closeOnEsc={false}
        isLazy
        placement="bottom-end">
        <PopoverTrigger>
          <IconButton
            bgColor="#FFFFFF"
            icon={<RecentActivitiesMore />}
            aria-label={""}
          />
        </PopoverTrigger>
        <PopoverContent mt="-20px" w="193px" h="max-content">
          <PopoverHeader border="0" p="0">
            <Button
              mt="8px"
              ml="8px"
              mr="8px"
              bg="#F5F5F5"
              borderRadius="4px"
              color="#838383"
              fontSize="0.75rem"
              textTransform="capitalize"
              w="177px"
              pr="109px"
              h="28px">
              Expand
            </Button>
            <Button
              mt="8px"
              ml="8px"
              mr="8px"
              bg="#00DEA5"
              borderRadius="4px"
              color="#FFFFFF"
              fontSize="0.75rem"
              textTransform="capitalize"
              w="177px"
              pr="109px"
              h="28px">
              Export
            </Button>
          </PopoverHeader>
          <PopoverBody p="0">
            <>
              <Flex direction="column">
                <Text
                  mt="12px"
                  ml="8px"
                  color="#838383"
                  fontSize="0.75rem"
                  textTransform="capitalize">
                  Sort by
                </Text>
                <Button
                  h="28px"
                  w="177px"
                  m="8px 8px 0 8px"
                  pr="147px"
                  bg="#F5F5F5"
                  textTransform="capitalize"
                  border="1px solid #F5F5F5"
                  borderRadius="4px"
                  fontSize="0.75rem"
                  color="#838383">
                  Day
                </Button>
                <Button
                  h="28px"
                  w="177px"
                  m="4px 8px 0 8px"
                  pr="132px"
                  bg="#F5F5F5"
                  textTransform="capitalize"
                  border="1px solid #F5F5F5"
                  borderRadius="4px"
                  fontSize="0.75rem"
                  color="#838383">
                  Month
                </Button>
                <Button
                  h="28px"
                  w="177px"
                  m="4px 8px 8px 8px"
                  pr="144px"
                  bg="#F5F5F5"
                  textTransform="capitalize"
                  border="1px solid #F5F5F5"
                  borderRadius="4px"
                  fontSize="0.75rem"
                  color="#838383">
                  Year
                </Button>
              </Flex>
            </>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default IcMore;
