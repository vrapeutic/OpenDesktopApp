import { Routes, Route, MemoryRouter} from 'react-router-dom';
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
import ChooseCourse from './pages/StartSession/GardendoModule/ChooseCourse';
import ChooseCourse2 from './pages/StartSession/GardendoModule/ChooseCourse2';
import ChoosePotsNumber from './pages/StartSession/GardendoModule/ChoosePotsNumber';
import PlayViblio from './pages/StartSession/ViblioModule/PlayViblio';
import ChooseLevel from './pages/StartSession/ViblioModule/ChooseLevel';
import ChooseBooksNum from './pages/StartSession/ViblioModule/ChooseBooksNum';
import ChooseDistractorsNum from './pages/StartSession/ViblioModule/ChooseDistractorsNum';
import ChoosePotsNumber2 from './pages/StartSession/GardendoModule/ChoosePotsNumber2';
import MainMenu from './pages/StartSession/GardendoModule/MainMenu';




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
          <Route path="Assessmenttools" element={<Assessmenttools />} />
          <Route path="Subscriptions" element={<Subscriptions />} />
          <Route path="setting" element={<Setting />} />
        </Route>
        {/* GardenDo Module */}
        <Route path="MainMenu" element={<MainMenu />} />
        <Route path="ChooseCourse" element={<ChooseCourse />} />
        <Route path="ChooseCourse2" element={<ChooseCourse2 />} />  
        <Route path="ChoosePotsNumber" element={<ChoosePotsNumber />} />
        <Route path="ChoosePotsNumber2" element={<ChoosePotsNumber2 />} />
        {/* viblio Module  */}
        <Route path="PlayViblio" element={<PlayViblio />} />  
        <Route path="ChooseLevel" element={<ChooseLevel />} />  
        <Route path="ChooseBooksNum" element={<ChooseBooksNum />} /> 
        <Route path="ChooseDistractorsNum" element={<ChooseDistractorsNum />} />    
      </Routes>  
    </MemoryRouter>
  );
}

export default App;
