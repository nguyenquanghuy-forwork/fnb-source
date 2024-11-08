import { materialRequest } from '@/app/api';
import { Material } from '@/app/api/requests';
import { Button, Divider } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableMaterialComponent from './components/TableMaterialComponent';
import './index.scss';

const MaterialManagementPage = () => {
  const navigate = useNavigate();
  const [materialData, setMaterialData] = useState<Material[] | null>(null);
  const getInitData = async () => {
    var response = await materialRequest.getMaterial(undefined);
    if (response.data) {
      setMaterialData(response.data);
    }
  };

  useEffect(() => {
    getInitData();
  }, []);

  return (
    <div>
      <div className="group-header">
        <span className="header-title">Material Management</span>
        <div className="group-button-header">
          <Button
            type="primary"
            onClick={() => {
              navigate('/inventory/material/create');
            }}
          >
            Add Material
          </Button>
        </div>
      </div>
      <Divider />
      <TableMaterialComponent materialData={materialData} />
    </div>
  );
};

export default MaterialManagementPage;
