const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const app = require('./app')





console.log(process.env)



const port = process.env.PORT 
app.listen(port, '127.0.0.1', ()=>{
    console.log('Listening on port 5000')

})



