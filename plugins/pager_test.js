import {GetPager} from "./pager"

// 给一段html 匹配出来其中最大的数字然后返回 总页数       请求中拿到page是当前页数
export async function Test_GetPager() {
const rsp = `   <div id="homepage_bottom_pager" class="topicListFooter">
                <div class="pager">
                <a href="https://www.cnblogs.com/ashdyed/default.html?page=1">上一页</a>
                <a href="https://www.cnblogs.com/ashdyed/default.html?page=1">1</a>
                2
                </div>
                </div>`
    const getPager = GetPager(rsp)
    const expect = {
        page: 2,
        cur: 1
    }
    console.assert(JSON.stringify(expect) === JSON.stringify(getPager), {expect, getPager})
}

// <div id="homepage_bottom_pager" class="topicListFooter">
//
// </div>
// 给一段html 匹配出来其中最大的数字然后返回 此时不存在返回1，1       请求中拿到page是当前页数
export async function Test_GetPager_1() {
    const rsp = `   <div id="homepage_bottom_pager" class="topicListFooter">
                    <div class="pager">
                    </div>
                    </div>`
    const getPager = GetPager(rsp)
    const expect = {
        page: 1,
        cur: 1
    }
    console.assert(JSON.stringify(expect) === JSON.stringify(getPager), {expect, getPager})
}