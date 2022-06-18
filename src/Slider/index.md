---
nav:
  title: 组件
  path: /components
group:
  title: 表单组件
  order: 3
order: 14
---

# Slider 滑块（开发中）

## 基本用法

```tsx
import React, { useState } from 'react'
import { Slider } from 'idesign-react'

const App = () => {
  const [value, setValue] = useState(30)

  const handleChange = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <div style={{ width: 600 }}>
      <h4>无默认值</h4>
      <Slider />
      <h4>有默认值</h4>
      <Slider defaultValue={value} />
      <h4>有固定值</h4>
      <Slider value={value} />
      <h4>通用方法</h4>
      <Slider
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default App
```

## 禁用状态

通过 `disabled` 属性控制滑块为禁用状态。

```tsx
import React from 'react'
import { Slider } from 'idesign-react'

const App = () => {
  return (
    <div style={{ width: 600 }}>
      <Slider defaultValue={60} disabled />
    </div>
  )
}

export default App
```

## 自定义边界

通过 `max` 和 `min` 属性控制滑块最大值和最小值。

```tsx
import React from 'react'
import { Slider } from 'idesign-react'

const App = () => {
  return (
    <div style={{ width: 600 }}>
      <h4>max 设为 10</h4>
      <Slider defaultValue={5} max={10} />
      <h4>min 设为 30</h4>
      <Slider defaultValue={60} min={30} />
      <h4>同时设置</h4>
      <Slider defaultValue={100} max={200} min={50} />
    </div>
  )
}

export default App
```

## 自定义步长

通过 `step` 属性控制滑块步长。

```tsx
import React from 'react'
import { Slider } from 'idesign-react'

const App = () => {
  return (
    <div style={{ width: 600 }}>
      <h4>step 设为 0.6</h4>
      <Slider defaultValue={60} step={0.6} />
      <h4>step 设为 3</h4>
      <Slider defaultValue={33} step={3} />
      <h4>step 设为 10</h4>
      <Slider defaultValue={50} step={10} />
    </div>
  )
}

export default App
```

## 纵向滑块

通过 `layout` 属性控制滑块方向，默认为 `horizontal`。

```tsx
import React, { useState } from 'react'
import { Slider } from 'idesign-react'

const App = () => {
  const [value, setValue] = useState(30)

  const handleChange = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <div className="idesign-demo-block-row" style={{ height: 200 }}>
      <h4>无默认值 →</h4>
      <Slider layout="vertical" />
      <h4>有默认值 →</h4>
      <Slider layout="vertical" defaultValue={value} />
      <h4>有固定值 →</h4>
      <Slider layout="vertical" value={value} />
      <h4>通用方法 →</h4>
      <Slider
        layout="vertical"
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default App
```

## 范围滑块

通过 `range` 属性指定为范围滑块，注意 `value` 的值需为数组，例如 `[0, 100]`。

```tsx
import React from 'react'
import { Slider } from 'idesign-react'

const App = () => {
  return (
    <div style={{ width: 600 }}>
      <Slider range defaultValue={[30, 100]} />
    </div>
  )
}

export default App
```

## 隐藏数值提示

通过 `hideTip` 属性隐藏数值提示。

```tsx
import React from 'react'
import { Slider } from 'idesign-react'

const App = () => {
  return (
    <div style={{ width: 600 }}>
      <Slider defaultValue={60} hideTip />
    </div>
  )
}

export default App
```

## 数值提示位置

通过 `placement` 属性自定义数值提示位置。

```tsx
import React from 'react'
import { Slider } from 'idesign-react'

const App = () => {
  return (
    <div className="idesign-demo-block-row" style={{ width: 600 }}>
      <Slider defaultValue={20} placement='left' />
      <Slider defaultValue={40} placement='top' />
      <Slider defaultValue={60} placement='right' />
      <Slider defaultValue={80} placement='bottom' />
    </div>
  )
}

export default App
```

<API />
