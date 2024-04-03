---
title: Radio 单选框
---

多用于在一组选项中进行单项选择且选项互斥，一般需要提交的选择型控件。

## 引入

```js
import {Radio} from 'idesign';
```

## 基本用法

最简单的单选框形式。

```jsx live fff
function App() {
    const [checked, setChecked] = useState(false);

    const handleChange = val => {
        console.log(val);
        setChecked(val);
    };

    return (
        <div className="demo-column">
            <h5>无默认值</h5>
            <Radio>无默认值</Radio>

            <h5>有默认值（非受控）</h5>
            <Radio defaultValue={checked}>有默认值（非受控）</Radio>

            <h5>有固定值（受控）</h5>
            <Radio checked={checked}>有固定值（受控）</Radio>

            <h5>通用方法</h5>
            <Radio checked={checked} onChange={handleChange}>
                通用方法
            </Radio>
        </div>
    );
}
```

## 单选框组

使用 `Radio.Group` 可以包裹 `Radio` 形成一组单选框组。

```jsx live fff
function App() {
    const [selected, setSelected] = useState('2')

    const handleChange = (e) => {
        console.log(e)
        setSelected(e.target.value)
    }

    return (
        <div className="demo-column">
            <h5>无默认值</h5>
            <Radio.Group>
                <Radio value="1">选项一</Radio>
                <Radio value="2">选项二</Radio>
                <Radio value="3">选项三</Radio>
                <Radio value="4">选项四</Radio>
            </Radio.Group>

            <h5>有默认值（非受控）</h5>
            <Radio.Group defaultValue={selected}>
                <Radio value="1">选项一</Radio>
                <Radio value="2">选项二</Radio>
                <Radio value="3">选项三</Radio>
                <Radio value="4">选项四</Radio>
            </Radio.Group>

            <h5>有固定值（受控）</h5>
            <Radio.Group value={selected}>
                <Radio value="1">选项一</Radio>
                <Radio value="2">选项二</Radio>
                <Radio value="3">选项三</Radio>
                <Radio value="4">选项四</Radio>
            </Radio.Group>

            <h5>通用方法</h5>
            <Radio.Group value={selected} onChange={handleChange}>
                <Radio value="1">选项一</Radio>
                <Radio value="2">选项二</Radio>
                <Radio value="3">选项三</Radio>
                <Radio value="4">选项四</Radio>
            </Radio.Group>
        </div>
    );
}
```

## 单选框（按钮型）

```jsx live fff
<div className="demo-row">
    <Radio.Button checked type="radio-button">默认选中</Radio.Button>
    <Radio.Button type="radio-button">无默认值</Radio.Button>
</div>
```

## 单选框组（按钮型）

```jsx live fff
<Radio.Group>
    <Radio.Button value="1">选项一</Radio.Button>
    <Radio.Button value="2">选项二</Radio.Button>
    <Radio.Button value="3">选项三</Radio.Button>
    <Radio.Button value="4">选项四</Radio.Button>
</Radio.Group>
```

## 限制 label 长度

按钮形式的单选框可以对 `label` 进行限制，当长度超过指定长度时，会自动截断。

```jsx live fff
<div className="demo-column">
    <Radio limit={6}>123456789</Radio.Button>
    <Radio.Button limit={6}>123456789</Radio.Button>

    <Radio.Group>
        <Radio value="1">123456789</Radio>
        <Radio value="2">123456789</Radio>
        <Radio value="3">123456789</Radio>
        <Radio value="4">123456789</Radio>
    </Radio.Group>

    <Radio.Group>
        <Radio.Button value="1">123456789</Radio.Button>
        <Radio.Button value="2">123456789</Radio.Button>
        <Radio.Button value="3">123456789</Radio.Button>
        <Radio.Button value="4">123456789</Radio.Button>
    </Radio.Group>
</div>
```

## 传入 options 的用法

