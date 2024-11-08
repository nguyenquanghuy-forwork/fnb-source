import registerSuccessImg from '@/assets/images/register-success.png';
import '@/assets/scss/pages/_register.scss';
import { Button, Image, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const RegisterSuccess = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };
  return (
    <div className="register-form register-success">
      <Image src={registerSuccessImg} preview={false} />
      <div className="description-box">
        <Typography className="awesome-text">{t('register:awesome')}</Typography>
        <Typography className="description">
          {t('register:readyToProceed')}
          <br />
          {t('register:checkEmailDescription')}
        </Typography>

        <Button type="primary" className="btn-start" onClick={navigateToLogin}>
          <Typography className="text-btn-start">{t('register:start')}</Typography>
        </Button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
