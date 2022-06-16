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

## 自定义步长

通过 `step` 属性控制滑块步长。

```tsx
import React from 'react'
import { Slider } from 'idesign-react'

const App = () => {
  return (
    <div className="idesign-demo-block-column" style={{ width: 600 }}>
      <Slider step={0.6} />
      <Slider defaultValue={60} step={3} />
      <Slider defaultValue={60} step={10} />
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
      <h4>无默认值</h4>
      <Slider layout="vertical" />
      <h4>有默认值</h4>
      <Slider layout="vertical" defaultValue={value} />
      <h4>有固定值</h4>
      <Slider layout="vertical" value={value} />
      <h4>通用方法</h4>
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
