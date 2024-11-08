import '@/assets/scss/pages/_warehouse.scss';
import FnbSelectSingle from '@/components/fnb-select-single';
import { EnumWarehouseType } from '@/features/warehouse/configs/enum';
import { ITypeDropDown, IWarehouseListRequest } from '@/features/warehouse/type';
import { Card, Col, Form, Radio, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IFilterWarehouse {
  shopList?: ITypeDropDown[];
  dataFilter?: IWarehouseListRequest;
  setDataFilter?: (param: IWarehouseListRequest) => void;
  onResetFilter?: () => void;
}

export default function FilterWarehouse(props: IFilterWarehouse) {
  const [t] = useTranslation();
  const [form] = Form.useForm();
  const { shopList, dataFilter, setDataFilter = () => {} } = props;
  const defaultValue = '';
  const [resetFilter, setResetFilter] = useState(false);

  useEffect(() => {
    form.setFieldsValue(dataFilter);
  }, []);

  const onApplyFilter = () => {
    let formValue = form.getFieldsValue();
    const filter: IWarehouseListRequest = {
      ...dataFilter,
      pageNumber: 1,
      isLinkingPartner: formValue?.isLinked,
      type: formValue?.type,
      shopId: formValue?.shopId,
    };
    setDataFilter(filter);
    setResetFilter(countFilterControl(filter) < 1 ? false : true);
  };

  const countFilterControl = (param: IWarehouseListRequest) => {
    let countType = param.type === undefined || param.type === null || !param.type ? 0 : 1;
    let countShop = param.shopId === undefined || param.shopId === null || !param.shopId ? 0 : 1;
    let countLinking =
      param.isLinkingPartner === null || param.isLinkingPartner === null || !param.isLinkingPartner ? 0 : 1;

    return countType + countShop + countLinking;
  };

  const onResetForm = () => {
    form?.resetFields();
    onApplyFilter();
  };

  const warehouseType = [
    {
      id: '',
      name: t('common:all'),
    },
    {
      id: EnumWarehouseType.PICKUP,
      name: t('warehouse:pickup'),
    },
    {
      id: EnumWarehouseType.RETURN,
      name: t('warehouse:return'),
    },
  ] as ITypeDropDown[];

  const linkingType = [
    {
      value: '',
      name: t('common:all'),
    },
    {
      value: true,
      name: t('common:yes'),
    },
    {
      value: false,
      name: t('common:no'),
    },
  ];

  return (
    <Form form={form} onFieldsChange={onApplyFilter} className="filter-popover">
      <Card className="form-filter-popover">
        <Col>
          <div className="first-column" style={{ marginBottom: 8 }}>
            <span>{t('warehouse:shopName')}</span>
          </div>

          <div className="second-column">
            <Form.Item name="shopId">
              <FnbSelectSingle
                className="form-select warehouse-dropdown"
                showSearch
                defaultValue={defaultValue}
                option={shopList}
              />
            </Form.Item>
          </div>
        </Col>

        <Col>
          <div className="first-column">
            <span>{t('warehouse:warehouseType')}</span>
          </div>

          <div className="second-column">
            <Form.Item name="type">
              <FnbSelectSingle className="form-select" showSearch defaultValue={defaultValue} option={warehouseType} />
            </Form.Item>
          </div>
        </Col>

        <Col>
          <div className="first-column">
            <span>{t('warehouse:fAndBLinked')}</span>
          </div>

          <div className="second-column">
            <Form.Item name="isLinked">
              <Radio.Group defaultValue={defaultValue} buttonStyle="solid">
                {linkingType?.map((item: any) => (
                  <Radio value={item?.value}>{item?.name}</Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </div>
        </Col>

        <Row className="row-reset-filter">
          <div onClick={() => onResetForm()} className={`reset-filter ${!resetFilter ? 'base-filter' : 'data-filter'}`}>
            {t('common:resetAllFilter')}
          </div>
        </Row>
      </Card>
    </Form>
  );
}
