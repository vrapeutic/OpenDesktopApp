import {
  Flex,
  Image,
  Text,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Button,
  IconButton,
  Circle,
} from '@chakra-ui/react';
import { Notification } from '@renderer/assets/icons/Notification';
import { useState } from 'react';
import NotificationUserOne from '../../../assets/images/NotificationUserOne.png';
import NotificationUserTwo from '../../../assets/images/NotificationUserTwo.png';

const Notifications = (props: any) => {
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
      <Circle
        bg="#FF6060"
        maxH="14px"
        fontSize="0.5rem"
        color="#FFFFFF"
        fontWeight="700"
        mt="9px"
        ml="24px"
        mr="-35px"
        zIndex="100"
      >
        +9
      </Circle>
      <Popover
        closeOnBlur={false}
        closeOnEsc={false}
        isLazy
        placement="bottom-start"
      >
        <PopoverTrigger>
          <IconButton
            onClick={activateHandler}
            {...(isActive ? { bgColor: '#FFFFFF' } : { bgColor: '#F5F5F5' })}
            icon={<Notification />}
            aria-label={''}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader
            border="0"
            pl="24px"
            pr="155px"
            pt="16px"
            fontSize="0.875rem"
          >
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
            color="#A3ABBD"
          >
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
                  mt="8px"
                >
                  <Image
                    objectFit="contain"
                    ml="12px"
                    mb="20px"
                    src={NotificationUserOne}
                    alt="Ahmed Sharaby Image2"
                  />
                  <Flex flexDirection="column">
                    <Text
                      mt="10px"
                      ml="11px"
                      fontSize="0.875rem"
                      color="#535353"
                      textTransform="capitalize"
                    >
                      Ahmed Sharaby
                    </Text>
                    <Text
                      mt="3px"
                      ml="11px"
                      mb="10px"
                      fontSize="0.75rem"
                      color="#838383"
                      textTransform="capitalize"
                    >
                      Doctor Ahmed has just finished a VR session with the child
                      Mohamed
                    </Text>
                  </Flex>
                </Flex>
                <Flex
                  bg="#FFFFFF"
                  borderRadius="8px"
                  ml="4px"
                  mr="4px"
                  mt="8px"
                >
                  <Image
                    objectFit="contain"
                    ml="12px"
                    mb="20px"
                    src={NotificationUserTwo}
                    alt="Ahmed Sharaby Image2"
                  />
                  <Flex flexDirection="column">
                    <Text
                      mt="10px"
                      ml="11px"
                      fontSize="0.875rem"
                      color="#535353"
                      textTransform="capitalize"
                    >
                      Alert
                    </Text>
                    <Text
                      mt="3px"
                      ml="11px"
                      mb="10px"
                      fontSize="0.75rem"
                      color="#838383"
                      textTransform="capitalize"
                    >
                      Doctor Ahmed has just finished a VR session with the child
                      Mohamed
                    </Text>
                  </Flex>
                </Flex>
                <Flex
                  bg="#FFFFFF"
                  borderRadius="8px"
                  ml="4px"
                  mr="4px"
                  mt="8px"
                >
                  <Image
                    objectFit="contain"
                    ml="12px"
                    mb="20px"
                    src={NotificationUserTwo}
                    alt="Ahmed Sharaby Image2"
                  />
                  <Flex flexDirection="column">
                    <Text
                      mt="10px"
                      ml="11px"
                      fontSize="0.875rem"
                      color="#535353"
                      textTransform="capitalize"
                    >
                      Ahmad Al-Kabbany
                    </Text>
                    <Text
                      mt="3px"
                      ml="11px"
                      mb="10px"
                      fontSize="0.75rem"
                      color="#838383"
                      textTransform="capitalize"
                    >
                      Doctor Ahmed has just finished a VR session with the child
                      Mohamed
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
            ml="4px"
          >
            View all
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default Notifications;
