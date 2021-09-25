import {Timeout} from "./timeout"

// @case 接口超时得到ret
export async function Test_Timeout() {
    const rsp = await Timeout(10, "timeout")
    console.assert("timeout" === rsp, {expect: `${"timeout"}`, actual: `${rsp}`})
}
