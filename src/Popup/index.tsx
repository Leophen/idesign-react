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
  placement?: placementType;
  /**
   * 触发浮层出现的方式
   * @default hover
   */
  trigger?: 'hover' | 'click' | 'focus' | 'context-menu';
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
      'left': trigger.left - popupWidth - 32,
      'left-top': trigger.left - popupWidth - 32,
      'left-bottom': trigger.left - popupWidth - 32,
      'right': trigger.left + trigger.width,
      'right-top': trigger.left + trigger.width,
      'right-bottom': trigger.left + trigger.width,
    }
    const yMap = {
      'top': trigger.top - popupHeight - 32,
      'top-left': trigger.top - popupHeight - 32,
      'top-right': trigger.top - popupHeight - 32,
      'bottom': trigger.top + trigger.height,
      'bottom-left': trigger.top + trigger.height,
      'bottom-right': trigger.top + trigger.height,
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

  // 计算气泡方向方法
  const resetPlacement = (placement: placementType, popup: PortalProps) => {
    const winWidth = window.innerWidth
    const winHeight = window.innerHeight
    const direction = placement.split('-')[0]
    const directionWith = placement.split('-')[1] ? '-' + placement.split('-')[1] : ''

    let result: string = placement
    if (direction === 'top' && popup.top < 0) {
      result = 'bottom' + directionWith
    }
    if (direction === 'bottom' && (winHeight - popup.height - popup.top < 0)) {
      result = 'top' + directionWith
    }
    if (direction === 'left' && popup.left < 0) {
      result = 'right' + directionWith
    }
    if (direction === 'right' && (winWidth - popup.width - popup.left < 0)) {
      result = 'left' + directionWith
    }
    setCurrentPlacement(result)
  }

  // 更新气泡方向，返回气泡方向
  const updatePlacement = (placement: placementType) => {
    if (popupRef.current) {
      const rect = popupRef.current.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const top = rect.top - document.documentElement.scrollTop
      const left = rect.left - document.documentElement.scrollLeft
      const popupData = {
        width,
        height,
        top,
        left
      }
      resetPlacement(placement, popupData)
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

  // 保证触发点为包裹层中的组件
  const popupReferenceRef = useRef<any>(null)
  const hasParent = (node: any, parent: HTMLElement) => {
    while (node) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode
    }
    return false;
  };
  const ifHandleInReference = (e: any) => {
    if (hasParent(e.target, popupReferenceRef.current)) {
      return true
    } return false
  }

  // 打开 popup 后的全局点击监听，用于关闭其它气泡提示
  const firstHandleTarget = useRef<any>(null)
  const ifClickCurrentTarget = (e: any) => {
    if (e.target !== firstHandleTarget.current) {
      setVisible(false)
    }
    document.removeEventListener('click', ifClickCurrentTarget)
  }

  const handleClick = (e: React.MouseEvent) => {
    if (trigger === 'click' && ifHandleInReference(e)) {
      e.persist();
      setTargetLocation((e.target as HTMLElement))
      setVisible(!visible)
      // 判断二次点击是否为原 trigger，不是则关闭 popup
      firstHandleTarget.current = e.target
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
    if (trigger === 'context-menu' && ifHandleInReference(e)) {
      e.persist();
      setTargetLocation((e.target as HTMLElement))
      setVisible(!visible)
      // 判断二次点击是否为原 trigger，不是则关闭 popup
      firstHandleTarget.current = e.target
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
    if (trigger === 'focus' && ifHandleInReference(e)) {
      handleVisible(e)
    } return
  }

  const handleUp = (e: React.MouseEvent) => {
    if (trigger === 'focus' && ifHandleInReference(e)) {
      handleHide(e)
    } return
  }

  const handleEnter = (e: React.MouseEvent) => {
    if (trigger === 'hover' && ifHandleInReference(e)) {
      handleVisible(e)
    } return
  }

  const handleLeave = (e: React.MouseEvent) => {
    if (trigger === 'hover' && ifHandleInReference(e)) {
      handleHide(e)
    } return
  }

  return (
    <div
      ref={popupReferenceRef}
      className='i-popup__reference'
      onClick={handleClick}
      onMouseDown={handleDown}
      onMouseUp={handleUp}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onContextMenu={handleContextMenu}
      {...others}
    >
      {children}
      <Transition
        timeout={200}
        in={visible}
        animation='fade-in'
        key='i-popup'
      >
        <Portal
          style={{ ...style }}
          className={className}
          visible={visible}
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
