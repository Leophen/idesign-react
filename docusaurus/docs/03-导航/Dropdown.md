---
title: Dropdown 下拉菜单
---

当⻚面上的命令过多时，可以将备选命令收纳到向下展开的浮层容器中。

## 引入

```js
import {Dropdown} from 'idesign';
```

## 基本用法

```jsx live fffx
function App() {
    const handleClick = e => console.log(e);

    const menu = (
        <Menu onClick={handleClick}>
            <Menu.Item key={1}>
                选项1
            </Menu.Item>
            <Menu.Item key={2}>
                选项2
            </Menu.Item>
            <Menu.Item key={3}>
                选项3
            </Menu.Item>
            <Menu.Item key={4}>
                选项4
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="demo-row">
            <Dropdown
                label={'菜单'}
                overlay={menu}
            />
            <Dropdown
                label={'菜单'}
                labelIcon
                overlay={menu}
            />
            <Dropdown
                className="acud-dropdown-demo-image"
                label={'Pick Me'}
                image={<MultiToneAcgLogo />}
                overlay={menu}
            />
            <Dropdown
                overlay={menu}
            >
                <Button>下拉菜单</Button>
            </Dropdown>
            <Dropdown
                label={<a href="javascript:void(0)">下拉菜单</a>}
                labelIcon
                overlay={menu}
            />
        </div>
    );
}
```

## 不同方向

通过 `placement` 控制下拉菜单展示位置：

```jsx live fffx
function App() {
    const handleClick = e => console.log(e);

    const menu = (
        <Menu onClick={handleClick}>
            <Menu.Item key={1}>
                选项1
            </Menu.Item>
            <Menu.Item key={2}>
                选项2
            </Menu.Item>
            <Menu.Item key={3}>
                选项3
            </Menu.Item>
            <Menu.Item key={4}>
                选项4
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="demo-placement">
            <Dropdown
                overlay={menu}
                placement="topLeft"
                className="topLeft"
            >
                <Button>topLeft</Button>
            </Dropdown>
            <Dropdown
                overlay={menu}
                placement="topCenter"
                className="top"
            >
                <Button>topCenter</Button>
            </Dropdown>
            <Dropdown
                overlay={menu}
                placement="topRight"
                className="topRight"
            >
                <Button>topRight</Button>
            </Dropdown>

            <Dropdown
                overlay={menu}
                placement="leftTop"
                className="leftTop"
            >
                <Button>leftTop</Button>
            </Dropdown>
            <Dropdown
                overlay={menu}
                placement="leftCenter"
                className="left"
            >
                <Button>leftCenter</Button>
            </Dropdown>
            <Dropdown
                overlay={menu}
                placement="leftBottom"
                className="leftBottom"
            >
                <Button>leftBottom</Button>
            </Dropdown>

            <Dropdown
                overlay={menu}
                placement="rightTop"
                className="rightTop"
            >
                <Button>rightTop</Button>
            </Dropdown>
            <Dropdown
                overlay={menu}
                placement="rightCenter"
                className="right"
            >
                <Button>rightCenter</Button>
            </Dropdown>
            <Dropdown
                overlay={menu}
                placement="rightBottom"
                className="rightBottom"
            >
                <Button>rightBottom</Button>
            </Dropdown>

            <Dropdown
                overlay={menu}
                placement="bottomLeft"
                className="bottomLeft"
            >
                <Button>bottomLeft</Button>
            </Dropdown>
            <Dropdown
                overlay={menu}
                placement="bottomCenter"
                className="bottom"
            >
                <Button>bottomCenter</Button>
            </Dropdown>
            <Dropdown
                overlay={menu}
                placement="bottomRight"
                className="bottomRight"
            >
                <Button>bottomRight</Button>
            </Dropdown>
        </div>
    );
}
```

## 多层级单选

