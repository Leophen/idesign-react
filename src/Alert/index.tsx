import React, { useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon';
import { AlertProps } from './type'

const Alert: React.FC<AlertProps> = (props) => {
  const {
    className,
    closable = false,
    message = '',
    operation,
    style,
    title,
    type = 'info',
    ...restProps
  } = props;

  const [closed, setClosed] = useState(false);

  const handleCloseAlert = () => {
    setClosed(true);
  };

  return closed ? null : (
    <div
      className={classNames('i-alert', `i-alert--type-${type}`, className)}
      style={{ ...style }}
      {...restProps}
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
