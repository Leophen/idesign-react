export interface CheckboxProps {
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
   * 按钮多选框尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 是否选中
   * @default false
   */
  checked?: boolean;
  /**
   * 是否禁用组件
   * @default false
   */
  disabled?: boolean;
  /**
   * 多选框的值
   */
  value?: string | number;
  /**
   * 值变化时触发
   */
  onChange?: (checked: boolean, context: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CheckboxGroupProps {
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
   * 多选框组选中的值
   */
  currentValue?: Array<string | number> | string | number;
  /**
   * 按钮多选框全局尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 多选框组是否全局禁用
   */
  disabled?: boolean;
  /**
   * 选中某一项时触发
   */
  onChange?: (
    value: Array<string | number> | string | number,
    context: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

export interface CheckboxContextValue {
  inject: (props: CheckboxProps) => CheckboxProps;
}
