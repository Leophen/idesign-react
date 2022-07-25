export type CollapseValueType = Array<string | number>;

export interface CollapseProps {
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
   * 当前展开项
   */
  active?: CollapseValueType;
  /**
   * 默认展开项
   */
  defaultActive?: CollapseValueType;
  /**
   * 是否为手风琴模式
   * @default false
   */
  accordion?: boolean;
  /**
   * 全局禁用折叠项
   * @default false
   */
  disabled?: boolean;
  /**
   * 默认全部展开
   * @default false
   */
  expandAll?: boolean;
  /**
   * 自定义图标位置
   * @default left
   */
  iconPlacement?: 'left' | 'right';
  /**
   * 是否隐藏边框
   * @default false
   */
  hideBorder?: boolean;
  /**
   * 无缩进模式
   * @default false
   */
  noIndent?: boolean;
  /**
   * 切换面板时触发，返回变化的值
   */
  onChange?: (value: CollapseValueType) => void;
}

export interface CollapseContextValue {
  inject: (props: CollapseItemProps) => CollapseItemAddProps;
}

export interface CollapseItemProps {
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
   * 折叠项标题
   */
  title?: string;
  /**
   * 折叠项唯一标识
   * @default 索引值
   */
  value?: string | number;
  /**
   * 禁用单折叠项
   * @default false
   */
  disabled?: boolean;
  /**
   * 自定义图标位置
   * @default left
   */
  iconPlacement?: 'left' | 'right';
}

export interface CollapseItemAddProps extends CollapseItemProps {
  /**
   * 当前展开项
   */
  innerActive?: CollapseValueType;
  /**
   * 索引值
   */
  index?: number;
  /**
   * 更新展开项操作
   */
  updateInnerActive?: (value: string | number) => void
}
