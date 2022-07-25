export interface BackTopProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义内容
   */
  children?: React.ReactNode;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 监听滚动的元素
   * @default () => window
   */
  target?: () => HTMLElement | Window;
  /**
   * 显示起点高度
   * @default 0
   */
  visibleHeight?: number
  /**
   * 是否平滑滚动
   * @default true
   */
  smooth?: boolean
  /**
   * 点击返回顶部时触发
   */
  onClick?: () => void;
  /**
   * 滚动层节点滚动时触发
   */
  onScroll?: () => void;
}
