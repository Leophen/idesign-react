import React from 'react';
import classNames from 'classnames';
import './index.scss';
import TableHead from './TableHead';
import TableBody from './TableBody';
import { TableProps } from './type';

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
