---
nav:
  title: 组件
  path: /components
group:
  title: 导航组件
  order: 2
order: 0
---

# Dropdown 下拉菜单（开发中）

## 基本用法

```tsx
import React from 'react'
import { Dropdown, Button } from 'idesign-react'

const App = () => {
  const options = [
    {
      content: '操作一',
      value: 1
    },
    {
      content: '操作二',
      value: 2
    },
    {
      content: '操作三',
      value: 3
    }
  ]

  const handleSelect = (data) => {
    console.log(data)
  }

  return (
    <Dropdown options={options} onClick={handleSelect}>
      <Button>更多</Button>
    </Dropdown>
  )
}

export default App
```
