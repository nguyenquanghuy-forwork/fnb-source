import { ArrowDownIcon } from '@/assets/icons/ArrowDownIcon';
import { ArrowUpIcon } from '@/assets/icons/ArrowUpIcon';
import { ConfigurationIcon } from '@/assets/icons/ConfigurationIcon';
import { InventoryIcon } from '@/assets/icons/InventoryIcon';
import { MenuIcon } from '@/assets/icons/MenuIcon';
import { ConfigProvider, Layout, Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../assets/scss/pages/_sidebar.scss';
const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  color: 'black',
  backgroundColor: 'white',
  paddingLeft: 12,
  paddingRight: 12,
};

const menuItems = [
  {
    key: '/material',
    icon: <InventoryIcon />,
    label: 'Inventory',
    children: [
      { key: '/inventory/setting', label: `Setting` },
      { key: '/inventory/material', label: `Material` },
    ],
  },
  {
    key: '/product',
    icon: <MenuIcon height="18" width="18" />,
    label: 'Product',
    children: [{ key: '/product/management', label: 'Management' }],
  },
];

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [t] = useTranslation();

  const onClickApiConfig = () => {
    navigate('/config/api-configuration');
  };

  const renderExpandIcon = ({ isOpen }: { isOpen?: boolean }) => {
    return isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />;
  };

  return (
    <Sider width="256" style={siderStyle}>
      <div>
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemSelectedBg: '#50429B',
                itemSelectedColor: 'white',
                itemColor: '#50429B',
              },
            },
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            style={{ height: '100%', background: '#F7F5FF', borderRadius: 12, padding: 12 }}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
            expandIcon={renderExpandIcon}
          />
        </ConfigProvider>
      </div>
      <div className="side-bar-configuration" onClick={onClickApiConfig}>
        <ConfigurationIcon /> {t('common:configuration')}
      </div>
    </Sider>
  );
};

export default SideBar;
