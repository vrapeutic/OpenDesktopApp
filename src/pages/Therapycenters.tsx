import { getMe } from '../cache';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { config } from '../config';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tag,
  TagLabel,
  Img,
  Flex,
  Text,
  Box,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface Center {
  id: number;
  attributes: {
    name: string;
    logo: {
      url: string;
    };
    specialties: { id: number; name: string }[];
    children_count: number;
  };
}

export default function Therapycenters() {
  const [centersList, setcentersList] = useState<Center[]>([]);

  useEffect(() => {
    getCenters();
  }, []);

  const token = getMe()?.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const getCenters = async () => {
    try {
      const response = await axios.get(
        `${config.apiURL}/api/v1/doctors/home_centers`,
        { headers }
      );
      setcentersList(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(centersList);
  const navigate = useNavigate();

  const handleCenterClick = (center: Center) => {
    console.log('Clicked Center Data:', center);
    navigate('/ViewCenter', { state: center });
  };

  return (
    <Table
      variant="simple"
      background="#FFFFFF"
      style={{ marginLeft: 10, marginRight: 10 }}
    >
      <Thead>
        <Tr>
          <Th> Name</Th>
          <Th>Specialties</Th>
          <Th>Kids</Th>
        </Tr>
      </Thead>
      <Tbody>
        {centersList?.map((center) => (
          <Tr
            key={center.id}
            onClick={() => handleCenterClick(center)}
            cursor={'pointer'}
          >
            <Td>
              <Flex direction="row" gap={2}>
              <Box
                width={197}
                height={197}
                alignItems={'center'}
                display={'flex'}
              >
                <img   src={center?.attributes?.logo?.url}  alt={center?.attributes?.name} />
              </Box>
               
                <Text
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {center?.attributes?.name}
                </Text>
              </Flex>
            </Td>
            <Td>
              {center?.attributes?.specialties?.map((specialty) => (
                <Tag key={specialty.id} size="sm" colorScheme="gray" mr={1}>
                  <TagLabel>{specialty?.name}</TagLabel>
                </Tag>
              ))}
            </Td>
            <Td>{center?.attributes?.children_count}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
