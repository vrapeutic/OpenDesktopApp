import { PropsWithChildren } from 'react';
import {
  chakra,
  Stack,
  Flex,
  Text,
  Image,
  Icon,
  StackProps,
  Tag,
  TagLabel,
  Grid,
  GridItem,
  Box,
  Link,
  IconButton,
} from '@chakra-ui/react';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { getMe } from '@renderer/cache';

const CardWithLogo = (centerData: { centerData: { attributes: any } }) => {
  const token = getMe()?.token;
  let facebookLink;
  let linkedinLink;
  if (token) {
    facebookLink = centerData?.centerData?.attributes?.center_social_links.find(
      (link: { link_type: string }) => link.link_type === 'facebook'
    );
    linkedinLink = centerData?.centerData?.attributes?.center_social_links.find(
      (link: { link_type: string }) => link.link_type === 'twitter'
    );
  }

  return (
    <Grid
      templateColumns="repeat(8, 1fr) repeat(2, 1fr) repeat(2, 1fr)"
      gap={4}
      mx={18}
      my={5}
      background="#FFFFFF"
    >
      <GridItem colSpan={4} p={4}>
        <Stack
          spacing={{ base: 0, md: 4 }}
          direction={{ base: 'column', md: 'row' }}
          p={2}
          overflow="hidden"
          pos="relative"
        >
          <Box alignItems={'center'} display={'flex'}>
            <img
              src={Module?.Module.attributes?.image?.url}
              alt={Module?.Module.attributes?.name}
            />
          </Box>
          <Stack
            direction="column"
            spacing={2}
            w="100%"
            mt={{ base: '5px !important', sm: 0 }}
          >
            <Flex justify="space-between">
              <chakra.h3 fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold">
                {Module?.Module.attributes?.name}
              </chakra.h3>
            </Flex>

            <Flex color="gray.500">
              {Module?.Module?.attributes?.specialties?.map(
                (specialty: { id: number; name: string }) => (
                  <Tag key={specialty.id} size="sm" colorScheme="gray" mr={1}>
                    <TagLabel>{specialty?.name}</TagLabel>{' '}
                  </Tag>
                )
              )}
            </Flex>
          </Stack>
        </Stack>
      </GridItem>

      <GridItem colSpan={3}>
        <Text>Contact us</Text>
        <Text>Email: {centerData?.centerData.attributes?.email}</Text>
        <Text>Cal : {centerData?.centerData.attributes?.phone_number}</Text>
        {token && (
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
        )}
      </GridItem>
      <GridItem colSpan={4}>
        <Text my={2}>
          Age Range: {Module?.Module.attributes?.min_age} -{' '}
          {Module?.Module.attributes?.max_age} years
        </Text>
        <Text my={2}> Version : {Module?.Module.attributes?.version}</Text>
        <Text my={2}>
          {' '}
          Technology : {Module?.Module.attributes?.technology}
        </Text>
        <Text my={2}>
          {' '}
          Package_name : {Module?.Module.attributes?.package_name}
        </Text>
      </GridItem>
      <GridItem colSpan={4}>
        <Text my={2}>
          Specialties :{' '}
          {Module?.Module?.attributes.targeted_skills?.map((skill: any) => (
            <Tag key={skill.id} size="sm" colorScheme="gray" mr={1} my={1}>
              <TagLabel>{skill?.name}</TagLabel>
            </Tag>
          ))}
        </Text>
      </GridItem>
    </Grid>
  );
};

export default CardWithLogo;
