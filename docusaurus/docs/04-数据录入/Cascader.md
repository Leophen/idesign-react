---
title: Cascader 级联选择器
---

需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。

从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。

比起 Select 组件，可以在同一个浮层中完成选择，有较好的体验。

## 引入

```js
import {Cascader} from 'idesign';
```

## 基本用法

```jsx live fff
function App() {
    const options = [
        {
            label: '选项一',
            value: 'op1',
            children: [
                {
                    label: '选项一一',
                    value: 'op1-1',
                    children: [
                        {
                            label: '选项一一一',
                            value: 'op1-1-1'
                        }
                    ]
                },
                {
                    label: '选项一二',
                    value: 'op1-2'
                }
            ]
        },
        {
            label: '选项二',
            value: 'op2',
            children: [
                {
                    label: '选项二一',
                    value: 'op2-1',
                    children: [
                        {
                            label: '选项二一一',
                            value: 'op2-1-1'
                        }
                    ]
                }
            ]
        },
        {
            label: '选项三',
            value: 'op3',
            children: [
                {
                    label: '选项三一',
                    value: 'op3-1',
                    disabled: true
                },
                {
                    label: '选项三二',
                    value: 'op3-2',
                    disabled: true,
                    children: [
                        {
                            label: '选项三二一',
                            value: 'op3-2-1'
                        },
                        {
                            label: '选项三二二',
                            value: 'op3-2-2'
                        }
                    ]
                },
                {
                    label: '选项三三',
                    value: 'op3-3',
                    children: [
                        {
                            label: '选项三三一',
                            value: 'op3-3-1',
                            children: [
                                {
                                    label: '选项三三一一',
                                    value: 'op3-3-1-1'
                                },
                                {
                                    label: '选项三三一二',
                                    value: 'op3-3-1-2',
                                    disabled: true
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '选项三四',
                    value: 'op3-4'
                },
                {
                    label: '选项三五',
                    value: 'op3-5'
                },
                {
                    label: '选项三六',
                    value: 'op3-6'
                },
                {
                    label: '选项三七',
                    value: 'op3-7'
                },
                {
                    label: '选项三八',
                    value: 'op3-8'
                }
            ]
        }
    ];

    return (
        <Cascader options={options} />
    );
}
```

## 默认值

```jsx live fff
function App() {
    const options = [
        {
            label: '选项一',
            value: 'op1',
            children: [
                {
                    label: '选项一一',
                    value: 'op1-1',
                    children: [
                        {
                            label: '选项一一一',
                            value: 'op1-1-1'
                        }
                    ]
                },
                {
                    label: '选项一二',
                    value: 'op1-2'
                }
            ]
        },
        {
            label: '选项二',
            value: 'op2',
            children: [
                {
                    label: '选项二一',
                    value: 'op2-1',
                    children: [
                        {
                            label: '选项二一一',
                            value: 'op2-1-1'
                        }
                    ]
                }
            ]
        },
        {
            label: '选项三',
            value: 'op3',
            children: [
                {
                    label: '选项三一',
                    value: 'op3-1',
                    disabled: true
                },
                {
                    label: '选项三二',
                    value: 'op3-2',
                    children: [
                        {
                            label: '选项三二一',
                            value: 'op3-2-1'
                        }
                    ]
                },
                {
                    label: '选项三三',
                    value: 'op3-3',
                    children: [
                        {
                            label: '选项三三一',
                            value: 'op3-3-1',
                            children: [
                                {
                                    label: '选项三三一一',
                                    value: 'op3-3-1-1',
                                    children: []
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '选项三四',
                    value: 'op3-4'
                },
                {
                    label: '选项三五',
                    value: 'op3-5'
                },
                {
                    label: '选项三六',
                    value: 'op3-6'
                },
                {
                    label: '选项三七',
                    value: 'op3-7'
                },
                {
                    label: '选项三八',
                    value: 'op3-8'
                },
                {
                    label: '选项三九',
                    value: 'op3-9'
                }
            ]
        }
    ];

    const MAX_LEVEL = 5;
    const MAX_NUM = 9;
    const NUMBER_MAP = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];

    const auto = (level = 1, suffix = '') => {
        const res = [];
        for (let i = 0; i < MAX_NUM; i++) {
            const current = {
                label: `选项${suffix}${NUMBER_MAP[i]}`,
                value: `op${suffix}${NUMBER_MAP[i]}`,
                children: level < MAX_LEVEL
                    ? auto(level + 1, `${suffix}${NUMBER_MAP[i]}`)
                    : undefined
            };
            res.push(current);
        }
        return res;
    };

    const autoOptions = auto();
    const defaultValue = ['op3', 'op3-3', 'op3-3-1', 'op3-3-1-1'];
    const defaultValue2 = ['op三', 'op三一', 'op三一二', 'op三一二一', 'op三一二一一'];

    return (
        <div className="demo-column">
            <Cascader options={options} allowClear showSearch defaultValue={defaultValue} />
            <Cascader
                options={autoOptions}
                allowClear
                showSearch
                defaultValue={defaultValue2}
            />
        </div>
    );
}
```