```jsx live fffx
function App() {
    const handleClick = e => console.log(e);

    const menu = (
        <Menu onClick={handleClick}>
            <Menu.SubMenu title="submenu1" key={'sub1'}>
                <Menu.Item key={'1-1'}>
                    item1-1
                </Menu.Item>
                <Menu.Item key={'1-2'}>
                    item1-2
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="submenu2" key={'sub2'}>
                <Menu.SubMenu title="submenu2-1" key={'sub2-1'}>
                    <Menu.Item key="2-1-1">
                        item2-1-1
                    </Menu.Item>
                    <Menu.Item key="2-1-2">
                        item2-1-2
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key={'2-2'}>
                    item2-2
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key={'3'}>
                选项3
            </Menu.Item>
            <Menu.Item key={'4'}>
                选项4
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu}>
            <a href="javascript:void(0)">下拉菜单</a>
        </Dropdown>
    );
}
```

## 下拉 Select 组件

```jsx live fff
function App() {
    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    return (
        <Dropdown.Select onChange={handleChange}>
            <Dropdown.Select.Option value="data1">data1</Dropdown.Select.Option>
            <Dropdown.Select.Option value="data2">data2</Dropdown.Select.Option>
            <Dropdown.Select.Option value="data3">data3</Dropdown.Select.Option>
        </Dropdown.Select>
    )
}
```

## 下拉 Cascader 组件

```jsx live fff
function App() {
    const options = [
        {
            label: '操作一',
            value: 'op1',
            children: [
                {
                    label: '操作一一',
                    value: 'op1-1',
                    children: [
                        {
                            label: '操作一一一',
                            value: 'op1-1-1'
                        }
                    ]
                },
                {
                    label: '操作一二',
                    value: 'op1-2'
                }
            ]
        },
        {
            label: '操作二',
            value: 'op2',
            children: [
                {
                    label: '操作二一',
                    value: 'op2-1',
                    children: [
                        {
                            label: '操作二一一',
                            value: 'op2-1-1'
                        }
                    ]
                }
            ]
        },
        {
            label: '操作三',
            value: 'op3',
            children: [
                {
                    label: '操作三一',
                    value: 'op3-1',
                    disabled: true
                },
                {
                    label: '操作三二',
                    value: 'op3-2',
                    disabled: true,
                    children: [
                        {
                            label: '操作三二一',
                            value: 'op3-2-1'
                        },
                        {
                            label: '操作三二二',
                            value: 'op3-2-2'
                        }
                    ]
                },
                {
                    label: '操作三三',
                    value: 'op3-3',
                    children: [
                        {
                            label: '操作三三一',
                            value: 'op3-3-1',
                            children: [
                                {
                                    label: '操作三三一一',
                                    value: 'op3-3-1-1'
                                },
                                {
                                    label: '操作三三一二',
                                    value: 'op3-3-1-2',
                                    disabled: true
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '操作三四',
                    value: 'op3-4'
                },
                {
                    label: '操作三五',
                    value: 'op3-5'
                },
                {
                    label: '操作三六',
                    value: 'op3-6'
                },
                {
                    label: '操作三七',
                    value: 'op3-7'
                },
                {
                    label: '操作三八',
                    value: 'op3-8'
                }
            ]
        }
    ];

    return (
        <Dropdown.Cascader options={options} />
    );
}
```

## 下拉 Button 组件

```jsx live fff
function App() {
    const handleClick = e => console.log(e);

    const handleClickButton = () => console.log('点击左侧按钮');

    const menu = (
        <Menu onClick={handleClick}>
            <Menu.Item key={1}>
                选项1
            </Menu.Item>
            <Menu.Item key={2}>
                选项2
            </Menu.Item>
            <Menu.Item key={3}>
                选项3
            </Menu.Item>
            <Menu.Item key={4}>
                选项4
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown.Button
            onClick={handleClickButton}
            overlay={menu}
        >
            下拉菜单
        </Dropdown.Button>
    );
}
```

## API

按钮的属性说明如下：

