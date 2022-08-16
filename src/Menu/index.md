---
nav:
  title: 组件
  path: /components
group:
  title: 导航组件
  order: 2
order: 1
---

# Menu 导航栏

收纳、排列并展示一系列选项的导航栏。

## 基本用法

使用 `Menu` 包裹菜单的每一项 `Menu.Item`：

```tsx
import React, { useState } from 'react'
import { Menu } from 'idesign-react'

const App = () => {
  const [value, setValue] = useState('1')

  const handleChange = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <>
      <h4>无默认值</h4>
      <Menu>
        <Menu.Item>菜单1</Menu.Item>
        <Menu.Item>菜单2</Menu.Item>
        <Menu.Item>菜单3</Menu.Item>
        <Menu.Item>菜单4</Menu.Item>
      </Menu>
      <h4>有默认值（非受控）</h4>
      <Menu defaultActive={value}>
        <Menu.Item>菜单1</Menu.Item>
        <Menu.Item>菜单2</Menu.Item>
        <Menu.Item>菜单3</Menu.Item>
        <Menu.Item>菜单4</Menu.Item>
      </Menu>
      <h4>有固定值（受控）</h4>
      <Menu active={value}>
        <Menu.Item>菜单1</Menu.Item>
        <Menu.Item>菜单2</Menu.Item>
        <Menu.Item>菜单3</Menu.Item>
        <Menu.Item>菜单4</Menu.Item>
      </Menu>
      <h4>一般用法</h4>
      <Menu active={value} onChange={handleChange}>
        <Menu.Item>菜单1</Menu.Item>
        <Menu.Item>菜单2</Menu.Item>
        <Menu.Item>菜单3</Menu.Item>
        <Menu.Item>菜单4</Menu.Item>
      </Menu>
    </>
  )
}

export default App
```

## 带前后缀

通过 `prefixContent` 和 `suffixContent` 分别设置导航项的前后缀：

```tsx
import React from 'react';
import { Menu } from 'idesign-react';

const App = () => {
  const prefix = <img src="/images/logo.svg" />
  const suffix = <div>个人中心</div>

  return (
    <Menu defaultActive='b' prefixContent={prefix} suffixContent={suffix}>
      <Menu.Item value='a'>菜单1</Menu.Item>
      <Menu.Item value='b'>菜单2</Menu.Item>
      <Menu.Item value='c'>菜单3</Menu.Item>
      <Menu.Item value='d'>菜单4</Menu.Item>
    </Menu>
  );
};

export default App;
```

## 嵌套导航

可使用 `Menu.Group` 嵌套多层导航：

```tsx
import React, { useState } from 'react';
import { Menu } from 'idesign-react';

const App = () => {
  const [value, setValue] = useState('menu2-2-4')

  const handleChange = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <Menu active={value} onChange={handleChange}>
      <Menu.Item>菜单1</Menu.Item>
      <Menu.Group title='菜单2'>
        <Menu.Item>菜单2-1</Menu.Item>
        <Menu.Group title='菜单2-2'>
          <Menu.Item>菜单2-2-1</Menu.Item>
          <Menu.Item>菜单2-2-2</Menu.Item>
          <Menu.Item>菜单2-2-3</Menu.Item>
          <Menu.Item value='menu2-2-4'>菜单2-2-4</Menu.Item>
        </Menu.Group>
        <Menu.Item value='menu2-3'>菜单2-3</Menu.Item>
      </Menu.Group>
      <Menu.Item>菜单3</Menu.Item>
      <Menu.Item>菜单4</Menu.Item>
    </Menu>
  );
};

export default App;
```

## 垂直方向

通过 `direction` 属性控制导航方向：

```tsx
import React, { useState } from 'react';
import { Menu } from 'idesign-react';

const App = () => {
  const prefix = <img src="/images/logo.svg" />
  const suffix = <div>个人中心</div>

  const [value, setValue] = useState('menu2-2-4')

  const handleChange = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <Menu
      width={200}
      direction="vertical"
      active={value}
      prefixContent={prefix}
      suffixContent={suffix}
      onChange={handleChange}
    >
      <Menu.Item>菜单1</Menu.Item>
      <Menu.Group title='菜单2'>
        <Menu.Item>菜单2-1</Menu.Item>
        <Menu.Group title='菜单2-2'>
          <Menu.Item>菜单2-2-1</Menu.Item>
          <Menu.Item>菜单2-2-2</Menu.Item>
          <Menu.Item>菜单2-2-3</Menu.Item>
          <Menu.Item value='menu2-2-4'>菜单2-2-4</Menu.Item>
        </Menu.Group>
        <Menu.Item value='menu2-3'>菜单2-3</Menu.Item>
      </Menu.Group>
      <Menu.Item>菜单3</Menu.Item>
      <Menu.Item>菜单4</Menu.Item>
    </Menu>
  );
};

export default App;
```

## Menu API

<API hideTitle />

## MenuItem API

| 属性      | 说明           | 类型                       | 默认值   |
| --------- | -------------- | -------------------------- | -------- |
| children  | 按钮内容       | `ReactNode`                | `--`     |
| className | 类名           | `string`                   | `--`     |
| style     | 自定义样式     | `CSSProperties`            | `--`     |
| value     | 单项唯一标识   | `string〡number`           | `索引值` |
| onClick   | 点击单项时触发 | `(string〡number) => void` | `--`     |

## MenuGroup API

| 属性      | 说明       | 类型            | 默认值 |
| --------- | ---------- | --------------- | ------ |
| children  | 按钮内容   | `ReactNode`     | `--`   |
| className | 类名       | `string`        | `--`   |
| style     | 自定义样式 | `CSSProperties` | `--`   |
| title     | 折叠项标题 | `ReactNode`     | `--`   |
