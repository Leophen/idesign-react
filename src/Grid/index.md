---
nav:
  title: 组件
  path: /components
group:
  title: 基础组件
  order: 1
order: 4
---

# Grid 栅格

24 栅格系统是以规则的网格阵列来规范页面中的模块布局及信息分布，提高界面布局的一致性。

## 基本用法

使用 `Grid` 包裹栅格的每一项 `Grid.Item`。

`Grid.Item` 的 `span` 属性值使用 0（不显示）到 24（默认值）的值来表示其跨越范围。例如，三个等宽的列可以使用 `<Grid.Item span={8}>` 来创建。

如果一个 `Grid` 中 `Grid.Item` 的 `span` 总和超过 24，那么多余的 `Grid.Item` 会作为一个整体另起一行排列。

```tsx
import React from 'react';
import { Grid } from 'idesign-react';

const demoData = [
  Array(24).fill(1),
  Array(12).fill(2),
  Array(8).fill(3),
  Array(6).fill(4),
  Array(4).fill(6),
  Array(3).fill(8),
  Array(2).fill(12),
  Array(1).fill(24),
];

const App = () => {
  return (
    <>
      {/* 直接使用 */}
      <Grid>
        <Grid.Item span={8}>
          <div>GridItem1</div>
        </Grid.Item>
        <Grid.Item span={8}>
          <div>GridItem2</div>
        </Grid.Item>
        <Grid.Item span={8}>
          <div>GridItem3</div>
        </Grid.Item>
      </Grid>

      {/* 遍历使用 */}
      {demoData.map((grid, i) => (
        <Grid key={i}>
          {grid.map((item, j) => (
            <Grid.Item span={item} key={j}>
              <div>{item}</div>
            </Grid.Item>
          ))}
        </Grid>
      ))}

      {/* span 总和超出换行 */}
      <Grid>
        <Grid.Item span={8}>
          <div>span8</div>
        </Grid.Item>
        <Grid.Item span={8}>
          <div>span8</div>
        </Grid.Item>
        <Grid.Item span={12}>
          <div>span12</div>
        </Grid.Item>
      </Grid>
    </>
  );
};

export default App;
```

## 自定义单项宽度

`Grid.Item` 的 `width` 属性值可以设置单项固定宽度，`width` 为具体的宽度且优先级高于 `span`，而 `span` 设置的宽度为间隔格数（0 - 24）

```tsx
import React from 'react';
import { Grid } from 'idesign-react';

const App = () => {
  return (
    <>
      <Grid>
        <Grid.Item span={4}>
          <div>GridItem1</div>
        </Grid.Item>
        <Grid.Item width={100}>
          <div>GridItem2</div>
        </Grid.Item>
        <Grid.Item width="auto">
          <div>GridItem3</div>
        </Grid.Item>
        <Grid.Item span={4} width={120}>
          <div>GridItem4</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem5</div>
        </Grid.Item>
      </Grid>
    </>
  );
};

export default App;
```

## 区块间隔

`Grid` 的 `gutter` 属性值可以全局设置栅格中每一项的左右内边距。例如，`<Grid gutter={16}>` 将会为每一项 `Grid.Item` 添加左右内边距为 `8px`。

```tsx
import React from 'react';
import { Grid } from 'idesign-react';

const App = () => {
  return (
    <>
      <Grid gutter={0}>
        <Grid.Item span={4}>
          <div>GridItem1</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem2</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem3</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem4</div>
        </Grid.Item>
      </Grid>

      <Grid gutter={16}>
        <Grid.Item span={4}>
          <div>GridItem1</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem2</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem3</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem4</div>
        </Grid.Item>
      </Grid>

      <Grid gutter={32}>
        <Grid.Item span={4}>
          <div>GridItem1</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem2</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem3</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem4</div>
        </Grid.Item>
      </Grid>
    </>
  );
};

export default App;
```

## 单项左侧间距

`Grid.Item` 的 `offset` 属性值可以单独设置该项的左侧外边距，单位为间隔格数。例如，`<Grid.Item offset={2}>` 将会向右偏移 2 个间隔的距离。

```tsx
import React from 'react';
import { Grid } from 'idesign-react';

const App = () => {
  return (
    <>
      <Grid>
        <Grid.Item span={4}>
          <div>GridItem1</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem2</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem3</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem4</div>
        </Grid.Item>
      </Grid>

      <Grid>
        <Grid.Item span={4}>
          <div>GridItem1</div>
        </Grid.Item>
        <Grid.Item span={4} offset={2}>
          <div>GridItem2</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem3</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem4</div>
        </Grid.Item>
      </Grid>

      <Grid gutter={16}>
        <Grid.Item span={4}>
          <div>GridItem1</div>
        </Grid.Item>
        <Grid.Item span={4} offset={2}>
          <div>GridItem2</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem3</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem4</div>
        </Grid.Item>
      </Grid>
    </>
  );
};

export default App;
```

## 栅格水平排列方式

`Grid` 的 `justify` 属性值可以全局设置栅格水平的排版。

