import React, { useEffect, useRef, useState } from 'react';
import './index.scss';
import { NotificationMethod, NotificationProps, PositionType } from './type';
import Icon from '../Icon';
import classNames from 'classnames';

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
    entered = false,
    onClose,
    ...restProps
  } = props;

  const ntfRef = useRef<HTMLDivElement>(null)
  const [ntfHeight, setNtfHeight] = useState<number | undefined>(undefined)
  useEffect(() => {
    if (entered) {
      const { height } = (ntfRef.current as HTMLDivElement).getBoundingClientRect()
      setNtfHeight(height)
    }
  }, [entered])

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
      <div
        className={classNames(
          'i-notification__main',
          closeable && 'i-notification__main-closeable',
        )}
        style={{ height: ntfHeight }}
        ref={ntfRef}
      >
        {title && <div className="i-notification__title">{title}</div>}
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
