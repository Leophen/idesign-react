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
