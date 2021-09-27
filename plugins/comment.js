export function GetCommentFromRsp(rsp) {
    const comments = []
    const matches = rsp.matchAll(/\s<div class="feedbackCon"><div id="comment_body_[0-9]*?" data-format-type="Markdown" class="blog_comment_body cnblogs-markdown">([\s\S]*?)<\/div>\s<div class="comment_vote">/g)
    Array.from(matches).forEach(e => {
        comments.push({content: e[1].trim()})
    })
    return comments
}
