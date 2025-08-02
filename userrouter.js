const express = require('express')
const router = express.Router();
const Authcontroller = require('./Authcontroller.js');


router.post('/createUser', Authcontroller.createUser);
router.post('/login', Authcontroller.login);
router.post('/forgotPassword', Authcontroller.forgotPassword)



module.exports = router