export interface MenuProps {
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
   * 导航宽度
   */
  width?: React.CSSProperties["width"];
  /**
   * 固定选中值（受控）
   */
  active?: string | number;
  /**
   * 默认选中值（非受控）
   * @default 0
   */
  defaultActive?: string | number;
  /**
   * 前置内容
   */
  prefixContent?: React.ReactNode;
  /**
   * 前置内容
   */
  suffixContent?: React.ReactNode;
  /**
   * 导航方向
   * @default horizontal
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * 点击菜单项时触发
   */
  onChange?: (value: string | number) => void;
}

export interface MenuItemProps {
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
   * 单项唯一标识
   * @default 索引值
   */
  value?: string | number;
  /**
   * 点击单项时触发
   */
  onClick?: (value: string | number) => void;
}

export interface MenuGroupProps {
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
   * 组标题
   */
  title?: React.ReactNode
}
