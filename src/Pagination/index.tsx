import React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface PaginationProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const {
    children = '',
    className,
    style,
    ...restProps
  } = props;

  return (
    <div className={classNames('i-pagination', className)} style={{ ...style }} {...restProps}>
      {children}
    </div>
  );
};

Pagination.displayName = 'Pagination';

export default Pagination;
