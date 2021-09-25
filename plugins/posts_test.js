import {GetCategoriesAndTagsFromRsp, GetCodeHighlightFromRsp, GetPostFromRsp, GetPostsURLFromRsp} from "./posts"

// @case 输入rsp 得到高亮的js和css的obj
export async function Test_CodeHighlightFromRsp() {
    const rsp = `   <div class="clear"></div>  
                    <script src="other.js"></script>  
                    <script src="hljs.js" async onload="markdown_highlight()"></script>   
                    <link type="text/css" rel="stylesheet" href="hljs.css" />
                    <script>
                    var allowComments = true, cb_blogId = 707675, cb_blogApp = 'mosszzom', cb_blogUserGuid = '4903955e-95eb-4f2f-809b-08d9796f8c77';
                    var cb_entryId = 15322331, cb_entryCreatedDate = '2021-09-22 23:33', cb_postType = 1;
                    updatePostStats(
                    [cb_entryId],
                    function(id, count) { $("#post_view_count").text(count) },
                    function(id, count) { $("#post_comment_count").text(count) })
                    zoomManager.apply("#cnblogs_post_body img:not(.code_img_closed):not(.code_img_opened)");
                    </script>`
    const codeHighlight = await GetCodeHighlightFromRsp(rsp)
    const expect = {js: "hljs.js", css: "hljs.css"}
    console.assert(JSON.stringify(expect) === JSON.stringify(codeHighlight), {
        expect: JSON.stringify(expect),
        actual: JSON.stringify(codeHighlight)
    })
}

// @case 输入rsp posts对应的postURL数组
export async function Test_PostsURLFromRsp() {
    const rsp = `   <div class="postTitle">
                    <a class="postTitle2 vertical-middle" href="https://www.cnblogs.com/mosszzom/p/15322331.html">
                    <span>
                    Spring，IOC源码分析
                    </span>
                    </a>
                    <a href="https://i.cnblogs.com/EditPosts.aspx?postid=15322331" rel="nofollow">
                    编辑
                    </a>
                    </div>
                    <div class="clear"></div>
                    </div>`
    const postsURL = await GetPostsURLFromRsp(rsp)
    const expect = [{
        post: `https://www.cnblogs.com/mosszzom/p/15322331.html`,
        edit: `https://i.cnblogs.com/EditPosts.aspx?postid=15322331`,
        isTop: false
    }]
    console.assert(JSON.stringify(expect) === JSON.stringify(postsURL), {
        expect: JSON.stringify(expect),
        actual: JSON.stringify(postsURL)
    })
}

// @case 给rsp 获取文章的描述
export async function Test_GetPostFromRsp() {
    const rsp = `   <head>
                    <meta name="description" content="desc" />
                    <title></title>
                    </head>
                    <a id="cb_post_title_url" class="postTitle2 vertical-middle" href="https://www.cnblogs.com/ashdyed/p/cnblogs-theme.html">
                    <span>title</span> </a>
                    <div id="cnblogs_post_body" class="blogpost-body cnblogs-markdown">content</div><div class="clear">
                    </div> <span id="post-date">2021-04-02 13:45</span>
                    <a href="https://i.cnblogs.com/EditPosts.aspx?postid=13144773" rel="nofollow">编辑</a>
                    <div></div>`
    const post = GetPostFromRsp(rsp)
    const expect = {
        desc: `desc`,
        content: `content`,
        date: 1617342300000,
        url: `https://www.cnblogs.com/ashdyed/p/cnblogs-theme.html`,
        postID: "13144773",
        title: "title",
        edit: "https://i.cnblogs.com/EditPosts.aspx?postid=13144773"
    }
    console.assert(JSON.stringify(expect) === JSON.stringify(post), {expect, post})
}

// @case 给rsp 获取文章的描述  <br class="more">
export async function Test_GetPostFromRsp_1() {
    const rsp = `   <head>
                    <meta name="description" content="fake desc" />
                    <title></title>
                    </head>
                    <a id="cb_post_title_url" class="postTitle2 vertical-middle" href="https://www.cnblogs.com/ashdyed/p/cnblogs-theme.html">\
                    <span>title</span> </a>
                    <div id="cnblogs_post_body" class="blogpost-body cnblogs-markdown">desc<br class="more">  content</div><div class="clear">
                    </div> <span id="post-date">2021-04-02 13:45</span>
                    <a href="https://i.cnblogs.com/EditPosts.aspx?postid=13144773" rel="nofollow">编辑</a>
                    <div></div>`
    const post = GetPostFromRsp(rsp)
    const expect = {
        desc: `desc`,
        content: `desc<br class="more">  content`,
        date: 1617342300000,
        url: `https://www.cnblogs.com/ashdyed/p/cnblogs-theme.html`,
        postID: "13144773",
        title: "title",
        edit: "https://i.cnblogs.com/EditPosts.aspx?postid=13144773"
    }
    console.assert(JSON.stringify(expect) === JSON.stringify(post), {expect, post})
}

