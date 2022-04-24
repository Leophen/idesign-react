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
  const [value, setValue] = useState(null)

  const handleChange = (val) => {
    setValue(val)
  }

  return (
    <div className="idesign-demo-block-row">
      <TimePicker value={value} onChange={handleChange} />
    </div>
  )
}

export default App
```
