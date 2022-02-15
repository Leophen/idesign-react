import React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface EmptyProps {
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

const Empty = (props: EmptyProps) => {
  const { children = '', className, style, ...others } = props;

  return (
    <div className={classNames('i-template', className)} style={{ ...style }} {...others}>
      {children}
    </div>
  );
};

Empty.displayName = 'Empty';

export default Empty;
