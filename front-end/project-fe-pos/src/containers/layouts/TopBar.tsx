import { ArrowDownIcon } from '@/assets/icons/ArrowDownIcon';
import { MenuIcon } from '@/assets/icons/MenuIcon';
import { NotificationIcon } from '@/assets/icons/NotificationIcon';
import { listDefaultLanguage } from '@/contants/language.constants';
import { i18n } from '@/features/language';
import { reduxStorage } from '@/features/system/localStorageServices';
import { changeLanguage } from '@/features/system/store/storeSlice';
import { Image, Row, Select, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { default as shopLogoDemo, default as userDemo } from '../../assets/images/logo-bg.png';
import '../../assets/scss/pages/_topbar.scss';

const TopBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t] = useTranslation();

  const handleLogOut = () => {
    reduxStorage.removeItem('token');
    navigate('/login');
  };
  const onChangeLang = (selectedLang: any) => {
    dispatch(changeLanguage(selectedLang));
    i18n.changeLanguage(selectedLang);
  };
  const handleHomePage = () => {
    navigate('/');
  };
  return (
    <Row className="header-style">
      <Row style={{ display: 'flex', gap: '12px' }}>
        <Row className="header-menu">
          <MenuIcon />
        </Row>
        <Row className="hide-mobile-mode">
          <Image
            onClick={handleHomePage}
            preview={false}
            style={{ borderRadius: 8 }}
            width={44}
            height={44}
            src={shopLogoDemo}
          />
        </Row>
        <Row className="hide-mobile-mode" style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <Typography className="header-store-name">Panda H</Typography>
          <Typography className="header-domain-name">huynguyenquang.vn</Typography>
        </Row>
      </Row>

      <Row style={{ display: 'flex', gap: '12px' }}>
        <Row style={{ height: 44 }}>
          <Select
            getPopupContainer={trigger => trigger.parentNode as HTMLElement}
            suffixIcon={<ArrowDownIcon />}
            value={i18n.language}
            onChange={onChangeLang}
            className="top-bar-search"
          >
            {listDefaultLanguage.map(item => {
              const FlagComponent = item.flag;
              return (
                <Select.Option key={item.languageCode} value={item.languageCode}>
                  <Row style={{ alignItems: 'center', gap: 12, paddingRight: 12 }}>
                    <FlagComponent width="24" height="24" />
                    <Typography className="hide-mobile-mode">{t(item.name)}</Typography>
                  </Row>
                </Select.Option>
              );
            })}
          </Select>
        </Row>
        <Row className="header-notification">
          <NotificationIcon />
        </Row>
        <Row onClick={handleLogOut}>
          <Image preview={false} style={{ borderRadius: 8 }} fallback={''} width={44} height={44} src={userDemo} />
        </Row>
      </Row>
    </Row>
  );
};

export default TopBar;
