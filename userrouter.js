const express = require('express')
const router = express.Router();
const Authcontroller = require('./Authcontroller.js');


router.post('/createUser', Authcontroller.createUser);




module.exports = router