import {
    Box,
    Flex,
    Grid,
    GridItem,
    Text,
    chakra,
} from '@chakra-ui/react';


const ProfileKid = () => {
  return (
    <Grid
      templateColumns="repeat(8, 1fr) repeat(2, 1fr) repeat(2, 1fr)"
      gap={4}
      borderRadius={'10px'}
      background="#FFFFFF"
    >
      <GridItem
        colSpan={6}
        px={4}
        my={4}
        display={'flex'}
        borderRight="1px solid"
        borderColor="gray.200"
      >
        <Box>
          <img
            src={
              'https://s3-alpha-sig.figma.com/img/2199/9fdd/642c0153fe2c73dee27f5ec93865a83d?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qKiYYUakfdzZXvpffZwzdnhxpvhYLrS9qInp0SH00U7FPMSgla32OF5M6dMLFVkWpozZwyGyzjy4LqC6cB~agXXki1FPzkOYc5j0uA3LRZrD5Mce2COeqTQvTCGhYR6EnaQOPYZD0piEEcUavWva3iwMd2w1oTx3LLj09DTEqM55-hz5LbgszEBPfZ3urPmqJ8XnVeQGvuMz08B9jxU-KhotSIiNYVIvY7FEGiBDfsxyO7H-gCj0NuouhqNaLUkziLNSsDWItA-82a3-l--lmBmmqnN~nJBZFShw1gxm2fNmX9Hvc6PrlbF3Y79aFyOcko6tPc0aqAXphxcTpOKKWQ__'
            }
            alt="kk"
            style={{ borderRadius: '50%', width: '330px', height: '124px' }}
          />
        </Box>
        <Box px={3}>
          <Flex justify="space-between">
            <chakra.h3 fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold">
              Ahmed Sharaby
            </chakra.h3>
          </Flex>

          <Text color="gray.500">
            Adolescence disorders, Mood disorders (depression), Anxiety
            disorders and obsessions, Read more...
          </Text>
        </Box>
      </GridItem>

      <GridItem colSpan={3} my={5}>
        <Text
          style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: '500' }}
        >
          Personal info
        </Text>
        <Text
          style={{
            fontFamily: 'Graphik LCG',
            fontSize: '14px',
            fontWeight: ' 400',
            color: '#787486',
          }}
          my={1}
        >
          Age : 7 years
        </Text>
        <Text
          style={{
            fontFamily: 'Graphik LCG',
            fontSize: '14px',
            fontWeight: ' 400',
            color: '#787486',
          }}
          my={1}
        >
          Call: (+02) 01099458665
        </Text>
        <Text
          style={{
            fontFamily: 'Graphik LCG',
            fontSize: '14px',
            fontWeight: ' 400',
            color: '#787486',
          }}
          my={1}
        >
          Email: Kid@vrapeutic.com
        </Text>
        <Text
          style={{
            fontFamily: 'Graphik LCG',
            fontSize: '14px',
            fontWeight: ' 400',
            color: '#02C893',
          }}
          my={1}
        >
          Dec 2019 - Present
        </Text>
      </GridItem>
      <GridItem colSpan={3} my={5}>
        <Text
          style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: '500' }}
        >
          Therapy info
        </Text>
        <Text
          style={{
            fontFamily: 'Graphik LCG',
            fontSize: '14px',
            fontWeight: ' 400',
            color: '#787486',
          }}
          my={1}
        >
        VRX center - Canda 
        </Text>
        <Text
          style={{
            fontFamily: 'Graphik LCG',
            fontSize: '14px',
            fontWeight: ' 400',
            color: '#787486',
          }}
          my={1}
        >
    Adolescence disorders,
Mood disorders (depression),
Read more...
        </Text>
       
      </GridItem>
    </Grid>
  );
};

export default ProfileKid;
