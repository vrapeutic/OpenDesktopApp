import { Box, Button, Flex, Link, Image, HStack, Text } from '@chakra-ui/react';
import ImageLogin from '../../../assets/images/ImageLogin.png';
import { useTranslation } from 'react-i18next';
import { Language } from '@renderer/assets/icons/Language';

import i18n from '@renderer/i18n';
import { useEffect, useState } from 'react';

const LoginNavigation = () => {
  const { t } = useTranslation();
 const [selectedLanguage, setSelectedLanguage] = useState<string>(
    localStorage.getItem('language') || 'en'
  );
  const[show,setShow]=useState(false)
  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage, i18n]);

  const switchLanguage = (lang: string) => {
    // i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
    localStorage.setItem('language', lang);
    setShow(!show)
  };
  return (
    <>
      <Flex
        justifyContent="space-between"
        marginX="auto"
        alignItems="center"
        paddingTop="45px"
        maxW="435px"
      >
        <Link
          fontFamily="Graphik LCG"
          lineHeight="1.2"
          color="#FFFFFF"
          fontWeight="600"
          href="https://myvrapeutic.com/#vr"
        >
          {t('features')}
        </Link>
        <Link
          fontFamily="Graphik LCG"
          color="#FFFFFF"
          fontWeight="600"
          href="https://myvrapeutic.com/#about"
        >
          {t('aboutUs')}
        </Link>
        <Link
          fontFamily="Graphik LCG"
          color="#FFFFFF"
          fontWeight="600"
          href="http://facebook.com/myvrapeutic"
        >
          {t('blog')}
        </Link>
        <Button
          as="a"
          fontFamily="Graphik LCG"
          bg="#FFFFFF"
          color="#15134B"
          fontWeight="800"
          padding="12px 24px"
          border-radius="8px"
          href="https://myvrapeutic.com/request-demo/"
        >
          {t('getStarted')}
        </Button>
        <Box onClick={()=>setShow(!show)}>
                  <HStack>
                    <Language />
                  </HStack>
                  {show&& <Box position={"absolute"} >
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
                </Box>}
                </Box>
             
      </Flex>
      
     
      <Box marginLeft="-55px">
        <Image src={ImageLogin} alt="login background image" />
      </Box>
    </>
  );
};

export default LoginNavigation;
