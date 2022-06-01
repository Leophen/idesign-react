---
nav:
  title: 组件
  path: /components
group:
  title: 表单组件
  order: 3
order: 8
---

# DatePicker 日期选择器（开发中）

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