```tsx
import React from 'react';
import { Grid } from 'idesign-react';

const App = () => {
  return (
    <>
      <h3>start</h3>
      <Grid justify="start">
        <Grid.Item span={4}>
          <div>GridItem1</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem2</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem3</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem4</div>
        </Grid.Item>
      </Grid>

      <h3>center</h3>
      <Grid justify="center">
        <Grid.Item span={4}>
          <div>GridItem1</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem2</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem3</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem4</div>
        </Grid.Item>
      </Grid>

      <h3>end</h3>
      <Grid justify="end">
        <Grid.Item span={4}>
          <div>GridItem1</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem2</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem3</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem4</div>
        </Grid.Item>
      </Grid>

      <h3>space-between</h3>
      <Grid justify="space-between">
        <Grid.Item span={4}>
          <div>GridItem1</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem2</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem3</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem4</div>
        </Grid.Item>
      </Grid>

      <h3>space-around</h3>
      <Grid justify="space-around">
        <Grid.Item span={4}>
          <div>GridItem1</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem2</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem3</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem4</div>
        </Grid.Item>
      </Grid>
    </>
  );
};

export default App;
```

## 栅格垂直对齐方式

`Grid` 的 `align` 属性值可以全局设置栅格中每一项的垂直对齐方式，而 `Grid.Item` 可通过 `align` 属性值单独设置该项的垂直对齐方式，优先级更高。

```tsx
import React from 'react';
import { Grid } from 'idesign-react';

const App = () => {
  return (
    <>
      <h3>top</h3>
      <Grid align="top">
        <Grid.Item span={4}>
          <div style={{ height: '80px' }}>GridItem1</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem2</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div style={{ height: '60px' }}>GridItem3</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem4</div>
        </Grid.Item>
      </Grid>

      <h3>middle</h3>
      <Grid align="middle">
        <Grid.Item span={4}>
          <div style={{ height: '80px' }}>GridItem1</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem2</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div style={{ height: '60px' }}>GridItem3</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem4</div>
        </Grid.Item>
      </Grid>

      <h3>bottom</h3>
      <Grid align="bottom">
        <Grid.Item span={4}>
          <div style={{ height: '80px' }}>GridItem1</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem2</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div style={{ height: '60px' }}>GridItem3</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem4</div>
        </Grid.Item>
      </Grid>

      <h3>单项对齐设置</h3>
      <Grid align="bottom">
        <Grid.Item span={4}>
          <div style={{ height: '80px' }}>GridItem1</div>
        </Grid.Item>
        <Grid.Item span={4} align="top">
          <div>AlignTop2</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div style={{ height: '60px' }}>GridItem3</div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div>GridItem4</div>
        </Grid.Item>
      </Grid>
    </>
  );
};

export default App;
```

## 自定义单项排序

`Grid.Item` 的 `order` 属性值可以设置单项在整个栅格中的次序。

```tsx
import React from 'react';
import { Grid } from 'idesign-react';

const App = () => {
  return (
    <>
      <Grid gutter={10}>
        <Grid.Item span={2}>
          <div>1</div>
        </Grid.Item>
        <Grid.Item span={2}>
          <div>2</div>
        </Grid.Item>
        <Grid.Item span={2} order={4}>
          <div>3</div>
        </Grid.Item>
        <Grid.Item span={2} order={3}>
          <div>4</div>
        </Grid.Item>
        <Grid.Item span={2} order={3}>
          <div>5</div>
        </Grid.Item>
        <Grid.Item span={2} order={2}>
          <div>6</div>
        </Grid.Item>
        <Grid.Item span={2} order={1}>
          <div>7</div>
        </Grid.Item>
        <Grid.Item span={2} order={0}>
          <div>8</div>
        </Grid.Item>
        <Grid.Item span={2}>
          <div>9</div>
        </Grid.Item>
        <Grid.Item span={2}>
          <div>10</div>
        </Grid.Item>
      </Grid>
    </>
  );
};

export default App;
```

## Grid API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 内容 | `ReactNode` | `--` |
| className | 类名 | `string` | `--` |
| style | 自定义样式 | `CSSProperties` | `--` |
| justify | 栅格水平排列方式 | `"start"〡"end"〡"center"〡"space-around"〡"space-between"` | `"start"` |
| align | 栅格每一项的全局垂直对齐方式 | `"top"〡"middle"〡"bottom"` | `"top"` |
| gutter | 栅格每一项间的全局间隔 | `number` | `0` |

## GridItem API

| 属性      | 说明                   | 类型                        | 默认值  |
| --------- | ---------------------- | --------------------------- | ------- |
| children  | 内容                   | `ReactNode`                 | `--`    |
| className | 类名                   | `string`                    | `--`    |
| style     | 自定义样式             | `CSSProperties`             | `--`    |
| span      | 栅格宽度占比           | `number`                    | `24`    |
| width     | 栅格单项宽度值         | `number〡string`            | `--`    |
| align     | 栅格单项的垂直对齐方式 | `"top"〡"middle"〡"bottom"` | `"top"` |
| offset    | 栅格单项的左侧外边距   | `number`                    | `0`     |
| order     | 栅格单项次序           | `number`                    | `0`     |