## 不同位置

设置浮层预设位置

```jsx live fff
function App() {
    const options = [
        {
            label: '选项一',
            value: 'op1',
            children: [
                {
                    label: '选项一一',
                    value: 'op1-1',
                    children: [
                        {
                            label: '选项一一一',
                            value: 'op1-1-1'
                        }
                    ]
                },
                {
                    label: '选项一二',
                    value: 'op1-2'
                }
            ]
        },
        {
            label: '选项二',
            value: 'op2',
            children: [
                {
                    label: '选项二一',
                    value: 'op2-1',
                    children: [
                        {
                            label: '选项二一一',
                            value: 'op2-1-1'
                        }
                    ]
                }
            ]
        },
        {
            label: '选项三',
            value: 'op3',
            children: [
                {
                    label: '选项三一',
                    value: 'op3-1',
                    disabled: true
                },
                {
                    label: '选项三二',
                    value: 'op3-2',
                    disabled: true,
                    children: [
                        {
                            label: '选项三二一',
                            value: 'op3-2-1'
                        },
                        {
                            label: '选项三二二',
                            value: 'op3-2-2'
                        }
                    ]
                },
                {
                    label: '选项三三',
                    value: 'op3-3',
                    children: [
                        {
                            label: '选项三三一',
                            value: 'op3-3-1',
                            children: [
                                {
                                    label: '选项三三一一',
                                    value: 'op3-3-1-1'
                                },
                                {
                                    label: '选项三三一二',
                                    value: 'op3-3-1-2',
                                    disabled: true
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '选项三四',
                    value: 'op3-4'
                },
                {
                    label: '选项三五',
                    value: 'op3-5'
                },
                {
                    label: '选项三六',
                    value: 'op3-6'
                },
                {
                    label: '选项三七',
                    value: 'op3-7'
                },
                {
                    label: '选项三八',
                    value: 'op3-8'
                }
            ]
        }
    ];

    return (
        <Cascader options={options} popupPlacement="topLeft" />
    );
}
```

## 级联多选

