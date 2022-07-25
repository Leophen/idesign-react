import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import ReactDOM from 'react-dom';
import { placementType, PortalProps } from './type';

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
    getRef,
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

  useEffect(() => {
    getRef?.(popupRef)
  }, [])

  // 重置方向次数限制
  const rePlaceNum = useRef(0)

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
      if (popupTop < winHeight && popupLeft < winWidth && rePlaceNum.current < 3) {
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
        rePlaceNum.current += 1
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
  }, [visible, currentPlacement, tProps.width, tProps.height, tProps.left, tProps.top])

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

export default Portal;
