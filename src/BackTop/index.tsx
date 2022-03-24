import React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface BackTopProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

const BackTop: React.FC<BackTopProps> = (props) => {
  const {
    children = '',
    className,
    style,
    ...others
  } = props;

  return (
    <div
      className={classNames(
        'i-template',
        className
      )}
      style={{ ...style }}
      {...others}
    >
      {children}
    </div>
  );
};

BackTop.displayName = 'BackTop';

export default BackTop;
