import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon';
import Button from '../Button';
import Transition from '../Transition';
import ReactDOM from 'react-dom';

export interface DrawerProps {
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
   * 控制抽屉显示隐藏
   * @default false
   */
  visible?: boolean;
  /**
   * 按下退出键是否触发关闭事件
   * @default true
   */
  closeOnEsc?: boolean;
  /**
   * 是否显示遮罩层
   * @default true
   */
  showMask?: boolean;
  /**
   * 抽屉展开位置
   * @default right
   */
  placement?: 'left' | 'right' | 'top' | 'bottom'
  /**
   * 抽屉宽度
   */
  width?: number;
  /**
   * 抽屉高度
   */
  height?: number;
  /**
   * 抽屉头部内容
   */
  header?: React.ReactNode;
  /**
   * 抽屉底部内容
   */
  footer?: React.ReactNode;
  /**
   * 抽屉关闭时触发事件
   */
  onClose?: () => void;
}

// 获取触发抽屉打开的 DOM 节点原位置
let clickOpenTarget: EventTarget | null;
const getClickPosition = (e: MouseEvent) => {
  clickOpenTarget = e.target
};
if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
  document.documentElement.addEventListener('click', getClickPosition, true);
}

// 创建抽屉容器
let drawerWrapper = document.querySelector('#i-drawer-wrapper')
if (!drawerWrapper) {
  drawerWrapper = document.createElement('div')
  drawerWrapper.className = 'i-drawer-wrapper'
  drawerWrapper.id = 'i-drawer-wrapper'
  document.body.append(drawerWrapper)
}

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

  const handleKeyDown = (e: any) => {
    if (e.key === 'Escape') {
      onClose?.()
    }
  };

  const closeDrawer = () => {
    onClose?.()
    closeOnEsc && document.removeEventListener('keydown', handleKeyDown)
  }

  // 判断点击节点是否父元素内
  const hasParent = (node: any, parent: HTMLElement) => {
    while (node) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode
    }
    return false;
  };

  const handleClick = (e: any) => {
    if (!hasParent(e.target, drawer.current) && e.target !== clickOpenTarget) {
      closeDrawer()
      document.removeEventListener('click', handleClick, true)
    }
  }

  const drawer = useRef<any>(null);

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
      {showMask && <Transition
        timeout={200}
        in={visible}
        animation='fade-in'
        key='i-drawer__mask'
      >
        <div className="i-drawer__mask" onClick={closeDrawer}></div>
      </Transition>}

      <Transition
        timeout={200}
        in={visible}
        animation={`slide-in-${placement}`}
        key='i-drawer'
      >
        <div
          ref={drawer}
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
