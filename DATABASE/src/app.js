import express from 'express'
const app = express();


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/twitter',(req,res)=>{
    res.send('<h1>Twitter id </h1>')
})

export default app;