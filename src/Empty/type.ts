export interface EmptyProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 自定义展位图
   */
  image?: string;
  /**
   * 空状态尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 空状态显示类型
   * @default default
   */
  type?: 'default' | 'shoppingTrolley' | 'favorite' | 'gold';
}
