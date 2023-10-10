const express = require('express');
const {home , signUp,signIn,getUser} = require('../Controller/userController.js');
const jwtAuth = require('../middleware/jwtAuth.js')

const router =express.Router();

router.get('/',home);
router.post('/signup',signUp)
router.post('/signin',signIn)
router.get('/user',jwtAuth,getUser)


module.exports = router;