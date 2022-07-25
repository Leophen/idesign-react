import React from 'react';
import './index.scss';
import ColumnGroup from './ColumnGroup';
import { TableHeadProps } from './type';

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

export default TableHead;
