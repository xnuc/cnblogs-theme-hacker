export function GetPager(rsp) {
    const match = rsp.match(/\s<div class="pager">([\s\S]*?)<\/div>\s/)
    if (!match) return {page: 1, cur: 1}
    const pages = []
    const pagerHTML = match[1]
    Array.from(pagerHTML.matchAll(/[0-9]+/g)).forEach(e => pages.push(parseInt(e[0])))
    if (pages.length === 0) return {page: 1, cur: 1}
    pages.sort((e1, e2) => e1 - e2)
    const regPage = window.location.href.match(/page=(\S*)/)
    const cur = regPage ? regPage[1] : "1"
    return {page: pages[pages.length - 1], cur: parseInt(cur)}
}
