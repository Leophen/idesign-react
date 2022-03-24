import React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface DialogProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

const Dialog: React.FC<DialogProps> = (props) => {
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

Dialog.displayName = 'Dialog';

export default Dialog;
