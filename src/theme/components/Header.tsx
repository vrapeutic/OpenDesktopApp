import {
  Image,
  Flex,
  HStack,
  Input,
  Text,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  IconButton,
} from "@chakra-ui/react";
import { Frame } from "@renderer/assets/icons/Frame";
import { IcMenuClose } from "@renderer/assets/icons/IcMenuClose";
import { MessageQuestion } from "@renderer/assets/icons/MessageQuestion";
import { Notification } from "@renderer/assets/icons/Notification";
import { Refresh } from "@renderer/assets/icons/Refresh";
import Person from "../../assets/images/Person.png";
import Person2 from "../../assets/images/Person2.png";
import Person3 from "../../assets/images/Person3.png";
import { ArrowDown } from "@renderer/assets/icons/ArrowDown";
import { SeatchNormal } from "@renderer/assets/icons/SearchNormal";
import { useState } from "react";

const Header = (props: any) => {
  const [isActive, setIsActive] = useState(false);
  const [dummyDataIsActive, setDummyDataIsActive] = useState(true);

  const activateHandler = () => {
    if (isActive === true) {
      setIsActive(!isActive);
    } else {
      setIsActive(!isActive);
    }
  };

  const closeHandler = () => {
    setDummyDataIsActive(false);
  };

  return (
    <>
      <Flex pl="31px" pr="40px" mt="27px" bg="#F5F5F5">
        <HStack>
          <IcMenuClose />
        </HStack>
        <HStack flexGrow={2} ml="20px" bg="#F5F5F5">
          <InputGroup bg="rgba(255, 255, 255, 0.8)">
            <InputLeftElement
              pointerEvents="none"
              children={<SeatchNormal />}
            />
            <Input
              type="text"
              fontFamily="Inter"
              fontWeight="500"
              fontSize="0.875rem"
              placeholder="Search for anything..."
            />
          </InputGroup>
        </HStack>
        <Flex pl="91px">
          <HStack>
            <Frame />
          </HStack>
          <HStack pl="22.17px">
            <Refresh />
          </HStack>
          <HStack pl="24.52px">
            <MessageQuestion />
          </HStack>
          <Popover isLazy placement="bottom-start">
            <PopoverTrigger>
              <IconButton
                onClick={activateHandler}
                {...(isActive
                  ? { bgColor: "#FFFFFF" }
                  : { bgColor: "#F5F5F5" })}
                ml="16px"
                icon={<Notification />}
                aria-label={""}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader
                border="0"
                pl="24px"
                pr="155px"
                pt="16px"
                fontSize="0.875rem">
                Notification
              </PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton
                onClick={closeHandler}
                mt="11px"
                mr="24px"
                ml="155px"
                p="0"
                width="max-content"
                fontSize="0.75rem"
                color="#A3ABBD">
                Clear All
              </PopoverCloseButton>
              <PopoverBody p="0">
                {dummyDataIsActive ? (
                  <>
                    <Flex
                      bg="#E8F7FF"
                      borderRadius="8px"
                      ml="4px"
                      mr="4px"
                      mt="8px">
                      <Image
                        objectFit="contain"
                        ml="12px"
                        mb="20px"
                        src={Person2}
                        alt="Ahmed Sharaby Image2"
                      />
                      <Flex flexDirection="column">
                        <Text
                          mt="18px"
                          ml="11px"
                          fontSize="0.875rem"
                          color="#535353"
                          textTransform="capitalize">
                          Ahmed Sharaby
                        </Text>
                        <Text
                          mt="8px"
                          ml="11px"
                          mb="10px"
                          fontSize="0.75rem"
                          color="#838383"
                          textTransform="capitalize">
                          Doctor Ahmed has just finished a VR session with the
                          child Mohamed
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex
                      bg="#FFFFFF"
                      borderRadius="8px"
                      ml="4px"
                      mr="4px"
                      mt="8px">
                      <Image
                        objectFit="contain"
                        ml="12px"
                        mb="20px"
                        src={Person3}
                        alt="Ahmed Sharaby Image2"
                      />
                      <Flex flexDirection="column">
                        <Text
                          mt="18px"
                          ml="11px"
                          fontSize="0.875rem"
                          color="#535353"
                          textTransform="capitalize">
                          Alert
                        </Text>
                        <Text
                          mt="8px"
                          ml="11px"
                          mb="10px"
                          fontSize="0.75rem"
                          color="#838383"
                          textTransform="capitalize">
                          Doctor Ahmed has just finished a VR session with the
                          child Mohamed
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex
                      bg="#FFFFFF"
                      borderRadius="8px"
                      ml="4px"
                      mr="4px"
                      mt="8px">
                      <Image
                        objectFit="contain"
                        ml="12px"
                        mb="20px"
                        src={Person3}
                        alt="Ahmed Sharaby Image2"
                      />
                      <Flex flexDirection="column">
                        <Text
                          mt="18px"
                          ml="11px"
                          fontSize="0.875rem"
                          color="#535353"
                          textTransform="capitalize">
                          Ahmad Al-Kabbany
                        </Text>
                        <Text
                          mt="8px"
                          ml="11px"
                          mb="10px"
                          fontSize="0.75rem"
                          color="#838383"
                          textTransform="capitalize">
                          Doctor Ahmed has just finished a VR session with the
                          child Mohamed
                        </Text>
                      </Flex>
                    </Flex>
                  </>
                ) : null}
              </PopoverBody>
              <Button
                bg="#F5F5F5"
                borderRadius="8px"
                color="#5671F0"
                fontSize="0.75rem"
                textTransform="capitalize"
                mb="8px"
                mr="4px"
                mt="15px"
                ml="4px">
                View all
              </Button>
            </PopoverContent>
          </Popover>
          {/* <HStack pl="26px">
            <Notification />
          </HStack> */}
        </Flex>
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
          <Image
            objectFit="contain"
            ml="12px"
            src={Person}
            alt="Ahmed Sharaby Image"
          />
          <HStack pl="12px">
            <ArrowDown />
          </HStack>
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
