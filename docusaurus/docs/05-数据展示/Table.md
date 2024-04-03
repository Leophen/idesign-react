---
title: Table 表格
---

表格是⼀种对数据的结构化呈现⽅式，用于展示行列数据。

## 引入

```js
import {Table} from 'idesign';
```

## 基本用法

`dataSource` 传入表格数据源，`columns` 传入列数据。

```jsx live fff
function App() {
    const data = [
        {
            key: '1',
            name: '张三',
            age: 32,
            address: '浦东新区纳贤路'
        },
        {
            key: '2',
            name: '李四',
            age: 42,
            address: '浦东新区金科路'
        }
    ];

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age'
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address'
        }
    ];

    return (
        <Table dataSource={data} columns={columns} />
    );
}
```

## 不同尺寸

通过 `size` 属性控制表格尺寸，包括：

- 常规型（默认）
- 宽松型（large）
- 紧凑型（small）

```jsx live fff
function App() {
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park'
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park'
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        }
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Age',
            dataIndex: 'age'
        },
        {
            title: 'Address',
            dataIndex: 'address'
        }
    ];

    return (
        <div>
            <h4>常规型</h4>
            <Table columns={columns} dataSource={data} />
            <h4>宽松型</h4>
            <Table columns={columns} dataSource={data} size="large" />
            <h4>紧凑型</h4>
            <Table columns={columns} dataSource={data} size="small" />
        </div>
    );
}
```

## 表格操作

配置 `columns > render` 自定义表格操作。

```jsx live fff
function App() {
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park'
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park'
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        }
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Table.Space>
                    <a>Invite {record.name}</a>
                    <a disabled>Delete</a>
                </Table.Space>
            )
        }
    ];

    return (
        <Table dataSource={data} columns={columns} />
    );
}
```

## 表格单选

可以通过 `rowSelection > type` 属性指定选择类型，默认为 `checkbox`，设为 `radio` 时展示单选表格。

```jsx live fff
function App() {
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park'
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park'
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        },
        {
            key: '4',
            name: 'Disabled User',
            age: 99,
            address: 'Sidney No. 1 Lake Park'
        }
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: text => <a>{text}</a>
        },
        {
            title: 'Age',
            dataIndex: 'age'
        },
        {
            title: 'Address',
            dataIndex: 'address'
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User'
        })
    };

    return (
        <Table
            rowSelection={{
                type: 'radio',
                ...rowSelection
            }}
            dataSource={data}
            columns={columns}
        />
    );
}
```

## 表格多选

可以通过 `rowSelection > type` 属性指定选择类型，默认为 `checkbox`，不设置时默认展示多选表格。

```jsx live fff
function App() {
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park'
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park'
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        },
        {
            key: '4',
            name: 'Disabled User',
            age: 99,
            address: 'Sidney No. 1 Lake Park'
        }
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: text => <a>{text}</a>
        },
        {
            title: 'Age',
            dataIndex: 'age'
        },
        {
            title: 'Address',
            dataIndex: 'address'
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User'
        })
    };

    return (
        <Table
            rowSelection={rowSelection}
            dataSource={data}
            columns={columns}
        />
    );
}
```

## 自定义选择

通过 `rowSelection > selections` 自定义选择项，默认不显示下拉选项，设为 `true` 时显示默认选择项。

```jsx live fff
function App() {
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park'
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park'
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        },
        {
            key: '4',
            name: 'Disabled User',
            age: 99,
            address: 'Sidney No. 1 Lake Park'
        }
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: text => <a>{text}</a>
        },
        {
            title: 'Age',
            dataIndex: 'age'
        },
        {
            title: 'Address',
            dataIndex: 'address'
        }
    ];

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const rowSelection = {
        selectedRowKeys,
        onChange: selectedRowKeys => {
            setSelectedRowKeys(selectedRowKeys);
        },
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: keys => {
                    const newKeys = keys.filter((key, index) => index % 2 === 0);
                    setSelectedRowKeys(newKeys);
                }
            },
            {
                key: 'even',
                text: 'Select Even Row',
                onSelect: keys => {
                    const newKeys = keys.filter((key, index) => index % 2 !== 0);
                    setSelectedRowKeys(newKeys);
                }
            }
        ]
    };

    return (
        <Table
            rowSelection={rowSelection}
            dataSource={data}
            columns={columns}
        />
    );
}
```

## 排序和筛选

- 配置 `columns > sorter` 可以对表格进行排序；
  - `defaultSortOrder` 可设置列的默认排序顺序，可选值为 `ascend〡descend`；
  - `sortDirections` 可改变每列可用的排序方式，切换排序时按数组内容依次切换 `['ascend' | 'descend']`
- 配置 `columns > filters` 可以对表格进行筛选，`filters` 是一个数组，包含要筛选的信息。
  - `onFilter` 可用于筛选当前数据；
  - `filterMultiple` 可用于指定多选和单选。

```jsx live fff
function App() {
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park'
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park'
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        },
        {
            key: '4',
            name: 'Jim Red',
            age: 32,
            address: 'London No. 2 Lake Park'
        }
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Age',
            dataIndex: 'age',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age
        },
        {
            title: 'Address',
            dataIndex: 'address',
            filters: [
                {
                    text: 'London',
                    value: 'London'
                },
                {
                    text: 'New York',
                    value: 'New York'
                }
            ],
            // filterMultiple: false,
            onFilter: (value, record) => record.address.indexOf(value) === 0
        }
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <Table dataSource={data} columns={columns} onChange={onChange} />
    );
}
```

## 排序优先级

配置 `columns > sorter > multiple` 来控制多列排序的优先级，通过 `columns > sorter > compare` 来配置排序逻辑。

```jsx live fff
function App() {
    const data = [
        {
            key: '1',
            name: 'John Adam',
            chinese: 11,
            math: 22,
            english: 34
        },
        {
            key: '2',
            name: 'Jim Ben',
            chinese: 12,
            math: 24,
            english: 33
        },
        {
            key: '3',
            name: 'Joe Cook',
            chinese: 13,
            math: 21,
            english: 32
        },
        {
            key: '4',
            name: 'Jim Daniel',
            chinese: 14,
            math: 23,
            english: 31
        }
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Chinese Score',
            dataIndex: 'chinese',
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 3
            }
        },
        {
            title: 'Math Score',
            dataIndex: 'math',
            sorter: {
                compare: (a, b) => a.math - b.math,
                multiple: 2
            }
        },
        {
            title: 'English Score',
            dataIndex: 'english',
            sorter: {
                compare: (a, b) => a.english - b.english,
                multiple: 1
            }
        }
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <Table dataSource={data} columns={columns} onChange={onChange} />
    );
}
```

## 树形筛选菜单

配置 `columns > filterMode` 来修改筛选菜单的模式，可选值有 `menu`（默认）和 `tree`（树形）

```jsx live fff
function App() {
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tel: '13795231418'
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tel: '13795231419'
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tel: '13795231420'
        },
        {
            key: '4',
            name: 'Jim Red',
            age: 32,
            address: 'London No. 2 Lake Park',
            tel: '18995231418'
        }
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            filters: [
                {
                    text: 'Joe',
                    value: 'Joe'
                },
                {
                    text: 'Category 1',
                    value: 'Category 1',
                    children: [
                        {
                            text: 'Yellow',
                            value: 'Yellow'
                        },
                        {
                            text: 'Pink',
                            value: 'Pink'
                        }
                    ]
                },
                {
                    text: 'Category 2',
                    value: 'Category 2',
                    children: [
                        {
                            text: 'Green',
                            value: 'Green'
                        },
                        {
                            text: 'Black',
                            value: 'Black'
                        }
                    ]
                }
            ],
            filterMode: 'tree',
            onFilter: (value, record) => record.name.includes(value),
            width: '30%'
        },
        {
            title: 'Age',
            dataIndex: 'age'
        },
        {
            title: 'Address',
            dataIndex: 'address'
        },
        {
            title: 'Tel',
            dataIndex: 'tel'
        }
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <Table dataSource={data} columns={columns} onChange={onChange} />
    );
}
```

## 筛选可搜索

配置 `columns > filterSearch` 来控制筛选菜单是否可搜索，默认为 `false`，不展示搜索框。

- `filterMode` 为 `tree` 时，filterSearch 支持 `true` 和 `false`；
- `filterMode` 为 `menu` 时，filterSearch 支持 `true` 和 `false`，同时支持自定义搜索方法：`function(searchValue, filterItem):boolean`

