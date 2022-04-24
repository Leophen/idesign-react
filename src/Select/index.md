---
nav:
  title: 组件
  path: /components
group:
  title: 表单组件
  order: 3
order: 5
---

# Select 选择器

下拉选择器。

## 基本用法

可通过包裹 `<Select.Item>` 或传入 `options` 参数来实现选择器，可将 `clearable` 设为 `false` 关闭一键清空功能。

```tsx
import React, { useState } from 'react'
import { Select } from 'idesign-react'

const App = () => {
  const [value, setValue] = useState('item1')

  const options = [
    {
      content: '选项一',
      value: 'item1'
    },
    {
      content: '选项二',
      value: 'item2'
    },
    {
      content: '选项三',
      value: 'item3'
    }
  ]

  const onChange = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <div className="idesign-demo-block-row">
      <Select value={value} onChange={onChange}>
        <Select.Item value="item1">选项一</Select.Item>
        <Select.Item value="item2">选项二</Select.Item>
        <Select.Item value="item3">选项三</Select.Item>
      </Select>
      <Select
        value={value}
        options={options}
        clearable={false}
        onChange={onChange}
      />
    </div>
  )
}

export default App
```

## 不同尺寸

可通过 `size` 属性来指定不同尺寸的选择器，默认为 `medium`。

```tsx
import React, { useState } from 'react'
import { Select } from 'idesign-react'

const App = () => {
  const [value, setValue] = useState('item1')

  const options = [
    {
      content: '选项一',
      value: 'item1'
    },
    {
      content: '选项二',
      value: 'item2'
    },
    {
      content: '选项三',
      value: 'item3'
    }
  ]

  const onChange = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <div className="idesign-demo-block-row">
      <Select
        value={value}
        options={options}
        size="small"
        onChange={onChange}
      />
      <Select
        value={value}
        options={options}
        size="medium"
        onChange={onChange}
      />
      <Select
        value={value}
        options={options}
        size="large"
        onChange={onChange}
      />
    </div>
  )
}

export default App
```

## 禁用选择器

可通过 `disabled` 属性来禁用选择器。

```tsx
import React, { useState } from 'react'
import { Select } from 'idesign-react'

const App = () => {
  const [value, setValue] = useState('item1')

  const options = [
    {
      content: '选项一',
      value: 'item1'
    },
    {
      content: '选项二',
      value: 'item2'
    },
    {
      content: '选项三',
      value: 'item3'
    }
  ]

  const onChange = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <div className="idesign-demo-block-row">
      <Select
        value={value}
        options={options}
        disabled={true}
        onChange={onChange}
      />
    </div>
  )
}

export default App
```

## 单项禁用

可在 `<Select.Item>` 使用 `disabled` 属性来控制单项禁用，也可在 `<Select>` 的 `options` 属性中设置 `disabled` 控制单项禁用。

```tsx
import React, { useState } from 'react'
import { Select } from 'idesign-react'

const App = () => {
  const [value, setValue] = useState('item1')

  const options = [
    {
      content: '选项一',
      value: 'item1'
    },
    {
      content: '选项二',
      value: 'item2',
      disabled: true
    },
    {
      content: '选项三',
      value: 'item3'
    }
  ]

  const onChange = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <div className="idesign-demo-block-row">
      <Select value={value} onChange={onChange}>
        <Select.Item value="item1">选项一</Select.Item>
        <Select.Item value="item2" disabled>选项二</Select.Item>
        <Select.Item value="item3">选项三</Select.Item>
      </Select>
      <Select
        value={value}
        options={options}
        onChange={onChange}
      />
    </div>
  )
}

export default App
```

## 单项带分割线

可在 `<Select.Item>` 使用 `divider` 属性来控制单项禁用，也可在 `<Select>` 的 `divider` 属性中设置 `disabled` 控制单项禁用。

```tsx
import React, { useState } from 'react'
import { Select } from 'idesign-react'

const App = () => {
  const [value, setValue] = useState('item1')

  const options = [
    {
      content: '选项一',
      value: 'item1'
    },
    {
      content: '选项二',
      value: 'item2',
      divider: true
    },
    {
      content: '选项三',
      value: 'item3'
    }
  ]

  const onChange = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <div className="idesign-demo-block-row">
      <Select value={value} onChange={onChange}>
        <Select.Item value="item1">选项一</Select.Item>
        <Select.Item value="item2" divider>选项二</Select.Item>
        <Select.Item value="item3">选项三</Select.Item>
      </Select>
      <Select
        value={value}
        options={options}
        onChange={onChange}
      />
    </div>
  )
}

export default App
```

