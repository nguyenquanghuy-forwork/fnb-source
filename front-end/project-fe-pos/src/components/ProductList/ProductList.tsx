import { Button, Card, Col, Row } from 'antd';
import React from 'react';

const { Meta } = Card;

interface ProductListProps {
  products: any[];
  cart: any[];
  setCart: (cart: any[]) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, cart, setCart }) => {
  const addToCart = (product: any) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <Row gutter={[16, 16]} className="product-list">
      {products.map(product => {
        const price =
          product.productPrices && product.productPrices.length > 0 ? product.productPrices[0].priceValue : 'N/A';
        return (
          <Col span={8} key={product.id}>
            <Card
              hoverable
              cover={
                <img
                  alt={product.name}
                  src={product.thumbnail || 'https://via.placeholder.com/150'}
                  style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                />
              }
              style={{
                height: '500px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Meta
                title={product.name}
                description={
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {product.description}
                  </div>
                }
              />
              <div>
                <span>{price}đ</span>
              </div>
              <Button type="primary" onClick={() => addToCart(product)} style={{ marginTop: 10 }}>
                Add to Cart
              </Button>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default ProductList;
