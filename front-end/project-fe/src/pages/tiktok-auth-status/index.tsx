import { tikTokShopRequest } from '@/app/api';
import { AuthenticateAndCreateTikTokShopRequest } from '@/app/api/requests';
import { Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const TikTokAuthStatusPage = () => {
  const [countDown, setCountDown] = useState(3);
  const [t] = useTranslation();
  const [status, setStatus] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (countDown === 0) {
      window.close();
    }
  }, [countDown]);

  const checkAuthStatus = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams?.get('code');
    const reqAuthCode: AuthenticateAndCreateTikTokShopRequest = {
      authCode: authCode || '',
    };
    tikTokShopRequest.authenticateAndCreateTikTokShop(reqAuthCode).then(res => {
      if (res) {
        setStatus(true);
        setInterval(() => {
          setCountDown(prevCount => prevCount - 1);
        }, 1000);
      } else {
        setStatus(false);
        setInterval(() => {
          setCountDown(prevCount => prevCount - 1);
        }, 1000);
      }
    });
  };

  return (
    <Row
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: '100vh',
        width: '100vw',
      }}
    >
      {status != null ? (
        <Row style={{ flexDirection: 'column' }}>
          <Row>
            <Typography style={{ color: status ? 'green' : 'red' }}>
              {status ? t('common:connectTiktokSuccess') : t('common:connectTiktokFailed')}
            </Typography>
          </Row>
          <Row>
            <Typography>{t('common:pageCloseInSeconds', { countDown })}</Typography>
          </Row>
        </Row>
      ) : (
        <Row>
          <Typography>{t('common:pageAuthNotify')}</Typography>
        </Row>
      )}
    </Row>
  );
};
export default TikTokAuthStatusPage;
