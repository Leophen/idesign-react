---
title: Checkbox 多选框
---

在一组可选项中进行多项选择时；

单独使用可以表示两种状态之间的切换，和 `switch` 类似。区别在于切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## 引入

```js
import {Checkbox} from 'idesign';
```

## 基本用法

```jsx live fff
function App() {
    const [checked, setChecked] = useState(true);

    const handleChange = (e) => {
        console.log(e);
        setChecked(e.target.checked);
    };

    return (
        <div className="demo-column">
            <Checkbox>无默认值</Checkbox>
            <Checkbox defaultChecked={checked}>有默认值（非受控）</Checkbox>
            <Checkbox checked={checked}>有固定值（受控）</Checkbox>
            <Checkbox checked={checked} onChange={handleChange}>
                通用方法
            </Checkbox>
        </div>
    );
}
```

## 禁用状态

```jsx live fff
<div className="demo-column">
    <Checkbox defaultChecked={false} disabled>disabled</Checkbox>
    <Checkbox defaultChecked disabled>disabled</Checkbox>
</div>
```

## 多选框组

```jsx live fff
function App() {
    function onChange(checkedValues) {
        console.log('checked = ', checkedValues);
    }

    const plainOptions = ['Apple', 'Pear', 'Orange'];

    const options = [
        {label: 'Apple', value: 'Apple'},
        {label: 'Pear', value: 'Pear'},
        {label: 'Orange', value: 'Orange'}
    ];

    const optionsWithDisabled = [
        {label: 'Apple', value: 'Apple'},
        {label: 'Pear', value: 'Pear'},
        {label: 'Orange', value: 'Orange', disabled: false}
    ];

    return (
        <div className="demo-column">
            <Checkbox.Group options={plainOptions} defaultValue={['Apple']} onChange={onChange} />
            <Checkbox.Group options={options} defaultValue={['Pear']} onChange={onChange} />
            <Checkbox.Group
                options={optionsWithDisabled}
                disabled
                defaultValue={['Apple']}
                onChange={onChange}
            />
        </div>
    );
}
```

## 控制全选

```jsx live fff
function App() {
    const plainOptions = ['Apple', 'Pear', 'Orange'];
    const defaultCheckedList = ['Apple', 'Orange'];

    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);

    const onChange = list => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
    };

    const onCheckAllChange = e => {
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    return (
        <div className="demo-column">
            <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
            >
                Check all
            </Checkbox>
            <Checkbox.Group options={plainOptions} value={checkedList} onChange={onChange} />
        </div>
    );
}
```

## Checkbox Button

```jsx live fff
function App() {
    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    return (
        <div className="demo-row">
            <Checkbox.Button onChange={onChange}>Checkbox</Checkbox.Button>
            <Checkbox.Button onChange={onChange}>我的数据很长很长啊啊啊啊</Checkbox.Button>
            <Checkbox.Button disabled onChange={onChange}>disabled</Checkbox.Button>
            <Checkbox.Button disabled checked onChange={onChange}>disabled</Checkbox.Button>
        </div>
    );
}
```

## Checkbox Button 组

方便的从数组生成 Checkbox 组。

```jsx live fff
function App() {
    function onChange(checkedValues) {
        console.log('checked = ', checkedValues);
    }

    const plainOptions = ['Apple', 'Pear', 'Orange'];
    const options = [
        {label: 'Apple', value: 'Apple'},
        {label: 'Pear', value: 'Pear'},
        {label: 'Orange', value: 'Orange'}
    ];
    const optionsWithDisabled = [
        {label: 'Apple', value: 'Apple'},
        {label: 'Pear', value: 'Pear'},
        {label: 'Orange', value: 'Orange', disabled: false}
    ];
    const optionsWithDisabled2 = [
        {label: 'data1', value: 'data1'},
        {label: 'data2', value: 'data2', disabled: true},
        {label: 'data3', value: 'data3'}
    ];

    const optionsBigData = [];
    for (let i = 1; i < 20; i++) {
        optionsBigData.push({
            label: `data${i}`,
            value: `data${i}`
        });
    }

    return (
        <div className="demo-column">
            <Checkbox.Group optionType="button" options={plainOptions} defaultValue={['Apple']} onChange={onChange} />
            <Checkbox.Group optionType="button" options={options} defaultValue={['Pear']} onChange={onChange} />
            <Checkbox.Group
                optionType="button"
                options={optionsWithDisabled}
                disabled
                defaultValue={['Pear']}
                onChange={onChange}
            />
            <Checkbox.Group
                optionType="button"
                options={optionsWithDisabled2}
                defaultValue={['data1']}
                onChange={onChange}
            />
            <Checkbox.Group
                optionType="button"
                style={{flexWrap: 'wrap'}}
                options={optionsBigData}
                defaultValue={['data1']}
                onChange={onChange}
            />
        </div>
    );
}
```

## API

### Checkbox

| 参数           | 说明                                    | 类型                | 默认值  |
| -------------- | --------------------------------------- | ------------------- | ------- |
| autoFocus      | 自动获取焦点                            | `boolean`           | `false` |
| checked        | 指定当前是否选中                        | `boolean`           | `false` |
| defaultChecked | 初始是否选中                            | `boolean`           | `false` |
| disabled       | 失效状态                                | `boolean`           | `false` |
| indeterminate  | 设置 indeterminate 状态，只负责样式控制 | `boolean`           | `false` |
| onChange       | 变化时回调函数                          | `function(e:Event)` | `--`    |

### Checkbox Group

| 参数         | 说明                                                         | 类型                     | 默认值    |
| ------------ | ------------------------------------------------------------ | ------------------------ | --------- |
| defaultValue | 默认选中的选项                                               | `string[]`               | `[]`      |
| disabled     | 整组失效                                                     | `boolean`                | `false`   |
| name         | CheckboxGroup 下所有 `input[type="checkbox"]` 的 `name` 属性 | `string`                 | `--`      |
| options      | 指定可选项                                                   | `string[]〡Option[]`     | `[]`      |
| value        | 指定选中的选项                                               | `string[]`               | `[]`      |
| onChange     | 变化时回调函数                                               | `function(checkedValue)` | `--`      |
| optionType   | 用于设置 Checkbox options 类型                               | `default〡button`        | `default` |

### Checkbox Option

```typescript
interface Option {
    label: string;
    value: string;
    disabled?: boolean;
}
```

### Checkbox 方法

| 名称    | 描述     |
| ------- | -------- |
| blur()  | 移除焦点 |
| focus() | 获取焦点 |
