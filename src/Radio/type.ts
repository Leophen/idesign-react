export interface RadioGroupProps {
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
   * 单选框组选中固定值（受控）
   */
  selected?: string | number;
  /**
   * 单选框组选中默认值（非受控）
   * @default 第一项 value
   */
  defaultSelected?: string | number;
  /**
   * 单选框组全局类型
   * @default radio
   */
  type?: 'radio' | 'radio-button';
  /**
   * 按钮单选框全局尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 单选框组是否全局禁用
   */
  disabled?: boolean;
  /**
   * 选中某一项时触发
   */
  onChange?: (value: string | number, ev: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RadioProps {
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
   * 单选框类型
   * @default radio
   */
  type?: 'radio' | 'radio-button';
  /**
   * 按钮单选框尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 是否固定选中（受控）
   */
  checked?: boolean;
  /**
   * 是否默认选中（非受控）
   * @default false
   */
  defaultChecked?: boolean;
  /**
   * 是否禁用组件
   * @default false
   */
  disabled?: boolean;
  /**
   * 单选框的值
   */
  value?: string | number;
  /**
   * 值变化时触发
   */
  onChange?: (checked: boolean, ev: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RadioContextValue {
  inject: (props: RadioProps) => RadioProps;
}
