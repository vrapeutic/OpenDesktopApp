
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  Button,
  Grid,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../cache';
import ContactForm from '../features/AddCenterForm/ContactForm';
import EductionIInfoForm from '../features/AddCenterForm/EductionIInfoForm';
import GeneralInfoForm from '../features/AddCenterForm/GeneralInfoForm';
import SpecialtyForm from '../features/AddCenterForm/SpecialtyForm';

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

const TherapyCenters: React.FC = () => {
  const totalSteps = 5;
  const [sliding, setSliding] = useState(1);
  const [formData, setFormData] = useState({});
  const [centersList, setCentersList] = useState<Center[]>([]);
  const [showTable, setShowTable] = useState(true);

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
      setCentersList(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = (data: any) => {
    setFormData({ ...formData, ...data });
    return { ...formData, ...data };
  };

  const nextHandler = () => {
    if (sliding < totalSteps) {
      setSliding(sliding + 1);
      setShowTable(false);
    }
  };

  const backHandler = () => {
    if (sliding > 1) {
      setSliding(sliding - 1);
      if (sliding === 2) {
        setSliding(sliding - 1);
        setShowTable(true);
      }
    }
  };

  const renderFormStep = () => {
    switch (sliding) {
      case 2:
        return (
          <GeneralInfoForm
            onSubmit={handleFormSubmit}
            nextHandler={nextHandler}
            backHandler={backHandler}
            sliding={sliding}
          />
        );
      case 3:
        return (
          <SpecialtyForm
            onSubmit={handleFormSubmit}
            nextHandler={nextHandler}
            backHandler={backHandler}
            sliding={sliding}
          />
        );
      case 4:
        return (
          <EductionIInfoForm
            onSubmit={handleFormSubmit}
            nextHandler={nextHandler}
            backHandler={backHandler}
            sliding={sliding}
          />
        );
      case 5:
        return (
          <ContactForm
            onSubmit={handleFormSubmit}
            nextHandler={nextHandler}
            backHandler={backHandler}
            sliding={sliding}
            formData={formData}
          />
        );
      default:
        return null;
    }
  };

  const renderTable = () => {
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
                    <img
                      src={center?.attributes?.logo?.url}
                      alt={center?.attributes?.name}
                    />
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
  };

  const navigate = useNavigate();

  const handleCenterClick = (center: Center) => {
    console.log('Clicked Center Data:', center);
    navigate('/ViewCenter', { state: center });
  };

  const renderTableOrForm = () => {
    if (sliding === 1) {
      return (
        <>
          <Grid
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: sliding === 1 ? '0' : '55px',
            }}
          >
            <Text
              padding="12px 24px"
              borderRadius="8px"
              fontSize="14px"
              fontFamily="Roboto"
            >
              Therapy Centers
            </Text>

            <Button
              w="143px"
              h="40px"
              ml="24px"
              mt="55px"
              padding="12px 24px"
              bg="#F5B50E"
              borderRadius="8px"
              fontSize="14px"
              fontFamily="Roboto"
              onClick={() => nextHandler()}
              boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
            >
              Add Therapy
            </Button>
          </Grid>
          {showTable && renderTable()}
        </>
      );
    } else {
      return renderFormStep();
    }
  };

  return <>{renderTableOrForm()}</>;
};

export default TherapyCenters;
