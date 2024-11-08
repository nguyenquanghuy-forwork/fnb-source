import { FilterIcon } from '@/assets/icons/FilterIcon';
import { FilterSelectedIcon } from '@/assets/icons/FilterSelectedIcon';
import Button from '@/components/Button';
import { Badge, Popover } from 'antd';
import React, { CSSProperties, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './index.scss';

interface IFilterProp {
  filterComponent?: React.ReactElement;
  filter?: any;
  isNormal?: boolean;
  style?: CSSProperties | undefined;
  icon?: React.ReactElement;
  isButton?: boolean;
  isButtonReset?: boolean;
  classNameButton?: string;
}

const Filter = (props: IFilterProp) => {
  const { filterComponent, filter, isButton, isButtonReset = false, classNameButton } = props;
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
    filter.onClickFilterButton && filter.onClickFilterButton();
  };

  if (filterComponent) {
    return <>{filterComponent}</>;
  }
  if (filter) {
    const { component, onClearFilter, totalFilterSelected, filterClassName } = filter;
    const numberTotalFilterSelected = parseInt(totalFilterSelected) || 0;
    return (
      <Popover
        id="table-filter-popover"
        placement="bottomRight"
        content={
          <>
            <div className="content-filter" id="table-filter-popover-content">
              {component}
            </div>
            {isButtonReset && (
              <div className="footer-filter" id="table-filter-popover-footer">
                <Button
                  id="table-filter-popover-reset-filter"
                  onClick={onClearFilter}
                  disabled={numberTotalFilterSelected <= 0}
                  text={t('common:resetAllFilter')}
                />
              </div>
            )}
          </>
        }
        trigger="click"
        open={visible}
        onOpenChange={handleVisibleChange}
        getPopupContainer={(trigger: any) => trigger.parentElement}
        overlayClassName={`filter-component custom-form ${filterClassName ?? ''}`}
      >
        {isButton ? (
          <Button
            text={t('common:filter')}
            icon={<FilterIcon />}
            htmlType="button"
            className={`btn-action ${classNameButton}`}
            classNameText="text-button"
            // onClick={handleFilter}
          />
        ) : (
          <Badge className="badge-counter" size="small" count={numberTotalFilterSelected} color="#FF8C24">
            {visible ? (
              <FilterSelectedIcon color={numberTotalFilterSelected > 0 ? '#50429B' : '#c1b9e9'} />
            ) : (
              <FilterIcon color={numberTotalFilterSelected > 0 ? '#50429B' : '#c1b9e9'} />
            )}
          </Badge>
        )}
      </Popover>
    );
  }
  return <></>;
};

export default Filter;
