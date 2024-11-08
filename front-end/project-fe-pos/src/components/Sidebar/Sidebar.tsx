import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Menu, Modal } from 'antd';
import React, { useState } from 'react';
import OrderList from '../OrderList/OrderList';
import './Sidebar.scss';
const Sidebar: React.FC = () => {
  const [isShowModalOrder, setIsShowModalOrder] = useState(false);
  const onOK = () => {};
  const onCancel = () => {
    setIsShowModalOrder(false);
  };
  return (
    <>
      <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          In-Store
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<ShoppingCartOutlined />}
          onClick={() => {
            setIsShowModalOrder(true);
          }}
        >
          Order
        </Menu.Item>
      </Menu>
      {isShowModalOrder && (
        <Modal
          title={<h1>POS Order</h1>}
          open={isShowModalOrder}
          centered
          onOk={() => {
            onOK();
          }}
          onCancel={() => {
            onCancel();
          }}
          footer={<></>}
          className="modal-order"
        >
          <div className="order-list">
            <OrderList loadData={isShowModalOrder} />
          </div>
        </Modal>
      )}
    </>
  );
};

export default Sidebar;
