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
  columns: ColumnType[];
  /**
   * 表格数据源
   * @default []
   */
  data?: { [x: string]: any }[];
  /**
   * 表格列表高度，超出显示滚动条
   * @default 600
   */
  height?: React.CSSProperties["height"];
}

export interface ColumnGroupProps {
  /**
   * 列数据项
   */
  columns: ColumnType[];
}

const ColumnGroup: React.FC<ColumnGroupProps> = (props) => {
  const {
    columns
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
   */
  columns: ColumnType[];
}

const TableHead: React.FC<TableHeadProps> = (props) => {
  const {
    columns
  } = props

  return (
    <thead className='i-table-head'>
      <tr className='i-table-row'>
        {columns.map((column) => (
          <th className="i-table-th" key={column.key}>
            {column.title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export interface TableBodyProps {
  /**
   * 数据源
   */
  data?: { [x: string]: any }[];
  /**
   * 列数据
   */
  columns: ColumnType[];
}

const TableBody: React.FC<TableBodyProps> = (props) => {
  const {
    data,
    columns
  } = props

  return (
    <tbody className='i-table-body'>
      {data?.map((item) => (
        <tr
          className='i-table-row'
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
  );
};

const Table: React.FC<TableProps> = (props) => {
  const {
    className,
    style,
    columns,
    data,
    height = 600,
    ...restProps
  } = props;

  return (
    <table
      className={classNames(
        'i-table',
        className
      )}
      style={{ ...style }}
      {...restProps}
    >
      <ColumnGroup columns={columns} />
      <TableHead columns={columns}></TableHead>
      <TableBody
        columns={columns}
        data={data}
      />
    </table>
  )
};

Table.displayName = 'Table';

export default Table;
