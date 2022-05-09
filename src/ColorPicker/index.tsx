import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import './index.scss';
import tinycolor from 'tinycolor2'
import Select from '../Select';
import Input from '../Input';

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
  {
    value: 'rgb(0, 0, 0)'
  },
  {
    value: 'rgba(255, 255, 255, 0.5)'
  },
  {
    value: 'rgb(255, 0, 0)'
  },
]

const ColorPickerCursor: React.FC<ColorPickerCursorProps> = (props) => {
  const {
    x = 0,
    y = 0,
    mode = 'xy',
    color,
    style
  } = props

  const cursor = useRef<any>(null)

  const [translate, setTranslate] = useState({
    x: 0,
    y: 0
  })

  useEffect(() => {
    // 限制边界值
    const parentWidth = cursor.current.parentNode.clientWidth
    const parentHeight = cursor.current.parentNode.clientHeight

    // 初始位置
    if (mode === 'x') {
      translate.x = x * (parentWidth - 12)
    } else if (mode === 'y') {
      translate.y = y * (parentHeight - 12)
    } else {
      translate.x = (x * parentWidth) - 6
      translate.y = (y * parentHeight) - 6
    }
    setTranslate({ ...translate })
  }, [x, y])

  return (
    <div
      className="i-color-picker__cursor"
      ref={cursor}
      style={{
        ...(style || {}),
        ...{
          transform: `translate(${translate.x}px, ${translate.y}px)`,
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

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const {
    children = '',
    className,
    style,
    value = '#265CF0',
    ...others
  } = props;

  // 颜色值
  const [innerValue, setInnerValue] = useState(value)

  // 颜色值详细参数
  const [hexVal, setHexVal] = useState(tinycolor(value).toHexString())
  const [rgbVal, setRgbVal] = useState({
    r: tinycolor(value).toRgb().r,
    g: tinycolor(value).toRgb().g,
    b: tinycolor(value).toRgb().b
  })
  const [hsvVal, setHsvVal] = useState({
    h: tinycolor(value).toHsv().h,
    s: tinycolor(value).toHsv().s,
    v: tinycolor(value).toHsv().v
  })
  const [aValue, setAValue] = useState(tinycolor(value).getAlpha())

  // 是否为移动状态
  const [handleStatus, setHandleStatus] = useState(false)
  useEffect(() => {
    if (handleStatus) {
      document.body.style.userSelect = 'none'
    } else {
      document.body.style.userSelect = ''
    }
  }, [handleStatus])

  // 调色板、色阶柱、透明度柱 节点宽高位置
  const [rect, setRect] = useState({
    panel: {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    },
    rgb: {
      width: 0,
      left: 0
    },
    a: {
      width: 0,
      left: 0
    },
  })
  const panelNode = useRef<HTMLDivElement>(null)
  const rgbBarNode = useRef<HTMLDivElement>(null)
  const aBarNode = useRef<HTMLDivElement>(null)
  useEffect(() => {
    // 初始化给各节点宽高及位置参数赋值
    const panelRect = panelNode.current?.getBoundingClientRect()
    rect.panel.width = panelRect?.width || 0
    rect.panel.height = panelRect?.height || 0
    rect.panel.left = panelRect?.left || 0
    rect.panel.top = panelRect?.top || 0
    const rgbRect = rgbBarNode.current?.getBoundingClientRect()
    rect.rgb.width = rgbRect?.width || 0
    rect.rgb.left = rgbRect?.left || 0
    const aRect = aBarNode.current?.getBoundingClientRect()
    rect.a.width = aRect?.width || 0
    rect.a.left = aRect?.left || 0
    setRect({ ...rect })
    // 设置初始滑块位置
    const currentColor = tinycolor(innerValue)
    location.panel.x = currentColor.toHsv().s
    location.panel.y = 1 - currentColor.toHsv().v
    location.rgb.x = currentColor.toHsv().h / 360
    location.a.x = currentColor.getAlpha()
    setLocation({ ...location })
  }, [])

  // 调色板、色阶柱、透明度柱 坐标值
  const [location, setLocation] = useState({
    panel: {
      x: 0,
      y: 0
    },
    rgb: {
      x: 0
    },
    a: {
      x: 0
    }
  })

  // 通用更新滑块位置函数
  const updateCursorLocation = (colorObj: any) => {
    location.panel.x = colorObj.toHsv().s
    location.panel.y = 1 - colorObj.toHsv().v
    location.rgb.x = colorObj.toHsv().h / 360
    location.a.x = colorObj.getAlpha()
    setLocation({ ...location })
  }

  // 传入一种颜色值 -> 更新全部颜色值
  const updateColor = (color: string, alpha: number) => {
    const currentColor = tinycolor(color)

    setHexVal(currentColor.toHexString())

    rgbVal.r = currentColor.toRgb().r
    rgbVal.g = currentColor.toRgb().g
    rgbVal.b = currentColor.toRgb().b
    setRgbVal({ ...rgbVal })

    hsvVal.s = currentColor.toHsv().s
    hsvVal.v = currentColor.toHsv().v
    setHsvVal({ ...hsvVal })

    currentColor.setAlpha(alpha)
    setAValue(alpha)

    setInnerValue(currentColor.toRgbString())
  }

  // 传入调色板坐标 -> 更新颜色
  const updatePanelColor = (x: number, y: number) => {
    const hsv = `hsv(${hsvVal.h.toFixed(0)}, ${(x * 100).toFixed(0)}%, ${((1 - y) * 100).toFixed(0)}%)`
    updateColor(hsv, aValue)
    // 更新滑块位置
    location.panel.x = x
    location.panel.y = y
    setLocation({ ...location })
  }

  // 传入色阶柱坐标 -> 更新颜色
  const updateRgbColor = (x: number) => {
    let currentX = x
    currentX === 1 && (currentX = 0)  // 左右极限值去重
    const currentHue = Math.round((currentX) * 360 * 100) / 100
    // 单独更新色阶
    hsvVal.h = currentHue
    setHsvVal({ ...hsvVal })
    // 更新全部颜色
    const hsv = `hsv(${currentHue}, ${hsvVal.s}, ${hsvVal.v})`
    updateColor(hsv, aValue)
    // 更新滑块位置
    location.rgb.x = x
    setLocation({ ...location })
  }

  // 传入透明度柱坐标 -> 更新颜色
  const updateAColor = (x: number) => {
    let currentX = Number(x.toFixed(2))
    updateColor(innerValue, currentX)
    // 更新滑块位置
    location.a.x = x
    setLocation({ ...location })
  }

  // 移动调色板
  const handlePanelMove = (e: any) => {
    let moveX = e.clientX - rect.panel.left + window.scrollX
    let moveY = e.clientY - rect.panel.top + window.scrollY
    const maxX = rect.panel.width
    const maxY = rect.panel.height
    const minX = 0
    const minY = 0
    moveX < (minX) && (moveX = (minX))
    moveX > (maxX) && (moveX = (maxX))
    moveY < (minY) && (moveY = (minY))
    moveY > (maxY) && (moveY = (maxY))
    updatePanelColor(moveX / maxX, moveY / maxY)
  }
  const handlePanelUp = () => {
    setHandleStatus(false)
    window.removeEventListener('mousemove', handlePanelMove);
    window.removeEventListener('mouseup', handlePanelUp);
  };

  // 移动色阶柱
  const handleRgbMove = (e: any) => {
    let moveX = e.clientX - rect.rgb.left + window.scrollX
    const maxX = rect.rgb.width
    const minX = 0
    moveX < (minX) && (moveX = (minX))
    moveX > (maxX) && (moveX = (maxX))
    updateRgbColor(moveX / maxX)
  }
  const handleRgbUp = () => {
    setHandleStatus(false)
    window.removeEventListener('mousemove', handleRgbMove);
    window.removeEventListener('mouseup', handleRgbUp);
  };

  // 移动透明度柱
  const handleAMove = (e: any) => {
    let moveX = e.clientX - rect.a.left + window.scrollX
    const maxX = rect.a.width
    const minX = 0
    moveX < (minX) && (moveX = (minX))
    moveX > (maxX) && (moveX = (maxX))
    updateAColor(moveX / maxX)
  }
  const handleAUp = () => {
    setHandleStatus(false)
    window.removeEventListener('mousemove', handleAMove);
    window.removeEventListener('mouseup', handleAUp);
  };

  const handleUsualDown = (e: React.MouseEvent, type: 'panel' | 'rgb' | 'a') => {
    e.persist();
    let downX = 0
    let downY = 0
    setHandleStatus(true)
    if (type === 'panel') {
      // 点击调色板 -> 更新颜色
      downX = e.clientX - rect.panel.left + window.scrollX
      downY = e.clientY - rect.panel.top + window.scrollY
      updatePanelColor(downX / rect.panel.width, downY / rect.panel.height)
      // 移动调色板 -> 更新颜色
      window.addEventListener('mousemove', handlePanelMove);
      window.addEventListener('mouseup', handlePanelUp);
    } else if (type === 'rgb') {
      // 点击色阶柱 -> 更新颜色
      downX = e.clientX - rect.rgb.left + window.scrollX
      updateRgbColor(downX / rect.rgb.width)
      // 移动色阶柱 -> 更新颜色
      window.addEventListener('mousemove', handleRgbMove);
      window.addEventListener('mouseup', handleRgbUp);
    } else {
      // 点击透明度柱 -> 更新颜色
      downX = e.clientX - rect.a.left + window.scrollX
      updateAColor(downX / rect.a.width)
      // 移动透明度柱 -> 更新颜色
      window.addEventListener('mousemove', handleAMove);
      window.addEventListener('mouseup', handleAUp);
    }
  }

  // 点击颜色块 -> 更新颜色
  const clickColorItem = (val: string) => {
    const currentColor = tinycolor(val)
    updateColor(val, currentColor.getAlpha())
    // 单独更新色阶
    hsvVal.h = currentColor.toHsv().h
    setHsvVal({ ...hsvVal })
    // 更新滑块位置
    updateCursorLocation(currentColor)
  }

  // 选择颜色值类型
  const [colorType, setColorType] = useState('hex')
  const handleSelect = (val: any) => {
    setColorType(val)
  }

  // RGBA 输入框变化时触发
  const inputChange = (val: string, type: 'r' | 'g' | 'b') => {
    let currentVal = Number(val)
    let currentColor = ''
    if (type === 'r') {
      rgbVal.r = currentVal
      currentColor = `rgba(${val}, ${rgbVal.g}, ${rgbVal.b}, ${aValue})`
    } else if (type === 'g') {
      rgbVal.g = currentVal
      currentColor = `rgba(${rgbVal.r}, ${val}, ${rgbVal.b}, ${aValue})`
    } else {
      rgbVal.b = currentVal
      currentColor = `rgba(${rgbVal.r}, ${rgbVal.g}, ${val}, ${aValue})`
    }
    setRgbVal({ ...rgbVal })

    const newColor = tinycolor(currentColor)
    updateColor(currentColor, newColor.getAlpha())
    // 单独更新色阶
    hsvVal.h = newColor.toHsv().h
    setHsvVal({ ...hsvVal })
    // 更新滑块位置
    updateCursorLocation(newColor)
  }
  const inputChangeR = (val: string) => {
    inputChange(val, 'r')
  }
  const inputChangeG = (val: string) => {
    inputChange(val, 'g')
  }
  const inputChangeB = (val: string) => {
    inputChange(val, 'b')
  }
  const inputChangeA = (val: string) => {
    let currentVal = Number(val) / 100
    setAValue(currentVal)
    updateAColor(currentVal)
  }

  const hexBackup = useRef('')
  const inputFocusHex = (val: string) => {
    hexBackup.current = val
  }
  const inputChangeHex = (val: string) => {
    setHexVal(val)
  }
  const inputBlurHex = (val: string) => {
    const currentColor = tinycolor(val)
    currentColor.setAlpha(aValue)
    if (currentColor.isValid()) {
      updateColor(val, aValue)
      // 单独更新色阶
      hsvVal.h = currentColor.toHsv().h
      setHsvVal({ ...hsvVal })
      // 更新滑块位置
      updateCursorLocation(currentColor)
    } else {
      setHexVal(hexBackup.current)
    }
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
          style={{ background: `hsl(${hsvVal.h}, 100%, 50%)` }}
        >
          <div className="i-color-panel-block__white" />
          <div
            className="i-color-panel-block__black"
            ref={panelNode}
            onMouseDown={(e) => handleUsualDown(e, 'panel')}
          />
          <ColorPickerCursor
            x={location.panel.x}
            y={location.panel.y}
            color={innerValue}
          />
        </section>

        <section className="i-color-panel-controls">
          <div
            className="i-color-panel-bar__rgb"
            ref={rgbBarNode}
            onMouseDown={(e) => handleUsualDown(e, 'rgb')}
          >
            <ColorPickerCursor
              x={location.rgb.x}
              mode="x"
            />
          </div>
          <div
            className="i-color-panel-bar__a"
            ref={aBarNode}
            onMouseDown={(e) => handleUsualDown(e, 'a')}
          >
            <ColorPickerCursor
              mode="x"
              x={location.a.x}
              style={{ background: 'rgba(0, 0, 0, 0.4)' }}
            />
            <section
              className="i-color-panel-bar__a-color"
              style={{ background: `linear-gradient(90deg, rgba(255, 0, 0, 0) 0%, hsl(${hsvVal.h}, 100%, 50%) 100%)` }}
            />
            <section className="i-color-panel-bar__a-bg"></section>
          </div>
        </section>

        <section className="i-color-panel-values">
          <Select
            width={60}
            value={colorType}
            size="small"
            clearable={false}
            onChange={handleSelect}
          >
            <Select.Item value="hex">Hex</Select.Item>
            <Select.Item value="rgb">RGB</Select.Item>
          </Select>
          <div className="i-color-panel-input__wrapper">
            <div className="i-color-panel-input__class">
              {colorType === 'hex' ?
                <Input
                  value={hexVal}
                  size="small"
                  onFocus={inputFocusHex}
                  onChange={inputChangeHex}
                  onBlur={inputBlurHex}
                /> : <>
                  <Input
                    value={rgbVal.r.toFixed(0)}
                    type="number"
                    size="small"
                    maxNumber={255}
                    minNumber={0}
                    selectAll
                    hideNumberBtn
                    onChange={inputChangeR}
                  />
                  <Input
                    value={rgbVal.g.toFixed(0)}
                    type="number"
                    size="small"
                    maxNumber={255}
                    minNumber={0}
                    selectAll
                    hideNumberBtn
                    onChange={inputChangeG}
                  />
                  <Input
                    value={rgbVal.b.toFixed(0)}
                    type="number"
                    size="small"
                    maxNumber={255}
                    minNumber={0}
                    selectAll
                    hideNumberBtn
                    onChange={inputChangeB}
                  />
                </>
              }
            </div>
            <div className="i-color-panel-input__alpha">
              <Input
                value={(aValue * 100).toFixed(0)}
                type="number"
                size="small"
                maxNumber={100}
                minNumber={0}
                selectAll
                hideNumberBtn
                onChange={inputChangeA}
              />
            </div>
          </div>
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
