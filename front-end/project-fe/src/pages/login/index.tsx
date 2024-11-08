import { loginRequest } from '@/app/api';
import { LoginRequest } from '@/app/api/requests';
import { ArrowDownIcon } from '@/assets/icons/ArrowDownIcon';
import { LockIcon } from '@/assets/icons/LockIcon';
import { UserNameIcon } from '@/assets/icons/UserNameIcon';
import { listDefaultLanguage } from '@/contants/language.constants';
import { i18n } from '@/features/language';
import { reduxStorage } from '@/features/system/localStorageServices';
import { changeLanguage, setAccountInformation, setToken } from '@/features/system/store/storeSlice';
import { tokenExpired } from '@/utils/helpers';
import { Button, Form, Image, Input, Row, Select, Typography, message } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import logoBg from '../../assets/images/logo-bg.png';
import '../../assets/scss/pages/_login.scss';
import ActiveAccountNotificationComponent from './components/ActiveAccountNotification';
interface ResponseData {
  accountId?: any;
  token?: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const [isActiveAccount, setIsActiveAccount] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [form] = Form.useForm();
  useEffect(() => {
    checkTokenExpired();
  }, []);

  const checkTokenExpired = async () => {
    let token = await reduxStorage.getItem('token');
    if (token && !tokenExpired(token)) {
      navigate('/');
    } else {
      // dispatch(resetSession()); resetSession later
    }
  };

  const onChangeLang = (selectedLang: any) => {
    dispatch(changeLanguage(selectedLang));
    i18n.changeLanguage(selectedLang);
  };

  const onLogin = (values: any) => {
    try {
      form.validateFields();
      const { userName, password } = values;
      const request: LoginRequest = {
        email: userName,
        password: password,
      };
      loginRequest.login(request).then(response => {
        const responseData = response?.data;
        if (responseData) {
          if (responseData?.token != null) {
            reduxStorage.setItem('token', responseData?.token || '');
            const account: any = jwtDecode(responseData?.token);
            localStorage.setItem('storeId', account.StoreId);
            dispatch(setToken(responseData?.token));
            dispatch(setAccountInformation(account));
            message.success(t('login:loggedInSuccessfully'));
            setIsLoadingLogin(false);
            navigate('/');
          } else {
            setIsLoadingLogin(false);
            message.error(t('login:loginFailed'));
          }
        } else {
          navigate('/login');
        }
      });
    } catch (errorInfo) {
      setIsLoadingLogin(false);
      message.error(t('login:loginFailed'));
      console.log('Lỗi khi đăng nhập:', errorInfo);
    } finally {
      setIsLoadingLogin(false);
    }
  };

  const handleNavigateRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-bg">
      <div className="logo-bg">
        <Image preview={false} src={logoBg} />
      </div>
      {isActiveAccount == false ? (
        <Form form={form} className="login-form" onFinish={onLogin} onFinishFailed={() => setIsLoadingLogin(false)}>
          <Row className="login-form-top">
            <Row>
              <Typography className="login-form-title">{t('login:login')}</Typography>
            </Row>
            <Select
              getPopupContainer={trigger => trigger.parentNode as HTMLElement}
              suffixIcon={<ArrowDownIcon />}
              value={i18n.language}
              onChange={onChangeLang}
            >
              {listDefaultLanguage.map(item => {
                const FlagComponent = item.flag;
                return (
                  <Select.Option key={item.languageCode} value={item.languageCode}>
                    <Row style={{ alignItems: 'center', gap: 12, paddingRight: 12 }}>
                      <FlagComponent width="24" height="24" />
                      <Typography>{t(item.name)}</Typography>
                    </Row>
                  </Select.Option>
                );
              })}
            </Select>
          </Row>
          <Row style={{ flexDirection: 'column', gap: 12 }}>
            <Typography>Email</Typography>
            <Row>
              <Form.Item
                id="userName"
                name="userName"
                rules={[
                  {
                    required: true,
                    message: `${t('login:pleaseEnterYourEmail')}`,
                  },
                  {
                    type: 'email',
                    message: t('login:pleaseEnterYourEmail'),
                  },
                ]}
              >
                <Input prefix={<UserNameIcon />} placeholder={t('login:enterYourEmail')} />
              </Form.Item>
            </Row>
          </Row>
          <Row style={{ flexDirection: 'column', gap: 12 }}>
            <Typography>{t('login:password')}</Typography>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: `${t('login:pleaseEnterYourPassword')}`,
                },
              ]}
            >
              <Input.Password prefix={<LockIcon />} placeholder={t('login:enterYourPassword')} />
            </Form.Item>
            <Typography style={{ textAlign: 'right' }}>{t('login:forgotPassword')}</Typography>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
              loading={isLoadingLogin}
              className="button-submit"
              onClick={() => {
                setIsLoadingLogin(true);
              }}
            >
              <Typography className="text-btn-login">{t('login:login')}</Typography>
            </Button>
          </Form.Item>
          <Row style={{ justifyContent: 'center', gap: 8, alignItems: 'center' }}>
            <Typography> {t('login:doNotHaveAnAccount')}</Typography>
            <Button style={{ padding: 0 }} type="link" onClick={handleNavigateRegister}>
              <Typography style={{ fontWeight: '700', color: '#50429B' }}>{t('login:registerHere')}</Typography>
            </Button>
          </Row>
        </Form>
      ) : (
        <>{responseData && <ActiveAccountNotificationComponent responseData={responseData} />}</>
      )}
    </div>
  );
};

export default LoginPage;
