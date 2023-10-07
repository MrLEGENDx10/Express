const express = require('express');
const {home} = require('../Controller/userController.js');

const router =express.Router();

router.get('/',home);


module.exports = router;