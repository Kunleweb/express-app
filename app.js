const fs = require('fs')
const tours = JSON.parse(fs.readFileSync('./tours-simple.json', 'utf-8'))
const express = require('express')

const morgan =  require('morgan')
const app = express()
app.use(express.json())

if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'))
}



const tourrouter = require('./tourrouter')
const userrouter = require('./userrouter')


app.use('/api/v1/tours', tourrouter)
app.use('/api/v1/users', userrouter)

module.exports=app


// app.route('/api/v1/tours/').get(getalltours).post(createtour)
// app.route('/api/v1/tours/:id').get(gettours)




