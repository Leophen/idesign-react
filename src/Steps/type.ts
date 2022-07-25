export interface StepsItemProps {
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
   * 步骤标题
   * @default ''
   */
  title?: React.ReactNode;
  /**
   * 步骤描述
   * @default ''
   */
  description?: React.ReactNode;
  /**
   * index 值
   * @default 0
   */
  index?: number;
  /**
   * 进行到哪一步
   * @default 0
   */
  current?: number;
}

export interface StepsProps extends StepsItemProps {
  /**
   * 进行到哪一步
   * @default 0
   */
  current?: number;
  /**
   * 步骤条方向
   * @default horizontal
   */
  layout?: 'horizontal' | 'vertical';
  /**
   * 步骤条是否倒序
   * @default false
   */
  reverse?: boolean;
  /**
   * 是否为无序的步骤条
   * @default false
   */
  dot?: boolean;
}

export interface StepsContextValue {
  inject: (props: StepsProps) => StepsProps;
}
