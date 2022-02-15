import React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface DrawerProps {
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

const Drawer: React.FC<DrawerProps> = (props) => {
  const { children = '', className, style, ...others } = props;

  return (
    <div className={classNames('i-template', className)} style={{ ...style }} {...others}>
      {children}
    </div>
  );
};

Drawer.displayName = 'Drawer';

export default Drawer;
