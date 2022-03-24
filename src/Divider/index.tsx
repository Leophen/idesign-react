import React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface DividerProps {
  /**
   * 文本位置
   * @default center
   */
  align?: 'left' | 'right' | 'center';
  /**
   * 类名
   */
  className?: string;
  /**
   * 是否为虚线
   * @default false
   */
  dashed?: boolean;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

const Divider: React.FC<DividerProps> = (props) => {
  const { align = 'center', children, className, dashed = false, style, ...others } = props;

  return (
    <div
      className={classNames(
        'i-divider',
        dashed && 'i-divider--dashed',
        children && 'i-divider--with-text',
        children && `i-divider--with-text-${align}`,
        className,
      )}
      style={{ ...style }}
      {...others}
    >
      {children && <span className="i-divider--text">{children}</span>}
    </div>
  );
};

Divider.displayName = 'Divider';

export default Divider;
