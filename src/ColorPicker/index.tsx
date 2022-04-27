import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import './index.scss';
import tinycolor from 'tinycolor2'

export interface ColorPickerProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 颜色值
   */
  value?: string;
}

export interface ColorPickerCursorProps {
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 初始横坐标比例
   */
  x?: number;
  /**
   * 初始纵坐标比例
   */
  y?: number;
  /**
   * 拖拽方向
   * @default xy
   */
  mode?: 'x' | 'y' | 'xy';
  /**
   * 滑块颜色
   * @default #265CF0
   */
  color?: string;
  /**
   * 拖拽时触发事件，传入 x 和 y 方向上的拖拽比例
   */
  onDrag?: (x: number, y: number) => void;
  /**
   * 水平拖拽时触发事件，传入 x 方向上的拖拽比例
   */
  onDragX?: (x: number) => void;
  /**
   * 垂直拖拽时触发事件，传入 x 方向上的拖拽比例
   */
  onDragY?: (y: number) => void;
}

export interface ColorBlockProps {
  /**
   * 颜色
   * @default #265CF0
   */
  color?: string;
  /**
   * 点击事件
   */
  onClick?: (val: string) => void;
}

const ColorPickerCursor: React.FC<ColorPickerCursorProps> = (props) => {
  const {
    x = 0,
    y = 0,
    mode = 'xy',
    color,
    style,
    onDrag,
    onDragX,
    onDragY
  } = props

  const cursor = useRef<HTMLDivElement>(null)

  const [cursorX, setCursorX] = useState(0)
  const [cursorY, setCursorY] = useState(0)
  const [maxX, setMaxX] = useState(0)
  const [maxY, setMaxY] = useState(0)

  // 滑块初始位置及移动距离
  const startX = useRef(0)
  const startY = useRef(0)
  const moveX = useRef(0)
  const moveY = useRef(0)

  useEffect(() => {
    // 限制边界值
    const parentWidth = (cursor.current as any).parentNode.clientWidth
    const parentHeight = (cursor.current as any).parentNode.clientHeight
    maxX !== parentWidth && setMaxX(parentWidth)
    maxY !== parentHeight && setMaxY(parentHeight)
    // 初始位置
    if (mode !== 'y') {
      setCursorX(x * (parentWidth - 12))
      moveX.current = x * (parentWidth - 12)
    }
    if (mode !== 'x') {
      setCursorY(y * (parentHeight - 12))
      moveY.current = y * (parentHeight - 12)
    }
  }, [x, y])

  // 滑块位置监听
  const handleCursorMove = (e: any) => {
    const minX = 0
    const minY = 0

    moveX.current = e.clientX - startX.current
    moveY.current = e.clientY - startY.current

    if (mode === 'x') {
      moveX.current < (minX) && (moveX.current = (minX))
      moveX.current > (maxX - 12) && (moveX.current = (maxX - 12))
      setCursorX(moveX.current) // 滑块位置
      onDragX?.(moveX.current / (maxX - 12)) // 坐标 + 最大值
    } else if (mode === 'y') {
      moveY.current < (minY) && (moveY.current = (minY))
      moveY.current > (maxY - 12) && (moveY.current = (maxY - 12))
      setCursorY(moveY.current) // 滑块位置
      onDragY?.(moveY.current / (maxY - 12)) // 坐标 + 最大值
    } else {
      moveX.current < (minX - 6) && (moveX.current = (minX - 6))
      moveX.current > (maxX - 6) && (moveX.current = (maxX - 6))
      setCursorX(moveX.current) // 滑块位置
      moveY.current < (minY - 6) && (moveY.current = (minY - 6))
      moveY.current > (maxY - 6) && (moveY.current = (maxY - 6))
      setCursorY(moveY.current) // 滑块位置
      onDrag?.((moveX.current + 6) / maxX, (moveY.current + 6) / maxY)
    }
  };

  const handleCursorUp = () => {
    window.removeEventListener('mousemove', handleCursorMove);
    window.removeEventListener('mouseup', handleCursorUp);
  };

  const handleCursorDown = (e: React.MouseEvent) => {
    startX.current = e.clientX - moveX.current;
    startY.current = e.clientY - moveY.current;

    window.addEventListener('mousemove', handleCursorMove);
    window.addEventListener('mouseup', handleCursorUp);
  }

  return (
    <div
      className="i-color-picker__cursor"
      onMouseDown={handleCursorDown}
      ref={cursor}
      style={{
        ...(style || {}),
        ...{
          transform: `translate(${cursorX}px, ${cursorY}px)`,
          background: color
        }
      }}
    />
  )
}

const ColorBlock: React.FC<ColorBlockProps> = (props) => {
  const {
    color = '#265CF0',
    onClick
  } = props

  const handleClick = () => {
    onClick?.(color)
  }

  return (
    <div
      className="i-color-panel-color"
      style={{
        background: color
      }}
      onClick={handleClick}
    />
  )
}

