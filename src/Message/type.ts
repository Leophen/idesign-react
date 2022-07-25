export interface MessageProps {
  /**
  * 全局提示类型
  * @default info
  */
  type?: 'info' | 'success' | 'warning' | 'error';
  /**
   * 全局提示内容
   */
  content?: string;
  /**
   * 消息显示时长，单位：秒。值为 0 表示永久显示
   * @default 3
   */
  duration?: number;
  /**
  * 全局提示位置
  * @default top
  */
  placement?: 'top' | 'bottom';
}

export interface MessageConfig extends MessageProps { }
