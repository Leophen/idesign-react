---
title: Menu 菜单
---

展示网站内容和功能结构，帮助用户定位当前位置，引导用户找到目标位置。 横向导航，mode使用「horizontal」； 纵向导航，mode使用「inline」。

## 引入

```js
import {Menu} from 'idesign';
```

## 基本用法

```jsx live fffx
function App() {
    function handleClick(e) {
        console.log('click', e);
    }

    return (
        <Menu
            onClick={handleClick}
            mode="horizontal"
            style={{
                paddingLeft: 20
            }}
            iconList={[
                <OutlinedSearch onClick={() => alert('icon')} />,
                <OutlinedSmile />,
                <OutlinedChat />
            ]}
        >
            <Menu.Item>
                一级导航
            </Menu.Item>
            <Menu.SubMenu key="SubMenu3" title="二级导航">
                <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="setting:1">二级导航1</Menu.Item>
                </Menu.ItemGroup>
                <Menu.SubMenu key="setting:2" title="二级导航">
                    <Menu.Item key="1">二级导航1</Menu.Item>
                    <Menu.Item key="2">二级导航2</Menu.Item>
                </Menu.SubMenu>
                <Menu.ItemGroup title="Item 2">
                    <Menu.Item key="setting:3">二级导航2</Menu.Item>
                </Menu.ItemGroup>
            </Menu.SubMenu>
            <Menu.Item>
                三级导航
            </Menu.Item>
        </Menu>
    );
}
```

## 业务侧边栏

mode="inline" scope="global"

```jsx live fffx
function App() {
    function handleClick(e) {
        console.log('click', e);
    }

    const handleCollapse = value => {
        console.log('collapse', value);
    };

    const headClick = () => {
        console.log('head clicked!');
    };

    const MenuItems = props => {
        const {withIcon} = props;
        const icon = withIcon ? {icon: <OutlinedFilePublish />} : {};

        return (
            <>
                <Menu.Item {...icon} key="menu1" eventKey="menu1">
                    testItemDark
                </Menu.Item>
                <Menu.SubMenu mode="inline" key="submenu2" title="submenu2" {...icon} eventKey="submenu2">
                    <Menu.Item key="setting:1">Option 21</Menu.Item>
                    <Menu.Item key="setting:2">Option 22</Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="menu3" {...icon} eventKey="menu3">
                    test3
                </Menu.Item>
                <Menu.Item key="menu4" {...icon} eventKey="menu4">
                    test4
                </Menu.Item>
                <Menu.SubMenu mode="inline" key="submenu5" title="test5" {...icon} eventKey="submenu5">
                    <Menu.Item key="setting:51">Option 51</Menu.Item>
                    <Menu.Item key="setting:52">Option 52</Menu.Item>
                    <Menu.SubMenu mode="inline" key="submenu53" title="test53">
                        <Menu.Item key="setting:531">Option 531</Menu.Item>
                        <Menu.Item key="setting:532">Option 532</Menu.Item>
                    </Menu.SubMenu>
                </Menu.SubMenu>
            </>
        );
    };

    return (
        <Menu
            onClick={handleClick}
            mode="inline"
            scope="global"
            onCollapse={handleCollapse}
        >
            <Menu.MenuHead icon={<OutlinedFilePublish />} onClick={headClick}>项目名称</MenuHead>
            <MenuItems withIcon />
        </Menu>
    );
}
```

## 普通 inline 模式

mode="inline"

```jsx live fff
function App() {
    const {SubMenu} = Menu;

    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    function handleClick(e) {
        console.log('click', e);
    };

    return (
        <>
            <Button onClick={toggleCollapsed}>toggleCollapsed</Button>
            <div style={{width: 180, marginTop: 20}}>
                <Menu
                    onClick={handleClick}
                    mode="inline"
                    inlineCollapsed={collapsed}
                    defaultOpenKeys={['subMenu']}
                >
                    <Menu.Item key="option:0" icon={<OutlinedFilePublish />}>
                        Nav One
                    </Menu.Item>
                    <SubMenu mode="inline" key="subMenu1" title="Nav Two" icon={<OutlinedFilePublish />}>
                        <Menu.ItemGroup title="Group One">
                            <Menu.Item key="option:1">Option 1</Menu.Item>
                            <Menu.Item key="option:2">Option 2</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="Group Two">
                            <Menu.Item key="option:3">Option 3</Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                    <Menu.ItemGroup title="Group Three">
                        <Menu.Item key="option:4" icon={<OutlinedFilePublish />}>
                            Nav Three
                        </Menu.Item>
                        <SubMenu mode="inline" key="subMenu2" title="Nav Four" icon={<OutlinedFilePublish />}>
                            <Menu.Item key="option:5">Option 4</Menu.Item>
                            <Menu.Item key="option:6">Option 5</Menu.Item>
                        </SubMenu>
                    </Menu.ItemGroup>
                </Menu>
            </div>
        </>
    );
}
```

