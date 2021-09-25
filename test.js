import {Test_Fetch, Test_Fetch_1} from "./utils/fetch_test"
import {Test_Timeout} from "./utils/timeout_test"
import {Test_Sync} from "./utils/sync_test"
import {
    Test_CodeHighlightFromRsp, Test_GetCategoriesAndTags,
    Test_GetPostFromRsp,
    Test_GetPostFromRsp_1, Test_GetPostFromRsp_2, Test_GetPostFromRsp_3, Test_GetPostFromRsp_4,
    Test_PostsURLFromRsp
} from "./plugins/posts_test"
import {Test_GetPager, Test_GetPager_1} from "./plugins/pager_test"

(async _ => {
    await Test_Fetch()
    await Test_Fetch_1()
    await Test_Timeout()
    await Test_Sync()
    await Test_CodeHighlightFromRsp()
    await Test_PostsURLFromRsp()
    await Test_GetPostFromRsp()
    await Test_GetPostFromRsp_1()
    await Test_GetPostFromRsp_2()
    await Test_GetPostFromRsp_3()
    await Test_GetPostFromRsp_4()
    await Test_GetCategoriesAndTags()
    await Test_GetPager()
    await Test_GetPager_1()
})()
