import React from 'react';
import classNames from 'classnames';
import './index.scss';
import { LayoutAsideProps } from './type';

const LayoutAside: React.FC<LayoutAsideProps> = (props) => {
  const { width = 240, className, style, children, ...otherAsideProps } = props;

  const asideClassNames = classNames('i-layout--aside', className);
  const asideWidth = typeof width === 'number' ? `${width}px` : String(width);

  const asideStyle = {
    width: asideWidth,
    maxWidth: asideWidth,
    minWidth: asideWidth,
    flex: `0 0 ${asideWidth}`,
    ...style,
  };

  return (
    <aside className={asideClassNames} style={asideStyle} {...otherAsideProps}>
      {children}
    </aside>
  );
};

export default LayoutAside;
