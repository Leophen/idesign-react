import React, { useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon';

export interface AlertProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 是否显示关闭按钮
   * @default false
   */
  closable?: boolean;
  /**
   * 提示内容
   */
  message?: React.ReactNode;
  /**
   * 跟在提示内容后的操作区
   */
  operation?: React.ReactNode;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 标题
   */
  title?: React.ReactNode;
  /**
   * 提示类型
   * @default info
   */
  type?: 'info' | 'success' | 'warning' | 'error';
}

const Alert: React.FC<AlertProps> = (props) => {
  const {
    className,
    closable = false,
    message = '',
    operation,
    style,
    title,
    type = 'info',
    ...others
  } = props;

  const [closed, setClosed] = useState(false);

  const handleCloseAlert = () => {
    setClosed(true);
  };

  return closed ? null : (
    <div
      className={classNames('i-alert', `i-alert--type-${type}`, className)}
      style={{ ...style }}
      {...others}
    >
      <Icon
        name={
          {
            info: 'TipInfo',
            success: 'TipCheckFill',
            warning: 'TipWarningFill',
            error: 'TipCloseFill',
          }[type]
        }
        size={16}
      />

      <div className="i-alert--content">
        {title && <div className="i-alert--title">{title}</div>}
        <div className="i-alert--description">
          {message}
          {operation && <div className="i-alert--operation">{operation}</div>}
        </div>
      </div>

      {closable && (
        <div className="i-alert--close-btn" onClick={handleCloseAlert}>
          <Icon name="Close" size={16} />
        </div>
      )}
    </div>
  );
};

Alert.displayName = 'Alert';

export default Alert;
