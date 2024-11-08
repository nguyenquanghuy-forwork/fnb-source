import { IWarehouse } from '@/features/warehouse/type';
import { Button, Popover, Select, Spin, Typography } from 'antd';
import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface WarehouseDetailPopoverProps {
  record: IWarehouse;
  onRefresh?: () => void;
}
export interface IBranchesTiktokShopOption {
  id: string;
  name: string;
}
const WarehouseDetailPopover = ({ record, children, onRefresh }: WarehouseDetailPopoverProps & PropsWithChildren) => {
  const [partnerWarehouseId, setPartnerWarehouseId] = useState(record?.partnerWarehouseId);
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState({
    currentPage: 1,
    total: 0,
    pageSize: 10,
  });
  const [options, setOptions] = useState<IBranchesTiktokShopOption[]>([]);
  const [hasContentLoading, setHasContentLoading] = useState(false);
  const [t] = useTranslation();
  const hasLinkingPartner = useMemo(() => {
    return (
      record?.partnerWarehouseId &&
      record?.partnerWarehouseName &&
      record?.partnerWarehouseId?.length > 0 &&
      record?.partnerWarehouseName?.length > 0
    );
  }, [record?.partnerWarehouseId, record?.partnerWarehouseName]);

  const field = [
    t('warehouse:warehouseName'),
    `${t('warehouse:warehouseType')}:`,
    `${t('warehouse:fullAddress')}:`,
    `${t('warehouse:contactPerson')}:`,
    `${t('warehouse:contactPhone')}:`,
  ];

  const tempData = [
    record?.name ?? '-',
    t(`warehouse:${record?.typeName?.toLowerCase()}`) ?? '-',
    record?.address ?? '-',
    record?.contactPerson ?? '-',
    record?.contactPhone ?? '-',
  ];

  const loadOptions = useCallback(async (currentPage = 1, pageSize = 10) => {}, [page?.pageSize]);

  useEffect(() => {
    open && loadOptions();
  }, [loadOptions, open]);

  const handleClickCancel = (open: boolean) => {
    setPartnerWarehouseId(record?.partnerWarehouseId);
    setOpen(open);
  };

  const handleClickSave = async () => {
    const partnerWarehouse = options.find((x: any) => x.id === partnerWarehouseId);
  };

  const _renderContent = () => {
    return (
      <div
        style={{
          padding: 16,
          width: window.innerWidth - 24,
          maxWidth: 500,
        }}
      >
        {/*General information*/}
        <div
          style={{
            marginBottom: 12,
            color: '#2B2162',
            fontFamily: 'Plus Jakarta Sans',
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
          }}
        >
          {t('warehouse:generalInformation')}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'max-content auto',
            columnGap: 16,
            rowGap: 8,
          }}
        >
          {field.map((value, index) => (
            <>
              <div
                key={`general-information-label-${index}`}
                style={{
                  color: '#808080',
                  fontFamily: 'Plus Jakarta Sans',
                  fontSize: 16,
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: 'normal',
                }}
              >
                {field[index]}
              </div>
              <div
                key={`general-information-value-${index}`}
                style={{
                  color: '#282828',
                  fontFamily: 'Plus Jakarta Sans',
                  fontSize: 16,
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: 'normal',
                }}
              >
                {tempData[index]}
              </div>
            </>
          ))}
        </div>

        {/*Warehouse linking*/}
        <div
          style={{
            marginTop: 24,
            marginBottom: 12,
            color: '#2B2162',
            fontFamily: 'Plus Jakarta Sans',
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
          }}
        >
          {t('warehouse:warehouseLinking')}
        </div>
        <div
          style={{
            marginBottom: 8,
            color: '#2F2D39',
            fontFamily: 'Plus Jakarta Sans',
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: '500',
            lineHeight: '24px',
          }}
        >
          {t('warehouse:fAndBBranch')}
        </div>
        <Select
          value={partnerWarehouseId && partnerWarehouseId?.length > 0 ? partnerWarehouseId : undefined}
          onChange={value => setPartnerWarehouseId(value)}
          style={{ width: '-webkit-fill-available' }}
          allowClear
          placeholder={
            <div
              style={{
                fontFamily: 'Plus Jakarta Sans',
                fontSize: 16,
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '24px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {t('warehouse:selectFAndBBranch')}
            </div>
          }
          filterOption={false}
          labelRender={props => (
            <div
              style={{
                fontFamily: 'Plus Jakarta Sans',
                fontSize: 16,
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '24px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {hasLinkingPartner ? record?.partnerWarehouseName : props.label}
            </div>
          )}
          onPopupScroll={async (e: any) => {
            const { target } = e;
            if (Math.ceil(target.scrollTop + target.offsetHeight) === target.scrollHeight) {
              if (options.length < page.total) {
                setHasContentLoading(true);
              }
            }
          }}
          dropdownRender={menu => (
            <>
              {menu}
              {hasContentLoading ? <Spin size="small" style={{ padding: '0 12px' }} /> : null}
            </>
          )}
        >
          {options?.map(item => (
            <Select.Option key={`option-${item.id}`} value={item.id}>
              <div
                style={{
                  fontFamily: 'Plus Jakarta Sans',
                  fontSize: 16,
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '24px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.name}
              </div>
            </Select.Option>
          ))}
        </Select>

        {/*Button*/}
        <div
          style={{
            display: 'flex',
            marginTop: 24,
            gap: 16,
            justifyContent: 'flex-end',
          }}
        >
          <Button
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 12,
              paddingLeft: 12,
              height: 'fit-content',
              borderWidth: 0,
              maxWidth: 150,
              width: '100%',
              borderRadius: 12,
              boxShadow: 'none',
            }}
            onClick={() => handleClickCancel(false)}
          >
            <Typography
              style={{
                color: '#50429B',
                fontFamily: 'Plus Jakarta Sans',
                fontSize: 16,
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: '24px',
              }}
            >
              {t('warehouse:cancel')}
            </Typography>
          </Button>
          <Button
            disabled={record?.partnerWarehouseId === partnerWarehouseId}
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 12,
              paddingLeft: 12,
              height: 'fit-content',
              borderWidth: 0,
              maxWidth: 150,
              width: '100%',
              borderRadius: 12,
              boxShadow: 'none',
              backgroundColor: '#50429B',
              opacity: record?.partnerWarehouseId === partnerWarehouseId ? 0.5 : 1,
            }}
            onClick={handleClickSave}
          >
            <Typography
              style={{
                color: '#FFF',
                fontFamily: 'Plus Jakarta Sans',
                fontSize: 16,
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: '24px',
              }}
            >
              {t('warehouse:save')}
            </Typography>
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Popover
      open={open}
      overlayInnerStyle={{
        padding: 0,
        borderRadius: 12,
        border: '1px solid #50429B',
      }}
      arrow={false}
      placement={'bottom'}
      autoAdjustOverflow={true}
      content={_renderContent}
      trigger="click"
      onOpenChange={open => handleClickCancel(open)}
    >
      {children}
    </Popover>
  );
};

export default WarehouseDetailPopover;
