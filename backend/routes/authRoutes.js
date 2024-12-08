const express = require('express');
const router = express.Router();
const { login, protectedRoute } = require('./authController');

router.post('/login', login);
router.get('/protected', protectedRoute);

module.exports = router;