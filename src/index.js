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
                'Content-Type': 'text/html charset=utf-8'
            }
        })
    }

    let body = await request.text()

    let response = await fetch(url, {
        method: request.method,
        body: body ? body : undefined,
        headers: request.headers
    })
    .catch(() => {
        return new Response('bad request', { status: 400, headers: genHeaders() })
    })

    if (!response.ok) {
        return new Response('fetch err', { status: response.status, headers: genHeaders() })
    }

    return new Response(response.body, { 
        status: response.status, 
        headers: genHeaders(response.headers) 
    })
}

function genHeaders(headers = undefined) {
    let corsHeaders  = new Headers()

    corsHeaders.append('Access-Control-Allow-Origin', '*')
    corsHeaders.append('Access-Control-Allow-Methods', '*')
    corsHeaders.append('Access-Control-Allow-Headers', '*')

    if (headers) {
        corsHeaders.append('Content-Type', headers.get('Content-Type'))
        corsHeaders.append('Content-Length', headers.get('Content-Length'))
        corsHeaders.append('Cache-Control', headers.get('Cache-Control'))
        corsHeaders.append('Refresh', headers.get('Refresh'))
    }

    return corsHeaders
}