import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon'
import { CollapseContext } from './index'
import { CollapseItemAddProps, CollapseItemProps } from './type';

const CollapseItem: React.FC<CollapseItemProps> = (props) => {
  // 从 Collapse Context 注入全局属性
  const context = useContext(CollapseContext);
  const newProps: CollapseItemAddProps = context ? context.inject(props) : props;

  const {
    children,
    className,
    style,
    title,
    value,
    disabled = false,
    index,
    innerActive,
    updateInnerActive,
    iconPlacement = 'left',
    ...restProps
  } = newProps;

  const itemValue = value || index;
  const isActive = Array.isArray(innerActive) ? innerActive.includes(itemValue as string | number) : innerActive === itemValue;

  const handleClickHeader = () => {
    if (!disabled) {
      updateInnerActive?.(itemValue as string | number);
    }
  }

  const contentInnerRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)
  useEffect(() => {
    const height = contentInnerRef.current?.getBoundingClientRect().height || 0
    setContentHeight(height + 16) // 加上下 padding

    const resizeObserver = new ResizeObserver(entries => {
      setContentHeight(entries[0].contentRect.height + 16)
    });
    resizeObserver.observe((contentInnerRef.current as any))
    return () => resizeObserver.disconnect()
  }, [])

  return (
    <div
      className={classNames(
        'i-collapse-item',
        disabled && 'i-collapse-item__disabled',
        iconPlacement === 'right' && 'i-collapse-item__icon-right',
        className
      )}
      style={{ ...style }}
      {...restProps}
    >
      <header
        className={classNames(
          'i-collapse-item__header',
          !isActive && 'i-collapse-item__header-fold'
        )}
        onClick={handleClickHeader}
        data-active={isActive ? 1 : 0}
      >
        <Icon
          name="ArrowCaretRight"
          style={{
            transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)'
          }}
        />
        <span className="i-collapse-item__header-txt">
          {title}
        </span>
      </header>

      <section
        className={classNames(
          'i-collapse-item__content',
          isActive && 'i-collapse-item__content-unfold'
        )}
        style={{ height: isActive ? contentHeight : 0 }}
        data-active={isActive ? 1 : 0}
      >
        <div
          className="i-collapse-item__content-inner"
          ref={contentInnerRef}
        >
          {children}
        </div>
      </section>
    </div>
  )
}

export default CollapseItem;
