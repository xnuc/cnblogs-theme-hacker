export function GetCommentFromRsp(rsp) {
    const comments = []
    let matches = rsp.matchAll(/\s<div class="feedbackCon">\s*?<div id="comment_body_([0-9]*?)" data-format-type="Markdown" class="blog_comment_body cnblogs-markdown">([\s\S]*?)<\/div>\s*?<div class="comment_vote">/g)
    const contents = Array.from(matches)
    matches = rsp.matchAll(/<a href="#([0-9]*?)" class="layer">\S([0-9]*?)\S<\/a>/g)
    const layers = Array.from(matches)
    for (let idx = 0; idx < Math.min(contents.length, layers.length); idx++) {
        comments.push({commentID: layers[idx][1], layer: parseInt(layers[idx][2]), content: contents[idx][2].trim()})
    }
    return comments
}
