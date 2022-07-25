import React, { useMemo } from 'react';
import './index.scss';
import { ColumnGroupProps } from './type';

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

export default ColumnGroup;
