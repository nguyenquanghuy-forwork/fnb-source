import { configurationRequest } from '@/app/api';
import { ApiConfig, UpdateApiConfigurationsRequest } from '@/app/api/requests';
import { Button, Card, Col, Form, Input, Row, Typography, message } from 'antd';
import { useEffect, useState } from 'react';
import '../../../assets/scss/pages/_api-documentation.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface ApiConfiguration {
  apiConfigId: string;
  url: string;
}

interface GroupConfiguration {
  configurations: ApiConfiguration[];
}

interface ConfigFormValues {
  [key: string]: GroupConfiguration[];
}

const APIConfigurationPage = () => {
  const [form] = Form.useForm();
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [listApiData, setListApiData] = useState<ApiConfig[]>();

  useEffect(() => {
    configurationRequest.getApiConfigurations().then(response => {
      if (response?.data?.apiConfigs) {
        setListApiData(response.data.apiConfigs);
      }
    });
  }, []);

  const onClickApiDocument = () => {
    navigate('/config/api-documentation');
  };

  const setFormItem = () => {
    if (listApiData) {
      const groupedData = groupByApiConfigGroupName(listApiData);
      const groupedDataArray = Object.entries(groupedData);
      groupedDataArray.forEach(([, items], index) => {
        items.forEach((item, itemIndex) => {
          form.setFieldValue(['groupName', index, 'configurations', itemIndex, 'apiConfigId'], item.id);
          form.setFieldValue(['groupName', index, 'configurations', itemIndex, 'url'], item.url);
        });
      });
    }
  };
  const onChangeUrl = (value: string, index: number, itemIndex: number, item: ApiConfig) => {
    const formValue = form.getFieldsValue();
    const { groupName } = formValue;
    groupName[index].configurations[itemIndex].apiConfigId = item.id;
    form.setFieldsValue(formValue);
  };

  const onFinish = (values: ConfigFormValues) => {
    const configurations: ApiConfiguration[] = Object.values(values)
      .flat()
      .flatMap((group: GroupConfiguration) => group.configurations);
    const req: UpdateApiConfigurationsRequest = {
      listApiConfig: configurations,
    };
    configurationRequest.updateApiConfigurations(req).then(rs => {
      if (rs) {
        message.success(t('common:updateSuccessfully'));
      }
    });
  };

  const groupByApiConfigGroupName = (data: ApiConfig[]): { [key: string]: ApiConfig[] } => {
    return data.reduce((acc: { [key: string]: ApiConfig[] }, item: ApiConfig) => {
      const groupName = item.apiConfigGroupName ?? '';
      acc[groupName] = acc[groupName] || [];
      acc[groupName].push(item);
      return acc;
    }, {});
  };

  if (!listApiData) return <></>;

  const groupedData = groupByApiConfigGroupName(listApiData);
  const groupedDataArray = Object.entries(groupedData).map(([groupName, items]) => ({ groupName, items }));
  return (
    <>
      <Form form={form} onFinish={onFinish}>
        <Row className="api-config-header">
          <Typography style={{ fontSize: 24, fontWeight: 700, color: '#2B2162' }}>
            {t('configuration:apiConfiguration')}
          </Typography>
          <Col>
            <Button style={{ marginRight: 16 }} type="default" onClick={onClickApiDocument}>
              {t('configuration:documentation')}
            </Button>
            <Button type="primary" htmlType="submit">
              {t('common:update')}
            </Button>
          </Col>
        </Row>

        {groupedDataArray.map(({ groupName, items }, index) => (
          <Card key={index} style={{ marginBottom: 12, borderRadius: 12 }}>
            <Typography style={{ marginBottom: 12, fontWeight: 700, color: '#2F2D39' }}>{groupName}</Typography>
            <Row style={{ height: 4, width: 40, background: '#50429B', borderRadius: 8 }}></Row>
            <Row>
              {items.map((item, itemIndex) => (
                <Col key={itemIndex} span={12} style={{ paddingTop: 16, paddingLeft: itemIndex % 2 === 0 ? 0 : 16 }}>
                  <Typography style={{ marginBottom: 8, color: '#2F2D39' }}>
                    {item.name} <span style={{ color: '#DB1B1B' }}>*</span>
                  </Typography>
                  <Form.Item name={['groupName', index, 'configurations', itemIndex, 'apiConfigId']} hidden>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    rules={[{ required: true, message: t('common:required') }]}
                    name={['groupName', index, 'configurations', itemIndex, 'url']}
                  >
                    <Input
                      placeholder={t('configuration:enterURL')}
                      onChange={event => {
                        onChangeUrl(event.target.value, index, itemIndex, item);
                      }}
                    />
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </Card>
        ))}
        {void setFormItem()}
      </Form>
    </>
  );
};

export default APIConfigurationPage;
