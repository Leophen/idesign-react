---
nav:
  title: 组件
  path: /components
group:
  title: 导航组件
  order: 2
order: 3
---

# Breadcrumb 面包屑

显示当前页面在系统层级结构的位置，并能返回之前任意层级的页面。

## 基本用法

使用 `<Breadcrumb>` 包裹面包屑的每一项 `<Breadcrumb.Item>`。

```tsx
import React from 'react';
import { Breadcrumb } from 'idesign-react';

const App = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>页面1</Breadcrumb.Item>
      <Breadcrumb.Item>页面2222222222222222222222222222222</Breadcrumb.Item>
      <Breadcrumb.Item>页面3333333333333333333333333333333</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default App;
```

## 禁用状态

`<Breadcrumb.Item>` 可以使用 `disabled` 属性控制单项为禁用状态。

```tsx
import React from 'react';
import { Breadcrumb } from 'idesign-react';

const App = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>页面1</Breadcrumb.Item>
      <Breadcrumb.Item disabled>页面2222222222222222222222222222222</Breadcrumb.Item>
      <Breadcrumb.Item>页面3333333333333333333333333333333</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default App;
```

## 自定义单项最大宽度

面包屑每一项的最大宽度默认为 `200px`；

`<Breadcrumb>` 可以使用 `maxItemWidth` 属性来全局控制面包屑每一项的最大宽度，内容超出宽度会以省略号形式呈现；

`<Breadcrumb.Item>` 可以使用 `maxWidth` 属性来控制单项的最大宽度，内容超出宽度会以省略号形式呈现，优先级高于 `maxItemWidth`。

```tsx
import React from 'react';
import { Breadcrumb } from 'idesign-react';

const App = () => {
  return (
    <>
      <Breadcrumb maxItemWidth="120px">
        <Breadcrumb.Item>页面1</Breadcrumb.Item>
        <Breadcrumb.Item>页面2222222222222222222222222222222</Breadcrumb.Item>
        <Breadcrumb.Item>页面3333333333333333333333333333333</Breadcrumb.Item>
      </Breadcrumb>

      <br />

      <Breadcrumb maxItemWidth="120px">
        <Breadcrumb.Item>页面1</Breadcrumb.Item>
        <Breadcrumb.Item maxWidth="80px">页面2222222222222222222222222222222</Breadcrumb.Item>
        <Breadcrumb.Item>页面3333333333333333333333333333333</Breadcrumb.Item>
      </Breadcrumb>

      <br />

      <Breadcrumb maxItemWidth={120}>
        <Breadcrumb.Item>页面1</Breadcrumb.Item>
        <Breadcrumb.Item maxWidth="80px">页面2222222222222222222222222222222</Breadcrumb.Item>
        <Breadcrumb.Item>页面3333333333333333333333333333333</Breadcrumb.Item>
      </Breadcrumb>

      <br />

      <Breadcrumb maxItemWidth={120}>
        <Breadcrumb.Item>页面1</Breadcrumb.Item>
        <Breadcrumb.Item maxWidth={80}>页面2222222222222222222222222222222</Breadcrumb.Item>
        <Breadcrumb.Item>页面3333333333333333333333333333333</Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
};

export default App;
```

## 自定义分隔符

`<Breadcrumb>` 可以使用 `separator` 属性来自定义面包屑每一项的分隔符；

```tsx
import React from 'react';
import { Breadcrumb } from 'idesign-react';

const App = () => {
  return (
    <Breadcrumb separator="👉">
      <Breadcrumb.Item>页面1</Breadcrumb.Item>
      <Breadcrumb.Item>页面2222222222222222222222222222222</Breadcrumb.Item>
      <Breadcrumb.Item>页面3333333333333333333333333333333</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default App;
```

## 路由跳转

可通过包裹 `<a>` 标签或 [React Router](https://reactrouter.com/) 的 `<Link>` 来实现路由跳转。

```tsx
import React from 'react';
import { Breadcrumb } from 'idesign-react';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <a href="/components/breadcrumb">跳转方式一</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link to="/components/breadcrumb">跳转方式二</Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default App;
```

## Breadcrumb API

| 属性         | 说明                                     | 类型              | 默认值  |
| ------------ | ---------------------------------------- | ----------------- | ------- |
| children     | 按钮内容                                 | `ReactNode`       | --      |
| className    | 类名                                     | `string`          | --      |
| maxItemWidth | 各项的最大宽度，超出后会以省略号形式呈现 | `string / number` | `200px` |
| separator    | 自定义分隔符                             | `ReactNode`       | --      |
| style        | 自定义样式                               | `CSSProperties`   | --      |

## BreadcrumbItem API

| 属性      | 说明                                  | 类型              | 默认值  |
| --------- | ------------------------------------- | ----------------- | ------- |
| children  | 按钮内容                              | `ReactNode`       | --      |
| className | 类名                                  | `string`          | --      |
| disabled  | 是否禁用当前项点击                    | `boolean`         | `false` |
| maxWidth  | 单项最大宽度，优先级高于 maxItemWidth | `string / number` | --      |
| style     | 自定义样式                            | `CSSProperties`   | --      |
