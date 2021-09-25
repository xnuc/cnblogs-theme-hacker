import {Fetch} from "./fetch"

// @case 访问`//www.cnblogs.com/mosszzom` 预期有数据
export async function Test_Fetch() {
    const rsp = await Fetch(`//www.cnblogs.com/mosszzom`)
    console.assert(!!rsp, {expect: `${false}`, actual: `${!rsp}`})
}

// @case 访问`//mosszzom.cnblogs.com` 预期无数据
export async function Test_Fetch_1() {
    const rsp = await Fetch(`//mosszzom.cnblogs.com`)
    console.assert(!rsp, {expect: `${true}`, actual: `${!!rsp}`})
}