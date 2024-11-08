import React, { CSSProperties } from 'react';
import { capitalizeFirstLetterEachWord, capitalizeUpperCaseWord } from '../../utils/helpers';
import './index.scss';

interface IPageTitle {
  className?: string;
  content?: string;
  isNormal?: boolean;
  style?: CSSProperties | undefined;
  icon?: React.ReactElement;
}

const PageTitle = (props: IPageTitle) => {
  const { className, content = '', isNormal, style, icon } = props;

  /**
   * return a string with option
   * case true: a string format normal (ex: today -> today)
   * case false: a string format uppercase (ex: today -> TODAY)
   * default: a string format Today (ex: today -> Today)
   */
  const renderTitle = () => {
    switch (isNormal) {
      case true:
        return content;
      case false:
        return capitalizeUpperCaseWord(content);
      default:
        return capitalizeFirstLetterEachWord(content);
    }
  };

  return (
    <>
      <span className={`fnb-title-header ${className}`} style={style}>
        {renderTitle()}
        {icon && icon}
      </span>
    </>
  );
};

export default PageTitle;
