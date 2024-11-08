import { ArrowDownIcon } from '@/assets/icons/ArrowDownIcon';
import '@/assets/scss/pages/_register.scss';
import { listDefaultLanguage } from '@/contants/language.constants';
import { i18n } from '@/features/language';
import { Button, Form, Input, Row, Select, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import RegisterLabel from './RegisterLabel';

interface RegisterFormProps {
  onChangeLang: (selectedLang: string) => void;
  handleRegister: (account: any) => void;
  form: any;
}

const RegisterForm = (props: RegisterFormProps) => {
  const { t } = useTranslation();
  const { onChangeLang, handleRegister, form } = props;
  const inputStyle = {
    height: 44,
    borderRadius: 6,
    borderColor: '#D8DAE1',
    fontSize: 16,
    borderWidth: 1,
  };

  return (
    <Form form={form} onFinish={handleRegister} className="register-form">
      <Row className="register-form-top">
        <Typography className="login-form-title">{t('register:register')}</Typography>
        <Select
          getPopupContainer={(trigger: { parentNode: HTMLElement }) => trigger.parentNode as HTMLElement}
          suffixIcon={<ArrowDownIcon />}
          value={i18n.language}
          onChange={onChangeLang}
          className="select-language"
          style={{ width: 180 }}
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
        <RegisterLabel label={t('register:fullName')} required={true} />
        <Form.Item
          name="fullName"
          rules={[
            {
              required: true,
              message: t('register:pleaseInputYourFullName'),
            },
          ]}
        >
          <Input style={inputStyle} maxLength={255} placeholder={t('register:enterYourFullName')} />
        </Form.Item>
      </Row>
      <Row style={{ flexDirection: 'column', gap: 12 }}>
        <RegisterLabel label={t('register:email')} required={true} />
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: t('register:pleaseInputYourEmail'),
            },
            {
              type: 'email',
              message: t('register:wrongFormatOfEmail'),
            },
          ]}
        >
          <Input style={inputStyle} maxLength={255} placeholder={t('register:enterYourEmail')} />
        </Form.Item>
      </Row>
      <Row style={{ flexDirection: 'column', gap: 12 }}>
        <RegisterLabel label={t('register:password')} required={true} />
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: t('register:enterYourPassword'),
            },
            {
              pattern: /[\W_]+/,
              message: t('register:atLeast1SpecialCharacter'),
            },
            {
              pattern: /[A-Z]+/,
              message: t('register:atLeast1UpperCharacter'),
            },
            {
              pattern: /\d+/,
              message: t('register:atLeast1NumberCharacter'),
            },
            {
              min: 6,
              message: t('register:min6Characters'),
            },
          ]}
        >
          <Input.Password style={inputStyle} maxLength={255} placeholder={t('register:enterYourPassword')} />
        </Form.Item>
      </Row>
      <Row style={{ flexDirection: 'column', gap: 12 }}>
        <RegisterLabel label={t('register:confirmPassword')} required={true} />
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: t('register:pleaseReEnterYourPasswordToVerify'),
            },
            {
              validator: (_: any, value: any, callback: any) => {
                const { getFieldValue } = form;
                if (value && value !== getFieldValue('password')) {
                  callback(t('register:pleaseReInputTheSamePassword'));
                } else {
                  callback();
                }
              },
            },
          ]}
        >
          <Input.Password style={inputStyle} maxLength={255} placeholder={t('register:reEnterYourPasswordToVerify')} />
        </Form.Item>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          <Typography className="text-btn-login">{t('register:register')}</Typography>
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
