import { HomePage, NotFoundPage } from '@/pages';
import APIConfigurationPage from '@/pages/configuration/api-configuration';
import APIDocumentationPage from '@/pages/configuration/api-configuration/api-documentation';
import Layout from '@/pages/layout';
import LoginPage from '@/pages/login';
import TikTokProductPage from '@/pages/product';
import Register from '@/pages/register';
import TikTokAuthStatusPage from '@/pages/tiktok-auth-status';
import TikTokSettingPage from '@/pages/tiktok-setting';
import FacebookSettingPage from '@/pages/facebook/setting';
import TikTokWarehousePage from '@/pages/warehouse';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, path: '/', element: <HomePage /> },
      { path: 'tiktok/setting', element: <TikTokSettingPage /> },
      { path: 'tiktok/product', element: <TikTokProductPage /> },
      { path: 'tiktok/warehouse', element: <TikTokWarehousePage /> },
      { path: 'config/api-configuration', element: <APIConfigurationPage /> },
      { path: 'config/api-documentation', element: <APIDocumentationPage /> },
      { path: 'facebook/setting', element: <FacebookSettingPage /> },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/tiktok-auth-status',
    element: <TikTokAuthStatusPage />,
  },
  {
    path: '/*',
    element: <NotFoundPage />,
  },
];
