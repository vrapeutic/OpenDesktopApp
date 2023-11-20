import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, Img, Tag, TagLabel } from '@chakra-ui/react';

export default function CardWithLogo(centerData) {
    console.log(centerData.centerData)
      console.log(centerData?.centerData.attributes?.logo?.url)

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
    >
      <Img
        objectFit="cover"
        maxW={{ base: '100%', sm: '200px' }}
        src={centerData?.centerData.attributes?.logo?.url}
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Heading size="md">{centerData?.centerData.attributes?.name}</Heading>

          <Text py="2">
            Caffè latte is a coffee beverage of Italian origin made with
            espresso and steamed milk.
          </Text>
        </CardBody>

        <CardFooter>
          {/* <Button variant="solid" colorScheme="blue">
            Buy Latte
          </Button>
          <Button variant="solid" colorScheme="blue">
            Buy Latte
          </Button> */}
           {centerData?.centerData?.attributes?.specialties?.map((specialty) => (
                <Tag key={specialty.id} size="sm" colorScheme="gray" mr={1}>
                  <TagLabel>{specialty?.name}</TagLabel>
                </Tag>
              ))}
        </CardFooter>
      </Stack>
      <Text>
        Ceo : Mostafa Elzohry
      </Text>
    </Card>
  );
}
