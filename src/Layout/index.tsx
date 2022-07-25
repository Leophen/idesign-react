import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import LayoutHeader from './LayoutHeader';
import LayoutAside from './LayoutAside';
import LayoutContent from './LayoutContent';
import LayoutFooter from './LayoutFooter';
import { LayoutProps } from './type';

/**
 * 布局组件
 */
const Layout: React.FC<LayoutProps> & {
  Header: React.ElementType;
  Aside: React.ElementType;
  Content: React.ElementType;
  Footer: React.ElementType;
} = (props) => {
  const { children, className, style, ...restProps } = props;

  const [asides, setAsides] = useState([]);

  useEffect(() => {
    React.Children.forEach(children, (child: any) => {
      if (child.type === LayoutAside) setAsides([child] as any);
    });
  }, [children]);

  const layoutClassNames = classNames(
    'i-layout',
    !!asides.length && 'i-layout-has-aside',
    className,
  );

  return (
    <div className={layoutClassNames} style={style} {...restProps}>
      {children}
    </div>
  );
};

Layout.Header = LayoutHeader;
Layout.Aside = LayoutAside;
Layout.Content = LayoutContent;
Layout.Footer = LayoutFooter;

LayoutHeader.displayName = 'LayoutHeader';
LayoutAside.displayName = 'LayoutAside';
LayoutContent.displayName = 'LayoutContent';
LayoutFooter.displayName = 'LayoutFooter';

Layout.displayName = 'Layout';

export default Layout;
