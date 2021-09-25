import {Fetch, NetFetch} from "../../utils/fetch"
import {Done, Sync} from "../../utils/sync"
import {
    GetCategoriesAndTagsFromRsp,
    GetCodeHighlightFromRsp,
    GetPostFromRsp,
    GetPostsURLFromRsp
} from "../../plugins/posts"
import {GetPager} from "../../plugins/pager"

(async _ => {
    const handlers = []
    const paths = window.location.pathname.split("/").filter(e => e !== '')
    while (paths.shift() !== currentBlogApp && paths.length !== 0) {
    }
    document.querySelector("body").innerHTML += `<div class="hacker-blog"><header class="hacker-branding"></header><nav class="hacker-navigation"></nav><main class="hacker-posts"></main><footer class="hacker-pager"></footer></div>`
    headerDOM()
    navDOM()
    if (paths.length !== 0 && paths[0] !== 'default.html') switch (paths[0]) {
        case `p`:
            if (paths.length === 2) handlers.push(SyncPostsFromRsp, SyncICOLoader)
            document.addEventListener("DOMNodeInserted", _ => handlers.forEach(f => f()))
            return
        case `category`:
            if (paths.length === 2) handlers.push(SyncPostsURLFromRsp, SyncPager, SyncICOLoader)
            document.addEventListener("DOMNodeInserted", _ => handlers.forEach(f => f()))
            return
        case `tag`:
            if (paths.length === 2) handlers.push(SyncPostsURLFromRsp, SyncPager, SyncICOLoader)
            document.addEventListener("DOMNodeInserted", _ => handlers.forEach(f => f()))
            return
        default:
            window.location.pathname = "/404"
            return
    }
    handlers.push(SyncPostsURLFromRsp, SyncPager, SyncICOLoader)
    document.addEventListener("DOMNodeInserted", _ => handlers.forEach(f => f()))
})()

async function SyncPostsURLFromRsp() {
    const flag = `posts_url`
    if (Done(flag)) return
    const postsURLs = await Sync(flag, async _ => {
        const rsp = document.querySelector(".forFlow").innerHTML
        return GetPostsURLFromRsp(rsp)
    })
    console.log(postsURLs)
    await SyncCodeHighlight(postsURLs[0].post)
    await SyncPostFromRsp(postsURLs)
}

async function SyncCodeHighlight(url) {
    const rsp = await Fetch(url)
    const codeHighlight = await GetCodeHighlightFromRsp(rsp)
    console.log(codeHighlight)
    window.codeHighlight = codeHighlight
}

async function SyncPostsFromRsp() {
    const flag = `post_url`
    if (Done(flag)) return
    const posts = await Sync(flag, async _ => {
        const rsp = document.querySelector("html").innerHTML
        const post = GetPostFromRsp(rsp)
        const net = await NetFetch(`//www.cnblogs.com/${currentBlogApp}/ajax/CategoriesTags.aspx?blogId=${currentBlogId}&postId=${post.postID}`)
        const cateAndTag = GetCategoriesAndTagsFromRsp(net)
        post.categories = cateAndTag.categories
        post.tags = cateAndTag.tags
        window.codeHighlight = await GetCodeHighlightFromRsp(rsp)
        return [post]
    })
    console.log(posts)
    postsDOM(posts, true)
}

async function SyncPostFromRsp(urls) {
    const postMap = {}
    const promises = []
    const p = []
    urls.forEach(e => {
        const postID = e.edit.match(/[0-9].*/)[0]
        if (postMap[postID]) return
        postMap[postID] = {isTop: e.isTop, postID}
        promises.push(Fetch(e.post))
        p.push(NetFetch(`//www.cnblogs.com/${currentBlogApp}/ajax/CategoriesTags.aspx?blogId=${currentBlogId}&postId=${postID}`))
    })
    const rsps = await Promise.all(promises)
    rsps.forEach(rsp => {
        const post = GetPostFromRsp(rsp)
        postMap[post.postID] = {...postMap[post.postID], ...post}
    })
    const ursp = await Promise.all(p)
    ursp.forEach(rsp => {
        const post = GetCategoriesAndTagsFromRsp(rsp)
        postMap[post.postID] = {...postMap[post.postID], ...post}
    })
    const byUnix = (p, n) => n.date - p.date
    const posts = [
        ...Object.values(postMap).filter(e => e.isTop).sort(byUnix),
        ...Object.values(postMap).filter(e => !e.isTop).sort(byUnix)
    ]
    console.log(posts)
    postsDOM(posts, false)
}

