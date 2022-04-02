import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import ReactDOM from 'react-dom';

type placementType =
  'top' |
  'top-left' |
  'top-right' |
  'bottom' |
  'bottom-left' |
  'bottom-right' |
  'left' |
  'left-top' |
  'left-bottom' |
  'right' |
  'right-top' |
  'right-bottom'

export interface PopupProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 气泡提示内容
   */
  content?: React.ReactNode;
  /**
   * 气泡提示位置
   * @default top
   */
  placement?: placementType;
  /**
   * 触发浮层出现的方式
   * @default hover
   */
  trigger?: 'hover' | 'click' | 'focus' | 'context-menu';
}

export interface PortalProps {
  visible?: boolean
  content?: React.ReactNode
  placement?: placementType
  top: number
  left: number
  width: number
  height: number
}

// 创建气泡提示容器
let popupWrapper = document.querySelector('#i-popup-wrapper')
if (!popupWrapper) {
  popupWrapper = document.createElement('div')
  popupWrapper.className = 'i-popup-wrapper'
  popupWrapper.id = 'i-popup-wrapper'
  document.body.append(popupWrapper)
}

const Portal: React.FC<PortalProps> = (props) => {
  const {
    visible = false,
    content = '',
    placement = 'top',
    ...tProps
  } = props

  const [styles, setStyles] = useState({})

  const getLocationStyle = (placement: placementType, trigger: PortalProps, popup: PortalProps) => {
    const xMap = {
      'top': trigger.left + ((trigger.width - popup.width) / 2),
      'top-left': trigger.left,
      'top-right': trigger.left + (trigger.width - popup.width),
      'bottom': trigger.left + ((trigger.width - popup.width) / 2),
      'bottom-left': trigger.left,
      'bottom-right': trigger.left + (trigger.width - popup.width),
      'left': trigger.left - popup.width - 32,
      'left-top': trigger.left - popup.width - 32,
      'left-bottom': trigger.left - popup.width - 32,
      'right': trigger.left + trigger.width,
      'right-top': trigger.left + trigger.width,
      'right-bottom': trigger.left + trigger.width,
    }
    const yMap = {
      'top': trigger.top - popup.height - 32,
      'top-left': trigger.top - popup.height - 32,
      'top-right': trigger.top - popup.height - 32,
      'bottom': trigger.top + trigger.height,
      'bottom-left': trigger.top + trigger.height,
      'bottom-right': trigger.top + trigger.height,
      'left': trigger.top + ((trigger.height - popup.height) / 2),
      'left-top': trigger.top,
      'left-bottom': trigger.top + (trigger.height - popup.height),
      'right': trigger.top + ((trigger.height - popup.height) / 2),
      'right-top': trigger.top,
      'right-bottom': trigger.top + (trigger.height - popup.height),
    }
    const result = {
      left: xMap[placement],
      top: yMap[placement]
    }
    return result
  }

  const popupRef: any = useRef(null)

  useEffect(() => {
    const rect = popupRef.current.getBoundingClientRect()
    setStyles(getLocationStyle(placement, { ...tProps }, rect))
  }, [visible])

  const PopupNode = (
    <div
      ref={popupRef}
      className={classNames(
        'i-popup'
      )}
      data-popper-placement={placement}
      style={styles}
    >
      {content}
    </div>
  )

  return (
    ReactDOM.createPortal(PopupNode, popupWrapper as HTMLElement)
  )
}

const Popup: React.FC<PopupProps> = (props) => {
  const {
    children = '',
    className,
    style,
    content,
    placement = 'top',
    trigger = 'hover',
    ...others
  } = props;

  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const setTargetLocation = (target: HTMLElement) => {
    const rect = target.getBoundingClientRect()
    setTop(rect.top + document.documentElement.scrollTop)
    setLeft(rect.left + document.documentElement.scrollLeft)
    setWidth(rect.width)
    setHeight(rect.height)
  }

  const [visible, setVisible] = useState(false)

  // 打开 popup 后的全局点击监听，用于关闭其它气泡提示
  const currentTarget = useRef<any>(null)
  const ifClickCurrentTarget = (e: any) => {
    if (e.target !== currentTarget.current) {
      setVisible(false)
    }
    document.removeEventListener('click', ifClickCurrentTarget)
  }

  const handleClick = (e: React.MouseEvent) => {
    if (trigger === 'click') {
      e.persist();
      setTargetLocation((e.target as HTMLElement))
      setVisible(!visible)
      // 判断二次点击是否为原 trigger，不是则关闭 popup
      currentTarget.current = e.target
      document.addEventListener('click', ifClickCurrentTarget)
    } return
  }

  const closePopup = (e: any) => {
    e.preventDefault();
    setVisible(false)
    document.removeEventListener('click', closePopup)
    document.removeEventListener('contextmenu', closePopup)
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    if (trigger === 'context-menu') {
      e.persist();
      setTargetLocation((e.target as HTMLElement))
      setVisible(!visible)
      // 判断二次点击是否为原 trigger，不是则关闭 popup
      currentTarget.current = e.target
      document.addEventListener('click', closePopup)
      document.addEventListener('contextmenu', closePopup)
    } return
  }

  const handleVisible = (e: React.MouseEvent) => {
    e.persist();
    setTargetLocation((e.target as HTMLElement))
    setVisible(true)
  }

  const handleHide = (e: React.MouseEvent) => {
    e.persist();
    setTargetLocation((e.target as HTMLElement))
    setVisible(false)
  }

  const handleDown = (e: React.MouseEvent) => {
    if (trigger === 'focus') {
      handleVisible(e)
    } return
  }

  const handleUp = (e: React.MouseEvent) => {
    if (trigger === 'focus') {
      handleHide(e)
    } return
  }

  const handleEnter = (e: React.MouseEvent) => {
    if (trigger === 'hover') {
      handleVisible(e)
    } return
  }

  const handleLeave = (e: React.MouseEvent) => {
    if (trigger === 'hover') {
      handleHide(e)
    } return
  }

  return (
    <div
      className={classNames(
        'i-popup__reference',
        className
      )}
      style={{ ...style }}
      onClick={handleClick}
      onMouseDown={handleDown}
      onMouseUp={handleUp}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onContextMenu={handleContextMenu}
      {...others}
    >
      {children}
      {visible &&
        <Portal
          visible={visible}
          content={content}
          placement={placement}
          top={top}
          left={left}
          width={width}
          height={height}
        />}
    </div>
  );
};

Popup.displayName = 'Popup';

export default Popup;
