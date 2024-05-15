import React, { useContext, useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import HeaderSpaceBetween from '@renderer/theme/components/HeaderSpaceBetween';
import img from '../assets/images/Person3.png';
import GeneralInfoFormKids from '@renderer/features/AddKids/GeneralInformKids';

import { config } from '../config';
import { dataContext } from '@renderer/shared/Provider';
import { useNavigate } from 'react-router-dom';

interface Kids {
  id: number;
  attributes: {
    name: string;
    email: string;
    age: string;
  };
}

export default function Kids() {
  const totalSteps = 5;
  const [sliding, setSliding] = useState(1);
  const [formData, setFormData] = useState({});
  const [kidsList, setKidsList] = useState<Kids[]>([]);
  const [showTable, setShowTable] = useState(true);
  const [included, setIncluded] = useState([]);
  const selectedCenter = useContext(dataContext);

  const {
    isOpen: isOpenCongratulations,
    onOpen: onOpenCongratulations,
    onClose: onDeleteCongratulations,
  } = useDisclosure();

  // const handleCloseModal = () => {
  //   onDeleteCongratulations();
  //   setShowTable(true);
  //   console.log('handle succcess');
  // };
  const renderFormStep = () => {
    switch (sliding) {
      case 2:
        return (
          <>
            <GeneralInfoFormKids
              onSubmit={handleFormSubmit}
              nextHandler={nextHandler}
              backHandler={backHandler}
              sliding={sliding}
              formData={formData}
            />
          </>
        );

      default:
        return null;
    }
  };
  const nextHandler = () => {
    if (sliding < totalSteps) {
      setSliding(sliding + 1);
      setShowTable(false);
      onOpenCongratulations();
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
  const handleFormSubmit = (data: any) => {
    setFormData({ ...formData, ...data });

    return { ...formData, ...data };
  };
  useEffect(() => {
    (async () => {
      const token = await (window as any).electronAPI.getPassword('token');

      fetch(
        `${config.apiURL}/api/v1/centers/${selectedCenter.id}/kids?include=diagnoses,sessions`,
        {
          method: 'Get',
          redirect: 'follow',
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log('all results', result);
          if (result.data) {
            setKidsList(result.data);
            setIncluded(result.included);
            console.log(result.data.length);
          }
        })

        .catch((error) => console.log('error', error));
    })();
  }, []);

  return (
    <>
      {showTable ? (
        <>
          <HeaderSpaceBetween
            Title=" Kids"
            ButtonText="Add New Kids"
            onClickFunction={nextHandler}
          />
         
          {selectedCenter.id ?
<>
<Grid
            py="2"
            mx="18"
            my="3"
            borderRadius="10px"
            backgroundColor="#FFFFFF"
            templateColumns="repeat(5, 1fr)"
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
              Age
            </GridItem>
            <GridItem colSpan={1} textAlign={'center'}>
              Diagnosis
            </GridItem>
            <GridItem colSpan={1} textAlign={'center'}>
              Join in
            </GridItem>
            <GridItem colSpan={1} textAlign={'center'}>
              Sessions{' '}
            </GridItem>
          </Grid>
           { kidsList.map((kid: any) => {

              return (
                <>
                  {kidsList.length >0 ? (
                    <TableData
                      all={kid}
                      id={kid.id}
                      name={kid.attributes.name}
                      age={kid.attributes.age}
                      included={included}
                      data={kid.relationships.diagnoses.data}
                    />
                  ) : (
                    <Grid
                      py="3"
                      mx="18"
                      my="1"
                      borderRadius="10px"
                      backgroundColor="#FFFFFF"
                      templateColumns="repeat(5, 1fr)"
                      alignItems="center"
                      color="#787486"
                      fontSize="14px"
                      fontWeight="500"
                      fontFamily="Graphik LCG"
                      lineHeight="24px"
                    >
                      <GridItem
                        colSpan={5}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Text
                          fontSize="14px"
                          fontWeight="500"
                          fontFamily="Graphik LCG"
                        >
                          There are no Kids
                        </Text>
                      </GridItem>
                    </Grid>
                  )}
                </>
              );
            })
            }
            
          
            </>       
           : <Flex justifyContent={"center"} >
            <Text  fontSize="14px"
                          fontWeight="500"
                          fontFamily="Graphik LCG"> Please Select Center</Text>
            </Flex> }
        </>
      ) : (
        <>{renderFormStep()}</>
      )}
    </>
  );
}
interface TableData {
  name: string;
  age: any;
  diagnosis?: string;
  jion_in?: string;
  sessions?: string;
  id: any;
  all?: any;
  included?: any;
  data: any;
}
const TableData: React.FC<TableData> = ({
  all,
  name,
  age,
  id,
  included,
  data,
}) => {
  const [date, setDate] = useState('');
  const navigate = useNavigate();
  const handleKids = (Kids: any) => {
    navigate('/ViewKids', { state: all });
  };

  const x: any[] = all.relationships.diagnoses.data;
  console.log(all.relationships.sessions.data.length);
  const filterByReference = ({
    included,
    x,
  }: {
    included: any[];
    x: any[];
  }) => {
    let res = [];
    res = included.filter((el: any) => {
      return x.find((element: any) => {
        return element.id === el.id;
      });
    });

    return res;
  };

  const result = filterByReference({ included, x });

  useEffect(() => {
    const transformedDate = new Date(all.attributes.created_at); // Transform the date once when the component mounts

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const formattedDate =
      transformedDate.getDate() +
      ' ' +
      months[transformedDate.getMonth()] +
      ' ' +
      transformedDate.getFullYear();

    setDate(formattedDate); // Update the state with the transformed date
  }, [all.attributes.created_at]);

  return (
    <Grid
      py="3"
      mx="18"
      my="1"
      borderRadius="10px"
      backgroundColor="#FFFFFF"
      templateColumns="repeat(5, 1fr)"
      alignItems="center"
      color="#787486"
      fontSize="14px"
      fontWeight="500"
      fontFamily="Graphik LCG"
      lineHeight="24px"
      onClick={() => handleKids(all)}
    >
      <GridItem colSpan={1} style={{ marginLeft: '15px' }}>
        <Box display={'flex'} alignItems={'center'}>
          <Image
            // boxShadow="base"
            rounded="md"
            // boxSize="80px"
            objectFit="cover"
            src={all.attributes.photo_url ? all.attributes.photo_url : img}
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
            {name}
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
          {age} Years
        </Text>
      </GridItem>
      <GridItem
        colSpan={1}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box>
          {result.map((x: any) => {
            return (
              <Box
                background={'#F3F3F3'}
                minWidth="100px"
                w={'205px'}
                height={'42px'}
                borderRadius={'10px'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                mb={3}
              >
                <Text
                  fontSize="13"
                  textAlign={'center'}
                  px="5"
                  fontWeight={'500'}
                  fontFamily="Graphik LCG"
                  color={'#558888'}
                  lineHeight={'16px'}
                  letterSpacing={'1.6%'}
                >
                  {x.attributes.name}
                </Text>
              </Box>
            );
          })}
        </Box>
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
          {date}
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
          {all.relationships.sessions.data.length}
        </Text>
      </GridItem>
    </Grid>
  );
};
