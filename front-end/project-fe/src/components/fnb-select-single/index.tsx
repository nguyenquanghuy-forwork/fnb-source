import { Select } from 'antd';
import React, { useState } from 'react';
// import './fnb-select-single.scss';
import classNames from 'classnames';
// import '../fnb-select-multiple-product/fnb-select-multiple-product.scss';
import FnbTypography from '../fnb-typography';
import { ArrowDownIcon } from '@/assets/icons/ArrowDownIcon';

/**
 * SelectSingle component custom from antd select
 * @param {option, value, onChange, className, disabled, allowClear, showSearch, placeholder, dropdownRender, style, defaultValue } props
 * option: data select option [], map data [{id: "key", name: "value"}] first
 * other param are used as same as antd select, visit link https://ant.design/components/select/
 * @returns
 */

interface IFnbSelectSingleProps {
  value?: string;
  onChange?: (val: any) => void;
  onSearch?: (val: any) => void;
  className?: string;
  option?: Array<{
    id?: string;
    name?: string;
  }>;
  disabled?: boolean;
  allowClear?: boolean;
  showSearch?: boolean;
  placeholder?: string;
  dropdownRender?: any;
  style?: React.CSSProperties;
  defaultValue?: string;
  onSelect?: (val: any) => void;
  suffixIcon?: React.ReactElement;
  prefixIcon?: React.ReactElement;
  popupClassName?: string;
}
const FnbSelectSingle = ({
  value,
  onChange,
  onSearch,
  className,
  option,
  disabled,
  allowClear,
  showSearch = true,
  placeholder,
  dropdownRender,
  style,
  defaultValue,
  onSelect,
  suffixIcon,
  prefixIcon = undefined,
  popupClassName = '',
  ...rest
}: IFnbSelectSingleProps) => {
  const classNameSelect = classNames({
    'fnb-select-single-admin': true,
    [`${className}`]: true,
    'fnb-select-single-admin--show-prefix-icon': prefixIcon !== undefined,
    'fnb-select-single-admin--disabled': disabled,
  });

  const classNamePopup = classNames({
    [`${popupClassName}`]: true,
  });

  const [valueSearch, setValueSearch] = useState('');
  const onSearchSelect = (e: any) => {
    setValueSearch(e);
    onSearch && onSearch(e);
  };

  return (
    <>
      <Select
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        onSelect={onSelect}
        style={style}
        className={classNameSelect}
        popupClassName={classNamePopup}
        suffixIcon={suffixIcon || <ArrowDownIcon />}
        disabled={disabled}
        showSearch={showSearch}
        allowClear={allowClear}
        placeholder={placeholder}
        dropdownRender={dropdownRender}
        optionFilterProp="children"
        showArrow
        onSearch={onSearchSelect}
        {...rest}
      >
        {option?.map(item => (
          <Select.Option key={item.id} value={item.id} name={item?.name}>
            <FnbTypography text={item?.name!} />
          </Select.Option>
        ))}
      </Select>
      {prefixIcon &&
        React.cloneElement(prefixIcon, {
          ...prefixIcon?.props,
          className: `fnb-select-single-admin__icon-prefix ${
            valueSearch ? 'fnb-select-single-admin__icon-prefix--hide' : ''
          } ${prefixIcon?.props?.className ? prefixIcon?.props?.className : ''}`,
        })}
    </>
  );
};

export default FnbSelectSingle;
