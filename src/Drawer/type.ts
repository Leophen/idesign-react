export interface DrawerProps {
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
   * 控制抽屉显示隐藏
   * @default false
   */
  visible?: boolean;
  /**
   * 按下退出键是否触发关闭事件
   * @default true
   */
  closeOnEsc?: boolean;
  /**
   * 是否显示遮罩层
   * @default true
   */
  showMask?: boolean;
  /**
   * 抽屉展开位置
   * @default right
   */
  placement?: 'left' | 'right' | 'top' | 'bottom'
  /**
   * 抽屉宽度
   */
  width?: React.CSSProperties["width"];
  /**
   * 抽屉高度
   */
  height?: React.CSSProperties["height"];
  /**
   * 抽屉头部内容
   */
  header?: React.ReactNode;
  /**
   * 抽屉底部内容
   */
  footer?: React.ReactNode;
  /**
   * 抽屉关闭时触发事件
   */
  onClose?: () => void;
}
