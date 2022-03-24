import React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface BadgeProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

const Badge: React.FC<BadgeProps> = (props) => {
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

Badge.displayName = 'Badge';

export default Badge;
