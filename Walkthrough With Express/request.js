const http= require('http');

const option={
    hostname:"fakestoreapi.com",
    path:"/products/1",
    method:"GET"
}

const req=http.request(option,(res)=>{
    res.on("data",(d)=>{
        process.stdout.write(d);
    });
});

req.on("error",(e)=>{
    console.log(e);
});

req.end();  