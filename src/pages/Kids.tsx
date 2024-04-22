import React, { useState } from 'react';
import { Box, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import HeaderSpaceBetween from '@renderer/theme/components/HeaderSpaceBetween';
import img from '../assets/images/Person3.png';
import GeneralInfoFormKids from '@renderer/features/AddCenterForm/GeneralInformKids';
import SpecialtyForm from '@renderer/features/AddCenterForm/SpecialtyForm';
import EductionIInfoForm from '@renderer/features/AddCenterForm/EductionIInfoForm';
import ContactForm from '@renderer/features/AddCenterForm/ContactForm';





interface Kides {
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





export default function Kids() {

  const totalSteps = 5;
  const [sliding, setSliding] = useState(1);
  const [formData, setFormData] = useState({});
  const [centersList, setCentersList] = useState<Kides[]>([]);
  const [showTable, setShowTable] = useState(true);
  const renderFormStep = () => {
    switch (sliding) {
      case 2:
        return (
          <GeneralInfoFormKids
            onSubmit={handleFormSubmit}
            nextHandler={nextHandler}
            backHandler={backHandler}
            sliding={sliding}
          />
        );
      case 3:
        return (
          <SpecialtyFormModule
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
  const handleFormSubmit = (data: any) => {
    setFormData({ ...formData, ...data });
    return { ...formData, ...data };
  };

  return (
    <>{showTable?<>
    <HeaderSpaceBetween
        Title=" Kids"
        ButtonText="Add New Kids"
        onClickFunction={nextHandler}
      />
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
          Jion in
        </GridItem>
        <GridItem colSpan={1} textAlign={'center'}>
          Sessions{' '}
        </GridItem>
      </Grid>
      <TableData />
    
    </>:<>
    
   { renderFormStep()}
    
    
    </>
    }

  
      

     
    </>
  );
}
 interface  TableData{    
  name: string;
  age: any;
  diagnosis: string;
  jion_in: string;
  sessions: string;
  
 }
const TableData = () => {
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
            Yahya Alaa
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
          6 Years
        </Text>
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
          450
        </Text>
      </GridItem>
    </Grid>
  );
};
