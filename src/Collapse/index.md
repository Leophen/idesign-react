---
nav:
  title: 组件
  path: /components
group:
  title: 数据展示组件
  order: 4
order: 8
---

# Collapse 折叠面板

## 基本用法

使用 `Collapse` 包裹菜单的每一项 `Collapse.Item`：

```tsx
import React, { useState } from 'react'
import { Collapse } from 'idesign-react'

const App = () => {
  const [value, setValue] = useState([1])

  const handleChange = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <>
      <h4>无默认值</h4>
      <Collapse>
        <Collapse.Item title="折叠标题1">
          折叠内容 1111111111111111111111
        </Collapse.Item>
        <Collapse.Item title="折叠标题2">
          折叠内容 2222222222222222222222
        </Collapse.Item>
        <Collapse.Item title="折叠标题3">
          折叠内容 3333333333333333333333
        </Collapse.Item>
      </Collapse>
      <h4>有默认值</h4>
      <Collapse defaultActive={value}>
        <Collapse.Item title="折叠标题1">
          折叠内容 1111111111111111111111
        </Collapse.Item>
        <Collapse.Item title="折叠标题2">
          折叠内容 2222222222222222222222
        </Collapse.Item>
        <Collapse.Item title="折叠标题3">
          折叠内容 3333333333333333333333
        </Collapse.Item>
      </Collapse>
      <h4>有固定值</h4>
      <Collapse active={value}>
        <Collapse.Item title="折叠标题1">
          折叠内容 1111111111111111111111
        </Collapse.Item>
        <Collapse.Item title="折叠标题2">
          折叠内容 2222222222222222222222
        </Collapse.Item>
        <Collapse.Item title="折叠标题3">
          折叠内容 3333333333333333333333
        </Collapse.Item>
      </Collapse>
      <h4>通用方法</h4>
      <Collapse active={value} onChange={handleChange}>
        <Collapse.Item title="折叠标题1">
          折叠内容 1111111111111111111111
        </Collapse.Item>
        <Collapse.Item title="折叠标题2">
          折叠内容 2222222222222222222222
        </Collapse.Item>
        <Collapse.Item title="折叠标题3">
          折叠内容 3333333333333333333333
        </Collapse.Item>
      </Collapse>
    </>
  )
}

export default App
```

## 禁用状态

可通过 `disabled` 属性控制全局禁用或单项禁用：

```tsx
import React, { useState } from 'react'
import { Collapse } from 'idesign-react'

const App = () => {
  return (
    <>
      <h4>全局禁用</h4>
      <Collapse disabled>
        <Collapse.Item title="折叠标题1">
          折叠内容 1111111111111111111111
        </Collapse.Item>
        <Collapse.Item title="折叠标题2">
          折叠内容 2222222222222222222222
        </Collapse.Item>
        <Collapse.Item title="折叠标题3">
          折叠内容 3333333333333333333333
        </Collapse.Item>
      </Collapse>
      <h4>单项禁用</h4>
      <Collapse>
        <Collapse.Item title="折叠标题1">
          折叠内容 1111111111111111111111
        </Collapse.Item>
        <Collapse.Item title="折叠标题2" disabled>
          折叠内容 2222222222222222222222
        </Collapse.Item>
        <Collapse.Item title="折叠标题3">
          折叠内容 3333333333333333333333
        </Collapse.Item>
      </Collapse>
    </>
  )
}

export default App
```

## 手风琴模式

可通过 `accordion` 属性控制为手风琴模式：

```tsx
import React, { useState } from 'react'
import { Collapse } from 'idesign-react'

const App = () => {
  return (
    <Collapse accordion>
      <Collapse.Item title="折叠标题1">
        折叠内容 1111111111111111111111
      </Collapse.Item>
      <Collapse.Item title="折叠标题2">
        折叠内容 2222222222222222222222
      </Collapse.Item>
      <Collapse.Item title="折叠标题3">
        折叠内容 3333333333333333333333
      </Collapse.Item>
    </Collapse>
  )
}

export default App
```

## 默认展开全部

可通过 `expandAll` 属性控制默认展开所有折叠项：

```tsx
import React, { useState } from 'react'
import { Collapse } from 'idesign-react'

const App = () => {
  return (
    <Collapse expandAll>
      <Collapse.Item title="折叠标题1">
        折叠内容 1111111111111111111111
      </Collapse.Item>
      <Collapse.Item title="折叠标题2">
        折叠内容 2222222222222222222222
      </Collapse.Item>
      <Collapse.Item title="折叠标题3">
        折叠内容 3333333333333333333333
      </Collapse.Item>
    </Collapse>
  )
}

export default App
```

## 自定义图标位置

可通过 `iconPlacement` 属性控制展开图标位置：

```tsx
import React, { useState } from 'react'
import { Collapse } from 'idesign-react'

const App = () => {
  return (
    <>
      <h4>全局置左</h4>
      <Collapse iconPlacement='left'>
        <Collapse.Item title="折叠标题1">
          折叠内容 1111111111111111111111
        </Collapse.Item>
        <Collapse.Item title="折叠标题2">
          折叠内容 2222222222222222222222
        </Collapse.Item>
        <Collapse.Item title="折叠标题3">
          折叠内容 3333333333333333333333
        </Collapse.Item>
      </Collapse>
      <h4>全局置右</h4>
      <Collapse iconPlacement='right'>
        <Collapse.Item title="折叠标题1">
          折叠内容 1111111111111111111111
        </Collapse.Item>
        <Collapse.Item title="折叠标题2">
          折叠内容 2222222222222222222222
        </Collapse.Item>
        <Collapse.Item title="折叠标题3">
          折叠内容 3333333333333333333333
        </Collapse.Item>
      </Collapse>
      <h4>单项置右</h4>
      <Collapse>
        <Collapse.Item title="折叠标题1">
          折叠内容 1111111111111111111111
        </Collapse.Item>
        <Collapse.Item title="折叠标题2" iconPlacement='right'>
          折叠内容 2222222222222222222222
        </Collapse.Item>
        <Collapse.Item title="折叠标题3">
          折叠内容 3333333333333333333333
        </Collapse.Item>
      </Collapse>
    </>
  )
}

export default App
```

## Collapse API

<API hideTitle />

## CollapseItem API

| 属性          | 说明           | 类型              | 默认值  |
| ------------- | -------------- | ----------------- | ------- |
| children      | 按钮内容       | `ReactNode`       | `--`    |
| className     | 类名           | `string`          | `--`    |
| style         | 自定义样式     | `CSSProperties`   | `--`    |
| title         | 折叠项标题     | `ReactNode`       | `--`    |
| value         | 折叠项唯一标识 | `string〡number`  | `--`    |
| disabled      | 禁用单折叠项   | `boolean`         | `false` |
| iconPlacement | 自定义图标位置 | `'left'〡'right'` | `left`  |