## 单项带分组标题

可在 `<Select.Item>` 使用 `title` 属性来控制单项禁用，也可在 `<Select>` 的 `title` 属性中设置 `disabled` 控制单项禁用。

```tsx
import React, { useState } from 'react'
import { Select } from 'idesign-react'

const App = () => {
  const [value, setValue] = useState('item1')

  const options = [
    {
      content: '选项一',
      value: 'item1',
      title: '分组 1'
    },
    {
      content: '选项二',
      value: 'item2',
      divider: true
    },
    {
      content: '选项三',
      value: 'item3',
      title: '分组 2'
    }
  ]

  const onChange = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <div className="idesign-demo-block-row">
      <Select value={value} onChange={onChange}>
        <Select.Item value="item1" title="分组 1">选项一</Select.Item>
        <Select.Item value="item2" divider>选项二</Select.Item>
        <Select.Item value="item3" title="分组 2">选项三</Select.Item>
      </Select>
      <Select
        value={value}
        options={options}
        onChange={onChange}
      />
    </div>
  )
}

export default App
```

## 带前后缀图标

可通过 `<Select>` 的 `prefixIcon` 和 `suffixIcon` 属性设置选择框前后缀图标。

```tsx
import React, { useState } from 'react'
import { Select } from 'idesign-react'

const App = () => {
  const [value, setValue] = useState('item1')

  const options = [
    {
      content: '选项一',
      value: 'item1'
    },
    {
      content: '选项二',
      value: 'item2'
    },
    {
      content: '选项三',
      value: 'item3'
    }
  ]

  const onChange = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <div className="idesign-demo-block-row">
      <Select
        value={value}
        options={options}
        prefixIcon="Search"
        onChange={onChange}
      />
      <Select
        value={value}
        options={options}
        suffixIcon="Search"
        onChange={onChange}
      />
    </div>
  )
}

export default App
```

## 多选选择器

可通过 `multiple` 属性设为多选选择器。

```tsx
import React, { useState } from 'react'
import { Select } from 'idesign-react'

const App = () => {
  const [value, setValue] = useState([])

  const options = [
    {
      content: '选项一',
      value: 'item1'
    },
    {
      content: '选项二',
      value: 'item2'
    },
    {
      content: '选项三',
      value: 'item3'
    }
  ]

  const onChange = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <div className="idesign-demo-block-row">
      <Select
        value={value}
        options={options}
        multiple={true}
        onChange={onChange}
      />
      <Select
        value={value}
        options={options}
        multiple={true}
        onChange={onChange}
      />
    </div>
  )
}

export default App
```

## 级联选择器

可在 `options` 属性中为单项添加 `children` 属性指定级联菜单，另外可通过 `cascaderDirection` 来控制展开方向。

```tsx
import React, { useState } from 'react'
import { Select } from 'idesign-react'

const App = () => {
  const [value, setValue] = useState([])

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

  const onChange = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <div className="idesign-demo-block-row">
      <Select
        placeholder="级联选择器"
        value={value}
        options={options}
        onChange={onChange}
      />
      <Select
        placeholder="级联多选选择器"
        value={value}
        options={options}
        multiple={true}
        onChange={onChange}
      />
      <Select
        placeholder="向左展开的级联选择器"
        value={value}
        options={options}
        cascaderDirection="left"
        onChange={onChange}
      />
      <Select
        placeholder="向左展开的级联多选选择器"
        value={value}
        options={options}
        cascaderDirection="left"
        multiple={true}
        onChange={onChange}
      />
    </div>
  )
}

export default App
```

## Select API

<API hideTitle />

## SelectItem API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 下拉操作项内容 | `ReactNode` | `--` |
| value | 下拉操作项唯一标识 | `string〡number` | `--` |
| disabled | 单项是否禁用 | `boolean` | `false` |
| divider | 是否显示操作项之后的分隔线 | `boolean` | `false` |
| title | 该下拉项上方组标题 | `string` | `--` |
| onClick | 点击时触发 | `(dropdownItem: DropdownOption, event: React.MouseEvent) => void` | `--` |
