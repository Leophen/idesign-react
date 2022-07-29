---
nav:
  title: 组件
  path: /components
group:
  title: 表单组件
  order: 3
order: 7
---

# TimePicker 时间选择器

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
    <>
      <h4>无默认值</h4>
      <TimePicker />
      <h4>有默认值（非受控）</h4>
      <TimePicker defaultValue={value} />
      <h4>有固定值（受控）</h4>
      <TimePicker value={value} />
      <h4>一般用法</h4>
      <TimePicker
        value={value}
        onChange={handleChange}
      />
    </>
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
      <TimePicker format="hh:mm:ss A" value={value} onChange={handleChange} />
      <h4>12小时制 - 时分选择器</h4>
      <TimePicker format="hh:mm" value={value} onChange={handleChange} />
      <h4>分秒选择器</h4>
      <TimePicker format="mm:ss" value={value} onChange={handleChange} />
    </>
  )
}

export default App
```

## 自定义步长

可通过 `steps` 属性指定时间面板选择步长，默认为 `[1, 1, 1]`。

```tsx
import React from 'react'
import { TimePicker } from 'idesign-react'

const App = () => {
  return (
    <>
      <h4>默认步长</h4>
      <TimePicker steps={[1, 1, 1]} />
      <h4>分秒步长设为 5</h4>
      <TimePicker steps={[1, 5, 5]} />
    </>
  )
}

export default App
```

<API />
