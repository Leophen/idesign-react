import React, { useMemo } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import './index.scss';
import { BreadcrumbItemProps } from './type';

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = (props) => {
  const {
    children = '',
    className,
    disabled,
    maxItemWidth,
    maxWidth,
    separator = <Icon name="ArrowRight" size={16} />,
    style,
    ...restProps
  } = props;

  // 限制最大宽度
  const computedMaxWidth = useMemo(() => {
    let curMaxWidth;
    if (maxWidth) {
      curMaxWidth = typeof maxWidth === 'number' ? `${maxWidth}px` : String(maxWidth);
    }
    let curMaxItemWidth;
    if (maxItemWidth) {
      curMaxItemWidth =
        typeof maxItemWidth === 'number' ? `${maxItemWidth}px` : String(maxItemWidth);
    }
    return {
      maxWidth: curMaxWidth || curMaxItemWidth || '200px',
    };
  }, [maxItemWidth, maxWidth]);

  return (
    <div
      className={classNames(
        'i-breadcrumb__item',
        disabled && 'i-breadcrumb-is-disabled',
        className,
      )}
      style={{ ...style }}
      {...restProps}
    >
      <span className="i-breadcrumb__inner" style={computedMaxWidth}>
        {children}
      </span>
      <span className="i-breadcrumb__separator">{separator}</span>
    </div>
  );
};

export default BreadcrumbItem;
