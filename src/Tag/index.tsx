import React from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon';
import { TagProps } from './type';

const Tag: React.FC<TagProps> = (props) => {
  const {
    children = '',
    className,
    icon,
    maxWidth,
    size,
    style,
    theme,
    type = 'default',
    onAdd,
    onClick = () => { },
    onClose,
    ...restProps
  } = props;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onAdd) {
      onAdd(e);
    }
    onClick(e);
  };

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose?.(e)
  }

  return (
    <div
      className={classNames(
        'i-tag',
        size && `i-tag--size-${size}`,
        type && `i-tag--type-${type}`,
        theme && `i-tag--theme-${theme}`,
        onAdd && 'i-tag--add-btn',
        maxWidth && 'i-tag--ellipsis',
        className,
      )}
      style={{ ...(style || {}), ...{ maxWidth } }}
      onClick={handleClick}
      {...restProps}
    >
      {onAdd && <Icon name="ThePlus" size={size === 'large' ? 16 : 12} />}
      {icon && <Icon name={icon} size={size && { small: 12, medium: 14, large: 16 }[size]} />}
      {children}
      {onClose && (
        <div className="i-tag--close-btn" onClick={handleClose}>
          <Icon name="Close" size={size === 'large' ? 16 : 12} />
        </div>
      )}
    </div>
  );
};

Tag.displayName = 'Tag';

export default Tag;
