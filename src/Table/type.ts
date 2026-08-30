export interface ColumnType<T extends Record<string, unknown> = Record<string, unknown>> {
  /**
   * 唯一标识
   */
  key: string;
  /**
   * 数据字段名
   */
  dataIndex?: keyof T & string;
  /**
   * 标题
   */
  title: string;
  /**
   * 宽度
   */
  width?: React.CSSProperties['width'];
  /**
   * 对齐方式
   */
  align?: React.CSSProperties['textAlign'];
  /**
   * 自定义单元格渲染
   */
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
}

export interface TableProps<T extends Record<string, unknown> = Record<string, unknown>> {
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
  columns?: ColumnType<T>[];
  /**
   * 表格数据源
   * @default []
   */
  data?: T[];
  /**
   * 表格列表最大高度，超出显示滚动条
   */
  maxHeight?: React.CSSProperties['height'];
  /**
   * 是否显示斑马纹
   * @default false
   */
  stripe?: boolean;
}

export interface ColumnGroupProps<T extends Record<string, unknown> = Record<string, unknown>> {
  /**
   * 列数据项
   * @default []
   */
  columns?: ColumnType<T>[];
}

export interface TableHeadProps<T extends Record<string, unknown> = Record<string, unknown>> {
  /**
   * 列数据
   * @default []
   */
  columns?: ColumnType<T>[];
}

export interface TableBodyProps<T extends Record<string, unknown> = Record<string, unknown>> {
  /**
   * 数据源
   * @default []
   */
  data?: T[];
  /**
   * 列数据
   * @default []
   */
  columns?: ColumnType<T>[];
  /**
   * 表格列表高度，超出显示滚动条
   */
  maxHeight?: React.CSSProperties['height'];
  /**
   * 是否显示斑马纹
   * @default false
   */
  stripe?: boolean;
}
