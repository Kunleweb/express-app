const dotenv = require('dotenv')
const mongoose = require('mongoose');


dotenv.config({path: './config.env'})
const app = require('./app')

const DB = process.env.DATABASE.replace('<db_password>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {useNewUrlParser: true,useUnifiedTopology: true}).then(
    ()=>{console.log('DB connection succesful')
    }
) 

// console.log(process.env)


const port = process.env.PORT 
app.listen(5000, '127.0.0.1', ()=>{
    console.log('Listening on port 5000')

})



