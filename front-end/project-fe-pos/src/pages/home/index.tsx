import { productRequest } from '@/app/api';
import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import ProductList from '../../components/ProductList/ProductList';
import Sidebar from '../../components/Sidebar/Sidebar';
import './index.scss';

const { Sider, Content } = Layout;

const Main: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const getInitData = async () => {
    const response = await productRequest.getProducts(undefined, undefined, undefined, undefined);
    if (response.data && response.data.products) {
      setProducts(response.data.products);
    }
  };

  useEffect(() => {
    getInitData();
  }, []);

  return (
    <Layout className="layout">
      <Sider width={200} className="site-layout-background">
        <Sidebar />
      </Sider>
      <Layout>
        <Content className="content-product-list" style={{ padding: '0 50px' }}>
          <ProductList products={products} cart={cart} setCart={setCart} />
        </Content>
        <Sider width={300} className="site-layout-background">
          <OrderSummary cart={cart} setCart={setCart} />
        </Sider>
      </Layout>
    </Layout>
  );
};

export default Main;
