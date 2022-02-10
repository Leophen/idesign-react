---
nav:
  title: 组件
  path: /components
group:
  title: 基础组件
  order: 1
---

# Layout 布局

用于组织网页的框架结构。

## 基本用法

`<Layout>` 容器、可包裹子组件 `<Header>`、`<Footer>`、`<Aside>`、`<Content>`。

```tsx
import React from 'react';
import { Layout } from 'idesign-react';

const { Header, Content, Footer, Aside } = Layout;

const App = () => {
  return (
    <Layout>
      <Header>Header</Header>
      <Content>Content</Content>
      <Footer>Copyright @ 2019-2021 iDesign. All Rights Reserved</Footer>
    </Layout>
  );
};

export default App;
```

## 侧边导航布局

当 `<Layout>` 容器子元素中包含 `<Aside>` 侧边栏组件时，`<Layout>` 容器的全部子元素会水平排列，否则会垂直排列。

```tsx
import React from 'react';
import { Layout } from 'idesign-react';

const { Header, Content, Footer, Aside } = Layout;

const App = () => {
  return (
    <Layout>
      <Aside>Aside</Aside>
      <Layout>
        <Content>Content</Content>
        <Footer>Copyright @ 2019-2021 iDesign. All Rights Reserved</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
```

## 组合导航布局

可根据所需场景自由组合。

```tsx
import React from 'react';
import { Layout } from 'idesign-react';

const { Header, Content, Footer, Aside } = Layout;

const App = () => {
  return (
    <>
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Aside>Aside</Aside>
          <Layout>
            <Content>Content</Content>
            <Footer>Copyright @ 2019-2021 iDesign. All Rights Reserved</Footer>
          </Layout>
        </Layout>
      </Layout>

      <br />
      <br />

      <Layout>
        <Header>Header</Header>
        <Layout>
          <Layout>
            <Content>Content</Content>
            <Footer>Copyright @ 2019-2021 iDesign. All Rights Reserved</Footer>
          </Layout>
          <Aside>Aside</Aside>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
```

## 自定义侧边栏

`Aside` 提供 `width` 属性来自定义宽度。

```tsx
import React from 'react';
import { Layout } from 'idesign-react';

const { Header, Content, Footer, Aside } = Layout;

const App = () => {
  return (
    <>
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Aside width={100}>Aside</Aside>
          <Layout>
            <Content>Content</Content>
            <Footer>Copyright @ 2019-2021 iDesign. All Rights Reserved</Footer>
          </Layout>
        </Layout>
      </Layout>

      <br />
      <br />

      <Layout>
        <Header>Header</Header>
        <Layout>
          <Aside width="100px">Aside</Aside>
          <Layout>
            <Content>Content</Content>
            <Footer>Copyright @ 2019-2021 iDesign. All Rights Reserved</Footer>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
```

## Aside API

| 属性      | 说明       | 类型            | 默认值 |
| --------- | ---------- | --------------- | ------ |
| children  | 内容       | `ReactNode`     | `--`   |
| className | 自定义类名 | `string`        | `--`   |
| style     | 自定义样式 | `CSSProperties` | `--`   |
| width     | 宽度       | `string`        | `240`  |
