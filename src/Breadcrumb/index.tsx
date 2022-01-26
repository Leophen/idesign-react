import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import './index.scss';

export type RouteData = { [key: string]: string | string[] };

export interface Route {
  path?: string;
  name?: string;
  hash?: string;
  query?: RouteData;
  params?: RouteData;
}

export interface BreadcrumbProps {
  /**
   * 按钮内容
   */
  children?: React.ReactNode;
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

export interface BreadcrumbItemProps {
  /**
   * 按钮内容
   */
  children?: React.ReactNode;
  /**
   * 类名
   */
  className?: string;
  /**
   * 是否禁用当前项点击
   */
  disabled?: boolean;
  /**
   * 跳转链接
   * @default ''
   */
  href?: string;
  /**
   * 路由跳转是否采用覆盖的方式（覆盖后将没有浏览器历史记录）
   * @default false
   */
  replace?: boolean;
  /**
   * 路由对象。如果项目存在 Router，则默认使用 Router。
   */
  router?: Record<string, any>;
  /**
   * 自定义分隔符
   */
  separator?: React.ReactNode;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 链接或路由跳转方式
   * @default _self
   */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /**
   * 路由跳转目标，当且仅当 Router 存在时，该 API 有效
   */
  to?: Route;
}

const BreadcrumbItem = (props: BreadcrumbItemProps) => {
  const {
    children = '',
    className,
    disabled,
    href,
    replace,
    router,
    separator = <Icon name="ArrowRight" size={16} color="rgba(0,0,0,.3)" />,
    style,
    target,
    to,
    ...others
  } = props;

  let itemContent = <span className="i-breadcrumb__inner">{children}</span>;
  if ((href || to) && !disabled) {
    const handleRouting = () => {
      if (href || !router) return;
      replace ? router.replace(to) : router.push(to);
    };
    itemContent = (
      <a className="i-breadcrumb__link" href={href} target={target} onClick={handleRouting}>
        {children}
      </a>
    );
  }

  return (
    <div className={classNames('i-breadcrumb__item', className)} style={{ ...style }} {...others}>
      {itemContent}
      <span className="i-breadcrumb__separator">{separator}</span>
    </div>
  );
};

const Breadcrumb = (props: BreadcrumbProps) => {
  const { children = '', className, style, ...others } = props;
  return (
    <div className={classNames('i-breadcrumb', className)} style={{ ...style }} {...others}>
      {children}
    </div>
  );
};

Breadcrumb.BreadcrumbItem = BreadcrumbItem;

BreadcrumbItem.displayName = 'BreadcrumbItem';
Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
