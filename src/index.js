addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {

    let url = request.url.substring(request.url.indexOf('?') + 1)

    if (!url) {
        return new Response(`
            <div style="text-align:center margin-top: 100px">
                <p>Welcome to ConchBrain CORS Proxy</p>
                <p>Please read the <a href="https://www.conchbrain.club/#corsproxy" target="_blank">documentation</a></p>
            </div>
        `, {
            status: 200,
            headers: {
                "content-type": "text/html charset=utf-8"
            }
        })
    }

    let body = await request.text()

    let response = await fetch(url, {
        method: request.method,
        body: body ? body : undefined,
        headers: request.headers
    })

    return new Response(response.body, {
        status: response.status,
        headers: {
                "content-type": response.headers.get("content-type"),
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*"
        }
    })
}