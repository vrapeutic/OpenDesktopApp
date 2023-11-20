import { Routes, Route, MemoryRouter } from 'react-router-dom';
import Home from './pages/Home';
import Kids from './pages/Kids';
import Theraputicmodules from './pages/Theraputicmodules';
import Therapycenters from './pages/Therapycenters';
import Branches from './pages/Branches';
import Specialists from './pages/Specialists';
import Assessmenttools from './pages/Assessmenttools';
import Setting from './pages/Setting';
import Login from './features/auth/Login';
import { useEffect, useState } from 'react';
import Layout from './shared/Layout';
import Subscriptions from './pages/Subscriptions';
import Generalinfo from './pages/SignUp/Generalinfo';
import ViewCenter from './pages/ViewCenter';
import EditCenter from './pages/EditCenter';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await (window as any).electronAPI.getPassword('token');

      setLoggedIn(Boolean(token));
    })();
  }, []);

  console.log('isLoggedIn: ', isLoggedIn);

  if (!isLoggedIn) return <Login setLoggedIn={setLoggedIn} />;

  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="main_window" element={<Home />} />
          <Route path="Kids" element={<Kids />} />
          <Route path="Theraputicmodules" element={<Theraputicmodules />} />
          <Route path="Therapycenters" element={<Therapycenters />} />
          <Route path="Therapycenters" element={<Therapycenters />} />

          <Route path="Branches" element={<Branches />} />
          <Route path="Specialists" element={<Specialists />} />
          <Route path="editcenter" element={<EditCenter />} />

          <Route path="Assessmenttools" element={<Assessmenttools />} />
          <Route path="Subscriptions" element={<Subscriptions />} />
          <Route path="setting" element={<Setting />} />
          <Route path="ViewCenter" element={<ViewCenter />} />
        </Route>
      </Routes>
      <Generalinfo />
    </MemoryRouter>
  );
}

export default App;
