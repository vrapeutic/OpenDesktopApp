import { useState, useEffect } from 'react';
import { Box, Flex, Image, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { config } from '../../config';
import axios from 'axios';
import { useAdminContext } from '../../Context/AdminContext';
import GeneralInfoSignup from './GeneralInfoSignup';
import SpecialtySignup from './SpecialtySignup';
import EductionIInfoSignup from './EducationinfoSignup';
import VRapeutic from '../../assets/images/VRapeutic.png';

interface Center {
  id: number;
  attributes: {
    name: string;
    logo: {
      url: string;
    };
    specialties: { id: number; name: string }[];
    children_count: number;
    image?: { url: string }; // Make 'image' property optional
    targeted_skills?: { name: string; id: number }[]; // Make 'targeted_skills' property optional
    technology?: string; // Make 'technology' property optional
  };
}

const Signup: React.FC = () => {
  const totalSteps = 3;
  const [sliding, setSliding] = useState(1);
  const [formData, setFormData] = useState({});
  const handleFormSubmit = (data: any) => {
    // Use the previous state to ensure the latest form data is captured
    setFormData((prevFormData) => ({ ...prevFormData, ...data }));
    console.log(formData); // Logging the form data to the console
    return { ...formData, ...data };
  };

  useEffect(() => {
    console.log('Updated FormData:', formData);
  }, [formData]); // Log data when formData changes

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
          <GeneralInfoSignup
            onSubmit={handleFormSubmit}
            nextHandler={nextHandler}
            backHandler={backHandler}
            sliding={sliding}
            formData={formData}
          />
        );
      case 2:
        return (
          <SpecialtySignup
            onSubmit={handleFormSubmit}
            nextHandler={nextHandler}
            backHandler={backHandler}
            sliding={sliding}
            formData={formData}
          />
        );
      case 3:
        return (
          <EductionIInfoSignup
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

  return (
    <Flex height="inherit" direction={{ base: 'column', md: 'row', lg: 'row' }}>
      <Flex
        pos={{ md: 'sticky' }}
        h="inherit"
        background="#FFFFFF"
        boxShadow="0px 3px 8px rgba(0, 0, 0, 0.08)"
        borderRadius={{
          base: '0px',
          md: '0px 20px 20px 0px',
          lg: '0px 20px 20px 0px',
        }}
      >
        <Box marginX="24px">
          <Flex paddingY="27px">
            <Image src={VRapeutic} />
          </Flex>
        </Box>
      </Flex>
      <Flex height="inherit" flex="1" flexDir="column" bg="#F5F5F5">
        {renderFormStep()}
      </Flex>
    </Flex>
  );
};

export default Signup;
