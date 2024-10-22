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
  Heading,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../cache';
import ContactForm from '../features/AddCenterForm/ContactForm';
import EductionIInfoForm from '../features/AddCenterForm/EductionIInfoForm';
import GeneralInfoForm from '../features/AddCenterForm/GeneralInfoForm';
import SpecialtyForm from '../features/AddCenterForm/SpecialtyForm';
import HeaderSpaceBetween from '@renderer/theme/components/HeaderSpaceBetween';

interface Center {
  id: number;
  attributes: {
    name: string;
    logo: {
      url: string;
    };
    specialties: { id: number; name: string }[];
    children_number: number;
  };
  relationships:{specialties: { id: number; name: string }[];}

}

const TherapyCenters: React.FC = () => {
  const totalSteps = 5;
  const [sliding, setSliding] = useState(1);
  const [formData, setFormData] = useState({});
  const [centersList, setCentersList] = useState<Center[]>([]);
  const [includes, setIncludes] = useState([]);
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
        `${config.apiURL}/api/v1/doctors/home_centers?include=center_social_links,specialties`,
        { headers }
      );
      setCentersList(response.data.data);
      setIncludes(response.data.included);
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
            formData={formData}
          />
        );
      case 3:
        return (
          <SpecialtyForm
            onSubmit={handleFormSubmit}
            nextHandler={nextHandler}
            backHandler={backHandler}
            sliding={sliding}
            formData={formData}
          />
        );
      case 4:
        return (
          <EductionIInfoForm
            onSubmit={handleFormSubmit}
            nextHandler={nextHandler}
            backHandler={backHandler}
            sliding={sliding}
            formData={formData}
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
  console.log(centersList[0]?.relationships?.specialties    ,"testjhghegfhjgjhgfh")
    return (
      <>
        {centersList.length == 0 ? (
          <Box textAlign="center" py={10} px={6}>
            <Heading fontSize="2rem" mt={3} mb={2}>
              You don't have Centers yet
            </Heading>
          </Box>
        ) : (
          <Box mx={18}>

          
          <Table variant="simple" background="#FFFFFF" cursor={"pointer"} >
            <Thead  cursor={"pointer"}>
              <Tr  cursor={"pointer"}>
                <Th  cursor={"pointer"}> Name</Th>
                <Th  cursor={"pointer"}>Specialties</Th>
                <Th  cursor={"pointer"}>Kids</Th>
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
                    {center?.relationships?.specialties?.data.map((specialty:any) => (
                      <Tag
                        key={specialty.id}
                        size="sm"
                        colorScheme="gray"
                        mr={1}
                      >
                        <TagLabel>{specialty?.name}</TagLabel>
                      </Tag>
                    ))}
                  </Td>
                  <Td>{center?.attributes?.children_number}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          </Box>
        )}
      </>
    );
  };

  const navigate = useNavigate();

  const handleCenterClick = (center: Center) => {
    console.log('Clicked Center Data:', center);
    navigate('/ViewCenter', { state: { center: center, includes: includes } });
  };

  const renderTableOrForm = () => {
    if (sliding === 1) {
      return (
        <>
          <HeaderSpaceBetween
            Title="Therapy Centers"
            ButtonText="Add Therapy Center"
            onClickFunction={nextHandler}
          />
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
