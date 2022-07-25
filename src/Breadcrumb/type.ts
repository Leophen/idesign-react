export interface BreadcrumbProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 单项最大宽度，超出后会以省略号形式呈现
   */
  maxItemWidth?: string | number;
  /**
   * 自定义分隔符
   */
  separator?: React.ReactNode;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

export interface BreadcrumbItemProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 是否禁用当前项点击
   */
  disabled?: boolean;
  /**
   * 单项最大宽度，超出后会以省略号形式呈现
   */
  maxItemWidth?: string | number;
  /**
   * 最大宽度，超出后会以省略号形式呈现。优先级高于 maxItemWidth
   */
  maxWidth?: string | number;
  /**
   * 自定义分隔符
   */
  separator?: React.ReactNode;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}
