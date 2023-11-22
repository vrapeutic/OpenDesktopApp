import { PropsWithChildren } from 'react';
import { chakra, Stack, Flex, Text, Image, Icon, StackProps, Tag, TagLabel, Grid, GridItem, Link, HStack } from '@chakra-ui/react';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

const CardWithLogo = (centerData: { centerData: { attributes: any } }) => {
  const facebookLink = centerData?.centerData?.attributes?.center_social_links.find(
    (link: { link_type: string }) => link.link_type === 'facebook'
  );
  const linkedinLink = centerData?.centerData?.attributes?.center_social_links.find(
    (link: { link_type: string }) => link.link_type === 'linkedin'
  );

  return (
    <Grid
      templateColumns="repeat(8, 1fr) repeat(2, 1fr) repeat(2, 1fr)"
      gap={4}
      background="#FFFFFF"
    >
      <GridItem colSpan={7} p={4}>
        <Stack
          spacing={{ base: 0, md: 4 }}
          direction={{ base: 'column', md: 'row' }}
          p={2}
          overflow="hidden"
          pos="relative"
        >
          <Flex>
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
              <chakra.h3 fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold">
                {centerData?.centerData.attributes?.name}
              </chakra.h3>
            </Flex>

            <Flex color="gray.500">
              {centerData?.centerData?.attributes?.specialties?.map(
                (specialty: { id: number; name: string }) => (
                  <Tag key={specialty.id} size="sm" colorScheme="gray" mr={1}>
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
                Ceo : Mostafa Elzohry
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </GridItem>

      <GridItem colSpan={3}>
        <Text>Contact us</Text>
        <Text>Email: {centerData?.centerData.attributes?.email}</Text>
        <Text>Cal : {centerData?.centerData.attributes?.phone_number}</Text>

        <Flex direction="row" gap={2}>
          <Link display="inline" color="#3961FB" href={facebookLink?.link}>
            <IconButton>
              <Icon as={FaFacebook} w={4} h={4} />
            </IconButton>
          </Link>

          <Link display="inline" color="#3961FB" href={linkedinLink?.link}>
            <IconButton>
              <Icon as={FaLinkedin} w={4} h={4} />
            </IconButton>
          </Link>

          <Link display="inline" color="#3961FB" href={linkedinLink?.link}>
            <IconButton>
              <Icon as={FaTwitter} w={4} h={4} />
            </IconButton>
          </Link>
        </Flex>
      </GridItem>
      <GridItem colSpan={2}>
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
