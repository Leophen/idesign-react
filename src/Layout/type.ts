export interface UsualProps {
  /**
   * 组件自定义类名
   */
  className?: string;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 组件自定义样式
   */
  style?: React.CSSProperties;
}

export interface LayoutProps extends UsualProps {}

export interface LayoutHeaderProps extends UsualProps {
  /**
   * 顶栏高度。样式表（class）中定义的默认高度为：64px
   * @default ''
   */
  height?: React.CSSProperties["height"];
}

export interface LayoutAsideProps extends UsualProps {
  /**
   * 侧边栏宽度。样式表（class）中定义的默认宽度为：232px
   * @default ''
   */
  width?: React.CSSProperties["width"];
}

export interface LayoutContentProps extends UsualProps {}

export interface LayoutFooterProps extends UsualProps {
  /**
   * 底栏高度。样式表（class）中定义的默认高度为：24px
   * @default ''
   */
  height?: React.CSSProperties["height"];
}
