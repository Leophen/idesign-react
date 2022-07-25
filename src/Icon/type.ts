interface IconProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 组件自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 图标名称
   */
  name?: string;
  /**
   * 图标尺寸
   * @default 16
   */
  size?: number | string;
  /**
   * 图标颜色
   */
  color?: string;
  /**
   * 是否禁用图标
   */
  disabled?: boolean;
  /**
   * 点击图标触发事件
   */
  onClick?: any;
}
