import React from 'react';
import classNames from 'classnames';
import './index.scss';
import { LayoutContentProps } from './type';

const LayoutContent: React.FC<LayoutContentProps> = (props) => {
  const { children, className, style, ...restProps } = props;
  return (
    <main className={classNames('i-layout--content', className)} style={style} {...restProps}>
      {children}
    </main>
  );
};

export default LayoutContent;
