import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import './index.scss';

export interface ColorPickerProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
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
    setMaxX(parentWidth)
    setMaxY(parentHeight)
    // 初始位置
    setCursorX(x * parentWidth)
    setCursorY(y * parentWidth)
  }, [])

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
          left: cursorX,
          top: cursorY,
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
    ...others
  } = props;

  const [color, setColor] = useState('#265CF0')
  const [panelColor, setPanelColor] = useState('#265CF0')

  const [rValue, setRValue] = useState(0)
  const [gValue, setGValue] = useState(0)
  const [bValue, setBValue] = useState(0)

  const [hValue, setHValue] = useState(0)
  const [sValue, setSValue] = useState(0)
  const [vValue, setVValue] = useState(0)

  const [opacity, setOpacity] = useState(1)

  const rgbToHsv = (r: number, g: number, b: number) => {
    r = r / 255;
    g = g / 255;
    b = b / 255;
    let h = 0, s = 0, v = 0;
    const min = Math.min(r, g, b);
    const max = v = Math.max(r, g, b);
    const l = (min + max) / 2;
    const difference = max - min;

    if (max == min) {
      h = 0;
    } else {
      switch (max) {
        case r: h = (g - b) / difference + (g < b ? 6 : 0); break;
        case g: h = 2.0 + (b - r) / difference; break;
        case b: h = 4.0 + (r - g) / difference; break;
      }
      h = Math.round(h * 60);
    }
    if (max == 0) {
      s = 0;
    } else {
      s = 1 - min / max;
    }
    s = Math.round(s * 100);
    v = Math.round(v * 100);
    setHValue(h)
    setSValue(s)
    setVValue(v)
    return [h, s, v];
  }

  const hsvToRgba = (h: number, s: number, v: number, a: number) => {
    s = s;
    v = v;
    let r = 0, g = 0, b = 0;
    const i = parseInt(((h / 60) % 6).toString());
    const f = h / 60 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i) {
      case 0:
        r = v; g = t; b = p;
        break;
      case 1:
        r = q; g = v; b = p;
        break;
      case 2:
        r = p; g = v; b = t;
        break;
      case 3:
        r = p; g = q; b = v;
        break;
      case 4:
        r = t; g = p; b = v;
        break;
      case 5:
        r = v; g = p; b = q;
        break;
      default:
        break;
    }
    r = parseInt((r * 255.0).toString())
    g = parseInt((g * 255.0).toString())
    b = parseInt((b * 255.0).toString())
    setRValue(r)
    setGValue(g)
    setBValue(b)
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }

  const handleDragPanel = (x: number, y: number) => {
    console.log(x, y)
    setSValue(x)
    setVValue(1 - y)
    setColor(hsvToRgba(hValue, x, 1 - y, opacity))
  }

  const handleDragRgb = (x: number) => {
    let currentX = x
    currentX === 1 && (currentX = 0)
    let currentHue = Math.round((currentX) * 360 * 100) / 100
    setHValue(currentHue)
    setPanelColor(`hsl(${currentHue}, 100%, 50%)`)
    setColor(hsvToRgba(currentHue, sValue, vValue, opacity))
  }

  const handleDragA = (x: number) => {
    let currentX = Number(x.toFixed(2))
    console.log(currentX)
    setOpacity(currentX)
    setColor(hsvToRgba(hValue, sValue, vValue, currentX))
  }

  const handleSelectColor = (val: string) => {
    const r = Number(val.split('(')[1].split(',')[0])
    const g = Number(val.split('(')[1].split(', ')[1])
    const b = Number(val.split(', ')[2].split(')')[0])

    setRValue(r)
    setGValue(g)
    setBValue(b)

    setColor(`rgba(${r}, ${g}, ${b}, ${opacity})`)
  }

  const panelBlock = useRef(null)
  const handleClickPanel = (e: React.MouseEvent) => {
    e.persist();
    const rect = (panelBlock.current as any).getBoundingClientRect()
    console.log(e.clientX, rect)
  }

  return (
    <div
      className={classNames(
        'i-color-picker',
        className
      )}
      style={{ ...style }}
      {...others}
    >
      <div className="i-color" style={{ width: 50, height: 50, background: color }}></div>
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
          style={{ background: panelColor }}
        >
          <div className="i-color-panel-block__white" />
          <div
            className="i-color-panel-block__black"
            ref={panelBlock}
            onClick={handleClickPanel}
          />
          <ColorPickerCursor
            color={color}
            onDrag={handleDragPanel}
          />
        </section>

        <section className="i-color-panel-controls">
          <div className="i-color-panel-controls__rgb">
            <ColorPickerCursor
              mode="x"
              onDragX={handleDragRgb}
            />
          </div>
          <div className="i-color-panel-controls__a">
            <ColorPickerCursor
              mode="x"
              // x={opacity}
              style={{ background: 'rgba(0,0,0,0.4)' }}
              onDragX={handleDragA}
            />
            <section className="i-color-panel-controls__a-color"></section>
            <section className="i-color-panel-controls__a-bg"></section>
          </div>
        </section>

        <section className="i-color-panel-input-container">
          <input readOnly value={rValue} type="text" className="i-color-panel-input" placeholder="R" />
          <input readOnly value={gValue} type="text" className="i-color-panel-input" placeholder="G" />
          <input readOnly value={bValue} type="text" className="i-color-panel-input" placeholder="B" />
          <input readOnly value={opacity} type="text" className="i-color-panel-input" placeholder="A" />
        </section>

        <footer className="i-color-panel-footer">
          {defaultColor.map(item =>
            <ColorBlock color={item.value} key={item.value} onClick={() => handleSelectColor(item.value)} />
          )}
        </footer>
      </div>
    </div>
  );
};

ColorPicker.displayName = 'ColorPicker';

export default ColorPicker;
