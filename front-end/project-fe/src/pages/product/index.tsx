import { productRequest } from '@/app/api';
import { GetProductsResponse } from '@/app/api/requests';
import { Button, Divider } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableMaterialComponent from './components/TableProductComponent';
import './index.scss';

const ProductManagementPage = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState<GetProductsResponse | null>(null);
  const getInitData = async () => {
    var response = await productRequest.getProducts(undefined, undefined, undefined, undefined);
    if (response.data) {
      if (Array.isArray(response.data)) {
        setProductData(response.data);
      } else {
        // Wrap single object in an array
        setProductData(response.data);
      }
    }
  };

  useEffect(() => {
    getInitData();
  }, []);

  return (
    <div>
      <div className="group-header">
        <span className="header-title">Product Management</span>
        <div className="group-button-header">
          <Button
            type="primary"
            onClick={() => {
              navigate('/product/management/create');
            }}
          >
            Add Product
          </Button>
        </div>
      </div>
      <Divider />
      <TableMaterialComponent productData={productData} />
    </div>
  );
};

export default ProductManagementPage;
