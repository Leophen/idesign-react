export interface ColumnType {
  /**
   * 唯一标识
   */
  key: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 宽度
   */
  width?: React.CSSProperties["width"];
  /**
   * 对齐方式
   */
  align?: React.CSSProperties["textAlign"];
}

export interface TableProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 表头配置数据
   * @default []
   */
  columns?: ColumnType[];
  /**
   * 表格数据源
   * @default []
   */
  data?: { [x: string]: any }[];
  /**
   * 表格列表最大高度，超出显示滚动条
   */
  maxHeight?: React.CSSProperties["height"];
  /**
   * 是否显示斑马纹
   * @default false
   */
  stripe?: boolean;
}

export interface ColumnGroupProps {
  /**
   * 列数据项
   * @default []
   */
  columns?: ColumnType[];
}

export interface TableHeadProps {
  /**
   * 列数据
   * @default []
   */
  columns?: ColumnType[];
}

export interface TableBodyProps {
  /**
   * 数据源
   * @default []
   */
  data?: { [x: string]: any }[];
  /**
   * 列数据
   * @default []
   */
  columns?: ColumnType[];
  /**
   * 表格列表高度，超出显示滚动条
   */
  maxHeight?: React.CSSProperties["height"];
  /**
   * 是否显示斑马纹
   * @default false
   */
  stripe?: boolean;
}
