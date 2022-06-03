import React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface BadgeProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 徽标内容，可为任意内容
   * @default 0
   */
  count?: React.ReactNode;
  /**
   * 封顶的数字值
   * @default 99
   */
  maxCount?: number;
  /**
   * 徽标颜色
   */
  color?: string;
  /**
   * 是否为红点
   * @default false
   */
  dot?: boolean;
  /**
   * 尺寸
   * @default medium
   */
  size?: 'small' | 'medium';
  /**
   * 徽标形状
   * @default circle
   */
  shape?: 'circle' | 'round';
  /**
   * 当数值为 0 时，是否展示徽标
   * @default true
   */
  showZero?: boolean;
  /**
   * 徽标偏移量
   */
  offset?: Array<string | number>;
}

const Badge: React.FC<BadgeProps> = (props) => {
  const {
    children = '',
    className,
    style,
    count = 0,
    maxCount = 99,
    color,
    dot = false,
    size = "medium",
    shape = "circle",
    showZero = true,
    offset,
    ...restProps
  } = props;

  const getDisplayCount = () => {
    if (typeof count === 'number' && count > maxCount) {
      return `${maxCount}+`;
    }
    return count;
  };

  let isHidden = !count;
  if (typeof count === 'number') {
    isHidden = count < 1 && !showZero;
  }

  const getOffset = () => {
    const result: React.CSSProperties = {}
    if (offset) {
      offset[0] && (result.right = +offset[0])
      offset[1] && (result.marginTop = +offset[1])
    }
    return result
  }

  return (
    <div
      className={classNames(
        'i-badge',
        className
      )}
      {...restProps}
    >
      {children}
      {!isHidden && (
        <sup
          className={classNames(
            'i-badge__content',
            dot ? `i-badge--dot` : shape && `i-badge--${shape}`,
            size === 'small' && `i-badge__size-${size}`
          )}
          style={{ ...style, background: color, ...getOffset() }}
        >
          {!dot ? getDisplayCount() : null}
        </sup>
      )}
    </div>
  );
};

Badge.displayName = 'Badge';

export default Badge;
