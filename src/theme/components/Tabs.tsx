import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  Img,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { config } from '../../config';
import { getMe } from '../../cache';
import { useEffect, useState } from 'react';

interface Doctor {
  id: number;
  attributes: {
    name: string;
    degree: string;
    university: string;
    photo: {
      url: string;
    };
  };
}

interface Child {
  id: number;
  attributes: {
    name: string;
    email: string;
    age: number;
  };
}

const TabsViewCenter = ({ centerData }: { centerData: { id: number } }) => {
  const token = getMe()?.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [childrenlist, setchildrenlist] = useState<Child[] | undefined>();
  const [Doctorslist, setDoctorlist] = useState<Doctor[] | undefined>();

  const getChildren = async () => {
    try {
      const response = await axios.get(
        `${config.apiURL}/api/v1/centers/${centerData.id}/kids`,
        { headers }
      );
      setchildrenlist(response.data.data);
      console.log('children', response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDoctors = async () => {
    try {
      const response = await axios.get(
        `${config.apiURL}/api/v1/centers/${centerData.id}/doctors`,
        { headers }
      );
      setDoctorlist(response.data.data);
      console.log('doctors', response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDoctors();
    getChildren();
  }, []);

  return (
    <Tabs>
      <TabList>
        <Tab>Therapy info</Tab>
        <Tab>Recent Activities </Tab>
        <Tab>Subscriptions</Tab>
        <Tab>Specialists</Tab>
        <Tab>Kids</Tab>
        <Tab>Widgets</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>Therapy info</p>
        </TabPanel>
        <TabPanel>
          <p>Recent Activities</p>
        </TabPanel>
        <TabPanel>
          <p>Subscriptions</p>
        </TabPanel>

        <TabPanel>
          {Doctorslist?.length === 0 ? (
            <Table
              variant="simple"
              background="#FFFFFF"
              style={{ marginLeft: 10, marginRight: 10 }}
            >
              <Thead>
                <Tr>
                  <Th> Name</Th>
                  <Th>degree</Th>
                  <Th>university</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Doctorslist?.map((doctor) => (
                  <Tr key={doctor.id}>
                    <Td>
                      <Flex direction="row" gap={2}>
                        <Img
                          src={doctor?.attributes?.photo?.url}
                          alt={doctor?.attributes?.name}
                          boxSize="50px"
                          borderRadius="full"
                          mr={2}
                        />
                        <Text
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          {doctor?.attributes?.name}
                        </Text>
                      </Flex>
                    </Td>

                    <Td>{doctor?.attributes?.degree}</Td>

                    <Td>{doctor?.attributes?.university}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Text>No Doctors in this center</Text>
          )}
        </TabPanel>
        <TabPanel>
          {childrenlist?.length === 0 ? (
            <Table
              variant="simple"
              background="#FFFFFF"
              style={{ marginLeft: 10, marginRight: 10 }}
            >
              <Thead>
                <Tr>
                  <Th> Name</Th>
                  <Th>email</Th>
                  <Th>age</Th>
                </Tr>
              </Thead>
              <Tbody>
                {childrenlist?.map((child) => (
                  <Tr key={child.id}>
                    <Td>{child?.attributes?.name}</Td>

                    <Td>{child?.attributes?.email}</Td>

                    <Td>{child?.attributes?.age}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Text>No Kids in this center</Text>
          )}
        </TabPanel>
        <TabPanel>
          <p>Widgets</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabsViewCenter;
