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
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 抽屉宽度
   */
  width?: number;
  /**
   * 控制抽屉显示隐藏
   * @default false
   */
  visible?: boolean;
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
  onClose?: (visible: boolean) => void;
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
    width,
    visible = false,
    header,
    footer,
    onClose = () => { },
    ...others
  } = props;

  console.log(props)

  const [currentVisible, setCurrentVisible] = useState(visible)

  const closeDrawer = () => {
    setCurrentVisible(false)
    onClose?.(currentVisible)
  }

  const drawer = useRef<any>(null);

  // 打开抽屉时禁止背景滚动，对原 overflow 进行备份
  const bodyOverflow = useRef<string>(document.body.style.overflow);

  useEffect(() => {
    setCurrentVisible(visible)
  }, [visible])

  useEffect(() => {
    if (currentVisible) {
      // 打开抽屉时禁止背景滚动
      document.body.style.overflow = 'hidden';
    } else {
      // 关闭抽屉时恢复背景滚动
      document.body.style.overflow = bodyOverflow.current;
    }
  }, [currentVisible])

  const drawerNode = (
    <>
      <Transition
        timeout={200}
        in={currentVisible}
        animation='fade-in'
        key='i-drawer__mask'
      >
        <div className="i-drawer__mask" onClick={closeDrawer} onScroll={() => { return }}></div>
      </Transition>

      <Transition
        timeout={200}
        in={currentVisible}
        animation='slide-in-right'
        key='i-drawer'
      >
        <div
          ref={drawer}
          className={classNames(
            'i-drawer',
            className
          )}
          style={{ ...(style || {}), ...{ width: width } }}
          {...others}
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
