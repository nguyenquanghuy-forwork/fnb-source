import FnbTabPane from '@/components/fnb-tab-pane';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AccountConnect from '../account-connect';
import styles from './styles.module.css';

const KEY_TAB_PANE = {
  ACCOUNT_CONNECT: 'account-connect',
  FANPAGE_CONNECT: 'fanpage-connect',
};

const INDEX_KEY_TAB_PANE = {
  [KEY_TAB_PANE.ACCOUNT_CONNECT]: 0,
  [KEY_TAB_PANE.FANPAGE_CONNECT]: 1,
};

interface IProps {
  refreshData: () => void;
}

const ConnectTabs = ({ refreshData }: IProps) => {
  const [t] = useTranslation();
  const [activeScreen, setActiveScreen] = useState(KEY_TAB_PANE.ACCOUNT_CONNECT);

  const pageData = {
    setting: t('facebook.setting', 'Setting'),
    connectAccount: t('facebook.connectAccount', 'Connect account'),
    accountConnect: t('facebook.accountConnect', 'Account connect'),
    fanpageConnect: t('facebook.fanpageConnect', 'Fanpage connect'),
  };

  const screens = [
    {
      key: KEY_TAB_PANE.ACCOUNT_CONNECT,
      name: pageData.accountConnect,
      component: <AccountConnect refreshData={refreshData} />,
    },
    {
      key: KEY_TAB_PANE.FANPAGE_CONNECT,
      name: pageData.fanpageConnect,
      component: <>Fanpage Connect</>,
    },
  ];

  const onChange = (activeKey: string) => {
    setActiveScreen(activeKey);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{pageData.setting}</div>
      <FnbTabPane
        screens={screens}
        activeScreen={activeScreen}
        indexKeyTabPane={INDEX_KEY_TAB_PANE}
        onChange={onChange}
        firstKeyTabPane={KEY_TAB_PANE.ACCOUNT_CONNECT}
        lastKeyTabPane={KEY_TAB_PANE.FANPAGE_CONNECT}
        setTabPaneDisplayFullWidth
      />
    </div>
  );
};

export default ConnectTabs;
