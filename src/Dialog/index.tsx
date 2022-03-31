import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon';
import Button from '../Button';
import Transition from '../Transition';
import ReactDOM from 'react-dom';

export interface DialogProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 对话框宽度
   */
  width?: number;
  /**
   * 控制对话框显示隐藏
   * @default false
   */
  visible?: boolean;
  /**
   * 对话框头部内容
   */
  header?: React.ReactNode;
  /**
   * 对话框底部内容
   */
  footer?: React.ReactNode;
  /**
   * 对话框关闭时触发事件
   */
  onClose?: (visible: boolean) => void;
}

// 获取触发对话框打开的 DOM 节点原位置
let mousePosition: { x: number; y: number } | null;
const getClickPosition = (e: MouseEvent) => {
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
let dialogWrapper = document.querySelector('#i-dialog-wrapper')
if (!dialogWrapper) {
  dialogWrapper = document.createElement('div')
  dialogWrapper.className = 'i-dialog-wrapper'
  dialogWrapper.id = 'i-dialog-wrapper'
  document.body.append(dialogWrapper)
}

const Dialog: React.FC<DialogProps> = (props) => {
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

  const [currentVisible, setCurrentVisible] = useState(visible)

  const closeDialog = () => {
    setCurrentVisible(false)
    onClose?.(currentVisible)
  }

  const dialog = useRef<any>(null);

  // 打开对话框时禁止背景滚动，对原 overflow 进行备份
  const bodyOverflow = useRef<string>(document.body.style.overflow);

  useEffect(() => {
    if (visible) {
      // 打开对话框时禁止背景滚动
      document.body.style.overflow = 'hidden';
    } else {
      // 关闭对话框时恢复背景滚动
      document.body.style.overflow = bodyOverflow.current;
    }
    setCurrentVisible(visible)
  }, [visible])

  useEffect(() => {
    if (currentVisible) {
      // 打开对话框时禁止背景滚动
      document.body.style.overflow = 'hidden';
      if (mousePosition && dialog.current) {
        dialog.current.style.transformOrigin = `${mousePosition.x - dialog.current.offsetLeft}px ${mousePosition.y - dialog.current.offsetTop
          }px`;
      }
    } else {
      // 关闭对话框时恢复背景滚动
      document.body.style.overflow = bodyOverflow.current;
    }
  }, [currentVisible])

  const dialogNode = (
    <>
      <Transition
        timeout={200}
        in={currentVisible}
        animation='fade-in'
        key='i-dialog__mask'
      >
        <div className="i-dialog__mask" onClick={closeDialog} onScroll={() => { return }}></div>
      </Transition>

      <Transition
        timeout={200}
        in={currentVisible}
        animation='fade-in'
        key='i-dialog'
      >
        <div
          ref={dialog}
          className={classNames(
            'i-dialog',
            className
          )}
          style={{ ...(style || {}), ...{ width: width } }}
          {...others}
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
    ReactDOM.createPortal(dialogNode, dialogWrapper as HTMLElement)
  )
};

Dialog.displayName = 'Dialog';

export default Dialog;
