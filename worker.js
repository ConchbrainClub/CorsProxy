addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    
    let para = new URL(request.url).search.replace("?","");
    let url = unescape(para);

    let body = undefined;
    
    try{
        body = await readRequestBody(request);
    }
    catch(err){}

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

async function readRequestBody(request) {
    const { headers } = request
    const contentType = headers.get("content-type") || ""

    if (contentType.includes("application/json")) {
        return JSON.stringify(await request.json())
    }
    else if (contentType.includes("application/text")) {
        return await request.text()
    }
    else if (contentType.includes("text/html")) {
        return await request.text()
    }
    else if (contentType.includes("form")) {
        const formData = await request.formData()
        const body = {}
        for (const entry of formData.entries()) {
            body[entry[0]] = entry[1]
        }
        return JSON.stringify(body)
    }
    else {
        const myBlob = await request.blob()
        const objectURL = URL.createObjectURL(myBlob)
        return objectURL
    }
}