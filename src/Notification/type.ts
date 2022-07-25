

export type NotificationPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

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
