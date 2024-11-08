import { orderRequest } from '@/app/api';
import { Order } from '@/app/api/requests';
import React, { useEffect, useState } from 'react';
import OrderCard from '../OrderCard/OrderCard';
import './OrderList.scss';

const OrderList: React.FC<any> = props => {
  const { loadData } = props;
  const [orders, setOrders] = useState<Order[]>([]);

  const getInitData = async () => {
    const response = await orderRequest.getOrders(undefined, undefined, undefined, undefined);
    console.log('response', response);
    if (response.data && response.data.orders) {
      console.log('set orderas', response.data.orders);
      setOrders(response.data?.orders);
    }
  };
  console.log('orders', orders);
  useEffect(() => {
    getInitData();
  }, [loadData]);

  return (
    <div className="order-list">
      {orders.map(order => (
        <OrderCard
          key={order.id}
          orderId={order.code}
          totalBill={order.totalAmount}
          createdTime={order.createdTime}
          status={order.status}
        />
      ))}
    </div>
  );
};

export default OrderList;
