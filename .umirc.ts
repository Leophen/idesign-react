import { defineConfig } from 'dumi';

let BaseUrl = '';

export default defineConfig({
  title: 'iDesign',
  favicon: BaseUrl + '/images/logo.ico',
  logo: BaseUrl + '/images/logo.svg',
  description: 'iDesign React 组件库',
  outputPath: 'docs-dist',
  mode: 'site',
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'GitHub',
      path: 'https://github.com/Leophen/idesign-react',
    },
    // {
    //   title: '我有二级导航',
    //   path: '链接是可选的',
    //   // 可通过如下形式嵌套二级导航菜单，目前暂不支持更多层级嵌套：
    //   children: [
    //     { title: '第一项', path: 'https://d.umijs.org' },
    //     { title: '第二项', path: '/guide' },
    //   ],
    // },
  ],
  mfsu: {},
  cssModulesTypescriptLoader: {
    mode: 'emit',
  },
});
