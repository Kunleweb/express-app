const fs = require('fs')
const tours = JSON.parse(fs.readFileSync('./tours-simple.json', 'utf-8'))
const express = require('express')
const app = express()

const tourrouter = require('./tourrouter')
app.use(express.json())


app.use('/api/v1/tours', tourrouter)

module.exports=app


// app.route('/api/v1/tours/').get(getalltours).post(createtour)
// app.route('/api/v1/tours/:id').get(gettours)




