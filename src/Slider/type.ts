import { placementType } from '../Popup/type';

export interface SliderProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 滑块布局方向
   * @default horizontal
   */
  layout?: 'vertical' | 'horizontal';
  /**
   * 滑块固定值（受控）
   */
  value?: number | number[];
  /**
   * 滑块默认值（非受控）
   */
  defaultValue?: number | number[];
  /**
   * 是否禁用滑块
   * @default false
   */
  disabled?: boolean;
  /**
   * 滑块范围最大值
   * @default 100
   */
  max?: number;
  /**
   * 滑块范围最小值
   * @default 0
   */
  min?: number;
  /**
   * 步长
   * @default 1
   */
  step?: number;
  /**
   * 是否为范围滑块
   * @default false
   */
  range?: boolean;
  /**
   * 是否隐藏数值提示
   * @default false
   */
  hideTip?: boolean;
  /**
   * 数值提示出现位置
   * @default top
   */
  placement?: placementType;
  /**
   * 滑块值变化时触发
   */
  onChange?: (value: number) => void;
}

export interface SliderBtnProps extends SliderProps {
  /**
   * 当前值
   * @default 0
   */
  currentVal?: number;
  /**
   * 是否正选中滑条
   * @default false
   */
  downSlider?: boolean;
}
