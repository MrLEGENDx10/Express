const express = require('express');
const {home , signUp} = require('../Controller/userController.js');

const router =express.Router();

router.get('/',home);
router.post('/signup',signUp)


module.exports = router;