import { useState, useEffect } from 'react';
import HeaderSpaceBetween from '../theme/components/HeaderSpaceBetween';
import GeneralInfoModule from '../features/AddModuleForm/GeneralInfoModule';
import SpecialtyFormModule from '../features/AddModuleForm/SpecialityFormModule';
import {
  Box,
  Button,
  Flex,
  Table,
  Tag,
  TagLabel,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import ModuleModal from '../features/auth/components/ModuleModal';
import { useNavigate } from 'react-router-dom';
import { config } from '../config';
import axios from 'axios';
import { useAdminContext } from '../Context/AdminContext';

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

const Theraputicmodules: React.FC = () => {
  const totalSteps = 3;
  const [sliding, setSliding] = useState(1);
  const [formData, setFormData] = useState({});
  const [softwaremodules, setsoftwaremodules] = useState<Center[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const navigate = useNavigate();

  const { otp } = useAdminContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const handleCloseModal = () => {
    onClose();
  };

  useEffect(() => {
    getModules();
  }, []);

  const headers = {
    otp: `${otp}`,
  };
  const getModules = async () => {
    try {
      const response = await axios.get(
        `${config.apiURL}/api/v1/software_modules`,
        { headers }
      );
      console.log('response modules', response);
      setsoftwaremodules(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log('software modules state', softwaremodules);
  const renderFormStep = () => {
    switch (sliding) {
      case 1:
        return (
          <>
            <HeaderSpaceBetween
              Title={'therapeutic modules'}
              ButtonText={'Add New Module'}
              onClickFunction={nextHandler}
            />
            {onOpen && (
              <ModuleModal
                isOpen={isOpen}
                onClose={handleCloseModal}
                selectedModuleId={selectedModuleId}
              />
            )}
            <Table variant="simple" background="#FFFFFF">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Assign</Th>
                  <Th>Specialties</Th>
                  <Th>Technology</Th>
                </Tr>
              </Thead>
              <Tbody>
                {softwaremodules?.map((Module) =>
                  Module?.attributes.image?.url ? (
                    <Tr key={Module.id} cursor={'pointer'}>
                      <Td>
                        <Flex direction="row" gap={2}>
                          <Box
                            width={197}
                            height={197}
                            alignItems={'center'}
                            display={'flex'}
                          >
                            <img
                              src={Module?.attributes.image?.url}
                              alt={Module?.attributes.name}
                            />
                          </Box>
                          <Text
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            {Module?.attributes.name}
                          </Text>
                        </Flex>
                      </Td>
                      <Td>
                        <Button
                          onClick={() => {
                         
                            navigate('/Assigntocenter', {
                              state: { Module: Module },
                            });
                          }}
                        >
                          Assign to center
                        </Button>
                      </Td>
                      <Td>
                        {Module?.attributes.targeted_skills?.map((skill) => (
                          <Tag
                            key={skill.id}
                            size="sm"
                            colorScheme="gray"
                            mr={1}
                          >
                            <TagLabel>{skill?.name}</TagLabel>
                          </Tag>
                        ))}
                      </Td>
                      <Td>{Module?.attributes.technology}</Td>
                    </Tr>
                  ) : null
                )}
              </Tbody>
            </Table>
          </>
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
          <SpecialtyFormModule
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

  return <>{renderFormStep()}</>;
};

export default Theraputicmodules;
