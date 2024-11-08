import { Col, Row, Space } from 'antd';
import ItemFanPage from './ItemFanPage';
import './index.scss';
import FnbSelectSingle from '@/components/fnb-select-single';
import FnbInput from '@/components/fnb-input';
import { SearchIcon } from '@/assets/icons/SearchIcon';
import FnbSearchInput from '@/components/fnb-input/FnbSearchInput';

const FanPageConnect = () => {
  const mockData = [
    {
      name: 'The Coffee House',
      thumbnail: 'https://res.cloudinary.com/dh7vlvdxk/image/upload/v1713324763/Demo%20Image/Rose-8B1a_1_uf11h8.jpg',
    },
    {
      name: 'Highland',
      thumbnail: 'https://res.cloudinary.com/dh7vlvdxk/image/upload/v1713324762/Demo%20Image/3_14.jpeg_ti6ls5.jpg',
    },
    {
      name: 'Start buck',
      thumbnail:
        'https://res.cloudinary.com/dh7vlvdxk/image/upload/v1713324762/Demo%20Image/Lisa-Plo_Rdyz_1_blzk3e.jpg',
    },
    {
      name: 'The Coffee House',
      thumbnail:
        'https://res.cloudinary.com/dh7vlvdxk/image/upload/v1713324762/Demo%20Image/Lisa-Plo_Rdyz_1_blzk3e.jpg',
    },
  ];
  return (
    <div className="w-100 tab-fan-page-connect">
      <Space className="w-100" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <FnbSearchInput />
        <FnbSelectSingle placeholder="All account" style={{ width: 400 }} />
      </Space>
      <Row gutter={[12, 12]}>
        {mockData.map((item: any) => {
          return (
            <Col sm={24} md={12}>
              <ItemFanPage thumbnail={item.thumbnail} name={item.name} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default FanPageConnect;
