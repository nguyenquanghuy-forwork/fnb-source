import { materialRequest } from '@/app/api';
import { Material } from '@/app/api/requests';
import { Divider, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import MaterialTableComponent from './MaterialTableComponent';

interface DataType {
  key: any;
  id: any;
  name: any;
  quantity: any;
  costPerUnit: any;
  totalCost: any;
}

const initialData: DataType[] = [
  // Initial data goes here
];

const AddMaterialTableComponent: React.FC<any> = props => {
  const { data, setData, valueMaterial } = props;
  const [materialData, setMaterialData] = useState<Material[] | null>(null);

  const [newData, setNewData] = useState<DataType>({
    key: '',
    id: '',
    name: '',
    quantity: 0,
    costPerUnit: 0,
    totalCost: 0,
  });

  const addNewData = (id: any, valueMaterial: any, index: any) => {
    console.log('valueMaterial', valueMaterial);
    const addData = materialData?.find(a => a.id == id);
    const filteredData = materialData?.filter(item => item.id !== id);
    setMaterialData(filteredData ?? null);
    const dataAddToTable = {
      key: Date.now().toString(),
      id: addData?.id,
      name: addData?.name,
      quantity: valueMaterial == null ? 0 : valueMaterial[index].quantity,
      costPerUnit: addData?.costPerUnit,
      totalCost: valueMaterial == null ? 0 : addData?.costPerUnit ?? 0 * valueMaterial[index].quantity,
    };
    setData((prevData: any) => [...prevData, { ...dataAddToTable, key: Date.now().toString() }]);
  };

  const getInitData = async () => {
    var response = await materialRequest.getMaterial(null);
    if (response.data) {
      setMaterialData(response.data);
    }
  };

  useEffect(() => {
    getInitData();
  }, []);

  useEffect(() => {
    if (valueMaterial && materialData) {
      valueMaterial.forEach((item: any, index: any) => {
        if (item.id) {
          addNewData(item.materialId, valueMaterial, index);
        }
      });
    }
  }, [valueMaterial]);

  return (
    <div>
      <Select
        placeholder="Select Your Material"
        onChange={(e: any) => {
          addNewData(e, null, null);
        }}
        value={null}
        showSearch
        options={materialData?.map(materail => ({ label: materail.name, value: materail.id }))}
      />
      <Divider style={{ margin: '8px' }} />
      <MaterialTableComponent data={data} setData={setData} />
    </div>
  );
};

export default AddMaterialTableComponent;
