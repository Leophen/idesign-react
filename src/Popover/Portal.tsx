import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import ReactDOM from 'react-dom';
import { placementType, PortalProps } from './type';
import { useContainer } from '../hooks/useContainer';

// 创建气泡提示容器
const popoverWrapper = useContainer('i-popover-wrapper', document.body);

const Portal: React.FC<PortalProps> = (props) => {
  const {
    className,
    style,
    visible = false,
    content = '',
    placement = 'top',
    getRef,
    ...tProps
  } = props;

  const getLocationStyle = (
    placement: placementType,
    trigger: PortalProps,
    popover: PortalProps,
  ) => {
    let popoverWidth = style?.width ? Number(style?.width) : popover.width;
    let popoverHeight = style?.height ? Number(style?.height) : popover.height;
    const xMap = {
      top: trigger.left + (trigger.width - popoverWidth) / 2,
      'top-left': trigger.left,
      'top-right': trigger.left + (trigger.width - popoverWidth),
      bottom: trigger.left + (trigger.width - popoverWidth) / 2,
      'bottom-left': trigger.left,
      'bottom-right': trigger.left + (trigger.width - popoverWidth),
      left: trigger.left - popoverWidth - 16,
      'left-top': trigger.left - popoverWidth - 16,
      'left-bottom': trigger.left - popoverWidth - 16,
      right: trigger.left + trigger.width + 16,
      'right-top': trigger.left + trigger.width + 16,
      'right-bottom': trigger.left + trigger.width + 16,
    };
    const yMap = {
      top: trigger.top - popoverHeight - 16,
      'top-left': trigger.top - popoverHeight - 16,
      'top-right': trigger.top - popoverHeight - 16,
      bottom: trigger.top + trigger.height + 16,
      'bottom-left': trigger.top + trigger.height + 16,
      'bottom-right': trigger.top + trigger.height + 16,
      left: trigger.top + (trigger.height - popoverHeight) / 2,
      'left-top': trigger.top,
      'left-bottom': trigger.top + (trigger.height - popoverHeight),
      right: trigger.top + (trigger.height - popoverHeight) / 2,
      'right-top': trigger.top,
      'right-bottom': trigger.top + (trigger.height - popoverHeight),
    };
    const result = {
      left: xMap[placement],
      top: yMap[placement],
      ...style,
    };
    return result;
  };

  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getRef?.(popoverRef);
  }, []);

  // 重置方向次数限制
  const rePlaceNum = useRef(0);

  // 更新气泡方向
  const updatePlacement = (currentPlacement: placementType) => {
    if (popoverRef.current) {
      // 原触发方向
      const direction = currentPlacement.split('-')[0];
      const directionWith = currentPlacement.split('-')[1]
        ? '-' + currentPlacement.split('-')[1]
        : '';
      // 窗口
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;
      // 气泡
      const rect = popoverRef.current.getBoundingClientRect();
      const popoverWidth = rect.width;
      const popoverHeight = rect.height;
      const popoverTop = rect.top;
      const popoverLeft = rect.left;

      let result: placementType = currentPlacement;
      if (popoverTop < winHeight && popoverLeft < winWidth && rePlaceNum.current < 3) {
        if (direction === 'top' && popoverTop < 0) {
          result = ('bottom' + directionWith) as placementType;
        }
        if (direction === 'bottom' && winHeight - popoverHeight - popoverTop < 0) {
          result = ('top' + directionWith) as placementType;
        }
        if (direction === 'left' && popoverLeft < 0) {
          result = ('right' + directionWith) as placementType;
        }
        if (direction === 'right' && winWidth - popoverWidth - popoverLeft < 0) {
          result = ('left' + directionWith) as placementType;
        }
        rePlaceNum.current += 1;
      }

      setCurrentPlacement(result);
    }
  };

  const [styles, setStyles] = useState({});
  const [currentPlacement, setCurrentPlacement] = useState<placementType>(placement);

  useEffect(() => {
    updatePlacement(currentPlacement);
  });

  useEffect(() => {
    const rect = (popoverRef.current as HTMLElement).getBoundingClientRect();
    setStyles(getLocationStyle(currentPlacement, { ...tProps }, rect));
  }, [visible, currentPlacement, tProps.width, tProps.height, tProps.left, tProps.top]);

  const PopoverNode = (
    <div
      ref={popoverRef}
      className={classNames('i-popover', className)}
      data-popper-placement={currentPlacement}
      style={{ ...styles, width: style?.width, height: style?.height }}
    >
      <div className="i-popover__arrow" data-popper-placement={currentPlacement} />
      {typeof content === 'object' ? content : <div className="i-popover__text">{content}</div>}
    </div>
  );

  return ReactDOM.createPortal(PopoverNode, popoverWrapper as HTMLElement);
};

export default Portal;
