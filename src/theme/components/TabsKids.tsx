import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    GridItem,
    Grid,
    Box,
    Image,
    Text,
  
  } from '@chakra-ui/react';
  import axios from 'axios';
  import { config } from '../../config';
  import { getMe } from '../../cache';
  import { useEffect, useState } from 'react';
  import img from '../../assets/images/Person3.png';
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
  
  const TabsKids = () => {
    const token = getMe()?.token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const [childrenlist, setchildrenlist] = useState<Child[] | undefined>();
    const [Doctorslist, setDoctorlist] = useState<Doctor[] | undefined>();
  
    // const getChildren = async () => {
    //   try {
    //     const response = await axios.get(
    //       `${config.apiURL}/api/v1/centers/${centerData.id}/kids`,
    //       { headers }
    //     );
    //     setchildrenlist(response.data.data);
    //     console.log('children', response.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
  
    // const getDoctors = async () => {
    //   try {
    //     const response = await axios.get(
    //       `${config.apiURL}/api/v1/centers/${centerData.id}/doctors`,
    //       { headers }
    //     );
    //     setDoctorlist(response.data.data);
    //     console.log('doctors', response.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
  
    useEffect(() => {
    //   getDoctors();
    //   getChildren();
    }, []);
  
    return (
      <Tabs py={"23px"} colorScheme="#1C1C1C" >
        <TabList color={"#38383866"} >
          
          <Tab>Recent Activities </Tab>
          <Tab>Doctors</Tab>
          <Tab>Sesion</Tab>
          <Tab>Widgets</Tab>
        </TabList>
  
        <TabPanels>
        <TabPanel>
            <p>Dokkkkkkkkkkkkkkkkkkkors</p>
          </TabPanel>
          <TabPanel>
          <Grid
            py="2"
          
            my="3"
            borderRadius="10px"
            backgroundColor="#FFFFFF"
            templateColumns="repeat(4, 1fr)"
            alignItems="center"
            color="#787486"
            fontSize="14px"
            fontFamily="Graphik LCG"
            fontWeight="500"
            lineHeight="24px"
          >
            <GridItem colSpan={1} style={{ marginLeft: '15px' }}>
              Name
            </GridItem>
            <GridItem colSpan={1} textAlign={'center'}>
            Speciality
            </GridItem>
            <GridItem colSpan={1} textAlign={'center'}>
            Sessions
            </GridItem>
            
            <GridItem colSpan={1} textAlign={'center'}>
            Last activty
            </GridItem>
            
          </Grid>

<TableData/>
          </TabPanel>
          
          <TabPanel>
            <p>Sesion</p>
          </TabPanel>
  
        
          <TabPanel>
            <p>Widgets</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
  };
  
  export default TabsKids;
  const TableData = () => {
    // const navigate = useNavigate();
    // const handleKids = (Kids:any) => {
    //   console.log('Clicked Center Data:', Kids);
    //   navigate('/ViewKids', { state: Kids });
    // };
    return (
      <Grid
        py="3"
        
        my="1"
        borderRadius="10px"
        backgroundColor="#FFFFFF"
        templateColumns="repeat(4, 1fr)"
        alignItems="center"
        color="#787486"
        fontSize="14px"
        fontWeight="500"
        fontFamily="Graphik LCG"
        lineHeight="24px"
        // onClick={()=>handleKids(id)}
      >
        <GridItem colSpan={1} style={{ marginLeft: '15px' }}>
          <Box display={'flex'} alignItems={'center'}>
            <Image
              // boxShadow="base"
              rounded="md"
              // boxSize="80px"
              objectFit="cover"
              src={img}
              alt="VR"
              w="52px"
              h="52px"
            />
            <Text
              fontSize="16"
              textAlign={'start'}
              px="5"
              fontFamily="Graphik LCG"
              color={'#15134B'}
              lineHeight={'16px'}
              letterSpacing={'1.6%'}
            >
            Yahya Alaa Ali
            </Text>
          </Box>
        </GridItem>
        <GridItem
          colSpan={1}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Box
            background={'#F3F3F3'}
            w="120px"
            height={'42px'}
            borderRadius={'10px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Text
              fontSize="16"
              textAlign={'center'}
              px="5"
              fontWeight={'500'}
              fontFamily="Graphik LCG"
              color={'#558888'}
              lineHeight={'16px'}
              letterSpacing={'1.6%'}
            >
              ADHD
            </Text>
          </Box>
        </GridItem>
        <GridItem colSpan={1} textAlign={'center'}>
          <Text
            fontSize="16"
            textAlign={'center'}
            px="5"
            fontFamily="Graphik LCG"
            color={'#15134B'}
            lineHeight={'16px'}
            letterSpacing={'1.6%'}
          >
        3 Sesions
          </Text>
        </GridItem>
      
        <GridItem colSpan={1}>
          <Text
            fontSize="16"
            textAlign={'center'}
            px="5"
            fontFamily="Graphik LCG"
            color={' #595959'}
            lineHeight={'17px'}
            letterSpacing={'1.6%'}
          >
            14 Mon 2022
          </Text>
        </GridItem>
      
      </Grid>
    );
  };