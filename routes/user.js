const express = require('express');
const router = express.Router();
const userService=require('../services/users')

router.post('/', userService.addUser);
router.get('/', userService.getAllUsers);
router.get('/:id', userService.getUser);

module.exports = router;