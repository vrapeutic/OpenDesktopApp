import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TabsViewCenter from '../theme/components/Tabs';
import HeaderWithButton from '../theme/components/HeaderWithButton';
import CardWithLogo from '../theme/components/CardWithLogo';
import HeaderWithArrow from '@renderer/theme/components/HeaderWithArrow';
import TabsViewCenterAdmin from '@renderer/theme/components/TabsViewCenterAdmin';
import GeneralInfoFormKidsEdit from './GeneralInfoFormKidsEdit';
import { useDisclosure } from '@chakra-ui/react';
import GenerallInfoDoctorEdit from './AdminEditDoctor/GenerallInfoDoctorEdit';
const ViewCenterAdmin = () => {
  const location = useLocation();
  const centerData = location.state;
  const totalSteps = 5;
  const [sliding, setSliding] = useState(1);
  const [formData, setFormData] = useState({});
  const [kidsList, setKidsList] = useState<any>([]);

  const [doctor, setDoctor] = useState<any>([]);
  const [showTable, setShowTable] = useState(true);

  useEffect(() => {
    if (centerData) {
      console.log('Clicked Center Data from view center:', centerData);
    }
  }, [centerData]);
  const renderFormStep = () => {
    switch (sliding) {
      case 2:
        return (
          <>
            <GeneralInfoFormKidsEdit
              onSubmit={handleFormSubmit}
              nextHandler={nextHandler}
              backHandler={backHandler}
              sliding={sliding}
              formData={formData}
              datachild={kidsList}
            />
          </>
        );

      default:
        return null;
    }
  };

  const renderFormStepDoctor = () => {
    console.log('dcotor');
    switch (sliding) {
      case 2:
        return (
          <>
            <GenerallInfoDoctorEdit
              onSubmit={handleFormSubmit}
              nextHandler={nextHandler}
              backHandler={backHandler}
              sliding={sliding}
              formData={formData}
              datachild={doctor}
            />
          </>
        );

      default:
        return null;
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
      onOpenCongratulations();
    }
  };
  const datachild = (x: any) => {
    console.log(x);
    setKidsList(x);
    setDoctor([]);
  };

  const dataDoctor = (x: any) => {
    console.log(x);
    setDoctor(x);
    setKidsList([]);
  };
  const {
    isOpen: isOpenCongratulations,
    onOpen: onOpenCongratulations,
    onClose: onDeleteCongratulations,
  } = useDisclosure();

  const backHandler = () => {
    if (sliding > 1) {
      setSliding(sliding - 1);
      if (sliding === 2) {
        setSliding(sliding - 1);
        setShowTable(true);
      }
    }
  };

  return (
    <>
      {showTable ? (
        <>
          <HeaderWithArrow title={'Therapy Center'} />
          <CardWithLogo centerData={centerData} />
          <TabsViewCenterAdmin
            datachild={datachild}
            nextHandler={() => nextHandler()}
            centerData={centerData}
            dataDoctor={dataDoctor}
            nextHandlerDoctor={() => nextHandler()}
          />
        </>
      ) : (
        <>{kidsList.length === 0 ? renderFormStepDoctor() : renderFormStep()}</>
      )}
    </>
  );
};

export default ViewCenterAdmin;
