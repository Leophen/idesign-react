---
nav:
  title: 组件
  path: /components
group:
  title: 导航组件
  order: 2
order: 1
---

# Menu 导航栏（开发中）

## 基本用法

使用 `Menu` 包裹菜单的每一项 `Menu.Item`：

```tsx
import React, { useState } from 'react';
import { Menu } from 'idesign-react';

const App = () => {
  const [current, setCurrent] = useState('0')

  const handleChange = (val) => {
    console.log(val)
    setCurrent(val)
  }

  return (
    <Menu current={current} onChange={handleChange}>
      <Menu.Item value='0'>菜单1</Menu.Item>
      <Menu.Item value='1'>菜单2</Menu.Item>
      <Menu.Item value='2'>菜单3</Menu.Item>
      <Menu.Item value='3'>菜单4</Menu.Item>
    </Menu>
  );
};

export default App;
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
    <Menu current='0' prefixContent={prefix} suffixContent={suffix}>
      <Menu.Item value='0'>菜单1</Menu.Item>
      <Menu.Item value='1'>菜单2</Menu.Item>
      <Menu.Item value='2'>菜单3</Menu.Item>
      <Menu.Item value='3'>菜单4</Menu.Item>
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
  const [current, setCurrent] = useState('0')

  const handleChange = (val) => {
    console.log(val)
    setCurrent(val)
  }

  return (
    <Menu
      direction="vertical"
      width={200}
      current={current}
      onChange={handleChange}
    >
      <Menu.Item value='0'>菜单1</Menu.Item>
      <Menu.Item value='1'>菜单2</Menu.Item>
      <Menu.Item value='2'>菜单3</Menu.Item>
      <Menu.Item value='3'>菜单4</Menu.Item>
    </Menu>
  );
};

export default App;
```

## Menu API

<API hideTitle />
