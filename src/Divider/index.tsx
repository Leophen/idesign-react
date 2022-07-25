import React from 'react';
import classNames from 'classnames';
import './index.scss';
import { DividerProps } from './type';

const Divider: React.FC<DividerProps> = (props) => {
  const { align = 'center', children, className, dashed = false, style, ...restProps } = props;

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
      {...restProps}
    >
      {children && <span className="i-divider--text">{children}</span>}
    </div>
  );
};

Divider.displayName = 'Divider';

export default Divider;
