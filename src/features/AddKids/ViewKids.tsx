import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderWithArrow from '@renderer/theme/components/HeaderWithArrow';
import { Box } from '@chakra-ui/react';
import ProfileKid from '@renderer/features/AddKids/ProfileKid';
import TabsKids from '@renderer/theme/components/TabsKids';
import { config } from '../../config';
import { dataContext } from '@renderer/shared/Provider';
// import CSVReader from './cvs/Csv';

const ViewKids = () => {
  const location = useLocation();
  const kidsData = location.state;
  const selectedCenter = useContext(dataContext);
  const [data, setData] = useState([]);

  const [date, setDate] = useState('');

  useEffect(() => {
    (async () => {
      getDoctor();
      // gitSessions()
      const token = await (window as any).electronAPI.getPassword('token');

      fetch(
        `${config.apiURL}/api/v1/centers/${selectedCenter.id}/kids/${kidsData.id}?include=diagnoses`,
        {
          method: 'Get',
          redirect: 'follow',
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.data) {
            setData(result.included);
            transformDate(result.data.attributes.created_at);
            console.log('result', result);
          }
        })
        .catch((error) => console.log('error', error));
    })();
  }, [kidsData]);

  const getDoctor = async () => {
    // doctors/center_child_sessions?center_id=52&child_id=26
    const token = await (window as any).electronAPI.getPassword('token');
    fetch(
      `${config.apiURL}/api/v1/doctors/center_child_doctors?center_id=${selectedCenter.id}&child_id=${kidsData.id}`,
      {
        method: 'GET',
        redirect: 'follow',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          // setDoctor(result.included);
          // transformDate(result.data.attributes.created_at);
          console.log('result', result);
        }
      })
      .catch((error) => console.log('error', error));
  };
  const getSessions = async () => {
    // doctors/center_child_sessions?center_id=52&child_id=26
    const token = await (window as any).electronAPI.getPassword('token');
    fetch(
      `${config.apiURL}/api/v1/doctors/center_child_sessions?center_id=${selectedCenter.id}&child_id=${kidsData.id}`,
      {
        method: 'GET',
        redirect: 'follow',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          // setSessions(result);
          // transformDate(result.data.attributes.created_at);
          console.log('results', result);
        }
      })
      .catch((error) => console.log('error', error));
  };
  const transformDate = (x: any) => {
    const transformedDate = new Date(x); // Transform the date once when the component mounts
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

    setDate(formattedDate); //
  };

  return (
    <Box px={31}>
      <HeaderWithArrow title={'Kid Profile'} bntTitle={'Edit Profile'} />
      <ProfileKid
        img={kidsData.attributes.photo_url}
        name={kidsData.attributes.name}
        age={kidsData.attributes.age}
        email={kidsData.attributes.email}
        date={date}
        diagnosis={data}
      />
      <TabsKids id={kidsData.id} kidData={kidsData} diagnosis={data} />
      {/* <CSVReader/> */}
    </Box>
  );
};

export default ViewKids;
