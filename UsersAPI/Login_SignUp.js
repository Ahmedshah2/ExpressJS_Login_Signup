const express = require('express')
const router = express.Router()
router.use(express.json());

const { SignUp, Login, allUsers, getUserByEmail } = require('./controller')


// SignUp API
router.post('/signup', SignUp)
router.post('/login', Login)
router.get('/getallusers', allUsers)
router.get('/getuserbyemail', getUserByEmail)


module.exports = router