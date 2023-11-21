// import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, Img, Tag, TagLabel } from '@chakra-ui/react';

// export default function CardWithLogo(centerData) {
//     console.log(centerData.centerData)
//       console.log(centerData?.centerData.attributes?.logo?.url)

//   return (
//     <Card
//       direction={{ base: 'column', sm: 'row' }}
//       overflow="hidden"
//       variant="outline"
//     >
//       <Img
//         objectFit="cover"
//         maxW={{ base: '100%', sm: '200px' }}
//         src={centerData?.centerData.attributes?.logo?.url}
//         alt="Caffe Latte"
//       />

//       <Stack>
//         <CardBody>
//           <Heading size="md">{centerData?.centerData.attributes?.name}</Heading>

//           <Text py="2">
//             Caffè latte is a coffee beverage of Italian origin made with
//             espresso and steamed milk.
//           </Text>
//         </CardBody>

//         <CardFooter>
//           {/* <Button variant="solid" colorScheme="blue">
//             Buy Latte
//           </Button>
//           <Button variant="solid" colorScheme="blue">
//             Buy Latte
//           </Button> */}
//            {centerData?.centerData?.attributes?.specialties?.map((specialty) => (
//                 <Tag key={specialty.id} size="sm" colorScheme="gray" mr={1}>
//                   <TagLabel>{specialty?.name}</TagLabel>
//                 </Tag>
//               ))}
//         </CardFooter>
//       </Stack>
//       <Text>
//         Ceo : Mostafa Elzohry
//       </Text>
//     </Card>
//   );
// }

import { PropsWithChildren, Fragment } from 'react';
import {
  chakra,
  Box,
  Stack,
  VStack,
  HStack,
  Flex,
  Text,
  Image,
  Container,
  Icon,
  StackProps,
  Tag,
  TagLabel,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { AiOutlineHeart, AiOutlineExclamationCircle } from 'react-icons/ai';
import { BsTelephoneX } from 'react-icons/bs';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

interface ProductCardProps {
  id: number;
  title: string;
  detail: string[];
  location: string;
  updated_at: string;
  price: string;
  image: string;
  isFeatured?: boolean;
}

const productsList: ProductCardProps[] = [
  {
    id: 1,
    title: 'Ford F-150 SUV 2021',
    location: 'Paris',
    detail: ['2021', 'Petrol', '4500 cc', 'Automatic'],
    updated_at: '17 days ago',
    price: '$ 400k',
    image:
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
  },
];

const CardWithLogo = (centerData) => {
  console.log(centerData);
  return (
    <Grid
      templateColumns="repeat(8, 1fr) repeat(2, 1fr) repeat(2, 1fr)"
      gap={4}
      background="#FFFFFF"
    >
      <GridItem colSpan={8} p={4}>
        <Container maxW="7xl" p={{ base: 5, md: 12 }} margin="0 auto">
          {/* <VStack spacing={4}> */}
          {productsList.map((product, index) => (
            // <Flex
            //   key={index}
            //   justify="space-between"
            //   w="100%"
            //   mb={{ base: 4, md: 8 }}
            // >
            <Stack
              spacing={{ base: 0, md: 4 }}
              direction={{ base: 'column', md: 'row' }}
              border="1px solid"
              borderColor="gray.400"
              p={2}
              // rounded="md"
              // w={{ base: 'auto', md: '2xl' }}
              overflow="hidden"
              pos="relative"
            >
              <Flex ml="0 !important">
                <Image
                  rounded="md"
                  w={{ base: '100%', md: '18rem' }}
                  h="auto"
                  objectFit="cover"
                  src={centerData?.centerData.attributes?.logo?.url}
                  alt="product image"
                />
              </Flex>
              <Stack
                direction="column"
                spacing={2}
                w="100%"
                mt={{ base: '5px !important', sm: 0 }}
              >
                <Flex justify="space-between">
                  <chakra.h3
                    fontSize={{ base: 'lg', md: 'xl' }}
                    fontWeight="bold"
                  >
                    {centerData?.centerData.attributes?.name}
                  </chakra.h3>
                  <chakra.h3
                    fontSize={{ base: 'lg', md: 'xl' }}
                    fontWeight="bold"
                  >
                    {product.price}
                  </chakra.h3>
                </Flex>
                <Box>
                  <Text fontSize="lg" fontWeight="500">
                    {product.location}
                  </Text>
                </Box>
                <Flex color="gray.500">
                  {centerData?.centerData?.attributes?.specialties?.map(
                    (specialty) => (
                      <Tag
                        key={specialty.id}
                        size="sm"
                        colorScheme="gray"
                        mr={1}
                      >
                        <TagLabel>{specialty?.name}</TagLabel>{' '}
                      </Tag>
                    )
                  )}
                </Flex>
                <Stack
                  direction={{ base: 'column-reverse', sm: 'row' }}
                  justify="space-between"
                  alignItems={{ base: 'flex-start', sm: 'center' }}
                >
                  <Text fontSize="sm" mt={{ base: 1, sm: 0 }}>
                    Ceo : {product.updated_at}
                  </Text>
                  <Stack direction="row" spacing={1} mb="0 !important">
                    <IconButton>
                      <Icon as={AiOutlineHeart} w={4} h={4} />
                    </IconButton>
                    <IconButton spacing={2} bg="green.500" color="white">
                      <Icon as={BsTelephoneX} w={4} h={4} />
                      <Text fontSize="sm">Show Phone no.</Text>
                    </IconButton>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            // </Flex>
          ))}
          {/* </VStack> */}
        </Container>
      </GridItem>

      <GridItem colSpan={2} p={4}>
        <Text>Contact us</Text>
        <Text>Email: {centerData?.centerData.attributes?.email}</Text>
        <Text>Cal : {centerData?.centerData.attributes?.phone_number}</Text>

        <Flex direction="row" gap={2}>
          <IconButton>
            <Icon as={FaFacebook} w={4} h={4} />
          </IconButton>
          <IconButton>
            <Icon as={FaLinkedin} w={4} h={4} />
          </IconButton>
          <IconButton>
            <Icon as={FaTwitter} w={4} h={4} />
          </IconButton>
        </Flex>
      </GridItem>

      <GridItem colSpan={2} p={4}>
        <Text>Tax ID : {centerData?.centerData.attributes?.tax_id}</Text>
      </GridItem>
    </Grid>
  );
};

const IconButton = ({ children, ...props }: PropsWithChildren<StackProps>) => {
  return (
    <HStack
      cursor="pointer"
      border="1px solid"
      borderColor="gray.300"
      px={2}
      py="0.15rem"
      alignItems="center"
      rounded="sm"
      spacing={2}
      {...props}
    >
      {children}
    </HStack>
  );
};

export default CardWithLogo;
