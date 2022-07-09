---
nav:
  title: 组件
  path: /components
group:
  title: 表单组件
  order: 3
order: 11
---

# Table 表格（开发中）

用于数据收集展示、分析整理、操作处理的表格。

## 基本用法

通过 `columns` 属性指定列配置，通过 `data` 属性指定数据源：

```tsx
import React from 'react';
import { Table } from 'idesign-react';

const App = () => {
  const columns = [
    {
      title: 'Name',
      key: 'name'
    },
    {
      title: 'Salary',
      key: 'salary'
    },
    {
      title: 'Address',
      key: 'address'
    },
    {
      title: 'Email',
      key: 'email'
    }
  ];

  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com'
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com'
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com'
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com'
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com'
    }
  ];

  return (
    <Table columns={columns} data={data} />
  );
};

export default App;
```

<API />
