import React, { Children } from 'react';
import './index.scss';

interface ScrollbarProps {
  children?: React.ReactNode;
}

const Scrollbar = (props: ScrollbarProps) => {
  const { children } = props;

  return <div className="i-design-scrollbar">{children}</div>;
};

export default Scrollbar;
