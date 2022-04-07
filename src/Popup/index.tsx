import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import ReactDOM from 'react-dom';
import Transition from '../Transition';

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
   * 气泡类名
   */
  className?: string;
  /**
   * 气泡样式
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
  placement?:
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'left-top'
  | 'left-bottom'
  | 'right-top'
  | 'right-bottom';
  /**
   * 触发气泡出现的方式
   * @default hover
   */
  trigger?: 'hover' | 'click' | 'context-menu';
  /**
   * 手动显示气泡
   * @default false
   */
  visible?: boolean;
  /**
   * 触发气泡操作时触发
   */
  onTrigger?: (visible: boolean) => void;
}

export interface PortalProps {
  className?: string
  style?: React.CSSProperties
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
    className,
    style,
    visible = false,
    content = '',
    placement = 'top',
    ...tProps
  } = props

  const getLocationStyle = (placement: placementType, trigger: PortalProps, popup: PortalProps) => {
    let popupWidth = style?.width ? Number(style?.width) : popup.width
    let popupHeight = style?.height ? Number(style?.height) : popup.height
    const xMap = {
      'top': trigger.left + ((trigger.width - popupWidth) / 2),
      'top-left': trigger.left,
      'top-right': trigger.left + (trigger.width - popupWidth),
      'bottom': trigger.left + ((trigger.width - popupWidth) / 2),
      'bottom-left': trigger.left,
      'bottom-right': trigger.left + (trigger.width - popupWidth),
      'left': trigger.left - popupWidth - 16,
      'left-top': trigger.left - popupWidth - 16,
      'left-bottom': trigger.left - popupWidth - 16,
      'right': trigger.left + trigger.width + 16,
      'right-top': trigger.left + trigger.width + 16,
      'right-bottom': trigger.left + trigger.width + 16,
    }
    const yMap = {
      'top': trigger.top - popupHeight - 16,
      'top-left': trigger.top - popupHeight - 16,
      'top-right': trigger.top - popupHeight - 16,
      'bottom': trigger.top + trigger.height + 16,
      'bottom-left': trigger.top + trigger.height + 16,
      'bottom-right': trigger.top + trigger.height + 16,
      'left': trigger.top + ((trigger.height - popupHeight) / 2),
      'left-top': trigger.top,
      'left-bottom': trigger.top + (trigger.height - popupHeight),
      'right': trigger.top + ((trigger.height - popupHeight) / 2),
      'right-top': trigger.top,
      'right-bottom': trigger.top + (trigger.height - popupHeight),
    }
    const result = {
      left: xMap[placement],
      top: yMap[placement],
      ...style
    }
    return result
  }

  const popupRef: any = useRef(null)

  // 更新气泡方向
  const updatePlacement = (currentPlacement: placementType) => {
    if (popupRef.current) {
      // 原触发方向
      const direction = currentPlacement.split('-')[0]
      const directionWith = currentPlacement.split('-')[1] ? '-' + currentPlacement.split('-')[1] : ''
      // 窗口
      const winWidth = window.innerWidth
      const winHeight = window.innerHeight
      // 气泡
      const rect = popupRef.current.getBoundingClientRect()
      const popupWidth = rect.width
      const popupHeight = rect.height
      const popupTop = rect.top
      const popupLeft = rect.left

      let result: string = currentPlacement
      if (popupTop - popupHeight < winHeight && popupLeft - popupWidth < winWidth) {
        if (direction === 'top' && popupTop < 0) {
          result = 'bottom' + directionWith
        }
        if (direction === 'bottom' && (winHeight - popupHeight - popupTop < 0)) {
          result = 'top' + directionWith
        }
        if (direction === 'left' && popupLeft < 0) {
          result = 'right' + directionWith
        }
        if (direction === 'right' && (winWidth - popupWidth - popupLeft < 0)) {
          result = 'left' + directionWith
        }
      }

      setCurrentPlacement(result)
    }
  }

  const [styles, setStyles] = useState({})
  const [currentPlacement, setCurrentPlacement] = useState<any>(placement)

  useEffect(() => {
    updatePlacement(currentPlacement)
  })

  useEffect(() => {
    const rect = popupRef.current.getBoundingClientRect()
    setStyles(getLocationStyle(currentPlacement, { ...tProps }, rect))
  }, [visible, currentPlacement])

  const PopupNode = (
    <div
      ref={popupRef}
      className={classNames(
        'i-popup',
        className
      )}
      data-popper-placement={currentPlacement}
      style={{ ...styles, width: style?.width, height: style?.height }}
    >
      <div className="i-popup__arrow" data-popper-placement={currentPlacement} />
      {typeof content === 'object' ? content : <div className="i-popup__text">{content}</div>}
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
    visible = false,
    onTrigger = () => { }
  } = props;

  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const setTargetLocation = (target: HTMLElement) => {
    const rect = target.getBoundingClientRect()
    setTop(rect.top + window.scrollY)
    setLeft(rect.left + window.scrollX)
    setWidth(rect.width)
    setHeight(rect.height)
  }

  const [innerVisible, setInnerVisible] = useState(false)

  // 触发节点是否在指定包裹层中
  const hasParent = (node: any, parent: HTMLElement) => {
    while (node) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode
    }
    return false;
  };

  // 打开气泡通用方法
  const openPopup = (e?: React.MouseEvent) => {
    if (e) {
      e.persist();
      setTargetLocation((e.target as HTMLElement))
    }
    setInnerVisible(true)
    onTrigger?.(true)
  }

  // 关闭气泡通用方法
  const closePopup = () => {
    setInnerVisible(false)
    onTrigger?.(false)
  }

  // 判断点击节点是否在气泡内
  const ifClickInPopup = (e: any) => {
    const popupNode = document.querySelector('.i-popup')
    if (!hasParent(e.target, popupNode as HTMLElement)) {
      closePopup()
      window.removeEventListener('click', ifClickInPopup)
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    if (trigger === 'click' && !innerVisible) {
      openPopup(e)
      setTimeout(() => {
        window.addEventListener('click', ifClickInPopup)
      })
    } return
  }

  // 判断点击和右击节点是否在气泡内
  const ifHandleInPopup = (e: any) => {
    e.preventDefault();
    const popupNode = document.querySelector('.i-popup')
    if (!hasParent(e.target, popupNode as HTMLElement)) {
      closePopup()
      window.removeEventListener('click', ifHandleInPopup)
      window.removeEventListener('contextmenu', ifHandleInPopup)
    }
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    if (trigger === 'context-menu' && !innerVisible) {
      e.preventDefault();
      openPopup(e)
      setTimeout(() => {
        window.addEventListener('click', ifHandleInPopup)
        window.addEventListener('contextmenu', ifHandleInPopup)
      })
    } return
  }

  // 判断悬浮节点是否在气泡内
  const ifHoverInPopup = (e: any) => {
    e.preventDefault();
    const popupNode = document.querySelector('.i-popup')
    if (!hasParent(e.target, popupNode as HTMLElement)) {
      closePopup()
      window.removeEventListener('mouseover', ifHoverInPopup)
    }
  }

  const handleEnter = (e: React.MouseEvent) => {
    if (trigger === 'hover' && !innerVisible) {
      openPopup(e)
      setTimeout(() => {
        window.addEventListener('mouseover', ifHoverInPopup)
      })
    } return
  }

  return (
    <div className='i-popup__reference'>
      <div
        onClick={handleClick}
        onMouseEnter={handleEnter}
        onContextMenu={handleContextMenu}
      >
        {children}
      </div>

      <Transition
        timeout={200}
        in={innerVisible}
        animation='fade-in'
        key='i-popup'
      >
        <Portal
          style={{ ...style }}
          className={className}
          visible={innerVisible}
          content={content}
          placement={placement}
          top={top}
          left={left}
          width={width}
          height={height}
        />
      </Transition>
    </div>
  );
};

Popup.displayName = 'Popup';

export default Popup;
