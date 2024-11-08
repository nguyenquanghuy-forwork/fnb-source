import { useLayoutEffect } from 'react';
import Introduction from '../components/introduction';
import styles from './styles.module.css';
import { initFacebookSdk, setTokenFacebook } from '@/utils/facebook-sdk';
import ConnectTabs from '../components/connect-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { getFacebooksAysnc, partnerSelector } from '@/features/system/store/partnerSlice';
import { AppDispatch } from '@/app/store';
import { useLocation, useNavigate } from 'react-router-dom';

const FacebookSettingPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { hash } = useLocation();
  const { facebooks } = useSelector(partnerSelector);

  useLayoutEffect(() => {
    initFacebookSdk();
    initFacebookList();
    initFacebookToken();
  }, []);

  const initFacebookList = () => {
    dispatch(getFacebooksAysnc());
  };

  const initFacebookToken = async () => {
    if (hash) {
      await setTokenFacebook(hash).then(() => {
        navigate('/facebook/setting');
        initFacebookList();
      });
    }
  };

  return (
    <div className={styles.container}>
      {facebooks && <>{facebooks?.length > 0 ? <ConnectTabs refreshData={initFacebookList} /> : <Introduction />}</>}
    </div>
  );
};

export default FacebookSettingPage;
