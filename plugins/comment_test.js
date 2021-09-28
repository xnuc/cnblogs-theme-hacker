import {GetCommentFromRsp} from "./comment";

const rsp = `
<a href="#4943655" class="layer">#3楼</a>
<div class="feedbackCon">
<div id="comment_body_4943655" data-format-type="Markdown" class="blog_comment_body cnblogs-markdown">
<p>看不太懂，不过支持一下吧</p>
</div>
<div class="comment_vote">`

// @case 从 rsp 匹配到用户的评论
export async function Test_GetCommentFromRsp() {
    const comments = GetCommentFromRsp(rsp)
    const expect =
        [{layer: 3, content: `<p>看不太懂，不过支持一下吧</p>`}]
    console.assert(JSON.stringify(expect) === JSON.stringify(comments), {expect, comments})
}
