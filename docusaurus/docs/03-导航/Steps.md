---
title: Steps 步骤条
---

引导用户按照流程完成任务的步骤条。

## 引入

```js
import {Steps} from 'idesign';

const {Step} = Steps;
```

## 基本用法

当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。

```jsx live fffx
<Steps current={1}>
    <Step title="Finished" description="This is a description." />
    <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
    <Step title="Waiting" description="This is a description." />
</Steps>
```

## 迷你版

迷你版的步骤条，通过设置 `<Steps size="small">` 启用.

```jsx live fffx
<Steps size="small" current={1}>
    <Step title="Finished" />
    <Step title="In Progress" />
    <Step title="Waiting" />
</Steps>
```

## 横向步骤条上下布局方式

通过设置 `<Steps labelPlacement="vertical">` 启用

```jsx live fff
<Steps current={1} labelPlacement="vertical">
    <Step title="Finished" description="This is a description." />
    <Step title="In Progress" description="This is a description." />
    <Step title="Waiting" description="This is a description." />
</Steps>
```

## 步骤切换

通常配合内容及按钮使用，表示一个流程的处理进度。

```jsx live fff
function App() {
    const steps = [
        {
            title: 'First',
            content: 'First-content'
        },
        {
            title: 'Second',
            content: 'Second-content'
        },
        {
            title: 'Last',
            content: 'Last-content'
        }
    ];

    const [current, setCurrent] = React.useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    return (
        <>
            <Steps current={current}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action">
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                      Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => alert('Processing complete!')}>
                      Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{margin: '0 8px'}} onClick={() => prev()}>
                      Previous
                    </Button>
                )}
            </div>
        </>
    );
}
```

## 竖直方向的步骤条

简单的竖直方向的步骤条。

```jsx live fff
<Steps direction="vertical" current={1}>
    <Step title="Finished" description="This is a description." />
    <Step title="In Progress" description="This is a description." />
    <Step title="Waiting" description="This is a description." />
</Steps>
```

## 竖直方向的小型步骤条

简单的竖直方向的小型步骤条。

```jsx live fff
<Steps direction="vertical" size="small" current={1}>
    <Step title="Finished" description="This is a description." />
    <Step title="In Progress" description="This is a description." />
    <Step title="Waiting" description="This is a description." />
</Steps>
```

## 步骤运行错误

使用 Steps 的 `status` 属性来指定当前步骤的状态。

```jsx live fff
<Steps current={1} status="error">
    <Step title="Finished" description="This is a description" />
    <Step title="In Process" description="This is a description" />
    <Step title="Waiting" description="This is a description" />
</Steps>
```

## 点状步骤条

包含步骤点的进度条。

```jsx live fff
<div className="demo-column">
    <Steps progressDot current={1}>
        <Step title="Finished" description="This is a description." />
        <Step title="In Progress" description="This is a description." />
        <Step title="Waiting" description="This is a description." />
    </Steps>
    <Steps progressDot current={1} direction="vertical">
        <Step title="Finished" description="This is a description. This is a description." />
        <Step title="In Progress" description="error" status='error' />
        <Step title="Waiting" description="This is a description." />
    </Steps>
</div>
```

## 可点击的步骤条

设置 `onChange` 后，Steps 变为可点击状态。

```jsx live fff
function App() {
    const [current, setCurrent] = useState(0);

    const onChange = current => {
        console.log('onChange:', current);
        setCurrent(current);
    };

    return (
        <div className="demo-column">
            <Steps current={current} onChange={onChange}>
                <Step title="Step 1" description="This is a description." />
                <Step title="Step 2" description="This is a description." />
                <Step title="Step 3" description="This is a description." />
            </Steps>
            <Steps current={current} onChange={onChange} direction="vertical">
                <Step title="Step 1" description="This is a description." />
                <Step title="Step 2" description="This is a description." />
                <Step title="Step 3" description="This is a description - disabled" disabled />
            </Steps>
        </div>
    );
}
```

## API

### Steps

整体步骤条。

| 参数           | 说明                                                                          | 类型                                                                   | 默认值       |
| -------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------ |
| className      | 步骤条类名                                                                    | `string`                                                               | `--`         |
| current        | 指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 `status` 属性覆盖状态 | `number`                                                               | `0`          |
| direction      | 指定步骤条方向。目前支持水平（`horizontal`）和竖直（`vertical`）两种方向      | `string`                                                               | `horizontal` |
| initial        | 起始序号，从 0 开始记数                                                       | `number`                                                               | `0`          |
| labelPlacement | 指定标签放置位置，默认水平放图标右侧，可选 `vertical` 放图标下方              | `string`                                                               | `horizontal` |
| progressDot    | 点状步骤条，可以设置为一个 function，labelPlacement 将强制为 `vertical`       | `boolean〡(iconDot, {index, status, title, description}) => ReactNode` | `false`      |
| responsive     | 当屏幕宽度小于 532px 时自动变为垂直模式                                       | `boolean`                                                              | `--`         |
| size           | 指定大小，目前支持普通（`default`）和迷你（`small`）                          | `string`                                                               | `default`    |
| status         | 指定当前步骤的状态，可选 `wait` `process` `finish` `error`                    | `string`                                                               | `process`    |
| type           | 步骤条类型，有 `default` 和 `navigation` 两种                                 | `string`                                                               | `default`    |
| onChange       | 点击切换步骤时触发                                                            | `(current) => void`                                                    | `--`         |

### Steps.Step

步骤条内的每一个步骤。

| 参数        | 说明                                                                                                          | 类型        | 默认值  |
| ----------- | ------------------------------------------------------------------------------------------------------------- | ----------- | ------- |
| description | 步骤的详情描述，可选                                                                                          | `ReactNode` | `--`    |
| disabled    | 禁用点击                                                                                                      | `boolean`   | `false` |
| icon        | 步骤图标的类型，可选                                                                                          | `ReactNode` | `--`    |
| status      | 指定状态。当不配置该属性时，会使用 Steps 的 `current` 来自动指定状态。可选：`wait` `process` `finish` `error` | `string`    | `wait`  |
| subTitle    | 子标题                                                                                                        | `ReactNode` | `--`    |
| title       | 标题                                                                                                          | `ReactNode` | `--`    |
