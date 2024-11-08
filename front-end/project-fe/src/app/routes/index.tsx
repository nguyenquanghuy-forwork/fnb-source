import { HomePage, NotFoundPage } from '@/pages';
import Layout from '@/pages/layout';
import LoginPage from '@/pages/login';
import MaterialManagementPage from '@/pages/material';
import CreateOrEditMaterialComponent from '@/pages/material/components/CreateOrEditMaterialComponent';
import ProductManagementPage from '@/pages/product';
import CreateOrEditProductComponent from '@/pages/product/components/CreateOrEditProductComponent';
import Register from '@/pages/register';
import TikTokAuthStatusPage from '@/pages/tiktok-auth-status';
import TikTokSettingPage from '@/pages/tiktok-setting';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, path: '/', element: <HomePage /> },
      { path: 'inventory/setting', element: <TikTokSettingPage /> },
      { path: 'inventory/material', element: <MaterialManagementPage /> },
      { path: 'inventory/material/create', element: <CreateOrEditMaterialComponent /> },
      { path: 'product/management', element: <ProductManagementPage /> },
      { path: 'product/management/create', element: <CreateOrEditProductComponent /> },
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
