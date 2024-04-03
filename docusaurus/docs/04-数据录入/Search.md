---
title: Search 搜索
---

能让用户探索更多内容或筛选指定内容。

## 引入

```js
import {Search} from 'idesign';
```

## 基本用法

```jsx live fffx
<div className="demo-column">
    <Search defaultValue="json" allowClear />
    <Search
        placeholder="请输入名称"
        onSearch={(value) => {
            console.log(value);
        }}
    />
    <Search placeholder="请输入名称" disabled />
</div>
```

## 加强样式

```jsx live fffx
<div className="demo-column">
    <Search
        defaultValue="json"
        allowClear
        onSearch={value => {
            console.log(value);
        }}
        enterButton
    />
    <Search placeholder="请输入名称" enterButton allowClear />
    <Search placeholder="请输入名称" disabled enterButton />
</div>
```

## loading 状态

```jsx live fff
<div className="demo-column">
    <Search
        defaultValue="json"
        allowClear
        onSearch={value => {
            console.log(value);
        }}
        loading
    />
    <Search placeholder="请输入名称" enterButton allowClear loading />
</div>
```

## onSearch 的回调

```jsx live fff
<div className="demo-column">
    <Search
        defaultValue="json"
        allowClear
        multipleDefaultValue="name"
        multipleOption={[{value: 'name', label: '名称'}, {value: 'id', label: 'ID'}]}
        onSearch={value => {
            console.log(value);
        }}
    />
    <Search
        defaultValue="json"
        multipleDefaultValue="name"
        allowClear
        multipleOption={[{value: 'name', label: '名称', key: 'name'}, {value: 'id', label: 'ID', key: 'id'}]}
        onSearch={value => {
            console.log(value);
        }}
        onChangeMultiple={value => {
            console.log(value, 'onChangeMultiple');
        }}
    />
    <Search
        defaultValue="json"
        allowClear
        multipleValue="id"
        multipleOption={[{value: 'name', label: '名称', key: 'name'}, {value: 'id', label: 'ID', key: 'id'}]}
        onSearch={value => {
            console.log(value);
        }}
        onChangeMultiple={value => {
            console.log(value, 'onChangeMultiple');
        }}
    />
    <Search
        defaultValue="json"
        multipleDefaultValue="name"
        allowClear
        multipleOption={[{value: 'name', label: '名称', key: 'name'}, {value: 'id', label: 'ID', key: 'id'}]}
        onSearch={value => {
            console.log(value);
        }}
        disabled
    />
</div>
```

## 推荐 & 联想功能

```jsx live fff
function App() {
    const historyOptions = [
        {
            value: '最近搜过',
            label: '最近搜过',
            disabled: true
        },
        {
            value: 'acud',
            label: 'acud'
        },
        {
            value: '百度',
            label: '百度'
        },
        {
            value: '百度云',
            label: '百度云'
        }
    ];

    const options = [
        {
            value: 'acud',
            label: 'acud'
        },
        {
            value: '百度',
            label: '百度'
        },
        {
            value: '百度云',
            label: '百度云'
        }
    ];

    return (
        <div className="demo-column">
            <p>最近检索历史</p>
            <Input.AutoComplete options={historyOptions}>
                <Search
                    defaultValue="json"
                    allowClear
                    onSearch={value => {
                        console.log(value);
                    }}
                />
            </Input.AutoComplete>
            <p>联想检索</p>
            <Input.AutoComplete options={options}>
                <Search
                    defaultValue="json"
                    allowClear
                    onSearch={value => {
                        console.log(value);
                    }}
                />
            </Input.AutoComplete>
        </div>
    );
}
```

## API

| 参数                 | 说明                                         | 类型                        | 默认值 |
| -------------------- | -------------------------------------------- | --------------------------- | ------ |
| multipleOption       | 多条件搜索                                   | `LabeledValue[]`            | `[]`   |
| multipleValue        | 多条件搜索值                                 | `string〡number`            | `--`   |
| multipleDefaultValue | 多条件搜索默认值                             | `string〡number`            | `--`   |
| onChangeMultiple     | 多条件搜索 change                            | `(e: string〡number): void` | `--`   |
| onSearch             | 点击搜索图标、清除图标，或按下回车键时的回调 | `(e: any): void`            | `--`   |
