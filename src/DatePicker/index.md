---
nav:
  title: 组件
  path: /components
group:
  title: 表单组件
  order: 3
order: 8
---

# DatePicker 日期选择器

用于选择或输入日期。

## 基本用法

```tsx
import React, { useState } from 'react'
import { DatePicker } from 'idesign-react'

const App = () => {
  const [value, setValue] = useState('2022-05-20')

  const handleChange = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <>
      <h4>无默认值</h4>
      <DatePicker />
      <h4>有默认值</h4>
      <DatePicker defaultValue={value} />
      <h4>有固定值</h4>
      <DatePicker value={value} />
      <h4>通用方法</h4>
      <DatePicker
        value={value}
        onChange={handleChange}
      />
    </>
  )
}

export default App
```

## 日期范围选择器

可通过 `type` 属性指定为日期范围选择器。

```tsx
import React, { useState } from 'react'
import { DatePicker } from 'idesign-react'

const App = () => {
  const [value, setValue] = useState(['2022-05-20', '2022-11-11'])

  const handleChange = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <>
      <h4>无默认值</h4>
      <DatePicker type="range" />
      <h4>有默认值</h4>
      <DatePicker type="range" defaultValue={value} />
      <h4>有固定值</h4>
      <DatePicker type="range" value={value} />
      <h4>通用方法</h4>
      <DatePicker
        type="range"
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
import { DatePicker } from 'idesign-react'

const App = () => {
  return (
    <DatePicker disabled />
  )
}

export default App
```

## 不同触发方式

可通过 `trigger` 属性指定下拉菜单触发方式，默认为 `click`。

```tsx
import React from 'react'
import { DatePicker } from 'idesign-react'

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <DatePicker trigger="click" />
      <DatePicker trigger="hover" />
      <DatePicker trigger="context-menu" />
    </div>
  )
}

export default App
```

## 每周的第一天

可通过 `firstDayOfWeek` 属性设置每周的第一天，`0` 为周日，`1` 为周一。

```tsx
import React from 'react'
import { DatePicker } from 'idesign-react'

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <DatePicker firstDayOfWeek={0} />
      <DatePicker firstDayOfWeek={1} />
    </div>
  )
}

export default App
```

## 自定义分隔符

可通过 `rangeSeparator` 属性指定日期范围选择器的连接分隔符。

```tsx
import React from 'react'
import { DatePicker } from 'idesign-react'

const App = () => {
  return (
    <DatePicker type="range" rangeSeparator="/" />
  )
}

export default App
```

<API />
