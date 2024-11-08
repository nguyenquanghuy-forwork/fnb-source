import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { CheckCircleFilledIcon, PlusSquareOutlinedIcon } from '@/assets/icons';
import FacebookLogo from '@/assets/images/facebook-logo.png';
import FacebookSetting from '@/assets/images/facebook-setting.png';
import styles from './styles.module.css';
import { loginFacebook } from '@/utils/facebook-sdk';

const Introduction = () => {
  const [t] = useTranslation();

  const pageData = {
    settingName: 'Facebook',
    connect: t('facebook.connect', 'Connect'),
    introduction: {
      title: t('facebook.introduction.title', 'Go F&B help you:'),
      content: t(
        'facebook.introduction.content',
        'Receive and Send messages to customers coming from up to 5 Facebook fanpage and manage them in a single interface.',
      ),
      collectCustomersData: t(
        'facebook.introduction.collectCustomersData',
        'Collect customers data from Facebook automatically and create new contacts or link with existing contacts in your F&B store',
      ),
      createOrders: t(
        'facebook.introduction.createOrders',
        'Create orders and send orders confirmation to chat conversations instantly',
      ),
      createTags: t('facebook.introduction.createTags', 'Create Tags and apply them to Facebook chat conversations'),
      assignConversations: t('facebook.introduction.assignConversations', 'Assign conversations to responsible staff'),
      previewCustomerNotes: t('facebook.introduction.previewCustomerNotes', 'Add and preview customer notes'),
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.introduction}>
        <div className={styles.settingName}>
          <img src={FacebookLogo} alt={pageData.settingName} />
          <span>{pageData.settingName}</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.content}>{pageData.introduction.content}</div>
        <div className={styles.benefit}>
          <p>{pageData.introduction.title}</p>
          <ul>
            <li>
              <span>
                <CheckCircleFilledIcon />
              </span>
              {pageData.introduction.collectCustomersData}
            </li>
            <li>
              <span>
                <CheckCircleFilledIcon />
              </span>
              {pageData.introduction.createOrders}
            </li>
            <li>
              <span>
                <CheckCircleFilledIcon />
              </span>
              {pageData.introduction.createTags}
            </li>
            <li>
              <span>
                <CheckCircleFilledIcon />
              </span>
              {pageData.introduction.assignConversations}
            </li>
            <li>
              <span>
                <CheckCircleFilledIcon />
              </span>
              {pageData.introduction.previewCustomerNotes}
            </li>
          </ul>
        </div>
        <Button
          type="primary"
          icon={<PlusSquareOutlinedIcon width={24} height={24} />}
          className={styles.connect}
          onClick={loginFacebook}
        >
          {pageData.connect}
        </Button>
      </div>
      <div className={styles.logoSetting}>
        <img src={FacebookSetting} />
      </div>
    </div>
  );
};

export default Introduction;
