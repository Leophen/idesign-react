---
nav:
  title: 组件
  path: /components
group:
  title: 基础组件
  order: 1
order: 3
---

# Divider 分割线

分割线是一个呈线状的轻量化组件，起到分割、组织、细化的作用，用于有逻辑的组织元素内容和页面结构。

## 基本用法

可通过 `dashed` 属性来控制分割线样式。

```tsx
import React from 'react';
import { Divider } from 'idesign-react';

const App = () => {
  return (
    <>
      <p>
        柯里化即
        Currying，是一门编译原理层面的技术，用途是实现多参函数，其为实现多参函数提供了一个递归降解的实现思路——把接受多个参数的函数变换成接受第一个参数的函数，并且返回接受剩余参数且返回结果的新函数。
      </p>
      <Divider></Divider>
      <p>
        柯里化即
        Currying，是一门编译原理层面的技术，用途是实现多参函数，其为实现多参函数提供了一个递归降解的实现思路——把接受多个参数的函数变换成接受第一个参数的函数，并且返回接受剩余参数且返回结果的新函数。
      </p>
      <Divider dashed></Divider>
      <p>
        柯里化即
        Currying，是一门编译原理层面的技术，用途是实现多参函数，其为实现多参函数提供了一个递归降解的实现思路——把接受多个参数的函数变换成接受第一个参数的函数，并且返回接受剩余参数且返回结果的新函数。
      </p>
    </>
  );
};

export default App;
```

## 带文字的分割线

可通过 `align` 属性来控制分割线文字内容的位置。

```tsx
import React from 'react';
import { Divider } from 'idesign-react';

const App = () => {
  return (
    <>
      <p>
        柯里化即
        Currying，是一门编译原理层面的技术，用途是实现多参函数，其为实现多参函数提供了一个递归降解的实现思路——把接受多个参数的函数变换成接受第一个参数的函数，并且返回接受剩余参数且返回结果的新函数。
      </p>
      <Divider align="left">iDesign</Divider>
      <p>
        柯里化即
        Currying，是一门编译原理层面的技术，用途是实现多参函数，其为实现多参函数提供了一个递归降解的实现思路——把接受多个参数的函数变换成接受第一个参数的函数，并且返回接受剩余参数且返回结果的新函数。
      </p>
      <Divider align="center">iDesign</Divider>
      <p>
        柯里化即
        Currying，是一门编译原理层面的技术，用途是实现多参函数，其为实现多参函数提供了一个递归降解的实现思路——把接受多个参数的函数变换成接受第一个参数的函数，并且返回接受剩余参数且返回结果的新函数。
      </p>
      <Divider align="right">iDesign</Divider>
      <p>
        柯里化即
        Currying，是一门编译原理层面的技术，用途是实现多参函数，其为实现多参函数提供了一个递归降解的实现思路——把接受多个参数的函数变换成接受第一个参数的函数，并且返回接受剩余参数且返回结果的新函数。
      </p>
    </>
  );
};

export default App;
```

<API />
