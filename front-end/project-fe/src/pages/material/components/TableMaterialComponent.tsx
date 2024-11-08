import { materialRequest } from '@/app/api';
import type { TableProps } from 'antd';
import { Space, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DataType {
  id: any;
  code: any;
  name: any;
  quantity: any;
  costPerUnit: any;
  description: any;
}

const TableMaterialComponent: React.FC<any> = props => {
  const { materialData } = props;
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
            navigate(`/inventory/material/create?id=${record.id}`);
            console.log('record', record);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Cost Per Unit',
      dataIndex: 'costPerUnit',
      key: 'costPerUnit',
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
              handleDeleteMaterial(record.id);
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];
  const handleDeleteMaterial = (id: any) => {
    console.log('id', id);
    deleteMaterial(id);
  };

  const deleteMaterial = async (id: any) => {
    var response = await materialRequest.deleteMaterial(id);
    if (response.success) {
      message.success('Delete material success');
      window.location.reload();
    } else {
      message.error('Delete material failed');
    }
  };

  useEffect(() => {
    if (materialData) {
      const transformedData: DataType[] = materialData.map((material: any) => ({
        id: material.id,
        code: material.code,
        name: material.name,
        quantity: material.quantity,
        costPerUnit: material.costPerUnit,
        description: material.description,
      }));
      setTransformedData(transformedData);
    }
  }, [materialData]);
  return <Table loading={materialData == null} columns={columns} dataSource={transformedData} />;
};

export default TableMaterialComponent;
