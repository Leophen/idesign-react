import React, { useState, useRef, useEffect } from 'react';
import './index.scss';
import tinycolor, { Instance } from 'tinycolor2';
import Select from '../Select';
import Input from '../Input';
import Icon from '../Icon';
import ColorCursor from './ColorCursor';
import ColorItem from './ColorItem';
import { defaultColor } from './index';
import { ColorPanelProps } from './type';
import classNames from 'classnames';
import useDefault from '../hooks/useDefault';

const ColorPanel: React.FC<ColorPanelProps> = (props) => {
  const {
    className,
    style,
    value,
    defaultValue = '#5e62ea',
    colorList = defaultColor,
    disabled = false,
    onChange,
    onClose,
    ...restProps
  } = props;

  const [innerValue, setInnerValue] = useDefault(value, defaultValue, onChange);

  // é¢è²å?
  const [colors, setColors] = useState({
    rgbVal: tinycolor(innerValue).toRgbString(),
    hexVal: tinycolor(innerValue).toHexString(),
    r: tinycolor(innerValue).toRgb().r,
    g: tinycolor(innerValue).toRgb().g,
    b: tinycolor(innerValue).toRgb().b,
    h: tinycolor(innerValue).toHsv().h,
    s: tinycolor(innerValue).toHsv().s,
    v: tinycolor(innerValue).toHsv().v,
    a: tinycolor(innerValue).getAlpha(),
  });

  // æ¯å¦ä¸ºç§»å¨ç¶æ?
  const handleMoving = (ifMoving: boolean) => {
    if (ifMoving) {
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.userSelect = '';
    }
  };

  // è°è²æ¿ãè²é¶æ±ãéæåº¦æ± èç¹å®½é«ä½ç½®
  const [rect, setRect] = useState({
    panel: {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    },
    rgb: {
      width: 0,
      left: 0,
    },
    a: {
      width: 0,
      left: 0,
    },
  });
  const panelNode = useRef<HTMLDivElement>(null);
  const rgbBarNode = useRef<HTMLDivElement>(null);
  const aBarNode = useRef<HTMLDivElement>(null);

  const updateLocation = () => {
    // åå§åç»åèç¹å®½é«åä½ç½®åæ°èµå¼ï¼popup æå¼ååæ§è¡ï¼?
    setTimeout(() => {
      const panelRect = panelNode.current?.getBoundingClientRect();
      rect.panel.width = panelRect?.width || 0;
      rect.panel.height = panelRect?.height || 0;
      rect.panel.left = panelRect?.left || 0;
      rect.panel.top = panelRect?.top || 0;
      const rgbRect = rgbBarNode.current?.getBoundingClientRect();
      rect.rgb.width = rgbRect?.width || 0;
      rect.rgb.left = rgbRect?.left || 0;
      const aRect = aBarNode.current?.getBoundingClientRect();
      rect.a.width = aRect?.width || 0;
      rect.a.left = aRect?.left || 0;
      setRect({ ...rect });
    }, 100);
  };
  useEffect(() => {
    updateLocation();
    // è®¾ç½®åå§æ»åä½ç½®
    const currentColor = tinycolor(colors.rgbVal);
    location.panel.x = currentColor.toHsv().s;
    location.panel.y = 1 - currentColor.toHsv().v;
    location.rgb.x = currentColor.toHsv().h / 360;
    location.a.x = currentColor.getAlpha();
    setLocation({ ...location });
    document.addEventListener('scroll', updateLocation);
    return () => {
      document.removeEventListener('scroll', updateLocation);
    };
  }, []);

  // è°è²æ¿ãè²é¶æ±ãéæåº¦æ± åæ å?
  const [location, setLocation] = useState({
    panel: {
      x: 0,
      y: 0,
    },
    rgb: {
      x: 0,
    },
    a: {
      x: 0,
    },
  });

  const emitColor = (tinyObj: Instance) => {
    if (colorType === 'hex') {
      setInnerValue(tinyObj.toHex8String());
    } else {
      setInnerValue(tinyObj.toRgbString());
    }
  };

  // éç¨æ´æ°æ»åä½ç½®å½æ°
  const updateCursorLocation = (tinyObj: Instance) => {
    location.panel.x = tinyObj.toHsv().s;
    location.panel.y = 1 - tinyObj.toHsv().v;
    location.rgb.x = tinyObj.toHsv().h / 360;
    location.a.x = tinyObj.getAlpha();
    setLocation({ ...location });
  };

  // ä¼ å¥ä¸ç§é¢è²å?-> æ´æ°å¨é¨é¢è²å?
  const updateColor = (color: string, alpha: number) => {
    const tinyObj = tinycolor(color);
    tinyObj.setAlpha(alpha);

    colors.rgbVal = tinyObj.toRgbString();
    colors.hexVal = tinyObj.toHexString();
    colors.r = tinyObj.toRgb().r;
    colors.g = tinyObj.toRgb().g;
    colors.b = tinyObj.toRgb().b;
    colors.s = tinyObj.toHsv().s;
    colors.v = tinyObj.toHsv().v;
    colors.a = alpha;

    setColors({ ...colors });
    emitColor(tinyObj);
  };

  // ä¼ å¥è°è²æ¿åæ ?-> æ´æ°é¢è²
  const updatePanelColor = (x: number, y: number) => {
    const hsv = `hsv(${colors.h.toFixed(0)}, ${(x * 100).toFixed(0)}%, ${((1 - y) * 100).toFixed(
      0,
    )}%)`;
    updateColor(hsv, colors.a);
    // æ´æ°æ»åä½ç½®
    location.panel.x = x;
    location.panel.y = y;
    setLocation({ ...location });
  };

  // ä¼ å¥è²é¶æ±åæ ?-> æ´æ°é¢è²
  const updateRgbColor = (x: number) => {
    let currentX = x;
    currentX === 1 && (currentX = 0); // å·¦å³æéå¼å»é?
    const currentHue = Math.round(currentX * 360 * 100) / 100;
    // åç¬æ´æ°è²é¶
    colors.h = currentHue;
    setColors({ ...colors });
    // æ´æ°å¨é¨é¢è²
    const hsv = `hsv(${currentHue}, ${colors.s}, ${colors.v})`;
    updateColor(hsv, colors.a);
    // æ´æ°æ»åä½ç½®
    location.rgb.x = x;
    setLocation({ ...location });
  };

  // ä¼ å¥éæåº¦æ±åæ  -> æ´æ°é¢è²
  const updateAColor = (x: number) => {
    let currentX = Number(x.toFixed(2));
    updateColor(colors.rgbVal, currentX);
    // æ´æ°æ»åä½ç½®
    location.a.x = x;
    setLocation({ ...location });
  };

  // ç§»å¨è°è²æ?
  const handlePanelMove = (e: MouseEvent) => {
    let moveX = e.clientX - rect.panel.left;
    let moveY = e.clientY - rect.panel.top;
    const maxX = rect.panel.width;
    const maxY = rect.panel.height;
    const minX = 0;
    const minY = 0;
    moveX < minX && (moveX = minX);
    moveX > maxX && (moveX = maxX);
    moveY < minY && (moveY = minY);
    moveY > maxY && (moveY = maxY);
    updatePanelColor(moveX / maxX, moveY / maxY);
  };
  const handlePanelUp = () => {
    handleMoving(false);
    window.removeEventListener('mousemove', handlePanelMove);
    window.removeEventListener('mouseup', handlePanelUp);
  };

  // ç§»å¨è²é¶æ?
  const handleRgbMove = (e: MouseEvent) => {
    let moveX = e.clientX - rect.rgb.left;
    const maxX = rect.rgb.width;
    const minX = 0;
    moveX < minX && (moveX = minX);
    moveX > maxX && (moveX = maxX);
    updateRgbColor(moveX / maxX);
  };
  const handleRgbUp = () => {
    handleMoving(false);
    window.removeEventListener('mousemove', handleRgbMove);
    window.removeEventListener('mouseup', handleRgbUp);
  };

  // ç§»å¨éæåº¦æ±
  const handleAMove = (e: MouseEvent) => {
    let moveX = e.clientX - rect.a.left;
    const maxX = rect.a.width;
    const minX = 0;
    moveX < minX && (moveX = minX);
    moveX > maxX && (moveX = maxX);
    updateAColor(moveX / maxX);
  };
  const handleAUp = () => {
    handleMoving(false);
    window.removeEventListener('mousemove', handleAMove);
    window.removeEventListener('mouseup', handleAUp);
  };

  const handleUsualDown = (e: React.MouseEvent, type: 'panel' | 'rgb' | 'a') => {
    let downX = 0;
    let downY = 0;
    handleMoving(true);
    if (type === 'panel') {
      // ç¹å»è°è²æ?-> æ´æ°é¢è²
      downX = e.clientX - rect.panel.left;
      downY = e.clientY - rect.panel.top;
      updatePanelColor(downX / rect.panel.width, downY / rect.panel.height);
      // ç§»å¨è°è²æ?-> æ´æ°é¢è²
      window.addEventListener('mousemove', handlePanelMove);
      window.addEventListener('mouseup', handlePanelUp);
    } else if (type === 'rgb') {
      // ç¹å»è²é¶æ?-> æ´æ°é¢è²
      downX = e.clientX - rect.rgb.left;
      updateRgbColor(downX / rect.rgb.width);
      // ç§»å¨è²é¶æ?-> æ´æ°é¢è²
      window.addEventListener('mousemove', handleRgbMove);
      window.addEventListener('mouseup', handleRgbUp);
    } else {
      // ç¹å»éæåº¦æ± -> æ´æ°é¢è²
      downX = e.clientX - rect.a.left;
      updateAColor(downX / rect.a.width);
      // ç§»å¨éæåº¦æ± -> æ´æ°é¢è²
      window.addEventListener('mousemove', handleAMove);
      window.addEventListener('mouseup', handleAUp);
    }
  };

  // éè¿æ´æ°é¢è²å½æ°
  const handleUsualUpdate = (val: string | number) => {
    const text = String(val);
    const currentColor = tinycolor(text);
    updateColor(text, currentColor.getAlpha());
    // åç¬æ´æ°è²é¶
    colors.h = currentColor.toHsv().h;
    setColors({ ...colors });
    // æ´æ°æ»åä½ç½®
    updateCursorLocation(currentColor);
  };

  // éæ©é¢è²å¼ç±»å?
  const [colorType, setColorType] = useState('hex');
  const handleSelect = (val: string | number | (string | number)[]) => {
    if (disabled) return;
    setColorType(val as string);
  };

  // RGBA è¾å¥æ¡ååæ¶è§¦å
  const inputChange = (val: string, type: 'r' | 'g' | 'b') => {
    let currentVal = Number(val);
    let color = '';
    if (type === 'r') {
      colors.r = currentVal;
      color = `rgba(${val}, ${colors.g}, ${colors.b}, ${colors.a})`;
    } else if (type === 'g') {
      colors.g = currentVal;
      color = `rgba(${colors.r}, ${val}, ${colors.b}, ${colors.a})`;
    } else {
      colors.b = currentVal;
      color = `rgba(${colors.r}, ${colors.g}, ${val}, ${colors.a})`;
    }
    setColors({ ...colors });
    handleUsualUpdate(color);
  };
  const inputChangeR = (val: string | number) => {
    inputChange(String(val), 'r');
  };
  const inputChangeG = (val: string | number) => {
    inputChange(String(val), 'g');
  };
  const inputChangeB = (val: string | number) => {
    inputChange(String(val), 'b');
  };
  const inputChangeA = (val: string | number) => {
    let currentVal = Number(val) / 100;
    colors.a = currentVal;
    setColors({ ...colors });
    updateAColor(currentVal);
  };

  const hexBackup = useRef('');
  const inputFocusHex = (val: string | number) => {
    hexBackup.current = String(val);
  };
  const inputChangeHex = (val: string | number) => {
    colors.hexVal = String(val);
    setColors({ ...colors });
  };
  const inputBlurHex = (val: string | number) => {
    const text = String(val);
    const currentColor = tinycolor(text);
    currentColor.setAlpha(colors.a);
    if (currentColor.isValid()) {
      updateColor(text, colors.a);
      // åç¬æ´æ°è²é¶
      colors.h = currentColor.toHsv().h;
      setColors({ ...colors });
      // æ´æ°æ»åä½ç½®
      updateCursorLocation(currentColor);
    } else {
      colors.hexVal = hexBackup.current;
      setColors({ ...colors });
    }
  };

  // åè²
  const handleClickDropper = async () => {
    if (disabled) {
      return;
    }
    // @ts-ignore
    const eyeDropper = new EyeDropper();
    const result = await eyeDropper.open();
    const color = result.sRGBHex;

    handleUsualUpdate(color);
  };

  return (
    <div
      className={classNames('i-color-panel', disabled && 'i-color-panel__disabled', className)}
      style={{ ...style }}
      {...restProps}
    >
      <header className="i-color-panel-header">
        <div className="i-color-panel-header-txt">é¢è²éæ©å?</div>
        <div
          className="i-color-panel-header-icon"
          onClick={() => {
            onClose?.();
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
          onMouseDown={(e) => {
            if (disabled) return;
            handleUsualDown(e, 'panel');
          }}
        />
        <ColorCursor x={location.panel.x} y={location.panel.y} color={colors.rgbVal} />
      </section>

      <section className="i-color-panel-controls">
        {/* @ts-ignore */}
        {!!window.EyeDropper && (
          <div className="i-color-panel-controls__dropper" onClick={handleClickDropper}>
            <Icon name="Dropper" />
          </div>
        )}
        <div className="i-color-panel-controls__bar">
          <div
            className="i-color-panel-bar__rgb"
            ref={rgbBarNode}
            onMouseDown={(e) => {
              if (disabled) return;
              handleUsualDown(e, 'rgb');
            }}
          >
            <ColorCursor x={location.rgb.x} mode="x" />
          </div>
          <div
            className="i-color-panel-bar__a"
            ref={aBarNode}
            onMouseDown={(e) => {
              if (disabled) return;
              handleUsualDown(e, 'a');
            }}
          >
            <ColorCursor mode="x" x={location.a.x} style={{ background: 'rgba(0, 0, 0, 0.4)' }} />
            <section
              className="i-color-panel-bar__a-color"
              style={{
                background: `linear-gradient(90deg, rgba(255, 0, 0, 0) 0%, hsl(${colors.h}, 100%, 50%) 100%)`,
              }}
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
          disabled={disabled}
          clearable={false}
          onChange={handleSelect}
        >
          <Select.Item value="hex">Hex</Select.Item>
          <Select.Item value="rgb">RGB</Select.Item>
        </Select>
        <div className="i-color-panel-input__wrapper">
          <div className="i-color-panel-input__class">
            {colorType === 'hex' ? (
              <Input
                value={colors.hexVal}
                size="small"
                disabled={disabled}
                onFocus={inputFocusHex}
                onChange={inputChangeHex}
                onBlur={inputBlurHex}
              />
            ) : (
              <>
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
            )}
          </div>
          <div className="i-color-panel-input__alpha">
            <Input
              value={(colors.a * 100).toFixed(0)}
              type="number"
              size="small"
              disabled={disabled}
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
        {colorList.map((item) => (
          <ColorItem
            color={item?.value}
            key={item?.value}
            onClick={() => {
              if (disabled) return;
              handleUsualUpdate(item?.value);
            }}
          />
        ))}
      </footer>
    </div>
  );
};

export default ColorPanel;
