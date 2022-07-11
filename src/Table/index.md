---
nav:
  title: 组件
  path: /components
group:
  title: 表单组件
  order: 3
order: 11
---

# Table 表格

用于数据收集展示、分析整理、操作处理的表格。

## 基本用法

通过 `columns` 属性指定列配置，通过 `data` 属性指定数据源：

```tsx
import React from 'react';
import { Table } from 'idesign-react';

const App = () => {
  const columns = [
    {
      title: 'ID',
      key: 'id'
    },
    {
      title: 'Name',
      key: 'name'
    },
    {
      title: 'Age',
      key: 'age'
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
      id: 103761657,
      name: 'Jane Doe',
      age: 21,
      salary: 23000,
      address: '11 Park Road, Guangzhou',
      email: 'jane.doe@idesign.com'
    },
    {
      key: '2',
      id: 761651037,
      name: 'Alisa Ross',
      age: 22,
      salary: 25000,
      address: '22 Park Road, Guangzhou',
      email: 'alisa.ross@idesign.com'
    },
    {
      key: '3',
      id: 373567616,
      name: 'Kevin Sandra',
      age: 23,
      salary: 22000,
      address: '33 Park Road, Guangzhou',
      email: 'kevin.sandra@idesign.com'
    },
    {
      key: '4',
      id: 735646761,
      name: 'Ed Hellen',
      age: 24,
      salary: 17000,
      address: '44 Park Road, Guangzhou',
      email: 'ed.hellen@idesign.com'
    },
    {
      key: '5',
      id: 647616735,
      name: 'William Smith',
      age: 25,
      salary: 27000,
      address: '55 Park Road, Guangzhou',
      email: 'william.smith@idesign.com'
    },
    {
      key: '6',
      id: 616736475,
      name: 'Tim Cook',
      age: 26,
      salary: 36000,
      address: '66 Park Road, Guangzhou',
      email: 'tim.cook@idesign.com'
    },
    {
      key: '7',
      id: 475761636,
      name: 'Bill Gates',
      age: 27,
      salary: 12000,
      address: '77 Park Road, Guangzhou',
      email: 'bill.gates@idesign.com'
    },
    {
      key: '8',
      id: 364616775,
      name: 'Steve Jobs',
      age: 28,
      salary: 66000,
      address: '88 Park Road, Guangzhou',
      email: 'steve.jobs@idesign.com'
    }
  ];

  return (
    <Table columns={columns} data={data} />
  );
};

export default App;
```

## 自定义列宽

通过 `columns` 属性每一项的 `width` 来指定列宽，建议用百分比：

```tsx
import React from 'react';
import { Table } from 'idesign-react';

const App = () => {
  const columns = [
    {
      title: 'ID',
      key: 'id',
      width: '10%'
    },
    {
      title: 'Name',
      key: 'name',
      width: '10%'
    },
    {
      title: 'Age',
      key: 'age',
      width: '10%'
    },
    {
      title: 'Salary',
      key: 'salary',
      width: '10%'
    },
    {
      title: 'Address',
      key: 'address',
      width: '30%'
    },
    {
      title: 'Email',
      key: 'email',
      width: '30%'
    }
  ];

  const data = [
    {
      key: '1',
      id: 103761657,
      name: 'Jane Doe',
      age: 21,
      salary: 23000,
      address: '11 Park Road, Guangzhou',
      email: 'jane.doe@idesign.com'
    },
    {
      key: '2',
      id: 761651037,
      name: 'Alisa Ross',
      age: 22,
      salary: 25000,
      address: '22 Park Road, Guangzhou',
      email: 'alisa.ross@idesign.com'
    },
    {
      key: '3',
      id: 373567616,
      name: 'Kevin Sandra',
      age: 23,
      salary: 22000,
      address: '33 Park Road, Guangzhou',
      email: 'kevin.sandra@idesign.com'
    },
    {
      key: '4',
      id: 735646761,
      name: 'Ed Hellen',
      age: 24,
      salary: 17000,
      address: '44 Park Road, Guangzhou',
      email: 'ed.hellen@idesign.com'
    },
    {
      key: '5',
      id: 647616735,
      name: 'William Smith',
      age: 25,
      salary: 27000,
      address: '55 Park Road, Guangzhou',
      email: 'william.smith@idesign.com'
    },
    {
      key: '6',
      id: 616736475,
      name: 'Tim Cook',
      age: 26,
      salary: 36000,
      address: '66 Park Road, Guangzhou',
      email: 'tim.cook@idesign.com'
    },
    {
      key: '7',
      id: 475761636,
      name: 'Bill Gates',
      age: 27,
      salary: 12000,
      address: '77 Park Road, Guangzhou',
      email: 'bill.gates@idesign.com'
    },
    {
      key: '8',
      id: 364616775,
      name: 'Steve Jobs',
      age: 28,
      salary: 66000,
      address: '88 Park Road, Guangzhou',
      email: 'steve.jobs@idesign.com'
    }
  ];

  return (
    <Table columns={columns} data={data} />
  );
};

export default App;
```

## 设最大高度

通过 `height` 属性指定表格内容最大高度，超出显示滚动条：

