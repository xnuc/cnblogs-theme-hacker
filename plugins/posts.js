export async function GetPostsURLFromRsp(rsp) {
    const posts = []
    const from = Array.from(rsp.matchAll(/\s<a class="postTitle2 vertical-middle" href="(\S*?)">\s/g))
    if (from.length === 0) from.push(...Array.from(rsp.matchAll(/\s<a class="entrylistItemTitle" href="(\S*?)">\s/g)))
    if (from.length === 0) from.push(...Array.from(rsp.matchAll(/\s<a id="PostsList1_rpPosts_TitleUrl_1" class="vertical-middle" href="(\S*?)">\s/g)))
    const postURLs = from
    const from2 = Array.from(rsp.matchAll(/\s<a href="(\S*?)" rel="nofollow">/g))
    if (from2.length === 0) from2.push(...Array.from(rsp.matchAll(/\s<a href="(\S*?)" target="_blank">编辑<\/a>/g)))
    const editURLs = from2
    const from1 = Array.from(rsp.matchAll(/\s<a class="postTitle2 vertical-middle" href="\S*?">([\s\S]*?)<\/a>\s/g))
    if (from1.length === 0) from1.push(...Array.from(rsp.matchAll(/\s<a class="entrylistItemTitle" href="\S*?">([\s\S]*?)<\/a>\s/g)))
    if (from1.length === 0) from1.push(...Array.from(rsp.matchAll(/\s<a id="PostsList1_rpPosts_TitleUrl_1" class="vertical-middle" href="\S*?">([\s\S]*?)<\/a>/g)))
    const name = from1
    const minLen = Math.min(postURLs.length, editURLs.length, name.length)
    for (let idx = 0; idx < minLen; idx++) {
        const span = document.createElement('span')
        span.innerHTML = name[idx][1]
        const isTop = !(span.innerText.trim().indexOf("[置顶]") === -1)
        posts.push({post: postURLs[idx][1], edit: editURLs[idx][1], isTop})
    }
    return posts
}

export function GetPostFromRsp(rsp) {
    const match = rsp.match(/\s<br class="more">([\s\S]*?)<br class="more">\s/)
        ?? rsp.match(/\s<div id="cnblogs_post_body" class="blogpost-body cnblogs-markdown">([\s\S]*?)<br class="more">\s/)
        ?? rsp.match(/\s<div id="cnblogs_post_description" style="display: none">([\s\S]*?)<\/div>\s/)
        ?? rsp.match(/name="description" content="([\s\S]*?)" \/>\s/)
        ?? rsp.match(/name="description" content="([\s\S]*?)">\s/)
    const desc = match[1]
    const content = rsp.match(/\s<div id="cnblogs_post_body" class="blogpost-body cnblogs-markdown">([\s\S]*?)<\/div>\s*<div class="clear">/)[1]
    const url = rsp.match(/\s<a id="cb_post_title_url" class="postTitle2 vertical-middle" href="([\s\S]*?)">\s/)[1]
    const title = rsp.match(/<a id="cb_post_title_url" class="postTitle2 vertical-middle" href="\S*?">\s*<span>([\s\S]*?)<\/span>/)[1].trim()
    const date = new Date(rsp.match(/\s<span id="post-date">([\s\S]*?)<\/span>/)[1]).getTime()
    const edit = rsp.match(/\s<a href="(\S*?)" rel="nofollow">/)[1]
    const postID = edit.match(/[0-9].*/)[0]
    return {desc, content, date, url, postID, title, edit}
}

export async function GetCodeHighlightFromRsp(rsp) {
    const highlight = {}
    const match = rsp.match(/\s<script src="(\S*?)" async onload="markdown_highlight\(\)"><\/script>\s/)
        ?? rsp.match(/\s<script src="(\S*?)" async="" onload="markdown_highlight\(\)"><\/script>\s/)
    highlight.js = match[1]
    const from = Array.from(rsp.matchAll(/\s<link type="text\/css" rel="stylesheet" href="(\S*?)" \/>\s/g))
    if (from.length === 0) from.push(...Array.from(rsp.matchAll(/\s<link type="text\/css" rel="stylesheet" href="(\S*?)">\s/g)))
    highlight.css = from.filter(e => e[1].indexOf("hljs") !== -1 || e[1].indexOf("prismjs") !== -1)[0][1]
    return highlight
}

export function GetCategoriesAndTagsFromRsp(rsp) {
    const postID = rsp.responseURL.match(/postId=(\S*)/)[1]
    const categories = []
    const tags = []
    const tagAndCategory = Array.from(rsp.responseText.matchAll(/<a.+?href="(.+?)".*?>(.+?)<\/a>/g))
    tagAndCategory.filter(e => e[1].indexOf("/category/") !== -1).forEach(e => {
        categories.push({url: e[1], name: e[2]})
    })
    tagAndCategory.filter(e => e[1].indexOf("/tag/") !== -1).forEach(e => {
        tags.push({url: e[1], name: e[2]})
    })
    return {categories, tags, postID}
}
