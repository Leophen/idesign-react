---
nav:
  title: 组件
  path: /components
group:
  title: 表单组件
  order: 3
order: 5
---

# Select 选择器（开发中）

## 基本用法

```tsx
import React, { useState } from 'react'
import { Select } from 'idesign-react'

const App = () => {
  const [value, setValue] = useState('item1')
  const onChange = (item) => {
    setValue(item.value)
  }
  return (
    <div className="idesign-demo-block-row">
      <Select value={value} onChange={onChange}>
        <Select.Item value="item1">选项一</Select.Item>
        <Select.Item value="item2">选项二</Select.Item>
        <Select.Item value="item3">选项三</Select.Item>
      </Select>
    </div>
  )
}

export default App
```
