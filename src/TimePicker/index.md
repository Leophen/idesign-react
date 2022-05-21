---
nav:
  title: 组件
  path: /components
group:
  title: 表单组件
  order: 3
order: 7
---

# TimePicker 时间选择器（开发中）

用于选择指定时间。

## 基本用法

```tsx
import React, { useState } from 'react'
import { TimePicker } from 'idesign-react'

const App = () => {
  const [value, setValue] = useState('12:34:56')

  const handleChange = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <div className="idesign-demo-block-row">
      <TimePicker value={value} onChange={handleChange} />
      <TimePicker value={value} onChange={handleChange} />
    </div>
  )
}

export default App
```

## 禁用状态

可通过 `disabled` 属性控制为禁用状态。

```tsx
import React from 'react'
import { TimePicker } from 'idesign-react'

const App = () => {
  return (
    <TimePicker disabled />
  )
}

export default App
```

## 不同触发方式

可通过 `trigger` 属性指定下拉菜单触发方式，默认为 `click`。

```tsx
import React from 'react'
import { TimePicker } from 'idesign-react'

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <TimePicker trigger="click" />
      <TimePicker trigger="hover" />
      <TimePicker trigger="context-menu" />
    </div>
  )
}

export default App
```

## 不同时间类型

可通过 `format` 属性指定不同的时间类型，默认为 `HH:mm:ss`，[点击查看各类型详情](https://day.js.org/docs/en/display/format)。

```tsx
import React, { useState } from 'react'
import { TimePicker } from 'idesign-react'

const App = () => {
  const [value, setValue] = useState('12:34:56')

  const handleChange = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <>
      <h4>24小时制 - 时分秒选择器</h4>
      <TimePicker format="HH:mm:ss" value={value} onChange={handleChange} />
      <h4>24小时制 - 时分选择器</h4>
      <TimePicker format="HH:mm" value={value} onChange={handleChange} />
      <h4>12小时制 - 时分秒选择器</h4>
      <TimePicker format="hh:mm:ss" value={value} onChange={handleChange} />
      <h4>12小时制 - 时分选择器</h4>
      <TimePicker format="hh:mm" value={value} onChange={handleChange} />
      <h4>分秒选择器</h4>
      <TimePicker format="mm:ss" value={value} onChange={handleChange} />
    </>
  )
}

export default App
```

<API />