```tsx
import React from 'react';
import { Table } from 'idesign-react';

const App = () => {
  const columns = [
    {
      title: 'ID',
      key: 'id'
    },
    {
      title: 'Name',
      key: 'name'
    },
    {
      title: 'Age',
      key: 'age'
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
      id: 103761657,
      name: 'Jane Doe',
      age: 21,
      salary: 23000,
      address: '11 Park Road, Guangzhou',
      email: 'jane.doe@idesign.com'
    },
    {
      key: '2',
      id: 761651037,
      name: 'Alisa Ross',
      age: 22,
      salary: 25000,
      address: '22 Park Road, Guangzhou',
      email: 'alisa.ross@idesign.com'
    },
    {
      key: '3',
      id: 373567616,
      name: 'Kevin Sandra',
      age: 23,
      salary: 22000,
      address: '33 Park Road, Guangzhou',
      email: 'kevin.sandra@idesign.com'
    },
    {
      key: '4',
      id: 735646761,
      name: 'Ed Hellen',
      age: 24,
      salary: 17000,
      address: '44 Park Road, Guangzhou',
      email: 'ed.hellen@idesign.com'
    },
    {
      key: '5',
      id: 647616735,
      name: 'William Smith',
      age: 25,
      salary: 27000,
      address: '55 Park Road, Guangzhou',
      email: 'william.smith@idesign.com'
    },
    {
      key: '6',
      id: 616736475,
      name: 'Tim Cook',
      age: 26,
      salary: 36000,
      address: '66 Park Road, Guangzhou',
      email: 'tim.cook@idesign.com'
    },
    {
      key: '7',
      id: 475761636,
      name: 'Bill Gates',
      age: 27,
      salary: 12000,
      address: '77 Park Road, Guangzhou',
      email: 'bill.gates@idesign.com'
    },
    {
      key: '8',
      id: 364616775,
      name: 'Steve Jobs',
      age: 28,
      salary: 66000,
      address: '88 Park Road, Guangzhou',
      email: 'steve.jobs@idesign.com'
    },
    {
      key: '9',
      id: 103761657,
      name: 'Jane Doe',
      age: 21,
      salary: 23000,
      address: '11 Park Road, Guangzhou',
      email: 'jane.doe@idesign.com'
    },
    {
      key: '10',
      id: 761651037,
      name: 'Alisa Ross',
      age: 22,
      salary: 25000,
      address: '22 Park Road, Guangzhou',
      email: 'alisa.ross@idesign.com'
    },
    {
      key: '11',
      id: 373567616,
      name: 'Kevin Sandra',
      age: 23,
      salary: 22000,
      address: '33 Park Road, Guangzhou',
      email: 'kevin.sandra@idesign.com'
    },
    {
      key: '12',
      id: 735646761,
      name: 'Ed Hellen',
      age: 24,
      salary: 17000,
      address: '44 Park Road, Guangzhou',
      email: 'ed.hellen@idesign.com'
    },
    {
      key: '13',
      id: 647616735,
      name: 'William Smith',
      age: 25,
      salary: 27000,
      address: '55 Park Road, Guangzhou',
      email: 'william.smith@idesign.com'
    },
    {
      key: '14',
      id: 616736475,
      name: 'Tim Cook',
      age: 26,
      salary: 36000,
      address: '66 Park Road, Guangzhou',
      email: 'tim.cook@idesign.com'
    },
    {
      key: '15',
      id: 475761636,
      name: 'Bill Gates',
      age: 27,
      salary: 12000,
      address: '77 Park Road, Guangzhou',
      email: 'bill.gates@idesign.com'
    },
    {
      key: '16',
      id: 364616775,
      name: 'Steve Jobs',
      age: 28,
      salary: 66000,
      address: '88 Park Road, Guangzhou',
      email: 'steve.jobs@idesign.com'
    }
  ];

  return (
    <Table maxHeight={300} columns={columns} data={data} />
  );
};

export default App;
```

## 条纹表格

通过 `stripe` 属性指定表格双数行带条纹：

```tsx
import React from 'react';
import { Table } from 'idesign-react';

const App = () => {
  const columns = [
    {
      title: 'ID',
      key: 'id'
    },
    {
      title: 'Name',
      key: 'name'
    },
    {
      title: 'Age',
      key: 'age'
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
      id: 103761657,
      name: 'Jane Doe',
      age: 21,
      salary: 23000,
      address: '11 Park Road, Guangzhou',
      email: 'jane.doe@idesign.com'
    },
    {
      key: '2',
      id: 761651037,
      name: 'Alisa Ross',
      age: 22,
      salary: 25000,
      address: '22 Park Road, Guangzhou',
      email: 'alisa.ross@idesign.com'
    },
    {
      key: '3',
      id: 373567616,
      name: 'Kevin Sandra',
      age: 23,
      salary: 22000,
      address: '33 Park Road, Guangzhou',
      email: 'kevin.sandra@idesign.com'
    },
    {
      key: '4',
      id: 735646761,
      name: 'Ed Hellen',
      age: 24,
      salary: 17000,
      address: '44 Park Road, Guangzhou',
      email: 'ed.hellen@idesign.com'
    },
    {
      key: '5',
      id: 647616735,
      name: 'William Smith',
      age: 25,
      salary: 27000,
      address: '55 Park Road, Guangzhou',
      email: 'william.smith@idesign.com'
    },
    {
      key: '6',
      id: 616736475,
      name: 'Tim Cook',
      age: 26,
      salary: 36000,
      address: '66 Park Road, Guangzhou',
      email: 'tim.cook@idesign.com'
    },
    {
      key: '7',
      id: 475761636,
      name: 'Bill Gates',
      age: 27,
      salary: 12000,
      address: '77 Park Road, Guangzhou',
      email: 'bill.gates@idesign.com'
    },
    {
      key: '8',
      id: 364616775,
      name: 'Steve Jobs',
      age: 28,
      salary: 66000,
      address: '88 Park Road, Guangzhou',
      email: 'steve.jobs@idesign.com'
    }
  ];

  return (
    <Table stripe columns={columns} data={data} />
  );
};

export default App;
```

<API />
