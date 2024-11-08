import { tikTokShopRequest, warehouseRequest } from '@/app/api';
import { OpenApiResponseOfIEnumerableOfTikTikShopModel, SyncWarehouseRequest } from '@/app/api/requests';
import { LinkBranchIcon, LinkedBranchIcon } from '@/assets/icons';
import { FilterIcon } from '@/assets/icons/FilterIcon';
import { SearchIcon } from '@/assets/icons/SearchIcon';
import { SyncIcon } from '@/assets/icons/SyncIcon';
import '@/assets/scss/pages/_warehouse.scss';
import Button from '@/components/Button';
import FnbTable from '@/components/Table';
import Filter from '@/containers/filter';
import PageTitle from '@/containers/fnb-page-title/index';
import TextInputField from '@/containers/fnb-text-input';
import { ITypeDropDown, IWarehouse, IWarehouseListRequest } from '@/features/warehouse/type';
import { executeAfter } from '@/utils/helpers';
import { Button as ButtonAntd, Col, Modal, Row, Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import WarehouseDetailPopover from './components/WarehouseDetailPopover';
import FilterWarehouse from './components/filterWarehouse';

const paging = {
  pageNumber: 1,
  pageSize: 20,
};

const TikTokWarehousePage = () => {
  const [t] = useTranslation();
  const [data, setData] = useState<IWarehouse[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(1);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastSync, setLastSync] = useState<string>('');
  const [showPopover, setShowPopover] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recordSelected, setRecordSelected] = useState<IWarehouse>();
  const [shopList, setShopList] = useState<ITypeDropDown[]>([]);
  const [dataFilter, setDataFilter] = useState<IWarehouseListRequest>({
    pageNumber: paging.pageNumber,
    pageSize: paging.pageSize,
    keySearch: undefined,
    type: undefined,
    isLinkingPartner: undefined,
    shopId: undefined,
  });
  const isMobile = useMediaQuery({ maxWidth: 576 });

  const handleConfirmUnlink = (record: IWarehouse) => {
    setIsModalVisible(true);
    setRecordSelected(record);
  };

  const onConfirmUnlink = async () => {
    if (!recordSelected?.id) return;
  };

  const columns = [
    {
      title: t('common:noNumber'),
      dataIndex: 'no',
      key: 'no',
      render: (_: any, record: any) => {
        return {
          props: {
            style: { padding: 0 },
          },
          children: (
            <WarehouseDetailPopover record={record} onRefresh={onRefresh}>
              <div style={{ padding: 16 }}>{record?.no}</div>
            </WarehouseDetailPopover>
          ),
        };
      },
    },
    {
      title: t('warehouse:warehouseType'),
      dataIndex: 'typeName',
      key: 'typeName',
      width: '11%',
      render: (_: any, record: any) => {
        return {
          props: {
            style: { padding: 0 },
          },
          children: (
            <WarehouseDetailPopover record={record} onRefresh={onRefresh}>
              <div style={{ padding: 16, minWidth: 160, maxWidth: 170 }}>{record?.typeName}</div>
            </WarehouseDetailPopover>
          ),
        };
      },
    },
    {
      title: t('warehouse:warehouseName'),
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (_: any, record: any) => {
        return {
          props: {
            style: { padding: 0 },
          },
          children: (
            <WarehouseDetailPopover record={record} onRefresh={onRefresh}>
              <div style={{ padding: 16, minWidth: 300, maxWidth: 350 }}>
                <Paragraph ellipsis={{ tooltip: record?.name }}>{record?.name}</Paragraph>
              </div>
            </WarehouseDetailPopover>
          ),
        };
      },
    },
    {
      title: t('warehouse:warehouseAddress'),
      dataIndex: 'address',
      key: 'address',
      render: (_: any, record: any) => {
        return {
          props: {
            style: { padding: 0 },
          },
          children: (
            <WarehouseDetailPopover record={record} onRefresh={onRefresh}>
              <div style={{ minWidth: 400, padding: 16, maxWidth: 550 }}>
                <Paragraph ellipsis={{ tooltip: record?.address }}>{record?.address}</Paragraph>
              </div>
            </WarehouseDetailPopover>
          ),
        };
      },
    },
    {
      title: t('warehouse:shop'),
      dataIndex: 'shopName',
      key: 'shopName',
      render: (_: any, record: any) => {
        return {
          props: {
            style: { padding: 0 },
          },
          children: (
            <WarehouseDetailPopover record={record} onRefresh={onRefresh}>
              <div style={{ padding: 16, minWidth: 300, maxWidth: 330 }}>
                <Paragraph ellipsis={{ tooltip: record?.shopName }}>{record?.shopName}</Paragraph>
              </div>
            </WarehouseDetailPopover>
          ),
        };
      },
    },
    {
      title: t('warehouse:fAndBLinked'),
      dataIndex: 'partnerWarehouseName',
      key: 'partnerWarehouseName',
      render: (_: any, record: any) => {
        return {
          props: {
            style: { padding: 0 },
          },
          children: record?.partnerWarehouseId ? (
            <div style={{ minWidth: 250, maxWidth: 230 }}>
              <Row style={{ gap: 8, alignItems: 'center', minWidth: 'max-content' }}>
                <WarehouseDetailPopover record={record} onRefresh={onRefresh}>
                  <ButtonAntd
                    title={record?.partnerWarehouseName}
                    className="link-partner"
                    style={{
                      flexDirection: 'row',
                      display: 'flex',
                      alignItems: 'center',
                      padding: 0,
                      boxShadow: 'none',
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: 16,
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: '24px',
                        fontFamily: 'Plus Jakarta Sans',
                        maxWidth: 200,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {record?.partnerWarehouseName}
                    </Typography>
                  </ButtonAntd>
                </WarehouseDetailPopover>
                <a onClick={() => handleConfirmUnlink(record)}>
                  <LinkedBranchIcon />
                </a>
              </Row>
            </div>
          ) : (
            <WarehouseDetailPopover record={record} onRefresh={onRefresh}>
              <div style={{ minWidth: 250, maxWidth: 230 }} className="container-link-part">
                <ButtonAntd htmlType="button" className="link-part">
                  <Row style={{ gap: 8, alignItems: 'center', minWidth: 'max-content' }}>
                    <LinkBranchIcon />
                    <Typography
                      style={{
                        color: '#FFF',
                        fontSize: 16,
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: '24px',
                        fontFamily: 'Plus Jakarta Sans',
                      }}
                    >
                      {t('warehouse:linkNow', 'Link now')}
                    </Typography>
                  </Row>
                </ButtonAntd>
              </div>
            </WarehouseDetailPopover>
          ),
        };
      },
    },
  ];

  useEffect(() => {
    fetchDatableAsync(dataFilter);
  }, [dataFilter]);

  const fetchDatableAsync = async (param: IWarehouseListRequest) => {
    const paramReq: IWarehouseListRequest = {
      pageNumber: param.pageNumber,
      pageSize: param.pageSize,
      keySearch: param.keySearch,
      type: param.type,
      isLinkingPartner: param.isLinkingPartner,
      shopId: param.shopId,
    };
    setIsLoading(true);
  };

  const onClickFilterButton = async (event: any) => {
    if (!event?.defaultPrevented) {
      setShowPopover(true);
    }
    //get Shop
    await tikTokShopRequest
      .getTikTokShopList()
      .then((response: OpenApiResponseOfIEnumerableOfTikTikShopModel) => {
        let shops: ITypeDropDown = {
          id: '',
          name: t('common:all'),
        };
        const shopsData =
          response?.data?.map(item => {
            return { id: item?.id, name: item?.shopName } as ITypeDropDown;
          }) ?? [];
        setShopList([shops, ...shopsData]);
      })
      .catch((ex: any) => {
        console.log('ex', ex);
      });
  };

  const filterComponent = () => {
    return (
      showPopover && (
        <FilterWarehouse
          shopList={shopList}
          dataFilter={dataFilter}
          setDataFilter={setDataFilter}
          onResetFilter={onClearFilter}
        />
      )
    );
  };

  const onChangePage = async (pageNumber: number) => {
    const param = {
      ...dataFilter,
      pageNumber: pageNumber,
    };
    await fetchDatableAsync(param);
    setDataFilter(param);
  };

  const handleSearch = async (keySearch: any) => {
    executeAfter(500, async () => {
      const filter: IWarehouseListRequest = {
        ...dataFilter,
        keySearch: keySearch,
        pageNumber: 1,
      };
      setDataFilter(filter);
    });
  };

  const handleSync = async () => {
    const request: SyncWarehouseRequest = {};
    setIsLoading(true);
    await warehouseRequest
      .syncWareHouse(request)
      .then(async (response: any) => {
        if (response?.success) {
          await fetchDatableAsync(dataFilter);
        }
      })
      .catch((ex: any) => {
        console.log('catch', ex);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onClearFilter = () => {
    setShowPopover(false);
  };

  const onRefresh = async () => {
    await fetchDatableAsync(dataFilter);
  };

  return (
    <Col className="gap-12 page-warehouse-list h-100">
      {/* <PageTitle /> */}
      <Row className="title">
        <PageTitle content={t('warehouse:warehouseList')} />
      </Row>
      {/* <PageBody /> */}
      <div className="container h-fit-content">
        <div
          className={`d-flex ${isMobile ? 'f-direction-column gap-16' : 'f-direction-row'}`}
          style={{ justifyContent: 'space-between' }}
        >
          <div style={{ width: isMobile ? '100%' : '50%' }}>
            <TextInputField
              icon={<SearchIcon />}
              placeholder={t('warehouse:placeholderSearch')}
              onChange={handleSearch}
            />
          </div>
          {isMobile ? (
            <div className="d-flex f-direction-column gap-16">
              <div className="d-flex f-direction-row gap-16">
                <Button
                  text={t('common:sync')}
                  icon={<SyncIcon />}
                  htmlType="button"
                  className="btn-action flex-1"
                  classNameText="text-button"
                  onClick={handleSync}
                />
                <Filter
                  icon={<FilterIcon />}
                  isButton={true}
                  filter={{
                    onClickFilterButton: onClickFilterButton,
                    onClearFilter: onClearFilter,
                    buttonTitle: t('common:filter'),
                    component: filterComponent(),
                    filterClassName: 'popover-filter-customer-manager',
                  }}
                  classNameButton={'flex-1'}
                />
              </div>
              <div className="flex-align-item" style={{ justifyContent: 'flex-end' }}>
                <span>
                  {lastSync && (
                    <>
                      {t('common:lastSync')}: {lastSync}
                    </>
                  )}
                </span>
              </div>
            </div>
          ) : (
            <div className="d-flex f-direction-row gap-16 ml-2">
              <div className="flex-align-item">
                <span>
                  {lastSync && (
                    <>
                      {t('common:lastSync')}: {lastSync}
                    </>
                  )}
                </span>
              </div>
              <div className="d-flex f-direction-row gap-16">
                <Button
                  text={t('common:sync')}
                  icon={<SyncIcon />}
                  htmlType="button"
                  className="btn-action"
                  classNameText="text-button"
                  onClick={handleSync}
                />
                <Filter
                  icon={<FilterIcon />}
                  isButton={true}
                  filter={{
                    onClickFilterButton: onClickFilterButton,
                    onClearFilter: onClearFilter,
                    buttonTitle: t('common:filter'),
                    component: filterComponent(),
                    filterClassName: 'popover-filter-customer-manager',
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <div style={{ marginTop: 12, overflow: 'auto' }}>
          <FnbTable
            className="mt-4"
            columns={columns}
            pageSize={paging.pageSize}
            dataSource={data}
            currentPageNumber={currentPageNumber}
            total={totalRecords}
            onChangePage={onChangePage}
            loading={isLoading}
          />
        </div>
      </div>
      <Modal
        width={396}
        className="confirm-modal"
        title={t('warehouse:unlinkWarehouse')}
        closeIcon
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        okText={'Unlink'}
        cancelText={'Discard'}
      >
        <Row className="modal-content">
          <Col span={24}>
            <p
              dangerouslySetInnerHTML={{
                __html: t('warehouse:areYouSureToUnlinkThisTikTokWarehouse'),
              }}
            ></p>
          </Col>
        </Row>

        <Row className="modal-footer">
          <div className="container-btn-discard mr-2 flex-1 ">
            <ButtonAntd className="btn-discard" onClick={() => setIsModalVisible(false)}>
              {t('common:discard')}
            </ButtonAntd>
          </div>
          <div className="container-btn-unlink ml-2 flex-1 ">
            <ButtonAntd htmlType="button" className="link-part" onClick={() => onConfirmUnlink()}>
              {t('common:unlink')}
            </ButtonAntd>
          </div>
        </Row>
      </Modal>
    </Col>
  );
};

export default TikTokWarehousePage;
