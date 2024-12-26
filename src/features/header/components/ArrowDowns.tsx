import {
  Flex,
  Text,
  Popover,
  PopoverBody,
  IconButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  HStack,
  Divider,
  Link,
  Box,
  Button,
} from '@chakra-ui/react';
import { clearApiToken } from '@renderer/api';
import { ArrowDown } from '@renderer/assets/icons/ArrowDown';
import { Language } from '@renderer/assets/icons/Language';
import { LogOut } from '@renderer/assets/icons/LogOut';
import { Setting } from '@renderer/assets/icons/Setting';
import { Users } from '@renderer/assets/icons/Users';
import { useNavigate } from 'react-router-dom';
import { clear } from '@renderer/cache';
import { dataContext } from '@renderer/shared/Provider';
import { useContext, useEffect, useState } from 'react';
import { any } from 'joi';
import { useTranslation } from 'react-i18next';

const ArrowDowns = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    localStorage.getItem('language') || 'en'
  );
  let selectedCenter = useContext(dataContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const logout = async () => {
    clearApiToken();
    clear();
    localStorage.clear();
    selectedCenter = Object.keys(selectedCenter).forEach(
      (key: any) => delete selectedCenter[key]
    );
    console.log(selectedCenter);

    (window as any).electronAPI.deletePassword('token');
    navigate('/login');
  };

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage, i18n]);

  const switchLanguage = (lang: string) => {
    // i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
    localStorage.setItem('language', lang);
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
          <IconButton bgColor="#F5F5F5" icon={<ArrowDown />} aria-label={''} />
        </PopoverTrigger>
        <PopoverContent w="min-content">
          <PopoverHeader pt="24px" pr="99px" pl="24px" pb="0" border="0">
            <Text fontSize="1rem" color="#00261C" letterSpacing="0.016em;">
              {t('welcome')}
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
                    {t('myAccount')}
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
                    {t('settings')}
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
                    {t('language')}
                  </Text>
                </Flex>
                <Box ml="51px">
                  <Button
                    bgColor={'transparent'}
                    m={0}
                    p={0}
                    height={8}
                    fontSize="0.875rem"
                    fontWeight={'unset'}
                    color="#595959"
                    display={'block'}
                    onClick={() => switchLanguage('en')}
                  >
                    EN
                  </Button>
                  <Button
                    bgColor={'transparent'}
                    m={0}
                    p={0}
                    height={5}
                    fontWeight={'unset'}
                    fontSize="0.875rem"
                    color="#595959"
                    display={'block'}
                    onClick={() => switchLanguage('vi')}
                  >
                    VI
                  </Button>
                </Box>
              </Flex>
            </>
          </PopoverBody>
          <Divider w="auto" mr="8px" ml="8px" color="#F5F5F5" />
          <Flex mb="24px" mt="21px" ml="25px">
            <HStack>
              <LogOut />
            </HStack>
            <Link
              ml="12px"
              fontSize="0.875rem"
              color="#595959"
              letterSpacing="0.016em"
              _hover={{ textDecoration: 'none' }}
              onClick={logout}
            >
              {t('logOut')}
            </Link>
          </Flex>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ArrowDowns;
