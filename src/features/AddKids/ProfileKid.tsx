import { Box, Flex, Grid, GridItem, Text, chakra } from '@chakra-ui/react';
import React from 'react';

interface ProfileKid {
  name: string;
  age: string;
  email: string;
  img: any;
  diagnosis?: any;
  date?: string;
}

const ProfileKid: React.FC<ProfileKid> = ({
  name,
  age,
  email,
  img,
  diagnosis,
  date
}) => {

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
        <Box  width={ '125px' } height= {'125px'} display={"contents"} >
          <img
            src={
              img
                ? img
                : 'https://s3-alpha-sig.figma.com/img/2199/9fdd/642c0153fe2c73dee27f5ec93865a83d?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qKiYYUakfdzZXvpffZwzdnhxpvhYLrS9qInp0SH00U7FPMSgla32OF5M6dMLFVkWpozZwyGyzjy4LqC6cB~agXXki1FPzkOYc5j0uA3LRZrD5Mce2COeqTQvTCGhYR6EnaQOPYZD0piEEcUavWva3iwMd2w1oTx3LLj09DTEqM55-hz5LbgszEBPfZ3urPmqJ8XnVeQGvuMz08B9jxU-KhotSIiNYVIvY7FEGiBDfsxyO7H-gCj0NuouhqNaLUkziLNSsDWItA-82a3-l--lmBmmqnN~nJBZFShw1gxm2fNmX9Hvc6PrlbF3Y79aFyOcko6tPc0aqAXphxcTpOKKWQ__'
            }
            alt="kk"
            style={{ borderRadius: '50%', width: '125px', height: '125px' }}
          />
        </Box>
        <Box px={3}>
          <Flex justify="space-between">
            <chakra.h3 fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold">
              {name}
            </chakra.h3>
          </Flex>
          <Box display={"flex"} flexWrap={"wrap"}>

         
          {diagnosis.map((x) => {
            console.log(x)
            return <Text color="gray.500">{x.attributes.name},</Text>;
          })}
           </Box>
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
          Age : {age} years
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
          Email: {email}
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
          {date}
        </Text>
      </GridItem>
      {/* <GridItem colSpan={3} my={5}>
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
          Adolescence diagnosis, Mood diagnosis (depression), Read more...
        </Text>
      </GridItem> */}
    </Grid>
  );
};

export default ProfileKid;