async function SyncPager() {
    const flag = `pager`
    if (Done(flag)) return
    const pager = await Sync(flag, async _ => {
        const rsp = await Fetch(`${window.location.pathname}default.html?page=2`)
        return GetPager(rsp)
    })
    console.log(pager)
    pagerDOM(pager)
}

async function SyncICOLoader() {
    const flag = `ico`
    const ico = window.ico ?? false
    if (Done(flag) || !ico) return
    await Sync(flag, async _ => {
        document.querySelector(`#favicon`).href = ico
    })
    console.log({ico: ico})
}

function headerDOM() {
    const url = document.querySelectorAll("body #header #blogTitle h1 a")[0].href
    const title = document.querySelectorAll("body #header #blogTitle h1")[0].innerText.trim()
    const subtitle = document.querySelectorAll("body #header #blogTitle h2")[0].innerText.trim()
    document.querySelector(".hacker-branding").innerHTML = `<h1 class="site-title"><a href="${url}">${title}</a></h1><p class="site-description">${subtitle}</p>`
}

function navDOM() {
    const url = document.querySelectorAll("body #header #blogTitle h1 a")[0].href
    document.querySelector(".hacker-navigation").innerHTML = `<ul><li><a href="${url}">主页</a></li></ul>`
}

function postsDOM(posts, isPost) {
    const dom = document.querySelector(".hacker-posts")
    posts.forEach(e => {
        const categories = document.createElement("span")
        if (e.categories.length) categoriesMateDOM(categories, e)
        const tags = document.createElement("span")
        if (e.tags.length) tagMateDOM(tags, e)
        dom.innerHTML += `<article><h3 class="article-title"><a href="${e.url}"><span>${e.isTop ? "📌" + e.title : e.title}</span></a></h3><div class="article-top-meta"><span class="posted-on"><a href="${e.edit}" rel="bookmark"><time class="entry-date published" datetime="${new Date(e.date)}">${new Date(e.date).toLocaleDateString()}</time></a></span></div><div class="article-content"><div class="entry">${isPost ? e.content : e.desc}</div></div><div class="article-footer"><div class="article-meta pull-left">${categories.outerHTML}${tags.outerHTML}</div></div></article>`
    })
    CodeHighlight()
}

function pagerDOM(pager) {
    const url = `${window.location.pathname}default.html`
    const dom = document.querySelector(".hacker-pager")
    if (pager.cur !== 1) dom.innerHTML += `<a href="${url}?page=${pager.cur - 1}"><</a><a href="${url}?page=1">1</a>`
    if (pager.cur - 1 > 2) dom.innerHTML += `...`
    if (pager.cur - 1 > 1) dom.innerHTML += `<a href="${url}?page=${pager.cur - 1}">${pager.cur - 1}</a>`
    dom.innerHTML += `<a class="active" href="${url}?page=${pager.cur}">${pager.cur}</a>`
    if (pager.page - pager.cur > 1) dom.innerHTML += `<a href="${url}?page=${pager.cur + 1}">${pager.cur + 1}</a>`
    if (pager.page - pager.cur > 2) dom.innerHTML += `...`
    if (pager.cur !== pager.page) dom.innerHTML += `<a href="${url}?page=${pager.page}">${pager.page}</a><a href="${url}?page=${pager.cur + 1}">></a>`
}

function categoriesMateDOM(categories, post) {
    categories.classList.add("post-categories")
    categories.innerHTML += `🔖`
    post.categories.forEach(category => {
        categories.innerHTML += `<a href="${category.url}">${category.name}</a>`
    })
}

function tagMateDOM(tags, post) {
    tags.classList.add("post-tags")
    tags.innerHTML += `🏷`
    post.tags.forEach(tag => {
        tags.innerHTML += `<a href="${tag.url}">${tag.name}</a>`
    })
}

function CodeHighlight() {
    if (!document.querySelector("pre code")) return
    load(window.codeHighlight.css, "css")
    load(window.codeHighlight.js, "js", async () => {
        if (codeHighlightEngine === 1) hljs.initHighlighting()
        if (codeHighlightEngine === 2) Prism.highlightAll()
    })
}

function load(url, type, callback) {
    const head = document.getElementsByTagName('head')[0]
    if (type === "css") {
        const link = document.createElement('link')
        link.type = 'text/css'
        link.rel = 'stylesheet'
        link.href = url
        head.appendChild(link)
    }
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    if (typeof (callback) == 'function') {
        script.onload = script.onreadystatechange = function () {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                callback()
                script.onload = script.onreadystatechange = null
            }
        }
    }
    head.appendChild(script)
}
