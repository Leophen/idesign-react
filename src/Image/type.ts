export interface ImageProps {
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
   * 图片地址
   */
  src?: string;
  /**
   * 图片宽度
   * @default 200
   */
  width?: React.CSSProperties["width"];
}

export interface PreviewDialogProps {
  visible?: boolean;
  closeOnEsc?: boolean;
  onClose?: () => void;
  image?: string;
  x?: number;
  y?: number;
}
