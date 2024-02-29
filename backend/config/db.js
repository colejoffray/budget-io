const mongoose = require('mongoose')


const db = async() => {

    try{
        const conn = await mongoose.connect(process.env.MONGO_STRING)

        console.log(`Connected to DB: ${conn.connection.host}`)
    }catch(err){
        console.error(err)
    }
}

module.exports = db