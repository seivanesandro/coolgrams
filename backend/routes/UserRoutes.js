const express = require("express")
const router = express.Router()
 
// Controller
const {
    register
} = require('../controllers/UserController');
 
//middlewares
const validate = require('../middleWares/handleValidation');
const { userCreateValidation } = require('../middleWares/userValidations');

// Routes
router.post("/register", userCreateValidation(), validate, register)
 
module.exports = router