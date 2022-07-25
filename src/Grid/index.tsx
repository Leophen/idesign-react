import React from 'react';
import classNames from 'classnames';
import './index.scss';
import GridItem from './GridItem';
import { GridProps } from './type';

const Grid: React.FC<GridProps> & { Item: React.ElementType } = (props) => {
  const { align, children = '', className, gutter, justify, style, ...restProps } = props;

  return (
    <div
      className={classNames(
        'i-grid',
        align && `i-grid--align-${align}`,
        justify && `i-grid--justify-${justify}`,
        className,
      )}
      style={{ ...style }}
      {...restProps}
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
