import { DropdownOption } from "../Dropdown/type";

export interface SelectProps {
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
   * 选择器宽度
   * @default 100%
   */
  width?:React.CSSProperties["width"];
  /**
   * 固定选中值（受控）
   */
  value?: string | number | Array<string | number>;
  /**
   * 默认选中值（非受控）
   * @default []
   */
  defaultValue?: string | number | Array<string | number>;
  /**
   * 占位符
   * @default 请选择
   */
  placeholder?: string;
  /**
   * 下拉操作项
   * @default []
   */
  options?: Array<DropdownOption>;
  /**
   * 选择器尺寸
   * @default medium
   */
  size?: "small" | "medium" | "large";
  /**
   * 是否可一键清空
   * @default true
   */
  clearable?: boolean;
  /**
   * 选择框前置图标名
   */
  prefixIcon?: string;
  /**
   * 选择框后置图标名
   */
  suffixIcon?: string;
  /**
   * 选择框前置图标类名
   */
  prefixIconClass?: string;
  /**
   * 选择框后置图标类名
   */
  suffixIconClass?: string;
  /**
   * 级联子层级展开方向
   * @default right
   */
  cascaderDirection?: 'left' | 'right';
  /**
   * 是否可多选
   * @default false
   */
  multiple?: boolean;
  /**
   * 是否禁用选择器
   * @default false
   */
  disabled?: boolean;
  /**
   * 选中值变化时触发
   */
  onChange?: (value: string | number | Array<string | number>) => void;
}

export interface SelectItemProps {
  /**
   * 内容
   */
  children?: React.ReactNode;
}
