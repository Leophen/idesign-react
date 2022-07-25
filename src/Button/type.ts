export interface ButtonProps {
  /**
   * 是否聚焦状态
   * @default false
   */
  active?: boolean;
  /**
   * 类名
   */
  className?: string;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 是否禁用按钮
   * @default false
   */
  disabled?: boolean;
  /**
   * 按钮形状
   * @default round
   */
  shape?: 'square' | 'round' | 'circle';
  /**
   * 按钮尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 按钮类型，用于描述组件不同的应用场景
   * @default primary
   */
  type?: 'info' | 'primary' | 'error' | 'warning' | 'success';
  /**
   * 按钮形式
   * @default base
   */
  variant?: 'base' | 'outline' | 'dashed' | 'text';
  /**
   * 内置图标
   */
  icon?: string;
  /**
   * 点击按钮触发事件
   */
  onClick?: React.MouseEventHandler;
}