// @case 给rsp 获取文章的描述
export async function Test_GetPostFromRsp_2() {
    const rsp = `   <head>
                    <meta name="description" content="fake desc" />
                    <title></title>
                    </head>
                    <a id="cb_post_title_url" class="postTitle2 vertical-middle" href="https://www.cnblogs.com/ashdyed/p/cnblogs-theme.html">
                    <span>title</span> </a>
                    <div id="cnblogs_post_body" class="blogpost-body cnblogs-markdown">fake desc   <br class="more">desc<br class="more">   content</div><div class="clear">
                    </div> <span id="post-date">2021-04-02 13:45</span>
                    <a href="https://i.cnblogs.com/EditPosts.aspx?postid=13144773" rel="nofollow">编辑</a>
                    <div></div>`
    const post = GetPostFromRsp(rsp)
    const expect = {
        desc: `desc`,
        content: `fake desc   <br class="more">desc<br class="more">   content`,
        date: 1617342300000,
        url: `https://www.cnblogs.com/ashdyed/p/cnblogs-theme.html`,
        postID: "13144773",
        title: "title",
        edit: "https://i.cnblogs.com/EditPosts.aspx?postid=13144773"
    }
    console.assert(JSON.stringify(expect) === JSON.stringify(post), {expect, post})
}

// @case 给rsp 获取文章的描述
export async function Test_GetPostFromRsp_3() {
    const rsp = `   <head>
                    <meta name="description" content="fake desc" />
                    <title></title>
                    </head>
                    <a id="cb_post_title_url" class="postTitle2 vertical-middle" href="https://www.cnblogs.com/ashdyed/p/cnblogs-theme.html">
                    <span>title</span> </a>
                    <div id="cnblogs_post_description" style="display: none">desc</div>
                    <div id="cnblogs_post_body" class="blogpost-body cnblogs-markdown">content</div><div class="clear">
                    </div> <span id="post-date">2021-04-02 13:45</span>
                    <a href="https://i.cnblogs.com/EditPosts.aspx?postid=13144773" rel="nofollow">编辑</a>
                    <div></div>`
    const post = GetPostFromRsp(rsp)
    const expect = {
        desc: `desc`,
        content: `content`,
        date: 1617342300000,
        url: `https://www.cnblogs.com/ashdyed/p/cnblogs-theme.html`,
        postID: "13144773",
        title: "title",
        edit: "https://i.cnblogs.com/EditPosts.aspx?postid=13144773"
    }
    console.assert(JSON.stringify(expect) === JSON.stringify(post), {expect, post})
}

// @case 给rsp 获取文章ID下的分类和标签   `//www.cnblogs.com/${Config.currentBlogApp}/ajax/CategoriesTags.aspx?blogId=${Config.currentBlogId}&postId=${postID}`
export async function Test_GetCategoriesAndTags() {
    const rsp = {}
    rsp.responseURL = `https://www.cnblogs.com/ashdyed/ajax/CategoriesTags.aspx?blogId=581220&postId=12395119`
    rsp.responseText = `    <body><div id="BlogPostCategory">
                            分类: 
                            <a href="https://www.cnblogs.com/ashdyed/category/2032967.html" target="_blank">博客园</a></div>
                            <div id="EntryTag">
                            标签: 
                            <a href="https://www.cnblogs.com/ashdyed/tag/%E4%B8%BB%E9%A2%98/">主题</a>,             <a href="https://www.cnblogs.com/ashdyed/tag/%E6%8C%87%E5%8D%97/">指南</a></div>
                            </body>`
    const cateAndTag = await GetCategoriesAndTagsFromRsp(rsp)
    const expect = {
        categories: [{url: `https://www.cnblogs.com/ashdyed/category/2032967.html`, name: `博客园`}],
        tags: [{
            url: `https://www.cnblogs.com/ashdyed/tag/%E4%B8%BB%E9%A2%98/`, name: `主题`
        }, {url: `https://www.cnblogs.com/ashdyed/tag/%E6%8C%87%E5%8D%97/`, name: `指南`}], postID: "12395119"
    }
    console.assert(JSON.stringify(expect) === JSON.stringify(cateAndTag), {expect, cateAndTag})
}