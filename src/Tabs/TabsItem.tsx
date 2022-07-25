import React, { useContext } from 'react';
import classNames from 'classnames';
import './index.scss';
import { TabsContext } from './index'
import { TabsItemAddProps, TabsItemProps } from './type';

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

export default TabsItem;