## 业务 header 菜单

mode="horizontal" scope="global"

```jsx live fff
function App() {
    const {SubMenu} = Menu;

    const logoInfo = {
        logo: <span>logo</span>,
        urlConfig: {
            href: 'www.baidu1.com',
            target: '_blank'
        }
    };

    const titleInfo = {
        title: '控制台总览',
        urlConfig: {
            href: 'www.baidu2.com',
            target: '_blank'
        }
    };

    const headerMenu = (
        <Menu mode="horizontal">
            <SubMenu key="data" title="数据准备" placement="">
                <Menu.Item key="easydata">智能数据</Menu.Item>
                <Menu.Item key="dae">数据分析引擎</Menu.Item>
            </SubMenu>
            <SubMenu key="dev" title="模型开发" placement="">
                <Menu.Item key="bml">全功能开发</Menu.Item>
                <Menu.Item key="easydl">零代码开发</Menu.Item>
            </SubMenu>
            <Menu.Item key="mc">模型中心</Menu.Item>
            <Menu.Item key="ais">预测服务</Menu.Item>
        </Menu>
    );

    const viceHeaderMenu = (
        <Menu mode="horizontal">
            <Menu.Item key="image">镜像</Menu.Item>
            <Menu.Item key="storage">存储</Menu.Item>
            <Menu.Item key="assistance">帮助手册</Menu.Item>
        </Menu>
    );

    const dropdownContent = (
        <>
            <div className="name" prefix="U">
                <span>userName</span>
            </div>
            <Link href="/user/info" type="primary" size="medium">
                <span>个人信息</span>
            </Link>
        </>
    );

    const otherArea = (
        <>
            <Badge dot className="header-message">
                <span className="header-message-bell"><OutlinedBell /></span>
            </Badge>
            <Dropdown
                overlay={dropdownContent}
                overlayClassName="header-user-content"
                placement="bottomRight"
                getPopupContainer={node => node}
            >
                <div className="header-user-name" prefix="U">
                    <OutlinedDown />
                </div>
            </Dropdown>
        </>
    );

    return (
        <Menu
            mode="horizontal"
            scope="global"
            logoInfo={logoInfo}
            titleInfo={titleInfo}
            headerMenu={headerMenu}
            viceHeaderMenu={viceHeaderMenu}
            otherArea={otherArea}
        />
    );
}
```

## API

### Menu

| 参数                 | 说明                                                                                                                                                                       | 类型                                                                       | 默认值     |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------- |
| defaultOpenKeys      | 初始展开的 SubMenu 菜单项 key 数组                                                                                                                                         | `string[]`                                                                 | `--`       |
| defaultSelectedKeys  | 初始选中的菜单项 key 数组                                                                                                                                                  | `string[]`                                                                 | `--`       |
| expandIcon           | 自定义展开图标                                                                                                                                                             | `ReactNode`〡`(props: SubMenuProps & { isSubMenu: boolean }) => ReactNode` | `--`       |
| forceSubMenuRender   | 在子菜单展示之前就渲染进 DOM                                                                                                                                               | `boolean`                                                                  | `false`    |
| inlineCollapsed      | inline 时菜单是否收起状态                                                                                                                                                  | `boolean`                                                                  | `--`       |
| inlineIndent         | inline 模式的菜单缩进宽度                                                                                                                                                  | `number`                                                                   | `24`       |
| scope                | 作用域，global时，横向模式表示业务header导航（可定义logo、icon等），纵向模式表示业务侧边栏（有展开收起等操作区），如果为local，则表示基础菜单                              | `local`〡`global`                                                          | `local`    |
| mode                 | 菜单类型，现在支持纵向模式（一级导航纵向分布，子菜单在右侧弹出展示）、横向模式（一级导航横向分布，子菜单在下方弹出展示）、内嵌模式（特殊的纵向模式，子菜单内嵌在菜单区域） | `vertical`〡`horizontal`〡`inline`                                         | `vertical` |
| multiple             | 是否允许多选                                                                                                                                                               | `boolean`                                                                  | `false`    |
| openKeys             | 当前展开的 SubMenu 菜单项 key 数组                                                                                                                                         | `string[]`                                                                 | `--`       |
| overflowedIndicator  | 自定义 Menu 折叠时的图标                                                                                                                                                   | `ReactNode`                                                                | `--`       |
| selectable           | 是否允许选中                                                                                                                                                               | `boolean`                                                                  | `true`     |
| selectedKeys         | 当前选中的菜单项 key 数组                                                                                                                                                  | `string[]`                                                                 | `--`       |
| style                | 根节点样式                                                                                                                                                                 | `CSSProperties`                                                            | `--`       |
| subMenuCloseDelay    | 用户鼠标离开子菜单后关闭延时，单位：秒                                                                                                                                     | `number`                                                                   | `0.1`      |
| subMenuOpenDelay     | 用户鼠标进入子菜单后开启延时，单位：秒                                                                                                                                     | `number`                                                                   | `0`        |
| triggerSubMenuAction | SubMenu 展开/关闭的触发行为                                                                                                                                                | `hover`〡`click`                                                           | `hover`    |
| onClick              | 点击 MenuItem 调用此函数                                                                                                                                                   | `function({ item, key, keyPath, domEvent })`                               | `--`       |
| onDeselect           | 取消选中时调用，仅在 multiple 生效                                                                                                                                         | `function({ item, key, keyPath, selectedKeys, domEvent })`                 | `--`       |
| onOpenChange         | SubMenu 展开/关闭的回调                                                                                                                                                    | `function(openKeys: string[])`                                             | `--`       |
| onSelect             | 被选中时调用                                                                                                                                                               | `function({ item, key, keyPath, selectedKeys, domEvent })`                 | `--`       |
| iconList             | 右侧的icon区，`mode="horizontal"`且`scope="local"` 时生效                                                                                                                  | `ReactNode[]`                                                              | `[]`       |
| collapsible          | 是否展示底部控制展开/收起区域，`mode="inline"`且`scope="global"` 时生效                                                                                                    | `boolean`                                                                  | `false`    |
| onCollapse           | 展开/收起时的回调函数，`mode="inline"`且`scope="global"` 时生效                                                                                                            | `(collapsed) => {}`                                                        | `--`       |
| disabledOverflow     | Menu 内容溢出时是否折叠                                                                                                                                                    | `boolean`                                                                  | `false`    |

