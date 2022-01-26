---
nav:
  title: 组件
  path: /components
group:
  title: 导航组件
  order: 2
---

# Breadcrumb 面包屑

显示当前页面在系统层级结构的位置，并能返回之前任意层级的页面。

## 基本用法

```tsx
import React from 'react';
import { Breadcrumb } from 'idesign-react';

const { BreadcrumbItem } = Breadcrumb;

export default function BreadcrumbExample() {
  return (
    <Breadcrumb maxItemWidth="200px">
      <BreadcrumbItem>页面1</BreadcrumbItem>
      <BreadcrumbItem>页面2222222222222222222222222222222</BreadcrumbItem>
      <BreadcrumbItem maxWidth="120px">页面3333333333333333333333333333333</BreadcrumbItem>
    </Breadcrumb>
  );
}
```
