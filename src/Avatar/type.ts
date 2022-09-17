export interface AvatarProps {
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
   * 头像图片地址
   */
  image?: string;
  /**
   * 头像图片 alt 属性
   */
  alt?: string;
  /**
   * 头像大小
   * @default 32
   */
  size?: number;
  /**
   * 头像形状
   * @default circle
   */
  shape?: 'circle' | 'round';
  /**
   * 头像底色
   */
  color?: string;
}

export interface AvatarGroupProps extends AvatarProps {
  /**
   * 折叠方向
   * @default right
   */
  cascading?: "left" | "right";
}

export interface AvatarContextValue {
  inject: (props: AvatarProps) => AvatarProps;
}
