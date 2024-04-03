---
title: Pagination 分页
---

展现的信息行数过多时，可采用分页控制单页内的信息数量，也可帮助用户快速到定位某一内容的位置。

## 引入

```js
import {Pagination} from 'idesign';
```

## 基本用法

```jsx live fffx
<Pagination defaultCurrent={1} total={50} />
```

## 页数较多

```jsx live fffx
<Pagination total={505} defaultCurrent={5} />
```

## 快速跳转

快速跳转到某一页。

```jsx live fffx
function App() {
    function onChange(pageNumber) {
        console.log('Page: ', pageNumber);
    }

    function showTotal(total) {
        return `共 ${total} 条`;
    }

    return (
        <div className="demo-column">
            <Pagination
                showQuickJumper
                defaultCurrent={2}
                total={500}
                onChange={onChange}
                showTotal={showTotal}
            />
            <Pagination
                showQuickJumper
                defaultCurrent={2}
                total={500}
                onChange={onChange}
                disabled
                showTotal={showTotal}
            />
        </div>
    );
}
```

## 每页条目数

改变每页显示条目数。

```jsx live fff
function App() {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    function onShowSizeChange(current, pageSize) {
        console.log(current, pageSize);
    }

    function showTotal(total) {
        return `共 ${total} 条`;
    }

    return (
        <div className="demo-column">
            <Pagination
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                defaultCurrent={1}
                total={500}
                showTotal={showTotal}
                onChange={(page, pageSize) => {
                    console.log(page, pageSize);
                }}
            />
            <Pagination
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                defaultCurrent={1}
                total={500}
                showTotal={showTotal}
                disabled
            />
            <Pagination
                showSizeChanger
                current={current}
                pageSize={pageSize}
                total={505}
                pageSizeOptions={[10, 20, 50, 100]}
                onChange={(page, pageSize) => {
                    console.log(page, pageSize);
                    setCurrent(page);
                    setPageSize(pageSize);
                }}
            />
        </div>
    );
}
```

## API

| 属性             | 说明                                                     | 类型                               | 默认值              |
| ---------------- | -------------------------------------------------------- | ---------------------------------- | ------------------- |
| current          | 当前页数                                                 | `number`                           | `--`                |
| defaultCurrent   | 默认的当前页数                                           | `number`                           | `1`                 |
| defaultPageSize  | 默认的每页条数                                           | `number`                           | `10`                |
| disabled         | 禁用分页                                                 | `boolean`                          | `--`                |
| hideOnSinglePage | 只有一页时是否隐藏分页器                                 | `boolean`                          | `false`             |
| itemRender       | 用于自定义页码的结构，可用于优化 SEO                     | `(page, type: 'page'`              | `'prev'`            |
| pageSize         | 每页条数                                                 | `number`                           | `--`                |
| pageSizeOptions  | 指定每页可以显示多少条                                   | `string[]`                         | `[10, 20, 50, 100]` |
| responsive       | 当 size 未指定时，根据屏幕宽度自动调整尺寸               | `boolean`                          | `--`                |
| showLessItems    | 是否显示较少页面内容                                     | `boolean`                          | `false`             |
| showQuickJumper  | 是否可以快速跳转至某页                                   | `boolean〡{ goButton: ReactNode }` | `false`             |
| showSizeChanger  | 是否展示 pageSize 切换器，当 total 大于 50 时默认为 true | `boolean`                          | `--`                |
| showTitle        | 是否显示原生 tooltip 页码提示                            | `boolean`                          | `true`              |
| showTotal        | 用于显示数据总量和当前数据顺序                           | `function(total, range)`           | `--`                |
| simple           | 当添加该属性时，显示为简单分页                           | `boolean`                          | `--`                |
| size             | 当为 small 时，是小尺寸分页                              | `default〡small`                   | `default`           |
| total            | 数据总数                                                 | `number`                           | `0`                 |
| onChange         | 页码改变的回调，参数是改变后的页码及每页条数             | `function(page, pageSize)`         | `--`                |
| onShowSizeChange | pageSize 变化的回调                                      | `function(current, size)`          | `--`                |
