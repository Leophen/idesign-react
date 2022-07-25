export interface TimePickerProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 时间值
   */
  value?: string;
  /**
   * 默认时间值
   * @default 当前时间
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
   * 用于格式化时间，[详细文档](https://day.js.org/docs/en/display/format)
   * @default HH:mm:ss
   */
  format?: string;
  /**
   * [时, 分, 秒] 时间间隔步数
   * @default () => [1, 1, 1]
   */
  steps?: Array<string | number>;
  /**
   * 选中时间变化时触发
   */
  onChange?: (value: string) => void;
  /**
   * 切换时间面板时触发
   */
  onTrigger?: (visible: boolean) => void;
}

export interface TimeInputProps {
  /**
   * 时间值
   */
  value?: TimesType;
  /**
   * 是否禁用输入框
   * @default false
   */
  disabled?: boolean;
  /**
   * 用于格式化时间，[详细文档](https://day.js.org/docs/en/display/format)
   * @default HH:mm:ss
   */
  format?: string;
  /**
   * 输入时间变化时触发
   */
  onChange?: (value: TimesType) => void;
}

export interface TimePanelProps {
  /**
   * 是否禁用组件
   * @default false
   */
  disabled?: boolean;
  /**
   * 占位符
   * @default ''
   */
  placeholder?: string;
  /**
   * 尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 选中值
   */
  value?: TimesType;
  /**
   * 时间间隔步数，数组排列 [小时, 分钟, 秒]，示例：[2, 1, 1] 或者 ['2', '1', '1']
   * @default () => [1, 1, 1]
   */
  steps?: Array<string | number>;
  /**
   * 禁用时间项
   */
  disableTime?: (h: number, m: number, s: number) => boolean;
  /**
   * 用于格式化时间，[详细文档](https://day.js.org/docs/en/display/format)
   * @default 'HH:mm:ss'
   */
  format?: string;
  /**
   * 是否隐藏禁用状态的时间项
   * @default true
   */
  hideDisabledTime?: boolean;
  /**
   * 点击此刻按钮时触发
   */
  onNow?: () => void;
  /**
   * 选中值发生变化时触发
   */
  onChange?: (type: string, value: string) => void;
  /**
   * 面板关闭时触发
   */
  onClose?: (visible: boolean) => void;
  /**
   * 点击确认按钮时触发
   */
  onConfirm?: () => void;
}

export interface TimesType {
  hour?: string;
  minute?: string;
  second?: string;
  meridiem?: string;
}

export enum EPickerCols {
  hour = 'hour',
  minute = 'minute',
  second = 'second',
  meridiem = 'meridiem',
}
