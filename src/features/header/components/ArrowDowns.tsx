import {
  Flex,
  Button,
  Text,
  Image,
  Popover,
  PopoverBody,
  IconButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  HStack,
  Divider,
} from '@chakra-ui/react';
import { ArrowDown } from '@renderer/assets/icons/ArrowDown';
import { Language } from '@renderer/assets/icons/Language';
import { LogOut } from '@renderer/assets/icons/LogOut';
import { Setting } from '@renderer/assets/icons/Setting';
import { Users } from '@renderer/assets/icons/Users';

const ArrowDowns = (props: any) => {
  return (
    <>
      <Popover
        closeOnBlur={false}
        closeOnEsc={false}
        isLazy
        placement="bottom-end"
      >
        <PopoverTrigger>
          <IconButton bgColor="#F5F5F5" icon={<ArrowDown />} aria-label={''} />
        </PopoverTrigger>
        <PopoverContent w="min-content">
          <PopoverHeader pt="24px" pr="99px" pl="24px" pb="0" border="0">
            <Text fontSize="1rem" color="#00261C" letterSpacing="0.016em;">
              Welcome!
            </Text>
          </PopoverHeader>
          <PopoverBody p="0">
            <>
              <Flex pb="21px" direction="column">
                <Flex mt="25px" ml="25px">
                  <HStack>
                    <Users />
                  </HStack>
                  <Text
                    ml="12px"
                    fontSize="0.875rem"
                    color="#595959"
                    letterSpacing="0.016em"
                  >
                    My Account
                  </Text>
                </Flex>
                <Flex mt="25px" ml="25px">
                  <HStack>
                    <Setting />
                  </HStack>
                  <Text
                    ml="12px"
                    fontSize="0.875rem"
                    color="#595959"
                    letterSpacing="0.016em"
                  >
                    Settings
                  </Text>
                </Flex>
                <Flex mt="25px" ml="25px">
                  <HStack>
                    <Language />
                  </HStack>
                  <Text
                    ml="12px"
                    fontSize="0.875rem"
                    color="#595959"
                    letterSpacing="0.016em"
                  >
                    Language
                  </Text>
                </Flex>
              </Flex>
            </>
          </PopoverBody>
          <Divider w="auto" mr="8px" ml="8px" color="#F5F5F5" />
          <Flex mb="24px" mt="21px" ml="25px">
            <HStack>
              <LogOut />
            </HStack>
            <Text
              ml="12px"
              fontSize="0.875rem"
              color="#595959"
              letterSpacing="0.016em"
            >
              Log out
            </Text>
          </Flex>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ArrowDowns;
