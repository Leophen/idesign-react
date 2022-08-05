export type placementType =
  | 'auto'
  | 'auto-start'
  | 'auto-end'
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';

export interface PopupProps {
  /**
   * 包裹层类名
   */
  className?: string;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 弹窗内容类名
   */
  portalClassName?: string;
  /**
   * 弹窗内容样式
   */
  portalStyle?: React.CSSProperties;
  /**
   * 气泡样式
   */
  style?: React.CSSProperties;
  /**
   * 气泡提示内容
   */
  content?: React.ReactNode;
  /**
   * 气泡提示位置
   * @default top
   */
  placement?: placementType;
  /**
   * 触发气泡出现的方式
   * @default hover
   */
  trigger?: 'hover' | 'click' | 'context-menu';
  /**
   * 手动显示气泡
   */
  visible?: boolean;
  /**
   * 气泡默认显示
   * @default false
   */
  defaultVisible?: boolean;
  /**
   * 是否禁用气泡
   * @default false
   */
  disabled?: boolean;
  /**
   * 气泡是否与触发节点等宽
   * @default false
   */
  sameWidth?: boolean;
  /**
   * 气泡内是否有边距
   * @default false
   */
  noPadding?: boolean;
  /**
   * 触发气泡操作时触发
   */
  onTrigger?: (visible: boolean) => void;
}

export interface PortalProps {
  /**
   * 气泡类名
   */
  portalClassName?: string;
  /**
   * 气泡样式
   */
  portalStyle?: React.CSSProperties;
  /**
   * 气泡内是否有边距
   * @default false
   */
  noPadding?: boolean;
  /**
   * 气泡内容
   */
  content?: React.ReactNode;
  /**
   * 是否显示
   */
  visible?: boolean;
  /**
   * 获取气泡节点
   */
  getRef?: (ref: React.Ref<HTMLDivElement>) => void;
}
