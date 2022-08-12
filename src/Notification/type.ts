export type PositionType = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface NotificationProps {
  /**
   * 通知类型
   * @default info
   */
  type: NotificationType;
  /**
   * 通知内容
   */
  content: React.ReactNode;
  /**
   * 通知标题
   */
  title?: React.ReactNode;
  /**
   * 是否可关闭
   * @default false
   */
  closeable?: boolean;
  /**
   * 是否完成进入动画
   */
  entered?: boolean;
  /**
   * 点击关闭按钮触发
   */
  onClose?: () => void;
}

export interface NotificationListData {
  /**
   * 左上角通知组数据
   */
  'top-left': MergeConfigType[];
  /**
   * 右上角通知组数据
   */
  'top-right': MergeConfigType[];
  /**
   * 左下角通知组数据
   */
  'bottom-left': MergeConfigType[];
  /**
   * 右下角通知组数据
   */
  'bottom-right': MergeConfigType[];
}

export interface NotificationListProps {
  /**
   * 消息组数据
   */
  listData: MergeConfigType[];
  /**
   * 消息出现位置
   * @default top
   */
  position?: PositionType;
  /**
   * 关闭单项通知时触发
   */
  onClose?: (idx: number, position: PositionType) => void;
}

export interface MergeConfigType extends NotificationProps {
  /**
   * 消息唯一标识
   * @default 时间值
   */
  id: number;
  /**
   * 消息持续时间，单位秒
   * @default 3
   */
  duration: number;
  /**
   * 消息出现位置
   * @default top
   */
  position: PositionType;
}

export interface NotificationConfigType extends NotificationProps {
  /**
   * 消息持续时间，单位秒
   * @default 3
   */
  duration?: number;
  /**
   * 消息出现位置
   * @default top
   */
  position?: PositionType;
}

export type NotificationMethod = (
  messageConfig: NotificationConfig,
  duration?: number,
  position?: PositionType,
  closeable?: boolean
) => void;

export type NotificationConfig = React.ReactNode | NotificationConfigType;
