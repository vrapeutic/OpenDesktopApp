import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TabsViewCenter from '../theme/components/Tabs';
import HeaderWithButton from '../theme/components/HeaderWithButton';
import CardWithLogo from '../theme/components/CardWithLogo';
import axios from 'axios';
import { getMe } from '@renderer/cache';
import { MyContext } from '@renderer/theme/ContextHelper';
import { config } from '@renderer/config';

interface Doctor {
  id: string| null;
  attributes: {
    name: string;
    degree: string;
    university: string;
    photo: {
      url: string;
    };
  };}
  interface User {
    id?: string | null;
    email?: string | null;
    admin?: boolean;
    is_center_admin?: boolean;
  }
const ViewCenter = () => {
  const token = getMe()?.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [Doctorslist, setDoctorlist] = useState<Doctor[] | undefined>();
  const[filteredDoctors,setFilteredDoctors] = useState<Doctor[] | undefined>();
  const location = useLocation();
  const { center, includes } = location.state;
  console.log('centerData', center);
  const context = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (center) {
      console.log('Clicked Center Data from view center:', center);
    }
  }, [center]);

 

  if (!context) {
    throw new Error('AnotherComponent must be used within a MyProvider');
  }

  let state: User | undefined;
  if (context.state.id) {
    state  = context.state;
  } else {
    const userString = localStorage.getItem("user");
    if (userString) {
      // Parse the user data from localStorage
      const user = JSON.parse(userString);
      state = {
        id: user.id,
        email: user.email,
        admin: user.admin,
        is_center_admin: user.is_center_admin
      };
    }
  }

  const getDoctors = async () => {
    try {
      const response = await axios.get(
        `${config.apiURL}/api/v1/centers/${center.id}/doctors`,
        { headers }
      );
      setDoctorlist(response.data.data);
      console.log('doctors', response.data);
     
        
    
 
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (Doctorslist) {
      const filtered: Doctor[] = Doctorslist.filter((doctor: Doctor) => doctor.id === state?.id);
      setFilteredDoctors(filtered);
      console.log(filtered,"filtered"); // Log the filtered doctors here
    }
  }, [Doctorslist]);
  console.log(state,"kjshkjhskjhdjkhdk",filteredDoctors)
  
  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <>
 <HeaderWithButton
  leftText="Therapy Center"
  rightText={context.state.is_center_admin ? "Edit Center" : undefined}
  onButtonClick={() =>
    context.state.is_center_admin&& navigate('/editcenter', {
      state: { centerData: center, includes: includes },
    })
  }
/>

      <CardWithLogo centerData={center} />
      <TabsViewCenter centerData={center} />
    </>
  );
};

export default ViewCenter;
