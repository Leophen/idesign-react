---
nav:
  title: 组件
  path: /components
group:
  title: 导航组件
  order: 2
order: 0
---

# Dropdown 下拉菜单

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

  const handleSelect = (val) => {
    console.log(val)
  }

  return (
    <Dropdown options={options} onClick={handleSelect}>
      <Button>更多</Button>
    </Dropdown>
  )
}

export default App
```

## 限制最大高度

可通过 `maxHeight` 属性指定下拉列表最大高度，注意最外层设最大高度后无法使用级联（待滚动条组件后解决）。

```tsx
import React from 'react'
import { Dropdown, Button } from 'idesign-react'

const App = () => {
  const options = Array(24).fill({
    content: '操作项',
    value: Math.random()
  })

  const handleSelect = (val) => {
    console.log(val)
  }

  return (
    <Dropdown options={options} maxHeight={300} onClick={handleSelect}>
      <Button>限制最大高度</Button>
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

  const handleSelect = (val) => {
    console.log(val)
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

  const handleSelect = (val) => {
    console.log(val)
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

  const handleSelect = (val) => {
    console.log(val)
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

  const handleSelect = (val) => {
    console.log(val)
  }

  return (
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
  )
}

export default App
```

## 可选中模式

可以通过指定 `value` 选中值将下拉菜单切换为可选中的模式。

```tsx
import React, { useState } from 'react'
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

  const [value, setValue] = useState(2)
  const handleSelect = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <div className="idesign-demo-block-row">
      <Dropdown
        value={value}
        options={options}
        onClick={handleSelect}
      >
        <Button>可选中</Button>
      </Dropdown>
      <Dropdown
        value={value}
        options={options}
        onClick={handleSelect}
      >
        <Button>同步对照组</Button>
      </Dropdown>
    </div>
  )
}

export default App
```

## 下拉多选模式

可通过 `multiple` 属性指定下拉菜单为多选模式。

```tsx
import React, { useState } from 'react'
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

  const [value, setValue] = useState([2])
  const handleSelect = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <div className="idesign-demo-block-row">
      <Dropdown
        value={value}
        options={options}
        multiple={true}
        onClick={handleSelect}
      >
        <Button>多选菜单</Button>
      </Dropdown>
      <Dropdown
        value={value}
        options={options}
        multiple={true}
        onClick={handleSelect}
      >
        <Button>同步对照组</Button>
      </Dropdown>
    </div>
  )
}

export default App
```

## 级联下拉菜单

可通过 `children` 属性指定级联菜单，可通过 `cascaderDirection` 控制展开方向。

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

  const handleSelect = (val) => {
    console.log(val)
  }

  return (
    <div className="idesign-demo-block-row">
      <Dropdown options={options} onClick={handleSelect}>
        <Button>级联菜单</Button>
      </Dropdown>
      <Dropdown cascaderDirection="left" options={options} onClick={handleSelect}>
        <Button>向左展开的级联菜单</Button>
      </Dropdown>
    </div>
  )
}

export default App
```

## 限制级联子项最大高度

可通过 `maxHeight` 属性指定级联子项的最大高度，注意只能给最里层设最大高度。

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
      maxHeight: 300,
      children: Array(24).fill({
        content: '操作项',
        value: Math.random()
      })
    },
    {
      content: '操作 3',
      value: 3
    }
  ]

  const handleSelect = (val) => {
    console.log(val)
  }

  return (
    <Dropdown options={options} onClick={handleSelect}>
      <Button>限制级联子项高度</Button>
    </Dropdown>
  )
}

export default App
```

## Dropdown API

<API hideTitle />

## DropdownItem API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 下拉操作项内容 | `ReactNode` | `--` |
| value | 下拉操作项唯一标识 | `string〡number` | `--` |
| width | 宽度 | `number` | `--` |
| maxHeight | 最大高度 | `number` | `--` |
| disabled | 单项是否禁用 | `boolean` | `false` |
| divider | 是否显示操作项之后的分隔线 | `boolean` | `false` |
| onClick | 点击时触发 | `(dropdownItem: DropdownOption, event: React.MouseEvent) => void` | `--` |
