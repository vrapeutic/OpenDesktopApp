

import { useState, useEffect } from 'react';
import HeaderSpaceBetween from '../theme/components/HeaderSpaceBetween';
import GeneralInfoModule from '../features/AddModuleForm/GeneralInfoModule';
import SpecialtyFormModule from '../features/AddModuleForm/SpecialityFormModule';

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

const Theraputicmodules: React.FC = () => {
  const totalSteps = 3;
  const [sliding, setSliding] = useState(1);
  const [formData, setFormData] = useState({});

  const handleFormSubmit = (data: any) => {
    // Use the previous state to ensure the latest form data is captured
    setFormData(prevFormData => ({ ...prevFormData, ...data }));
    console.log(formData); // Logging the form data to the console
    return { ...formData, ...data };
  };

  useEffect(() => {
    console.log("Updated FormData:", formData);
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