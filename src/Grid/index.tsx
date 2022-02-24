import React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface GridProps {
  /**
   * 栅格每一项的垂直对齐方式
   * @default top
   */
  align?: 'top' | 'middle' | 'bottom';
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 类名
   */
  className?: string;
  /**
   * 栅格每一项间的间隔
   */
  gutter?: number;
  /**
   * 栅格水平排列方式
   * @default start
   */
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

export interface GridItemProps {
  /**
   * 栅格单项的垂直对齐方式
   */
  align?: 'top' | 'middle' | 'bottom';
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 类名
   */
  className?: string;
  /**
   * 栅格每一项间的间隔
   */
  gutter?: number;
  /**
   * 栅格左侧的间隔格数，间隔内不可以有栅格
   */
  offset?: number;
  /**
   * 栅格单项次序
   */
  order?: number;
  /**
   * 栅格占位格数，为 0 时相当于 display: none
   * @default 24
   */
  span?: number;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 自定义单项宽度
   */
  width?: string | number;
}

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
    ...others
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

  const computedWidth = (width: string | number) => {
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
      {...others}
    >
      {children}
    </div>
  );
};

const Grid: React.FC<GridProps> & { Item: React.ElementType } = (props) => {
  const { align, children = '', className, gutter, justify, style, ...others } = props;

  return (
    <div
      className={classNames(
        'i-grid',
        align && `i-grid--align-${align}`,
        justify && `i-grid--justify-${justify}`,
        className,
      )}
      style={{ ...style }}
      {...others}
    >
      {/* 将 gutter 传入 children */}
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }
        const childProps = {
          gutter,
        };
        return React.cloneElement(child, childProps);
      })}
    </div>
  );
};

Grid.Item = GridItem;

Grid.displayName = 'Grid';
GridItem.displayName = 'GridItem';

export default Grid;
