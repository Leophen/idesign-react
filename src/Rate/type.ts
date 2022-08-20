export interface RateProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 固定分值（受控）
   */
  value?: number;
  /**
   * 默认分值（非受控）
   * @default 0
   */
  defaultValue?: number;
  /**
   * 是否只读
   * @default false
   */
  readonly?: boolean;
  /**
   * 是否可清除
   * @default false
   */
  allowClear?: boolean;
  /**
   * 是否支持半星
   * @default false
   */
  allowHalf?: boolean;
  /**
   * 最大分值
   * @default 5
   */
  count?: number;
  /**
   * 选中颜色
   * @default #f5db4d
   */
  activeColor?: string;
  /**
   * 未选中颜色
   * @default #e5e6ea | #333336
   */
  voidColor?: string;
  /**
   * 选中图标
   * @default StarFill
   */
  activeIcon?: string;
  /**
   * 未选中图标
   * @default StarFill
   */
  voidIcon?: string;
  /**
   * 选择评分时触发
   */
  onChange?: (val: number) => void;
}
