const mongoose = require('mongoose')

const connectToDb = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true

        })
        .then((conn)=>{
            console.log(`MongoDB connected to ${conn.connection.host}`)
        })
    }catch(error){
        console.log('Error connecting to MongoDB',error)
        process.exit(1)
    }
}

module.exports = connectToDb