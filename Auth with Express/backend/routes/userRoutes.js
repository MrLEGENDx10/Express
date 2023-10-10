const express = require('express');
const {home , signUp,signIn} = require('../Controller/userController.js');

const router =express.Router();

router.get('/',home);
router.post('/signup',signUp)
router.post('/signin',signIn)


module.exports = router;