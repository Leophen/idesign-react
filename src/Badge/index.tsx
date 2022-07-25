import React from 'react';
import classNames from 'classnames';
import './index.scss';
import { BadgeProps } from './type';

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
