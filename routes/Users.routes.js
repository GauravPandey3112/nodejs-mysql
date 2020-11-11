const express = require('express')
const router = express.Router()
const usersController = require('../controllers/user.controller')


router.get('/', usersController.getUsersList)

router.get('/:id', usersController.getUserById )

router.post('/', usersController.addNewUser)

router.delete('/delete', usersController.deleteUserById)

module.exports=router;
