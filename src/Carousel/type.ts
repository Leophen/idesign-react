export interface CarouselProps {
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
   * 初始轮播项
   * @default 0
   */
  defaultCurrent?: number;
  /**
   * 轮播图的宽度
   * @default 100%
   */
  width?: React.CSSProperties['width'];
  /**
   * 轮播图的高度
   * @default 300
   */
  height?: React.CSSProperties['height'];
  /**
   * 是否自动播放
   * @default false
   */
  autoPlay?: boolean;
  /**
   * 轮播间隔时间
   * @default 3000
   */
  interval?: number;
  /**
   * 是否悬浮时停止轮播
   * @default true
   */
  stopOnHover?: boolean;
  /**
   * 轮播图类型
   * @default default
   */
  type?: 'default' | 'card';
  /**
   * 轮播滑动方向
   * @default horizontal
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * 滑动动画时长
   * @default 300
   */
  duration?: number;
  /**
   * 切换轮播时触发
   */
  onChange?: (current: number) => void;
}

export interface CarouselItemProps {
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
   * 索引值
   * @default 0
   */
  index?: number;
  /**
   * 当前轮播项
   * @default 0
   */
  innerCurrent?: number;
  /**
   * 轮播图类型
   * @default default
   */
  type?: 'default' | 'card';
  /**
   * 是否有动画
   * @default false
   */
  ifAnimation?: boolean;
  /**
   * 轮播项数量
   * @default 1
   */
  childrenLength?: number;
  /**
   * 滑动动画时长
   * @default 300
   */
  duration?: number;
  /**
   * 包裹层宽度
   */
  wrapWidth?: number;
  /**
   * 点击轮播项触发
   */
  clickItem?: (index: number) => void;
}

export interface CarouselNavigationProps {
  /**
   * 轮播项数量
   * @default 0
   */
  itemNum?: number;
  /**
   * 当前轮播项
   * @default 0
   */
  current?: number;
  /**
   * 悬浮导航项时触发
   */
  onEnter?: (current: number) => void;
}
