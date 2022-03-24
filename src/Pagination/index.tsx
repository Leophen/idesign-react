import React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface PaginationProps {
  /**
   * 类名
   */
  className?: string;
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
    ...others
  } = props;

  return (
    <div className={classNames('i-pagination', className)} style={{ ...style }} {...others}>
      {children}
    </div>
  );
};

Pagination.displayName = 'Pagination';

export default Pagination;
