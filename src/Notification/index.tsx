import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {
  MergeConfigType,
  NotificationConfig,
  NotificationConfigType,
  NotificationListData,
  NotificationType,
  PositionType,
} from './type';
import { useContainer } from '../hooks/useContainer';
import Notification from './Notification';
import NotificationList from './NotificationList';

// 创建通知容器
const popupWrapper = useContainer('i-popup-wrapper', document.body);
const notificationWrapper = useContainer('i-notification-container', popupWrapper);

const getWrapper = (location: PositionType) => {
  return document.querySelector(`#i-notification-wrapper__${location}`);
};

const notificationList: NotificationListData = {
  'top-left': [],
  'top-right': [],
  'bottom-left': [],
  'bottom-right': [],
};

const handleClose = (index: number, position: PositionType) => {
  notificationList[position].splice(index, 1);
  ReactDOM.render(
    <NotificationList
      onClose={handleClose}
      position={position}
      listData={notificationList[position]}
    />,
    getWrapper(position),
  );
};

const createNotificationWrapper = (position: PositionType) => {
  const idName = `i-notification-wrapper__${position}`;
  const container = useContainer(idName, notificationWrapper, `i-notification-wrapper ${idName}`);
  ReactDOM.render(
    <NotificationList
      onClose={handleClose}
      position={position}
      listData={notificationList[position]}
    />,
    container,
  );
};

createNotificationWrapper('top-left');
createNotificationWrapper('top-right');
createNotificationWrapper('bottom-left');
createNotificationWrapper('bottom-right');

const updateNotificationContainer = (config: MergeConfigType) => {
  const { id = 0, position = 'top-right', duration = 3 } = config;

  position.split('-')[0] === 'top'
    ? notificationList[position].push(config)
    : notificationList[position].unshift(config);

  const renderContainer = getWrapper(position);

  // 延迟消除
  if (duration > 0) {
    setTimeout(() => {
      notificationList[position].map((item: MergeConfigType, index: number) => {
        if (item.id === id) {
          notificationList[position].splice(index, 1);
        }
      });
      ReactDOM.render(
        <NotificationList
          onClose={handleClose}
          position={position}
          listData={notificationList[position]}
        />,
        renderContainer,
      );
    }, duration * 1000);
  }

  // 此刻更新
  ReactDOM.render(
    <NotificationList
      onClose={handleClose}
      position={position}
      listData={notificationList[position]}
    />,
    renderContainer,
  );
};

const openNotification = (
  type: NotificationType,
  NotificationConfig: NotificationConfig,
  duration = 3,
  position = 'top-right',
  closeable = false,
) => {
  const isConfigMode =
    typeof NotificationConfig === 'object' && !React.isValidElement(NotificationConfig);
  const mergeConfig: MergeConfigType = {
    id: Date.now(),
    type,
    title: isConfigMode ? (NotificationConfig as NotificationConfigType)?.title : undefined,
    content: isConfigMode
      ? (NotificationConfig as NotificationConfigType)?.content
      : NotificationConfig,
    duration: isConfigMode
      ? (NotificationConfig as NotificationConfigType)?.duration ?? 3
      : duration,
    position: isConfigMode
      ? (NotificationConfig as NotificationConfigType).position ?? 'top-right'
      : (position as PositionType),
    closeable: isConfigMode
      ? (NotificationConfig as NotificationConfigType)?.closeable ?? false
      : closeable,
  };
  updateNotificationContainer(mergeConfig);
};

const clearNotification = (position?: PositionType) => {
  const positionArr: PositionType[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
  if (position) {
    notificationList[position] = [];
    ReactDOM.render(
      <NotificationList onClose={handleClose} position={position} listData={[]} />,
      getWrapper(position),
    );
  } else {
    positionArr.forEach((item) => {
      notificationList[item] = [];
      ReactDOM.render(
        <NotificationList onClose={handleClose} position={item} listData={[]} />,
        getWrapper(item),
      );
    });
  }
};

Notification.info = (
  NotificationConfig: NotificationConfig,
  duration?: number,
  position?: PositionType,
  closeable?: boolean,
) => openNotification('info', NotificationConfig, duration, position, closeable);
Notification.success = (
  NotificationConfig: NotificationConfig,
  duration?: number,
  position?: PositionType,
  closeable?: boolean,
) => openNotification('success', NotificationConfig, duration, position, closeable);
Notification.warning = (
  NotificationConfig: NotificationConfig,
  duration?: number,
  position?: PositionType,
  closeable?: boolean,
) => openNotification('warning', NotificationConfig, duration, position, closeable);
Notification.error = (
  NotificationConfig: NotificationConfig,
  duration?: number,
  position?: PositionType,
  closeable?: boolean,
) => openNotification('error', NotificationConfig, duration, position, closeable);
Notification.clear = (position?: PositionType) => clearNotification(position);

Notification.displayName = 'Notification';

export default Notification;
