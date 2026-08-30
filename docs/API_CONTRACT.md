# idesign API 契约（React / Vue 双库同步）

本文档记录双库公开 API 对齐基线。修改 props/events 须同步更新双库与本文件。

## 版本

- idesign-react: 1.1.2
- idesign-vue: 1.1.8

## 交叉验收（第三方）

| 门禁        | React             | Vue                               |
| ----------- | ----------------- | --------------------------------- |
| 单元测试    | 199/199           | 191/191                           |
| 快照        | 54 通过           | 全量通过                          |
| `typecheck` | 通过              | 待升级 vue-tsc/Vue 3.4 后全量通过 |
| `build`     | father-build 通过 | vite build 通过                   |

Vue 模板类型检查依赖后续 `vite-plugin-dts` + Vue 3.4 升级；当前以 **Vitest 全量快照 + 构建** 作为功能与样式回归门禁。

## 组件清单（41）

Button, Icon, Divider, Grid, Layout, Scrollbar, Dropdown, Menu, Tabs, Breadcrumb, Pagination, BackTop, Radio, Checkbox, Switch, Input, Textarea, Select, TimePicker, DatePicker, ColorPicker, Table, Upload, Slider, Progress, Steps, Rate, Tag, Empty, Loading, Avatar, Badge, Image, Carousel, Collapse, Alert, Message, Notification, Dialog, Drawer, Popup

## 类型导出约定

- React: `import type { ButtonProps } from 'idesign-react/dist/src/Button/type'`（构建产物）；入口将逐步 re-export
- Vue: `import type { ButtonProps } from 'idesign-vue'`（vite-plugin-dts）

## 命令式 API

Message / Notification 支持 `info | success | warning | error | clear`，Vue 侧 `add()` 返回 `{ close() }`。
