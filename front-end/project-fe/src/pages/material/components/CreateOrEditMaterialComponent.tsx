import { materialRequest, unitRequest } from '@/app/api';
import { CreateOrUpdateMaterialRequest, Unit } from '@/app/api/requests';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Upload, message } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BaseUnitSelector from './BaseUnitSelectorComponent';
import './CreateOrEditMaterialComponent.scss'; // Nếu bạn muốn áp dụng CSS tùy chỉnh

const { TextArea } = Input;
const { Option } = Select;
const CreateOrEditMaterialComponent = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [unitValue, setUnitValue] = useState(null);
  const [dataUnit, setDataUnit] = useState<Unit[] | null>(null);
  const getInitData = async (id: any) => {
    var response = await unitRequest.getAllUnit(null);
    if (response.data) {
      setDataUnit(response.data);
    }
  };

  useEffect(() => {
    getInitData(id);
  }, []);

  useEffect(() => {
    if (dataUnit && id) {
      getDataEdit();
    }
  }, [dataUnit]);

  const getDataEdit = async () => {
    if (id) {
      var responseMaterial = await materialRequest.getMaterial(id, undefined);
      if (responseMaterial.data) {
        console.log('response.data', responseMaterial.data);
        const materialData: any = responseMaterial.data[0];
        form.setFieldsValue({
          name: materialData.name,
          description: materialData.description,
          cost: materialData.costPerUnit,
          quantityMaterial: materialData.quantity,
        });
        setUnitValue(materialData.unitId);
      }
    }
  };

  const onFinish = (values: any) => {
    if (!id) {
      const request: CreateOrUpdateMaterialRequest = {
        cost: values.cost,
        description: values.description,
        images: values.images,
        name: values.name,
        quantityMaterial: values.quantityMaterial,
        unit: unitValue ?? undefined,
      };
      createMaterial(request);
    } else {
      const request: CreateOrUpdateMaterialRequest = {
        id: id,
        cost: values.cost,
        description: values.description,
        images: values.images,
        name: values.name,
        quantityMaterial: values.quantityMaterial,
        unit: unitValue ?? undefined,
      };
      updateMaterial(request);
    }
  };

  const createMaterial = async (request: CreateOrUpdateMaterialRequest) => {
    var response = await materialRequest.createOrUpdate(request);
    if (response.success) {
      message.success('Add Materail success.');
      navigate('/inventory/material');
    }
  };

  const updateMaterial = async (request: CreateOrUpdateMaterialRequest) => {
    var response = await materialRequest.createOrUpdate(request);
    if (response.success) {
      message.success('Update Materail success.');
      navigate('/inventory/material');
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish} className="add-material-form" form={form}>
      <div className="header">
        <h2 className="header-title">General Information</h2>
        <div className="actions">
          <Button
            onClick={() => {
              navigate('/inventory/material');
            }}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            {!id ? 'Create Material' : 'Update Material'}
          </Button>
        </div>
      </div>

      <Form.Item
        name="name"
        label="Ingredient name"
        rules={[{ required: true, message: 'Please input ingredient name' }]}
      >
        <Input maxLength={255} />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <TextArea maxLength={2000} rows={4} />
      </Form.Item>

      <Form.Item name="images" label="Media">
        <Upload listType="picture-card" beforeUpload={() => false} multiple>
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Add media</div>
          </div>
        </Upload>
      </Form.Item>

      <h2>Pricing</h2>

      <Form.Item name="cost" rules={[{ required: true, message: 'Please input cost per unit' }]} label="COST per UNIT">
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item
        name="unit"
        label="Base unit"
        rules={[{ required: unitValue == null, message: 'Please select base unit' }]}
      >
        <BaseUnitSelector
          unitValue={unitValue}
          setUnitValue={setUnitValue}
          dataUnit={dataUnit}
          setDataUnit={setDataUnit}
        />
      </Form.Item>

      <Form.Item
        name="quantityMaterial"
        rules={[{ required: true, message: 'Please input quantity' }]}
        label="Quantity"
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>
    </Form>
  );
};

export default CreateOrEditMaterialComponent;
