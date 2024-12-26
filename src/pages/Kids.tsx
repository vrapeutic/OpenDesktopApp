import React, { useContext, useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import HeaderSpaceBetween from '@renderer/theme/components/HeaderSpaceBetween';
import img from '../assets/images/Person3.png';
import GeneralInfoFormKids from '@renderer/features/AddKids/GeneralInformKids';
import { config } from '../config';
import { dataContext } from '@renderer/shared/Provider';
import { useNavigate } from 'react-router-dom';
import { useAdminContext } from '@renderer/Context/AdminContext';
import { MyContext } from '@renderer/theme/ContextHelper';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

interface Kids {
  id: number;
  attributes: {
    name: string;
    email: string;
    age: string;
  };
  relationships: {
    diagnoses: {
      data: {
        id: number;
      }[];
    };
  };
}

export default function Kids() {
  const totalSteps = 5;
  const [sliding, setSliding] = useState(1);
  const [formData, setFormData] = useState({});
  const [kidsList, setKidsList] = useState<Kids[]>([]);
  const [showTable, setShowTable] = useState(true);
  const [included, setIncluded] = useState([]);
  const [error, setError] = useState<string | null>(null); // State for error handling
  const [loading, setLoading] = useState(false);
  const context = useContext(MyContext);
  const selectedCenter = useContext(dataContext);
  const { t } = useTranslation();

  const {
    isOpen: isOpenCongratulations,
    onOpen: onOpenCongratulations,
    onClose: onDeleteCongratulations,
  } = useDisclosure();

  const renderFormStep = () => {
    switch (sliding) {
      case 2:
        return (
          <GeneralInfoFormKids
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
      try {
        const token = await (window as any).electronAPI.getPassword('token');
        setLoading(true);

        // Construct the correct API URL based on context
        const url = !context.state.is_center_admin
          ? `${config.apiURL}/api/v1/doctors/children?q[centers_id_eq]=${selectedCenter.id}&include=diagnoses,sessions`
          : `${config.apiURL}/api/v1/centers/${selectedCenter.id}/kids?include=diagnoses,sessions`;

        // Make the request using axios
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Check if data exists in the response
        if (response.data && response.data.data) {
          console.log('results', response.data.data);
          setKidsList(response.data.data);
          setIncluded(response.data.included);
        } else {
          setError('Failed to fetch kids data');
        }
      } catch (error) {
        console.error('Error:', error);
        setError(
          error.response?.data?.message || error.message || 'An error occurred'
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedCenter.id, sliding]);

  console.log('kises', kidsList[0], kidsList[1], included);
  return (
    <>
      {showTable ? (
        <>
          <HeaderSpaceBetween
            Title={t('kids')}
            ButtonText={context.state.is_center_admin && t('addNewKids')}
            onClickFunction={nextHandler}
            backbutton={backHandler}
          />

          {selectedCenter.id ? (
            loading ? (
              <Flex justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
              </Flex>
            ) : error ? (
              <Flex justifyContent="center">
                <Text
                  fontSize="14px"
                  fontWeight="500"
                  fontFamily="Graphik LCG"
                  color="red"
                >
                  {error}
                </Text>
              </Flex>
            ) : (
              <>
                {kidsList.length > 0 ? (
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
                      cursor={'pointer'}
                    >
                      <GridItem colSpan={1} style={{ marginLeft: '15px' }}>
                        {t('name')}
                      </GridItem>
                      <GridItem colSpan={1} textAlign={'center'}>
                        {t('age')}
                      </GridItem>
                      <GridItem colSpan={1} textAlign={'center'}>
                        {t('diagnoses')}
                      </GridItem>
                      <GridItem colSpan={1} textAlign={'center'}>
                        {t('joinIn')}
                      </GridItem>
                      <GridItem colSpan={1} textAlign={'center'}>
                        {t('sessions')}
                      </GridItem>
                    </Grid>
                    {kidsList.map((kid) => {
                      console.log(kid, 'kid test');
                      return (
                        <TableData
                          key={kid.id}
                          all={kid}
                          id={kid.id}
                          name={kid.attributes.name}
                          age={kid.attributes.age}
                          included={included}
                          data={kid?.relationships?.diagnoses?.data}
                        />
                      );
                    })}
                  </>
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
                    cursor={'pointer'}
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
                        {t('noKids')}
                      </Text>
                    </GridItem>
                  </Grid>
                )}
              </>
            )
          ) : (
            <Flex justifyContent="center">
              <Text fontSize="14px" fontWeight="500" fontFamily="Graphik LCG">
                {t('selectCenter')}
              </Text>
            </Flex>
          )}
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
  data?: any;
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
  const { t } = useTranslation();

  const handleKids = (Kids: any) => {
    navigate('/ViewKids', { state: all });
  };

  const x: any[] = all?.relationships?.diagnoses?.data;

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
  const context = useContext(MyContext);

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
      onClick={() => {
        context.state.is_center_admin ? handleKids(all) : null;
      }}
      cursor={'pointer'}
    >
      <GridItem colSpan={1} style={{ marginLeft: '15px' }}>
        <Box display={'flex'} alignItems={'center'}>
          <Image
            rounded="md"
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
          {age} {t('years')}
        </Text>
      </GridItem>
      <GridItem
        colSpan={1}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box>
          {result.map((x: any) => (
            <Box
              key={x.id} // Added unique key here
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
          ))}
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
