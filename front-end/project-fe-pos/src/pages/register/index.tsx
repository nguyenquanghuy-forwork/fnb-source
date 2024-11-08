/* eslint-disable indent */
import { accountRegisterRequest } from '@/app/api';
import { REGISTER_STEP } from '@/contants/registerStep.contants';
import { i18n } from '@/features/language';
import { changeLanguage } from '@/features/system/store/storeSlice';
import { Form, Image } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import logoBg from '../../assets/images/logo-bg.png';
import '../../assets/scss/pages/_register.scss';
import RegisterForm from './components/RegisterForm';
import RegisterSuccess from './components/RegisterSuccess';

interface AccountRequest {
  fullName: string;
  storeName: string;
  email: string;
  password: string;
}

const Register = () => {
  const [step, setStep] = useState(REGISTER_STEP.REGISTER);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onChangeLang = (selectedLang: string) => {
    dispatch(changeLanguage(selectedLang));
    i18n.changeLanguage(selectedLang);
  };

  const handleRegister = async () => {
    var formValue = form.getFieldsValue();
    const request: AccountRequest = {
      fullName: formValue.fullName,
      storeName: formValue.storeName,
      email: formValue.email,
      password: formValue.password,
    };
    var response = await accountRegisterRequest.register(request);
    if (response.success) {
      if (response.data?.fullName) {
        setStep(REGISTER_STEP.SUCCESSFULLY);
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case REGISTER_STEP.REGISTER:
      default:
        return <RegisterForm onChangeLang={onChangeLang} handleRegister={handleRegister} form={form} />;
      case REGISTER_STEP.SUCCESSFULLY:
        return <RegisterSuccess />;
    }
  };

  return (
    <div className="register-container">
      <div className="logo-bg" style={{ width: '240px', height: '240px' }}>
        <Image preview={false} src={logoBg} />
      </div>
      {renderStep()}
    </div>
  );
};

export default Register;
