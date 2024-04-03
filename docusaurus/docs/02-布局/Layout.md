---
title: Layout 布局
---


协助进行页面级整体布局。

## 设计规则

### 尺寸

一级导航项偏左靠近 logo 放置，辅助菜单偏右放置。

- 顶部导航（大部分系统）：一级导航高度 `64px`，二级导航 `48px`。
- 顶部导航（展示类页面）：一级导航高度 `80px`，二级导航 `56px`。
- 顶部导航高度的范围计算公式为：`48+8n`。
- 侧边导航宽度的范围计算公式：`200+8n`。

### 交互

- 一级导航和末级的导航需要在可视化的层面被强调出来；
- 当前项应该在呈现上优先级最高；
- 当导航收起的时候，当前项的样式自动赋予给它的上一个层级；
- 左侧导航栏的收放交互同时支持手风琴和全展开的样式，根据业务的要求进行适当的选择。

### 视觉

导航样式上需要根据信息层级合理的选择样式：

- **大色块强调**

    建议用于底色为深色系时，当前页面父级的导航项。

- **高亮火柴棍**

    当导航栏底色为浅色系时使用，可用于当前页面对应导航项，建议尽量在导航路径的最终项使用。

- **字体高亮变色**

    从可视化层面，字体高亮的视觉强化力度低于大色块，通常在当前项的上一级使用。

- **字体放大**

    `12px`、`14px` 是导航的标准字号，14 号字体用在一、二级导航中。字号可以考虑导航项的等级做相应选择。

## 组件概述

- `Layout`：布局容器，其下可嵌套 `Header` `Sider` `Content` `Footer` 或 `Layout` 本身，可以放在任何父容器中。
- `Header`：顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。
- `Sider`：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 `Layout` 中。
- `Content`：内容部分，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。
- `Footer`：底部布局，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。

:::caution 注意

