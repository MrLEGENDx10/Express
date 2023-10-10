const PORT = process.env.PORT ||  5000;
require('dotenv').config(
    { path: './.env' }
)
const app = require('./app.js')

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
    
})