:::note 默认搜索方法

```ts
(searchValue: string, filterItem: ColumnFilterItem) =>
    filterItem.text?.toString().toLowerCase().indexOf(searchValue.trim().toLowerCase()) > -1
```

:::

```jsx live fff
function App() {
    const data = [
        {
            key: '1',
            name: 'John Brown',
            gender: 'male',
            address: 'New York No. 1 Lake Park',
            tel: '13795231418'
        },
        {
            key: '2',
            name: 'Jim Green',
            gender: 'male',
            address: 'London No. 1 Lake Park',
            tel: '13795231419'
        },
        {
            key: '3',
            name: 'Joe Black',
            gender: 'male',
            address: 'Sidney No. 1 Lake Park',
            tel: '13795231420'
        },
        {
            key: '4',
            name: 'Jim Red',
            gender: 'female',
            address: 'London No. 2 Lake Park',
            tel: '18995231418'
        }
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '30%',
            filterMode: 'tree',
            filterSearch: true,
            filters: [
                {
                    text: 'Joe',
                    value: 'Joe'
                },
                {
                    text: 'Category 1',
                    value: 'Category 1',
                    children: [
                        {
                            text: 'Yellow',
                            value: 'Yellow'
                        },
                        {
                            text: 'Pink',
                            value: 'Pink'
                        }
                    ]
                },
                {
                    text: 'Category 2',
                    value: 'Category 2',
                    children: [
                        {
                            text: 'Green',
                            value: 'Green'
                        },
                        {
                            text: 'Black',
                            value: 'Black'
                        }
                    ]
                }
            ],
            onFilter: (value, record) => record.name.includes(value)
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            filters: [
                {
                    text: '男',
                    value: 'male'
                },
                {
                    text: '女',
                    value: 'female'
                }
            ],
            filterSearch: true,
            onFilter: (value, record) => record.gender.startsWith(value)
        },
        {
            title: 'Address',
            dataIndex: 'address',
            filterSearch: (input, filter) => filter.text.indexOf(input) > -1,
            filters: [
                {
                    text: '这是一个展示文字超长效果的demo，我家在London',
                    value: 'London'
                },
                {
                    text: 'New York',
                    value: 'New York'
                }
            ],
            onFilter: (value, record) => record.address.startsWith(value)
        },
        {
            title: 'Tel',
            dataIndex: 'tel'
        }
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <Table dataSource={data} columns={columns} onChange={onChange} />
    );
}
```

## 受控的排序和筛选

配置 `columns > sortOrder & filteredValue` 即视为受控模式，可用受控属性对筛选和排序状态进行控制。

- 只支持同时对一列进行排序，请保证只有一列的 `sortOrder` 属性是生效的；
- 务必指定 `column > key`

```jsx live fff
function App() {
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park'
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park'
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        },
        {
            key: '4',
            name: 'Jim Red',
            age: 32,
            address: 'London No. 2 Lake Park'
        }
    ];

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const clearFilters = () => {
        setFilteredInfo(null);
    };

    const clearAll = () => {
        setFilteredInfo(null);
        setSortedInfo(null);
    };

    const setAgeSort = () => {
        setSortedInfo({
            order: 'descend',
            columnKey: 'age'
        });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filters: [
                {text: 'Joe', value: 'Joe'},
                {text: 'Jim', value: 'Jim'}
            ],
            filteredValue: filteredInfo?.name || null,
            onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo?.columnKey === 'name' && sortedInfo?.order,
            ellipsis: true
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo?.columnKey === 'age' && sortedInfo?.order,
            ellipsis: true
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            filters: [
                {text: 'London', value: 'London'},
                {text: 'New York', value: 'New York'}
            ],
            filteredValue: filteredInfo?.address || null,
            onFilter: (value, record) => record.address.includes(value),
            sorter: (a, b) => a.address.length - b.address.length,
            sortOrder: sortedInfo?.columnKey === 'address' && sortedInfo?.order,
            ellipsis: true
        }
    ];

    return (
        <>
            <div style={{marginBottom: 16}}>
                <Button style={{marginRight: 12}} onClick={setAgeSort}>Sort age</Button>
                <Button style={{marginRight: 12}} onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </div>
            <Table columns={columns} dataSource={data} onChange={handleChange} />
        </>
    );
}
```

## 远程加载数据

`dataSource` 数据可通过远程加载传入。

```jsx live fff
function App() {
    const columns = [
        {
            key: 'name',
            title: '名称',
            dataIndex: 'name'
        },
        {
            key: 'departmentName',
            title: '部门',
            dataIndex: 'departmentName'
        },
        {
            key: 'creator',
            title: '创建人',
            dataIndex: 'creator'
        }
    ];

    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    });
    const [loading, setLoading] = useState(false);

    const fetch = (params = {}) => {
        setLoading(true);
        request.post(
            'https://yapi.baidu-int.com/mock/23714/api/list',
            {
                pageNo: 1,
                pageSize: 10
            }
        )
            .then(res => {
                setData(res.result);
                setPagination({
                    ...params.pagination,
                    total: 200
                });
                setLoading(false);
            });
    };

    useEffect(() => {
        fetch({pagination});
    }, []);

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={pagination}
            loading={loading}
        />
    );
}
```

## 可展开表格

通过 `expandable` 属性控制表格是否可展开，其中 `expandedRowRender` 用于控制展开的内容，`rowExpandable` 用于控制可展开的条件。

```jsx live fff
function App() {
    const data = [
        {
            key: 1,
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
        },
        {
            key: 2,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
        },
        {
            key: 3,
            name: 'Not Expandable',
            age: 29,
            address: 'Jiangsu No. 1 Lake Park',
            description: 'This not expandable'
        },
        {
            key: 4,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
        }
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        }
    ];

    return (
        <Table
            dataSource={data}
            columns={columns}
            expandable={{
                expandedRowRender: record => <p>{record.description}</p>,
                rowExpandable: record => record.name !== 'Not Expandable'
            }}
        />
    );
}
```

## 特殊列排序

可以通过 `Table.EXPAND_COLUMN` 和 `Table.SELECTION_COLUMN` 来控制指定列的展开和可选择。

```jsx live fff
function App() {
    const data = [
        {
            key: 1,
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
        },
        {
            key: 2,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
        },
        {
            key: 3,
            name: 'Not Expandable',
            age: 29,
            address: 'Jiangsu No. 1 Lake Park',
            description: 'This not expandable'
        },
        {
            key: 4,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
        }
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        Table.EXPAND_COLUMN,
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age'
        },
        Table.SELECTION_COLUMN,
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        }
    ];

    return (
        <Table
            dataSource={data}
            columns={columns}
            rowSelection={{}}
            expandable={{
                expandedRowRender: record => <p>{record.description}</p>
            }}
        />
    );
}
```

## 嵌套子表格

通过 `expandable` 属性还可以控制表格嵌套子表格，展示每行数据更详细的信息。

```jsx live fff
function App() {
    const expandedRowRender = () => {
        const columns = [
            {title: 'Date', dataIndex: 'date', key: 'date'},
            {title: 'Name', dataIndex: 'name', key: 'name'},
            {title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum'}
        ];

        const data = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i,
                date: '2023-06-26 09:30:00',
                name: 'This is production name',
                upgradeNum: 'Upgraded: 56'
            });
        }
        return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    const columns = [
        {title: 'Name', dataIndex: 'name', key: 'name'},
        {title: 'Platform', dataIndex: 'platform', key: 'platform'},
        {title: 'Version', dataIndex: 'version', key: 'version'},
        {title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum'},
        {title: 'Creator', dataIndex: 'creator', key: 'creator'},
        {title: 'Date', dataIndex: 'createdAt', key: 'createdAt'},
        {title: 'Action', key: 'operation', render: () => <a>Publish</a>}
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
        data.push({
            key: i,
            name: 'Screem',
            platform: 'iOS',
            version: '10.3.4.5654',
            upgradeNum: 500,
            creator: 'Leophen',
            createdAt: '2023-06-26 09:30:00'
        });
    }

    return (
        <Table
            className="components-table-demo-nested"
            columns={columns}
            expandable={{expandedRowRender}}
            dataSource={data}
        />
    );
}
```

## 固定表头

通过设置 `scroll > y` 属性固定表头，方便一页内展示大量数据。

:::caution 注意

