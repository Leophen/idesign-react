import React from 'react';
import { createRoot, Root } from 'react-dom/client';
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

const rootMap = new Map<PositionType, Root>();

const renderNotificationList = (position: PositionType, container: Element | null) => {
  if (!container) {
    return;
  }
  let root = rootMap.get(position);
  if (!root) {
    root = createRoot(container);
    rootMap.set(position, root);
  }
  root.render(
    <NotificationList
      onClose={handleClose}
      position={position}
      listData={notificationList[position]}
    />,
  );
};

const handleClose = (index: number, position: PositionType) => {
  notificationList[position].splice(index, 1);
  renderNotificationList(position, getWrapper(position));
};

const createNotificationWrapper = (position: PositionType) => {
  const idName = `i-notification-wrapper__${position}`;
  const container = useContainer(idName, notificationWrapper, `i-notification-wrapper ${idName}`);
  renderNotificationList(position, container);
};

createNotificationWrapper('top-left');
createNotificationWrapper('top-right');
createNotificationWrapper('bottom-left');
createNotificationWrapper('bottom-right');

const updateNotificationContainer = (config: MergeConfigType) => {
  const { id = 0, position = 'top-right', duration = 3 } = config;

  if (position.split('-')[0] === 'top') {
    notificationList[position].push(config);
  } else {
    notificationList[position].unshift(config);
  }

  const renderContainer = getWrapper(position);

  if (duration > 0) {
    setTimeout(() => {
      notificationList[position].forEach((item: MergeConfigType, index: number) => {
        if (item.id === id) {
          notificationList[position].splice(index, 1);
        }
      });
      renderNotificationList(position, renderContainer);
    }, duration * 1000);
  }

  renderNotificationList(position, renderContainer);
};

const openNotification = (
  type: NotificationType,
  notificationConfig: NotificationConfig,
  duration = 3,
  position = 'top-right',
  closeable = false,
) => {
  const isConfigMode =
    typeof notificationConfig === 'object' && !React.isValidElement(notificationConfig);
  const mergeConfig: MergeConfigType = {
    id: Date.now(),
    type,
    title: isConfigMode ? (notificationConfig as NotificationConfigType)?.title : undefined,
    content: isConfigMode
      ? (notificationConfig as NotificationConfigType)?.content
      : notificationConfig,
    duration: isConfigMode
      ? (notificationConfig as NotificationConfigType)?.duration ?? 3
      : duration,
    position: isConfigMode
      ? (notificationConfig as NotificationConfigType).position ?? 'top-right'
      : (position as PositionType),
    closeable: isConfigMode
      ? (notificationConfig as NotificationConfigType)?.closeable ?? false
      : closeable,
  };
  updateNotificationContainer(mergeConfig);
};

const clearNotification = (position?: PositionType) => {
  const positionArr: PositionType[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
  if (position) {
    notificationList[position] = [];
    renderNotificationList(position, getWrapper(position));
  } else {
    positionArr.forEach((item) => {
      notificationList[item] = [];
      renderNotificationList(item, getWrapper(item));
    });
  }
};

Notification.info = (
  notificationConfig: NotificationConfig,
  duration?: number,
  position?: PositionType,
  closeable?: boolean,
) => openNotification('info', notificationConfig, duration, position, closeable);
Notification.success = (
  notificationConfig: NotificationConfig,
  duration?: number,
  position?: PositionType,
  closeable?: boolean,
) => openNotification('success', notificationConfig, duration, position, closeable);
Notification.warning = (
  notificationConfig: NotificationConfig,
  duration?: number,
  position?: PositionType,
  closeable?: boolean,
) => openNotification('warning', notificationConfig, duration, position, closeable);
Notification.error = (
  notificationConfig: NotificationConfig,
  duration?: number,
  position?: PositionType,
  closeable?: boolean,
) => openNotification('error', notificationConfig, duration, position, closeable);
Notification.clear = (position?: PositionType) => clearNotification(position);

Notification.displayName = 'Notification';

export default Notification;
