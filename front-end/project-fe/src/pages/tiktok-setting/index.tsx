import { tikTokShopRequest } from '@/app/api';
import { DisconnectTikTokShopRequest, TikTikShopModel } from '@/app/api/requests';
import { DisconnectIcon } from '@/assets/icons/DisconnectIcon';
import { PlusIcon } from '@/assets/icons/PlusIcon';
import { TikTokIcon } from '@/assets/icons/TikTokIcon';
import { env } from '@/env';
import { Button, Col, Image, Modal, Row, Typography, message } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import storeAvatar from '../../assets/images/store-avatar.png';
import tiktokDeliveryMan from '../../assets/images/tiktok-delivery-man.png';
import tiktokLine from '../../assets/images/tiktok-line.png';
import tiktokLogo from '../../assets/images/tiktok-logo.png';
import '../../assets/scss/pages/_setting.scss';

const TikTokSettingPage = () => {
  const [t] = useTranslation();
  const [tikTokShopList, setTikTokShopList] = useState<TikTikShopModel[]>();
  const [shopInfo, setShopInfo] = useState<TikTikShopModel>();
  const [isOpenDisconnect, setIsOpenDisconnect] = useState(false);
  const [openedWindow, setOpenedWindow] = useState<Window | null>();

  useEffect(() => {
    getTikTokShopList();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (openedWindow?.closed) {
        clearInterval(interval);
        getTikTokShopList();
      }
    }, 2000);
  }, [openedWindow]);

  const getTikTokShopList = () => {
    tikTokShopRequest.getTikTokShopList().then(rs => {
      if (rs.success) {
        setTikTokShopList(rs.data);
      }
    });
  };

  const handleConnect = () => {
    const oauthWindow = window.open(
      `${env.TIKTOK_ENVIRONMENT_API}/oauth/authorize?app_key=${env.TIKTOK_APP_KEY}&state=123`,
      'newwindow',
      'width=900,height=600,scrollbars=yes,resizable=yes',
    );
    setOpenedWindow(oauthWindow);
  };

  const handleDisConnect = (shopInfo: TikTikShopModel) => {
    setShopInfo(shopInfo);
    setIsOpenDisconnect(true);
  };

  const handleCancel = () => {
    setIsOpenDisconnect(false);
  };
  const handleOk = () => {
    if (!shopInfo) return;
    const req: DisconnectTikTokShopRequest = {
      id: shopInfo?.id,
    };
    tikTokShopRequest.disconnectTikTokShop(req).then(rs => {
      if (rs && rs.success) {
        setIsOpenDisconnect(false);
        message.success(t('common:disconnectTiktokSuccess'));
        getTikTokShopList();
      } else {
        message.error(t('common:disconnectTiktokFailed'));
      }
    });
  };

  const formatNotificationMessage = (shopName: string | undefined) => {
    const mess = t('common:areYouSureToDisconnectTiktokShop', { shopName });
    return mess;
  };

  return (
    <div className="setting-page-cover">
      {tikTokShopList && tikTokShopList?.length > 0 ? (
        <>
          <Row className="shop-list-header">
            <Typography style={{ fontSize: '24px', fontWeight: '700', color: '#2B2162' }}>Account connect</Typography>
            <Button icon={<PlusIcon />} type="primary" className="btn-new-connect" onClick={handleConnect}>
              <Typography style={{ color: '#fff' }}>{t('tiktok:connectNewShop')}</Typography>
            </Button>
          </Row>
          <Row className="connect-content-cover">
            {tikTokShopList.map((item, index) => {
              return (
                <Row className="connect-item-cover" key={index}>
                  <Row style={{ alignItems: 'center', gap: '16px' }}>
                    <Col>
                      <Image preview={false} src={storeAvatar} className="store-avatar" />
                    </Col>
                    <Col className="store-name">{item.shopName}</Col>
                  </Row>
                  <Col>
                    <Button
                      icon={<DisconnectIcon />}
                      type="primary"
                      className="connect-item-btn"
                      onClick={() => handleDisConnect(item)}
                    >
                      <Typography style={{ color: '#50429B' }}>{t('tiktok:disconnect')}</Typography>
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </Row>
        </>
      ) : (
        <div className="connect-content">
          <div className="connect-content-left">
            <Image preview={false} src={tiktokLogo} width={305} />
            <Image preview={false} src={tiktokLine} />
            <Typography style={{ fontSize: '32px', fontWeight: '700', color: '#2B2162' }}>
              {t('tiktok:synchronizeTikTokShop')}
            </Typography>
            <Row style={{ flexDirection: 'column', gap: '24px' }}>
              <Typography>
                {t('tiktok:connectTikTokShopToHelpYouSynchronizeProductBetweenTikTokShopAndGoFAndBStore')}
              </Typography>
              <Typography>
                {t('tiktok:convertYouCanAlsoProcessTikTokShopOrderOnGoFAndBStoreManagementInterfaceEasily')}
              </Typography>
            </Row>
            <Typography style={{ fontSize: '18px', fontWeight: '700', color: '#2B2162' }}>
              {t('tiktok:goFAndBHelpYou')}
            </Typography>
            <Row style={{ flexDirection: 'column', paddingLeft: '32px' }}>
              <Row style={{ gap: 12, flexFlow: 'unset' }}>
                <TikTokIcon />
                <Typography> {t('tiktok:connectAccountTikTokShop')}</Typography>
              </Row>
              <Row style={{ gap: 12, flexFlow: 'unset' }}>
                <TikTokIcon />
                <Typography> {t('tiktok:synchronizeProductBetweenTikTokAndGoFAndB')}</Typography>
              </Row>
              <Row style={{ gap: 12, flexFlow: 'unset' }}>
                <TikTokIcon />
                <Typography> {t('tiktok:synchronizeAndProcessTikTokOrderOnGoFAndBStore')}</Typography>
              </Row>
              <Row style={{ gap: 12, flexFlow: 'unset' }}>
                <TikTokIcon />
                <Typography> {t('tiktok:synchronizeStockBetweenTikTokAndGoFAndBStore')}</Typography>
              </Row>
            </Row>
            <Button icon={<PlusIcon />} type="primary" className="btn-connect" onClick={handleConnect}>
              <Typography style={{ color: '#fff' }}>Connect</Typography>
            </Button>
          </div>
          <div className="connect-content-right">
            <Image preview={false} src={tiktokDeliveryMan} />
          </div>
        </div>
      )}

      <Modal
        className="dialog-confirm-modal"
        title={'Disconnect shop'}
        open={isOpenDisconnect}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
        footer={[
          <Button type="text" onClick={handleCancel}>
            <Typography style={{ color: '#50429B' }}>{t('common:discard')}</Typography>
          </Button>,
          <Button type="primary" className="btn-connect" onClick={handleOk}>
            <Typography style={{ color: '#fff' }}>Disconnect</Typography>
          </Button>,
        ]}
        width={396}
      >
        <span
          dangerouslySetInnerHTML={{
            __html: formatNotificationMessage(shopInfo?.shopName),
          }}
        ></span>
      </Modal>
    </div>
  );
};

export default TikTokSettingPage;