需要指定 `column` 的 `width` 属性，否则列头和内容可能不对齐。如果指定 `width` 不生效或出现白色垂直空隙，请尝试建议留一列不设宽度以适应弹性布局，或者检查是否有超长连续字段破坏布局。

:::

```jsx live fff
function App() {
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`
        });
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: 150
        },
        {
            title: 'Age',
            dataIndex: 'age',
            width: 150
        },
        {
            title: 'Address',
            dataIndex: 'address'
        }
    ];

    return (
        <Table
            dataSource={data}
            columns={columns}
            pagination={{pageSize: 50}}
            scroll={{y: 240}}
        />
    );
}
```

## 固定列

通过设置 `scroll > x` 属性固定列，横向滚动查看其它数据。

:::caution 注意

若列头与内容不对齐或出现列重复，请指定固定列的宽度 `width`。

如果指定 `width` 不生效或出现白色垂直空隙，请尝试建议留一列不设宽度以适应弹性布局，或者检查是否有超长连续字段破坏布局。

建议指定 `scroll.x` 为大于表格宽度的固定值或百分比，注意且非固定列宽度之和不要超过 `scroll.x`

:::

```jsx live fff
function App() {
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York Park'
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 40,
            address: 'London Park'
        }
    ];

    const columns = [
        {
            title: 'Full Name',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left'
        },
        {
            title: 'Age',
            width: 100,
            dataIndex: 'age',
            key: 'age',
            fixed: 'left'
        },
        {title: 'Column 1', dataIndex: 'address', key: '1'},
        {title: 'Column 2', dataIndex: 'address', key: '2'},
        {title: 'Column 3', dataIndex: 'address', key: '3'},
        {title: 'Column 4', dataIndex: 'address', key: '4'},
        {title: 'Column 5', dataIndex: 'address', key: '5'},
        {title: 'Column 6', dataIndex: 'address', key: '6'},
        {title: 'Column 7', dataIndex: 'address', key: '7'},
        {title: 'Column 8', dataIndex: 'address', key: '8'},
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: () => <a>action</a>
        }
    ];

    return (
        <Table
            dataSource={data}
            columns={columns}
            scroll={{x: 1300}}
        />
    );
}
```

## 固定头和列

通过设置 `scroll > x + y` 可以同时固定头和列，适合同时展示有大量数据和数据列。

:::caution 注意

若列头与内容不对齐或出现列重复，请指定固定列的宽度 `width`，如果指定 `width` 不生效或出现白色垂直空隙，请尝试建议留一列不设宽度以适应弹性布局，或者检查是否有超长连续字段破坏布局

建议指定 `scroll.x` 为大于表格宽度的固定值或百分比，注意且非固定列宽度之和不要超过 `scroll.x`

:::

```jsx live fff
function App() {
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: `我的名字很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长${i}`,
            age: 32,
            address: `London Park no. ${i}`
        });
    }

    const columns = [
        {
            title: 'Full Name',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            ellipsis: true,
            render(name) {
                return (
                    <Popover content={name} placement="right" trigger="hover">
                        <span style={{
                            display: 'block',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                        >
                            <span>{name}</span>
                        </span>
                    </Popover>
                );
            }
        },
        {
            title: 'Age',
            width: 100,
            dataIndex: 'age',
            key: 'age'
        },
        {
            title: 'Column 1',
            dataIndex: 'address',
            key: '1',
            width: 150,
            render(address) {
                return <Popover content={address} trigger="hover">{address}</Popover>;
            }
        },
        {
            title: 'Column 2',
            dataIndex: 'address',
            key: '2',
            width: 150
        },
        {
            title: 'Column 3',
            dataIndex: 'address',
            key: '3',
            width: 150
        },
        {
            title: 'Column 4',
            dataIndex: 'address',
            key: '4',
            width: 150
        },
        {
            title: 'Column 5',
            dataIndex: 'address',
            key: '5',
            width: 150,
            render(address) {
                return <Popover content={address} placement="right" trigger="hover">{address}</Popover>;
            }
        },
        {
            title: 'Column 6',
            dataIndex: 'address',
            key: '6',
            width: 150
        },
        {
            title: 'Column 7',
            dataIndex: 'address',
            key: '7',
            width: 150
        },
        {title: 'Column ', dataIndex: 'address', key: '8'},
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: () => <a>action</a>
        }
    ];

    return (
        <Table
            dataSource={data}
            columns={columns}
            scroll={{x: 1500, y: 300}}
        />
    );
}
```

## 随页面滚动的固定

对于长表格，需要滚动才能查看表头和滚动条，那么现在可以设置跟随页面固定表头和滚动条。

```jsx live fff
function App() {
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: `Edrward ${i}`,
            age: 32,
            address: `London Park no. ${i}`
        });
    }

    const columns = [
        {
            title: 'Full Name',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left'
        },
        {
            title: 'Age',
            width: 100,
            dataIndex: 'age',
            key: 'age',
            fixed: 'left'
        },
        {
            title: 'Column 1',
            dataIndex: 'address',
            key: '1',
            width: 150
        },
        {
            title: 'Column 2',
            dataIndex: 'address',
            key: '2',
            width: 150
        },
        {
            title: 'Column 3',
            dataIndex: 'address',
            key: '3',
            width: 150
        },
        {
            title: 'Column 4',
            dataIndex: 'address',
            key: '4',
            width: 150
        },
        {
            title: 'Column 5',
            dataIndex: 'address',
            key: '5',
            width: 150
        },
        {
            title: 'Column 6',
            dataIndex: 'address',
            key: '6',
            width: 150
        },
        {
            title: 'Column 7',
            dataIndex: 'address',
            key: '7',
            width: 150
        },
        {
            title: 'Column 8',
            dataIndex: 'address',
            key: '8'
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: () => <a>action</a>
        }
    ];

    const [fixedTop, setFixedTop] = useState(false);

    return (
        <Table
            columns={columns}
            dataSource={data}
            scroll={{x: 1500}}
            summary={pageData => (
                <Table.Summary fixed={fixedTop ? 'top' : 'bottom'}>
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0} colSpan={2}>
                            <Switch
                                checkedChildren="Fixed Top"
                                unCheckedChildren="Fixed Top"
                                checked={fixedTop}
                                onChange={() => {
                                    setFixedTop(!fixedTop);
                                }}
                            />
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={2} colSpan={8}>
                            Scroll Context
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={10}>
                            Fix Right
                        </Table.Summary.Cell>
                    </Table.Summary.Row>
                </Table.Summary>
            )}
            sticky
        />
    );
}
```

## 嵌套树结构

表格支持树形数据的展示，当数据中有 `children` 字段时会自动展示为树形表格，如果不需要或配置为其他字段可以用 `childrenColumnName` 进行配置。

另外，表格可通过 `indentSize` 属性控制每一层的缩进宽度。

```jsx live fff
function App() {
    const data = [
        {
            key: 1,
            name: '章三',
            age: 60,
            address: '上海市浦东新区',
            children: [
                {
                    key: 11,
                    name: '李思',
                    age: 42,
                    address: '上海市浦东新区一条很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的路700号'
                },
                {
                    key: 12,
                    name: '王二',
                    age: 30,
                    address: '北京市海淀区',
                    children: [
                        {
                            key: 121,
                            name: '赵五',
                            age: 16,
                            address: '上海市浦东新区一条很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的路701号'
                        }
                    ]
                },
                {
                    key: 13,
                    name: '周六',
                    age: 72,
                    address: '上海市浦东新区',
                    children: [
                        {
                            key: 131,
                            name: '孙7',
                            age: 42,
                            address: '北京市海淀区',
                            children: [
                                {
                                    key: 1311,
                                    name: '刘8',
                                    age: 25,
                                    address: '成都市'
                                },
                                {
                                    key: 1312,
                                    name: '吴9',
                                    age: 18,
                                    address: '上海市浦东新区一条很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的路702号'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            key: 2,
            name: '鱼10',
            age: 32,
            address: '北京市西城区'
        }
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: '50%'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            width: '30%',
            key: 'address'
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        }
    };

    return (
        <Table
            dataSource={data}
            columns={columns}
            rowSelection={rowSelection}
            expandIndex={2}
        />
    );
}
```

## 表头分组

`columns[n]` 可以内嵌 `children`，以渲染分组表头。

```jsx live fff
function App() {
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: 'John Brown',
            age: i + 1,
            street: 'Lake Park',
            building: 'C',
            number: 2035,
            companyAddress: 'Lake Street 42',
            companyName: 'SoftLake Co',
            gender: 'M'
        });
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 100,
            fixed: 'left',
            filters: [
                {
                    text: 'Joe',
                    value: 'Joe'
                },
                {
                    text: 'John',
                    value: 'John'
                }
            ],
            onFilter: (value, record) => record.name.indexOf(value) === 0
        },
        {
            title: 'Other',
            children: [
                {
                    title: 'Age',
                    dataIndex: 'age',
                    key: 'age',
                    width: 150,
                    sorter: (a, b) => a.age - b.age
                },
                {
                    title: 'Address',
                    children: [
                        {
                            title: 'Street',
                            dataIndex: 'street',
                            key: 'street',
                            width: 150
                        },
                        {
                            title: 'Block',
                            children: [
                                {
                                    title: 'Building',
                                    dataIndex: 'building',
                                    key: 'building',
                                    width: 100
                                },
                                {
                                    title: 'Door No.',
                                    dataIndex: 'number',
                                    key: 'number',
                                    width: 100
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            title: 'Company',
            children: [
                {
                    title: 'Company Address',
                    dataIndex: 'companyAddress',
                    key: 'companyAddress',
                    width: 200
                },
                {
                    title: 'Company Name',
                    dataIndex: 'companyName',
                    key: 'companyName'
                }
            ]
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            width: 80,
            fixed: 'right'
        }
    ];

    return (
        <Table
            dataSource={data}
            columns={columns}
            scroll={{x: 'calc(700px + 50%)', y: 240}}
        />
    );
}
```

## 表头 JSX 写法

`columns` 支持以下 JSX 风格的写法，可用于合并表头列项。

```jsx live fff
function App() {
    const data = [
        {
            key: '1',
            firstName: 'John',
            lastName: 'Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer']
        },
        {
            key: '2',
            firstName: 'Jim',
            lastName: 'Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser']
        },
        {
            key: '3',
            firstName: 'Joe',
            lastName: 'Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher']
        }
    ];

    const {Column, ColumnGroup} = Table;

    return (
        <Table dataSource={data}>
            <ColumnGroup title="Name">
                <Column title="First Name" dataIndex="firstName" key="firstName" />
                <Column title="Last Name" dataIndex="lastName" key="lastName" />
            </ColumnGroup>
            <Column title="Age" dataIndex="age" key="age" />
            <Column title="Address" dataIndex="address" key="address" />
            <Column
                title="Tags"
                dataIndex="tags"
                key="tags"
                render={tags => (
                    <>
                        {tags.map(tag => (
                            <Tag key={tag}>
                                {tag}
                            </Tag>
                        ))}
                    </>
                )}
            />
            <Column
                title="Action"
                key="action"
                render={(text, record) => (
                    <Table.Space>
                        <a>Invite {record.lastName}</a>
                        <a>Delete</a>
                    </Table.Space>
                )}
            />
        </Table>
    );
}
```

## 表格行/列合并

表格的行/列可进行合并，当 `columns > onCell` 的 `colSpan` 或 `rowSpan` 为 0 时，对应的表格不会渲染。

```jsx live fff
function App() {
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            tel: '0571-22098909',
            phone: 18889898989,
            address: 'New York No. 1 Lake Park'
        },
        {
            key: '2',
            name: 'Jim Green',
            tel: '0571-22098333',
            phone: 18889898888,
            age: 42,
            address: 'London No. 1 Lake Park'
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            tel: '0575-22098909',
            phone: 18900010002,
            address: 'Sidney No. 1 Lake Park'
        },
        {
            key: '4',
            name: 'Jim Red',
            age: 18,
            tel: '0575-22098909',
            phone: 18900010002,
            address: 'London No. 2 Lake Park'
        },
        {
            key: '5',
            name: 'Jake White',
            age: 18,
            tel: '0575-22098909',
            phone: 18900010002,
            address: 'Dublin No. 2 Lake Park'
        }
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, row, index) => <a>{text}</a>,
            onCell: (_, index) => ({
                colSpan: index < 4 ? 1 : 5
            })
        },
        {
            title: 'Age',
            dataIndex: 'age',
            onCell: (_, index) => {
                if (index === 4) {
                    return {colSpan: 0};
                }
            }
        },
        {
            title: 'Home phone',
            colSpan: 2,
            dataIndex: 'tel',
            onCell: (_, index) => {
                if (index === 2) {
                    return {rowSpan: 2};
                }
                if (index === 3) {
                    return {rowSpan: 0};
                }
                if (index === 4) {
                    return {colSpan: 0};
                }
            }
        },
        {
            title: 'Phone',
            colSpan: 0,
            dataIndex: 'phone',
            onCell: (_, index) => {
                if (index === 4) {
                    return {colSpan: 0};
                }
            }
        },
        {
            title: 'Address',
            dataIndex: 'address',
            onCell: (_, index) => {
                if (index === 4) {
                    return {colSpan: 0};
                }
            }
        }
    ];

    return (
        <Table columns={columns} dataSource={data} />
    );
}
```

## 单元格超出省略

配置 `column > ellipsis` 可以让单元格内容根据宽度自动省略。

:::caution 注意

列头缩略暂不支持和排序筛选一起使用。

:::

```jsx live fff
function App() {
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
            tags: ['nice', 'developer']
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park, London No. 2 Lake Park',
            tags: ['loser']
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher']
        }
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 150
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: 80
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address 1',
            ellipsis: true
        },
        {
            title: 'Long Column Long Column Long Column',
            dataIndex: 'address',
            key: 'address 2',
            ellipsis: true
        },
        {
            title: 'Long Column Long Column',
            dataIndex: 'address',
            key: 'address 3',
            ellipsis: true
        },
        {
            title: 'Long Column',
            dataIndex: 'address',
            key: 'address 4',
            ellipsis: true
        }
    ];

    return (
        <Table
            dataSource={data}
            columns={columns}
        />
    );
}
```

## 单元格省略提示

配置 `column > ellipsis > showTitle` 为 false 关闭单元格内容省略后的默认提示, 在 `column > render` 中使用 `Tooltip` 替代。

```jsx live fff
function App() {
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
            tags: ['nice', 'developer']
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park, London No. 2 Lake Park',
            tags: ['loser']
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher']
        }
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 150
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: 80
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address 1',
            ellipsis: {
                showTitle: false
            },
            render: address => (
                <Tooltip placement="topLeft" title={address}>
                    {address}
                </Tooltip>
            )
        },
        {
            title: 'Long Column Long Column Long Column',
            dataIndex: 'address',
            key: 'address 2',
            ellipsis: {
                showTitle: false
            },
            render: address => (
                <Tooltip placement="topLeft" title={address}>
                    {address}
                </Tooltip>
            )
        },
        {
            title: 'Long Column Long Column',
            dataIndex: 'address',
            key: 'address 3',
            ellipsis: {
                showTitle: false
            },
            render: address => (
                <Tooltip placement="topLeft" title={address}>
                    {address}
                </Tooltip>
            )
        },
        {
            title: 'Long Column',
            dataIndex: 'address',
            key: 'address 4',
            ellipsis: {
                showTitle: false
            },
            render: address => (
                <Tooltip placement="topLeft" title={address}>
                    {address}
                </Tooltip>
            )
        }
    ];

    return (
        <Table
            dataSource={data}
            columns={columns}
        />
    );
}
```

## 可编辑单元格

配置 `components` 展示带单元格编辑功能的表格。

```jsx live fff
function App() {
    const EditableContext = React.createContext(null);

    const EditableRow = ({index, ...props}) => {
        const [form] = Form.useForm();
        return (
            <Form form={form} component={false}>
                <EditableContext.Provider value={form}>
                    <tr {...props} />
                </EditableContext.Provider>
            </Form>
        );
    };

    const EditableCell = ({
        title,
        editable,
        children,
        dataIndex,
        record,
        handleSave,
        ...restProps
    }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef(null);
        const form = useContext(EditableContext);

        useEffect(() => {
            if (editing) {
                inputRef.current?.focus();
            }
        }, [editing]);

        const toggleEdit = () => {
            setEditing(!editing);
            form.setFieldsValue({[dataIndex]: record[dataIndex]});
        };

        const save = async () => {
            try {
                const values = await form.validateFields();

                toggleEdit();
                handleSave({...record, ...values});
            }
            catch (errInfo) {
                console.log('Save failed:', errInfo);
            }
        };

        let childNode = children;

        if (editable) {
            childNode = editing ? (
                <Form.Item
                    style={{margin: 0}}
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `${title} is required.`
                        }
                    ]}
                >
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                </Form.Item>
            ) : (
                <div className="editable-cell-value-wrap" style={{paddingRight: 24}} onClick={toggleEdit}>
                    {children}
                </div>
            );
        }

        return <td {...restProps}>{childNode}</td>;
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell
        }
    };

    const [data, setData] = useState([
        {
            key: '0',
            name: 'Edward King 0',
            age: '32',
            address: 'London, Park Lane no. 0'
        },
        {
            key: '1',
            name: 'Edward King 1',
            age: '32',
            address: 'London, Park Lane no. 1'
        }
    ]);

    const [count, setCount] = useState(2);

    const handleDelete = key => {
        const dataSource = [...data];
        setData(dataSource.filter(item => item.key !== key));
    };

    const handleAdd = () => {
        const newData = {
            key: count,
            name: `Edward King ${count}`,
            age: '32',
            address: `London, Park Lane no. ${count}`
        };
        setData([...data, newData]);
        setCount(count + 1);
    };

    const handleSave = row => {
        const newData = [...data];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row
        });
        setData(newData);
    };

    const initColumns = [
        {
            title: 'name',
            dataIndex: 'name',
            width: '30%',
            editable: true
        },
        {
            title: 'age',
            dataIndex: 'age'
        },
        {
            title: 'address',
            dataIndex: 'address',
            render: (address, record) => {
                const [popVisible, setPopVisible] = useState(false);
                const [form] = Form.useForm();
                const saveAddress = async () => {
                    try {
                        const {address: newAddress} = await form.validateFields();
                        const newData = [...data];
                        const index = newData.findIndex(item => item.key === record.key);
                        const item = newData[index];
                        newData.splice(index, 1, {
                            ...item,
                            address: newAddress
                        });
                        setData(newData);
                        setPopVisible(false);
                    }
                    catch (errInfo) {
                        console.log('Save failed:', errInfo);
                    }
                };
                const onPopVisibleChange = visible => {
                    setPopVisible(visible);
                };
                const cancelAddress = () => {
                    setPopVisible(false);
                };
                return (
                    <>
                        <span>{address}</span>
                        <Popover
                            placement="top"
                            visible={popVisible}
                            trigger="click"
                            onVisibleChange={onPopVisibleChange}
                            content={(
                                <div className="table-update-address">
                                    <Form
                                        form={form}
                                        initialValues={{
                                            address: address
                                        }}
                                    >
                                        <Form.Item name="address">
                                            <Input placeholder="请输入地址" limitLength={30} />
                                        </Form.Item>
                                        <p className="tip">支持大小写字母，数字和"-_/."以字母开头, 不超过30个字</p>
                                        <div className="action-content">
                                            <Button style={{marginRight: 8}} type="primary" onClick={saveAddress}>确定</Button>
                                            <Button onClick={cancelAddress}>取消</Button>
                                        </div>
                                    </Form>
                                </div>
                            )}
                        >
                            <OutlinedEditingSquare className="edit-cell-icon" />
                        </Popover>
                    </>
                );
            }
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) =>
                (data.length >= 1 ? (
                    <a onClick={() => handleDelete(record.key)}>Delete</a>
                ) : null)
        }
    ];

    const columns = initColumns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: record => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleSave
            })
        };
    });

    return (
        <div>
            <Button
                onClick={handleAdd}
                type="primary"
                style={{marginBottom: 16}}
            >
                Add a row
            </Button>
            <Table
                dataSource={data}
                columns={columns}
                components={components}
                rowClassName={() => 'editable-row'}
            />
        </div>
    );
}
```

## 可编辑行的表格

同理，可以通过 `components` 配置可编辑行的表格。

```jsx live fff
function App() {
    const originData = [];
    for (let i = 0; i < 100; i++) {
        originData.push({
            key: i.toString(),
            name: `Edrward ${i}`,
            age: 32,
            address: `London Park no. ${i}`
        });
    }

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        children,
        ...restProps
    }) => {
        const inputNode = inputType === 'number' ? <InputNumber size={'small'} /> : <Input size={'small'} />;

        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{margin: 0}}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`
                            }
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = record => record.key === editingKey;

    const add = () => {
        const newKey = data.length.toString();
        const newData = [...data];
        const row = {name: '', age: '', address: '', key: newKey, isNew: true};
        newData.push(row);
        setData(newData);
        edit(row);
    };

    const edit = record => {
        form.setFieldsValue({name: '', age: '', address: '', ...record});
        setEditingKey(record.key);
    };

    const cancel = record => {
        // 新增行，删除
        if (record.isNew) {
            const newData = [...data];
            const index = newData.findIndex(item => record.key === item.key);
            if (index > -1) {
                newData.splice(index, 1);
                setData(newData);
            }
        }
        setEditingKey('');
    };

    const save = async key => {
        try {
            const row = (await form.validateFields());
            row.isNew = false;

            const newData = [...data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row
                });
                setData(newData);
                setEditingKey('');
            }
            else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        }
        catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            width: '25%',
            editable: true
        },
        {
            title: 'age',
            dataIndex: 'age',
            width: '15%',
            editable: true
        },
        {
            title: 'address',
            dataIndex: 'address',
            width: '40%',
            editable: true
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Table.Space>
                        <Button size={'small'} onClick={() => save(record.key)}>
                            保存
                        </Button>
                        <a style={{lineHeight: '24px'}} onClick={() => cancel(record)}>{record.isNew ? '删除' : '取消'}</a>
                    </Table.Space>
                ) : (
                    <Button size={'small'} disabled={editingKey !== ''} onClick={() => edit(record)}>
                        编辑
                    </Button>
                );
            }
        }
    ];

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: record => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record)
            })
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                dataSource={data}
                columns={mergedColumns}
                size="large"
                components={{
                    body: {
                        cell: EditableCell
                    }
                }}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel
                }}
            />
            <Button
                style={{marginTop: 10}}
                type="primary"
                disabled={editingKey !== ''}
                onClick={add}
            >
                新增
            </Button>
        </Form>
    );
}
```

