export interface BadgeProps {
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
   * 徽标内容，可为任意内容
   * @default 0
   */
  count?: React.ReactNode;
  /**
   * 封顶的数字值
   * @default 99
   */
  maxCount?: number;
  /**
   * 徽标颜色
   */
  color?: string;
  /**
   * 是否为红点
   * @default false
   */
  dot?: boolean;
  /**
   * 尺寸
   * @default medium
   */
  size?: 'small' | 'medium';
  /**
   * 徽标形状
   * @default circle
   */
  shape?: 'circle' | 'round';
  /**
   * 当数值为 0 时，是否展示徽标
   * @default true
   */
  showZero?: boolean;
  /**
   * 徽标偏移量
   */
  offset?: Array<string | number>;
}