| 属性              | 说明                                                                                                 | 类型                                                                                                                      | 默认值                |
| ----------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| icon              | 设置 Dropdown 的图标组件                                                                             | `ReactNode〡string`                                                                                                       | `--`                  |
| image             | 设置 Dropdown 的图标组件                                                                             | `ReactNode〡string`                                                                                                       | `--`                  |
| placement         | 菜单弹出位置：                                                                                       | `bottomLeft`〡`bottomCenter`〡`bottomRight`〡`topLeft`〡`topCenter`〡`topRight`〡`rightTop`〡`rightCenter`〡`rightBottom` | `--`                  |
| onClick           | 点击按钮时的回调                                                                                     | `(event) => void`                                                                                                         | `--`                  |
| disabled          | 菜单是否禁用                                                                                         | `boolean`                                                                                                                 | `--`                  |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。 | `(triggerNode: HTMLElement) => HTMLElement`                                                                               | `() => document.body` |
| overlay           | 菜单                                                                                                 | `[Menu](/components/menu)〡() => Menu`                                                                                    | `--`                  |
| overlayClassName  | 下拉根元素的类名称                                                                                   | `string`                                                                                                                  | `--`                  |
| overlayStyle      | 下拉根元素的样式                                                                                     | `CSSProperties`                                                                                                           | `--`                  |
| trigger           | 触发下拉的行为, 移动端不支持 hover                                                                   | `Array<click〡hover〡contextMenu>`                                                                                        | `[hover]`             |
| visible           | 菜单是否显示                                                                                         | `boolean`                                                                                                                 | `--`                  |
| onVisibleChange   | 菜单显示状态改变时调用，参数为 `visible`。点击菜单按钮导致的消失不会触发                             | `(visible: boolean) => void`                                                                                              | `--`                  |

`overlay` 菜单使用 [Menu](./Menu)，还包括菜单项 `Menu.Item`，分割线 `Menu.Divider`

:::caution 注意

Dropdown 下的 Menu 默认不可选中。如果需要菜单可选中，可以指定 `<Menu selectable>`

:::

### Dropdown.Button

| 参数            | 说明                                                                                     | 类型                                    | 默认值       |
| --------------- | ---------------------------------------------------------------------------------------- | --------------------------------------- | ------------ |
| disabled        | 菜单是否禁用                                                                             | `boolean`                               | `--`         |
| loading         | 设置按钮载入状态                                                                         | `boolean〡{ delay: number }`            | `false`      |
| buttonsRender   | 自定义左右两个按钮                                                                       | `(buttons: ReactNode[]) => ReactNode[]` | `--`         |
| icon            | 右侧的 icon                                                                              | `ReactNode`                             | `--`         |
| overlay         | 菜单                                                                                     | [Menu](./menu/)                         | `--`         |
| placement       | 菜单弹出位置：`bottomLeft` `bottomCenter` `bottomRight` `topLeft` `topCenter` `topRight` | `string`                                | `bottomLeft` |
| size            | 按钮大小，和 [Button](../%E9%80%9A%E7%94%A8/Button) 一致                                 | `string`                                | `default`    |
| trigger         | 触发下拉的行为                                                                           | `Array<click〡hover〡contextMenu>`      | `[hover]`    |
| type            | 按钮类型，和 [Button](../%E9%80%9A%E7%94%A8/Button) 一致                                 | `string`                                | `default`    |
| visible         | 菜单是否显示                                                                             | `boolean`                               | `--`         |
| onClick         | 点击左侧按钮的回调，和 [Button](../%E9%80%9A%E7%94%A8/Button) 一致                       | `(event) => void`                       | `--`         |
| onVisibleChange | 菜单显示状态改变时调用，参数为 `visible`                                                 | `(visible: boolean) => void`            | `--`         |

### Dropdown.Select

同 [Select](../%E6%95%B0%E6%8D%AE%E5%BD%95%E5%85%A5/Select)

### Dropdown.Cascader

同 [Cascader](../%E6%95%B0%E6%8D%AE%E5%BD%95%E5%85%A5/Cascader)