### Menu.Head

| 参数    | 说明                 | 类型        | 默认值 |
| ------- | -------------------- | ----------- | ------ |
| icon    | 图标                 | `ReactNode` | `--`   |
| title   | hover时展示的标题    | `ReactNode` | `--`   |
| onClick | 点击head时调用此函数 | `() => {}`  | `--`   |

### Menu.Item

| 参数     | 说明                     | 类型        | 默认值  |
| -------- | ------------------------ | ----------- | ------- |
| danger   | 展示错误状态样式         | `boolean`   | `false` |
| disabled | 是否禁用                 | `boolean`   | `false` |
| icon     | 菜单图标                 | `ReactNode` | `--`    |
| key      | item 的唯一标志          | `string`    | `--`    |
| title    | 设置收缩时展示的悬浮标题 | `string`    | `--`    |

### Menu.SubMenu

| 参数           | 说明                                 | 类型                          | 默认值  |
| -------------- | ------------------------------------ | ----------------------------- | ------- |
| children       | 子菜单的菜单项                       | `Array&lt;MenuItem〡SubMenu>` | `--`    |
| disabled       | 是否禁用                             | `boolean`                     | `false` |
| icon           | 菜单图标                             | `ReactNode`                   | `--`    |
| key            | 唯一标志                             | `string`                      | `--`    |
| popupClassName | 子菜单样式，`mode="inline"` 时无效   | `string`                      | `--`    |
| popupOffset    | 子菜单偏移量，`mode="inline"` 时无效 | `[number, number]`            | `--`    |
| title          | 子菜单项值                           | `ReactNode`                   | `--`    |
| onTitleClick   | 点击子菜单标题                       | `function({ key, domEvent })` | `--`    |

### Menu.ItemGroup

| 参数     | 说明         | 类型         | 默认值 |
| -------- | ------------ | ------------ | ------ |
| children | 分组的菜单项 | `MenuItem[]` | `--`   |
| title    | 分组标题     | `ReactNode`  | `--`   |

### Menu.Divider

菜单项分割线，只用在弹出菜单内。

### 业务 header

mode="horizontal" scope="global" 时，支持配置：

| 参数           | 说明           | 类型                                                                           | 默认值 |
| -------------- | -------------- | ------------------------------------------------------------------------------ | ------ |
| headerMenu     | 菜单导航栏     | `ReactNode`                                                                    | `--`   |
| viceHeaderMenu | 副菜单导航栏   | `ReactNode`                                                                    | `--`   |
| logoInfo       | 菜单图标       | `{logo: string〡ReactNode;`<br/>`urlConfig: {href: string; target?: string}}`  | `--`   |
| titleInfo      | 菜单标题       | `{title: string〡ReactNode;`<br/>`urlConfig: {href: string; target?: string}}` | `--`   |
| otherArea      | 右侧信息栏     | `ReactNode`                                                                    | `--`   |
| headerStyle    | 自定义菜单样式 | `any`                                                                          | `--`   |
