const express = require("express")
const router = express.Router()

// Controller
const {
    register,
    login,
    getCurrentUser
} = require('../controllers/UserController');

//middlewares
const validate = require('../middleWares/handleValidation');
const { userCreateValidation, loginValidation } = require('../middleWares/userValidations');
const authGuard = require('../middleWares/authGuard');

// Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get('/profile', authGuard, getCurrentUser );


module.exports = router