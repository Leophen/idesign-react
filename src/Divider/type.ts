export interface DividerProps {
  /**
   * 文本位置
   * @default center
   */
  align?: 'left' | 'center' | 'right';
  /**
   * 类名
   */
  className?: string;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 是否为虚线
   * @default false
   */
  dashed?: boolean;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}
