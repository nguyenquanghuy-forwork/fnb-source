import { loginRequest } from '@/app/api';
import { AuthenticateByTokenRequest } from '@/app/api/requests';
import SideBar from '@/containers/layouts/SideBar';
import TopBar from '@/containers/layouts/TopBar';
import { reduxStorage } from '@/features/system/localStorageServices';
import { getQueryParam, tokenExpired } from '@/utils/helpers';
import { Layout } from 'antd';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const LayoutComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkTokenExpired();
  }, []);

  const getTokenFromParam = () => {
    const token = getQueryParam('token');
    if (token) {
      const reqToken: AuthenticateByTokenRequest = {
        token: token || '',
      };
      loginRequest.authenticateByToken(reqToken).then(rs => {
        const responseData = rs?.data;
        if (responseData) {
          reduxStorage.setItem('token', responseData.token || '');
          navigate('/');
        } else {
          navigate('/login');
        }
      });
    }
  };

  const checkTokenExpired = async () => {
    let token = await reduxStorage.getItem('token');
    if (token && !tokenExpired(token)) {
      // permission check later
      // dispatch(resetSession()); resetSession later
      // clear url
      token = getQueryParam('token');
      if (token) {
        navigate('/');
      }
    } else {
      token = getQueryParam('token');
      if (token) {
        getTokenFromParam();
      } else {
        navigate('/login');
      }
    }
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <TopBar />
      <Layout>
        <SideBar />
        <div className="wrapperOutLet">
          <Outlet />
        </div>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