```jsx live fff
function App() {
    const defaultOptions = [
        {
            label: '选项一',
            value: 'op1',
            children: [
                {
                    label: '选项一一',
                    value: 'op1-1',
                    children: [
                        {
                            label: '选项一一一',
                            value: 'op1-1-1',
                            isLeaf: false
                        }
                    ]
                },
                {
                    label: '选项一二',
                    value: 'op1-2'
                }
            ]
        },
        {
            label: '选项二',
            value: 'op2',
            children: [
                {
                    label: '选项二一',
                    value: 'op2-1',
                    children: [
                        {
                            label: '选项二一一',
                            value: 'op2-1-1'
                        }
                    ]
                }
            ]
        },
        {
            label: '选项三',
            value: 'op3',
            children: [
                {
                    label: '选项三一',
                    value: 'op3-1',
                    disabled: true
                },
                {
                    label: '选项三二',
                    value: 'op3-2',
                    disabled: true,
                    children: [
                        {
                            label: '选项三二一',
                            value: 'op3-2-1'
                        },
                        {
                            label: '选项三二二',
                            value: 'op3-2-2'
                        }
                    ]
                },
                {
                    label: '选项三三',
                    value: 'op3-3',
                    children: [
                        {
                            label: '选项三三一',
                            value: 'op3-3-1',
                            children: [
                                {
                                    label: '选项三三一一',
                                    value: 'op3-3-1-1'
                                },
                                {
                                    label: '选项三三一二',
                                    value: 'op3-3-1-2',
                                    disabled: true
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '选项三四',
                    value: 'op3-4'
                },
                {
                    label: '选项三五',
                    value: 'op3-5'
                },
                {
                    label: '选项三六',
                    value: 'op3-6'
                },
                {
                    label: '选项三七',
                    value: 'op3-7'
                },
                {
                    label: '选项三八',
                    value: 'op3-8'
                }
            ]
        },
        {
            label: '选项四',
            value: 'op4',
            children: [
                {
                    label: '选项四一',
                    value: 'op4-1',
                    disabled: true
                }
            ]
        }
    ];

    const [options, setOptions] = useState(defaultOptions);

    const loadData = selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        // load options lazily
        setTimeout(() => {
            targetOption.loading = false;
            targetOption.children = [
                {
                    label: `${targetOption.label}-1`,
                    value: `${targetOption.value}-1`
                },
                {
                    label: `${targetOption.label}-2`,
                    value: `${targetOption.value}-2`
                }
            ];
            setOptions([...options]);
        }, 1000);
    };

    return (
        <Cascader
            options={options}
            mode="multiple"
            showSearch
            maxTagTextLength={7}
            loadData={loadData}
            onChange={(value, options) => console.log(value, options)}
        />
    );
}
```

## 限制 Tag 数量

设置最多显示多少个 Tag，只适用于多选场景。

```jsx live fff
function App() {
    const options = [
        {
            label: '选项一',
            value: 'op1',
            children: [
                {
                    label: '选项一一',
                    value: 'op1-1',
                    children: [
                        {
                            label: '选项一一一',
                            value: 'op1-1-1'
                        }
                    ]
                },
                {
                    label: '选项一二',
                    value: 'op1-2'
                }
            ]
        },
        {
            label: '选项二',
            value: 'op2',
            children: [
                {
                    label: '选项二一',
                    value: 'op2-1',
                    children: [
                        {
                            label: '选项二一一',
                            value: 'op2-1-1'
                        }
                    ]
                }
            ]
        },
        {
            label: '选项三',
            value: 'op3',
            children: [
                {
                    label: '选项三一',
                    value: 'op3-1',
                    disabled: true
                },
                {
                    label: '选项三二',
                    value: 'op3-2',
                    disabled: true,
                    children: [
                        {
                            label: '选项三二一',
                            value: 'op3-2-1'
                        },
                        {
                            label: '选项三二二',
                            value: 'op3-2-2'
                        }
                    ]
                },
                {
                    label: '选项三三',
                    value: 'op3-3',
                    children: [
                        {
                            label: '选项三三一',
                            value: 'op3-3-1',
                            children: [
                                {
                                    label: '选项三三一一',
                                    value: 'op3-3-1-1'
                                },
                                {
                                    label: '选项三三一二',
                                    value: 'op3-3-1-2',
                                    disabled: true
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '选项三四',
                    value: 'op3-4'
                },
                {
                    label: '选项三五',
                    value: 'op3-5'
                },
                {
                    label: '选项三六',
                    value: 'op3-6'
                },
                {
                    label: '选项三七',
                    value: 'op3-7'
                },
                {
                    label: '选项三八',
                    value: 'op3-8'
                }
            ]
        }
    ];

    const defaultValue = [['op3', 'op3-1'], ['op3', 'op3-4'], ['op3', 'op3-5'], ['op3', 'op3-6']];

    return (
        <Cascader
            options={options}
            mode="multiple"
            showSearch
            defaultValue={defaultValue}
            maxTagCount={2}
            onChange={(value, options) => console.log(value, options)}
        />
    );
}
```

