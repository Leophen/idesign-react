import React, { useEffect, useRef, useState } from 'react';
import './index.scss';
import Transition from '../Transition';

interface ScrollbarProps {
  /**
   * 滚动容器高度
   */
  height?: number;
}

const Scrollbar: React.FC<ScrollbarProps> = (props) => {
  const {
    children,
    height
  } = props;

  // 滚动条显示隐藏
  const [hoverShowThumb, setHoverShowThumb] = useState(false)
  const [downShowThumb, setDownShowThumb] = useState(false)
  // 视图实际宽高
  const [viewCurrentWidth, setViewCurrentWidth] = useState(0)
  const [viewCurrentHeight, setViewCurrentHeight] = useState(0)
  // 视图总宽高
  const [viewWidth, setViewWidth] = useState(0)
  const [viewHeight, setViewHeight] = useState(0)
  // 滚动条位置
  const [thumbLeft, setThumbLeft] = useState(0)
  const [thumbTop, setThumbTop] = useState(0)
  // 滚动条宽高
  const [thumbWidth, setThumbWidth] = useState(0)
  const [thumbHeight, setThumbHeight] = useState(0)
  // 视图宽高比滚动条宽高
  const [scaleX, setScaleX] = useState(1)
  const [scaleY, setScaleY] = useState(1)
  // 是否为自动滚动状态
  const [autoScroll, setAutoScroll] = useState(true)

  const scrollWrap = useRef<HTMLDivElement>(null)
  useEffect(() => {
    // 设置视图实际宽高
    const currentWidth = scrollWrap.current?.offsetWidth || 0
    const currentHeight = scrollWrap.current?.offsetHeight || 0
    setViewCurrentWidth(currentWidth)
    setViewCurrentHeight(currentHeight)
    // 设置视图总宽高
    const viewWidth = (scrollWrap.current?.scrollWidth || 0) - currentWidth
    const viewHeight = (scrollWrap.current?.scrollHeight || 0) - currentHeight
    setViewWidth(viewWidth)
    setViewHeight(viewHeight)
    // 设置滚动条宽高及视图与滚动条比值
    if (viewWidth > currentWidth) {
      const currentBarWidth = (currentWidth - 4) ** 2 / (scrollWrap.current?.scrollWidth || 1)
      setThumbWidth(currentBarWidth)
      setScaleX((currentWidth - currentBarWidth - 4) / currentBarWidth)
    }
    if (viewHeight > currentHeight) {
      const currentBarHeight = (currentHeight - 4) ** 2 / (scrollWrap.current?.scrollHeight || 1)
      setThumbHeight(currentBarHeight)
      setScaleY((currentHeight - currentBarHeight - 4) / currentBarHeight)
    }
  }, [height])

  // 滚动事件触发
  const handleScroll = (e: any) => {
    if (autoScroll) {
      e.persist();
      // 滚动占比
      const scrollYProportion = e.target.scrollTop / viewHeight
      setThumbTop(scrollYProportion * scaleY * thumbHeight)
    }
  }

  // 滚动条初始位置
  const startX = useRef(0)
  const startY = useRef(0)

  const handleThumbMove = (e: any) => {
    const maxX = viewCurrentWidth - thumbWidth
    startX.current += e.movementX;
    startX.current < 0 && (startX.current = 0)
    startX.current > maxX && (startX.current = maxX)
    setThumbLeft(startX.current)

    const maxY = viewCurrentHeight - thumbHeight - 4
    startY.current += e.movementY;
    startY.current < 0 && (startY.current = 0)
    startY.current > maxY && (startY.current = maxY)
    setThumbTop(startY.current)

    scrollWrap.current?.scrollTo({
      top: (startY.current + thumbHeight) * scaleY
    });
  };
  const handleThumbUp = () => {
    setAutoScroll(true)
    setDownShowThumb(false)
    window.removeEventListener('mouseup', handleThumbUp);
    window.removeEventListener('mousemove', handleThumbMove);
  };
  const handleDownThumb = (e: React.MouseEvent) => {
    setAutoScroll(false)
    setDownShowThumb(true)
    e.persist();
    startX.current = thumbLeft
    startY.current = thumbTop
    window.addEventListener('mouseup', handleThumbUp);
    window.addEventListener('mousemove', handleThumbMove);
  }

  return (
    <div
      className="i-scrollbar"
      onMouseEnter={() => setHoverShowThumb(true)}
      onMouseLeave={() => setHoverShowThumb(false)}
    >
      <div
        ref={scrollWrap}
        className="i-scrollbar__wrap"
        style={{ maxHeight: height }}
        onScroll={handleScroll}
      >
        {children}
      </div>
      <div className="i-scrollbar__bar">
        <Transition
          timeout={200}
          in={hoverShowThumb || downShowThumb}
          animation='fade-in'
          key='i-scrollbar__thumb'
        >
          <div
            className="i-scrollbar__thumb"
            style={{
              height: thumbHeight,
              transform: `translateY(${thumbTop}px)`
            }}
            onMouseDown={handleDownThumb}
          />
        </Transition>
      </div>
    </div>
  )
};

export default Scrollbar;
