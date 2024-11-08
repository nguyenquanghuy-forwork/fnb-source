import React from 'react';

interface OrderCardProps {
  orderId?: string;
  totalBill?: number;
  createdTime?: string;
  status?: string;
}

const OrderCard: React.FC<OrderCardProps> = ({ orderId, totalBill, createdTime, status }) => {
  return (
    <div className="order-card">
      <h3>Order #{orderId}</h3>
      <p>Total Bill: {totalBill} đ</p>
      <p>Created Time: {createdTime}</p>
      <p>Status: {status}</p>
      <button>PAY</button>
    </div>
  );
};

export default OrderCard;
