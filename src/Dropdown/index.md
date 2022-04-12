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

基于指定节点的折叠下拉菜单。

## 基本用法

通过 `options` 属性指定下拉列表内容，并通过 `onClick` 指定点击下拉内容触发事件。

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

## 单项选中状态

也可在 `options` 属性中设置 `active` 控制单项选中聚焦。

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
      value: 2,
      active: true
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
      <Button>选中操作二</Button>
    </Dropdown>
  )
}

export default App
```

## 全局禁用状态

可通过 `disabled` 属性控制禁用整个下拉菜单。

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
    <Dropdown options={options} disabled={true} onClick={handleSelect}>
      <Button>禁用下拉菜单</Button>
    </Dropdown>
  )
}

export default App
```

## 单项禁用状态

也可在 `options` 属性中设置 `disabled` 控制单项禁用。

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
      value: 2,
      disabled: true
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
      <Button>禁用操作二</Button>
    </Dropdown>
  )
}

export default App
```

## 带分割线的下拉项

可在 `options` 属性中设置 `divider` 控制该项下方展示分割线。

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
      value: 2,
      divider: true
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
      <Button>带分割线的下拉菜单</Button>
    </Dropdown>
  )
}

export default App
```

## 单项点击事件

可在 `options` 属性中设置 `onClick` 控制该项点击触发事件。

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
      value: 2,
      onClick: (item, e) => { console.log(item, e) }
    },
    {
      content: '操作三',
      value: 3
    }
  ]

  return (
    <Dropdown options={options}>
      <Button>点击操作二触发</Button>
    </Dropdown>
  )
}

export default App
```

## 不同触发方式

可通过 `trigger` 属性指定下拉菜单触发方式，默认为 `click`。

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
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Dropdown trigger="click" options={options} onClick={handleSelect}>
          <Button>点击触发</Button>
        </Dropdown>
        <Dropdown trigger="hover" options={options} onClick={handleSelect}>
          <Button>悬浮触发</Button>
        </Dropdown>
        <Dropdown trigger="context-menu" options={options} onClick={handleSelect}>
          <Button>右击触发</Button>
        </Dropdown>
      </div>
    </div>
  )
}

export default App
```

## 级联下拉菜单

可通过 `children` 属性指定级联菜单，可通过 'direction' 控制展开方向。

```tsx
import React from 'react'
import { Dropdown, Button } from 'idesign-react'

const App = () => {
  const options = [
    {
      content: '操作 1',
      value: 1
    },
    {
      content: '操作 2',
      value: 2,
      children: [
        {
          content: '操作 2-1',
          value: 2.1
        },
        {
          content: '操作 2-2',
          value: 2.2,
          children: [
            {
              content: '操作 2-2-1',
              value: 2.21
            },
            {
              content: '操作 2-2-2',
              value: 2.22
            },
            {
              content: '操作 2-2-3',
              value: 2.23
            }
          ]
        },
        {
          content: '操作 2-3',
          value: 2.3
        }
      ]
    },
    {
      content: '操作 3',
      value: 3
    }
  ]

  const handleSelect = (data) => {
    console.log(data)
  }

  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Dropdown options={options} onClick={handleSelect}>
          <Button>级联菜单</Button>
        </Dropdown>
        <Dropdown direction="left" options={options} onClick={handleSelect}>
          <Button>向左展开的级联菜单</Button>
        </Dropdown>
      </div>
    </div>
  )
}

export default App
```


