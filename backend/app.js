const express = require('express')
const cors = require('cors')
const {readdirSync} = require('fs')
const db = require('./config/db')
const app = express()


require('dotenv').config({ path: './config/.env'})

const PORT = process.env.PORT

console.log(process.env.MONGO_STRING)


//middleware 
app.use(express.json())
app.use(cors())

//routes 

readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))


db().then(app.listen(PORT, () => {
    console.log(`Server Running on PORT : ${PORT} betta go catch  it!`)
}))