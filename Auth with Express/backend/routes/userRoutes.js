const express = require('express');
const {home , signUp,signIn,getUser} = require('../Controller/userController.js');

const router =express.Router();

router.get('/',home);
router.post('/signup',signUp)
router.post('/signin',signIn)
router.get('/user',getUser)


module.exports = router;