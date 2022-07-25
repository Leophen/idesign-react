import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import useDefault from '../hooks/useDefault';
import TabsItem from './TabsItem';
import { TabsContextValue, TabsItemProps, TabsProps } from './type';

export const TabsContext = React.createContext<TabsContextValue>(null as any);

const Tabs: React.FC<TabsProps> & { Item: React.ElementType } = (props) => {
  let defaultVal
  React.Children.map(props.children, (child, index) => {
    index === 0 && (defaultVal = (child as any).props.value || 0)
  })

  const {
    children = '',
    className,
    style,
    active,
    defaultActive = defaultVal,
    disabled = false,
    theme = 'normal',
    onChange,
    ...restProps
  } = props;

  const [innerActive, setInnerActive] = useDefault(active, defaultActive, onChange);

  const tabsRef = useRef<HTMLDivElement>(null)
  const [tabsRefLeft, setTabsRefLeft] = useState(0)
  useEffect(() => {
    const curTabsRefLeft = tabsRef.current?.getBoundingClientRect().left || 0
    setTabsRefLeft(curTabsRefLeft)
    updateBarPosition(curTabsRefLeft)
  }, [])

  const [bar, setBar] = useState({
    width: 0,
    left: 0
  })

  const updateBarPosition = (parentLeft: number) => {
    tabsRef.current?.childNodes.forEach(item => {
      if (
        (item as HTMLElement).dataset.active === 'true' &&
        (item as HTMLElement).dataset.disabled !== 'true'
      ) {
        const tabRect = (item as HTMLElement).getBoundingClientRect()
        bar.left = tabRect.left - parentLeft
        bar.width = tabRect.width
        setBar({ ...bar })
      }
    })
  }

  useEffect(() => {
    tabsRefLeft !== 0 && updateBarPosition(tabsRefLeft)
  }, [innerActive])

  // 注入每一项的 context
  const context: TabsContextValue = {
    // 将 props 注入每一项子节点的方法
    inject: (singleTabsProps: TabsItemProps) => {
      return {
        theme,
        active: innerActive,
        disabled,
        onClick(value?: string | number) {
          setInnerActive(value)
        },
        ...singleTabsProps,
      };
    },
  };

  return (
    <TabsContext.Provider value={context}>
      <div
        className={classNames(
          'i-tabs',
          className
        )}
        ref={tabsRef}
        style={{ ...style }}
        {...restProps}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return null;
          }
          const childProps = {
            index,
            ...child.props
          };
          return React.cloneElement(child, childProps);
        })}
        {theme === 'normal' && (
          <div
            className="i-tabs__bar"
            style={{
              width: bar.width,
              left: bar.left
            }}
          />
        )}
      </div>
    </TabsContext.Provider>
  );
};

Tabs.Item = TabsItem;

Tabs.displayName = 'Tabs';
TabsItem.displayName = 'TabsItem';

export default Tabs;
