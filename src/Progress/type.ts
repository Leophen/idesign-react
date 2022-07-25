export interface ProgressProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 进度条百分比
   * @default 0
   */
  percentage?: number;
  /**
   * 进度条类型
   * @default bar
   */
  type?: 'bar' | 'circle';
  /**
   * 是否显示进度提示文本
   * @default true
   */
  labelTxt?: boolean;
  /**
   * 提示是否在进度条内部
   * @default false
   */
  innerLabel?: boolean;
  /**
   * 自定义进度提示
   */
  label?: React.ReactNode;
  /**
   * 进度条颜色
   */
  color?: string;
  /**
   * 进度条底色
   */
  backColor?: string;
  /**
   * 进度条长度/环形直径
   * @default 300
   */
  width?: React.CSSProperties["width"];
  /**
   * 进度条粗细度
   * @default 6
   */
  strokeWidth?: number;
  /**
   * 触发进度加载动画
   * @default false
   */
  indeterminate?: boolean;
  /**
   * 进度加载动画速度
   * @default 3
   */
  duration?: number;
}
