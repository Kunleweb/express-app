const fs = require('fs')
const tours = JSON.parse(fs.readFileSync('./tours-simple.json', 'utf-8'))
const tourController = require('./tourcontroller')
const express = require('express')
const app = express()

const router = express.Router();


// Params

router.param('id', tourController.checkID)

router.route('/')
.get(tourController.getalltours)
.post(tourController.createtour)

router.route('/:id')
.get(tourController.gettours)



module.exports= router