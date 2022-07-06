---
nav:
  title: 组件
  path: /components
group:
  title: 导航组件
  order: 2
order: 2
---

# Tabs 选项卡

## 基本用法

使用 `Tabs` 包裹菜单的每一项 `Tabs.Item`：

```tsx
import React, { useState } from 'react'
import { Tabs } from 'idesign-react'

const App = () => {
  const [value, setValue] = useState(1)

  const handleChange = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <>
      <h4>无默认值</h4>
      <Tabs>
        <Tabs.Item>选项卡1</Tabs.Item>
        <Tabs.Item>选项卡22</Tabs.Item>
        <Tabs.Item>选项卡333</Tabs.Item>
      </Tabs>
      <h4>有默认值</h4>
      <Tabs defaultActive={value}>
        <Tabs.Item>选项卡1</Tabs.Item>
        <Tabs.Item>选项卡22</Tabs.Item>
        <Tabs.Item>选项卡333</Tabs.Item>
      </Tabs>
      <h4>有受控值</h4>
      <Tabs active={value}>
        <Tabs.Item>选项卡1</Tabs.Item>
        <Tabs.Item>选项卡22</Tabs.Item>
        <Tabs.Item>选项卡333</Tabs.Item>
      </Tabs>
      <h4>一般用法</h4>
      <Tabs active={value} onChange={handleChange}>
        <Tabs.Item>选项卡1</Tabs.Item>
        <Tabs.Item>选项卡22</Tabs.Item>
        <Tabs.Item>选项卡333</Tabs.Item>
      </Tabs>
    </>
  )
}

export default App
```

## 卡片风格

通过 `theme` 属性指定卡片风格：

```tsx
import React, { useState } from 'react'
import { Tabs } from 'idesign-react'

const App = () => {
  return (
    <Tabs defaultActive="2" theme="card">
      <Tabs.Item value="1">选项卡1</Tabs.Item>
      <Tabs.Item value="2">选项卡22</Tabs.Item>
      <Tabs.Item value="3">选项卡333</Tabs.Item>
    </Tabs>
  )
}

export default App
```

## 禁用状态

通过 `disabled` 属性指定选项卡禁用：

```tsx
import React, { useState } from 'react'
import { Tabs } from 'idesign-react'

const App = () => {
  return (
    <>
      <h4>全局禁用</h4>
      <Tabs disabled>
        <Tabs.Item>选项卡1</Tabs.Item>
        <Tabs.Item>选项卡22</Tabs.Item>
        <Tabs.Item>选项卡333</Tabs.Item>
      </Tabs>
      <h4>单项禁用</h4>
      <Tabs>
        <Tabs.Item>选项卡1</Tabs.Item>
        <Tabs.Item disabled>选项卡22</Tabs.Item>
        <Tabs.Item>选项卡333</Tabs.Item>
      </Tabs>
      <h4>卡片风格全局禁用</h4>
      <Tabs theme="card" disabled>
        <Tabs.Item>选项卡1</Tabs.Item>
        <Tabs.Item>选项卡22</Tabs.Item>
        <Tabs.Item>选项卡333</Tabs.Item>
      </Tabs>
      <h4>卡片风格单项禁用</h4>
      <Tabs theme="card">
        <Tabs.Item>选项卡1</Tabs.Item>
        <Tabs.Item disabled>选项卡22</Tabs.Item>
        <Tabs.Item>选项卡333</Tabs.Item>
      </Tabs>
    </>
  )
}

export default App
```

## Tabs API

<API hideTitle />

## TabsItem API

| 属性      | 说明             | 类型                               | 默认值  |
| --------- | ---------------- | ---------------------------------- | ------- |
| children  | 按钮内容         | `ReactNode`                        | `--`      |
| className | 类名             | `string`                           | `--`      |
| style     | 自定义样式       | `CSSProperties`                    | `--`      |
| value     | 单项值           | `string〡number`                   | `--`      |
| disabled  | 单项禁用         | `boolean`                          | `false` |
| onClick   | 点击单项卡时触发 | `(value?: string〡number) => void` | `--`      |
