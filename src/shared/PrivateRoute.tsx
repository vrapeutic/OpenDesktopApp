import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  component: React.ComponentType;
  path?: string;
}

export const PrivateRoute: React.FC<Props> = ({
  component: RouteComponent,
}) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   (async () => {
  //     const token = await (window as any).electronAPI.getPassword('token');
  //     console.log('token: ', token);
  //     if (!token) {
  //       navigate('/login');
  //     }
  //   })();
  // }, []);

  return <RouteComponent />;
};
