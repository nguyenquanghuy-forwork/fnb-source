import { productRequest, unitRequest } from '@/app/api';
import { CreateOrUpdateProductRequest, MaterialRequest, Unit } from '@/app/api/requests';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Upload, message } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AddMaterialTableComponent from './AddMaterialTableComponent';
import BaseUnitSelector from './BaseUnitSelectorComponent';
import './CreateOrEditProductComponent.scss'; // Nếu bạn muốn áp dụng CSS tùy chỉnh

const { TextArea } = Input;
const { Option } = Select;

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
const CreateOrEditProductComponent = () => {
  const [dataMaterial, setDataMaterial] = useState<DataType[]>(initialData);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [unitValue, setUnitValue] = useState(null);
  const [valueMaterial, setValueMaterial] = useState(null);
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
      var responseProduct = await productRequest.getProducts(id, undefined, undefined, undefined, undefined);
      if (responseProduct.data) {
        const productData: any = responseProduct.data.products;
        const productPriceMaterials: any = productData[0].productPrices[0].productPriceMaterials;
        console.log('productData', productPriceMaterials);
        // Use type assertion if necessary
        if (productData) {
          form.setFieldsValue({
            name: productData[0].name,
            description: productData[0].description,
            price: productData[0].productPrices[0].priceValue,
            quantityMaterial: productData[0].quantity,
          });
          setUnitValue(productData[0].unitId);
          setValueMaterial(productPriceMaterials);
        }
        console.log('response.data', responseProduct);
      } else {
        console.error('Invalid data format', responseProduct.data);
      }
    }
  };
  console.log('data', dataMaterial);
  const onFinish = (values: any) => {
    if (!id) {
      const materials: MaterialRequest[] | undefined = dataMaterial?.map(item => ({
        materialId: item.id,
        quantity: item.quantity,
      }));
      const request: CreateOrUpdateProductRequest = {
        name: values.name,
        description: values.description,
        media: values.media,
        price: values.price,
        unitId: unitValue ?? undefined,
        materials: materials,
      };
      createProduct(request);
    } else {
      const materials: MaterialRequest[] | undefined = dataMaterial?.map(item => ({
        materialId: item.id,
        quantity: item.quantity,
      }));
      const request: CreateOrUpdateProductRequest = {
        id: id,
        name: values.name,
        description: values.description,
        media: values.media,
        price: values.price,
        unitId: unitValue ?? undefined,
        materials: materials,
      };
      updateMaterial(request);
    }
  };

  const createProduct = async (request: CreateOrUpdateProductRequest) => {
    var response = await productRequest.createOrUpdateProducts(request);
    if (response.success) {
      message.success('Add Materail success.');
      navigate('/product/management');
    }
  };

  const updateMaterial = async (request: CreateOrUpdateProductRequest) => {
    var response = await productRequest.createOrUpdateProducts(request);
    if (response.success) {
      message.success('Update Product success.');
      navigate('/product/management');
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish} className="add-material-form" form={form}>
      <div className="header">
        <h2 className="header-title">Create A Food Or Drink Product</h2>
        <div className="actions">
          <Button
            onClick={() => {
              navigate('/inventory/material');
            }}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            {!id ? 'Create Product' : 'Update Product'}
          </Button>
        </div>
      </div>
      <Form.Item
        name="name"
        label="Food or Beverage Name"
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
      <h2 className="">Product Prices And Variations</h2>
      <Form.Item name="price" rules={[{ required: true, message: 'Please input price per unit' }]} label="Price">
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item name="unit" label="Unit" rules={[{ required: unitValue == null, message: 'Please select base unit' }]}>
        <BaseUnitSelector
          unitValue={unitValue}
          setUnitValue={setUnitValue}
          dataUnit={dataUnit}
          setDataUnit={setDataUnit}
        />
      </Form.Item>

      <Form.Item
        name="recipe"
        label="Recipe"
        rules={[{ required: dataMaterial.length == 0, message: 'Please select Recipe' }]}
      >
        <AddMaterialTableComponent data={dataMaterial} setData={setDataMaterial} valueMaterial={valueMaterial} />
      </Form.Item>
    </Form>
  );
};

export default CreateOrEditProductComponent;
