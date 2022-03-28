import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Icon from '../Icon';
import { TransitionGroup } from 'react-transition-group'
import Transition from '../Transition'

type NotificationPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export interface NotificationProps {
  /**
  * 通知类型
  * @default info
  */
  type?: 'info' | 'success' | 'warning' | 'error';
  /**
   * 通知标题
   */
  title?: string;
  /**
   * 通知内容
   */
  content?: React.ReactNode;
  /**
   * 通知持续时间，单位：秒。值为 0 表示永久显示
   * @default 3
   */
  duration?: number;
  /**
  * 通知位置
  * @default top-right
  */
  placement?: NotificationPlacement
  /**
   * 通知是否可关闭
   * @default false
   */
  closeable?: boolean
  /**
   * 点击关闭按钮触发事件
   */
  onClose?: Function
}

export interface NotificationConfig extends NotificationProps { }

const Notification: React.FC<NotificationProps> & {
  success?: any
  warning?: any
  error?: any
  info?: any
  closeAll?: any
} = (props) => {
  const {
    type = 'info',
    title,
    content = '',
    closeable = false,
    onClose
  } = props;

  const clickCloseBtn = () => {
    onClose?.()
  }

  return (
    <div
      className='i-notification'
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
        size={20}
      />
      <div className="i-notification__main">
        {title && <div className="i-notification__title">{title}</div>}
        <div className="i-notification__content">{content}</div>
      </div>
      {closeable && <div className="i-notification__close" onClick={clickCloseBtn}>
        <Icon name="Close" />
      </div>}
    </div>
  );
};

interface NotificationContainerProps {
  notificationListData: any[]
  placement?: NotificationPlacement;
}

const NotificationContainer: React.FC<NotificationContainerProps> = (props) => {
  const { notificationListData, placement = 'top-right' } = props
  const onclose = (index: number) => {
    notificationList[placement].splice(index, 1)
    let el = document.querySelector(`#notification-wrapper__${placement}`)
    ReactDOM.render(<NotificationContainer placement={placement} notificationListData={notificationList[placement]} />, el)
  }
  return (
    <TransitionGroup>
      {
        notificationListData.map(({ key, type, title, content, closeable }, index) => (
          <Transition
            timeout={300}
            in
            animation={`slide-in-${placement}`}
            key={key}
          >
            <Notification type={type} title={title} content={content} closeable={closeable} onClose={() => onclose(index)} />
          </Transition>
        ))
      }
    </TransitionGroup>
  )
}

const notificationList: any = {
  'top-left': [],
  'top-right': [],
  'bottom-left': [],
  'bottom-right': []
}

const createNotificationWrapper = (placement: NotificationPlacement) => {
  const idName = `notification-wrapper__${placement}`
  let el = document.querySelector(`#${idName}`)
  if (!el) {
    el = document.createElement('div')
    el.className = `notification-wrapper ${idName}`
    el.id = idName
    document.body.append(el)
  }
  ReactDOM.render(<NotificationContainer placement={placement} notificationListData={notificationList[placement]} />, el)
}

createNotificationWrapper('top-left')
createNotificationWrapper('top-right')
createNotificationWrapper('bottom-left')
createNotificationWrapper('bottom-right')

const updateNotificationContainer = (config: any, mode = 'add') => {
  const location = config.placement
  let el = document.querySelector(`#notification-wrapper__${location}`)
  if (mode === 'add') { // 添加模式
    location.split('-')[0] === 'top' ? notificationList[location].push(config) : notificationList[location].unshift(config)
    // 延迟更新 DOM
    if (config.duration > 0) {
      setTimeout(() => {
        notificationList[location].map((item: any, index: number) => {
          if (item.key === config.key) {
            notificationList[location].splice(index, 1)
          }
        })
        ReactDOM.render(<NotificationContainer placement={location} notificationListData={notificationList[location]} />, el)
      }, config.duration * 1000)
    }
  } else { // 删除模式
    notificationList[location] = []
  }
  ReactDOM.render(<NotificationContainer placement={location} notificationListData={notificationList[location]} />, el)
}

const openNotification = (
  type: 'info' | 'success' | 'warning' | 'error',
  config: NotificationConfig
) => {
  updateNotificationContainer({
    key: Date.now(),
    type,
    title: config?.title,
    content: config?.content,
    duration: config?.duration === undefined ? 3 : config?.duration,
    placement: config?.placement || 'top-right',
    closeable: config?.closeable || false
  }, 'add')
}

const closeNotification = (config: NotificationConfig) => {
  updateNotificationContainer({
    placement: config?.placement || 'top-right'
  }, 'del')
}

Notification.info = (config: NotificationConfig) => openNotification('info', config)
Notification.success = (config: NotificationConfig) => openNotification('success', config)
Notification.warning = (config: NotificationConfig) => openNotification('warning', config)
Notification.error = (config: NotificationConfig) => openNotification('error', config)
Notification.closeAll = (config: NotificationConfig) => closeNotification(config)

Notification.displayName = 'Notification';

export default Notification;
