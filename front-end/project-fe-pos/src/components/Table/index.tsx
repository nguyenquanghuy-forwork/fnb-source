import { LoadingOutlined } from '@ant-design/icons';
import { Col, Pagination, Row, Table } from 'antd';
// import { FolderIcon } from 'constants/icons.constants';
import { FolderIcon } from '@/assets/icons/FolderIcon';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './index.scss';

const FnbTable = (props: any) => {
  const [t] = useTranslation();
  const {
    columns, // define columns
    dataSource, // define dataSource
    currentPageNumber, // number of current page
    pageSize, // number of record per page
    total, // total number of record
    onChangePage,
    rowSelection,
    className,
    tableId,
    bordered,
    scrollX,
    scrollY,
    summary,
    loading,
    onScroll,
    expandable,
    rowKey,
    emptyText,
    cursorGrabbing,
  } = props;

  const defaultScrollX = 900;

  // register grabbing scroll table
  useEffect(() => {
    const elements = document.querySelectorAll('.ant-table-content');
    if (elements?.length > 0) {
      let pos = { top: 0, left: 0, x: 0, y: 0 };
      elements?.forEach((item: any) => {
        const mouseMoveHandler = function (e: any) {
          // How far the mouse has been moved
          const dx = e.clientX - pos.x;
          const dy = e.clientY - pos.y;

          // Scroll the element
          item.scrollTop = pos.top - dy;
          item.scrollLeft = pos.left - dx;
        };

        const mouseUpHandler = function () {
          item.removeEventListener('mousemove', mouseMoveHandler);
          item.removeEventListener('mouseup', mouseUpHandler);
          item.style.cursor = 'grab';
          item.style.removeProperty('user-select');
        };

        const mouseDownHandler = function (e: any) {
          pos = {
            // The current scroll
            left: item.scrollLeft,
            top: item.scrollTop,
            // Get the current mouse position
            x: e.clientX,
            y: e.clientY,
          };

          if (!cursorGrabbing) {
            item.style.cursor = 'grabbing';
          }
          item.style.userSelect = 'none';
          item.addEventListener('mousemove', mouseMoveHandler);
          item.addEventListener('mouseup', mouseUpHandler);
        };
        item.removeEventListener('mousedown', mouseDownHandler);
        item.addEventListener('mousedown', mouseDownHandler);
      });
    }
  }, [dataSource]);

  useEffect(() => {
    const elements = document.querySelectorAll('.ant-table-content');

    if (onScroll && elements?.length > 0) {
      elements?.forEach((item: any) => {
        item.addEventListener('scroll', onScroll);
      });
    }

    return () => {
      if (elements?.length > 0) {
        elements?.forEach((item: any) => {
          item.removeEventListener('scroll', onScroll);
        });
      }
    };
  }, [onScroll]);

  const getTableColumns = () => {
    return columns;
  };

  const renderPagination = () => {
    const hasPagination = total > pageSize;

    if (hasPagination) {
      return (
        <div className="fnb-tbl-pagination">
          <div className="fnb-pagination">
            <Pagination current={currentPageNumber} total={total} defaultPageSize={pageSize} onChange={onChangePage} />
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="fnb-table-wrapper hide-pagination-options">
        <Row>
          <Col span={24}>
            <Table
              showSorterTooltip={false}
              loading={{
                spinning: loading || loading === true,
                indicator: <LoadingOutlined />,
              }}
              locale={{
                emptyText: (
                  <div className="table-emty-data">
                    <p className="text-center" style={{ marginBottom: '12px' }}>
                      <FolderIcon />
                    </p>
                    <span
                      className="text-center body-2"
                      style={{ marginBottom: '181px', color: '#858585', display: 'contents' }}
                    >
                      {emptyText ?? t('common:noDataFound')}
                    </span>
                  </div>
                ),
              }}
              scroll={{ x: scrollX ?? defaultScrollX, y: scrollY }}
              className={`fnb-table form-table ${className}`}
              columns={getTableColumns()}
              dataSource={dataSource}
              rowSelection={rowSelection}
              pagination={false}
              bordered={bordered}
              id={tableId}
              expandable={expandable}
              rowKey={rowKey ?? 'index'}
              summary={summary}
            />
            {renderPagination()}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default FnbTable;