## 禁用状态

```jsx live fff
function App() {
    const options = [
        {
            label: '选项一',
            value: 'op1',
            children: [
                {
                    label: '选项一一',
                    value: 'op1-1',
                    children: [
                        {
                            label: '选项一一一',
                            value: 'op1-1-1'
                        }
                    ]
                },
                {
                    label: '选项一二',
                    value: 'op1-2'
                }
            ]
        },
        {
            label: '选项二',
            value: 'op2',
            disabled: true,
            children: [
                {
                    label: '选项二一',
                    value: 'op2-1',
                    children: [
                        {
                            label: '选项二一一',
                            value: 'op2-1-1'
                        }
                    ]
                }
            ]
        },
        {
            label: '选项三',
            value: 'op3',
            children: [
                {
                    label: '选项三一',
                    value: 'op3-1',
                    disabled: true
                },
                {
                    label: '选项三二',
                    value: 'op3-2',
                    children: [
                        {
                            label: '选项三二一',
                            value: 'op3-2-1'
                        }
                    ]
                }
            ]
        }
    ];

    const defaultValue = ['op3', 'op3-2', 'op3-2-1'];

    return (
        <div className="demo-column">
            <Cascader options={options} disabled />
            <Cascader options={options} disabled defaultValue={defaultValue} />
            <Cascader mode="multiple" options={options} disabled defaultValue={[defaultValue]} />
        </div>
    );
}
```

## 支持搜索

```jsx live fff
function App() {
    const options = [
        {
            label: '选项一',
            value: 'op1',
            children: [
                {
                    label: '选项一一',
                    value: 'op1-1',
                    children: [
                        {
                            label: '选项一一一',
                            value: 'op1-1-1'
                        }
                    ]
                },
                {
                    label: '选项一二',
                    value: 'op1-2'
                }
            ]
        },
        {
            label: '选项二',
            value: 'op2',
            children: [
                {
                    label: '选项二一',
                    value: 'op2-1',
                    children: [
                        {
                            label: '选项二一一',
                            value: 'op2-1-1'
                        }
                    ]
                }
            ]
        },
        {
            label: '选项三',
            value: 'op3',
            children: [
                {
                    label: '选项三一',
                    value: 'op3-1'
                },
                {
                    label: '选项三二',
                    value: 'op3-2',
                    children: [
                        {
                            label: '选项三二一',
                            value: 'op3-2-1'
                        },
                        {
                            label: '选项三二二',
                            value: 'op3-2-2'
                        }
                    ]
                }
            ]
        }
    ];

    return (
        <Cascader options={options} showSearch />
    );
}
```

## 动态加载

使用 `loadData` 实现动态加载选项。

:::caution 注意

`loadData` 与 `showSearch` 无法一起使用。

:::

```jsx live fff
function App() {
    const defaultOptions = [
        {
            value: 'op1',
            label: '选项一',
            isLeaf: false,
            loading: true
        },
        {
            value: 'op2',
            label: '选项二',
            isLeaf: false
        }
    ];

    const [options, setOptions] = useState(defaultOptions);

    const loadData = selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        // load options lazily
        setTimeout(() => {
            targetOption.loading = false;
            targetOption.children = [
                {
                    label: `${targetOption.label}一`,
                    value: `${targetOption.value}-1`
                },
                {
                    label: `${targetOption.label}二`,
                    value: `${targetOption.value}-2`
                }
            ];
            setOptions([...options]);
        }, 1000);
    };

    return (
        <Cascader
            options={options}
            loadData={loadData}
        />
    );
}
```

## API

