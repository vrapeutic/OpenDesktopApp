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
  Box,
  Circle,
  Container,
} from '@chakra-ui/react';
import { MessageQuestion } from '@renderer/assets/icons/MessageQuestion';
import { useState } from 'react';
import QuestionsGirl from '../../../assets/images/QuestionsGirl.png';
import NotificationUserTwo from '../../../assets/images/NotificationUserTwo.png';

const MessageQuestions = (props: any) => {
  const [isActive, setIsActive] = useState(false);

  const activateHandler = () => {
    if (isActive === true) {
      setIsActive(!isActive);
    } else {
      setIsActive(!isActive);
    }
  };

  return (
    <>
      <Popover
        closeOnBlur={false}
        closeOnEsc={false}
        isLazy
        placement="bottom-end"
      >
        <PopoverTrigger>
          <IconButton
            onClick={activateHandler}
            {...(isActive ? { bgColor: '#FFFFFF' } : { bgColor: '#F5F5F5' })}
            ml="10px"
            icon={<MessageQuestion />}
            aria-label={''}
          />
        </PopoverTrigger>
        <PopoverContent w="min-content">
          <PopoverHeader
            pt="20px"
            pr="20px"
            pl="20px"
            pb="0"
            borderRadius="12px"
            border="0"
          >
            <Image src={QuestionsGirl} alt="QuestionsGirl"></Image>
          </PopoverHeader>
          <PopoverArrow />
          <PopoverBody p="0">
            <>
              <Flex direction="column">
                <Text
                  pt="28px"
                  ml="22px"
                  fontSize="1.25rem"
                  fontWeight="700"
                  color="#5A5881"
                  textTransform="capitalize"
                >
                  How to use vR ?
                </Text>
                <Text
                  pt="23px"
                  ml="22px"
                  mr="35px"
                  fontSize="1rem"
                  color="#707EAE"
                  letterSpacing="0.016em"
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an
                </Text>
              </Flex>
            </>
          </PopoverBody>
          <Flex>
            <Button
              bg="#E9E9E9"
              borderRadius="8px"
              color="#FFFFFF"
              fontSize="0.875rem"
              fontWeight="700"
              mb="14px"
              mr="185px"
              mt="37px"
              ml="20px"
            >
              Skip
            </Button>
            {/* <Container zIndex="100" bg="#00DEA3" maxH="8px"></Container> */}
            <Button
              bg="#00DEA3"
              borderRadius="8px"
              color="#FFFFFF"
              fontSize="0.875rem"
              fontWeight="700"
              mb="14px"
              mr="20px"
              mt="37px"
            >
              Next
            </Button>
          </Flex>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default MessageQuestions;
