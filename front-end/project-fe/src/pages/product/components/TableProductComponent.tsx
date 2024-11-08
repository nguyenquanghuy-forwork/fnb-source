import { productRequest } from '@/app/api';
import type { TableProps } from 'antd';
import { Space, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DataType {
  id: any;
  code: any;
  name: any;
  description: any;
}

const TableMaterialComponent: React.FC<any> = props => {
  const { productData } = props;
  const [transformedData, setTransformedData] = useState<DataType[] | undefined>(undefined);
  const navigate = useNavigate();
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <a
          onClick={() => {
            // Replace with appropriate navigation based on record data
            navigate(`/product/management/create?id=${record.id}`);
            console.log('record', record);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              handleDeleteProduct(record.id);
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];
  const handleDeleteProduct = (id: any) => {
    console.log('id', id);
    deleteMaterial(id);
  };

  const deleteMaterial = async (id: any) => {
    var response = await productRequest.deleteMaterial(id);
    if (response.success) {
      message.success('Delete product success');
      window.location.reload();
    } else {
      message.error('Delete product failed');
    }
  };

  useEffect(() => {
    if (productData) {
      console.log('productData', productData);
      const transformedData: DataType[] = productData.products?.map((product: any) => ({
        id: product.id,
        code: product.code,
        name: product.name,
        description: product.description,
      }));
      console.log('transformedData', transformedData);
      setTransformedData(transformedData);
    }
  }, [productData]);
  return <Table loading={productData == null} columns={columns} dataSource={transformedData} />;
};

export default TableMaterialComponent;
