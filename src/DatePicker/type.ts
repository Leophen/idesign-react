export interface DatePickerProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 选中值
   */
  value?: string;
  /**
   * 默认选中值，非受控属性
   */
  defaultValue?: string;
  /**
   * 触发方式
   * @default click
   */
  trigger?: 'hover' | 'click' | 'context-menu';
  /**
   * 是否禁用选择器
   * @default false
   */
  disabled?: boolean;
  /**
   * 日期选择器类型
   * @default date
   */
  type?: 'date' | 'range';
  /**
   * 占位符
   * @default date
   */
  placeholder?: 'date' | 'range';
  /**
   * 范围日期分隔符
   * @default -
   */
  rangeSeparator?: string;
  /**
   * 每周的第一天，0 为周日，1 为周一
   * @default 1
   */
  firstDayOfWeek?: 0 | 1;
  /**
   * 选中值发生变化时触发
   */
  onChange?: (value: string) => void;
}

export interface DateHeaderBtnProps {
  icon?: string;
  disabled?: boolean;
  onClick?: Function;
}

export interface DatePanelProps {
  value?: string;
  defaultDisplayVal?: string;
  rangeValue?: string[];
  firstDayOfWeek?: number;
  onChange?: Function;
  onHover?: Function;
  onClose?: Function
}

export interface DatePanelRangeProps extends DatePanelProps { }

export interface MonthSelectPanelProps {
  month: number;
  onChange: Function;
}

export interface YearSelectPanelProps {
  year: number;
  onChange: Function;
}
