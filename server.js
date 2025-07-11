const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config({path: './config.env'})
const app = require('./app')

const DB = process.env.DATABASE.replace('<db_password>', process.env.DATABASE_PASSWORD);
m



console.log(process.env)



const port = process.env.PORT 
app.listen(port, '127.0.0.1', ()=>{
    console.log('Listening on port 5000')

})



