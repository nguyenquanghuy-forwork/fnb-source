import { env } from '@/env';
import { Button, Image, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import activeAccountNoti from '../../../assets/images/active-account.svg';
interface ResponseData {
  accountId?: any;
  token?: string;
}

interface Props {
  responseData: ResponseData;
}

const ActiveAccountNotificationComponent: React.FC<Props> = ({ responseData }) => {
  const [t] = useTranslation();

  const navigateToAdmin = () => {
    const accountId = responseData?.accountId;
    const loginUrl = new URL(`${env.ADMIN_APP_URL}` + '/billing');
    document.cookie = `token=${responseData?.token}; max-age=3600; path=/`;
    loginUrl.searchParams.append('accountId', accountId);
    window.location.href = loginUrl.toString();
  };

  return (
    <>
      <div className="active-account-component">
        <Row className="center">
          <Image src={activeAccountNoti} preview={false} className="image" />
        </Row>
        <Row className="center">
          <span className="title">{t('login:kindlyNotification')}</span>
        </Row>
        <Row className="center">
          <span
            dangerouslySetInnerHTML={{
              __html: t('login:contentNotificationActiveAccount'),
            }}
            className="content"
          ></span>
        </Row>
        <Row className="center">
          <span className="hotline">
            {t('login:hotline')}{' '}
            <a href="tel:02873030800" className="contact" style={{ padding: '0 2px' }}>
              (028) 73030800
            </a>
            - {t('login:email')}
            <a href="mailto:hotro@gosell.vn" className="contact" style={{ padding: '0 2px' }}>
              hotro@gosell.vn
            </a>
          </span>
        </Row>
        <Row className="center">
          <Button
            type="primary"
            onClick={() => {
              navigateToAdmin();
            }}
            className="text-btn-login"
          >
            {t('login:activateAccount')}
          </Button>
        </Row>
      </div>
    </>
  );
};

export default ActiveAccountNotificationComponent;
