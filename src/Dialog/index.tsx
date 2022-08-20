import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon';
import Button from '../Button';
import Transition from '../Transition';
import ReactDOM from 'react-dom';
import { DialogProps } from './type';
import { useContainer } from '../hooks/useContainer';
import { useHasParent } from '../hooks/useHasParent';

// 获取触发对话框打开的 DOM 节点原位置
let clickOpenTarget: EventTarget | null;
let mousePosition: { x: number; y: number } | null;
const getClickPosition = (e: MouseEvent) => {
  clickOpenTarget = e.target
  mousePosition = {
    x: e.clientX,
    y: e.clientY,
  };
  setTimeout(() => {
    mousePosition = null;
  }, 100);
};
if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
  document.documentElement.addEventListener('click', getClickPosition, true);
}

// 创建对话框容器
const popupWrapper = useContainer('i-popup-wrapper', document.body)
const dialogWrapper = useContainer('i-dialog-wrapper', popupWrapper)

const Dialog: React.FC<DialogProps> = (props) => {
  const {
    children = '',
    className,
    style,
    visible = false,
    closeOnEsc = true,
    showMask = true,
    width,
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

  const closeDialog = () => {
    onClose?.()
    closeOnEsc && document.removeEventListener('keydown', handleKeyDown)
  }

  const handleClick = (e: MouseEvent) => {
    if (!useHasParent(e.target as HTMLElement, dialogRef.current as HTMLElement) && e.target !== clickOpenTarget) {
      closeDialog()
      document.removeEventListener('click', handleClick, true)
    }
  }

  const dialogRef = useRef<HTMLDivElement>(null);

  // 打开对话框时禁止背景滚动，对原 overflow 进行备份
  const bodyOverflow = useRef<string>(document.body.style.overflow);

  useEffect(() => {
    if (visible) {
      // 打开对话框时禁止背景滚动
      document.body.style.overflow = 'hidden';
      // 退出键功能
      closeOnEsc && document.addEventListener('keydown', handleKeyDown)
      // 展开动画出发点
      if (mousePosition && dialogRef.current) {
        dialogRef.current.style.transformOrigin = `${mousePosition.x - dialogRef.current.offsetLeft}px ${mousePosition.y - dialogRef.current.offsetTop
          }px`;
      }
      // 无遮罩层时点击关闭功能
      !showMask && document.addEventListener('click', handleClick, true)
    } else {
      // 关闭对话框时恢复背景滚动
      document.body.style.overflow = bodyOverflow.current;
    }
  }, [visible])

  const DialogNode = (
    <>
      {showMask && <Transition
        timeout={200}
        in={visible}
        animation='fade-in'
        key='i-dialog__mask'
      >
        <div className="i-dialog__mask" onClick={closeDialog} onScroll={() => { return }}></div>
      </Transition>}

      <Transition
        timeout={200}
        in={visible}
        animation='fade-in'
        key='i-dialog'
      >
        <div
          ref={dialogRef}
          className={classNames(
            'i-dialog',
            className
          )}
          style={{ ...(style || {}), ...{ width: width } }}
          {...restProps}
        >
          <div className="i-dialog__close" onClick={closeDialog}>
            <Icon name="Close" />
          </div>
          <div className="i-dialog__header">{header}</div>
          <div className="i-dialog__body">{children}</div>
          <div className="i-dialog__footer">
            {footer ? footer : (
              <>
                <Button variant="outline" onClick={closeDialog}>取消</Button>
                <Button>确认</Button>
              </>
            )}
          </div>
        </div>
      </Transition>
    </>
  )

  return (
    ReactDOM.createPortal(DialogNode, dialogWrapper as HTMLElement)
  )
};

Dialog.displayName = 'Dialog';

export default Dialog;
