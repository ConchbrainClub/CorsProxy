addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    
    let para = new URL(request.url).search.replace("?","");
    let url = unescape(para);

    let body = await request.text();

    if(!body){
        body = undefined;
    }

    if(isUrl(url)){
        let response =  await fetch(url, {
            method: request.method,
            body: body,
            headers: request.headers
        });

        return new Response(response.body,{
            status: 200,
            headers: {
                "content-type": response.headers.get("content-type"),
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*"
            }
        });
    }

    return new Response(`
        <div style="text-align:center; margin-top: 100px;">
            <p>Welcome to ConchBrain CORS Proxy</p>
            <p>Please read the <a href="https://conchbrain.club/#cors" target="_blank">documentation</a></p>
        </div>
    `,{
        status: 200,
        headers: {
            "content-type": "text/html; charset=utf-8"
        }
    });
}

function isUrl(href){
    var reg = /^((http|https):\/\/)?(([A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]+)[/\?\:]?.*$/;
    return reg.test(href);
}
