# 默认主题使用

## Home Page
默认的主题提供了一个首页（Homepage）的布局 (用于 这个网站的主页)。想要使用它，需要在你的根级 README.md 的 YAML front matter 指定 home: true。以下是这个网站实际使用的数据：
``` yaml
---
home: true
heroImage: /hero.png
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You
---
```
::: tip
heroImage: /hero.png 需要放在 **docs/.vuepress/public** 目录下
:::

## 顶部导航栏
配置文件 **.vuepress/config.js**, 
通过themeConfig.nav增加链接, 当导航键不只是单一的`Link`是,可通过`items`添加目录,它将以`下拉列表`:
``` js
module.exports = {
  themeConfig: {
    nav: [
            { text: 'Home', link: '/' },
            { text: 'Devlops', 
                items: [
                    {text: 'vuepress', link: '/markvue/'}
                ] 
            },
            { text: 'External', link: 'https://google.com' },
        ],
}
```