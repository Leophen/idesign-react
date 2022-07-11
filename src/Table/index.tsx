import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import './index.scss';

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

const ColumnGroup: React.FC<ColumnGroupProps> = (props) => {
  const {
    columns = []
  } = props

  const columnWidths = columns.map((ele) => ele.width).join("-");

  const cols = useMemo(() => {
    const cols: React.ReactElement[] = [];
    let mustInsert = false;
    for (let i = columns.length; i >= 0; i--) {
      const width = columns[i] && columns[i].width;
      if (width || mustInsert) {
        cols.unshift(
          <col
            key={i}
            width={width}
            style={{ width, minWidth: width, textAlign: columns[i].align }}
          />
        );
        mustInsert = true;
      }
    }
    return cols;
  }, [columnWidths]);

  return <colgroup>{cols}</colgroup>;
};

export interface TableHeadProps {
  /**
   * 列数据
   * @default []
   */
  columns?: ColumnType[];
}

const TableHead: React.FC<TableHeadProps> = (props) => {
  const {
    columns = []
  } = props

  return (
    <table className="i-table-thead__wrapper">
      <ColumnGroup columns={columns} />
      <thead className='i-table-thead'>
        <tr className='i-table-tr'>
          {columns.map((column) => (
            <th className="i-table-th" key={column.key}>
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
    </table>
  );
};

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

const TableBody: React.FC<TableBodyProps> = (props) => {
  const {
    data = [],
    columns = [],
    maxHeight,
    stripe = false
  } = props

  return (
    <div
      className="i-table-tbody__box"
      style={{ maxHeight }}
    >
      <table className="i-table-tbody__wrapper">
        <ColumnGroup columns={columns} />
        <tbody
          className={classNames(
            'i-table-tbody',
            stripe && 'i-table-tbody__stripe'
          )}
        >
          {data.map((item) => (
            <tr
              className='i-table-tr'
              key={item.key}
            >
              {columns.map((cell) => (
                <td className="i-table-td" key={cell.key}>
                  {item[cell.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Table: React.FC<TableProps> = (props) => {
  const {
    className,
    style,
    columns = [],
    data = [],
    maxHeight,
    stripe = false,
    ...restProps
  } = props;

  return (
    <div
      className={classNames(
        'i-table',
        className
      )}
      style={{ ...style }}
      {...restProps}
    >
      {/* <ColumnGroup columns={columns} /> */}
      <TableHead columns={columns}></TableHead>
      <TableBody
        columns={columns}
        data={data}
        maxHeight={maxHeight}
        stripe={stripe}
      />
    </div>
  )
};

Table.displayName = 'Table';

export default Table;
