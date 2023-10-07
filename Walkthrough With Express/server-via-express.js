const express=require('express');

const app=express();
const PORT=3011;
const hostName="localhost";

app.get('/',(req,res)=>{
    res.send("Hello world");
});

app.get('/about',(req,res)=>{
    res.send('<h1>About page</h1> <p>Some content</p>');
});

app.get('/contact',(req,res)=>{
    res.send("Contact page");
});

app.listen(PORT,hostName,()=>{
    console.log(`Server is running at http://${hostName}:${PORT}`);
})