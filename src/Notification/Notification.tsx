import React from 'react';
import './index.scss';
import { NotificationMethod, NotificationProps, PositionType } from './type';
import Icon from '../Icon';

const Notification: React.FC<NotificationProps> & {
  success?: NotificationMethod;
  warning?: NotificationMethod;
  error?: NotificationMethod;
  info?: NotificationMethod;
  clear?: (position?: PositionType) => void;
} = (props) => {
  const {
    type = 'info',
    content,
    title,
    closeable = false,
    onClose,
    ...restProps
  } = props;

  return (
    <div className="i-notification" {...restProps}>
      <Icon
        name={
          {
            info: 'TipInfo',
            success: 'TipCheckFill',
            warning: 'TipWarningFill',
            error: 'TipCloseFill',
          }[type]
        }
        size={20}
      />
      <div className="i-notification__main">
        {title && (
          <div className="i-notification__title">{title}</div>
        )}
        <div className="i-notification__content">{content}</div>
      </div>
      {closeable && (
        <div className="i-notification__close" onClick={() => onClose?.()}>
          <Icon name="Close" />
        </div>
      )}
    </div>
  );
};

Notification.displayName = 'Notification';

export default Notification;