const defaultColor = [
  {
    value: 'rgb(206, 55, 46)'
  },
  {
    value: 'rgb(237, 149, 160)'
  },
  {
    value: 'rgb(252, 238, 239)'
  },
  {
    value: 'rgb(232, 109, 44)'
  },
  {
    value: 'rgb(245, 192, 66)'
  },
  {
    value: 'rgb(238, 209, 103)'
  },
  {
    value: 'rgb(127, 225, 89)'
  },
  {
    value: 'rgb(114, 212, 183)'
  },
  {
    value: 'rgb(135, 214, 230)'
  },
  {
    value: 'rgb(216, 238, 242)'
  },
  {
    value: 'rgb(86, 116, 245)'
  },
  {
    value: 'rgb(103, 98, 192)'
  },
  {
    value: 'rgb(223, 221, 252)'
  },
  {
    value: 'rgb(92, 192, 131)'
  },
  {
    value: 'rgb(210, 90, 182)'
  },
]

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const {
    children = '',
    className,
    style,
    value = '#265CF0',
    ...others
  } = props;

  const [innerValue, setInnerValue] = useState(value)

  const [rValue, setRValue] = useState(tinycolor(value).toRgb().r)
  const [gValue, setGValue] = useState(tinycolor(value).toRgb().g)
  const [bValue, setBValue] = useState(tinycolor(value).toRgb().b)

  const [hValue, setHValue] = useState(tinycolor(value).toHsv().h)
  const [sValue, setSValue] = useState(tinycolor(value).toHsv().s)
  const [vValue, setVValue] = useState(tinycolor(value).toHsv().v)

  const [aValue, setAValue] = useState(tinycolor(value).getAlpha())

  const handleDragPanel = (x: number, y: number) => {
    const currentColor = tinycolor(`hsv(${hValue}, ${x}, ${1 - y})`)
    currentColor.setAlpha(aValue)
    setInnerValue(currentColor.toRgbString())
  }

  const handleDragRgb = (x: number) => {
    let currentX = x
    currentX === 1 && (currentX = 0)
    let currentHue = Math.round((currentX) * 360 * 100) / 100
    const currentColor = tinycolor(`hsv(${currentHue}, ${sValue}, ${vValue})`)
    currentColor.setAlpha(aValue)
    setInnerValue(currentColor.toRgbString())
  }

  const handleDragA = (x: number) => {
    let currentX = Number(x.toFixed(2))
    const currentColor = tinycolor(innerValue)
    currentColor.setAlpha(currentX)
    setInnerValue(currentColor.toRgbString())
  }

  const clickColorItem = (val: string) => {
    const currentColor = tinycolor(val)
    setInnerValue(currentColor.toRgbString())
  }

  const panelBlock = useRef(null)
  const rgbBar = useRef(null)
  const aBar = useRef(null)
  const handleClickPanel = (e: React.MouseEvent, type: 'panel' | 'rgb' | 'a') => {
    e.persist();
    let dom: any
    if (type === 'panel') {
      dom = panelBlock.current
    } else if (type === 'rgb') {
      dom = rgbBar.current
    } else if (type === 'a') {
      dom = aBar.current
    }
    const rect = dom.getBoundingClientRect()
    const pointerX = e.clientX - rect.left
    const pointerY = e.clientY - rect.top
    if (type === 'panel') {
      handleDragPanel(pointerX / rect.width, pointerY / rect.height)
    } else if (type === 'rgb') {
      handleDragRgb(pointerX / rect.width)
    } else {
      handleDragA(pointerX / rect.width)
    }
  }


  useEffect(() => {
    const color = tinycolor(innerValue)
    setRValue(color.toRgb().r)
    setGValue(color.toRgb().g)
    setBValue(color.toRgb().b)

    setHValue(color.toHsv().h)
    setSValue(color.toHsv().s)
    setVValue(color.toHsv().v)

    setAValue(color.getAlpha())
  }, [innerValue])

  return (
    <div
      className={classNames(
        'i-color-picker',
        className
      )}
      style={{ ...style }}
      {...others}
    >
      <div className="i-color" style={{ width: 50, height: 50, background: innerValue }}></div>
      <div className="i-color-panel">

        <header className="i-color-panel-header">
          <div className="i-color-panel-header-txt">
            颜色选择器
          </div>
          <div className="i-color-panel-header-icon">
            X
          </div>
        </header>

        <section
          className="i-color-panel-block"
          style={{ background: `hsl(${hValue}, 100%, 50%)` }}
        >
          <div className="i-color-panel-block__white" />
          <div
            className="i-color-panel-block__black"
            ref={panelBlock}
            onMouseDown={(e) => handleClickPanel(e, 'panel')}
          />
          <ColorPickerCursor
            x={sValue}
            y={1 - vValue}
            color={innerValue}
            onDrag={handleDragPanel}
          />
        </section>

        <section className="i-color-panel-controls">
          <div
            className="i-color-panel-bar__rgb"
            ref={rgbBar}
            onMouseDown={(e) => handleClickPanel(e, 'rgb')}
          >
            <ColorPickerCursor
              x={hValue / 360}
              mode="x"
              onDragX={handleDragRgb}
            />
          </div>
          <div
            className="i-color-panel-bar__a"
            ref={aBar}
            onMouseDown={(e) => handleClickPanel(e, 'a')}
          >
            <ColorPickerCursor
              mode="x"
              x={aValue}
              style={{ background: 'rgba(0, 0, 0, 0.4)' }}
              onDragX={handleDragA}
            />
            <section
              className="i-color-panel-bar__a-color"
              style={{ background: `linear-gradient(90deg, rgba(255, 0, 0, 0) 0%, hsl(${hValue}, 100%, 50%) 100%)` }}
            />
            <section className="i-color-panel-bar__a-bg"></section>
          </div>
        </section>

        <section className="i-color-panel-input-container">
          <input readOnly value={rValue} type="text" className="i-color-panel-input" placeholder="R" />
          <input readOnly value={gValue} type="text" className="i-color-panel-input" placeholder="G" />
          <input readOnly value={bValue} type="text" className="i-color-panel-input" placeholder="B" />
          <input readOnly value={aValue} type="text" className="i-color-panel-input" placeholder="A" />
        </section>

        <footer className="i-color-panel-footer">
          {defaultColor.map(item =>
            <ColorBlock color={item.value} key={item.value} onClick={() => clickColorItem(item.value)} />
          )}
        </footer>
      </div>
    </div>
  );
};

ColorPicker.displayName = 'ColorPicker';

export default ColorPicker;
