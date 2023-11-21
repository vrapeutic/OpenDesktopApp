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
import Layout from './shared/Layout';
import Subscriptions from './pages/Subscriptions';
import Generalinfo from './pages/SignUp/Generalinfo';
import { PrivateRoute } from './shared/PrivateRoute';

function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="signup" element={<Generalinfo />} />
          <Route path="home" element={<PrivateRoute component={Home} />} />
          <Route path="Kids" element={<PrivateRoute component={Kids} />} />
          <Route
            path="Theraputicmodules"
            element={<PrivateRoute component={Theraputicmodules} />}
          />
          <Route
            path="Therapycenters"
            element={<PrivateRoute component={Therapycenters} />}
          />
          <Route
            path="Therapycenters"
            element={<PrivateRoute component={Therapycenters} />}
          />
          <Route
            path="Branches"
            element={<PrivateRoute component={Branches} />}
          />
          <Route
            path="Specialists"
            element={<PrivateRoute component={Specialists} />}
          />
          <Route
            path="Assessmenttools"
            element={<PrivateRoute component={Assessmenttools} />}
          />
          <Route
            path="Subscriptions"
            element={<PrivateRoute component={Subscriptions} />}
          />
          <Route
            path="setting"
            element={<PrivateRoute component={Setting} />}
          />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

export default App;
