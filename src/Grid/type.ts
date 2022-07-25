export interface GridProps {
  /**
   * 栅格每一项的垂直对齐方式
   * @default top
   */
  align?: 'top' | 'middle' | 'bottom';
  /**
   * 类名
   */
  className?: string;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 栅格每一项间的间隔
   */
  gutter?: number;
  /**
   * 栅格水平排列方式
   * @default start
   */
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

export interface GridItemProps {
  /**
   * 栅格单项的垂直对齐方式
   */
  align?: 'top' | 'middle' | 'bottom';
  /**
   * 类名
   */
  className?: string;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 栅格每一项间的间隔
   */
  gutter?: number;
  /**
   * 栅格左侧的间隔格数，间隔内不可以有栅格
   */
  offset?: number;
  /**
   * 栅格单项次序
   */
  order?: number;
  /**
   * 栅格占位格数，为 0 时相当于 display: none
   * @default 24
   */
  span?: number;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 自定义单项宽度
   */
  width?: React.CSSProperties["width"];
}
