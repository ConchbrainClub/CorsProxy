# CorsProxy

### Conchbrain club offical CorsProxy

Cross-origin Resource Sharing Proxy Service

## Usage

Api: https://www.conchbrain.club/cors

Method: GET

Para:
     Proxy address (eg. https://www.conchbrain.club)
     
#### CORS

```shell
fetch("https://www.conchbrain.club/").then((res)=>{
    res.text().then((data)=>{
        console.log(data);
    });
});
```

> Result: Access to fetch at 'https://www.conchbrain.club/' from origin 'http://example.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
> 

#### UseProxy

```shell
fetch("https://www.conchbrain.club/cors?https://www.conchbrain.club/").then((res)=>{
    res.text().then((data)=>{
        console.log(data);
    });
});
```

> Result: Response Successful
