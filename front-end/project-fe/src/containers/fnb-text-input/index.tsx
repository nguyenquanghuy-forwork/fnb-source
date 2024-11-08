import { Input } from 'antd';
import React, { CSSProperties, useState } from 'react';
import './index.scss';

interface ITextInputProp {
  placeholder?: string;
  autoFocus?: boolean;
  maxLength?: number;
  style?: CSSProperties | undefined;
  icon?: React.ReactElement;
  onChange?: (text: string) => void;
  width?: string | number;
}

const TextInput = (props: ITextInputProp) => {
  const { placeholder = '', autoFocus, maxLength, onChange, icon, width = '100%' } = props;
  const [value, setValue] = useState();

  return (
    <div className="input-wrapper">
      <div className="input-field" style={{ width: width }}>
        <Input
          autoFocus={autoFocus}
          maxLength={maxLength ?? 100}
          onChange={(e: any) => {
            setValue(e.target.value);
            onChange && onChange(encodeURIComponent(e.target.value));
          }}
          className={`fnb-input ${value ? 'ant-input-affix-wrapper-focused' : ''}`}
          allowClear
          size="large"
          placeholder={placeholder}
          prefix={icon ?? <></>}
        />
      </div>
    </div>
  );
};

export default TextInput;
