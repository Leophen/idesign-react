import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import ReactDOM from 'react-dom';

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
}

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

export interface PortalProps {
  visible?: boolean
  placement?: placementType
  top: number
  bottom: number
  left: number
  right: number
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
      'bottom-right': trigger.left,
      'left': trigger.left,
      'left-top': trigger.left,
      'left-bottom': trigger.left,
      'right': trigger.left,
      'right-top': trigger.left,
      'right-bottom': trigger.left,
    }
    const yMap = {
      'top': trigger.top - popup.height - 32,
      'top-left': trigger.top - popup.height - 32,
      'top-right': trigger.top - popup.height - 32,
      'bottom': trigger.top,
      'bottom-left': trigger.top,
      'bottom-right': trigger.top,
      'left': trigger.top,
      'left-top': trigger.top,
      'left-bottom': trigger.top,
      'right': trigger.top,
      'right-top': trigger.top,
      'right-bottom': trigger.top,
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
      popup
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
    placement = 'top',
    ...others
  } = props;

  const [top, setTop] = useState(0)
  const [bottom, setBottom] = useState(0)
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const setTargetLocation = (target: HTMLElement) => {
    const rect = target.getBoundingClientRect()
    setTop(rect.top)
    setBottom(rect.bottom)
    setLeft(rect.left)
    setRight(rect.right)
    setWidth(rect.width)
    setHeight(rect.height)
  }

  const [visible, setVisible] = useState(false)

  const handleSwitch = (e: React.MouseEvent) => {
    e.persist();
    setTargetLocation((e.target as HTMLElement))
    setVisible(!visible)
  }

  // const handleDisplay = () => {
  //   setVisible(true)
  // }

  // const handleHide = () => {
  //   setVisible(false)
  // }

  return (
    <div
      className={classNames(
        'i-popup__reference',
        className
      )}
      style={{ ...style }}
      onClick={handleSwitch}
      {...others}
    >
      {children}
      {visible &&
        <Portal
          visible={visible}
          placement={placement}
          top={top}
          bottom={bottom}
          left={left}
          right={right}
          width={width}
          height={height}
        />}
    </div>
  );
};

Popup.displayName = 'Popup';

export default Popup;
