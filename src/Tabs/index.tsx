import React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface TabsItemProps {
  /**
   * 按钮内容
   */
  children?: React.ReactNode;
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

const TabsItem: React.FC<TabsItemProps> = (props) => {
  const {
    children = '',
    className,
    style,
    ...others
  } = props;

  return (
    <div className={classNames('i-tabs__item', className)} style={{ ...style }} {...others}>
      {children}
    </div>
  );
};

export interface TabsProps {
  /**
   * 按钮内容
   */
  children?: React.ReactNode;
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 选项卡风格类型
   */
  type?: 'normal' | 'card';
}

const Tabs: React.FC<TabsProps> & { Item: React.ElementType } = (props) => {
  const { children = '', className, style, type = 'normal', ...others } = props;

  return (
    <div className={classNames('i-tabs', className)} style={{ ...style }} {...others}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }
        const childProps = {
          type,
        };
        return React.cloneElement(child, childProps);
      })}
    </div>
  );
};

Tabs.Item = TabsItem;

Tabs.displayName = 'Tabs';
TabsItem.displayName = 'TabsItem';

export default Tabs;
