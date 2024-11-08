import React, { ReactElement } from 'react';
import classNames from 'classnames';
import FnbTypography from '../fnb-typography';

interface IFnbButtonProps {
  className?: string;
  onClick?: (val: any) => void;
  text?: string;
  disabled?: boolean;
  size?: 'default' | 'large';
  variant?: 'primary' | 'secondary' | 'secondary-purple' | 'tertiary';
  danger?: boolean;
  iconHeader?: ReactElement;
  iconFooter?: ReactElement;
  width?: string | number;
  minWidth?: string | number;
  id?: string;
  type?: 'button' | 'submit';
  form?: string;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}
const FnbButton = ({
  className = '',
  onClick,
  text = '',
  disabled = false,
  size = 'default',
  variant = 'primary',
  danger = false,
  iconHeader = undefined,
  iconFooter = undefined,
  width = undefined,
  minWidth = 'fit-content',
  id,
  type = 'button',
  form,
  style = {},
  textStyle = {},
}: IFnbButtonProps) => {
  /* 
  Usage: 
   <FnbButton
      text="button"
      variant="secondary"
      iconHeader={<InfoCircleFlashSaleIcon />}
      iconFooter={<InfoCircleFlashSaleIcon />}
    />
 */

  const classNameButton = classNames({
    'fnb-button': true,
    [`fnb-button--size-${size}`]: true,
    [`fnb-button--${variant}`]: true,
    [`fnb-button--disabled--fulfill`]: variant !== 'tertiary' && disabled,
    [`fnb-button--disabled--outlined`]: variant === 'tertiary' && disabled,
    [`fnb-button--${variant}--danger`]: danger,
    [`${className}`]: true,
  });

  const renderButton = () => {
    const onClickButton = (e: any) => {
      if (disabled) {
        e.stopPropagation();
      } else {
        onClick && onClick(e);
      }
    };
    return (
      <button
        id={id}
        className={classNameButton}
        onClick={onClickButton}
        style={{ width: width ? width : 'fit-content', minWidth: minWidth ? minWidth : 'fit-content', ...style }}
        type={type}
        form={form}
        disabled={disabled}
      >
        {iconHeader &&
          React.cloneElement(iconHeader, {
            ...iconHeader?.props,
            className: `fnb-button__icon ${iconHeader?.props?.className ? iconHeader?.props?.className : ''}`,
          })}
        {text && <FnbTypography style={textStyle} variant="b1-medium" className="fnb-button__label" text={text} />}
        {iconFooter &&
          React.cloneElement(iconFooter, {
            ...iconFooter?.props,
            className: `fnb-button__icon ${iconFooter?.props?.className ? iconFooter?.props?.className : ''}`,
          })}
      </button>
    );
  };

  return <>{renderButton()}</>;
};

export default FnbButton;
