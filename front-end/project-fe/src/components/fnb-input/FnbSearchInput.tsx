import { SearchIcon } from '@/assets/icons/SearchIcon';
import { Input } from 'antd';
import { useState } from 'react';

interface IFnbSearchInputProps {
  maxLength?: number;
  autoFocus?: boolean;
  placeholder?: string;
}
const FnbSearchInput = ({ maxLength = 100, autoFocus = false, placeholder }: IFnbSearchInputProps) => {
  const [valueSearch, setValueSearch] = useState<string | null>(null);

  return (
    <div className="search-bar-wrapper">
      <div className="search-bar">
        <Input
          autoFocus={autoFocus}
          maxLength={maxLength ?? 100}
          onChange={e => {
            setValueSearch(e.target.value);
          }}
          className={`fnb-input-admin fnb-search-input ${valueSearch ? 'ant-input-affix-wrapper-focused' : ''}`}
          allowClear
          size="large"
          placeholder={placeholder}
          prefix={<SearchIcon width={24} height={24} />}
        />
      </div>
    </div>
  );
};

export default FnbSearchInput;
