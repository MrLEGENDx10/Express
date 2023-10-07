const http= require('http');

const PORT=3011;
const hostName="localhost";

const server=http.createServer((req,res)=>{
    if(req.url=='/'){
        req.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.end(JSON.stringify({"message":"Hello world"}));
    }
    else if(req.url== '/about'){
        req.statusCode=200;
        res.setHeader("content-type","text/plain");
        res.end(JSON.stringify("about page!"));

    }
    else if(req.url== '/contact'){
        req.statusCode=200;
        res.setHeader("Content-Type","Text/html");
        res.end("<h1>contact page</h1>");

    }
    else{
        res.statusCode=404;
        res.setHeader("Content-Type","text/text");
        res.end("Page not found");
    
    }
});

server.listen(PORT,hostName,()=>{
    console.log(`Server is running at http://${hostName}:${PORT}`);
});

