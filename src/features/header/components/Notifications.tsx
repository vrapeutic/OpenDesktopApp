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
  Box,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { Notification } from '@renderer/assets/icons/Notification';
import { getMe } from '@renderer/cache';
import { config } from '@renderer/config';
import axios from 'axios';

import { useEffect, useState } from 'react';

const Notifications = (props: any) => {
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification,setNotfication]  = useState<any[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = getMe()?.token;

  const toast = useToast();
  const getNotification = async () => {
    try {
      const response = await axios.get(
        `${config.apiURL}/api/v1/doctors/doctor_centers?q[status_eq]=invited&include=center`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
   console.log(response.data.data)
      setNotfication(response.data.data)

    } catch (error) { 
      console.error(error);
    }
  };

  useEffect(() => {
    getNotification(); 
  }, []);


  const activateHandler = () => {
    onOpen()
    if (isActive === true) {
      setIsActive(!isActive);
    } else {
      setIsActive(!isActive);
    }
  };

  const updateStatus = async (id: any, type: any) => {
    setLoading(true);
    console.log(type, id);
   

    
    try {
      const response = await axios.put(
        `${config.apiURL}/api/v1/doctors/doctor_centers/${id}`,
        { status: type },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      onClose()

      toast({
        title: 'Success',
        description: response.data.message || 'Status updated successfully!',
        status: 'success',
        duration: 5000,
        position: 'top-right',
      });
      getNotification();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update status.',
        status: 'error',
        duration: 5000,
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {notification?.length > 0 && (
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
          minWidth={3}
          minHeight={3}
        >
          {notification?.length}
        </Circle>
      )}
      <Popover
        closeOnBlur={true}
        closeOnEsc={true}
        isLazy
        isOpen={isOpen}
        onClose={onClose}
      
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
        <PopoverContent  height={400}
                        overflow={"auto"}>
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

          <PopoverBody p="0">
            {notification?.length > 0 ? (
              <>
                {notification?.map(
                  (item: any, index: number) => {
                    return (
                      <Flex
                        bg="#E8F7FF"
                        borderRadius="8px"
                        ml="4px"
                        mr="4px"
                        mt="8px"
                        key={index}
                        flexDirection="column"
                        mb={5}
                       
                      >
                        <Flex alignItems={'center'}>
                          <Image
                            objectFit="cover"
                            ml="12px"
                            mb="20px"
                            src={item?.attributes?.center?.logo?.url}
                            alt="Ahmed Sharaby Image2"
                            width={50}
                            height={50}
                            borderRadius={50}
                            
                          />
                          <Flex flexDirection="column">
                            <Text
                              mt="10px"
                              mx="11px"
                              fontSize="0.875rem"
                              color="#535353"
                              textTransform="capitalize"
                            >
                             { item?.attributes?.center?.name}
                            </Text>
                            <Text
                              mt="3px"
                              mx="11px"
                              mb="10px"
                              fontSize="0.75rem"
                              color="#838383"
                            >
                              You have been invited by [Manager's Name] to join
                              the center named {item?.attributes?.center?.name}. You can
                              accept or reject the invitation by clicking on one
                              of the buttons below.
                            </Text>
                          </Flex>
                        </Flex>
                        <Flex
                          alignItems={'center'}
                          justifyContent={'space-evenly'}
                          mt={1}
                          pb={3}
                        >
                          <Box ml="12px" mb="20px"></Box>
                          <Button
                            width={100}
                            height={30}
                            color={'#fff'}
                            onClick={() =>
                              updateStatus(item?.id, 'approved')
                            }
                          >
                            Accept
                          </Button>
                          <Button
                            width={100}
                            height={30}
                            color={'#fff'}
                            bg="red"
                            onClick={() =>
                              updateStatus(item?.id, 'rejected')
                            }
                          >
                            Deny
                          </Button>
                        </Flex>
                      </Flex>
                    );
                  }
                )}

                {/* <Flex
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
                </Flex> */}
                {/* <Flex
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
                </Flex> */}
              </>
            ) : null}
          </PopoverBody>
          {/* <Button
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
          </Button> */}
        </PopoverContent>
      </Popover>
    </>
  );
};

export default Notifications;
