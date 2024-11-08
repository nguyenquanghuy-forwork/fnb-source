import { FacebookModel } from '@/app/api/requests';
import { ConnectOutlinedIcon, DisconnectOutlinedIcon, PlusSquareOutlinedIcon } from '@/assets/icons';
import FnbButton from '@/components/fnb-button';
import { partnerSelector } from '@/features/system/store/partnerSlice';
import { loginFacebook } from '@/utils/facebook-sdk';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styles from './styles.module.css';

interface IProps {
  refreshData: () => void;
}

const AccountConnect = ({ refreshData }: IProps) => {
  const [t] = useTranslation();
  const { facebooks } = useSelector(partnerSelector);

  const pageData = {
    connectAccount: t('facebook.connectAccount', 'Connect account'),
    connect: t('facebook.connect', 'Connect'),
    disconnect: t('facebook.disconnect', 'Disconnect'),
    deleteAccount: t('facebook.deleteAccount', 'Delete account'),
    updateSuccessfully: t('common.updateSuccessfully', 'Update successfully!'),
    deleteSuccessfully: t('common.deleteSuccessfully', 'Delete successfully!'),
    errorOccurred: t('common.errorOccurred', 'An error occurred, please try again later!'),
  };

  const handleDisconnectAccount = async (id: string) => {};

  const handleDeleteAccount = async (id: string) => {};

  return (
    <div className={styles.container}>
      <div className={styles.groupButton}>
        <FnbButton
          iconHeader={<PlusSquareOutlinedIcon width={24} height={24} />}
          text={pageData.connectAccount}
          onClick={loginFacebook}
        />
      </div>
      <Row gutter={[16, 16]}>
        {facebooks?.map((account: FacebookModel) => (
          <Col key={account?.id} xs={24} sm={24} md={12}>
            <div className={styles.profile}>
              <img src={account?.avatar} alt={account?.name} />
              <div className={styles.name}>{account?.name}</div>
              <div className={styles.groupButton}>
                {account?.isConnected ? (
                  <FnbButton variant="secondary" iconHeader={<DisconnectOutlinedIcon />} text={pageData.disconnect} />
                ) : (
                  <>
                    <FnbButton variant="tertiary" text={pageData.deleteAccount} danger />
                    <FnbButton
                      iconHeader={<ConnectOutlinedIcon color="#FFFFFF" />}
                      text={pageData.connect}
                      onClick={loginFacebook}
                    />
                  </>
                )}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AccountConnect;
