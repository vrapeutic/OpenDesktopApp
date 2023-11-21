import { getMe } from '@renderer/cache';
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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Therapycenters() {
  const [centersList, setcentersList] = useState([]);

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

  const handleCenterClick = (center) => {
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
            <Td
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Flex direction="row" gap={2}>
                <Img
                  src={center?.attributes?.logo?.url}
                  alt={center?.attributes?.name}
                  boxSize="50px"
                  borderRadius="full"
                  mr={2}
                />
                <Text>{center?.attributes?.name}</Text>
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
