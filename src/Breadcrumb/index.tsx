import React from 'react';
import classNames from 'classnames';
import './index.scss';
import BreadcrumbItem from './BreadcrumbItem'
import { BreadcrumbProps } from './type';

const Breadcrumb: React.FC<BreadcrumbProps> & { Item: React.ElementType } = (props) => {
  const {
    children = '',
    className,
    maxItemWidth,
    separator,
    style,
    ...restProps
  } = props;

  return (
    <div
      className={classNames(
        'i-breadcrumb',
        className
      )}
      style={{ ...style }}
      {...restProps}
    >
      {/* 将 separator 分隔符及 maxItemWidth 最大单项宽度传入 children */}
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }
        const childProps = {
          separator,
          maxItemWidth,
        };
        return React.cloneElement(child, childProps);
      })}
    </div>
  );
};

Breadcrumb.Item = BreadcrumbItem;

BreadcrumbItem.displayName = 'BreadcrumbItem';
Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
