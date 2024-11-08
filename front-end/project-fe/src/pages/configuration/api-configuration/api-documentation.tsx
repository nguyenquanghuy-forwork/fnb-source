import React, { useState, useEffect } from 'react';
import { Card, Col, Menu, Row, Table, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { CheckedBoxIcon } from '@/assets/icons/CheckedBoxIcon';
import { CheckBoxIcon } from '@/assets/icons/CheckBoxIcon';
import { InfoIcon } from '@/assets/icons/InfoIcon';
import { ArrowLeftIcon } from '@/assets/icons/ArrowLeftIcon';
import { useNavigate } from 'react-router-dom';
import { ArrowUpIcon } from '@/assets/icons/ArrowUpIcon';
import { ArrowDownIcon } from '@/assets/icons/ArrowDownIcon';

const renderExpandIcon = ({ isOpen }: { isOpen?: boolean }) => {
  return isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />;
};
interface MenuItem {
  key: string;
  label: string;
  children?: MenuItem[];
  content?: {
    description: string;
    method: string;
    apiName: string;
    request?: {
      attributes: Array<{
        attribute: string;
        dataType: string;
        mandatory: boolean;
        description?: string;
      }>;
    };
    response?: {
      properties: Array<{
        attribute: string;
        dataType: string;
        mandatory: boolean;
        description?: string;
      }>;
    };
  };
}

const APIDocumentationPage: React.FC = () => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedContent, setSelectedContent] = useState<MenuItem['content'] | null>(null);

  useEffect(() => {
    const loadMenuItems = async () => {
      const response = await import('./api-documentation-data.json');
      setMenuItems(response.menuItems as MenuItem[]);
    };

    loadMenuItems();
  }, []);

  const onMenuClick = (event: { key: React.Key }) => {
    const selectedItem = findContentByMenuItemKey(menuItems, event.key);
    if (selectedItem && selectedItem.content) {
      setSelectedContent(selectedItem.content);
    } else {
      setSelectedContent(null);
    }
  };

  const findContentByMenuItemKey = (items: MenuItem[], key: React.Key): MenuItem | null => {
    for (let item of items) {
      if (item.key === key.toString()) {
        return item;
      }
      if (item.children) {
        const result = findContentByMenuItemKey(item.children, key);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  const columns = [
    {
      title: t('configuration:attribute'),
      dataIndex: 'attribute',
      key: 'attribute',
    },
    {
      title: t('configuration:dataType'),
      dataIndex: 'dataType',
      key: 'dataType',
    },

    {
      title: t('configuration:mandatory'),
      dataIndex: 'mandatory',
      key: 'mandatory',
      render: (mandatory: boolean) => (mandatory ? <CheckedBoxIcon /> : <CheckBoxIcon />),
    },
    {
      title: t('configuration:description'),
      dataIndex: 'description',
      key: 'description',
    },
  ];

  const onClickApiConfig = () => {
    navigate('/config/api-configuration');
  };

  return (
    <>
      <Row style={{ height: 52, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <ArrowLeftIcon />
        <Typography style={{ fontWeight: 500, color: '#50429B', cursor: 'pointer' }} onClick={onClickApiConfig}>
          {t('configuration:apiConfiguration')}/
        </Typography>
        <Typography style={{ fontSize: 24, fontWeight: 700, color: '#2B2162' }}>
          {t('configuration:apiDocumentation')}
        </Typography>
      </Row>
      <Row>
        <Col span={6}>
          <Menu
            style={{ borderRadius: 12 }}
            mode="inline"
            items={menuItems as any}
            onClick={onMenuClick}
            expandIcon={renderExpandIcon}
          />
        </Col>
        <Col span={18}>
          {selectedContent && (
            <Card style={{ marginLeft: 12, overflow: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
              <Row style={{ display: 'flex', alignItems: 'center', gap: 4, height: 44, marginBottom: 12 }}>
                <InfoIcon />
                <Typography>{selectedContent.description}</Typography>
              </Row>
              <Typography style={{ marginBottom: 12, fontWeight: 700, color: '#2F2D39' }}>
                {selectedContent.apiName}
              </Typography>
              <Row style={{ height: 4, width: 40, background: '#50429B', borderRadius: 8, marginBottom: 16 }}></Row>
              <Typography style={{ marginBottom: 24 }}>
                {t('configuration:method')}: <b>{selectedContent.method}</b>
              </Typography>
              <Typography style={{ fontWeight: 700, marginBottom: 12 }}>{t('configuration:request')}</Typography>
              <Row style={{ height: 4, width: 40, background: '#50429B', borderRadius: 8, marginBottom: 16 }}></Row>
              <Table
                style={{ marginBottom: 24 }}
                dataSource={selectedContent.request?.attributes}
                columns={columns}
                pagination={false}
              />
              <Typography style={{ fontWeight: 700, marginBottom: 12 }}>
                {t('configuration:responseProperties')}
              </Typography>
              <Row style={{ height: 4, width: 40, background: '#50429B', borderRadius: 8, marginBottom: 16 }}></Row>
              <Table
                style={{ marginBottom: 24 }}
                dataSource={selectedContent.response?.properties}
                columns={columns}
                pagination={false}
              />
              <Typography style={{ fontWeight: 700, marginBottom: 12 }}>{t('configuration:example')}</Typography>
              <Row style={{ height: 4, width: 40, background: '#50429B', borderRadius: 8, marginBottom: 16 }}></Row>
              <div style={{ background: '#F7F5FF', padding: 16, borderRadius: 12 }}>
                <Typography>
                  {t('configuration:method')}: {selectedContent.method}
                </Typography>
                <Typography>{t('configuration:responseExpectResult1')}</Typography>
                <Typography style={{ marginLeft: 24 }}>{t('configuration:responseExpectResult2')}</Typography>
                <Typography style={{ marginLeft: 24 }}>{t('configuration:responseExpectResult3')}</Typography>
                <Typography style={{ marginLeft: 24 }}>{t('configuration:responseExpectResult4')}</Typography>
                <Typography style={{ marginLeft: 48 }}>{t('configuration:responseExpectResult5')}</Typography>
                <Typography style={{ marginLeft: 48 }}>{t('configuration:responseExpectResult6')}</Typography>
                <Typography style={{ marginLeft: 48 }}>{t('configuration:responseExpectResult7')}</Typography>
                <Typography style={{ marginLeft: 24 }}>{'}'}</Typography>
                <Typography style={{ marginLeft: 24 }}>{']'}</Typography>
                <Typography>{'}'}</Typography>
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </>
  );
};

export default APIDocumentationPage;
