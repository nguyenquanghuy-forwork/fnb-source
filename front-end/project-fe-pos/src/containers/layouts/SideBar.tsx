import { ConfigurationIcon } from '@/assets/icons/ConfigurationIcon';
import { TikTokWhiteIcon } from '@/assets/icons/TikTokWhiteIcon';
import { ConfigProvider, Layout, Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../assets/scss/pages/_sidebar.scss';
import { ArrowUpIcon } from '@/assets/icons/ArrowUpIcon';
import { ArrowDownIcon } from '@/assets/icons/ArrowDownIcon';
import { FacebookIcon } from '@/assets/icons/FacebookIcon';

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  color: 'black',
  backgroundColor: 'white',
  paddingLeft: 12,
  paddingRight: 12,
};

const menuItems = [
  {
    key: '/tiktok',
    icon: <TikTokWhiteIcon />,
    label: 'Tiktok Shop',
    children: [
      { key: '/tiktok/setting', label: `Setting` },
      { key: '/tiktok/product', label: `Product` },
      { key: '/tiktok/order', label: `Order` },
      { key: '/tiktok/request', label: `Request management` },
      { key: '/tiktok/warehouse', label: `Warehouse` },
    ],
  },
  {
    key: '/facebook',
    icon: <FacebookIcon />,
    label: 'Facebook',
    children: [
      { key: '/facebook/setting', label: 'Setting' },
      { key: '/facebook/conversation', label: 'Conversation' },
      { key: '/facebook/posts', label: 'Posts' },
      { key: '/facebook/automation', label: 'Automation' },
    ],
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
