import {Done, Sync} from "./sync"

// @case head加锁
export async function Test_Sync() {
    await Sync(`sync`)
    console.assert(Done(`sync`), {expect: `${true}`, actual: `${Done(`sync`)}`})
}
