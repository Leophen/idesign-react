---
nav:
  title: 组件
  path: /components
group:
  title: 表单组件
  order: 3
order: 17
---

# Rate 评分

## 基本用法

```tsx
import React, { useState } from 'react'
import { Rate } from 'idesign-react'

const App = () => {
  const [value, setValue] = useState(3)

  const handleChange = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <>
      <h4>无默认值</h4>
      <Rate />
      <h4>有默认值</h4>
      <Rate defaultValue={value} />
      <h4>有固定值</h4>
      <Rate value={value} />
      <h4>通用方法</h4>
      <Rate
        value={value}
        onChange={handleChange}
      />
    </>
  )
}

export default App
```

## 只读状态

可通过 `readonly` 属性控制为只读：

```tsx
import React from 'react'
import { Rate } from 'idesign-react'

const App = () => {
  return (
    <Rate value={3} readonly />
  )
}

export default App
```

## 可清除分值

可通过 `allowClear` 属性控制为再次点击分值可清除的模式：

```tsx
import React from 'react'
import { Rate } from 'idesign-react'

const App = () => {
  return (
    <Rate allowClear />
  )
}

export default App
```

## 半星状态

可通过 `allowHalf` 属性控制为半星模式：

```tsx
import React, { useState } from 'react'
import { Rate } from 'idesign-react'

const App = () => {
  const [value, setValue] = useState(2.5)

  const handleChange = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <>
      <Rate allowHalf />
      <br />
      <Rate
        value={value}
        allowHalf
        onChange={handleChange}
      />
    </>
  )
}

export default App
```

## 最大分值

可通过 `count` 属性控制最大分值：

```tsx
import React from 'react'
import { Rate } from 'idesign-react'

const App = () => {
  return (
    <Rate count={10} />
  )
}

export default App
```

## 自定义颜色

可通过 `activeColor` 和 `voidColor` 属性控制选中和未选中颜色：

```tsx
import React from 'react'
import { Rate } from 'idesign-react'

const App = () => {
  return (
    <Rate activeColor="#427FEA" voidColor="#E06B67" />
  )
}

export default App
```

## 自定义图标

可通过 `activeIcon` 和 `voidIcon` 属性控制选中和未选中颜色：

```tsx
import React from 'react'
import { Rate } from 'idesign-react'

const App = () => {
  return (
    <Rate activeIcon="BellFill" voidIcon="Bell" />
  )
}

export default App
```

<API />
