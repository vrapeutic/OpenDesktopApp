import { Box, Button, Flex, Link, Image } from '@chakra-ui/react';
import ImageLogin from '../../../assets/images/ImageLogin.png';
import { useTranslation } from 'react-i18next';

const LoginNavigation = () => {
  const { t } = useTranslation();

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
      </Flex>
      <Box marginLeft="-55px">
        <Image src={ImageLogin} alt="login background image" />
      </Box>
    </>
  );
};

export default LoginNavigation;