## 拖拽排序表格

使用自定义元素，可以集成 [react-dnd](https://github.com/react-dnd/react-dnd) 来实现拖拽排序，引入以下模块：

```js
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import update from 'immutability-helper';
```

示例：

```jsx live fff
function App() {
    const type = 'DraggableBodyRow';

    const DraggableBodyRow = ({index, moveRow, className, style, ...restProps}) => {
        const ref = useRef();
        const [{isOver, dropClassName}, drop] = useDrop({
            accept: type,
            collect: monitor => {
                const {index: dragIndex} = monitor.getItem() || {};
                if (dragIndex === index) {
                    return {};
                }
                return {
                    isOver: monitor.isOver(),
                    dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward'
                };
            },
            drop: item => {
                moveRow(item.index, index);
            }
        });
        const [, drag] = useDrag({
            type,
            item: {index},
            collect: monitor => ({
                isDragging: monitor.isDragging()
            })
        });
        drop(drag(ref));

        return (
            <tr
                ref={ref}
                className={`${className}${isOver ? dropClassName : ''}`}
                style={{cursor: 'move', ...style}}
                {...restProps}
            />
        );
    };

    const [data, setData] = useState([
        {
            key: '1',
            name: 'zhangsan',
            age: 32,
            address: 'pudong'
        },
        {
            key: '2',
            name: 'lisi',
            age: 42,
            address: 'pudong'
        },
        {
            key: '3',
            name: 'wanger',
            age: 32,
            address: 'pudong'
        }
    ]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        }
    ];

    const components = {
        body: {
            row: DraggableBodyRow
        }
    };

    const moveRow = useCallback(
        (dragIndex, hoverIndex) => {
            const dragRow = data[dragIndex];
            setData(
                update(data, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragRow]
                    ]
                })
            );
        },
        [data]
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <Table
                columns={columns}
                dataSource={data}
                components={components}
                onRow={(record, index) => ({
                    index,
                    moveRow
                })}
            />
        </DndProvider>
    );
}
```

## 可伸缩列

可通过 `components` 集成 [react-resizable](https://github.com/react-grid-layout/react-resizable) 来实现可伸缩列。如果有排序需要，可以通过[额外标记](https://codesandbox.io/s/zrj8xvyzxx)来阻止触发排序。引入以下模块：

```js
import {Resizable} from 'react-resizable';
```

示例：

```jsx live fff
function App() {
    const ResizableTitle = props => {
        const {onResize, width, ...restProps} = props;

        if (!width) {
            return <th {...restProps} />;
        }

        return (
            <Resizable
                width={width}
                height={0}
                handle={
                    <span
                        className="react-resizable-handle"
                        onClick={e => {
                            e.stopPropagation();
                        }}
                    />
                }
                onResize={onResize}
                draggableOpts={{enableUserSelectHack: false}}
            >
                <th {...restProps} />
            </Resizable>
        );
    };

    const Demo = () => {
        const components = {
            header: {
                cell: ResizableTitle
            }
        };

        const data = [
            {
                key: 0,
                date: '2018-02-11',
                amount: 120,
                type: 'income',
                note: 'transfer'
            },
            {
                key: 1,
                date: '2018-03-11',
                amount: 243,
                type: 'income',
                note: 'transfer'
            },
            {
                key: 2,
                date: '2018-04-11',
                amount: 98,
                type: 'income',
                note: 'transfer'
            }
        ];

        const [currentColumns, setCurrentColumns] = useState([
            {
                title: 'Date',
                dataIndex: 'date',
                width: 200
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                width: 100,
                showSorterTooltip: false,
                sorter: (a, b) => a.amount - b.amount
            },
            {
                title: 'Type',
                dataIndex: 'type',
                width: 100
            },
            {
                title: 'Note',
                dataIndex: 'note',
                width: 100
            },
            {
                title: 'Action',
                key: 'action',
                render: () => <a>Delete</a>
            }
        ]);

        const handleResize = index => (e, {size}) => {
            const nextColumns = [...currentColumns];
            nextColumns[index] = {
                ...nextColumns[index],
                width: size.width
            };
            setCurrentColumns(nextColumns);
        };

        const columns = currentColumns.map((col, index) => ({
            ...col,
            onHeaderCell: column => ({
                width: column.width,
                onResize: handleResize(index)
            })
        }));

        return (
            <Table
                id="components-table-demo-resizable-column"
                components={components}
                columns={columns}
                dataSource={data}
            />
        );
    };

    return (
        <Demo />
    );
}
```
  
## 总结栏

通过 `summary` 属性设置总结栏，同时使用 `Table.Summary.Cell` 可以同步 Column 的固定状态，可以通过配置 `Table.Summary` 的 `fixed` 属性使其固定。

```jsx live fff
function App() {
    const data = [
        {
            key: '1',
            name: 'John Brown',
            borrow: 10,
            repayment: 33
        },
        {
            key: '2',
            name: 'Jim Green',
            borrow: 100,
            repayment: 0
        },
        {
            key: '3',
            name: 'Joe Black',
            borrow: 10,
            repayment: 10
        },
        {
            key: '4',
            name: 'Jim Red',
            borrow: 75,
            repayment: 45
        }
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Borrow',
            dataIndex: 'borrow'
        },
        {
            title: 'Repayment',
            dataIndex: 'repayment'
        }
    ];

    const fixedColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            fixed: true,
            width: 100
        },
        {
            title: 'Description',
            dataIndex: 'description'
        }
    ];

    const fixedData = [];
    for (let i = 0; i < 20; i += 1) {
        fixedData.push({
            key: i,
            name: ['Light', 'Bamboo', 'Little'][i % 3],
            description: 'Everything that has a beginning, has an end.'
        });
    }

    return (
        <>
            <Table
                dataSource={data}
                columns={columns}
                pagination={false}
                summary={pageData => {
                    let totalBorrow = 0;
                    let totalRepayment = 0;

                    pageData.forEach(({borrow, repayment}) => {
                        totalBorrow += borrow;
                        totalRepayment += repayment;
                    });

                    return (
                        <>
                            <Table.Summary.Row>
                                <Table.Summary.Cell>Total</Table.Summary.Cell>
                                <Table.Summary.Cell>
                                    {totalBorrow}
                                </Table.Summary.Cell>
                                <Table.Summary.Cell>
                                    {totalRepayment}
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                            <Table.Summary.Row>
                                <Table.Summary.Cell>Balance</Table.Summary.Cell>
                                <Table.Summary.Cell colSpan={2}>
                                    {totalBorrow - totalRepayment}
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        </>
                    );
                }}
            />

            <br />

            <Table
                dataSource={fixedData}
                columns={fixedColumns}
                pagination={false}
                scroll={{x: 2000, y: 500}}
                summary={() => (
                    <Table.Summary fixed>
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0}>Summary</Table.Summary.Cell>
                            <Table.Summary.Cell index={1}>This is a summary content</Table.Summary.Cell>
                        </Table.Summary.Row>
                    </Table.Summary>
                )}
            />
        </>
    );
}
```

## 虚拟列表

通过 `react-window` 引入虚拟滚动方案，实现 100000 条数据的高性能表格，引入以下模块：

```js
import {VariableSizeGrid as Grid} from 'react-window';
import ResizeObserver from 'rc-resize-observer';
```

示例：

```jsx live fff fix1
function App() {
    const VirtualTable = props => {
        const {columns, scroll} = props;
        const [tableWidth, setTableWidth] = useState(0);

        const widthColumnCount = columns?.filter(({width}) => !width).length;
        const mergedColumns = columns?.map(column => {
            if (column.width) {
                return column;
            }

            return {
                ...column,
                width: Math.floor(tableWidth / widthColumnCount)
            };
        });

        const gridRef = useRef();
        const [connectObject] = useState(() => {
            const obj = {};
            Object.defineProperty(obj, 'scrollLeft', {
                get: () => null,
                set: scrollLeft => {
                    if (gridRef.current) {
                        gridRef.current.scrollTo({scrollLeft});
                    }
                }
            });

            return obj;
        });

        const resetVirtualGrid = () => {
            gridRef.current.resetAfterIndices({
                columnIndex: 0,
                shouldForceUpdate: true
            });
        };

        useEffect(() => {
            resetVirtualGrid();
        }, [tableWidth]);

        function renderVirtualList(rawData, {scrollbarSize, ref, onScroll}) {
            ref.current = connectObject;
            const totalHeight = rawData.length * 54;

            return (
                <Grid
                    ref={gridRef}
                    className="virtual-grid"
                    columnCount={mergedColumns.length}
                    columnWidth={index => {
                        const {width} = mergedColumns[index];
                        return totalHeight > scroll?.y && index === mergedColumns.length - 1
                            ? (width) - scrollbarSize - 1
                            : (width);
                    }}
                    height={scroll?.y}
                    rowCount={rawData.length}
                    rowHeight={() => 54}
                    width={tableWidth}
                    onScroll={({scrollLeft}) => {
                        onScroll({scrollLeft});
                    }}
                >
                    {({
                        columnIndex,
                        rowIndex,
                        style
                    }) => (
                        <div
                            className={classNames('virtual-table-cell', {
                                'virtual-table-cell-last': columnIndex === mergedColumns.length - 1
                            })}
                            style={style}
                        >
                            {(rawData[rowIndex])[(mergedColumns)[columnIndex].dataIndex]}
                        </div>
                    )}
                </Grid>
            );
        }

        return (
            <ResizeObserver
                onResize={({width}) => {
                    setTableWidth(width);
                }}
            >
                <Table
                    {...props}
                    className="virtual-table"
                    columns={mergedColumns}
                    pagination={false}
                    components={{
                        body: renderVirtualList
                    }}
                />
            </ResizeObserver>
        );
    };

    const columns = [
        {title: 'A', dataIndex: 'key', width: 150},
        {title: 'B', dataIndex: 'key'},
        {title: 'C', dataIndex: 'key'},
        {title: 'D', dataIndex: 'key'},
        {title: 'E', dataIndex: 'key', width: 200},
        {title: 'F', dataIndex: 'key', width: 100}
    ];

    const data = Array.from({length: 100000}, (_, key) => ({key}));

    return (
        <VirtualTable
            columns={columns}
            dataSource={data}
            scroll={{y: 300, x: '100vw'}}
        />
    );
}
```

## 响应式配置列

配置 `columns > responsive` 控制响应式配置列。

```jsx live fff
function App() {
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park'
        }
    ];

    const columns = [
        {
            title: 'Name (all screens)',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>
        },
        {
            title: 'Age (medium screen or bigger)',
            dataIndex: 'age',
            key: 'age',
            responsive: ['md']
        },
        {
            title: 'Address (large screen or bigger)',
            dataIndex: 'address',
            key: 'address',
            responsive: ['lg']
        }
    ];

    return (
        <Table
            dataSource={data}
            columns={columns}
        />
    );
}
```

## 表格的分页位置

可通过 `pagination` 属性控制表格分页的位置。

```jsx live fff
function App() {
    const data = [
        {
            key: '1',
            name: '张三',
            age: 32,
            address: '浦东新区纳贤路'
        },
        {
            key: '2',
            name: '李四',
            age: 42,
            address: '浦东新区金科路'
        }
    ];

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age'
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address'
        }
    ];

    const topOptions = [
        {label: 'topLeft', value: 'topLeft'},
        {label: 'topCenter', value: 'topCenter'},
        {label: 'topRight', value: 'topRight'},
        {label: 'none', value: 'none'}
    ];

    const bottomOptions = [
        {label: 'bottomLeft', value: 'bottomLeft'},
        {label: 'bottomCenter', value: 'bottomCenter'},
        {label: 'bottomRight', value: 'bottomRight'},
        {label: 'none', value: 'none'}
    ];

    const [top, setTop] = useState('topLeft');
    const [bottom, setBottom] = useState('bottomRight');

    return (
        <>
            <div>
                <Radio.Group
                    style={{marginBottom: 10}}
                    options={topOptions}
                    value={top}
                    onChange={e => {
                        setTop(e.target.value);
                    }}
                />
            </div>
            <Radio.Group
                style={{marginBottom: 10}}
                options={bottomOptions}
                value={bottom}
                onChange={e => {
                    setBottom(e.target.value);
                }}
            />
            <Table
                dataSource={data}
                columns={columns}
                pagination={{position: [top, bottom]}}
            />
        </>
    );
}
```

## 空状态

表格数据为空时展示「暂无数据」的空状态。

```jsx live fff
function App() {
    const data = [];

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age'
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address'
        }
    ];

    return (
        <Table dataSource={data} columns={columns} />
    );
}
```

## API

### Table

| 参数              | 说明                                                                                 | 类型                                                                                                      | 默认值                                                   |
| ----------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| bordered          | 是否展示外边框和列边框                                                               | `boolean`                                                                                                 | `false`                                                  |
| columns           | 表格列的配置描述                                                                     | `ColumnsType[]`                                                                                           | `--`                                                     |
| components        | 覆盖默认的 table 元素                                                                | `TableComponents`                                                                                         | `--`                                                     |
| dataSource        | 数据数组                                                                             | `object[]`                                                                                                | `--`                                                     |
| expandable        | 配置展开属性                                                                         | `expandable`                                                                                              | `--`                                                     |
| footer            | 表格尾部                                                                             | `function(currentPageData)`                                                                               | `--`                                                     |
| getPopupContainer | 设置表格内各类浮层的渲染节点，如筛选菜单                                             | `(triggerNode) => HTMLElement`                                                                            | `() => TableHtmlElement`                                 |
| loading           | 页面是否加载中                                                                       | `boolean`〡`Loading Props`                                                                                | `false`                                                  |
| locale            | 默认文案设置，目前包括排序、过滤、空数据文案                                         | `object`                                                                                                  |
| pagination        | 分页器，设为 false 时不展示和进行分页                                                | `object`                                                                                                  | `--`                                                     |
| rowClassName      | 表格行的类名                                                                         | `string`                                                                                                  | `--`                                                     |
| rowKey            | 表格行 key 的取值，可以是字符串或一个函数                                            | `string`〡`function(record): string`                                                                      | `key`                                                    |
| rowSelection      | 表格行是否可选择，配置项                                                             | `object`                                                                                                  | `--`                                                     |
| scroll            | 表格是否可滚动，也可以指定滚动区域的宽、高，配置项                                   | `object`                                                                                                  | `--`                                                     |
| showHeader        | 是否显示表头                                                                         | `boolean`                                                                                                 | `true`                                                   |
| showSorterTooltip | 表头是否显示下一次排序的 tooltip 提示，当参数类型为对象时，将被设置为 Tooltip 的属性 | `boolean`〡`Tooltip props`                                                                                | `true`                                                   |
| size              | 表格大小                                                                             | `default`（高40px）〡`large`（高60px）〡`small`（高32px）                                                 | `default`                                                |
| sortDirections    | 支持的排序方式                                                                       | `Array<ascend〡descend>`                                                                                  | `[ascend, descend]`                                      |
| sticky            | 设置粘性头部和滚动条                                                                 | `boolean`〡`{offsetHeader?: number, offsetScroll?: number, getContainer?: () => HTMLElement}`             | `--`                                                     |
| summary           | 总结栏                                                                               | `(currentData) => ReactNode`                                                                              | `--`                                                     |
| tableLayout       | 表格元素的 `table-layout` 属性，设为 fixed 表示内容不会影响列的布局                  | `-`〡`auto`〡`fixed`                                                                                      | 固定表头/列或使用 `column.ellipsis` 时，默认值为 `fixed` |
| title             | 表格标题                                                                             | `function(currentPageData)`                                                                               | `--`                                                     |
| onChange          | 分页、排序、筛选变化时触发                                                           | `function(pagination, filters, sorter, extra: { currentDataSource: [], action: paginate〡sort〡filter })` | `--`                                                     |
| onHeaderRow       | 设置头部行属性                                                                       | `function(columns, index)`                                                                                | `--`                                                     |
| onRow             | 设置行属性                                                                           | `function(record, index)`                                                                                 | `--`                                                     |
| expandIndex       | 设置 children 数据展示时，展开图标显示在第几列                                       | `number`                                                                                                  | `1`                                                      |

### onRow 用法

适用于 `onRow` `onHeaderRow` `onCell` `onHeaderCell`。

```jsx
<Table
    onRow={record => {
        return {
            onClick: event => {}, // 点击行
            onDoubleClick: event => {},
            onContextMenu: event => {},
            onMouseEnter: event => {}, // 鼠标移入行
            onMouseLeave: event => {}
        };
    }}
    onHeaderRow={(columns, index) => {
        return {
            onClick: () => {}, // 点击表头行
        };
    }}
/>
```

### Column

列描述数据对象，是 columns 中的一项，Column 使用相同的 API。

| 参数                          | 说明                                                                                                                                                                                            | 类型                                                               | 默认值              | 版本 |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------- | ---- |
| align                         | 设置列的对齐方式                                                                                                                                                                                | `left` \| `right` \| `center`                                      | `left`              |      |
| className                     | 列样式类名                                                                                                                                                                                      | `string`                                                           | `--`                |      |
| colSpan                       | 表头列合并,设置为 0 时，不渲染                                                                                                                                                                  | `number`                                                           | `--`                |      |
| dataIndex                     | 列数据在数据项中对应的路径，支持通过数组查询嵌套路径                                                                                                                                            | `string` \| `string[]`                                             | `--`                |      |
| defaultFilteredValue          | 默认筛选值                                                                                                                                                                                      | `string[]`                                                         | `--`                |      |
| defaultSortOrder              | 默认排序顺序                                                                                                                                                                                    | `ascend` \| `descend`                                              | `--`                |      |
| editable                      | 是否可编辑                                                                                                                                                                                      | `boolean`                                                          | `false`             |      |
| ellipsis                      | 超过宽度将自动省略，暂不支持和排序筛选一起使用。<br />设置为 `true` 或 `{ showTitle?: boolean }` 时，表格布局将变成 `tableLayout="fixed"`。                                                     | `boolean` \| `{ showTitle?: boolean }`                             | `false`             |      |
| filterDropdown                | 可以自定义筛选菜单，此函数只负责渲染图层，需要自行编写各种交互                                                                                                                                  | `ReactNode` \| `() => ReactNode`                                   | `--`                |      |
| filterDropdownVisible         | 用于控制自定义筛选菜单是否可见                                                                                                                                                                  | `boolean`                                                          | `--`                |      |
| filtered                      | 标识数据是否经过过滤，筛选图标会高亮                                                                                                                                                            | `boolean`                                                          | `false`             |      |
| filteredValue                 | 筛选的受控属性，外界可用此控制列的筛选状态，值为已筛选的 value 数组                                                                                                                             | `string[]`                                                         | `--`                |      |
| filterIcon                    | 自定义 filter 图标。                                                                                                                                                                            | `ReactNode` \| `(filtered: boolean) => ReactNode`                  | `false`             |      |
| filterMultiple                | 是否多选                                                                                                                                                                                        | `boolean`                                                          | `true`              |      |
| filterMode                    | 指定筛选菜单的用户界面                                                                                                                                                                          | `'menu'` \| `'tree'`                                               | `'menu'`            |      |
| filterSearch                  | 筛选菜单项是否可搜索                                                                                                                                                                            | `boolean` \| `filterSearchFunc`                                    | `false`             |
| filters                       | 表头的筛选菜单项                                                                                                                                                                                | `object[]`                                                         | `--`                |      |
| fixed                         | （IE 下无效）列是否固定，可选 true (等效于 left) `left` `right`                                                                                                                                 | `boolean` \| `string`                                              | `false`             |      |
| key                           | React 需要的 key，如果已经设置了唯一的 `dataIndex`，可以忽略这个属性                                                                                                                            | `string`                                                           | `--`                |      |
| render                        | 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引                                                                                                                                | `function(text, record, index) {}`                                 | `--`                |      |
| responsive                    | 响应式 breakpoint 配置列表。未设置则始终可见。                                                                                                                                                  | `[Breakpoint][]`                                                   | `--`                |      |
| shouldCellUpdate              | 自定义单元格渲染时机                                                                                                                                                                            | `(record, prevRecord) => boolean`                                  | `--`                |      |
| showSorterTooltip             | 表头显示下一次排序的 tooltip 提示, 覆盖 table 中 `showSorterTooltip`                                                                                                                            | `boolean` \| `Tooltip props`                                       | `true`              |      |
| sortDirections                | 支持的排序方式，覆盖 `Table` 中 `sortDirections`， 取值为 `ascend` `descend`                                                                                                                    | `Array`                                                            | `[ascend, descend]` |      |
| sorter                        | 排序函数，本地排序使用一个函数(参考 [Array.sort](https://developer.mozilla.org/en`--`US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 的 compareFunction)，需要服务端排序可设为 true | `function` \| `boolean`                                            | `--`                |      |
| sortOrder                     | 排序的受控属性，外界可用此控制列的排序，可设置为 `ascend` `descend` false                                                                                                                       | `boolean` \| `string`                                              | `--`                |      |
| title                         | 列头显示文字                                                                                                                                                                                    | `ReactNode` \| `({ sortOrder, sortColumn, filters }) => ReactNode` | `--`                |      |
| width                         | 列宽度                                                                                                                                                                                          | `string` \| `number`                                               | `--`                |      |
| onCell                        | 设置单元格属性                                                                                                                                                                                  | `function(record, rowIndex)`                                       | `--`                |      |
| onFilter                      | 本地模式下，确定筛选的运行函数                                                                                                                                                                  | `function`                                                         | `--`                |      |
| onFilterDropdownVisibleChange | 自定义筛选菜单可见变化时调用                                                                                                                                                                    | `function(visible) {}`                                             | `--`                |      |
| onHeaderCell                  | 设置头部单元格属性                                                                                                                                                                              | `function(column)`                                                 | `--`                |      |

### ColumnGroup

| 参数  | 说明         | 类型        | 默认值 |
| ----- | ------------ | ----------- | ------ |
| title | 列头显示文字 | `ReactNode` | `--`   |

### Space

| 参数  | 说明 | 类型                 | 默认值 |
| ----- | ---- | -------------------- | ------ |
| space | 间距 | `number` \| `string` | `12`   |

### pagination

分页的配置项，可选值：

- `topLeft`
- `topCenter`
- `topRight`
- `bottomLeft`
- `bottomCenter`
- `bottomRight`

| 参数     | 说明               | 类型            | 默认值            |
| -------- | ------------------ | --------------- | ----------------- |
| position | 指定分页显示的位置 | `Array<string>` | `['bottomRight']` |

### expandable

展开功能的配置。

| 参数                   | 说明                                             | 类型                                                   | 默认值     |
| ---------------------- | ------------------------------------------------ | ------------------------------------------------------ | ---------- |
| childrenColumnName     | 指定树形结构的列名                               | `string`                                               | `children` |
| columnWidth            | 自定义展开列宽度                                 | `string` \| `number`                                   | `--`       |
| defaultExpandAllRows   | 初始时，是否展开所有行                           | `boolean`                                              | `false`    |
| defaultExpandedRowKeys | 默认展开的行                                     | `string[]`                                             | `--`       |
| expandedRowClassName   | 展开行的 className                               | `function(record, index, indent): string`              | `--`       |
| expandedRowKeys        | 展开的行，控制属性                               | `string[]`                                             | `--`       |
| expandedRowRender      | 额外的展开行                                     | `function(record, index, indent, expanded): ReactNode` | `--`       |
| expandIcon             | 自定义展开图标                                   | `function(props): ReactNode`                           | `--`       |
| expandRowByClick       | 通过点击行来展开子行                             | `boolean`                                              | `false`    |
| fixed                  | 控制展开图标是否固定，可选 `true` `left` `right` | `boolean` \| `string`                                  | `false`    |
| indentSize             | 展示树形数据时，每层缩进的宽度，以 px 为单位     | `number`                                               | `31`       |
| rowExpandable          | 设置是否允许行展开                               | `(record) => boolean`                                  | `--`       |
| showExpandColumn       | 设置是否展示行展开列                             | `boolean`                                              | `true`     |
| onExpand               | 点击展开图标时触发                               | `function(expanded, record)`                           | `--`       |
| onExpandedRowsChange   | 展开的行变化时触发                               | `function(expandedRows)`                               | `--`       |

### rowSelection

选择功能的配置。

| 参数                    | 说明                                            | 类型                                                    | 默认值     |
| ----------------------- | ----------------------------------------------- | ------------------------------------------------------- | ---------- |
| checkStrictly           | checkable 状态下节点受控                        | `boolean`                                               | true       |
| columnTitle             | 自定义列表选择框标题                            | `ReactNode`                                             | `--`       |
| columnWidth             | 自定义列表选择框宽度                            | `string` \| `number`                                    | `32px`     |
| fixed                   | 把选择框列固定在左边                            | `boolean`                                               | `--`       |
| getCheckboxProps        | 选择框的默认属性配置                            | `function(record)`                                      | `--`       |
| hideSelectAll           | 隐藏全选勾选框与自定义选择项                    | `boolean`                                               | `false`    |
| preserveSelectedRowKeys | 当数据被删除时仍然保留选项的 `key`              | `boolean`                                               | `--`       |
| renderCell              | 渲染勾选框，用法与 Column 的 `render` 相同      | `function(checked, record, index, originNode) {}`       | `--`       |
| selectedRowKeys         | 指定选中项的 key 数组，需要和 onChange 进行配合 | `string[]` \| `number[]`                                | `[]`       |
| defaultSelectedRowKeys  | 默认选中项的 key 数组                           | `string[]` \| `number[]`                                | `[]`       |
| selections              | 自定义选择项, 设为 `true` 时使用默认选择项      | `object[]` \| `boolean`                                 | `true`     |
| type                    | 多选/单选                                       | `checkbox` \| `radio`                                   | `checkbox` |
| onChange                | 选中项发生变化时的回调                          | `function(selectedRowKeys, selectedRows)`               | `--`       |
| onSelect                | 用户手动选择/取消选择某行的回调                 | `function(record, selected, selectedRows, nativeEvent)` | `--`       |
| onSelectAll             | 用户手动选择/取消选择所有行的回调               | `function(selected, selectedRows, changeRows)`          | `--`       |
| onSelectInvert          | 用户手动选择反选的回调                          | `function(selectedRowKeys)`                             | `--`       |
| onSelectNone            | 用户清空选择的回调                              | `function()`                                            | `--`       |

### scroll

| 参数                     | 说明                                                 | 类型                           | 默认值 |
| ------------------------ | ---------------------------------------------------- | ------------------------------ | ------ |
| scrollToFirstRowOnChange | 当分页、排序、筛选变化后是否滚动到表格顶部           | `boolean`                      | `--`   |
| x                        | 设置横向滚动，可设为像素值/百分比/true/'max-content' | `string` \| `number` \| `true` | `--`   |
| y                        | 设置纵向滚动，可设为像素值                           | `string` \| `number`           | `--`   |

### selection

| 参数     | 说明                       | 类型                          | 默认值 |
| -------- | -------------------------- | ----------------------------- | ------ |
| key      | React 需要的 key，建议设置 | `string`                      | `--`   |
| text     | 选择项显示的文字           | `ReactNode`                   | `--`   |
| onSelect | 选择项点击回调             | `function(changeableRowKeys)` | `--`   |
