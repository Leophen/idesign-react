import React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface PopupProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

const Popup: React.FC<PopupProps> = (props) => {
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

Popup.displayName = 'Popup';

export default Popup;
