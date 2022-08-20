import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon';
import Button from '../Button';
import Transition from '../Transition';
import ReactDOM from 'react-dom';
import { DrawerProps } from './type';
import { useContainer } from '../hooks/useContainer';
import { useHasParent } from '../hooks/useHasParent';

// 获取触发抽屉打开的 DOM 节点原位置
let clickOpenTarget: EventTarget | null;
const getClickPosition = (e: MouseEvent) => {
  clickOpenTarget = e.target
};
if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
  document.documentElement.addEventListener('click', getClickPosition, true);
}

// 创建抽屉容器
const popupWrapper = useContainer('i-popup-wrapper', document.body)
const drawerWrapper = useContainer('i-drawer-wrapper', popupWrapper)

const Drawer: React.FC<DrawerProps> = (props) => {
  const {
    children = '',
    className,
    style,
    visible = false,
    closeOnEsc = true,
    showMask = true,
    placement = 'right',
    width,
    height,
    header,
    footer,
    onClose = () => { },
    ...restProps
  } = props;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose?.()
    }
  };

  const closeDrawer = () => {
    onClose?.()
    closeOnEsc && document.removeEventListener('keydown', handleKeyDown)
  }

  const handleClick = (e: MouseEvent) => {
    if (!useHasParent(e.target as HTMLElement, drawerRef.current as HTMLElement) && e.target !== clickOpenTarget) {
      closeDrawer()
      document.removeEventListener('click', handleClick, true)
    }
  }

  const drawerRef = useRef<HTMLDivElement>(null);

  // 打开抽屉时禁止背景滚动，对原 overflow 进行备份
  const bodyOverflow = useRef<string>(document.body.style.overflow);

  useEffect(() => {
    if (visible) {
      // 打开抽屉时禁止背景滚动
      document.body.style.overflow = 'hidden';
      // 退出键功能
      closeOnEsc && document.addEventListener('keydown', handleKeyDown)
      // 无遮罩层时点击关闭功能
      !showMask && document.addEventListener('click', handleClick, true)
    } else {
      // 关闭抽屉时恢复背景滚动
      document.body.style.overflow = bodyOverflow.current;
    }
  }, [visible])

  const drawerNode = (
    <>
      {showMask && (
        <Transition
          timeout={200}
          in={visible}
          animation='fade-in'
          key='i-drawer__mask'
        >
          <div className="i-drawer__mask" onClick={closeDrawer}></div>
        </Transition>
      )}

      <Transition
        timeout={200}
        in={visible}
        animation={`slide-in-${placement}`}
        key='i-drawer'
      >
        <div
          ref={drawerRef}
          className={classNames(
            'i-drawer',
            placement !== 'right' && `i-drawer--placement-${placement}`,
            className
          )}
          style={{ ...(style || {}), ...{ width: width, height: height } }}
          {...restProps}
        >
          <div className="i-drawer__close" onClick={closeDrawer}>
            <Icon name="Close" />
          </div>
          <div className="i-drawer__header">{header}</div>
          <div className="i-drawer__body">{children}</div>
          {footer !== false ?
            <div className="i-drawer__footer">
              {footer ? footer : (
                <>
                  <Button variant="outline" onClick={closeDrawer}>取消</Button>
                  <Button>确认</Button>
                </>
              )}
            </div> : <></>
          }
        </div>
      </Transition>
    </>
  )

  return (
    ReactDOM.createPortal(drawerNode, drawerWrapper as HTMLElement)
  )
};

Drawer.displayName = 'Drawer';

export default Drawer;
