import { ITypography } from '@/features/themes/types';
import classNames from 'classnames';
import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';

interface IFnbTypographyLinkProps extends IFnbTypographyProps {
  target?: '_self' | '_top' | '_parent' | '_blank';
  to?: string;
  underline?: boolean;
}
interface IFnbTypographyProps {
  variant?: keyof ITypography;
  text: string;
  onClick?: (val: any) => void;
  className?: string;
  color?: string;
  textTransform?: 'none' | 'capitalize' | 'lowercase' | 'uppercase';
  style?: React.CSSProperties;
}

const Link = ({
  text = '',
  variant = 'b1-regular',
  color = '',
  style = {},
  className = '',
  target = '_self',
  to = '',
  onClick = undefined,
  underline = true,
}: IFnbTypographyLinkProps) => {
  return (
    <LinkRouter
      to={to}
      target={target}
      onClick={e => {
        onClick && onClick(e);
      }}
    >
      <FnbTypography
        text={text}
        variant={variant}
        color={color}
        style={{ textDecoration: underline ? 'underline' : 'unset', ...style }}
        className={`fnb-typography__hyperlink ${className}`}
      />
    </LinkRouter>
  );
};

const FnbTypography = ({
  variant = 'b1-regular',
  text,
  onClick,
  className = '',
  color = '',
  textTransform = 'none',
  style,
}: IFnbTypographyProps) => {
  const onClickText = (e: any) => {
    onClick && onClick(e);
  };

  const classNameTypography = classNames({
    [`fnb-typography__type--${variant.toString()}`]: true,
    [`${className}`]: true,
    'fnb-typography--default-color': color === '',
  });

  const styleColor = color ? { color: color } : {};

  return (
    <span
      onClick={onClickText}
      className={classNameTypography}
      style={{ textTransform: textTransform, ...style, ...styleColor }}
    >
      {text}
    </span>
  );
};

FnbTypography.Link = Link;

export default FnbTypography;
