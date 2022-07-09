import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './index.scss';

export interface UsualProps {
  /**
   * 组件自定义类名
   */
  className?: string;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 组件自定义样式
   */
  style?: React.CSSProperties;
}

export interface LayoutProps extends UsualProps {}

export interface HeaderProps extends UsualProps {
  /**
   * 顶栏高度。样式表（class）中定义的默认高度为：64px
   * @default ''
   */
  height?: React.CSSProperties["height"];
}

export interface AsideProps extends UsualProps {
  /**
   * 侧边栏宽度。样式表（class）中定义的默认宽度为：232px
   * @default ''
   */
  width?: React.CSSProperties["width"];
}

export interface ContentProps extends UsualProps {}

export interface FooterProps extends UsualProps {
  /**
   * 底栏高度。样式表（class）中定义的默认高度为：24px
   * @default ''
   */
  height?: React.CSSProperties["height"];
}

const Header: React.FC<HeaderProps> = (props) => {
  const { children, className, style, ...restProps } = props;
  return (
    <header className={classNames('i-layout--header', className)} style={style} {...restProps}>
      {children}
    </header>
  );
};

const Aside: React.FC<AsideProps> = (props) => {
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

const Content: React.FC<ContentProps> = (props) => {
  const { children, className, style, ...restProps } = props;
  return (
    <main className={classNames('i-layout--content', className)} style={style} {...restProps}>
      {children}
    </main>
  );
};

const Footer: React.FC<FooterProps> = (props) => {
  const { children, className, style, ...restProps } = props;
  return (
    <footer className={classNames('i-layout--footer', className)} style={style} {...restProps}>
      {children}
    </footer>
  );
};

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
      if (child.type === Aside) setAsides([child] as any);
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

Layout.Header = Header;
Layout.Aside = Aside;
Layout.Content = Content;
Layout.Footer = Footer;

Header.displayName = 'Header';
Aside.displayName = 'Aside';
Content.displayName = 'Content';
Footer.displayName = 'Footer';

Layout.displayName = 'Layout';

export default Layout;
