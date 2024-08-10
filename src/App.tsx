import { Routes, Route, MemoryRouter, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Kids from './pages/Kids';
import Theraputicmodules from './pages/Theraputicmodules';
import Therapycenters from './pages/Therapycenters';
import Branches from './pages/Branches';
import Specialists from './pages/Specialists';
import Assessmenttools from './pages/Assessmenttools';
import Setting from './pages/Setting';
import Login from './features/auth/Login';
import Layout from './shared/Layout';
import Subscriptions from './pages/Subscriptions';
import ViewCenter from './pages/ViewCenter';
import EditCenter from './pages/EditCenter';
import OTP from './pages/SignUp/OTP';
import { useAdminContext } from './Context/AdminContext';
import ViewKids from './features/AddKids/ViewKids';
import Signup from './pages/SignUp/Signup';
import Therapycentersadmin from './pages/Therapycentersadmin';
import Assigntocenter from './pages/Assigntocenter/Assigntocenter';
import ViewModule from './pages/viewmodule';
import GeneralInfoEditModule from './features/EditModuleForm/GeneralInfoEditModule';
import SpecialtyFormEditModule from './features/EditModuleForm/SpecialityFormEditModule';
import ViewCenterAdmin from './pages/ViewCenterAdmin';
import EnterEmail from './features/auth/components/forgetPassword/EnterEmail';
import ResetPassword from './features/auth/components/forgetPassword/ResetPassword';

function App() {
  const { adminBoolean } = useAdminContext();
  useEffect(() => {
    const token = (window as any).electronAPI.getPassword('token');
    console.log('token: ', token);
    console.log('adminBoolean: ', adminBoolean);

    if (!token && !adminBoolean) {
      console.log('redirect to login in app');
      // Redirect to login if token is not present and adminBoolean is false
      window.location.replace('/login');
    }
  }, []);

  return (
    <MemoryRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="EnterEmail" element={<EnterEmail />} />
        <Route path="ResetPassword" element={<ResetPassword />} />
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="Kids" element={<Kids />} />
          <Route path="Theraputicmodules" element={<Theraputicmodules />} />
          <Route path="Therapycenters" element={<Therapycenters />} />
          <Route path="Branches" element={<Branches />} />
          <Route path="Specialists" element={<Specialists />} />
          <Route path="Assessmenttools" element={<Assessmenttools />} />
          <Route path="Subscriptions" element={<Subscriptions />} />
          <Route path="Therapycentersadmin" element={<Therapycentersadmin />} />

          <Route path="setting" element={<Setting />} />
          <Route path="Assigntocenter" element={<Assigntocenter />} />
          <Route path="Editmodule" element={<GeneralInfoEditModule />} />

          <Route path="Editmodule2" element={<SpecialtyFormEditModule />} />

          <Route path="editcenter" element={<EditCenter />} />
          <Route path="ViewCenter" element={<ViewCenter />} />
          <Route path="viewmodule" element={<ViewModule />} />

          <Route path="ViewCenterAdmin" element={<ViewCenterAdmin />} />

          <Route path="ViewKids" element={<ViewKids />} />
          {/* Add more routes as needed */}
        </Route>
        <Route path="validateotp" element={<OTP />} />
      </Routes>
    </MemoryRouter>
  );
}

export default App;
