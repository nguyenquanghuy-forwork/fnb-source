import { Button as ButtonAntd } from 'antd';
import { ButtonHTMLType } from 'antd/es/button';
import React from 'react';
import { capitalizeFirstLetterEachWord } from '../../utils/helpers';
import './index.scss';

interface IButtonProp {
  id?: string;
  className?: string;
  onClick?: () => void;
  text?: string;
  htmlType?: ButtonHTMLType;
  disabled?: boolean;
  isHideIcon?: boolean;
  icon?: React.ReactElement;
  idControl?: string;
  classNameText?: string;
}
const Button = (props: IButtonProp) => {
  const {
    className,
    onClick,
    text = '',
    htmlType,
    disabled,
    isHideIcon,
    icon,
    idControl = 'fnb-button',
    classNameText,
  } = props;
  const renderButton = () => {
    const titleFormatted = capitalizeFirstLetterEachWord(text);

    return (
      <ButtonAntd
        icon={icon}
        className={`fnb-button ${className ?? ''}`}
        type="primary"
        onClick={onClick}
        htmlType={htmlType}
        disabled={disabled}
        id={idControl}
        hidden={isHideIcon}
      >
        <span className={classNameText}>{titleFormatted}</span>
      </ButtonAntd>
    );
  };

  return <>{renderButton()}</>;
};

export default Button;
