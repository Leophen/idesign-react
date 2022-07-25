import React from 'react';
import classNames from 'classnames';
import './index.scss';
import { LayoutFooterProps } from './type';

const LayoutFooter: React.FC<LayoutFooterProps> = (props) => {
  const { children, className, style, ...restProps } = props;
  return (
    <footer className={classNames('i-layout--footer', className)} style={style} {...restProps}>
      {children}
    </footer>
  );
};

export default LayoutFooter;
