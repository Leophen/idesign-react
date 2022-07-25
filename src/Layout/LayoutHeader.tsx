import React from 'react';
import classNames from 'classnames';
import './index.scss';
import { LayoutHeaderProps } from './type';

const LayoutHeader: React.FC<LayoutHeaderProps> = (props) => {
  const { children, className, style, ...restProps } = props;
  return (
    <header className={classNames('i-layout--header', className)} style={style} {...restProps}>
      {children}
    </header>
  );
};

export default LayoutHeader;