| 参数                 | 说明                                                                                                 | 类型                                    | 默认值                                                       |
| -------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------ |
| allowClear           | 是否支持清除                                                                                         | `boolean`                               | `true`                                                       |
| autoFocus            | 自动获取焦点                                                                                         | `boolean`                               | `false`                                                      |
| bordered             | 是否有边框                                                                                           | `boolean`                               | `true`                                                       |
| changeOnSelect       | 当此项为 true 时，点选每级菜单选项值都会发生变化，具体见上面的演示                                   | `boolean`                               | `false`                                                      |
| className            | 自定义类名                                                                                           | `string`                                | `--`                                                         |
| defaultValue         | 默认的选中项                                                                                         | `string[]`〡`number[]`                  | `[]`                                                         |
| disabled             | 禁用                                                                                                 | `boolean`                               | `false`                                                      |
| displayRender        | 选择后展示的渲染函数                                                                                 | `(label, selectedOptions) => ReactNode` | `label => label.join('/')`                                   |
| dropdownRender       | 自定义下拉框内容                                                                                     | `(menus: ReactNode) => ReactNode`       | `--`                                                         |
| expandIcon           | 自定义次级菜单展开图标                                                                               | `ReactNode`                             | `--`                                                         |
| fieldNames           | 自定义 options 中 label name children 的字段                                                         | `object`                                | ` { label: 'label', value: 'value', children: 'children' } ` |
| getPopupContainer    | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。 | `function(triggerNode)`                 | `() => document.body`                                        |
| loadData             | 用于动态加载选项，无法与 `showSearch` 一起使用                                                       | `(selectedOptions) => void`             | `--`                                                         |
| maxTagTextLength     | 最大显示的 tag 文本长度，仅 `多选` 时有效                                                            | `number`                                | ``8``                                                        |
| mode                 | 设置 Cascader 的模式为多选                                                                           | `'multiple'`                            | `undefined`                                                  |
| notFoundContent      | 当下拉列表为空时显示的内容                                                                           | `string`                                | `Not Found`                                                  |
| options              | 可选项数据源                                                                                         | [Option](#option)[]                     | `--`                                                         |
| placeholder          | 输入框占位文本                                                                                       | `string`                                | `'请选择'`                                                   |
| popupClassName       | 自定义浮层类名                                                                                       | `string`                                | `--`                                                         |
| popupPlacement       | 浮层预设位置：`bottomLeft` `bottomRight` `topLeft` `topRight`                                        | `string`                                | `bottomLeft`                                                 |
| popupVisible         | 控制浮层显隐                                                                                         | `boolean`                               | `--`                                                         |
| showSearch           | 在选择框中显示搜索框                                                                                 | `boolean`〡[Object](#showsearch)        | `false`                                                      |
| style                | 自定义样式                                                                                           | `CSSProperties`                         | `--`                                                         |
| suffixIcon           | 自定义的选择框后缀图标                                                                               | `ReactNode`                             | `--`                                                         |
| value                | 指定选中项                                                                                           | `string[]`〡`number[]`                  | `--`                                                         |
| onChange             | 选择完成后的回调                                                                                     | `(value, selectedOptions) => void`      | `--`                                                         |
| onClear              | 清空内容时的回调                                                                                     | `() => void`                            | `--`                                                         |
| onPopupVisibleChange | 显示/隐藏浮层的回调                                                                                  | `(value) => void`                       | `--`                                                         |

### showSearch

`showSearch` 为对象时，其中的字段：

| 参数            | 说明                                                                                       | 类型                                    | 默认值 |
| --------------- | ------------------------------------------------------------------------------------------ | --------------------------------------- | ------ |
| limit           | 搜索结果展示数量                                                                           | `number`〡`false`                       | `50`   |
| filter          | 接收 `inputValue` `path` 两个参数，当 `path` 符合筛选条件时，应返回 true，反之则返回 false | `function(inputValue, path): boolean`   | `--`   |
| matchInputWidth | 搜索结果列表是否与输入框同宽                                                               | `boolean`                               | `true` |
| render          | 用于渲染 filter 后的选项                                                                   | `function(inputValue, path): ReactNode` | `--`   |
| sort            | 用于排序 filter 后的选项                                                                   | `function(a, b, inputValue)`            | `--`   |

### Option

```typescript
interface Option {
    value: string | number;
    label?: React.ReactNode;
    disabled?: boolean;
    children?: Option[];
    isLeaf?: boolean;
}
```

### 方法

| 名称    | 描述     |
| ------- | -------- |
| blur()  | 移除焦点 |
| focus() | 获取焦点 |
