## 🎯 快速开始

> 确保各位博客园已经申请了 JS 权限

快速体验本主题, 进入[设置](https://i.cnblogs.com/settings)页面

### 页面定制 CSS 代码

勾选 禁用模板默认 CSS ☑️

```css
#top_nav, #home, #page_end_html {
    display: none;
}

:root {
    --hacker-color: black; /*可定制配色*/
    --btn-color: #212121;
    --mate-color: #9e9e9e;
}
```

###  页首 HTML 代码

```html
<link rel="stylesheet" type="text/css" href="//files.cnblogs.com/files/blogs/707675/hacker.css" />
<script src="//files.cnblogs.com/files/blogs/707675/hacker.js"></script>
<!--如果不进行二次开发建议引用源站链接, 方便自动更新主题-->
```

###  页脚 HTML 代码

```html
<script>
    window.ico = `//pic.cnblogs.com/face/2555898/20210925073011.png`
</script>
<!--配置项-->
```

## 🌈 定制化

主题颜色变量 `--theme-color` 中可以修改自己喜欢的颜色(默认为`black` ), 建议以下几种配色方案

```
官配 #f03838
民配 #999
盘绿 #377d22
盘红 #eb3223
腾讯 #034fd8
币站 #fb7299
```

## 💊 数据分离

体验过后, 回到正题

本主题围绕着分离数据这个思路来完成这个主题的制作, 这意味着使用者可以很方便的集成自己的已有主题

目前可以获取到的数据如下

### 文章

```js
const post = {
	categories: [{url: "//link", name: "name"}], // 分类
	commentCnt: "8", // 评论数
	content: "contentHTML", // 内容 HTML
	date: 1583126040000, // 发布时间
	desc: "<blockquote>\n<p>123</p>\n</blockquote>", // 描述 HTML
	postID: "12395119", // 文章ID
	readCnt: "1355", // 阅读数
	tags: [{url: "//link", name: "name"}], // 标签
	title: "主题使用指南 🧭", // 标题
	url: "//link", // 文章 URL
}
```

### 文章列表

```js
const posts = [{post}]
```

### 分页器

```js
const pager = {
	cur: 1, // 当前页
	page: 1, // 总页数
}
```

更多数据可以在浏览器开发者工具中找到

## 🎹 二次开发

如果各位需要把数据无缝的集成自己的主题, 或者有意愿通过这些数据开发新的主题, 建议阅读本章节

### GetPostFromRsp

描述: GetPostFromRsp 文章加载

使用:
```js
const post = GetPostFromRsp(await Fetch(`/p/${postID}.html`))
```

更多 Handle 可以在源码中找到

## 🗒 心愿单 && BUG单

1. 匿名评论(无二级域名,方案不安全)
2. 音乐播放插件
   ...

[提交心愿单 && BUG单](https://github.com/mosszzom/cnblogs-theme-hacker/issues)

## 🙏 感谢

主题: [Hacker](https://github.com/CodeDaraW/Hacker)
