import React, { useMemo } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import './index.scss';

export interface BreadcrumbProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 单项最大宽度，超出后会以省略号形式呈现
   */
  maxItemWidth?: string | number;
  /**
   * 自定义分隔符
   */
  separator?: React.ReactNode;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

export interface BreadcrumbItemProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 是否禁用当前项点击
   */
  disabled?: boolean;
  /**
   * 单项最大宽度，超出后会以省略号形式呈现
   */
  maxItemWidth?: string | number;
  /**
   * 最大宽度，超出后会以省略号形式呈现。优先级高于 maxItemWidth
   */
  maxWidth?: string | number;
  /**
   * 自定义分隔符
   */
  separator?: React.ReactNode;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = (props) => {
  const {
    children = '',
    className,
    disabled,
    maxItemWidth,
    maxWidth,
    separator = <Icon name="ArrowRight" size={16} color="rgba(0,0,0,.3)" />,
    style,
    ...restProps
  } = props;

  // 限制最大宽度
  const computedMaxWidth = useMemo(() => {
    let curMaxWidth;
    if (maxWidth) {
      curMaxWidth = typeof maxWidth === 'number' ? `${maxWidth}px` : String(maxWidth);
    }
    let curMaxItemWidth;
    if (maxItemWidth) {
      curMaxItemWidth =
        typeof maxItemWidth === 'number' ? `${maxItemWidth}px` : String(maxItemWidth);
    }
    return {
      maxWidth: curMaxWidth || curMaxItemWidth || '200px',
    };
  }, [maxItemWidth, maxWidth]);

  return (
    <div
      className={classNames(
        'i-breadcrumb__item',
        disabled && 'i-breadcrumb-is-disabled',
        className,
      )}
      style={{ ...style }}
      {...restProps}
    >
      <span className="i-breadcrumb__inner" style={computedMaxWidth}>
        {children}
      </span>
      <span className="i-breadcrumb__separator">{separator}</span>
    </div>
  );
};

const Breadcrumb: React.FC<BreadcrumbProps> & { Item: React.ElementType } = (props) => {
  const { children = '', className, maxItemWidth, separator, style, ...restProps } = props;

  return (
    <div className={classNames('i-breadcrumb', className)} style={{ ...style }} {...restProps}>
      {/* 将 separator 分隔符及 maxItemWidth 最大单项宽度传入 children */}
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }
        const childProps = {
          separator,
          maxItemWidth,
        };
        return React.cloneElement(child, childProps);
      })}
    </div>
  );
};

Breadcrumb.Item = BreadcrumbItem;

BreadcrumbItem.displayName = 'BreadcrumbItem';
Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
