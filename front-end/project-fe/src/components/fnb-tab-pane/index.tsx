import { Tabs } from 'antd';
import { ReactNode, useRef, useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ThreeDotVerticalIcon } from '@/assets/icons';
import classNames from 'classnames';
import './index.scss';

const { TabPane } = Tabs;

/*
 USAGE:
    const screens = [
      {
        name: pageData.general,
        key: KEY_TAB_PANE.GENERAL,
        component: <General t={t} storeDataService={storeDataService} storeId={storeId} />,
      },
      {
        name: pageData.operation,
        key: KEY_TAB_PANE.OPERATION,
        component: <Operation onChangeForm={onChangeForm} />,
      },
    ];

    const INDEX_KEY_TAB_PANE = {
      [KEY_TAB_PANE.GENERAL]: 0,
      [KEY_TAB_PANE.OPERATION]: 1,
    };

    const DEFAULT_SCREEN = KEY_TAB_PANE.GENERAL;

    const handleChangeScreen = (activeKey) => {
        ....
        setActiveScreen(activeKey);
    }
  };
  <FnbTabPane
      screens={screens}
      activeScreen={activeScreen}
      indexKeyTabPane={INDEX_KEY_TAB_PANE}
      onChange={handleChangeScreen}
      defaultScreen={DEFAULT_SCREEN}
      firstKeyTabPane={KEY_TAB_PANE.GENERAL}
      lastKeyTabPane={KEY_TAB_PANE.OPERATION}
  />
*/

interface IScreen {
  key: string;
  name: string;
  component: ReactNode;
}

interface IProps {
  setTabPaneDisplayFullWidth?: boolean;
  screens: IScreen[];
  defaultScreen?: string;
  firstKeyTabPane: string;
  lastKeyTabPane: string;
  indexKeyTabPane: any;
  onChange: (activeKey: string) => void;
  activeScreen: string;
  classNameContent?: string;
  tabBarExtraContent?: ReactNode | { left?: ReactNode; right?: ReactNode };
}

const ID_TAB_PANE = {
  ITEM_TAB_PANE: 'tab-pane-configuration-id-$index$',
  DIVIDER: 'tab-pane-configuration__divider-id-$index$',
  CONTENT_SCREEN: 'content-child-configuration-id',
  ICON_SHOW_MORE: 'fnb-show-more-tab-pane-id',
  WRAPPER_TAB_PANE: 'fnb-wrapper-tab-pane',
  WRAPPER_TEXT_TAB_PANE: 'tab-pane-configuration__wrapper-text-id-$index$',
};

