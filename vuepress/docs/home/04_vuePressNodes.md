# VuePressNodes

::: tip
 在docs文件中执行（请确保你的 Node.js 版本 >= 8
:::

```bash
npm install -g vuepress

git clone git@github.com:docschina/vuepress.git

cd vuepress

cd docs

vuepress dev
```

## doc目录结构

```js
├─.vuepress
│ ├─components
│ └─public
│ └─icons
│ └─config.js // 配置文件
├─config // Vuepress文档的配置参考内容
├─default-theme-config // Vuepress文档的默认主题配置内容
├─guide // Vuepress文档的指南内容
└─zh // 中文文档目录
 ├─config
 ├─default-theme-config
 └─guide
└─README.md // 首页配置文件
```

## 侧边栏配置

```js
在.vuepress/config.js中
```

## 部署

```bash
Vuepress build

将打包好的vuepress目录上传到你的github仓库，和github page配合，就可以配置好你的博客网站了
```