import { orderRequest } from '@/app/api';
import { CreateOrderRequest } from '@/app/api/requests';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Input, List, Row, Typography, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

interface OrderSummaryProps {
  cart: any[];
  setCart: (cart: any[]) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const totalPrice = cart.reduce((total, item) => {
    const price = item.productPrices && item.productPrices.length > 0 ? item.productPrices[0].priceValue : 0;
    return total + price * item.quantity;
  }, 0);

  const incrementQuantity = (id: string) => {
    setCart(cart.map(item => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)));
  };

  const decrementQuantity = (id: string) => {
    setCart(cart.map(item => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = async () => {
    console.log('cart', cart);
    const orderItems = cart.map(item => ({
      productPriceId: item.productPrices[0].id, // Assuming there is only one product price and using its id
      productPriceName: item.productPrices[0].priceName, // Using the price name from productPrices array
      originalPrice: item.productPrices[0].priceValue, // Using the price value from productPrices array
      quantity: item.quantity, // Using the quantity directly from the item
      productName: item.name, // Using the product name
      notes: item.notes || '', // Assuming notes can be optional and default to an empty string if not provided
    }));

    const orderDto: CreateOrderRequest = {
      note: 'Order Note',
      items: orderItems,
    };
    console.log('orderDto', orderDto);
    try {
      const response = await orderRequest.createOrder(orderDto, undefined);
      if (response.data) {
        console.log('Order created:', response.data);
        message.success('Update Product success.');
        clearCart();
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div style={{ padding: 20, backgroundColor: '#f5f5f5', height: '100%' }} className="order-summary">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <Text>Order No. -</Text>
        <Button type="text" icon={<DeleteOutlined />} onClick={clearCart} style={{ color: 'red' }}>
          Clear all
        </Button>
      </div>
      <List
        dataSource={cart}
        className="list-items"
        renderItem={item => (
          <List.Item style={{ padding: '10px 0', borderBottom: '1px solid #e8e8e8' }}>
            <Row style={{ width: '100%' }} gutter={10}>
              <Col span={24}>
                <Text>{item.name}</Text>
              </Col>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="text" icon={<MinusOutlined />} onClick={() => decrementQuantity(item.id)} />
                <Input value={item.quantity} style={{ width: 40, textAlign: 'center', margin: '0 5px' }} readOnly />
                <Button type="text" icon={<PlusOutlined />} onClick={() => incrementQuantity(item.id)} />
              </Col>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Text>
                  {(item.productPrices && item.productPrices.length > 0 ? item.productPrices[0].priceValue : 0) *
                    item.quantity}
                  đ
                </Text>
              </Col>
            </Row>
          </List.Item>
        )}
      />
      <div className="group-bottom">
        <div style={{ marginTop: 20 }}>
          <Text>Total: {totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
        </div>
        <div>
          <Button
            type="primary"
            onClick={() => {
              createOrder();
            }}
          >
            Create Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
