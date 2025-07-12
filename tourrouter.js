const express = require('express')
const router = express.Router();
const tourController = require('./tourcontroller')






// Params

// router.param('id', tourController.checkID)

router.route('/')
.get(tourController.getalltours)
.post(tourController.createtour) 

router.delete('/test-delete', (req, res) => {
  res.status(200).json({ message: 'DELETE route works!' });
});



router.route('/:id')
.get(tourController.gettours)
.delete(tourController.deletetour)




module.exports= router