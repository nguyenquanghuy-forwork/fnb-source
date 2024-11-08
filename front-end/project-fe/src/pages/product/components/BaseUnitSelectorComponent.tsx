import { unitRequest } from '@/app/api';
import { CreateUnitRequest } from '@/app/api/requests';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Divider, Input, Select, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

let index = 0;
interface Unit {
  Name?: any;
  Id: string;
}
const BaseUnitSelector: React.FC<any> = props => {
  const [items, setItems] = useState(['jack', 'lucy']);
  const [units, setUnits] = useState<Unit[]>([]);
  const [name, setName] = useState('');
  const { dataUnit, setDataUnit, unitValue, setUnitValue } = props;
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (dataUnit) {
      // Map over `dataUnit` to create an array of Unit objects
      const formattedUnits = dataUnit.map((unit: any) => ({
        Name: unit.name,
        Id: unit.id,
      }));
      setUnits(formattedUnits);
    }
  }, [dataUnit]);

  const createUnitAsync = async (nameUnit: any) => {
    const request: CreateUnitRequest = {
      name: nameUnit,
    };
    var response = await unitRequest.createUnit(request);
    if (response.data) {
      setDataUnit(response.data);
    }
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //Name Unit: event.target.value
    setName(event.target.value);
  };

  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    createUnitAsync(name);
    setItems([...items, name || `New item ${index++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  return (
    <Select
      placeholder="Select Your Unit"
      onChange={e => {
        setUnitValue(e);
      }}
      value={unitValue}
      dropdownRender={menu => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input
              placeholder="Please enter item"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={e => e.stopPropagation()}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Add as a new base unit
            </Button>
          </Space>
        </>
      )}
      showSearch
      options={units.map(unit => ({ label: unit.Name, value: unit.Id }))}
    />
  );
};

export default BaseUnitSelector;
