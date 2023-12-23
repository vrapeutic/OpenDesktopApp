import { useState, useEffect } from 'react';
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
import HeaderSpaceBetween from '../theme/components/HeaderSpaceBetween';
import GeneralInfoModule from '@renderer/features/AddModuleForm/GeneralInfoModule';

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

const Subscriptions: React.FC = () => {
  const totalSteps = 3;
  const [sliding, setSliding] = useState(1);
  const [formData, setFormData] = useState({});

  const handleFormSubmit = (data: any) => {
    setFormData({ ...formData, ...data });
    console.log(formData)
    return { ...formData, ...data };
  };

  const nextHandler = () => {
    if (sliding < totalSteps) {
      setSliding(sliding + 1);
    }
  };

  const backHandler = () => {
    if (sliding > 1) {
      setSliding(sliding - 1);
    }
  };

  const renderFormStep = () => {
    switch (sliding) {
      case 1:
        return (
          <HeaderSpaceBetween
            Title={'therapeutic modules'}
            ButtonText={'Add New Module'}
            onClickFunction={nextHandler}
          />
        );
      case 2:
        return (
          <GeneralInfoModule
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
    
     
      default:
        return null;
    }
  };


  return <>{renderFormStep()}</>;
};

export default Subscriptions;
