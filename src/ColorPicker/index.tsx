import React, { useState, useRef, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import './index.scss';
import tinycolor from 'tinycolor2'
import Select from '../Select';
import Input from '../Input';
import Icon from '../Icon';
import Popup from '../Popup';

export interface colorListType {
  value: string
}

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
   * 触发颜色块类名
   */
  triggerClassName?: string;
  /**
   * 触发颜色块样式
   */
  triggerStyle?: React.CSSProperties;
  /**
   * 触发颜色块尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 颜色值
   */
  value?: string;
  /**
   * 默认可选值
   */
  colorList?: colorListType[]
  /**
   * 修改颜色值时触发
   */
  onChange?: (val: string) => void
  /**
   * 切换颜色面板时触发
   */
  onTrigger?: (val: string, visible: boolean) => void
}

export interface ColorPanelProps extends ColorPickerProps {
  /**
   * 点击关闭按钮时触发
   */
  onClose?: () => void
}

export interface ColorCursorProps {
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

export interface ColorItemProps {
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
]

const ColorCursor: React.FC<ColorCursorProps> = (props) => {
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

  const [parent, setParent] = useState({
    width: 0,
    height: 0
  })

  useEffect(() => {
    parent.width = cursor.current.parentNode.clientWidth
    parent.height = cursor.current.parentNode.clientHeight
    setParent({ ...parent })
  }, [])

  useEffect(() => {
    if (mode === 'x') {
      translate.x = x * (parent.width - 12)
    } else if (mode === 'y') {
      translate.y = y * (parent.height - 12)
    } else {
      translate.x = (x * parent.width) - 6
      translate.y = (y * parent.height) - 6
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

const ColorItem: React.FC<ColorItemProps> = (props) => {
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

const ColorPanel: React.FC<ColorPanelProps> = (props) => {
  const {
    value = '#265CF0',
    colorList = defaultColor,
    onChange,
    onClose
  } = props;

  // 颜色值
  const [colors, setColors] = useState({
    rgbVal: tinycolor(value).toRgbString(),
    hexVal: tinycolor(value).toHexString(),
    r: tinycolor(value).toRgb().r,
    g: tinycolor(value).toRgb().g,
    b: tinycolor(value).toRgb().b,
    h: tinycolor(value).toHsv().h,
    s: tinycolor(value).toHsv().s,
    v: tinycolor(value).toHsv().v,
    a: tinycolor(value).getAlpha()
  })

  // 是否为移动状态
  const handleMoving = (ifMoving: boolean) => {
    if (ifMoving) {
      document.body.style.userSelect = 'none'
    } else {
      document.body.style.userSelect = ''
    }
  }

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
    // 初始化给各节点宽高及位置参数赋值（popup 打开后再执行）
    setTimeout(() => {
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
    })
    // 设置初始滑块位置
    const currentColor = tinycolor(colors.rgbVal)
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

  const emitColor = (tinyObj: any) => {
    if (colorType === 'hex') {
      onChange?.(tinyObj.toHex8String())
    } else {
      onChange?.(tinyObj.toRgbString())
    }
  }

  // 通用更新滑块位置函数
  const updateCursorLocation = (tinyObj: any) => {
    location.panel.x = tinyObj.toHsv().s
    location.panel.y = 1 - tinyObj.toHsv().v
    location.rgb.x = tinyObj.toHsv().h / 360
    location.a.x = tinyObj.getAlpha()
    setLocation({ ...location })
  }

  // 传入一种颜色值 -> 更新全部颜色值
  const updateColor = (color: string, alpha: number) => {
    const tinyObj = tinycolor(color)
    tinyObj.setAlpha(alpha)

    colors.rgbVal = tinyObj.toRgbString()
    colors.hexVal = tinyObj.toHexString()
    colors.r = tinyObj.toRgb().r
    colors.g = tinyObj.toRgb().g
    colors.b = tinyObj.toRgb().b
    colors.s = tinyObj.toHsv().s
    colors.v = tinyObj.toHsv().v
    colors.a = alpha

    setColors({ ...colors })
    emitColor(tinyObj)
  }

  // 传入调色板坐标 -> 更新颜色
  const updatePanelColor = (x: number, y: number) => {
    const hsv = `hsv(${colors.h.toFixed(0)}, ${(x * 100).toFixed(0)}%, ${((1 - y) * 100).toFixed(0)}%)`
    updateColor(hsv, colors.a)
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
    colors.h = currentHue
    setColors({ ...colors })
    // 更新全部颜色
    const hsv = `hsv(${currentHue}, ${colors.s}, ${colors.v})`
    updateColor(hsv, colors.a)
    // 更新滑块位置
    location.rgb.x = x
    setLocation({ ...location })
  }

  // 传入透明度柱坐标 -> 更新颜色
  const updateAColor = (x: number) => {
    let currentX = Number(x.toFixed(2))
    updateColor(colors.rgbVal, currentX)
    // 更新滑块位置
    location.a.x = x
    setLocation({ ...location })
  }

  // 移动调色板
  const handlePanelMove = (e: any) => {
    let moveX = e.clientX - rect.panel.left
    let moveY = e.clientY - rect.panel.top
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
    handleMoving(false)
    window.removeEventListener('mousemove', handlePanelMove);
    window.removeEventListener('mouseup', handlePanelUp);
  };

  // 移动色阶柱
  const handleRgbMove = (e: any) => {
    let moveX = e.clientX - rect.rgb.left
    const maxX = rect.rgb.width
    const minX = 0
    moveX < (minX) && (moveX = (minX))
    moveX > (maxX) && (moveX = (maxX))
    updateRgbColor(moveX / maxX)
  }
  const handleRgbUp = () => {
    handleMoving(false)
    window.removeEventListener('mousemove', handleRgbMove);
    window.removeEventListener('mouseup', handleRgbUp);
  };

  // 移动透明度柱
  const handleAMove = (e: any) => {
    let moveX = e.clientX - rect.a.left
    const maxX = rect.a.width
    const minX = 0
    moveX < (minX) && (moveX = (minX))
    moveX > (maxX) && (moveX = (maxX))
    updateAColor(moveX / maxX)
  }
  const handleAUp = () => {
    handleMoving(false)
    window.removeEventListener('mousemove', handleAMove);
    window.removeEventListener('mouseup', handleAUp);
  };

  const handleUsualDown = (e: React.MouseEvent, type: 'panel' | 'rgb' | 'a') => {
    e.persist();
    let downX = 0
    let downY = 0
    handleMoving(true)
    if (type === 'panel') {
      // 点击调色板 -> 更新颜色
      downX = e.clientX - rect.panel.left
      downY = e.clientY - rect.panel.top
      updatePanelColor(downX / rect.panel.width, downY / rect.panel.height)
      // 移动调色板 -> 更新颜色
      window.addEventListener('mousemove', handlePanelMove);
      window.addEventListener('mouseup', handlePanelUp);
    } else if (type === 'rgb') {
      // 点击色阶柱 -> 更新颜色
      downX = e.clientX - rect.rgb.left
      updateRgbColor(downX / rect.rgb.width)
      // 移动色阶柱 -> 更新颜色
      window.addEventListener('mousemove', handleRgbMove);
      window.addEventListener('mouseup', handleRgbUp);
    } else {
      // 点击透明度柱 -> 更新颜色
      downX = e.clientX - rect.a.left
      updateAColor(downX / rect.a.width)
      // 移动透明度柱 -> 更新颜色
      window.addEventListener('mousemove', handleAMove);
      window.addEventListener('mouseup', handleAUp);
    }
  }

  // 通过更新颜色函数
  const handleUsualUpdate = (val: string) => {
    const currentColor = tinycolor(val)
    updateColor(val, currentColor.getAlpha())
    // 单独更新色阶
    colors.h = currentColor.toHsv().h
    setColors({ ...colors })
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
    let color = ''
    if (type === 'r') {
      colors.r = currentVal
      color = `rgba(${val}, ${colors.g}, ${colors.b}, ${colors.a})`
    } else if (type === 'g') {
      colors.g = currentVal
      color = `rgba(${colors.r}, ${val}, ${colors.b}, ${colors.a})`
    } else {
      colors.b = currentVal
      color = `rgba(${colors.r}, ${colors.g}, ${val}, ${colors.a})`
    }
    setColors({ ...colors })
    handleUsualUpdate(color)
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
    colors.a = currentVal
    setColors({ ...colors })
    updateAColor(currentVal)
  }

  const hexBackup = useRef('')
  const inputFocusHex = (val: string) => {
    hexBackup.current = val
  }
  const inputChangeHex = (val: string) => {
    colors.hexVal = val
    setColors({ ...colors })
  }
  const inputBlurHex = (val: string) => {
    const currentColor = tinycolor(val)
    currentColor.setAlpha(colors.a)
    if (currentColor.isValid()) {
      updateColor(val, colors.a)
      // 单独更新色阶
      colors.h = currentColor.toHsv().h
      setColors({ ...colors })
      // 更新滑块位置
      updateCursorLocation(currentColor)
    } else {
      colors.hexVal = hexBackup.current
      setColors({ ...colors })
    }
  }

  // 取色
  const handleClickDropper = async () => {
    // @ts-ignore
    const eyeDropper = new EyeDropper();
    const result = await eyeDropper.open();
    const color = result.sRGBHex

    handleUsualUpdate(color)
  }

  return (
    <div className="i-color-panel">
      <header className="i-color-panel-header">
        <div className="i-color-panel-header-txt">
          颜色选择器
        </div>
        <div
          className="i-color-panel-header-icon"
          onClick={() => {
            onClose?.()
          }}
        >
          <Icon name="Close" />
        </div>
      </header>

      <section
        className="i-color-panel-block"
        style={{ background: `hsl(${colors.h}, 100%, 50%)` }}
      >
        <div className="i-color-panel-block__white" />
        <div
          className="i-color-panel-block__black"
          ref={panelNode}
          onMouseDown={(e) => handleUsualDown(e, 'panel')}
        />
        <ColorCursor
          x={location.panel.x}
          y={location.panel.y}
          color={colors.rgbVal}
        />
      </section>

      <section className="i-color-panel-controls">
        {/* @ts-ignore */}
        {!!window.EyeDropper &&
          <div
            className="i-color-panel-controls__dropper"
            onClick={handleClickDropper}
          >
            <Icon name="Dropper" color="#333" />
          </div>
        }
        <div className="i-color-panel-controls__bar">
          <div
            className="i-color-panel-bar__rgb"
            ref={rgbBarNode}
            onMouseDown={(e) => handleUsualDown(e, 'rgb')}
          >
            <ColorCursor
              x={location.rgb.x}
              mode="x"
            />
          </div>
          <div
            className="i-color-panel-bar__a"
            ref={aBarNode}
            onMouseDown={(e) => handleUsualDown(e, 'a')}
          >
            <ColorCursor
              mode="x"
              x={location.a.x}
              style={{ background: 'rgba(0, 0, 0, 0.4)' }}
            />
            <section
              className="i-color-panel-bar__a-color"
              style={{ background: `linear-gradient(90deg, rgba(255, 0, 0, 0) 0%, hsl(${colors.h}, 100%, 50%) 100%)` }}
            />
            <section className="i-color-panel-bar__a-bg"></section>
          </div>
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
                value={colors.hexVal}
                size="small"
                onFocus={inputFocusHex}
                onChange={inputChangeHex}
                onBlur={inputBlurHex}
              /> : <>
                <Input
                  value={colors.r.toFixed(0)}
                  type="number"
                  size="small"
                  maxNumber={255}
                  minNumber={0}
                  selectAll
                  hideNumberBtn
                  onChange={inputChangeR}
                />
                <Input
                  value={colors.g.toFixed(0)}
                  type="number"
                  size="small"
                  maxNumber={255}
                  minNumber={0}
                  selectAll
                  hideNumberBtn
                  onChange={inputChangeG}
                />
                <Input
                  value={colors.b.toFixed(0)}
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
              value={(colors.a * 100).toFixed(0)}
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
        {colorList.map(item =>
          <ColorItem color={item?.value} key={item?.value} onClick={() => handleUsualUpdate(item?.value)} />
        )}
      </footer>
    </div>
  );
};

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const {
    className,
    style,
    triggerClassName,
    triggerStyle,
    size,
    value = '#265CF0',
    colorList = defaultColor,
    onChange,
    onTrigger,
    ...others
  } = props

  const [innerValue, setInnerValue] = useState(value)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setInnerValue(value)
  }, [value])

  const currentColor = useRef(innerValue)
  const handleChange = (val: string) => {
    setInnerValue(val)
    currentColor.current = val
    onChange?.(val)
  }

  const popupChange = (val: boolean) => {
    if (val) {
      document.documentElement.style.overflowY = 'hidden';
    } else {
      document.documentElement.style.overflowY = '';
    }
    setVisible(val)
    onTrigger?.(currentColor.current, val)
  }

  const handleClose = () => {
    setVisible(false)
    onTrigger?.(currentColor.current, false)
  }

  const colorPanel = useMemo(() =>
    <ColorPanel
      value={innerValue}
      colorList={colorList}
      onChange={handleChange}
      onClose={handleClose}
    />, [visible]
  )

  return (
    <div
      className={classNames(
        'i-color-picker',
        className
      )}
      style={{ ...style }}
      {...others}
    >
      <Popup
        visible={visible}
        content={colorPanel}
        trigger="click"
        placement='bottom-left'
        onTrigger={popupChange}
      >
        <div
          className={classNames(
            'i-color',
            size && `i-color--size-${size}`,
            triggerClassName
          )}
          style={{ ...triggerStyle, background: innerValue }}
        ></div>
      </Popup>
    </div>
  )
}

ColorPicker.displayName = 'ColorPicker';

export default ColorPicker;
