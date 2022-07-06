import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import useDefault from '../hooks/useDefault';

export interface TabsProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 选项卡风格类型
   * @default normal
   */
  theme?: 'normal' | 'card';
  /**
   * 当前选中值
   */
  active?: string | number;
  /**
   * 默认选中值
   */
  defaultActive?: string | number;
  /**
   * 全局禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 点击选项卡时触发
   */
  onChange?: (value: string | number) => void;
}

export interface TabsItemProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 单项值
   */
  value: string | number;
  /**
   * 点击选项卡时触发
   */
  onClick?: (value?: string | number) => void;
}

export interface TabsItemAddProps extends TabsItemProps {
  /**
   * 选项卡风格类型
   * @default normal
   */
  theme?: 'normal' | 'card';
  /**
   * 当前选中值
   */
  active?: string | number;
  /**
   * 索引值
   */
  index?: number;
  /**
   * 全局禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 点击选项卡时触发
   */
  onChange?: (value: string | number) => void;
}

const TabsItem: React.FC<TabsItemProps> = (props) => {
  // 从 Tabs Context 注入全局属性
  const context = useContext(TabsContext);
  const newProps: TabsItemAddProps = context ? context.inject(props) : props;

  const {
    children,
    className,
    style,
    value,
    onClick,
    // 以下为 context 传入或结合
    theme,
    index,
    active,
    disabled = false,
    onChange,
    ...restProps
  } = newProps;

  const itemValue = value || index

  const handleClickTab = () => {
    !disabled && onClick?.(itemValue)
  }

  return (
    <div
      className={classNames(
        'i-tabs-item',
        itemValue === active && 'i-tabs-item__active',
        theme === 'card' && 'i-tabs-item__card',
        disabled && 'i-tabs-item__disabled',
        className
      )}
      data-active={itemValue === active}
      data-disabled={disabled}
      style={{ ...style }}
      onClick={handleClickTab}
      {...restProps}
    >
      {children}
    </div>
  );
};

export interface TabsContextValue {
  inject: (props: TabsItemProps) => TabsItemAddProps;
}

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
