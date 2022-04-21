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

下拉选择器。

## 基本用法

可通过包裹 `<Select.Item>` 或传入 `options` 参数来实现选择器。

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
      <Select value={value} options={options} onChange={onChange} />
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
