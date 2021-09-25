function readyStateOver(req) {
    return new Promise(r => {
        req.onreadystatechange = _ => {
            if (req.readyState === 4 && req.status === 200)
                r(req)
        }
        req.onerror = _ => {
            r(null)
        }
    })
}

export async function Fetch(url) {
    const req = new XMLHttpRequest()
    req.open("GET", url, true)
    req.send()
    const rsp = await readyStateOver(req)
    return rsp?.responseText
}

export async function NetFetch(url) {
    const req = new XMLHttpRequest()
    req.open("GET", url, true)
    req.send()
    return await readyStateOver(req)
}