const FnbTabPane = ({
  setTabPaneDisplayFullWidth = false,
  screens,
  defaultScreen,
  firstKeyTabPane,
  lastKeyTabPane,
  indexKeyTabPane,
  onChange,
  activeScreen,
  classNameContent = '',
  tabBarExtraContent,
}: IProps) => {
  const changeSizeScreenRef = useRef<any>(null);
  const [isShowIconShowMore, setIsShowIconShowMore] = useState(false);
  const { t } = useTranslation();

  const onSetFullWidthTabPane = () => {
    let sumWidthTabPane = 0;
    const widthWrapper = document.getElementById(ID_TAB_PANE.WRAPPER_TAB_PANE)?.offsetWidth || 0;
    //reset default tab pane width
    for (let i = 0; i < screens.length; i++) {
      const wrapperTextElement = document.getElementById(
        ID_TAB_PANE.WRAPPER_TEXT_TAB_PANE.replace('$index$', i?.toString()),
      );
      if (wrapperTextElement) {
        wrapperTextElement.style.width = 'unset';
      }
    }

    const elementsTabPane = document.getElementsByClassName('ant-tabs-tab');
    for (let i = 0; i < screens.length; i++) {
      sumWidthTabPane += elementsTabPane[i].clientWidth;
    }
    if (sumWidthTabPane < widthWrapper) {
      const widthAdded = (widthWrapper - sumWidthTabPane - 16) / screens.length;
      for (let i = 0; i < screens.length; i++) {
        const widthWrapperText = document.getElementById(
          ID_TAB_PANE.WRAPPER_TEXT_TAB_PANE.replace('$index$', i?.toString()),
        );
        const defaultWidth = widthWrapperText?.clientWidth || 0;
        if (widthWrapperText) {
          widthWrapperText.style.width = defaultWidth + widthAdded + 'px';
        }
      }
    }
  };
  const onResize = () => {
    if (changeSizeScreenRef.current) {
      clearTimeout(changeSizeScreenRef.current);
    }
    changeSizeScreenRef.current = setTimeout(() => {
      setTabPaneDisplayFullWidth && onSetFullWidthTabPane();
      const elementShowMore = document.getElementById(ID_TAB_PANE.ICON_SHOW_MORE);
      const elementsTabPane: any = document.getElementsByClassName('ant-tabs-tab');
      if (elementShowMore && elementsTabPane) {
        const styleElement = window.getComputedStyle(elementShowMore);
        const isVisible = styleElement.visibility === 'visible';
        setIsShowIconShowMore(isVisible);
        for (let i = 0; i < screens.length; i++) {
          if (elementsTabPane[i].attributes['data-node-key']['value'] === lastKeyTabPane) {
            elementsTabPane[i].style.borderTopRightRadius = isVisible ? '0px' : '12px';
            break;
          }
        }
      }
    }, 50);
  };

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    onResize();
  }, [t]);

  const classNameTab = classNames({
    'fnb-tab-pane': true,
    'fnb-tab-pane--show-icon-show-more': isShowIconShowMore,
    'fnb-tab-pane--default': !isShowIconShowMore,
  });

  const classNameTabPane = (indexKey: any) =>
    classNames({
      'tab-pane-configuration': true,
      'tab-pane-configuration__prev': indexKey === indexKeyTabPane[activeScreen] - 1,
      'tab-pane-configuration__next': indexKey === indexKeyTabPane[activeScreen] + 1,
      'tab-pane-configuration__last': indexKey === indexKeyTabPane[lastKeyTabPane],
    });

  const classNameDivider = (indexKey: any) =>
    classNames({
      'tab-pane-configuration__divider': true,
      'tab-pane-configuration__divider--hide':
        indexKey === indexKeyTabPane[lastKeyTabPane] ||
        indexKey === indexKeyTabPane[activeScreen] - 1 ||
        indexKey === indexKeyTabPane[activeScreen],
    });

  return (
    <>
      <Tabs
        defaultActiveKey={defaultScreen}
        activeKey={activeScreen}
        className={classNameTab}
        onChange={onChange}
        moreIcon={<ThreeDotVerticalIcon id={ID_TAB_PANE.ICON_SHOW_MORE} />}
        id={ID_TAB_PANE.WRAPPER_TAB_PANE}
        tabBarExtraContent={tabBarExtraContent}
      >
        {screens?.map(screen => {
          const indexKey = indexKeyTabPane[screen.key];
          return (
            <TabPane
              tab={
                <div className={classNameTabPane(indexKey)} id={ID_TAB_PANE.ITEM_TAB_PANE.replace('$index$', indexKey)}>
                  <div
                    className="tab-pane-configuration__wrapper-text"
                    id={ID_TAB_PANE.WRAPPER_TEXT_TAB_PANE.replace('$index$', indexKey)}
                  >
                    <span className="tab-pane-configuration__title">{screen.name}</span>
                  </div>
                  <div className={classNameDivider(indexKey)} id={ID_TAB_PANE.DIVIDER.replace('$index$', indexKey)} />
                </div>
              }
              key={screen.key}
            >
              <div className={`fnb-tab-pane-wrapper-child-configuration ${classNameContent}`}>
                <div
                  className={`content-child-configuration ${
                    activeScreen === firstKeyTabPane ? 'content-child-configuration__general-item' : ''
                  }`}
                  id={ID_TAB_PANE.CONTENT_SCREEN}
                >
                  {screen.component}
                </div>
              </div>
            </TabPane>
          );
        })}
      </Tabs>
    </>
  );
};

export default FnbTabPane;
