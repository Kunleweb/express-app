const express = require('express')
const router = express.Router();
const tourController = require('./tourcontroller')
const Authcontroller = require('./Authcontroller.js');







// Params

// router.param('id', tourController.checkID)


router.route('/top-5-tour')
.get(tourController.aliastoptours, tourController.getalltours)

router.route('/')
.get(Authcontroller.protect, tourController.getalltours)
.post(tourController.createtour) 

// router.delete('/test-delete', (req, res) => {
//   res.status(200).json({ message: 'DELETE route works!' });
// });



router.route('/:id')
.get(tourController.gettours)
.delete(Authcontroller.protect, Authcontroller.restrictTo('admin', 'user'),tourController.deletetour)




module.exports= router