const express = require('express')
const cors = require('cors')
const {readdirSync} = require('fs')
const session  = require('express-session')
const db = require('./config/db')
const flash = require('express-flash')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const app = express()


require('dotenv').config({ path: './config/.env'})

const PORT = process.env.PORT

console.log(process.env.MONGO_STRING)


//middleware 
app.use(express.json())
app.use(cors())
app.use(flash())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_STRING
    })
}))

//passport middleware 
 // Passport middleware
 app.use(passport.initialize());
 app.use(passport.session());

require('./config/passport')(passport)

//routes 

readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))


db().then(app.listen(PORT, () => {
    console.log(`Server Running on PORT : ${PORT} betta go catch  it!`)
}))