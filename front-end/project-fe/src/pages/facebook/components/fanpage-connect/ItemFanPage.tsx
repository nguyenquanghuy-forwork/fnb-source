import { DisconnectIcon } from '@/assets/icons/DisconnectIcon';
import FnbButton from '@/components/fnb-button';
import FnbTypography from '@/components/fnb-typography';
import './ItemFanPage.scss';

const ItemFanPage = ({ thumbnail, name }: { thumbnail: string; name: string }) => {
  return (
    <div className="item-fan-page-connect">
      <div className="item-fan-page-connect__info">
        <img className="item-fan-page-connect__thumbnail" src={thumbnail} />
        <FnbTypography text={name} variant="b1-medium" />
      </div>
      <FnbButton text="Disconnect" variant="secondary" iconHeader={<DisconnectIcon />} />
    </div>
  );
};

export default ItemFanPage;
