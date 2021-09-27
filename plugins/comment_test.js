import {GetCommentFromRsp} from "./comment";

const rsp = `<div class="feedbackCon">
<div id="comment_body_4943655" data-format-type="Markdown" class="blog_comment_body cnblogs-markdown">
<p>看不太懂，不过支持一下吧</p>
</div>`

// @case 从 rsp 匹配到用户的评论
export async function Test_GetCommentFromRsp() {
    const comments = GetCommentFromRsp(rsp)
    const expect = [
        {content: `<p>看不太懂，不过支持一下吧</p>`},
    ]
    console.assert(JSON.stringify(expect) === JSON.stringify(comments), {expect, comments})
}
