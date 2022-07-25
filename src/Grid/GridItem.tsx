import React from 'react';
import classNames from 'classnames';
import './index.scss';
import { GridItemProps } from './type';

const GridItem: React.FC<GridItemProps> = (props) => {
  const {
    align,
    children = '',
    className,
    gutter,
    order,
    offset,
    style,
    span = 24,
    width,
    ...restProps
  } = props;

  const limitNum = (num: number) => {
    let result = parseInt(num.toString());
    if (result > 24) {
      result = 24;
    }
    if (result < 0) {
      result = 0;
    }
    return result;
  };

  const computedWidth = (width: React.CSSProperties["width"]) => {
    if (isNaN(width as number)) {
      return width;
    }
    const result = width + 'px';
    return result;
  };

  return (
    <div
      className={classNames(
        'i-grid__item',
        `i-grid__item--span-${limitNum(span)}`,
        offset && `i-grid__item--offset-${limitNum(offset)}`,
        order && `i-grid__item--order-${limitNum(order)}`,
        align && `i-grid__item--align-${align}`,
        className,
      )}
      style={{
        ...(style || {}),
        ...({
          paddingLeft: gutter,
          paddingRight: gutter,
        } || {}),
        ...(width
          ? {
            flex: `0 0 ${computedWidth(width)}`,
            maxWidth: computedWidth(width),
          }
          : { flex: '1' }),
      }}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default GridItem;
