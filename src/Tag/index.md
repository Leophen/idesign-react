---
nav:
  title: 组件
  path: /components
group:
  title: 数据展示组件
  order: 4
order: 1
---

# Tag 标签

标签常用于标记、分类和选择

## 基本用法

标签组件可直接展示包裹的内容，也可通过 `<a>` 或 [React Router](https://reactrouter.com/) 的 `<Link>` 来嵌套标签组件作为超链接标签使用。

```tsx
import React from 'react';
import { Tag } from 'idesign-react';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Tag>普通标签</Tag>

      <a href="https://idesign-react.vercel.app/" target="_blank" rel="noreferrer">
        <Tag>超链接标签一</Tag>
      </a>

      <Link to="/components/button">
        <Tag>超链接标签二</Tag>
      </Link>
    </div>
  );
};

export default App;
```

## 不同样式的标签

Tag 组件提供了五种不同的颜色类型：`default`（默认）、`primary`、`success`、`warning` 和 `danger`。

除此之外，可以通过 `theme` 属性来改变主题：`light`（默认）、`dark`。

```tsx
import React from 'react';
import { Tag } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Tag type="default">标签一</Tag>
        <Tag type="primary">标签二</Tag>
        <Tag type="success">标签三</Tag>
        <Tag type="warning">标签四</Tag>
        <Tag type="danger">标签五</Tag>
      </div>
      <div className="idesign-demo-block-row">
        <Tag type="default" theme="dark">
          标签一
        </Tag>
        <Tag type="primary" theme="dark">
          标签二
        </Tag>
        <Tag type="success" theme="dark">
          标签三
        </Tag>
        <Tag type="warning" theme="dark">
          标签四
        </Tag>
        <Tag type="danger" theme="dark">
          标签五
        </Tag>
      </div>
    </div>
  );
};

export default App;
```

## 带图标的标签

Tag 组件提供了 `icon` 属性来嵌入内置图标（[点击查看内置图标集合](./icon#全部图标)），也可以通过插槽的方式嵌入自定义图标。

```tsx
import React from 'react';
import { Tag } from 'idesign-react';
import { Icon } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Tag icon="TagPrice">标签一</Tag>
      <Tag>
        <Icon name="TagCollection" size={14} />
        标签二
      </Tag>
    </div>
  );
};

export default App;
```

## 带添加和删除按钮的标签

当添加 `onAdd` 添加标签事件或 `onClose` 关闭标签事件时，会自动带上添加或删除按钮。

```tsx
import React from 'react';
import { Tag } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Tag onAdd={() => alert('add')}>标签一</Tag>
        <Tag icon="TagPrice" onAdd={() => alert('add')}>
          标签二
        </Tag>
        <Tag onClose={() => alert('close')}>标签三</Tag>
        <Tag icon="TagPrice" onClose={() => alert('close')}>
          标签四
        </Tag>
      </div>
      <div className="idesign-demo-block-row">
        <Tag type="primary" onAdd={() => alert('add')}>
          标签一
        </Tag>
        <Tag type="primary" icon="TagPrice" onAdd={() => alert('add')}>
          标签二
        </Tag>
        <Tag type="primary" onClose={() => alert('close')}>
          标签三
        </Tag>
        <Tag type="primary" icon="TagPrice" onClose={() => alert('close')}>
          标签四
        </Tag>
      </div>
      <div className="idesign-demo-block-row">
        <Tag type="primary" theme="dark" onAdd={() => alert('add')}>
          标签一
        </Tag>
        <Tag type="primary" theme="dark" icon="TagPrice" onAdd={() => alert('add')}>
          标签二
        </Tag>
        <Tag type="primary" theme="dark" onClose={() => alert('close')}>
          标签三
        </Tag>
        <Tag type="primary" theme="dark" icon="TagPrice" onClose={() => alert('close')}>
          标签四
        </Tag>
      </div>
    </div>
  );
};

export default App;
```

## 不同尺寸的标签

Tag 组件提供了三种不同的尺寸：`small`、`medium`（默认）和 `large`。

```tsx
import React from 'react';
import { Tag } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Tag size="small">标签一</Tag>
        <Tag size="medium">标签二</Tag>
        <Tag size="large">标签三</Tag>
      </div>
      <div className="idesign-demo-block-row">
        <Tag size="small" icon="TagPrice">
          标签一
        </Tag>
        <Tag size="medium" icon="TagPrice">
          标签二
        </Tag>
        <Tag size="large" icon="TagPrice">
          标签三
        </Tag>
      </div>
      <div className="idesign-demo-block-row">
        <Tag size="small" onAdd={() => alert('add')}>
          标签一
        </Tag>
        <Tag size="medium" onAdd={() => alert('add')}>
          标签二
        </Tag>
        <Tag size="large" onAdd={() => alert('add')}>
          标签三
        </Tag>
      </div>
      <div className="idesign-demo-block-row">
        <Tag size="small" onClose={() => alert('close')}>
          标签一
        </Tag>
        <Tag size="medium" onClose={() => alert('close')}>
          标签二
        </Tag>
        <Tag size="large" onClose={() => alert('close')}>
          标签三
        </Tag>
      </div>
    </div>
  );
};

export default App;
```

## 自定义最大宽度

通过 `maxWidth` 设置最大宽度，超出部分自动省略。

```tsx
import React from 'react';
import { Tag } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Tag size="small">超长文本标签超长省略文本标签</Tag>
        <Tag size="small" maxWidth={150}>
          超长文本标签超长省略文本标签
        </Tag>
      </div>
      <div className="idesign-demo-block-row">
        <Tag>超长文本标签超长省略文本标签</Tag>
        <Tag maxWidth={150}>超长文本标签超长省略文本标签</Tag>
      </div>
      <div className="idesign-demo-block-row">
        <Tag size="large">超长文本标签超长省略文本标签</Tag>
        <Tag size="large" maxWidth={150}>
          超长文本标签超长省略文本标签
        </Tag>
      </div>
    </div>
  );
};

export default App;
```

<API src="./index.tsx"></API>