采用 flex 布局实现，请注意[浏览器兼容性](http://caniuse.com/#search=flex)问题。

:::

## 引入

```js
import {Layout} from 'idesign';

const {Header, Footer, Sider, Content} = Layout;
```

## 基本用法

典型的页面布局。

```jsx live
<div className="demo-column">
    <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
    </Layout>

    <Layout>
        <Header>Header</Header>
        <Layout>
            <Sider>Sider</Sider>
            <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
    </Layout>

    <Layout>
        <Header>Header</Header>
        <Layout>
            <Content>Content</Content>
            <Sider>Sider</Sider>
        </Layout>
        <Footer>Footer</Footer>
    </Layout>

    <Layout>
        <Sider>Sider</Sider>
        <Layout>
            <Header>Header</Header>
            <Content>Content</Content>
            <Footer>Footer</Footer>
        </Layout>
    </Layout>
</div>
```

## 上中下布局

最基本的『上-中-下』布局。

一般主导航放置于页面的顶端，从左自右依次为：logo、一级导航项、辅助菜单（用户、设置、通知等）。通常将内容放在固定尺寸（例如：1200px）内，整个页面排版稳定，不受用户终端显示器影响；上下级的结构符合用户上下浏览的习惯，也是较为经典的网站导航模式。页面上下切分的方式提高了主工作区域的信息展示效率，但在纵向空间上会有一些牺牲。此外，由于导航栏水平空间的限制，不适合那些一级导航项很多的信息结构。

```jsx live
function App() {
    const LogoInfo = {
        logo: <div className="logo" />,
        urlConfig: {
            href: 'www.baidu1.com',
            target: '_blank'
        }
    };

    return (
        <Layout className="demo-layout">
            <Header>
                <Menu
                    scope="global"
                    logoInfo={LogoInfo}
                    mode="horizontal"
                    headerMenu={
                        <Menu mode="horizontal">
                            <Menu.Item key="easydata">智能数据</Menu.Item>
                            <Menu.Item key="dae">数据分析引擎</Menu.Item>
                            <Menu.Item key="bml">全功能开发</Menu.Item>
                            <Menu.Item key="easydl">零代码开发</Menu.Item>
                            <Menu.Item key="mc">模型中心</Menu.Item>
                            <Menu.Item key="ais">预测服务</Menu.Item>
                        </Menu>
                    }
                />
            </Header>
            <Content style={{padding: '0 50px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">Content</div>
            </Content>
            <Footer style={{textAlign: 'center'}}>acu design</Footer>
        </Layout>
    );
}
```

## 顶部-侧边布局-通栏

同样拥有顶部导航及侧边栏，区别是两边未留边距，多用于应用型的网站。

```jsx live
function App() {
    const LogoInfo = {
        logo: <div className="logo" />,
        urlConfig: {
            href: 'www.baidu1.com',
            target: '_blank'
        }
    };

    return (
        <Layout className="demo-layout">
            <Header>
                <Menu
                    scope="global"
                    logoInfo={LogoInfo}
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    headerMenu={
                        <Menu mode="horizontal">
                            <Menu.Item key="easydata">智能数据</Menu.Item>
                            <Menu.Item key="dae">数据分析引擎</Menu.Item>
                            <Menu.Item key="bml">全功能开发</Menu.Item>
                            <Menu.Item key="easydl">零代码开发</Menu.Item>
                            <Menu.Item key="mc">模型中心</Menu.Item>
                            <Menu.Item key="ais">预测服务</Menu.Item>
                        </Menu>
                    }
                />
            </Header>
            <Layout>
                <Sider width={160} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{height: '100%', borderRight: 0}}
                    >
                        <Menu.Item key="option:0" icon={<OutlinedFilePublish />}>
                            Nav One
                        </Menu.Item>
                        <SubMenu
                            mode="inline"
                            key="subMenu"
                            title="Nav Two"
                            icon={<OutlinedFilePublish />}
                        >
                            <Menu.ItemGroup title="Group One">
                                <Menu.Item key="option:1">Option 1</Menu.Item>
                                <Menu.Item key="option:2">Option 2</Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup title="Group Two">
                                <Menu.Item key="option:3">Option 3</Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                        <Menu.Item key="option:4" icon={<OutlinedFilePublish />}>
                            Nav Three
                        </Menu.Item>
                        <SubMenu
                            mode="inline"
                            key="test"
                            title="Nav Four"
                            icon={<OutlinedFilePublish />}
                        >
                            <Menu.Item key="option:5">Option 4</Menu.Item>
                            <Menu.Item key="option:6">Option 5</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280
                        }}
                    >
                        Content
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}
```

## 顶部-侧边布局

拥有顶部导航及侧边栏的页面，多用于展示类网站。

```jsx live
function App() {
    const LogoInfo = {
        logo: <div className="logo" />,
        urlConfig: {
            href: 'www.baidu1.com',
            target: '_blank'
        }
    };

    return (
        <Layout className="demo-layout">
            <Header>
                <Menu
                    scope="global"
                    logoInfo={LogoInfo}
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    headerMenu={
                        <Menu mode="horizontal">
                            <Menu.Item key="easydata">智能数据</Menu.Item>
                            <Menu.Item key="dae">数据分析引擎</Menu.Item>
                            <Menu.Item key="bml">全功能开发</Menu.Item>
                            <Menu.Item key="easydl">零代码开发</Menu.Item>
                            <Menu.Item key="mc">模型中心</Menu.Item>
                            <Menu.Item key="ais">预测服务</Menu.Item>
                        </Menu>
                    }
                />
            </Header>
            <Content style={{padding: '0 50px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                    <Sider width={160} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0}}
                        >
                            <Menu.Item key="option:0" icon={<OutlinedFilePublish />}>
                                Nav One
                            </Menu.Item>
                            <SubMenu
                                mode="inline"
                                key="subMenu"
                                title="Nav Two"
                                icon={<OutlinedFilePublish />}
                            >
                                <Menu.ItemGroup title="Group One">
                                    <Menu.Item key="option:1">Option 1</Menu.Item>
                                    <Menu.Item key="option:2">Option 2</Menu.Item>
                                </Menu.ItemGroup>
                                <Menu.ItemGroup title="Group Two">
                                    <Menu.Item key="option:3">Option 3</Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>
                            <Menu.Item key="option:4" icon={<OutlinedFilePublish />}>
                                Nav Three
                            </Menu.Item>
                            <SubMenu
                                mode="inline"
                                key="test"
                                title="Nav Four"
                                icon={<OutlinedFilePublish />}
                            >
                                <Menu.Item key="option:5">Option 4</Menu.Item>
                                <Menu.Item key="option:6">Option 5</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content style={{padding: '0 24px', minHeight: 280}}>Content</Content>
                </Layout>
            </Content>
            <Footer style={{textAlign: 'center'}}>acu design</Footer>
        </Layout>
    );
}
```

[点击查看更多示例](https://acud.now.baidu-int.com/components/layout)

## API

### Layout

布局容器。

| 参数      | 说明                                                               | 类型            | 默认值 |
| --------- | ------------------------------------------------------------------ | --------------- | ------ |
| className | 容器 className                                                     | `string`        | `--`   |
| hasSider  | 表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动 | `boolean`       | `--`   |
| style     | 指定样式                                                           | `CSSProperties` | `--`   |

### Layout.Sider

侧边栏。

| 参数                  | 说明                                                                 | 类型                                | 默认值  |
| --------------------- | -------------------------------------------------------------------- | ----------------------------------- | ------- |
| className             | 容器 className                                                       | `string`                            | `--`    |
| breakpoint            | 触发响应式布局的断点                                                 | `xs`〡`sm`〡`md`〡`lg`〡`xl`〡`xxl` | `--`    |
| collapsed             | 当前收起状态                                                         | `boolean`                           | `--`    |
| collapsedWidth        | 收缩宽度，设置为 0 会出现特殊 trigger                                | `number`                            | `80`    |
| collapsible           | 是否可收起                                                           | `boolean`                           | `false` |
| defaultCollapsed      | 是否默认收起                                                         | `boolean`                           | `false` |
| reverseArrow          | 翻转折叠提示箭头的方向，当 Sider 在右边时可以使用                    | `boolean`                           | `false` |
| style                 | 指定样式                                                             | `CSSProperties`                     | `--`    |
| theme                 | 主题颜色                                                             | `light`〡`dark`                     | `dark`  |
| trigger               | 自定义 trigger，设置为 null 时隐藏 trigger                           | `ReactNode`                         | `--`    |
| width                 | 宽度                                                                 | `number`〡`string`                  | `200`   |
| zeroWidthTriggerStyle | 指定当 `collapsedWidth` 为 0 时出现的特殊 trigger 的样式             | `object`                            | `--`    |
| onBreakpoint          | 触发响应式布局断点时的回调                                           | `(broken) => {}`                    | `--`    |
| onCollapse            | 展开/收起时的回调函数，有点击 trigger 以及响应式反馈两种方式可以触发 | `(collapsed, type) => {}`           | `--`    |

### breakpoint width

```js
const config = {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1600px'
};
```
