---
title: Tabs 标签页
---

明示任务流程和当前完成程度，引导用户按照步骤完成任务。

## 引入

```js
import {Tabs} from 'idesign';

const {TabPane} = Tabs;
```

## 基本用法

```jsx live fffx
<Tabs defaultActiveKey='1'>
    <TabPane key='1' tab='Tab 1'>
        内容1
    </TabPane>
    <TabPane key='2' tab='Tab 2' disabled>
        内容2
    </TabPane>
    <TabPane key='3' tab='Tab 3'>
        内容3
    </TabPane>
</Tabs>
```

## 带图标

```jsx live fffx
function App() {
    function callback(key) {
        console.log(key);
    }

    return (
        <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane
                tab={(
                    <>
                        <OutlinedVidicon />Tab1
                    </>
                )}
                key="1"
            >
                内容1
            </TabPane>
            <TabPane
                tab={(
                    <>
                        <OutlinedVidicon />Tab2
                    </>
                )}
                key="2"
            >
                内容2
            </TabPane>
        </Tabs>
    );
}
```

## 卡片式

```jsx live fffx
<Tabs defaultActiveKey='1' type='card'>
    <TabPane key='1' tab='Tab 1'>
        内容1
    </TabPane>
    <TabPane key='2' tab='Tab 2'>
        内容2
    </TabPane>
    <TabPane key='3' tab='Tab 3'>
        内容3
    </TabPane>
</Tabs>
```

## 动态增减页签

```jsx live fff
function App() {
    const initialPanes = [
        {tab: 'Tab', content: '内容1', key: '1'},
        {tab: 'Tab', content: '内容2', key: '2'},
        {tab: 'Tab', content: '内容3', key: '3'}
    ];

    const [activeKey, setActiveKey] = useState(initialPanes[0].key);
    const [panes, setPanes] = useState(initialPanes);
    const newTabIndex = useRef(0);

    const onChange = newActiveKey => {
        setActiveKey(newActiveKey);
    };

    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        const newPanes = [...panes];
        newPanes.push({tab: 'New Tab', content: 'Content of new Tab', key: activeKey });
        setPanes(newPanes);
        setActiveKey(newActiveKey);
    };

    const remove = targetKey => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        panes.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = panes.filter(item => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            }
            else {
                newActiveKey = newPanes[0].key;
            }
        }
        setPanes(newPanes);
        setActiveKey(newActiveKey);
    };

    const onEdit = (targetKey, action) => {
        if (action === 'add') {
            add();
        }
        else {
            remove(targetKey);
        }
    };

    return (
        <Tabs
            type="editable-card"
            onChange={onChange}
            activeKey={activeKey}
            onEdit={onEdit}
        >
            {panes.map(pane => (
                <TabPane tab={pane.tab} key={pane.key} closable={pane.closable}>
                    {pane.content}
                </TabPane>
            ))}
        </Tabs>
    );
}
```

## API

| 参数               | 说明                                                              | 类型                                                                                     | 默认值                                                         |
| ------------------ | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| activeKey          | 当前激活 tab 面板的 key                                           | `string`                                                                                 | `--`                                                           |
| addIcon            | 自定义添加按钮                                                    | `ReactNode`                                                                              | `+`                                                            |
| animated           | 是否使用动画切换 Tabs                                             | `boolean`                                                                                | `{ inkBar: boolean, tabPane: boolean }`                        |
| centered           | 标签居中展示                                                      | `boolean`                                                                                | `false`                                                        |
| defaultActiveKey   | 初始化选中面板的 key，如果没有设置 activeKey                      | `string`                                                                                 | `第一个面板`                                                   |
| hideAdd            | 是否隐藏加号图标，在 type="editable-card" 时有效                  | `boolean`                                                                                | `false`                                                        |
| renderTabBar       | 替换 TabBar，用于二次封装标签头                                   | `(props: DefaultTabBarProps, DefaultTabBar: React.ComponentClass) => React.ReactElement` | `--`                                                           |
| tabBarExtraContent | tab bar 上额外的元素                                              | `{left?: ReactNode, right?: ReactNode}`                                                  | `true`                                                         |
| tabBarGutter       | tabs 之间的间隙                                                   | `number`                                                                                 | `--`                                                           |
| tabBarStyle        | tab bar 的样式对象                                                | `object`                                                                                 | `--`                                                           |
| type               | 页签的基本样式，可选 `line`、`card` `editable-card` 类型          | `string`                                                                                 | `line`                                                         |
| onChange           | 切换面板的回调                                                    | `function(activeKey) {}`                                                                 | `--`                                                           |
| onEdit             | 新增和删除页签的回调，在 type="editable-card" 时有效              | `(targetKey, action): void`                                                              | `--`                                                           |
| onTabClick         | tab 被点击的回调                                                  | `function(key: string, event: MouseEvent)`                                               | `--`                                                           |
| onEditTabNav       | 双击tabNav后被编辑的回调（只允许 tab 为 string 的 tabNav 被编辑） | `function(panes)`                                                                        | `[{ tab: string, content: string \| ReactNode, key: string }]` |

## Tabs.TabPane

| 参数        | 说明                                               | 类型                | 默认值  |
| ----------- | -------------------------------------------------- | ------------------- | ------- |
| closeIcon   | 自定义关闭图标，在 type="editable-card"时有效      | `ReactNode`         | `--`    |
| forceRender | 被隐藏时是否渲染 DOM 结构                          | `boolean`           | `false` |
| key         | 对应 activeKey                                     | `string`            | `--`    |
| tab         | 选项卡头显示文字                                   | `string〡ReactNode` | `--`    |
| max         | 选项卡头显示最多显示文字字数，tab 为 string 时有效 | `number`            | `--`    |
| disabled    | 选项卡头不可点                                     | `boolean`           | `false` |
