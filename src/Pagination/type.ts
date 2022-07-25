export interface PageInfo {
  current: number;
  pageSize: number;
}

export interface PaginationProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 当前页
   * @default 1
   */
  current?: number;
  /**
   * 数据总条数
   * @default 0
   */
  total?: number
  /**
   * 分页总页数
   * @default 10
   */
  pageSize?: number;
  /**
   * 全局禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否隐藏分页选择器
   * @default false
   */
  hideSelect?: boolean;
  /**
   * 是否隐藏跳转输入框
   * @default false
   */
  hideInput?: boolean;
  /**
   * 当前页或分页发生变化时触发
   */
  onChange?: (pageInfo: PageInfo) => void;
}

export interface PaginationSelectProps {
  /**
   * 每页条数
   * @default 10
   */
  value?: number
  /**
   * 禁用状态
   * @default false
   */
  disabled?: boolean;
  /**
   * 选择每页条数时触发
   */
  onSelect?: (val: number) => void
}

export interface PaginationListProps extends PaginationProps {
  /**
   * 点击页数时触发
   */
  onChoose?: (val: number) => void
}
