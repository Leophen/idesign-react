export interface LoadingProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 加载图标
   * @default Loading
   */
  icon?: string;
  /**
   * 加载图标大小
   * @default 36
   */
  size?: number;
  /**
   * 加载图标颜色
   */
  color?: string;
  /**
   * 旋转提示内容
   */
  info?: React.ReactNode;
  /**
   * 旋转内容
   */
  spinner?: React.ReactNode;
}