```jsx live fff
function App() {
    const options = [{
        value: 'js',
        label: 'JS'
    }, {
        value: 'css',
        label: 'CSS'
    }, {
        value: 'python',
        label: 'PYTHON'
    }, {
        value: 'java',
        label: 'JAVA'
    }, {
        value: 'go',
        label: 'GO'
    }, {
        value: 'ts',
        label: 'TS'
    }, {
        value: 'html',
        label: 'HTML'
    }];

    const [selected, setSelected] = useState("ts");

    const handleChange = (e) => {
        console.log(e);
        setSelected(e.target.value);
    };

    return (
        <div className="demo-column">
            <h5>一般 options 用法</h5>
            <Radio.Group
                value={selected}
                options={options}
                onChange={handleChange}
            />

            <h5>options + 按钮形式</h5>
            <Radio.Group
                optionType="button"
                value={selected}
                options={options}
                onChange={handleChange}
            />
        </div>
    );
}
```

## 禁用状态

```jsx live fff
function App() {
    const options = [{
        value: 'js',
        label: 'JS',
    }, {
        value: 'css',
        label: 'CSS',
    }, {
        value: 'python',
        label: 'PYTHON',
    }, {
        value: 'java',
        label: 'JAVA',
        disabled: true,
    }, {
        value: 'go',
        label: 'GO',
    }, {
        value: 'ts',
        label: 'TS',
    }, {
        value: 'html',
        label: 'HTML',
    }];

    const [selected, setSelected] = useState('ts');

    const handleChange = (e) => {
        console.log(e);
        setSelected(e.target.value);
    };

    return (
        <div className="demo-column">
            <h5>单项禁用</h5>
            <Radio disabled>未选中</Radio>
            <Radio.Button disabled>
                未选中
            </Radio.Button>

            <h5>单选框组局部禁用</h5>
            <Radio.Group value={selected} onChange={handleChange}>
                <Radio value="1">选项一</Radio>
                <Radio value="2" disabled>选项二</Radio>
                <Radio value="3">选项三</Radio>
            </Radio.Group>
            <Radio.Group value={selected} onChange={handleChange}>
                <Radio.Button value="1">选项一</Radio.Button>
                <Radio.Button value="2">选项二</Radio.Button>
                <Radio.Button value="3" disabled>选项三</Radio.Button>
            </Radio.Group>
            <Radio.Group
                value={selected}
                options={options}
                onChange={handleChange}
            />

            <h5>单选框组全局禁用</h5>
            <Radio.Group disabled value={selected} onChange={handleChange}>
                <Radio value="1">选项一</Radio>
                <Radio value="2">选项二</Radio>
                <Radio value="3">选项三</Radio>
            </Radio.Group>
            <Radio.Group disabled value={selected} onChange={handleChange}>
                <Radio.Button value="1">选项一</Radio.Button>
                <Radio.Button value="2">选项二</Radio.Button>
                <Radio.Button value="3">选项三</Radio.Button>
            </Radio.Group>
            <Radio.Group
                disabled
                optionType="button"
                value={selected}
                options={options}
                onChange={handleChange}
            />
        </div>
    );
}
```

## API

### Radio/RadioButton

| 参数      | 说明                              | 类型      | 默认值  |
| --------- | --------------------------------- | --------- | ------- |
| checked   | 是否选中                          | `boolean` | `false` |
| disabled  | 是否禁用                          | `boolean` | `false` |
| value     | 根据 value 进行比较，判断是否选中 | `any`     | `--`    |
| className | 自定义类名                        | `string`  | `--`    |

### RadioButton

| 参数  | 说明                      | 类型                  | 默认值 |
| ----- | ------------------------- | --------------------- | ------ |
| limit | 控制 label 超长时如何展示 | `number` \| `boolean` | `8`    |

:::caution 注意

- 值为 `false` 或 `0` 时，自适应宽度；
- 非零正整数，超过指定字符后省略展示；
- 其他情况，超过 `8` 字符省略展示。

:::

### RadioGroup

多用于在一组选项中进行单项选择且选项互斥，一般需要提交的选择型控件

| 参数       | 说明                        | 类型                       | 默认值    |
| ---------- | --------------------------- | -------------------------- | --------- |
| options    | 以配置形式设置子元素        | `string[]` \| `Array<...>` | `--`      |
| optionType | 用于设置 Radio options 类型 | `default`\|`button`        | `default` |
| value      | 用于设置当前选中的值        | `any`                      | `--`      |
| disabled   | 禁选所有子单选器            | `boolean`                  | `false`   |
| className  | 自定义类名                  | `string`                   | `--`      |
| enhance    | 增强样式，按钮样式时生效    | `boolean`                  | `false`   |
| onChange   | 选项变化时的回调函数        | `function(e: Event))`      | `--`      |
