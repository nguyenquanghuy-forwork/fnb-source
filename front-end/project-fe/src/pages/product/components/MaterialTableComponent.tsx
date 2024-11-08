import { InputNumber, Table } from 'antd';
import React from 'react';

interface DataType {
  key: any;
  name: any;
  quantity: any;
  costPerUnit: any;
  totalCost: any;
}

const MaterialTableComponent: React.FC<any> = ({ data, setData }) => {
  const columns = [
    {
      title: 'Ingredients',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text: any, record: DataType) => (
        <InputNumber
          min={0}
          value={record.quantity}
          onChange={(value: any) => handleQuantityChange(value, record.key)}
        />
      ),
    },
    {
      title: 'Cost per Unit (VND/unit)',
      dataIndex: 'costPerUnit',
      key: 'costPerUnit',
      render: (text: any, record: DataType) => {
        const formattedTotalCost = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
          minimumFractionDigits: 0,
        }).format(record.costPerUnit);
        return <>{formattedTotalCost}</>;
      },
    },
    {
      title: 'Total Cost (VND)',
      dataIndex: 'totalCost',
      key: 'totalCost',
      render: (text: any, record: DataType) => {
        const formattedTotalCost = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
          minimumFractionDigits: 0,
        }).format(record.totalCost);
        return <>{formattedTotalCost}</>;
      },
    },
  ];

  const handleQuantityChange = (value: number, key: string) => {
    const newData = data.map((item: any) => {
      if (item.key === key) {
        const totalCost = value * item.costPerUnit;
        return { ...item, quantity: value, totalCost };
      }
      return item;
    });
    setData(newData);
  };

  const handleUnitChange = (value: string, key: string) => {
    const newData = data.map((item: any) => {
      if (item.key === key) {
        return { ...item, unit: value };
      }
      return item;
    });
    setData(newData);
  };

  return <Table dataSource={data} columns={columns} />;
};

export default MaterialTableComponent;
