import React from 'react';
import classNames from 'classnames';
import './index.scss';
import ColumnGroup from './ColumnGroup';
import { TableBodyProps } from './type';

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

export default TableBody;
