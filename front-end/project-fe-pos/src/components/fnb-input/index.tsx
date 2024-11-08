import { Input } from 'antd';
import classNames from 'classnames';
import React from 'react';

interface IFnbInputProps {
  id?: string;
  defaultValue?: string;
  value?: string;
  allowClear?: boolean;
  showCount?: boolean;
  className?: string;
  placeholder?: string;
  maxLength?: number;
  onChange?: (value: any) => void;
  autoFocus?: boolean;
  type?: 'default' | 'password';
  disabled?: boolean;
  suffix?: React.ReactElement;
  prefix?: React.ReactElement;
}
const FnbInput = ({
  id,
  defaultValue,
  value,
  allowClear,
  showCount,
  className = '',
  placeholder,
  maxLength,
  onChange,
  autoFocus,
  type = 'default',
  disabled = false,
  suffix,
  prefix,
  ...rest
}: IFnbInputProps) => {
  const classNameInput = classNames({
    'fnb-input-admin': true,
    'fnb-input-admin--disabled': disabled,
    [`${className}`]: true,
  });

  return (
    <>
      {type === 'password' ? (
        <Input.Password
          id={id}
          value={value}
          allowClear={allowClear}
          onChange={onChange}
          className={classNameInput}
          showCount={showCount}
          placeholder={placeholder}
          maxLength={maxLength}
          defaultValue={defaultValue}
          autoFocus={autoFocus}
          disabled={disabled}
          {...rest}
        />
      ) : (
        <Input
          id={id}
          value={value}
          allowClear={allowClear}
          onChange={onChange}
          className={classNameInput}
          showCount={showCount}
          placeholder={placeholder}
          maxLength={maxLength}
          defaultValue={defaultValue}
          autoFocus={autoFocus}
          disabled={disabled}
          suffix={suffix}
          prefix={prefix}
          {...rest}
        />
      )}
    </>
  );
};

export default FnbInput;
